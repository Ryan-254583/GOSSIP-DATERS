import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailInUse(false);

    const numericAge = parseInt(age, 10);
    if (!numericAge || numericAge < 18) {
      setError("You must be 18 years or older to register.");
      return;
    }

    if (!name.trim() || !username.trim()) {
      setError("Please enter your full name and a username.");
      return;
    }

    setLoading(true);
    try {
      // create user with firebase auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // set display name
      await updateProfile(user, { displayName: name });

      // store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        age: numericAge,
        profilePic: "",
        isOnline: true,
        createdAt: new Date().toISOString(),
      });

      // redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setEmailInUse(true);
        setError("That email is already registered. You can sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Choose a stronger password (at least 6 characters).");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to register. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background (full-page) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/logo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          opacity: 0.4,
        }}
      />

      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-transparent">
          <div className="bg-gradient-to-br from-black/90 to-red-900/90 p-8 rounded-2xl shadow-xl border border-red-800">
            <h1 className="text-2xl font-bold text-white text-center mb-3">Create an account</h1>
            <p className="text-sm text-gray-300 text-center mb-6">
              Join <span className="font-semibold text-red-400">Gossip Daters</span> — 18+ only.
            </p>

            {error && (
              <div className="mb-4 text-sm text-red-300 bg-red-900/30 p-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md bg-black/60 text-white border border-gray-700 placeholder-gray-400"
                required
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-md bg-black/60 text-white border border-gray-700 placeholder-gray-400"
                required
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-1/3 p-3 rounded-md bg-black/60 text-white border border-gray-700 placeholder-gray-400"
                  required
                  min="18"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-3 rounded-md bg-black/60 text-white border border-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-black/60 text-white border border-gray-700 placeholder-gray-400"
                required
                minLength={6}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md font-semibold text-white transition ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-700 hover:bg-red-600"
                }`}
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            {/* If email already in use, show sign-in option inline */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/signin")}
                  className="text-red-300 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>

              {emailInUse && (
                <div className="mt-3">
                  <p className="text-sm text-yellow-200">It seems that email is already registered.</p>
                  <div className="mt-2 flex justify-center gap-3">
                    <button
                      onClick={() => router.push("/signin")}
                      className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium"
                    >
                      Go to Sign in
                    </button>
                    <button
                      onClick={() => {
                        setEmailInUse(false);
                        setError("");
                      }}
                      className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white"
                    >
                      Try different email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* small footer note */}
          <p className="text-xs text-gray-400 mt-3 text-center">
            By registering you accept our Terms & Conditions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
