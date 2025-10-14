"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((u) => u.email === email);

    if (userExists) {
      alert("Account already exists! Please sign in.");
      router.push("/signin");
    } else {
      existingUsers.push({ email, password });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Account created successfully!");
      router.push("/signin");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Create Account</h1>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.switch}>
          Already have an account?{" "}
          <span onClick={() => router.push("/signin")} style={styles.link}>
            Sign In
          </span>
        </p>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a0000",
    color: "white",
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
    filter: "brightness(40%) blur(1px)",
    zIndex: 1,
  },
  formContainer: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "40px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(255,0,0,0.3)",
  },
  title: { fontSize: "1.8rem", marginBottom: "20px", color: "#ff4444" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#b30000",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  switch: { marginTop: "15px", fontSize: "0.9rem", color: "#ff8080" },
  link: { color: "#ff3333", cursor: "pointer", textDecoration: "underline" },
};
