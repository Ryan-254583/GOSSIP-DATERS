importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBCVpeekEg6hJGGF-xLYPQfS2G_8bklv1Q",
  authDomain: "cuk-gossip.firebaseapp.com",
  projectId: "cuk-gossip",
  storageBucket: "cuk-gossip.appspot.com",
  messagingSenderId: "194442802549",
  appId: "1:194442802549:web:f2d377abb1bae3634ccf3c",
  measurementId: "G-ZP8JDESMH2"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/avatars/male.png"
  });
});
