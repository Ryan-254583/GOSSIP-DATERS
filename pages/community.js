import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Community() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    const q = query(collection(db, "community"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addDoc(collection(db, "community"), {
      username,
      text: message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white shadow text-center font-semibold text-gray-700">
        🌍 Community Feed
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <p className="text-sm text-gray-600 font-semibold">{msg.username}</p>
            <p className="bg-blue-100 px-3 py-2 rounded-lg inline-block">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-3 bg-white shadow-inner flex gap-2 border-t"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
