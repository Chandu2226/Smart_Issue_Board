// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJJueBqUYHK8un5HSIzjYp0ZJ3GjrOVno",
  authDomain: "smart-issue-board-97452.firebaseapp.com",
  projectId: "smart-issue-board-97452",
  storageBucket: "smart-issue-board-97452.firebasestorage.app",
  messagingSenderId: "208299868910",
  appId: "1:208299868910:web:dc750048d631396e1a29ff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
