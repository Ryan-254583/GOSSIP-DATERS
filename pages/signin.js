// pages/signin.js
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("Fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      // fetch profile document and store locally
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          localStorage.setItem("user", JSON.stringify(userDoc.data()));
        } else {
          // fallback
          localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
        }
      } catch (err) {
        console.warn("Could not fetch user doc:", err);
      }
      router.push("/dashboard");
    } catch (err) {
      console.error("signin error", err);
      setMessage(err.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email) {
      setMessage("Enter your email to reset password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent — check your email.");
      setResetMode(false);
    } catch (err) {
      console.error("reset error", err);
      setMessage(err.message || "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <form onSubmit={resetMode ? handleReset : handleSignin} style={card}>
        <h2 style={{ marginBottom: 8 }}>Sign in</h2>

        {message && <div style={{ color: "#ffb3b3", marginBottom: 8 }}>{message}</div>}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        {!resetMode && (
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        )}

        <button type="submit" disabled={loading} style={btn}>
          {loading ? (resetMode ? "Sending..." : "Signing...") : (resetMode ? "Send reset link" : "Sign in")}
        </button>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          {!resetMode ? (
            <>
              <a onClick={() => setResetMode(true)} style={{ color: "#ff6666", cursor: "pointer" }}>Forgot password?</a>
              <a href="/signup" style={{ color: "#ff6666" }}>Create account</a>
            </>
          ) : (
            <a onClick={() => setResetMode(false)} style={{ color: "#ff6666", cursor: "pointer" }}>Back to sign in</a>
          )}
        </div>
      </form>
    </div>
  );
}

const page = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f10" };
const card = { width: 380, padding: 22, borderRadius: 12, background: "#111", color: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.6)" };
const input = { width: "100%", padding: "10px", marginBottom: 10, borderRadius: 8, border: "1px solid #222", background: "#0b0b0b", color: "#fff" };
const btn = { width: "100%", padding: 11, borderRadius: 8, border: "none", background: "#b30000", color: "#fff", fontWeight: 700 };
