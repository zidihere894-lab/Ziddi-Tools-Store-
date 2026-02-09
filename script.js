import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

// DASHBOARD DESIGN (Pure Original Style)
const myDashboard = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@300;400;600;700&display=swap');
    :root { --bg: #0f172a; --accent: #4e44e7; --3d-shadow: 10px 10px 20px #080c16, -10px -10px 20px #16223e; }
    #dash-wrapper { background: var(--bg); color: white; min-height: 100vh; padding: 20px; position:absolute; top:0; left:0; width:100%; z-index:9999; overflow-y:auto; }
    
    /* WhatsApp Neon Floating Logo (Center Right) */
    .wa-float { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); width: 65px; height: 65px; background: #25d366; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 35px; box-shadow: 0 0 20px #25d366; z-index: 10001; animation: neonPulse 1.5s infinite alternate; text-decoration: none; }
    @keyframes neonPulse { from { box-shadow: 0 0 10px #25d366, 0 0 20px #25d366; } to { box-shadow: 0 0 30px #25d366, 0 0 50px #25d366; } }

    /* Popup Modal */
    #popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 10002; backdrop-filter: blur(8px); }
    .popup-box { background: var(--bg); padding: 40px; border-radius: 30px; border: 2px solid var(--accent); text-align: center; max-width: 420px; box-shadow: var(--3d-shadow); }
    
    .stat-card-3d { background: var(--bg); padding: 25px; border-radius: 20px; box-shadow: inset 5px 5px 15px #000, inset -5px -5px 15px #1a2642; text-align: center; }
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; border-left: 5px solid var(--accent); }
    .btn-3d { padding: 12px 25px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; text-decoration: none; font-weight: 600; }
    
    .dash-disclaimer { text-align: center; margin-top: 60px; padding: 25px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 14px; color: #ff4757; font-weight: 600; line-height: 1.5; }
</style>

<a href="https://wa.me/923402439417" class="wa-float" target="_blank"><i class="fab fa-whatsapp"></i></a>

<div id="popup-overlay">
    <div class="popup-box">
        <h2 style="font-family:Orbitron; color:var(--accent)">UPDATE NOTICE</h2>
        <p style="margin:20px 0; color:#cbd5e1;">Daily New Hacks, Methods aur Tools ke liye hamara Channel Follow karein!</p>
        <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" target="_blank" style="background:#25d366; color:white; padding:12px 30px; border-radius:50px; text-decoration:none; font-weight:bold; display:block; margin-bottom:15px; box-shadow: 0 5px 15px rgba(37,211,102,0.4);">FOLLOW NOW</a>
        <button onclick="document.getElementById('popup-overlay').remove()" style="background:none; color:white; border:1px solid white; padding:10px 20px; border-radius:50px; cursor:pointer; font-size:12px;">Close Now</button>
    </div>
</div>

<div id="dash-wrapper">
    <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:40px;">
        <h1 style="font-family:Orbitron; color:var(--accent); font-size:28px; letter-spacing:2px;">DASHBOARD</h1>
        <button id="logout-btn" class="btn-3d" style="color:#ff4757; border: 1px solid rgba(255,71,87,0.3);">LOGOUT</button>
    </header>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:25px; margin-bottom:50px;">
        <div class="stat-card-3d"><p style="color:#94a3b8; font-size:14px; margin-bottom:10px;">Current Time</p><h3 id="clock-dash" style="font-family:Orbitron; font-size:24px; color:#fff;">02:00:00 PM</h3></div>
        <div class="stat-card-3d"><p style="color:#94a3b8; font-size:14px; margin-bottom:10px;">Portal Status</p><h3 style="color:#2ecc71; font-family:Orbitron;">SECURED</h3></div>
    </div>

    <h2 style="font-family:Orbitron; font-size:20px; margin-bottom:25px; color:var(--accent);">PREMIUM TOOLS</h2>
    <div id="tools-container">
        </div>

    <div class="dash-disclaimer">
        ⚠️ DISCLAIMER: This portal is for educational and security research purposes only.<br>
        The administrator is not responsible for any misuse or illegal activities performed by users.
    </div>
</div>
`;

// AUTH ACTIONS
const loginBtn = document.getElementById('login-btn');
if(loginBtn) loginBtn.onclick = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { alert(e.message); }
};

const regBtn = document.getElementById('reg-btn');
if(regBtn) regBtn.onclick = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    try { await createUserWithEmailAndPassword(auth, email, pass); alert("Registration Successful!"); } catch (e) { alert(e.message); }
};

// 12-HOUR CLOCK LOGIC
function updateClock() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    let timeString = `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;
    const clockEl = document.getElementById('clock-dash');
    if(clockEl) clockEl.innerText = timeString;
}

// SESSION MONITOR
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        
        setInterval(updateClock, 1000);
        updateClock();

        // LOAD TOOLS DYNAMICALLY
        onSnapshot(collection(db, "tools"), (snapshot) => {
            const container = document.getElementById('tools-container');
            container.innerHTML = "";
            snapshot.forEach((doc) => {
                const tool = doc.data();
                container.innerHTML += `
                    <div class="tool-row">
                        <div>
                            <h4 style="color:var(--accent); font-family:Orbitron;">${tool.name}</h4>
                            <p style="font-size:13px; color:#94a3b8; margin-top:5px;">${tool.desc}</p>
                        </div>
                        <a href="${tool.link}" target="_blank" class="btn-3d">LAUNCH</a>
                    </div>`;
            });
            if(snapshot.empty) container.innerHTML = "<p style='text-align:center; opacity:0.5;'>No tools added by admin yet.</p>";
        });
    }
});
