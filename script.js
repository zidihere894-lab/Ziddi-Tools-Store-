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

const myDashboard = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@300;400;600;700&display=swap');
    :root { --bg: #0f172a; --accent: #4e44e7; --3d-shadow: 10px 10px 20px #080c16, -10px -10px 20px #16223e; }
    #dash-wrapper { background: var(--bg); color: white; min-height: 100vh; padding: 20px; position:absolute; top:0; left:0; width:100%; z-index:9999; overflow-y:auto; }
    .wa-neon { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); width: 60px; height: 60px; background: #25d366; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 0 20px #25d366; z-index: 10001; animation: neonPulse 1.5s infinite alternate; text-decoration: none; }
    @keyframes neonPulse { from { box-shadow: 0 0 10px #25d366; } to { box-shadow: 0 0 35px #25d366; } }
    .stat-card-3d { background: var(--bg); padding: 25px; border-radius: 20px; box-shadow: inset 5px 5px 15px #000; text-align: center; }
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; border-left: 5px solid var(--accent); }
    .btn-3d { padding: 10px 20px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; text-decoration: none; }
    .dash-disclaimer { text-align: center; margin-top: 50px; padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; color: #ff4757; font-weight: bold; }
</style>

<a href="https://wa.me/923402439417" class="wa-neon" target="_blank"><i class="fab fa-whatsapp"></i></a>

<div id="dash-wrapper">
    <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <h1 style="font-family:Orbitron; color:var(--accent); font-size:24px;">DASHBOARD</h1>
        <button id="logout-btn" class="btn-3d" style="color:#ff4757;">Logout</button>
    </header>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:40px;">
        <div class="stat-card-3d"><p>Real-Time</p><h3 id="clock-dash" style="font-family:Orbitron;">02:00:00 PM</h3></div>
        <div class="stat-card-3d"><p>Status</p><h3 style="color:#2ecc71">ONLINE</h3></div>
    </div>

    <div id="tools-container"></div>

    <div class="dash-disclaimer">
        ⚠️ DISCLAIMER: All tools are for educational purposes only. <br>
        Admin is not responsible for any misuse.
    </div>
</div>
`;

// Login Logic
const loginBtn = document.getElementById('login-btn');
if(loginBtn) loginBtn.onclick = async () => {
    try { await signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-pass').value); } 
    catch (e) { alert(e.message); }
};

// Signup Logic
const regBtn = document.getElementById('reg-btn');
if(regBtn) regBtn.onclick = async () => {
    try { await createUserWithEmailAndPassword(auth, document.getElementById('reg-email').value, document.getElementById('reg-pass').value); alert("Success!"); } 
    catch (e) { alert(e.message); }
};

function updateClock() {
    let now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    let time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')} ${ampm}`;
    if(document.getElementById('clock-dash')) document.getElementById('clock-dash').innerText = time;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        setInterval(updateClock, 1000);

        onSnapshot(collection(db, "tools"), (snap) => {
            const container = document.getElementById('tools-container');
            container.innerHTML = "";
            snap.forEach(doc => {
                const tool = doc.data();
                container.innerHTML += `<div class="tool-row">
                    <div><h4 style="color:var(--accent)">${tool.name}</h4><p style="font-size:12px; color:#94a3b8">${tool.desc}</p></div>
                    <a href="${tool.link}" target="_blank" class="btn-3d">OPEN</a>
                </div>`;
            });
        });
    }
});
