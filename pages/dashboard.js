import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { deleteUser, signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/signup");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await deleteUser(auth.currentUser);
        alert("Your account has been deleted.");
        router.replace("/signup");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Error deleting account. You may need to log in again before deleting.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <p>Redirecting to signup...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/logo.png"
          alt="Background"
          fill
          className="object-cover opacity-15 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950 opacity-95"></div>
      </div>

      <Header />

      {/* Top-right corner: account options */}
      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium"
        >
          Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
        >
          Delete Account
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome back, {user.displayName || user.email || "User"}!
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl">
          You’re now inside{" "}
          <span className="text-red-500 font-semibold">Gossip Daters</span> — explore,
          chat, and make connections!
        </p>

        <button
          onClick={() => router.push("/chat")}
          className="px-8 py-3 rounded-lg bg-red-700 hover:bg-red-600 font-semibold transition"
        >
          Go to Chat
        </button>
      </main>

      <Footer />
    </div>
  );
}
