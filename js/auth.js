// js/auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("authMessage");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        message.innerText = err.message;
      });
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        message.innerText = err.message;
      });
  });
}

// Logout (used in dashboard)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}

// Protect pages & show email
onAuthStateChanged(auth, user => {
  if (window.location.pathname.includes("dashboard")) {
    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById("userEmail").innerText = user.email;
    }
  }
});
