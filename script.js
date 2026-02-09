import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase Configuration
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

// Auth Toggle & UI Elements
const authBtn = document.getElementById('auth-btn');
const authTitle = document.getElementById('auth-title');
const toggleAuth = document.getElementById('toggle-auth');
let isLogin = true;

toggleAuth.onclick = () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Sign In" : "Sign Up";
    authBtn.innerText = isLogin ? "LOGIN" : "REGISTER";
    toggleAuth.innerText = isLogin ? "New here? Create an account" : "Already have an account? Login";
};

// Handle Login/Signup
authBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created!");
        }
    } catch (error) {
        alert(error.message);
    }
};

// Auth State Observer (Keep user logged in or show dashboard)
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-section').style.display = 'none';
        const dash = document.getElementById('dashboard-wrapper');
        dash.style.display = 'block';
        loadDashboard(user.email);
    } else {
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('dashboard-wrapper').style.display = 'none';
    }
});

// Dashboard Content (Aapka Professional 3D Dashboard Code)
function loadDashboard(userEmail) {
    const dashboardHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
        .dash-body { padding: 20px; color: white; background: #0f172a; min-height: 100vh; }
        .dashboard-logo { font-family: 'Orbitron'; font-size: 28px; text-align: center; color: #4e44e7; text-shadow: 0 0 15px rgba(78,68,231,0.8); margin-bottom: 30px; }
        .header-nav { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .btn-3d { padding: 10px 15px; background: #0f172a; border: none; border-radius: 12px; color: white; box-shadow: 8px 8px 16px #080c16, -8px -8px 16px #16223e; cursor: pointer; transition: 0.3s; }
        .btn-3d:hover { transform: translateY(-3px); color: #4e44e7; }
        .main-hero-box { background: #0f172a; border-radius: 25px; box-shadow: 10px 10px 20px #080c16, -10px -10px 20px #16223e; padding: 25px; margin-bottom: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; }
        .stat-card-3d { background: #0f172a; padding: 15px; border-radius: 15px; box-shadow: inset 5px 5px 10px #080c16, inset -5px -5px 10px #16223e; text-align: center; }
        .channel-info { background: rgba(255,255,255,0.02); padding: 15px; border-radius: 15px; margin-top: 20px; font-size: 12px; line-height: 1.5; color: #cbd5e1; }
        .tool-row { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 15px; border-radius: 15px; box-shadow: 8px 8px 16px #080c16, -8px -8px 16px #16223e; margin-bottom: 12px; }
        .bottom-nav { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 40px; background: rgba(15,23,42,0.9); padding: 12px 35px; border-radius: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .nav-icon { font-size: 22px; color: #94a3b8; cursor: pointer; }
    </style>

    <div class="dash-body">
        <header class="header-nav">
            <div class="dashboard-logo">DASHBOARD</div>
            <div style="display:flex; gap:10px;">
                <button class="btn-3d" id="logout-btn"><i class="fas fa-power-off"></i> Logout</button>
            </div>
        </header>

        <div class="main-hero-box">
            <div class="stats-grid">
                <div class="stat-card-3d"><h4>Members</h4><p>1,240</p></div>
                <div class="stat-card-3d"><h4>Tools</h4><p>48</p></div>
                <div class="stat-card-3d"><h4>Clock</h4><p id="live-clock">00:00</p></div>
            </div>
            <div class="channel-info">
                <p>⚠️ <b>DISCLAIMER:</b> Is WhatsApp Channel ka tamam content sirf educational purposes ke liye hai. Hum illegal activities ko support nahi karte.</p>
                <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" target="_blank" class="btn-3d" style="display:block; text-align:center; margin-top:10px; background:#25d366;">Follow Channel</a>
            </div>
        </div>

        <h3 style="font-family:Orbitron; margin-bottom:15px; color:#4e44e7;">PREMIUM TOOLS</h3>
        <div class="tool-row">
            <div><strong>IG Recovery Pro</strong><br><small>Security audit tool</small></div>
            <button class="btn-3d">OPEN</button>
        </div>
        
        <div id="profile-section" style="display:none; text-align:center;" class="main-hero-box">
            <img src="https://ui-avatars.com/api/?name=User&background=4e44e7&color=fff" style="border-radius:50%; width:80px; margin-bottom:10px;">
            <h4>${userEmail}</h4>
            <input type="text" placeholder="Full Name" style="width:80%; padding:8px; margin:5px; border-radius:5px; border:none;">
            <button class="btn-3d">Save</button>
        </div>

        <div class="bottom-nav">
            <i class="fas fa-home nav-icon" id="show-home"></i>
            <i class="fas fa-user-circle nav-icon" id="show-profile"></i>
        </div>
    </div>
    `;

    document.getElementById('dashboard-wrapper').innerHTML = dashboardHTML;

    // Internal Dashboard Logic
    document.getElementById('logout-btn').onclick = () => signOut(auth);
    
    // Tab Switching
    document.getElementById('show-profile').onclick = () => {
        document.querySelector('.stats-grid').parentElement.style.display = 'none';
        document.getElementById('profile-section').style.display = 'block';
    }
    document.getElementById('show-home').onclick = () => {
        document.querySelector('.stats-grid').parentElement.style.display = 'block';
        document.getElementById('profile-section').style.display = 'none';
    }

    // Live Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('live-clock').innerText = now.toLocaleTimeString();
    }, 1000);
}
