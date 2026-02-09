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

// DASHBOARD PURE CODE WITH POPUP MODAL
const myDashboard = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@300;400;600;700&display=swap');
    :root { --bg: #0f172a; --3d-shadow: 10px 10px 20px #080c16, -10px -10px 20px #16223e; --accent: #4e44e7; }
    
    #dash-wrapper { background: var(--bg); color: white; min-height: 100vh; padding: 20px; width:100%; position:absolute; top:0; left:0; z-index:9999; overflow-y: auto; }
    
    /* Popup Modal Styling */
    #popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 10000; backdrop-filter: blur(8px); }
    .popup-box { background: var(--bg); padding: 40px; border-radius: 30px; box-shadow: var(--3d-shadow); text-align: center; border: 2px solid var(--accent); max-width: 450px; width: 90%; animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .popup-box h2 { font-family: 'Orbitron'; color: var(--accent); margin-bottom: 15px; }
    .popup-box p { margin-bottom: 25px; color: #cbd5e1; line-height: 1.6; }
    .popup-btns { display: flex; gap: 15px; justify-content: center; }
    .btn-follow { background: #25d366; color: white; padding: 12px 25px; border: none; border-radius: 50px; text-decoration: none; font-weight: 700; box-shadow: 0 0 15px #25d366; transition: 0.3s; }
    .btn-close { background: transparent; color: white; padding: 12px 25px; border: 1px solid white; border-radius: 50px; cursor: pointer; transition: 0.3s; }
    .btn-follow:hover { transform: scale(1.1); box-shadow: 0 0 25px #25d366; }
    .btn-close:hover { background: rgba(255,255,255,0.1); }

    /* Dashboard UI Elements */
    .header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .dashboard-logo { font-family: 'Orbitron'; font-size: 32px; background: linear-gradient(to right, #fff, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .btn-3d { padding: 10px 20px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 8px; text-decoration: none; }
    .main-hero-box { background: var(--bg); border-radius: 30px; box-shadow: var(--3d-shadow); padding: 30px; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card-3d { background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: inset 5px 5px 10px #080c16, inset -5px -5px 10px #16223e; text-align: center; }
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 20px 30px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; }
</style>

<div id="popup-overlay">
    <div class="popup-box">
        <i class="fab fa-whatsapp" style="font-size: 50px; color: #25d366; margin-bottom: 15px;"></i>
        <h2>Ziddi Updates</h2>
        <p>Daily New Hacks, Methods aur VIP Tools ke liye hamara Official WhatsApp Channel join karein!</p>
        <div class="popup-btns">
            <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" target="_blank" class="btn-follow">FOLLOW NOW</a>
            <button class="btn-close" onclick="document.getElementById('popup-overlay').style.display='none'">CLOSE NOW</button>
        </div>
    </div>
</div>

<div id="dash-wrapper">
    <header class="header-nav">
        <div class="dashboard-logo">DASHBOARD</div>
        <button class="btn-3d" id="logout-btn" style="color: #ff4757;"><i class="fas fa-power-off"></i> Logout</button>
    </header>

    <div class="main-hero-box">
        <div class="stats-grid">
            <div class="stat-card-3d"><i class="fas fa-clock" style="color:var(--accent)"></i><p>Real-Time</p><h3 id="clock-dash">00:00:00 AM</h3></div>
            <div class="stat-card-3d"><i class="fas fa-users" style="color:var(--accent)"></i><p>Server Status</p><h3 style="color:#2ecc71">ONLINE</h3></div>
            <div class="stat-card-3d"><i class="fas fa-shield-alt" style="color:var(--accent)"></i><p>Protection</p><h3>ACTIVE</h3></div>
        </div>
    </div>

    <h2 style="font-family:Orbitron; margin-bottom:20px; border-left:5px solid var(--accent); padding-left:15px;">Available Tools</h2>
    <div class="tool-row">
        <div><h4 style="color: var(--accent);">Instagram Bruteforce v2</h4><p style="font-size: 12px; color: #94a3b8;">High speed multi-threaded account security tester.</p></div>
        <button class="btn-3d">OPEN TOOL</button>
    </div>
    <div class="tool-row">
        <div><h4 style="color: var(--accent);">Admin Panel Finder</h4><p style="font-size: 12px; color: #94a3b8;">Scans 500+ paths to find hidden admin gateways.</p></div>
        <button class="btn-3d">OPEN TOOL</button>
    </div>
</div>
`;

// AUTH LOGIC
const toggleBtn = document.getElementById('toggleBtn');
if(toggleBtn) toggleBtn.onclick = () => document.getElementById('container').classList.toggle('active');

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

// 12-HOUR CLOCK FUNCTION
function getFormattedTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return hours.toString().padStart(2, '0') + ":" + 
           minutes.toString().padStart(2, '0') + ":" + 
           seconds.toString().padStart(2, '0') + " " + ampm;
}

// ON LOGIN
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        
        // Timer for clock
        setInterval(() => {
            const c = document.getElementById('clock-dash');
            if(c) c.innerText = getFormattedTime();
        }, 1000);
    }
});
