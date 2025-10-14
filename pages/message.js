import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import { auth, db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function MessagePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) router.push('/signin');
      else setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const fetchedUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.id !== currentUser?.uid);
      setUsers(fetchedUsers);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/signin');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background logo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/logo.png"
          alt="CUK Gossip Logo"
          className="w-full h-full object-cover opacity-40 filter brightness-50"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-6 max-w-4xl mx-auto w-full">
        <Header />

        <div className="flex justify-between w-full mb-6">
          <h2 className="text-3xl font-bold text-red-800">Messages</h2>
          <button
            onClick={handleLogout}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {currentUser && <ChatBox currentUser={currentUser} users={users} />}

        <Footer />
      </div>
    </div>
  );
}
