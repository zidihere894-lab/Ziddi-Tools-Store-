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

// Auth UI Toggle Logic
const toggleBtn = document.getElementById('toggle-btn');
const overlay = document.getElementById('overlay');
const title = document.getElementById('title');
let isLogin = true;

toggleBtn.onclick = () => {
    isLogin = !isLogin;
    title.innerText = isLogin ? "Sign In" : "Sign Up";
    toggleBtn.innerText = isLogin ? "SIGN UP" : "SIGN IN";
    overlay.querySelector('h2').innerHTML = isLogin ? "One of <br> us?" : "New <br> here?";
};

// Login/Signup Action
document.getElementById('auth-btn').onclick = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    try {
        if(isLogin) await signInWithEmailAndPassword(auth, email, pass);
        else await createUserWithEmailAndPassword(auth, email, pass);
    } catch(e) { alert(e.message); }
};

// Listen for Login State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('dashboard-wrapper').style.display = 'block';
        loadDashboard(user.email);
    } else {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('dashboard-wrapper').style.display = 'none';
    }
});

function loadDashboard(email) {
    const dashHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
        .main-dash { background: #080b14; color: white; min-height: 100vh; padding: 20px; font-family: 'Poppins'; }
        .premium-head { font-family: 'Orbitron'; font-size: 24px; text-align: center; color: #4e44e7; text-shadow: 0 0 10px #4e44e7; margin: 20px 0; }
        .nav-3d { display: flex; justify-content: space-around; margin-bottom: 20px; }
        .btn-3d { padding: 10px 20px; background: #080b14; border: none; border-radius: 12px; color: white; box-shadow: 8px 8px 16px #05070d, -8px -8px 16px #0b0f1b; cursor: pointer; transition: 0.3s; }
        .btn-3d:hover { transform: translateY(-5px); color: #4e44e7; }
        .yt-box { background: #080b14; border-radius: 25px; box-shadow: 10px 10px 20px #05070d, -10px -10px 20px #0b0f1b; padding: 25px; margin-bottom: 30px; }
        .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px; }
        .stat-card { background: #080b14; padding: 15px; border-radius: 15px; box-shadow: inset 5px 5px 10px #05070d, inset -5px -5px 10px #0b0f1b; text-align: center; }
        .stat-card h3 { font-family: 'Orbitron'; color: #4e44e7; font-size: 18px; }
        .disclaimer { font-size: 11px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 15px; line-height: 1.5; color: #aaa; }
        .tool-card { display: flex; justify-content: space-between; align-items: center; background: #080b14; padding: 15px; border-radius: 15px; box-shadow: 8px 8px 16px #05070d, -8px -8px 16px #0b0f1b; margin-bottom: 12px; }
        .bottom-nav { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 50px; background: rgba(10,15,25,0.9); padding: 15px 40px; border-radius: 50px; }
    </style>
    <div class="main-dash">
        <h1 class="premium-head">DASHBOARD</h1>
        <div class="nav-3d">
            <button class="btn-3d"><i class="fas fa-home"></i> Home</button>
            <button class="btn-3d" id="logout-btn"><i class="fas fa-power-off"></i> Logout</button>
        </div>
        <div class="yt-box">
            <div class="stats">
                <div class="stat-card"><p>Members</p><h3>1,240</h3></div>
                <div class="stat-card"><p>Clock</p><h3 id="clock">00:00:00</h3></div>
            </div>
            <div class="disclaimer">
                <p>⚠️ <b>DISCLAIMER:</b> Content sirf educational purposes ke liye hai. Stay Legal • Stay Ethical.</p>
                <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" class="btn-3d" style="display:block; text-align:center; margin-top:10px; background:#25d366;">Follow Channel</a>
            </div>
        </div>
        <div id="tool-list">
            <h3 style="font-family:Orbitron; font-size:16px; margin-bottom:15px; color:#4e44e7;">TOOLS</h3>
            <div class="tool-card"><div><strong>System Bypass</strong></div><button class="btn-3d">OPEN</button></div>
        </div>
        <div class="bottom-nav">
             <i class="fas fa-th-large" style="color:#4e44e7; font-size:22px;"></i>
             <i class="fas fa-user-circle" style="color:#94a3b8; font-size:22px;"></i>
        </div>
    </div>`;

    document.getElementById('dashboard-wrapper').innerHTML = dashHTML;
    document.getElementById('logout-btn').onclick = () => signOut(auth);
    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
}
