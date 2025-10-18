"use client";

import { useEffect, useState, useRef } from "react";
import { auth, db, requestPermission, listenForMessages } from "../lib/firebase";
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
  where
} from "firebase/firestore";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("discover");
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [community, setCommunity] = useState([]);
  const [communityText, setCommunityText] = useState("");
  const [posting, setPosting] = useState(false);
  const [openChatWith, setOpenChatWith] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const chatListRef = useRef(null);
  const currentChatUnsubRef = useRef(null);
  const [myChats, setMyChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);

  const avatarFor = (u) => {
    if (!u) return "/avatars/male.png";
    return (u.gender === "female") ? "/avatars/female.png" : (u.photoURL || "/avatars/male.png");
  };

  // Auth watcher
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/signin");
        return;
      }
      setAuthUser(u);
      const docRef = doc(db, "users", u.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        const fallback = {
          uid: u.uid,
          username: u.displayName || (u.email ? u.email.split("@")[0] : "User"),
          gender: null,
          photoURL: u.photoURL || null,
          email: u.email,
          createdAt: serverTimestamp()
        };
        await setDoc(docRef, fallback);
        setProfile(fallback);
      }
    });
    return () => unsub();
  }, []);

  // Request notification permission and listen for new users
  useEffect(() => {
    requestPermission();
    listenForMessages();

    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    let firstLoad = true;
    const unsub = onSnapshot(q, (snap) => {
      if (firstLoad) {
        firstLoad = false;
        return;
      }
      const latest = snap.docChanges().filter(c => c.type === "added")[0];
      if (latest) {
        const newUser = latest.doc.data();
        if (Notification.permission === "granted") {
          new Notification("🎉 New User Joined!", {
            body: `${newUser.username} just joined CUK Gossip.`,
            icon: newUser.photoURL || "/avatars/male.png"
          });
        }
      }
    });

    return () => unsub();
  }, []);

  // Load all users except self
  useEffect(() => {
    if (!profile) return;
    setLoadingMatches(true);
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map(d => d.data()).filter(u => u.uid !== profile.uid);
      setMatches(all);
      setLoadingMatches(false);
    });
    return () => unsub();
  }, [profile]);

  // Community feed
  useEffect(() => {
    const q = query(collection(db, "communityFeed"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setCommunity(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // Chats list
  useEffect(() => {
    if (!profile) return;
    setLoadingChats(true);
    const q = query(collection(db, "chats"), where("users", "array-contains", profile.uid), orderBy("lastUpdated", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMyChats(chats);
      setLoadingChats(false);
    });
    return () => unsub();
  }, [profile]);

  const chatIdFor = (a, b) => [a, b].sort().join("_");

  const openPrivateChat = async (other) => {
    if (!profile) return;
    const chatId = chatIdFor(profile.uid, other.uid);
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
    subscribeToChatMessages(chatId);
    setOpenChatWith(other);
    setTab("messages");
  };

  const subscribeToChatMessages = (chatId) => {
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
      setTimeout(() => {
        if (chatListRef.current) chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }, 80);
    });
    currentChatUnsubRef.current = unsub;
  };

  const sendPrivateMessage = async (e) => {
    e?.preventDefault();
    if (!chatText.trim() || !profile || !openChatWith) return;
    const chatId = chatIdFor(profile.uid, openChatWith.uid);
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderUid: profile.uid,
      senderName: profile.username,
      text: chatText.trim(),
      timestamp: serverTimestamp(),
    });
    await setDoc(doc(db, "chats", chatId), { lastUpdated: serverTimestamp() }, { merge: true });
    setChatText("");
  };

  const postToCommunity = async (e) => {
    e?.preventDefault();
    if (!communityText.trim() || !profile) return;
    setPosting(true);
    await addDoc(collection(db, "communityFeed"), {
      uid: profile.uid,
      username: profile.username,
      text: communityText.trim(),
      timestamp: serverTimestamp()
    });
    setCommunityText("");
    setPosting(false);
  };

  const doLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    router.push("/signin");
  };

  if (!profile) return <div style={center}>Loading profile…</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#070708", color: "#fff", fontFamily: "Inter, sans-serif" }}>
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

      <nav style={tabbar}>
        <button onClick={() => setTab("discover")} style={tabButton(tab === "discover")}>Discover</button>
        <button onClick={() => setTab("messages")} style={tabButton(tab === "messages")}>Messages</button>
        <button onClick={() => setTab("community")} style={tabButton(tab === "community")}>Community</button>
        <button onClick={() => setTab("profile")} style={tabButton(tab === "profile")}>Profile</button>
      </nav>

      <main style={{ maxWidth: 1000, margin: "20px auto", padding: "0 14px" }}>
        {tab === "discover" && (
          <section>
            <h2 style={sectionTitle}>Discover</h2>
            {loadingMatches ? <div style={muted}>Loading…</div> : (
              <div style={grid}>
                {matches.length === 0 && <div style={empty}>No users found.</div>}
                {matches.map(u => (
                  <div key={u.uid} style={card}>
                    <img src={u.photoURL || avatarFor(u)} alt={u.username} style={avatarSmall} />
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{u.username}</div>
                    <div style={{ color: "#bbb", fontSize: 13, marginBottom: 8 }}>{u.gender || "-"}</div>
                    <button onClick={() => openPrivateChat(u)} style={primaryBtn}>Message</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "messages" && (
          <section>
            <h2 style={sectionTitle}>Messages</h2>
            {openChatWith ? (
              <>
                <div style={chatBox} ref={chatListRef}>
                  {chatMessages.map((m) => (
                    <div key={m.id} style={{ marginBottom: 8 }}>
                      <strong>{m.senderName}: </strong>{m.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={sendPrivateMessage} style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <input
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: 8, borderRadius: 8 }}
                  />
                  <button style={primaryBtn}>Send</button>
                </form>
              </>
            ) : (
              <div style={muted}>Tap “Message” on a user to start chatting.</div>
            )}
          </section>
        )}

        {tab === "community" && (
          <section>
            <h2 style={sectionTitle}>Community Feed</h2>
            <form onSubmit={postToCommunity} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                value={communityText}
                onChange={(e) => setCommunityText(e.target.value)}
                placeholder="Share something..."
                style={{ flex: 1, padding: 8, borderRadius: 8 }}
              />
              <button style={primaryBtn}>{posting ? "Posting..." : "Post"}</button>
            </form>
            {community.map((p) => (
              <div key={p.id} style={{ background: "#0e0e0e", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                <strong>{p.username}</strong>
                <p>{p.text}</p>
              </div>
            ))}
          </section>
        )}

        {tab === "profile" && (
          <section style={{ textAlign: "center" }}>
            <h2 style={sectionTitle}>Edit Profile</h2>
            <img src={profile.photoURL || avatarFor(profile)} style={{ width: 100, height: 100, borderRadius: "50%", marginBottom: 10 }} />
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const docRef = doc(db, "users", profile.uid);
                await setDoc(docRef, profile, { merge: true });
                alert("Profile updated!");
              }}
              style={{ maxWidth: 400, margin: "0 auto", textAlign: "left" }}
            >
              <label style={label}>Username</label>
              <input style={input} value={profile.username || ""} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
              <label style={label}>Gender</label>
              <select style={input} value={profile.gender || ""} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label style={label}>Photo URL</label>
              <input style={input} value={profile.photoURL || ""} onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })} />
              <button type="submit" style={{ ...primaryBtn, marginTop: 10, width: "100%" }}>Save Changes</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

/* --- Styles --- */
const center = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" };
const nav = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.03)" };
const logoutBtn = { background: "#b30000", border: "none", padding: "8px 12px", borderRadius: 8, color: "#fff" };
const tabbar = { display: "flex", gap: 12, justifyContent: "center", padding: 10, background: "#0b0b0b", borderBottom: "1px solid rgba(255,255,255,0.02)" };
const tabButton = (active) => ({ background: active ? "#1a0b0b" : "transparent", color: active ? "#ff6b6b" : "#bbb", padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" });
const sectionTitle = { fontSize: 20, marginBottom: 10 };
const muted = { color: "#aaa", marginBottom: 10 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 };
const card = { background: "#0e0e0e", padding: 12, borderRadius: 12, textAlign: "center" };
const avatarSmall = { width: 72, height: 72, borderRadius: "50%", objectFit: "cover" };
const primaryBtn = { background: "#b30000", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
const chatBox = { background: "#0e0e0e", padding: 10, borderRadius: 8, height: "50vh", overflowY: "auto" };
const empty = { color: "#777", textAlign: "center", marginTop: 20 };
const label = { display: "block", marginBottom: 5, marginTop: 10, color: "#aaa" };
const input = { width: "100%", padding: 8, borderRadius: 8, border: "none", background: "#1a1a1a", color: "#fff" };
