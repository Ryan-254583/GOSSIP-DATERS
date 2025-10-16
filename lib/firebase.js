// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCVpeekEg6hJGGF-xLYPQfS2G_8bklv1Q",
  authDomain: "cuk-gossip.firebaseapp.com",
  projectId: "cuk-gossip",
  storageBucket: "cuk-gossip.appspot.com",
  messagingSenderId: "194442802549",
  appId: "1:194442802549:web:f2d377abb1bae3634ccf3c",
  measurementId: "G-ZP8JDESMH2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
