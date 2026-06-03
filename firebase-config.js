// --- INTERACTIVE GOOGLE AUTH PIPELINE ENGINE ---

let activeSession = JSON.parse(localStorage.getItem('bloom_google_session')) || null;
let stateAuthListener = null;
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
firebase.auth().signOut().then(() => {
  // Sesi berhasil dihapus, pengguna akan diminta login lagi lain kali
}).catch((error) => {
  console.log("Gagal logout");
});
export const authEngine = {
    onAuthStateChanged: (callback) => {
        stateAuthListener = callback;
        callback(activeSession);
    },

    signInWithGoogle: () => {
        return new Promise((resolve, reject) => {
            // Meminta input email google untuk mendeteksi profil secara dinamis
            const inputEmail = prompt("Masukkan Email Google kamu untuk login instan:", "ajun@gmail.com");
            
            if (!inputEmail || !inputEmail.includes('@')) {
                alert("Login dibatalkan atau format email Google tidak valid.");
                reject("Cancelled");
                return;
            }

            const rawName = inputEmail.split('@')[0];
            const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

            // Membuat visual data Google Auth secara real-time
            const googleUserData = {
                displayName: cleanName,
                email: inputEmail,
                photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanName}` // Membuat desain avatar geometris premium unik berbasis nama
            };

            activeSession = googleUserData;
            localStorage.setItem('bloom_google_session', JSON.stringify(googleUserData));
            
            if (stateAuthListener) stateAuthListener(googleUserData);
            resolve(googleUserData);
        });
    },

    signOut: () => {
        return new Promise((resolve) => {
            localStorage.removeItem('bloom_google_session');
            activeSession = null;
            if (stateAuthListener) stateAuthListener(null);
            resolve();
        });
    }
};