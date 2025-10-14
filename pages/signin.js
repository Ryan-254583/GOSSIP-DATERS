"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");
      router.push("/signup");
    }
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      {/* Top Navigation Menu */}
      <nav style={styles.navbar}>
        <span style={styles.navItem}>Home</span>
        <span style={styles.navItem}>Messages</span>
        <span style={styles.navItem}>Profile</span>
      </nav>

      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {user.name || "User"} 👋</h1>
        <p style={styles.text}>Email: {user.email}</p>

        <div style={styles.buttons}>
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
          <button onClick={handleDeleteAccount} style={styles.delete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1a0000",
    color: "white",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.9)),
      url('/logo.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(35%) blur(1px)",
    zIndex: 1,
  },
  navbar: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "space-around",
    padding: "15px 0",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: "0 0 15px 15px",
    marginTop: "10px",
    color: "#ffcccc",
    fontWeight: "bold",
  },
  navItem: {
    cursor: "pointer",
    transition: "0.2s",
  },
  card: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: "30px 40px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(255,0,0,0.3)",
    marginTop: "20px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#ff4444",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1rem",
    color: "#ffcccc",
    marginBottom: "25px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
  },
  logout: {
    backgroundColor: "#b30000",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
    flex: 1,
  },
  delete: {
    backgroundColor: "#660000",
    border: "1px solid #ff4444",
    color: "#ff4444",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
    flex: 1,
  },
};
