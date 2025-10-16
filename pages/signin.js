// pages/signin.js
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        // store in localStorage for dashboard quick load
        localStorage.setItem("user", JSON.stringify(data));
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("signin error", error);
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <form onSubmit={handleSignin} style={card}>
        <h2 style={{ marginBottom: 8 }}>Sign in</h2>
        {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}

        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={input} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={input} />

        <button type="submit" disabled={loading} style={btn}>{loading ? "Signing..." : "Sign in"}</button>

        <p style={{ fontSize: 13, marginTop: 10 }}>
          Don’t have an account? <a href="/signup" style={{ color: "#b30000" }}>Create one</a>
        </p>
      </form>
    </div>
  );
}

const page = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f10" };
const card = { width: 360, padding: 20, borderRadius: 12, background: "#111", color: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.6)" };
const input = { width: "100%", padding: "10px", marginBottom: 10, borderRadius: 8, border: "1px solid #222", background: "#0b0b0b", color: "#fff" };
const btn = { width: "100%", padding: 11, borderRadius: 8, border: "none", background: "#b30000", color: "#fff", fontWeight: 700 };
