import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase Configuration
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

// --- AAPKA UI TOGGLE LOGIC ---
const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
const sideTitle = document.getElementById('side-title');

toggleBtn.addEventListener('click', () => {
    container.classList.toggle('active');
    if (container.classList.contains('active')) {
        toggleBtn.innerHTML = "SIGN IN";
        sideTitle.innerHTML = "Secure Your Access";
    } else {
        toggleBtn.innerHTML = "SIGN UP";
        sideTitle.innerHTML = "Welcome Ziddi Hacks";
    }
});

// --- AUTHENTICATION LOGIC ---

// Signup Process
const regBtn = document.getElementById('reg-btn');
if(regBtn) {
    regBtn.addEventListener('click', async () => {
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        if(!email || !pass) return alert("Fill all fields!");

        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            alert("Registration Successful!");
        } catch (error) {
            alert(error.message);
        }
    });
}

// Login Process
const loginBtn = document.getElementById('login-btn');
if(loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        if(!email || !pass) return alert("Fill all fields!");

        try {
            await signInWithEmailAndPassword(auth, email, pass);
            alert("Authorized! Redirecting...");
        } catch (error) {
            alert(error.message);
        }
    });
}

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Access Granted to:", user.email);
        // User login hai, aap yahan redirect kar sakte hain
    }
});
