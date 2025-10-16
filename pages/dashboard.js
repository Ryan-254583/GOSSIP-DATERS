// pages/dashboard.js
"use client";

import { useEffect, useState, useRef } from "react";
import { auth, db } from "../lib/firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  where,
  getDocs
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";

/*
  Dashboard with:
   - Community Feed (global)
   - Messages (private 1:1 chats list)
   - Profile
   - Discover (opposite gender matches) with Connect -> opens chat modal
*/

export default function Dashboard() {
  const router = useRouter();

  // auth / profile
  const [authUser, setAuthUser] = useState(null); // firebase auth user
  const [profile, setProfile] = useState(null);   // firestore profile (username, gender, photoURL, uid)

  // tabs: 'discover' | 'messages' | 'community' | 'profile'
  const [tab, setTab] = useState("discover");

  // discover (matches)
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  // community feed
  const [community, setCommunity] = useState([]);
  const [communityText, setCommunityText] = useState("");
  const [posting, setPosting] = useState(false);

  // private chat modal
  const [openChatWith, setOpenChatWith] = useState(null); // user object of the other person
  const [chatMessages, setChatMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const chatListRef = useRef(null);
  const currentChatUnsubRef = useRef(null);

  // Messages list (existing chats)
  const [myChats, setMyChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);

  // small helper: default avatar based on gender (public/avatars/male.png / female.png)
  const avatarFor = (u) => {
    if (!u) return "/avatars/male.png";
    return (u.gender === "female") ? "/avatars/female.png" : (u.photoURL || "/avatars/male.png");
  };

  // --- AUTH + load profile ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/signin");
        return;
      }
      setAuthUser(u);

      // load user profile from Firestore users/{uid}
      try {
        const docRef = doc(db, "users", u.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          // fallback: build profile from auth
          const fallback = {
            uid: u.uid,
            username: u.displayName || (u.email ? u.email.split("@")[0] : "User"),
            gender: null,
            photoURL: u.photoURL || null,
            email: u.email
          };
          setProfile(fallback);
        }
      } catch (err) {
        console.error("load profile:", err);
      }
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- load matches (opposite gender) in realtime ---
  useEffect(() => {
    if (!profile) return;
    setLoadingMatches(true);
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map(d => d.data()).filter(u => u.uid !== profile.uid);
      // filter opposite gender if both have gender
      const filtered = all.filter(u => {
        if (!profile.gender || !u.gender) return true;
        return u.gender !== profile.gender;
      });
      setMatches(filtered);
      setLoadingMatches(false);
    }, err => {
      console.error("matches snapshot:", err);
      setLoadingMatches(false);
    });

    return () => unsub();
  }, [profile]);

  // --- community feed realtime ---
  useEffect(() => {
    const q = query(collection(db, "communityFeed"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setCommunity(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error("community snapshot:", err));
    return () => unsub();
  }, []);

  // --- load my chats list (where I'm a participant) ---
  useEffect(() => {
    if (!profile) return;
    setLoadingChats(true);
    // chats where users array contains my uid
    const q = query(collection(db, "chats"), where("users", "array-contains", profile.uid), orderBy("lastUpdated", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // For display, we want the other user's username/photo; chats store `users` and optionally `meta` map to speed this
      // We'll keep chats array as-is and look up user data when opening chat.
      setMyChats(chats);
      setLoadingChats(false);
    }, err => {
      console.error("my chats snapshot", err);
      setLoadingChats(false);
    });

    return () => unsub();
  }, [profile]);

  // --- helpers: deterministic chatId ---
  const chatIdFor = (a, b) => [a, b].sort().join("_");

  // --- open private chat with user object (other) ---
  const openPrivateChat = async (other) => {
    if (!profile) return;
    const chatId = chatIdFor(profile.uid, other.uid);

    // ensure chat doc exists
    try {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);
      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          users: [profile.uid, other.uid],
          userMeta: {
            [profile.uid]: { username: profile.username, photoURL: profile.photoURL || null },
            [other.uid]: { username: other.username, photoURL: other.photoURL || null }
          },
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("ensure chat error", err);
    }

    // subscribe to messages for this chat
    subscribeToChatMessages(chatId);

    setOpenChatWith(other);
    setTab("messages");
  };

  // subscribe to messages for chatId (stores unsubscribe in ref)
  const subscribeToChatMessages = (chatId) => {
    // cleanup previous
    if (currentChatUnsubRef.current) {
      currentChatUnsubRef.current();
      currentChatUnsubRef.current = null;
    }
    if (!chatId) return;

    const msgsRef = collection(db, "chats", chatId, "messages");
    const q = query(msgsRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setChatMessages(msgs);
      // scroll
      setTimeout(() => {
        if (chatListRef.current) chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }, 80);
    }, err => console.error("chat messages snapshot", err));

    currentChatUnsubRef.current = unsub;
  };

  const closeChat = () => {
    if (currentChatUnsubRef.current) {
      currentChatUnsubRef.current();
      currentChatUnsubRef.current = null;
    }
    setOpenChatWith(null);
    setChatMessages([]);
    setChatText("");
  };

  // --- send private message ---
  const sendPrivateMessage = async (e) => {
    e?.preventDefault();
    if (!chatText.trim() || !profile || !openChatWith) return;
    const chatId = chatIdFor(profile.uid, openChatWith.uid);
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderUid: profile.uid,
        senderName: profile.username,
        text: chatText.trim(),
        timestamp: serverTimestamp(),
      });

      // update chat lastUpdated
      await setDoc(doc(db, "chats", chatId), { lastUpdated: serverTimestamp() }, { merge: true });

      setChatText("");
    } catch (err) {
      console.error("sendPrivateMessage:", err);
    }
  };

  // --- post to community feed ---
  const postToCommunity = async (e) => {
    e?.preventDefault();
    if (!communityText.trim() || !profile) return;
    setPosting(true);
    try {
      await addDoc(collection(db, "communityFeed"), {
        uid: profile.uid,
        username: profile.username,
        text: communityText.trim(),
        timestamp: serverTimestamp()
      });
      setCommunityText("");
    } catch (err) {
      console.error("postToCommunity:", err);
    } finally {
      setPosting(false);
    }
  };

  // --- start chat from messages list (click chat tile) ---
  const openChatFromList = async (chat) => {
    if (!profile) return;
    // find the other uid in chat.users
    const otherUid = (chat.users || []).find(u => u !== profile.uid);
    if (!otherUid) return;

    // load other user profile
    try {
      const otherSnap = await getDoc(doc(db, "users", otherUid));
      const other = otherSnap.exists() ? otherSnap.data() : { uid: otherUid, username: otherUid, photoURL: null };
      openPrivateChat(other);
    } catch (err) {
      console.error("openChatFromList error", err);
    }
  };

  // --- logout ---
  const doLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    router.push("/signin");
  };


  // --- UI rendering ---
  if (!profile) {
    return (
      <div style={center}>
        <div style={{ color: "#ccc" }}>Loading profile…</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#070708", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      {/* NAV */}
      <header style={nav}>
        <div>
          <strong style={{ color: "#ff5252", fontSize: 20 }}>CUK Gossip</strong>
          <div style={{ fontSize: 12, color: "#aaa" }}>Meet • Chat • Connect</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>{profile.username}</div>
            <div style={{ fontSize: 12, color: "#bbb" }}>{profile.gender || "Not specified"}</div>
          </div>
          <img src={profile.photoURL || avatarFor(profile)} alt="me" style={{ width: 44, height: 44, borderRadius: 999 }} />
          <button onClick={doLogout} style={logoutBtn}>Logout</button>
        </div>
      </header>

      {/* TAB BAR */}
      <nav style={tabbar}>
        <button onClick={() => setTab("discover")} style={tabButton(tab === "discover")}>Discover</button>
        <button onClick={() => setTab("messages")} style={tabButton(tab === "messages")}>Messages</button>
        <button onClick={() => setTab("community")} style={tabButton(tab === "community")}>Community</button>
        <button onClick={() => setTab("profile")} style={tabButton(tab === "profile")}>Profile</button>
      </nav>

      {/* PAGE CONTENT */}
      <main style={{ maxWidth: 1000, margin: "20px auto", padding: "0 14px" }}>
        {/* DISCOVER: grid of opposite gender matches */}
        {tab === "discover" && (
          <section>
            <h2 style={sectionTitle}>Discover</h2>
            <p style={muted}>Profiles suggested for you — tap Connect to start a private chat.</p>

            {loadingMatches ? <div style={muted}>Loading matches…</div> : (
              <div style={grid}>
                {matches.length === 0 && <div style={empty}>No matches found yet.</div>}
                {matches.map(u => (
                  <div key={u.uid} style={card}>
                    <img src={u.photoURL || avatarFor(u)} alt={u.username} style={avatarSmall} />
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{u.username}</div>
                    <div style={{ color: "#bbb", fontSize: 13, marginBottom: 8 }}>{u.gender || "-"}</div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <button onClick={() => openPrivateChat(u)} style={primaryBtn}>Message</button>
                      <button onClick={() => {}} style={ghostBtn}>View</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* MESSAGES: list of chats and optionally open chat modal */}
        {tab === "messages" && (
          <section>
            <h2 style={sectionTitle}>Messages</h2>
            <p style={muted}>Your private chats</p>

            {loadingChats ? <div style={muted}>Loading chats…</div> : (
              <div style={{ display: "grid", gap: 10 }}>
                {myChats.length === 0 && <div style={empty}>No conversations yet — tap Message on someone's profile to start one.</div>}
                {myChats.map(c => {
                  const otherUid = (c.users || []).find(x => x !== profile.uid);
                  const meta = c.userMeta && c.userMeta[otherUid] ? c.userMeta[otherUid] : null;
                  return (
                    <div key={c.id} style={chatTile} onClick={() => openChatFromList(c)}>
                      <img src={(meta && meta.photoURL) || "/avatars/male.png"} alt="u" style={{ width: 48, height: 48, borderRadius: 999 }} />
                      <div style={{ flex: 1, marginLeft: 10 }}>
                        <div style={{ fontWeight: 700 }}>{(meta && meta.username) || otherUid}</div>
                        <div style={{ color: "#aaa", fontSize: 13 }}>{c.lastMessagePreview || ""}</div>
                      </div>
                      <div style={{ color: "#999", fontSize: 12 }}>{c.lastUpdated ? new Date(c.lastUpdated.seconds * 1000).toLocaleTimeString() : ""}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* COMMUNITY: global feed with posting */}
        {tab === "community" && (
          <section>
            <h2 style={sectionTitle}>Community Feed</h2>
            <p style={muted}>Public posts from everyone — keep it friendly.</p>

            <form onSubmit={postToCommunity} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input
                value={communityText}
                onChange={(e) => setCommunityText(e.target.value)}
                placeholder="Share something with the community..."
                style={communityInput}
              />
              <button disabled={posting} style={primaryBtn}>{posting ? "Posting…" : "Post"}</button>
            </form>

            <div style={{ display: "grid", gap: 10 }}>
              {community.map(p => (
                <div key={p.id} style={cardLight}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <img src={p.photoURL || "/avatars/male.png"} alt={p.username} style={{ width: 40, height: 40, borderRadius: 999 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.username}</div>
                      <div style={{ color: "#999", fontSize: 12 }}>{p.timestamp ? new Date(p.timestamp.seconds * 1000).toLocaleString() : ""}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, color: "#ddd" }}>{p.text}</div>
                </div>
              ))}
              {community.length === 0 && <div style={empty}>No posts yet — be the first to say hi!</div>}
            </div>
          </section>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <section>
            <h2 style={sectionTitle}>Profile</h2>
            <div style={{ maxWidth: 420, margin: "10px auto", background: "#0f0f10", padding: 16, borderRadius: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img src={profile.photoURL || avatarFor(profile)} alt="me" style={{ width: 78, height: 78, borderRadius: 999 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.username}</div>
                  <div style={{ color: "#aaa", marginTop: 4 }}>{profile.email}</div>
                  <div style={{ color: "#bbb", marginTop: 6 }}>{profile.gender ? `Gender: ${profile.gender}` : "Set your gender in profile"}</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <button style={primaryBtn} onClick={() => alert("Edit profile later (not implemented)")} >Edit Profile</button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* CHAT MODAL (if open) */}
      {openChatWith && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img src={openChatWith.photoURL || "/avatars/male.png"} alt={openChatWith.username} style={{ width: 44, height: 44, borderRadius: 999 }} />
                <div>
                  <div style={{ fontWeight: 800 }}>{openChatWith.username}</div>
                </div>
              </div>
              <div>
                <button onClick={closeChat} style={{ background: "transparent", border: "none", color: "#bbb", fontSize: 18 }}>✕</button>
              </div>
            </div>

            <div ref={chatListRef} style={{ height: 320, overflowY: "auto", marginTop: 12, padding: 8, background: "#070707", borderRadius: 10 }}>
              {chatMessages.length === 0 && <div style={{ color: "#888", textAlign: "center", marginTop: 20 }}>No messages yet — say hi 👋</div>}
              {chatMessages.map(m => (
                <div key={m.id} style={{ display: "flex", justifyContent: m.senderUid === profile.uid ? "flex-end" : "flex-start", marginBottom: 8 }}>
                  <div style={{ maxWidth: "76%" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      {m.senderUid !== profile.uid && <img src={openChatWith.photoURL || "/avatars/male.png"} style={{ width: 28, height: 28, borderRadius: 999 }} />}
                      <div style={{ background: m.senderUid === profile.uid ? "#b30000" : "#1a1a1a", color: "#fff", padding: "8px 12px", borderRadius: 12 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{m.senderName}</div>
                        <div style={{ lineHeight: 1.3 }}>{m.text}</div>
                      </div>
                      {m.senderUid === profile.uid && <img src={profile.photoURL || "/avatars/male.png"} style={{ width: 28, height: 28, borderRadius: 999 }} />}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{m.timestamp ? new Date(m.timestamp.seconds * 1000).toLocaleTimeString() : ""}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendPrivateMessage} style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="Write a message..." style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #222", background: "#0b0b0b", color: "#fff" }} />
              <button type="submit" style={{ background: "#b30000", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 8 }}>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------- Styles ------------------ */
const center = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" };
const nav = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.03)" };
const logoutBtn = { background: "#b30000", border: "none", padding: "8px 12px", borderRadius: 8, color: "#fff" };
const tabbar = { display: "flex", gap: 12, justifyContent: "center", padding: 10, background: "#0b0b0b", borderBottom: "1px solid rgba(255,255,255,0.02)" };
const tabButton = (active) => ({ background: active ? "#1a0b0b" : "transparent", color: active ? "#ff6b6b" : "#bbb", padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" });
const sectionTitle = { fontSize: 20, marginBottom: 6, color: "#fff" };
const muted = { color: "#9a9a9a", marginBottom: 12 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 };
const card = { background: "#0f0f10", padding: 12, borderRadius: 12, textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.6)" };
const avatarSmall = { width: 68, height: 68, borderRadius: 999, objectFit: "cover", margin: "0 auto", display: "block" };
const primaryBtn = { background: "#b30000", color: "#fff", padding: "8px 10px", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 };
const ghostBtn = { background: "transparent", color: "#ccc", padding: "8px 10px", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8 };
const empty = { color: "#8a8a8a", textAlign: "center", padding: 18, background: "#0f0f10", borderRadius: 10 };
const cardLight = { background: "#0f0f10", padding: 12, borderRadius: 10 };
const communityInput = { flex: 1, padding: 10, borderRadius: 8, border: "1px solid #222", background: "#0b0b0b", color: "#fff" };
const chatTile = { display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 10, background: "#0f0f10", cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.6)" };

const modalOverlay = { position: "fixed", left: 0, right: 0, top: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.6)", zIndex: 9999 };
const modalBox = { width: 620, maxWidth: "95%", background: "#0b0b0b", padding: 16, borderRadius: 12, color: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.7)" };
