// ── Firebase Configuration ────────────────────────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyDa3UpsWshOCqUr6jq67zncx-hDn8HWl4o",
    authDomain: "lab-clin-ordonez.firebaseapp.com",
    projectId: "lab-clin-ordonez",
    storageBucket: "lab-clin-ordonez.firebasestorage.app",
    messagingSenderId: "653276741036",
    appId: "1:653276741036:web:6cbb42deb233e6baca4e09"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
