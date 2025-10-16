// pages/signup.js
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const avatarFor = (seed, gender) => {
    // DiceBear avatar (SVG) — deterministic per username
    if (gender === "female") {
      return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f4b6c2`;
    }
    // male or default
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !gender || !email || !password) {
      setErr("Please fill all fields.");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      const photoURL = avatarFor(username, gender);

      // Save user profile in Firestore under doc id = uid
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        gender,
        photoURL,
        createdAt: serverTimestamp(),
      });

      // Update auth profile so displayName/photoURL are available
      await updateProfile(user, { displayName: username, photoURL });

      router.push("/dashboard");
    } catch (error) {
      console.error("signup error:", error);
      setErr(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <form onSubmit={handleSubmit} style={card}>
        <h2 style={{ marginBottom: 8 }}>Create account</h2>
        {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}

        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={input} />
        <select value={gender} onChange={e => setGender(e.target.value)} style={input}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={input} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={input} />

        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p style={{ fontSize: 13, marginTop: 10 }}>
          Already have an account? <a href="/signin" style={{ color: "#b30000" }}>Sign in</a>
        </p>
      </form>
    </div>
  );
}

const page = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f10" };
const card = { width: 360, padding: 20, borderRadius: 12, background: "#111", color: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.6)" };
const input = { width: "100%", padding: "10px", marginBottom: 10, borderRadius: 8, border: "1px solid #222", background: "#0b0b0b", color: "#fff" };
const btn = { width: "100%", padding: 11, borderRadius: 8, border: "none", background: "#b30000", color: "#fff", fontWeight: 700 };
