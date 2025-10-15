"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: "Becky", text: "Hey there! 👋" },
    { id: 2, user: "Emmanuel", text: "Hi Becky! How’s your day?" },
    { id: 3, user: "Becky", text: "Pretty good! Just checking this new app out 😄" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [dmUser, setDmUser] = useState(null); // For individual chat

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      router.push("/signin");
    } else {
      setUser(loggedInUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/signin");
  };

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      user: user?.email?.split("@")[0] || "You",
      text: newMessage,
      dm: dmUser || null,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Filter messages for community or individual DM
  const visibleMessages = messages.filter(
    (msg) => !dmUser || msg.user === dmUser || msg.user === (user?.email?.split("@")[0] || "You")
  );

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <nav style={styles.navbar}>
        <h1 style={styles.title}>Gossip Daters 💌</h1>
        {user && (
          <p style={styles.welcome}>
            Logged in as <b>{user.email}</b>
          </p>
        )}
        <div>
          <button onClick={handleLogout} style={styles.navButton}>Logout</button>
          <button onClick={() => localStorage.removeItem("loggedInUser") || router.push("/signin")} style={styles.navButton}>Delete Account</button>
        </div>
      </nav>

      <main style={styles.content}>
        {/* Chat Section */}
        <section style={styles.chatSection}>
          <h2 style={styles.chatTitle}>
            {dmUser ? `Chatting with ${dmUser}` : "Community Feed"}
          </h2>
          <div style={styles.chatBox}>
            {visibleMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.message,
                  alignSelf:
                    msg.user === (user?.email?.split("@")[0] || "You")
                      ? "flex-end"
                      : "flex-start",
                  backgroundColor:
                    msg.user === (user?.email?.split("@")[0] || "You")
                      ? "#b30000"
                      : "#262626",
                }}
              >
                <b>{msg.user}: </b>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Type something fun..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendButton}>
              Send
            </button>
          </div>
        </section>

        {/* Users List */}
        <aside style={styles.usersList}>
          <h3 style={{ color: "#ff4d4d" }}>Users</h3>
          {["Becky", "Emmanuel", "John Doe"].map((u) => (
            <div key={u} style={styles.userCard}>
              <div style={styles.profilePhoto}></div>
              <span>{u}</span>
              <button onClick={() => setDmUser(u)} style={styles.dmButton}>
                DM
              </button>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#1a0000",
    color: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "20px",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(to bottom right, rgba(0,0,0,0.85), rgba(0,0,0,0.95)),
      url('/logo.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(40%) blur(2px)",
    zIndex: 1,
  },
  navbar: {
    position: "relative",
    zIndex: 2,
    width: "95%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  title: { fontSize: "2rem", color: "#ff3333" },
  welcome: { color: "#ff9999" },
  navButton: {
    marginLeft: "10px",
    backgroundColor: "#b30000",
    color: "white",
    padding: "6px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "95%",
    maxWidth: "900px",
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  chatSection: {
    flex: 3,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 25px rgba(255,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  chatTitle: { textAlign: "center", color: "#ff4d4d", marginBottom: "10px" },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "45vh",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid rgba(255,0,0,0.2)",
    borderRadius: "10px",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "75%",
    wordWrap: "break-word",
  },
  inputArea: { display: "flex", marginTop: "15px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px 0 0 8px",
    border: "none",
    outline: "none",
    backgroundColor: "#2d2d2d",
    color: "white",
  },
  sendButton: {
    backgroundColor: "#b30000",
    color: "white",
    border: "none",
    borderRadius: "0 8px 8px 0",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  usersList: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "15px",
    borderRadius: "15px",
    maxHeight: "60vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#262626",
    padding: "8px",
    borderRadius: "8px",
  },
  profilePhoto: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#ff3333",
    marginRight: "10px",
  },
  dmButton: {
    backgroundColor: "#b30000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "4px 8px",
    cursor: "pointer",
  },
};
