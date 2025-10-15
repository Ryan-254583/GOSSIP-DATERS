"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      router.push("/dashboard");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>Sign In</h1>
        <form onSubmit={handleSignin}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
