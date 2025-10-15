"use client";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (!agreed) {
      alert("Please accept the terms to continue.");
      return;
    }
    router.push("/signup");
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <Image
        src="/logo.png"
        alt="Background"
        fill
        style={{ objectFit: "cover", filter: "brightness(40%) blur(1px)" }}
      />

      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Gossip Daters 💌</h1>
        <p style={styles.subtitle}>
          Connect, gossip, and have fun! 🎉
        </p>

        <p style={styles.terms}>
          By continuing, you agree to our{" "}
          <a href="/terms" style={styles.link}>Terms & Conditions</a>
        </p>

        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree" style={styles.checkboxLabel}>
            I agree to the terms
          </label>
        </div>

        <button onClick={handleContinue} style={styles.button}>
          Accept & Continue
        </button>

        <a href="https://wa.me/1234567890" target="_blank" style={styles.whatsapp}>
          Follow us on WhatsApp
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    overflow: "hidden",
    backgroundColor: "#1a0000",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.9))",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "40px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 0 25px rgba(255,0,0,0.3)",
  },
  title: { fontSize: "2rem", marginBottom: "10px", color: "#ff4444" },
  subtitle: { fontSize: "1rem", marginBottom: "20px", color: "#ff9999" },
  terms: { fontSize: "0.9rem", marginBottom: "15px", color: "#ff9999" },
  link: { color: "#ff3333", textDecoration: "underline" },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  checkboxLabel: { fontSize: "0.9rem", color: "#ff9999", cursor: "pointer" },
  button: {
    backgroundColor: "#b30000",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  whatsapp: {
    display: "block",
    marginTop: "20px",
    color: "#25D366",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};
