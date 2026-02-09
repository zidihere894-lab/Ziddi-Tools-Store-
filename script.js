import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFy28nNtxhkjfpOd0aCfYkjHUwErh1WVQ",
    authDomain: "movie-1e6fc.firebaseapp.com",
    projectId: "movie-1e6fc",
    storageBucket: "movie-1e6fc.firebasestorage.app",
    messagingSenderId: "371616954594",
    appId: "1:371616954594:web:977d88ec7570df351246bb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI Toggle Logic
const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
const sideTitle = document.getElementById('side-title');

toggleBtn.onclick = () => {
    container.classList.toggle('active');
    if (container.classList.contains('active')) {
        toggleBtn.innerHTML = "SIGN IN";
        sideTitle.innerHTML = "Secure Your Access";
    } else {
        toggleBtn.innerHTML = "SIGN UP";
        sideTitle.innerHTML = "Welcome Ziddi Hacks";
    }
};

// Login Action
document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Authorized! Redirecting...");
    } catch (e) { alert(e.message); }
};

// Register Action
document.getElementById('reg-btn').onclick = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Registered Successfully!");
    } catch (e) { alert(e.message); }
};

// IMPORTANT: Dashboard Open Logic
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Hide Login Page, Show Dashboard
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        document.body.style.background = "#080b14"; // Darker dashboard theme
    } else {
        document.getElementById('auth-page').style.display = 'flex';
        document.getElementById('dashboard-section').style.display = 'none';
    }
});
