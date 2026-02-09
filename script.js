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
    
    #popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 10000; backdrop-filter: blur(10px); }
    .popup-box { background: var(--bg); padding: 40px; border-radius: 30px; border: 2px solid var(--accent); text-align: center; max-width: 400px; }
    
    .header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .stat-card-3d { background: var(--bg); padding: 25px; border-radius: 20px; box-shadow: inset 5px 5px 15px #000; text-align: center; }
    .tool-list-container { margin-top: 40px; }
    .tool-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 20px; border-radius: 20px; box-shadow: var(--3d-shadow); margin-bottom: 15px; border-left: 5px solid var(--accent); }
    .btn-3d { padding: 10px 20px; background: var(--bg); border: none; border-radius: 12px; color: white; box-shadow: var(--3d-shadow); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
</style>

<div id="popup-overlay">
    <div class="popup-box">
        <h2 style="font-family:Orbitron; color:var(--accent)">JOIN CHANNEL</h2>
        <p style="margin:20px 0;">New Hacks aur Methods ke liye hamara channel join karein.</p>
        <a href="https://whatsapp.com/channel/0029Vb76UKGBVJl9w0NpOp12" target="_blank" style="background:#25d366; color:white; padding:12px 30px; border-radius:50px; text-decoration:none; font-weight:bold; display:block; margin-bottom:15px;">FOLLOW NOW</a>
        <button onclick="document.getElementById('popup-overlay').remove()" style="background:none; color:white; border:1px solid white; padding:10px 20px; border-radius:50px; cursor:pointer;">Close Now</button>
    </div>
</div>

<div id="dash-wrapper">
    <header class="header-nav">
        <h1 style="font-family:Orbitron; color:var(--accent)">DASHBOARD</h1>
        <button id="logout-btn" class="btn-3d" style="color:#ff4757;"><i class="fas fa-power-off"></i> Logout</button>
    </header>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px;">
        <div class="stat-card-3d"><p>Real-Time</p><h3 id="clock-dash" style="font-family:Orbitron; font-size:24px;">02:00:00 PM</h3></div>
        <div class="stat-card-3d"><p>Status</p><h3 style="color:#2ecc71">ENCRYPTED</h3></div>
    </div>

    <div class="tool-list-container">
        <h2 style="font-family:Orbitron; margin-bottom:20px;">PREMIUM TOOLS</h2>
        <div id="tools-container">
            <p style="text-align:center; color:#64748b;">Waiting for Admin to add tools...</p>
        </div>
    </div>
</div>
`;

// AUTH TOGGLE
if(document.getElementById('toggleBtn')) document.getElementById('toggleBtn').onclick = () => document.getElementById('container').classList.toggle('active');

// SIGN IN
document.getElementById('login-btn').onclick = async () => {
    try { await signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-pass').value); } 
    catch (e) { alert(e.message); }
};

// 12hr Time Function
function updateTime() {
    let now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    let time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')} ${ampm}`;
    if(document.getElementById('clock-dash')) document.getElementById('clock-dash').innerText = time;
}

// DASHBOARD STATE
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.innerHTML = myDashboard;
        document.getElementById('logout-btn').onclick = () => signOut(auth).then(() => location.reload());
        setInterval(updateTime, 1000);

        // Fetch Tools from Firebase Firestore
        onSnapshot(collection(db, "tools"), (snapshot) => {
            const container = document.getElementById('tools-container');
            container.innerHTML = "";
            snapshot.forEach((doc) => {
                const tool = doc.data();
                container.innerHTML += `
                    <div class="tool-row">
                        <div><h4 style="color:var(--accent)">${tool.name}</h4><p style="font-size:12px; color:#94a3b8">${tool.desc}</p></div>
                        <a href="${tool.link}" target="_blank" class="btn-3d">OPEN TOOL</a>
                    </div>
                `;
            });
            if(snapshot.empty) container.innerHTML = "<p>No tools added yet.</p>";
        });
    }
});
