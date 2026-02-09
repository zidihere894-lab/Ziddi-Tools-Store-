import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

// UI Toggle Logic (Login/Signup Slide)
const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
const sideTitle = document.getElementById('side-title');

if(toggleBtn) {
    toggleBtn.onclick = () => {
        container.classList.toggle('active');
        toggleBtn.innerHTML = container.classList.contains('active') ? "SIGN IN" : "SIGN UP";
        sideTitle.innerHTML = container.classList.contains('active') ? "Secure Your Access" : "Welcome Ziddi Hacks";
    };
}

// Login/Signup Functions
document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try { await signInWithEmailAndPassword(auth, email, pass); alert("Authorized!"); } 
    catch (e) { alert(e.message); }
};

document.getElementById('reg-btn').onclick = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    try { await createUserWithEmailAndPassword(auth, email, pass); alert("Account Created!"); } 
    catch (e) { alert(e.message); }
};

document.getElementById('logout-btn').onclick = () => signOut(auth);

// Tab Switching
document.getElementById('nav-dash').onclick = () => switchTab('tab-dashboard', 'nav-dash');
document.getElementById('nav-prof').onclick = () => switchTab('tab-profile', 'nav-prof');

function switchTab(id, navId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-icon').forEach(n => n.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById(navId).classList.add('active');
}

// Auth Observer (Dashboard Open/Close)
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('dashboard-page').style.display = 'block';
    } else {
        document.getElementById('auth-page').style.display = 'flex';
        document.getElementById('dashboard-page').style.display = 'none';
    }
});

// Clock
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + 
    now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
}, 1000);
