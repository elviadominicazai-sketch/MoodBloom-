// --- MODULE ARCHITECTURE FOR 10 COMPLEMENTARY FEATURES ---

// 1. Interactive Quotes Engine
export function loadDailyQuote() {
    const quotes = [
        "Growth takes time, let yourself bloom today.",
        "Your feelings are valid, no matter what color they are.",
        "Quiet the mind, and the soul will speak.",
        "Every day is a fresh dynamic slate for emotional maturity.",
        "Be gentle with your progress. You are doing fine."
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('daily-quote').innerText = `"${quotes[randomIndex]}"`;
}

// 2. AI & Data Insights Core Generator
export function generateInsights(entries) {
    const insightBox = document.getElementById('ai-insight-box');
    const dominantField = document.getElementById('dominant-mood');
    
    if (entries.length === 0) {
        insightBox.innerText = "Log some emotional entries to enable system tracking indicators.";
        return;
    }

    // Mapping tracking categories
    const counts = {};
    let maxCount = 0;
    let dominant = "";

    entries.forEach(e => {
        counts[e.name] = (counts[e.name] || 0) + 1;
        if (counts[e.name] > maxCount) {
            maxCount = counts[e.name];
            dominant = e.name;
        }
    });

    dominantField.innerText = dominant;
    
    // AI Strategy Engine Advice Mapping
    const advice = {
        Happy: "Fantastic energy balance! Secure this moment and share your vibes with peers.",
        Calm: "Excellent zen homeostasis. Ideal time for heavy critical engineering logic work.",
        Neutral: "Objectively stable baseline. Great for planning upcoming roadmap assignments.",
        Sad: "Reflection index is high. Practice self-care and reduce cognitive pressure over tasks.",
        Angry: "High energy load detected. Use physical activity or slow music tracks to decompress."
    };

    insightBox.innerText = advice[dominant] || "Tracking analytics compiling...";
}

// 3. System Data Exporter (CSV Pipeline Architecture)
export function exportToCSV(entries) {
    if(entries.length === 0) return alert('No database tracks available to export.');
    
    let csvContent = "data:text/csv;charset=utf-8,Date,Mood,Score,Note\n";
    entries.forEach(e => {
        csvContent += `"${e.date}","${e.name}","${e.score}","${e.note}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", `MoodBloom_Analytics_Report.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// 4. Hydration Water Storage Manager
export function initWaterTracker() {
    let currentGlasses = parseInt(localStorage.getItem('bloom_water')) || 0;
    const countDisplay = document.getElementById('water-count');
    const progressDisplay = document.getElementById('water-progress');

    const updateWaterUI = () => {
        countDisplay.innerText = currentGlasses;
        progressDisplay.style.width = `${Math.min((currentGlasses / 8) * 100, 100)}%`;
        localStorage.setItem('bloom_water', currentGlasses);
    };

    document.getElementById('add-water-btn').onclick = () => { if(currentGlasses < 20) currentGlasses++; updateWaterUI(); };
    document.getElementById('remove-water-btn').onclick = () => { if(currentGlasses > 0) currentGlasses--; updateWaterUI(); };

    updateWaterUI();
}

// 5. Zen Soundscape Module Controller
export function initSoundscape() {
    const player = document.getElementById('ambient-player');
    const btn = document.getElementById('play-ambient-btn');

    btn.onclick = () => {
        if (player.paused) {
            player.play();
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> Mute Zen Frequencies';
        } else {
            player.pause();
            btn.innerHTML = '<i class="fa-solid fa-play"></i> Play Binaural Beats';
        }
    };
}