"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: "Becky", text: "Hey there! 👋" },
    { id: 2, user: "Emmanuel", text: "Hi Becky! How’s your day?" },
    { id: 3, user: "Becky", text: "Pretty good! Just checking this new app out 😄" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Check if user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      router.push("/signin");
    } else {
      setUser(loggedInUser);
    }
  }, [router]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };

  // ✅ Delete Account
  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== user?.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("user");
    alert("Your account has been deleted.");
    router.push("/signup");
  };

  // ✅ Send Message
  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      user: user?.email?.split("@")[0] || "You",
      text: newMessage,
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Gossip Daters 💌</h1>
          {user && (
            <p style={styles.welcome}>
              Logged in as <b>{user.email}</b>
            </p>
          )}
          <div style={styles.buttons}>
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
            <button onClick={handleDeleteAccount} style={styles.delete}>
              Delete Account
            </button>
          </div>
        </header>

        {/* Chat Section */}
        <main style={styles.chatSection}>
          <h2 style={styles.chatTitle}>Community Feed</h2>
          <div style={styles.chatBox}>
            {messages.map((msg) => (
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
        </main>
      </div>
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
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(to bottom right, rgba(0,0,0,0.9), rgba(0,0,0,0.95)),
      url('/logo.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(30%) blur(2px)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "95%",
    maxWidth: "900px",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: { fontSize: "2rem", color: "#ff3333", marginBottom: "5px" },
  welcome: { fontSize: "1rem", color: "#ff9999" },
  buttons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  logout: {
    backgroundColor: "#b30000",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  delete: {
    backgroundColor: "#660000",
    color: "#ffcccc",
    padding: "8px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  chatSection: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 25px rgba(255,0,0,0.3)",
  },
  chatTitle: {
    textAlign: "center",
    color: "#ff4d4d",
    marginBottom: "10px",
  },
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
  inputArea: {
    display: "flex",
    marginTop: "15px",
  },
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
    transition: "0.3s",
  },
};
