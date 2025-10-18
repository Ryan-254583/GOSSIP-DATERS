// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBCVpeekEg6hJGGF-xLYPQfS2G_8bklv1Q",
  authDomain: "cuk-gossip.firebaseapp.com",
  projectId: "cuk-gossip",
  storageBucket: "cuk-gossip.appspot.com",
  messagingSenderId: "194442802549",
  appId: "1:194442802549:web:f2d377abb1bae3634ccf3c",
  measurementId: "G-ZP8JDESMH2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Only load messaging on client
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

// Request browser permission and get device token
export const requestPermission = async () => {
  if (!messaging) return;
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY_HERE" // Replace this with your Firebase Web Push key
      });
      console.log("Notification permission granted, token:", token);
    } else {
      console.log("Notifications denied by user");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

// Listen for real-time messages when app is open
export const listenForMessages = () => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/avatars/male.png"
    });
  });
};
