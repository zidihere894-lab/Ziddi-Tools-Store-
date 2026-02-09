import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    
    .wa-float { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); width: 60px; height: 60px; background: #25d366; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 0 20px #25d366; z-index: 10001; animation: neonPulse 1.5s infinite alternate; text-decoration: none; }
    @keyframes neonPulse { from { box-shadow: 0 0 10px #25d366; } to { box-shadow: 0 0 30px #25d366; } }

    .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .stat-card-3d { background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: inset 5px 5px 15px #000; text-align: center; border: 1px solid rgba(255,255,255,0.05); }
    
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 15px 25px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; border-left: 5px solid var(--accent); }
    .btn-3d { padding: 10px 20px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; text-decoration: none; font-weight: bold; font-size: 13px; }
    
    .dash-disclaimer { text-align: center; margin-top: 60px; padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; color: #ff4757; font-weight: bold; }
</style>

<a href="https://wa.me/923402439417" class="wa-float" target="_blank"><i class="fab fa-whatsapp"></i></a>

<div id="dash-wrapper">
    <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <h1 style="font-family:Orbitron; color:var(--accent); font-size:22px;">DASHBOARD</h1>
        <button id="logout-btn" class="btn-3d" style="color:#ff4757;">LOGOUT</button>
    </header>

    <div class="stat-grid">
        <div class="stat-card-3d"><p style="font-size:12px; opacity:0.7;">Current Time</p><h3 id="clock-dash" style="font-family:Orbitron;">--:--:-- --</h3></div>
        <div class="stat-card-3d"><p style="font-size:12px; opacity:0.7;">Total Members</p><h3 id="member-count" style="font-family:Orbitron;">0</h3></div>
        <div class="stat-card-3d"><p style="font-size:12px; opacity:0.7;">Portal Status</p><h3 style="color:#2ecc71; font-family:Orbitron;">SECURED</h3></div>
    </div>

    <h2 style="font-family:Orbitron; font-size:18px; margin-bottom:20px; color:var(--accent);">PREMIUM TOOLS</h2>
    <div id="tools-container">
        <p style="text-align:center; opacity:0.5;">Cleaning old data...</p>
    </div>

    <div class="dash-disclaimer">
        ⚠️ DISCLAIMER: All tools are for educational purposes only. <br>
        Admin is not responsible for any misuse or illegal activities.
    </div>
</div>
`;

// AUTH
document.getElementById('login-btn').onclick = async () => {
    try { await signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-pass').value); } 
    catch (e) { alert(e.message); }
};

document.getElementById('reg-btn').onclick = async () => {
    try { await createUserWithEmailAndPassword(auth, document.getElementById('reg-email').value, document.getElementById('reg-pass').value); } 
    catch (e) { alert(e.message); }
};

// 12hr Clock
function updateClock() {
    let now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    let time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')} ${ampm}`;
    if(document.getElementById('clock-dash')) document.getElementById('clock-dash').innerText = time;
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        setInterval(updateClock, 1000);

        // Member Count Logic (Simulated or from a 'users' collection)
        // Note: For real count, you'd usually have a 'users' collection.
        const memberEl = document.getElementById('member-count');
        memberEl.innerText = Math.floor(Math.random() * 50) + 100; // Replace with actual DB logic later

        // Dynamic Tools Load
        onSnapshot(collection(db, "tools"), (snapshot) => {
            const container = document.getElementById('tools-container');
            container.innerHTML = "";
            snapshot.forEach((doc) => {
                const tool = doc.data();
                container.innerHTML += `
                    <div class="tool-row">
                        <div>
                            <h4 style="color:var(--accent); font-family:Orbitron; font-size:14px;">${tool.name || 'Unnamed Tool'}</h4>
                            <p style="font-size:11px; color:#94a3b8">${tool.desc || 'No description provided.'}</p>
                        </div>
                        <a href="${tool.link || '#'}" target="_blank" class="btn-3d">LAUNCH</a>
                    </div>`;
            });
            if(snapshot.empty) container.innerHTML = "<p style='text-align:center; opacity:0.5;'>No tools found. Add them from Admin Panel.</p>";
        });
    }
});
