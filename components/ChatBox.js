import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure firebase is initialized
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function ChatBox({ currentUser, users }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (text.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      uid: currentUser.uid,
      name: currentUser.name,
      text,
      createdAt: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div className="flex flex-col h-96 w-full bg-black bg-opacity-70 rounded-lg p-4 space-y-2">
      <div className="flex-1 overflow-y-auto space-y-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.uid === currentUser.uid ? 'bg-red-700 text-white self-end' : 'bg-gray-700 text-white self-start'
            }`}
          >
            <strong>{msg.name}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded text-black"
        />
        <button
          onClick={sendMessage}
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
