import { useState, useEffect } from "react";

export default function Home() {
  const [agreed, setAgreed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem("agreedToTerms");
    const storedEmail = localStorage.getItem("userEmail");
    if (hasAgreed) setAgreed(true);
    if (storedEmail) {
      setEmail(storedEmail);
      setLoggedIn(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("agreedToTerms", "true");
    setAgreed(true);
  };

  const handleSignup = () => {
    if (!email) return alert("Please enter an email.");
    const existingEmail = localStorage.getItem("userEmail");
    if (existingEmail && existingEmail === email) {
      setIsReturningUser(true);
      alert("This email is already registered. Please sign in.");
      return;
    }
    localStorage.setItem("userEmail", email);
    alert("Signup successful!");
    setLoggedIn(true);
  };

  const handleLogin = () => {
    const existingEmail = localStorage.getItem("userEmail");
    if (existingEmail === email) {
      alert("Login successful!");
      setLoggedIn(true);
    } else {
      alert("No account found. Please sign up first.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
  };

  const confirmDelete = () => setShowConfirm(true);
  const cancelDelete = () => setShowConfirm(false);
  const handleDelete = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("agreedToTerms");
    setLoggedIn(false);
    setAgreed(false);
    setEmail("");
    setShowConfirm(false);
  };

  return (
    <div style={styles.container}>
      {!agreed ? (
        <div style={styles.centerCard}>
          <h1 style={styles.heading}>Welcome to Gossip Daters 💋</h1>
          <p style={styles.subtext}>
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
          <button style={styles.mainBtn} onClick={handleAgree}>
            Agree & Continue
          </button>
        </div>
      ) : !loggedIn ? (
        <div style={{ ...styles.centerCard, background: "#1a0000e0" }}>
          <h2 style={styles.heading}>
            {isReturningUser ? "Sign In" : "Create Account"}
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            style={{
              ...styles.mainBtn,
              background: isReturningUser
                ? "linear-gradient(45deg,#8b0000,#ff1a1a)"
                : "linear-gradient(45deg,#ff4d4d,#ff1a1a)",
            }}
            onClick={isReturningUser ? handleLogin : handleSignup}
          >
            {isReturningUser ? "Sign In" : "Sign Up"}
          </button>
          <p style={styles.switchText}>
            {isReturningUser ? "New here?" : "Already a member?"}{" "}
            <span
              onClick={() => setIsReturningUser(!isReturningUser)}
              style={styles.link}
            >
              {isReturningUser ? "Create an account" : "Sign in"}
            </span>
          </p>
        </div>
      ) : (
        <div style={styles.dashboard}>
          <div style={styles.overlay}>
            <h1 style={styles.heading}>Welcome back 💞</h1>
            <p style={styles.subtext}>Logged in as {email}</p>
            <div style={styles.buttonRow}>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
              <button style={styles.deleteBtn} onClick={confirmDelete}>
                Delete Account
              </button>
            </div>
          </div>
          {showConfirm && (
            <div style={styles.modalBackdrop}>
              <div style={styles.modal}>
                <h3 style={{ color: "white" }}>Confirm Account Deletion</h3>
                <p style={{ color: "#ddd" }}>
                  Are you sure you want to permanently delete your account?
                </p>
                <div style={styles.modalButtons}>
                  <button style={styles.cancelBtn} onClick={cancelDelete}>
                    Cancel
                  </button>
                  <button style={styles.confirmBtn} onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right,#330000,#000)",
    backgroundImage: "url('/logo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,0.75)",
    padding: "2rem",
    borderRadius: "1rem",
    backdropFilter: "blur(8px)",
    width: "90%",
    maxWidth: "400px",
  },
  centerCard: {
    background: "rgba(0,0,0,0.7)",
    padding: "2rem",
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "400px",
    color: "white",
    boxShadow: "0 0 20px rgba(255,0,0,0.3)",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "white",
  },
  subtext: {
    color: "#ccc",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "0.5rem",
    border: "none",
    marginBottom: "1rem",
    outline: "none",
    fontSize: "1rem",
  },
  mainBtn: {
    width: "100%",
    padding: "0.8rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  switchText: {
    marginTop: "1rem",
    color: "#ccc",
  },
  link: {
    color: "#ff4d4d",
    cursor: "pointer",
    textDecoration: "underline",
  },
  dashboard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    color: "white",
    flexDirection: "column",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  logoutBtn: {
    background: "#333",
    color: "white",
    padding: "0.6rem 1rem",
    border: "1px solid white",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "linear-gradient(45deg,#8b0000,#ff0000)",
    color: "white",
    padding: "0.6rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#1a0000",
    padding: "2rem",
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(255,0,0,0.4)",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  cancelBtn: {
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
  },
  confirmBtn: {
    background: "linear-gradient(45deg,#ff1a1a,#990000)",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
  },
};

