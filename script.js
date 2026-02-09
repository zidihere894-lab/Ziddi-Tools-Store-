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

// Dashboard Injection Code (PURE CODE AS REQUESTED)
const myDashboard = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@300;400;600;700&display=swap');
    :root { --bg: #0f172a; --3d-shadow: 10px 10px 20px #080c16, -10px -10px 20px #16223e; --accent: #4e44e7; }
    #dash-wrapper { background: var(--bg); color: white; min-height: 100vh; padding: 20px; width:100%; position:absolute; top:0; left:0; z-index:9999; }
    .header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .dashboard-logo { font-family: 'Orbitron'; font-size: 32px; background: linear-gradient(to right, #fff, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .btn-3d { padding: 10px 20px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 8px; text-decoration: none; }
    .main-hero-box { background: var(--bg); border-radius: 30px; box-shadow: var(--3d-shadow); padding: 30px; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card-3d { background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: inset 5px 5px 10px #080c16, inset -5px -5px 10px #16223e; text-align: center; }
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 20px 30px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; }
    .bottom-nav { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 30px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); padding: 15px 40px; border-radius: 50px; box-shadow: var(--3d-shadow); }
    .nav-icon { font-size: 24px; color: #94a3b8; cursor: pointer; }
    .nav-icon.active { color: var(--accent); }
    .tab-content { display: none; } .tab-content.active { display: block; }
</style>
<div id="dash-wrapper">
    <header class="header-nav">
        <div class="dashboard-logo">DASHBOARD</div>
        <div class="top-btns">
            <button class="btn-3d" id="logout-btn" style="color: #ff4757;"><i class="fas fa-power-off"></i> Logout</button>
        </div>
    </header>
    <div id="tab-dashboard" class="tab-content active">
        <div class="main-hero-box">
            <div class="stats-grid">
                <div class="stat-card-3d"><i class="fas fa-users" style="color:var(--accent)"></i><p>Members</p><h3>1,240</h3></div>
                <div class="stat-card-3d"><i class="fas fa-clock" style="color:var(--accent)"></i><p>Real-Time</p><h3 id="clock-dash">00:00:00</h3></div>
                <div class="stat-card-3d"><i class="fab fa-whatsapp" style="color:#2ecc71"></i><p>Status</p><h3 style="color: #2ecc71">CONNECTED</h3></div>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" class="btn-3d" style="background:#25d366; display:inline-flex;">Follow Channel</a>
            </div>
        </div>
        <h2 style="font-family:Orbitron; margin-bottom:20px; border-left:5px solid var(--accent); padding-left:15px;">Available Tools</h2>
        <div class="tool-row">
            <div><h4 style="color: var(--accent);">Instagram Bruteforce v2</h4><p style="font-size: 12px; color: #94a3b8;">High speed tester.</p></div>
            <button class="btn-3d">OPEN TOOL</button>
        </div>
    </div>
</div>`;

// Toggle Login Logic
const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        container.classList.toggle('active');
        toggleBtn.innerHTML = container.classList.contains('active') ? "SIGN IN" : "SIGN UP";
    });
}

// Auth Actions
document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { alert(e.message); }
};

document.getElementById('reg-btn').onclick = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    try { await createUserWithEmailAndPassword(auth, email, pass); alert("Account Created!"); } catch (e) { alert(e.message); }
};

// State Change (Connect index with dash)
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        setInterval(() => {
            const now = new Date();
            const c = document.getElementById('clock-dash');
            if(c) c.innerText = now.getHours().toString().padStart(2,'0')+":"+now.getMinutes().toString().padStart(2,'0')+":"+now.getSeconds().toString().padStart(2,'0');
        }, 1000);
    }
});
