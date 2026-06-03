import { authEngine } from './firebase-config.js';
import * as features from './features.js';
import { renderAnalyticsChart } from './chart-module.js';

const translations = {
    id: {
        authTitle: "Elevate Your Mind", authDesc: "Satu klik untuk masuk dan sinkronisasikan jurnal kesehatan mentalmu secara instan.", authBtn: "Masuk dengan Akun Google", navSettings: "Settings", welcome: "Welcome Back", streak: "Day Streak",
        dashMoodTitle: "Bagaimana kondisimu mekar hari ini?", moodHappy: "Senang", moodCalm: "Tenang", moodNeutral: "Biasa Saja", moodSad: "Sedih", moodAngry: "Marah", dashMoodPlaceholder: "Refleksikan singkat apa yang kamu rasakan saat ini...", dashMoodSave: "Simpan Entri Cloud",
        dashWaterTitle: "Pelacak Hidrasi Air", dashWaterDesc: "Jaga keseimbangan tubuhmu. Target: 8 Gelas", dashWaterUnit: "Gelas", dashChartTitle: "Grafik Tren Analisis", dashLogsTitle: "Log Riwayat Terenkripsi", dashExport: "Ekspor data ke CSV",
        diaryInputTitle: "Input Catatan Buku Diary", diaryInputDesc: "Tuliskan lembar cerita rahasia dengan perlindungan privasi enkripsi lokal.", diaryTitlePlh: "Judul tulisan hari ini...", diaryBodyPlh: "Tumpahkan seluruh isi kepala dan perasaanmu secara bebas...", diarySaveBtn: "Simpan Cerita Diary",
        diaryArchiveTitle: "Arsip Lembar Diary", diarySearchPlh: "🔍 Cari...", actFormTitle: "Rekam Aktivitas Baru", actNamePlh: "Nama aktivitas...", actDescPlh: "Catatan tambahan...", actSaveBtn: "Catat Aktivitas", actLogsTitle: "Log Aktivitas Rutin",
        arcTitle: "Pelacak Pengalaman Level Bloom", arcDesc: "Kumpulkan XP dari rutinitas harian untuk mendaki level premium yang sulit dicapai.", arcSleepTitle: "Pelacak Kualitas & Durasi Tidur", arcSleepDesc: "Catat tidur ideal esok hari untuk menjaga kestabilan emosi (+25 XP).", arcSleepDur: "Durasi (Jam)", arcSleepQlt: "Kualitas Bangun", arcSleepBtn: "Simpan Log Tidur", arcSleepLogEmpty: "Tidur terakhir: Belum ada rekaman data.",
        arcGratTitle: "Papan Afirmasi Syukur Harian", arcGratDesc: "Tulis tiga kebaikan kecil hari ini untuk mengunci suntikan emosi positif (+30 XP).", arcGratBtn: "Kunci Papan Syukur", arcBadgesTitle: "Lencana Penghargaan Mental", arcBadgesDesc: "Penghargaan eksklusif atas konsistensi dan perkembangan kondisi psikologismu:",
        badgeDesc1: "Miliki streak 3 hari", badgeDesc2: "Tulis 3 Cerita Diary", badgeDesc3: "Tidur ideal >= 7 Jam", badgeDesc4: "Kunci papan afirmasi",
        profTitle: "Personalisasi Profil Pengguna", profNamePlh: "Nama Panggilan Kustom", profBioPlh: "Status Bio Kustom", profLangLabel: "Pilihan Bahasa Aplikasi (Language)", profSaveBtn: "Simpan Perubahan Profil", profAvatarTitle: "Pilih Foto Profil Anda", profUploadBtn: "Pilih Foto dari Perangkat",
        noData: "Database masih kosong.", noDiary: "Belum ada lembar cerita.", noAct: "Belum ada aktivitas.",
        alertSleep: "Log tidur disimpan! (+25 XP). 💤", alertGrat: "Afirmasi hari ini dikunci! (+30 XP). 💖", alertSaveProf: "Profil dan pengaman PIN diperbarui!",
        wellTitle: "Mental Wellness Gym", wellDesc: "Redakan stres secara real-time dengan melatih ritme pernapasan dalam.",
        habitTitle: "Daily Habits Quests", habitDesc: "Selesaikan misi kebiasaan sehat hari ini untuk mendongkrak kebugaran psikologis."
    },
    en: {
        authTitle: "Elevate Your Mind", authDesc: "One click to sign in and synchronize your mental health journals instantly.", authBtn: "Sign In with Google Account", navSettings: "Settings", welcome: "Welcome Back", streak: "Day Streak",
        dashMoodTitle: "How are you blooming today?", moodHappy: "Happy", moodCalm: "Calm", moodNeutral: "Neutral", moodSad: "Sad", moodAngry: "Angry", dashMoodPlaceholder: "Reflect briefly on your current state...", dashMoodSave: "Save Cloud Entry",
        dashWaterTitle: "Hydration Tracker", dashWaterDesc: "Keep your body balanced. Goal: 8 Glasses", dashWaterUnit: "Glasses", dashChartTitle: "Analytics Trend Chart", dashLogsTitle: "Secure History Logs", dashExport: "Export data to CSV",
        diaryInputTitle: "Private Diary Input", diaryInputDesc: "Write down secret story sheets protected by secure local encryption.", diaryTitlePlh: "Today's writing title...", diaryBodyPlh: "Pour out your entire head and feelings freely...", diarySaveBtn: "Save Diary Story",
        diaryArchiveTitle: "Diary Archives", diarySearchPlh: "🔍 Search...", actFormTitle: "Log New Activity", actNamePlh: "Activity name...", actDescPlh: "Additional notes...", actSaveBtn: "Record Activity", actLogsTitle: "Activity Logs",
        arcTitle: "Bloom Experience Level Tracker", arcDesc: "Collect XP from daily routines to climb up difficult premium levels.", arcSleepTitle: "Sleep & Quality Tracker", arcSleepDesc: "Record your ideal sleep to maintain emotional stability (+25 XP).", arcSleepDur: "Duration (Hours)", arcSleepQlt: "Wake-up Quality", arcSleepBtn: "Record Sleep Log", arcSleepLogEmpty: "Last sleep: No recorded data found.",
        arcGratTitle: "Daily Gratitude Board", arcGratDesc: "Write three small kindnesses today to lock in positive emotions (+30 XP).", arcGratBtn: "Lock In Gratitude", arcBadgesTitle: "Unlockable Mental Badges", arcBadgesDesc: "Exclusive awards for consistency and psychological development:",
        badgeDesc1: "Have a 3-day streak", badgeDesc2: "Write 3 Diary Stories", badgeDesc3: "Ideal sleep >= 7 Hours", badgeDesc4: "Lock gratitude board",
        profTitle: "Profile Personalization", profNamePlh: "Custom Nickname", profBioPlh: "Custom Status Bio", profLangLabel: "App Language Settings", profSaveBtn: "Save Profile Updates", profAvatarTitle: "Choose Profile Photo", profUploadBtn: "Choose Photo from Device",
        noData: "Database is currently empty.", noDiary: "No story sheets found.", noAct: "No activities found.",
        alertSleep: "Sleep log saved! (+25 XP). 💤", alertGrat: "Today's affirmations locked! (+30 XP). 💖", alertSaveProf: "Profile and PIN vault preferences updated!",
        wellTitle: "Mental Wellness Gym", wellDesc: "Relieve stress in real-time by practicing controlled deep breathing.",
        habitTitle: "Daily Habits Quests", habitDesc: "Complete healthy routine milestones today to boost psychological fitness."
    }
};

const appState = {
    user: null,
    language: localStorage.getItem('bloom_language') || 'id',
    customName: localStorage.getItem('bloom_custom_name') || null,
    customBio: localStorage.getItem('bloom_custom_bio') || '',
    customAvatar: localStorage.getItem('bloom_custom_avatar') || null,
    vaultPin: localStorage.getItem('bloom_vault_pin') || '0000', 
    isVaultUnlocked: false, 
    entries: JSON.parse(localStorage.getItem('bloom_entries')) || [],
    diaries: JSON.parse(localStorage.getItem('bloom_diaries')) || [],
    activities: JSON.parse(localStorage.getItem('bloom_activities')) || [],
    sleepLog: JSON.parse(localStorage.getItem('bloom_sleep_log')) || null,
    gratitudeLocked: localStorage.getItem('bloom_gratitude_locked') === 'true' || false,
    xp: parseInt(localStorage.getItem('bloom_xp')) || 0,
    xpHistory: JSON.parse(localStorage.getItem('bloom_xp_history')) || [],
    streak: parseInt(localStorage.getItem('bloom_streak_count')) || 0,
    lastEntryDate: localStorage.getItem('bloom_last_entry_date') || null,
    theme: localStorage.getItem('bloom_theme') || 'dark'
};

const activityColors = { social: '#3b82f6', love: '#f43f5e', sport: '#10b981', work: '#eab308', hobbies: '#a855f7' };

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', appState.theme);
    
    authEngine.onAuthStateChanged((user) => {
        if (user) { appState.user = user; routeToDashboard(); } 
        else { appState.user = null; routeToAuth(); }
    });

    setupActionTriggers();
    setupPageNavigationRouter();
    setupModalTriggers();
    setupWellnessEngine();
});

function routeToAuth() {
    applyLanguageDOM();
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('app-screen').classList.remove('active');
}

function routeToDashboard() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    updateUserGreetingDisplay();

    features.loadDailyQuote();
    features.initWaterTracker();
    
    applyLanguageDOM();
    refreshGamificationData();
    renderLogs();
    renderDiaries();
    renderActivities();
    renderSleepUI();
    renderGratitudeUI();
    
    renderAnalyticsChart(appState.entries, appState.theme);

    document.getElementById('profile-input-name').value = appState.customName || appState.user.displayName;
    document.getElementById('profile-input-bio').value = appState.customBio;
    document.getElementById('profile-language-select').value = appState.language;
    document.getElementById('profile-vault-pin').value = appState.vaultPin;
}

function applyLanguageDOM() {
    const dict = translations[appState.language];
    document.getElementById('lng-auth-title').innerText = dict.authTitle;
    document.getElementById('lng-auth-desc').innerText = dict.authDesc;
    document.getElementById('lng-auth-btn').innerText = dict.authBtn;
    document.getElementById('lng-nav-settings').innerText = dict.navSettings;
    document.getElementById('lng-header-welcome').innerText = dict.welcome;
    document.getElementById('lng-header-streak').innerText = dict.streak;
    document.getElementById('lng-dash-mood-title').innerText = dict.dashMoodTitle;
    document.getElementById('lng-mood-happy').innerText = dict.moodHappy;
    document.getElementById('lng-mood-calm').innerText = dict.moodCalm;
    document.getElementById('lng-mood-neutral').innerText = dict.moodNeutral;
    document.getElementById('lng-mood-sad').innerText = dict.moodSad;
    document.getElementById('lng-mood-angry').innerText = dict.moodAngry;
    document.getElementById('mood-note').placeholder = dict.dashMoodPlaceholder;
    document.getElementById('save-btn').innerText = dict.dashMoodSave;
    document.getElementById('lng-dash-water-title').innerText = dict.dashWaterTitle;
    document.getElementById('lng-dash-water-desc').innerText = dict.dashWaterDesc;
    document.getElementById('lng-dash-water-unit').innerText = dict.dashWaterUnit;
    document.getElementById('lng-dash-chart-title').innerText = dict.dashChartTitle;
    document.getElementById('lng-dash-logs-title').innerText = dict.dashLogsTitle;
    document.getElementById('lng-dash-export').innerText = dict.dashExport;
    document.getElementById('lng-diary-input-title').innerText = dict.diaryInputTitle;
    document.getElementById('lng-diary-input-desc').innerText = dict.diaryInputDesc;
    document.getElementById('diary-title').placeholder = dict.diaryTitlePlh;
    document.getElementById('diary-body').placeholder = dict.diaryBodyPlh;
    document.getElementById('diary-save-btn').innerText = dict.diarySaveBtn;
    document.getElementById('lng-diary-archive-title').innerText = dict.diaryArchiveTitle;
    document.getElementById('diary-search').placeholder = dict.diarySearchPlh;
    document.getElementById('lng-act-form-title').innerText = dict.actFormTitle;
    document.getElementById('act-name').placeholder = dict.actNamePlh;
    document.getElementById('act-desc').placeholder = dict.actDescPlh;
    document.getElementById('act-save-btn').innerText = dict.actSaveBtn;
    document.getElementById('lng-act-logs-title').innerText = dict.actLogsTitle;
    document.getElementById('lng-arc-title').innerText = dict.arcTitle;
    document.getElementById('lng-arc-desc').innerText = dict.arcDesc;
    document.getElementById('lng-arc-sleep-title').innerText = dict.arcSleepTitle;
    document.getElementById('lng-arc-sleep-desc').innerText = dict.arcSleepDesc;
    document.getElementById('lng-arc-sleep-dur').innerText = dict.arcSleepDur;
    document.getElementById('lng-arc-sleep-qlt').innerText = dict.arcSleepQlt;
    document.getElementById('sleep-save-btn').innerText = dict.arcSleepBtn;
    document.getElementById('lng-arc-grat-title').innerText = dict.arcGratTitle;
    document.getElementById('lng-arc-grat-desc').innerText = dict.arcGratDesc;
    document.getElementById('lng-arc-badges-title').innerText = dict.arcBadgesTitle;
    document.getElementById('lng-arc-badges-desc').innerText = dict.arcBadgesDesc;
    document.getElementById('lng-badge-desc-1').innerText = dict.badgeDesc1;
    document.getElementById('lng-badge-desc-2').innerText = dict.badgeDesc2;
    document.getElementById('lng-badge-desc-3').innerText = dict.badgeDesc3;
    document.getElementById('lng-badge-desc-4').innerText = dict.badgeDesc4;
    document.getElementById('lng-prof-title').innerText = dict.profTitle;
    document.getElementById('profile-input-name').placeholder = dict.profNamePlh;
    document.getElementById('profile-input-bio').placeholder = dict.profBioPlh;
    document.getElementById('lng-prof-lang-label').innerHTML = `<i class="fa-solid fa-language"></i> ${dict.profLangLabel}`;
    document.getElementById('profile-save-btn').innerText = dict.profSaveBtn;
    document.getElementById('lng-prof-avatar-title').innerText = dict.profAvatarTitle;
    document.getElementById('profile-upload-trigger-btn').innerText = dict.profUploadBtn;
    document.getElementById('lng-well-title').innerText = dict.wellTitle;
    document.getElementById('lng-well-desc').innerText = dict.wellDesc;
    document.getElementById('lng-habit-title').innerText = dict.habitTitle;
    document.getElementById('lng-habit-desc').innerText = dict.habitDesc;
}

function updateUserGreetingDisplay() {
    const defaultName = appState.user ? appState.user.displayName : 'User';
    const finalName = appState.customName || defaultName;
    document.getElementById('user-greeting').innerText = finalName;
    document.getElementById('display-name').innerText = finalName;
    document.getElementById('user-avatar').src = appState.customAvatar || (appState.user ? appState.user.photoURL : '');
}

function setupPageNavigationRouter() {
    const menus = {
        'nav-dashboard-btn': 'page-dashboard', 'nav-diary-btn': 'page-diary',
        'nav-activity-btn': 'page-activity', 'nav-wellness-btn': 'page-wellness',
        'nav-arcade-btn': 'page-arcade', 'nav-profile-card': 'page-profile'
    };
    Object.keys(menus).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if(!btn) return;
        btn.onclick = () => {
            Object.keys(menus).forEach(b => document.getElementById(b).classList.remove('active'));
            Object.values(menus).forEach(p => document.getElementById(p).classList.remove('active-page'));
            
            if(btnId === 'nav-profile-card') btn.style.background = 'var(--input)';
            else document.getElementById('nav-profile-card').style.background = 'transparent';
            
            btn.classList.add('active');
            document.getElementById(menus[btnId]).classList.add('active-page');
            
            if(btnId === 'nav-dashboard-btn') renderAnalyticsChart(appState.entries, appState.theme);
            if(btnId === 'nav-diary-btn') enforceVaultSecurityLock();
        };
    });
}

function enforceVaultSecurityLock() {
    appState.isVaultUnlocked = false;
    document.getElementById('diary-pin-guard').style.display = 'block';
    document.getElementById('diary-real-workspace').style.display = 'none';
    if(window.clearPin) window.clearPin();
}

window.validateVaultPinAccess = function(pin) {
    if(pin === appState.vaultPin) {
        appState.isVaultUnlocked = true;
        document.getElementById('diary-pin-guard').style.display = 'none';
        document.getElementById('diary-real-workspace').style.display = 'grid';
    } else {
        alert(appState.language === 'id' ? "⚠️ PIN Salah! Akses ditolak." : "⚠️ Invalid PIN! Access denied.");
        if(window.clearPin) window.clearPin();
    }
};

// --- MENTAL WELLNESS GYM & AUDIO RELAX ENGINE (VERSI PERBAIKAN TOTAL) ---
function setupWellnessEngine() {
    const bubble = document.getElementById('breath-guide-bubble');
    const startBtn = document.getElementById('start-breath-btn');
    const audioBtn = document.getElementById('toggle-ambient-btn');
    const audio = document.getElementById('ambient-audio');
    
    let isAudioPlaying = false;

    if (startBtn && bubble) {
        startBtn.onclick = () => {
            startBtn.disabled = true;
            let cycle = 0;
            const stages = [
                { txt: "TARIK NAPAS", scale: "scale(1.4)", time: 4000 },
                { txt: "TAHAN NAPAS", scale: "scale(1.4)", time: 4000 },
                { txt: "HEMBUSKAN", scale: "scale(1.0)", time: 4000 }
            ];

            function runCycle() {
                if(cycle >= 3) {
                    bubble.innerText = "DONE!"; bubble.style.transform = "scale(1.0)";
                    startBtn.disabled = false;
                    addExperiencePoints(15, appState.language === 'id' ? "Latihan Pernapasan Meditasi" : "Meditation Deep Breathing");
                    refreshGamificationData();
                    return;
                }
                let step = 0;
                function execStep() {
                    if(step >= 3) { cycle++; runCycle(); return; }
                    bubble.innerText = stages[step].txt;
                    bubble.style.transform = stages[step].scale;
                    setTimeout(() => { step++; execStep(); }, stages[step].time);
                }
                execStep();
            }
            runCycle();
        };
    }

    if (audioBtn && audio) {
        audio.volume = 0.6; // Volume standar yang nyaman

        audioBtn.onclick = () => {
            isAudioPlaying = !isAudioPlaying;
            if(isAudioPlaying) {
                // Taktik 1: Setel bisu agar browser meloloskan izin putar otomatis
                audio.muted = true; 
                
                // Taktik 2: Mainkan audio dalam status senyap terlebih dahulu
                audio.play()
                    .then(() => {
                        // Taktik 3: Lepaskan status bisu begitu disetujui browser
                        audio.muted = false;
                        audioBtn.innerHTML = `<i class="fa-solid fa-music"></i> Soundscape: ON 🌿`;
                    })
                    .catch((error) => {
                        console.error("Audio Playback Error:", error);
                        // Cadangan taktik fallback jika browser memblokir rantai pertama
                        audio.muted = false;
                        audio.play()
                            .then(() => {
                                audioBtn.innerHTML = `<i class="fa-solid fa-music"></i> Soundscape: ON 🌿`;
                            })
                            .catch(() => {
                                alert("Gagal memutar audio latar. Harap berinteraksi dengan menu lain terlebih dahulu, lalu coba kembali.");
                                isAudioPlaying = false;
                            });
                    });
            } else {
                audio.pause();
                audioBtn.innerHTML = `<i class="fa-solid fa-music"></i> Soundscape: OFF`;
            }
        };
    }

    const claimHabitBtn = document.getElementById('claim-habit-xp-btn');
    if(claimHabitBtn) {
        claimHabitBtn.onclick = () => {
            const checkedCount = document.querySelectorAll('.habit-chk:checked').length;
            if(checkedCount === 0) return alert(appState.language === 'id' ? "Selesaikan minimal 1 habit harian!" : "Complete at least 1 daily habit!");
            
            addExperiencePoints(20, appState.language === 'id' ? "Rutinitas Habit Combo" : "Daily Habits Combo");
            refreshGamificationData();
            alert(appState.language === 'id' ? "Habit XP berhasil diklaim! 🏋️ (+20 XP)" : "Habit XP successfully claimed! 🏋️ (+20 XP)");
            document.querySelectorAll('.habit-chk').forEach(c => c.checked = false);
        };
    }
}

function setupActionTriggers() {
    document.getElementById('lock-vault-instantly').onclick = () => enforceVaultSecurityLock();

    document.getElementById('sleep-save-btn').onclick = () => {
        const hours = parseFloat(document.getElementById('sleep-duration').value);
        const quality = document.getElementById('sleep-quality').value;
        if (!hours || hours <= 0 || hours > 24) return alert("Invalid duration!");

        appState.sleepLog = { hours, quality, timestamp: new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}) };
        localStorage.setItem('bloom_sleep_log', JSON.stringify(appState.sleepLog));
        addExperiencePoints(25, "Sleep Log Rec");
        renderSleepUI(); refreshGamificationData();
        alert(translations[appState.language].alertSleep);
    };

    document.getElementById('gratitude-save-btn').onclick = () => {
        const g1 = document.getElementById('gratitude-1').value.trim();
        const g2 = document.getElementById('gratitude-2').value.trim();
        const g3 = document.getElementById('gratitude-3').value.trim();
        if (!g1 || !g2 || !g3) return alert("Fill all logs!");

        appState.gratitudeLocked = true;
        localStorage.setItem('bloom_gratitude_locked', 'true');
        localStorage.setItem('bloom_g1', g1); localStorage.setItem('bloom_g2', g2); localStorage.setItem('bloom_g3', g3);
        addExperiencePoints(30, "Gratitude Affirmation");
        renderGratitudeUI(); refreshGamificationData();
        alert(translations[appState.language].alertGrat);
    };

    document.querySelectorAll('.mood-item').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mood-item').forEach(i => i.classList.remove('selected'));
            btn.classList.add('selected');
            appState.selectedMood = { name: btn.dataset.mood, color: btn.dataset.color, score: parseInt(btn.dataset.score) };
        };
    });

    document.getElementById('save-btn').onclick = () => {
        const noteText = document.getElementById('mood-note').value.trim();
        if(!appState.selectedMood) return alert('Select mood!');
        const todayString = new Date().toLocaleDateString('id-ID');

        if (appState.lastEntryDate !== todayString) {
            appState.streak += 1; appState.lastEntryDate = todayString;
            localStorage.setItem('bloom_streak_count', appState.streak); localStorage.setItem('bloom_last_entry_date', todayString);
        }

        const log = { id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), ...appState.selectedMood, note: noteText };
        appState.entries.unshift(log);
        localStorage.setItem('bloom_entries', JSON.stringify(appState.entries));
        addExperiencePoints(15, "Cloud Mood");
        document.getElementById('mood-note').value = '';
        document.querySelectorAll('.mood-item').forEach(i => i.classList.remove('selected'));
        appState.selectedMood = null;
        renderLogs(); renderAnalyticsChart(appState.entries, appState.theme); refreshGamificationData();
    };

    document.getElementById('diary-save-btn').onclick = () => {
        const title = document.getElementById('diary-title').value.trim();
        const category = document.getElementById('diary-category').value;
        const body = document.getElementById('diary-body').value.trim();
        if (!title || !body) return alert("Empty field!");

        const newDiary = { id: Date.now(), date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), title, category, body };
        appState.diaries.unshift(newDiary);
        localStorage.setItem('bloom_diaries', JSON.stringify(appState.diaries));
        addExperiencePoints(40, `Diary Open`);
        document.getElementById('diary-title').value = ''; document.getElementById('diary-body').value = '';
        renderDiaries(); refreshGamificationData();
    };

    document.getElementById('act-save-btn').onclick = () => {
        const name = document.getElementById('act-name').value.trim();
        const type = document.getElementById('act-type').value;
        const desc = document.getElementById('act-desc').value.trim();
        if (!name) return alert("Empty activity!");

        const newActivity = { id: Date.now(), date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), name, type, desc: desc || 'No desc.' };
        appState.activities.unshift(newActivity);
        localStorage.setItem('bloom_activities', JSON.stringify(appState.activities));
        addExperiencePoints(20, `Log Act`);
        document.getElementById('act-name').value = ''; document.getElementById('act-desc').value = '';
        renderActivities(); refreshGamificationData();
    };

    if (document.getElementById('google-login-btn')) document.getElementById('google-login-btn').onclick = () => authEngine.signInWithGoogle();
    document.getElementById('logout-btn').onclick = () => authEngine.signOut().then(() => { localStorage.removeItem('bloom_gratitude_locked'); location.reload(); });
    document.getElementById('theme-toggle').onclick = () => {
        appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', appState.theme);
        localStorage.setItem('bloom_theme', appState.theme);
        renderAnalyticsChart(appState.entries, appState.theme);
    };

    document.getElementById('profile-save-btn').onclick = () => {
        const name = document.getElementById('profile-input-name').value.trim();
        const bio = document.getElementById('profile-input-bio').value.trim();
        const langValue = document.getElementById('profile-language-select').value;
        const rawPin = document.getElementById('profile-vault-pin').value.trim();
        
        if (!name) return alert("Name standard is mandatory!");
        if (rawPin.length !== 4 || isNaN(rawPin)) return alert(appState.language === 'id' ? "PIN Vault harus tepat 4-digit angka!" : "Vault PIN must be exactly 4 digits!");

        appState.customName = name; appState.customBio = bio; appState.language = langValue; appState.vaultPin = rawPin;
        localStorage.setItem('bloom_custom_name', name); localStorage.setItem('bloom_custom_bio', bio);
        localStorage.setItem('bloom_language', langValue); localStorage.setItem('bloom_vault_pin', rawPin);

        updateUserGreetingDisplay(); applyLanguageDOM();
        renderLogs(); renderDiaries(); renderActivities(); renderSleepUI();
        alert(translations[appState.language].alertSaveProf);
    };

    document.getElementById('profile-upload-trigger-btn').onclick = () => document.getElementById('profile-file-uploader').click();
    document.getElementById('profile-file-uploader').onchange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => { appState.customAvatar = event.target.result; localStorage.setItem('bloom_custom_avatar', event.target.result); updateUserGreetingDisplay(); };
        reader.readAsDataURL(file);
    };
}

function calculateCurrentLevelFromXp(xpPoints) {
    const xpPerLevel = 80; 
    let lvl = Math.floor(xpPoints / xpPerLevel) + 1;
    let remainingXp = xpPoints % xpPerLevel;
    return { level: lvl, remainingXp: remainingXp, nextLevelTotalXp: xpPerLevel };
}

function addExperiencePoints(amount, activityName = "Aktivitas Sehat") {
    appState.xp += amount; localStorage.setItem('bloom_xp', appState.xp);
    const logItem = { id: Date.now(), activity: activityName, xpGained: amount, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) };
    appState.xpHistory.unshift(logItem); if (appState.xpHistory.length > 30) appState.xpHistory.pop();
    localStorage.setItem('bloom_xp_history', JSON.stringify(appState.xpHistory));
}

function refreshGamificationData() {
    const gameProgression = calculateCurrentLevelFromXp(appState.xp);
    document.getElementById('level-txt').innerText = `LVL ${gameProgression.level}`;
    document.getElementById('streak-count').innerText = appState.streak;
    document.getElementById('header-total-xp').innerText = `${appState.xp} XP`;
    
    const arcadeLvlTxt = document.getElementById('arcade-level-display');
    const arcadeXpTxt = document.getElementById('arcade-xp-text');
    const arcadeProgress = document.getElementById('arcade-xp-progress');
    if (arcadeLvlTxt && arcadeXpTxt && arcadeProgress) {
        arcadeLvlTxt.innerText = `LVL ${gameProgression.level}`; arcadeXpTxt.innerText = `${gameProgression.remainingXp} / ${gameProgression.nextLevelTotalXp} XP`;
        arcadeProgress.style.width = `${(gameProgression.remainingXp / gameProgression.nextLevelTotalXp) * 100}%`;
    }
    evaluateBadgesMilestones();
}

function evaluateBadgesMilestones() {
    if (document.getElementById('badge-streak') && appState.streak >= 3) { document.getElementById('badge-streak').style.opacity = "1"; document.getElementById('badge-streak').style.borderColor = "#f43f5e"; }
    if (document.getElementById('badge-diary') && appState.diaries.length >= 3) { document.getElementById('badge-diary').style.opacity = "1"; document.getElementById('badge-diary').style.borderColor = "#a78bfa"; }
    if (document.getElementById('badge-sleep') && appState.sleepLog && appState.sleepLog.hours >= 7) { document.getElementById('badge-sleep').style.opacity = "1"; document.getElementById('badge-sleep').style.borderColor = "#6366f1"; }
    if (document.getElementById('badge-gratitude') && appState.gratitudeLocked) { document.getElementById('badge-gratitude').style.opacity = "1"; document.getElementById('badge-gratitude').style.borderColor = "#ec4899"; }
}

function setupModalTriggers() {
    const modal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const contentArea = document.getElementById('modal-content-area');

    document.getElementById('user-xp-history-btn').onclick = () => {
        let historyHtml = appState.xpHistory.length === 0 ? `<div style="text-align: center; padding:20px; color:var(--text-dim); font-size:13px;">Belum ada log perolehan.</div>` : `<div style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">`;
        appState.xpHistory.forEach(l => { historyHtml += `<div style="display: flex; justify-content: space-between; background: var(--input); padding: 10px; border-radius: 10px; border: 1px solid var(--border);"><div><div style="font-size:13px; font-weight:700;">${l.activity}</div><div style="font-size:11px; color:var(--text-dim);">${l.date}</div></div><div style="color: #4ade80; font-weight:800;">+${l.xpGained} XP</div></div>`; });
        if(appState.xpHistory.length > 0) historyHtml += `</div>`;
        contentArea.innerHTML = `<h3 style="margin-bottom:15px; color:#3b82f6;">📊 XP Audit History</h3>${historyHtml}`;
        modal.style.display = 'flex';
    };

    document.getElementById('user-level-badge').onclick = () => {
        const gameProgression = calculateCurrentLevelFromXp(appState.xp);
        contentArea.innerHTML = `<h3>👑 Bloom Level Guide</h3><p style="font-size:13px; color:var(--text-dim);">Level Anda saat ini: <strong>${gameProgression.level}</strong></p><p style="margin-top:10px; font-size:12px; color:#4ade80;">🎯 Kenaikan level stabil flat per 80 XP!</p>`;
        modal.style.display = 'flex';
    };

    closeBtn.onclick = () => modal.style.display = 'none';
}

function renderSleepUI() {
    if (document.getElementById('sleep-recent-log') && appState.sleepLog) {
        document.getElementById('sleep-recent-log').innerHTML = `🌟 Last Sleep: ${appState.sleepLog.hours} Jam (${appState.sleepLog.quality})`;
    }
}

function renderGratitudeUI() {
    if (appState.gratitudeLocked) {
        document.getElementById('gratitude-1').value = localStorage.getItem('bloom_g1') || '';
        document.getElementById('gratitude-2').value = localStorage.getItem('bloom_g2') || '';
        document.getElementById('gratitude-3').value = localStorage.getItem('bloom_g3') || '';
        ['gratitude-1', 'gratitude-2', 'gratitude-3'].forEach(id => document.getElementById(id).disabled = true);
        document.getElementById('gratitude-save-btn').innerText = "Locked ✨"; document.getElementById('gratitude-save-btn').disabled = true;
    }
}

function renderLogs() {
    const list = document.getElementById('journal-list'); if (!list) return;
    list.innerHTML = appState.entries.length ? '' : `<p class="no-entries">${translations[appState.language].noData}</p>`;
    appState.entries.forEach(e => {
        const item = document.createElement('div'); item.className = 'journal-item'; item.style.borderLeft = `6px solid ${e.color}`;
        item.innerHTML = `<div class="journal-left-content"><div class="journal-meta"><span class="journal-mood-tag" style="background:${e.color}">${e.name}</span> <span class="journal-date">${e.date}</span></div><p class="journal-note">${e.note || '...'}</p></div>`;
        list.appendChild(item);
    });
}

function renderDiaries() {
    const list = document.getElementById('diary-logs-list'); if (!list) return;
    list.innerHTML = appState.diaries.length ? '' : `<p class="no-entries">${translations[appState.language].noDiary}</p>`;
    appState.diaries.forEach(d => {
        const item = document.createElement('div'); item.className = 'journal-item'; item.style.borderLeft = `6px solid #a78bfa`;
        item.innerHTML = `<div class="journal-left-content" style="width:100%;"><div class="journal-meta"><span class="journal-mood-tag" style="background:#1e293b;">${d.category}</span> <span class="journal-date">${d.date}</span></div><h4 style="font-size:14px; margin:5px 0;">${d.title}</h4><p class="journal-note">${d.body}</p></div>`;
        list.appendChild(item);
    });
}

function renderActivities() {
    const list = document.getElementById('activity-list'); if (!list) return;
    list.innerHTML = appState.activities.length ? '' : `<p class="no-entries">${translations[appState.language].noAct}</p>`;
    appState.activities.forEach(a => {
        const c = activityColors[a.type] || 'var(--border)';
        const item = document.createElement('div'); item.className = 'journal-item'; item.style.borderLeft = `6px solid ${c}`;
        item.innerHTML = `<div class="journal-left-content"><div class="journal-meta"><span class="journal-mood-tag" style="background:${c}">${a.type}</span> <span class="journal-date">${a.date}</span></div><h4 style="font-size:14px; margin:5px 0;">${a.name}</h4><p class="journal-note">${a.desc}</p></div>`;
        list.appendChild(item);
    });
}