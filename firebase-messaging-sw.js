importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCTBkbRlLBZiSdJvphCit0y044Qobf39nw",
  authDomain: "damlazamanlama.firebaseapp.com",
  projectId: "damlazamanlama",
  storageBucket: "damlazamanlama.firebasestorage.app",
  messagingSenderId: "59864562654",
  appId: "1:59864562654:web:b5717a7dabf3ae6788fb4f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: '/damlazamanlama/icons/icon-192.png',
    badge: '/damlazamanlama/icons/icon-192.png'
  });
});