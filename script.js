// --- CONFIGURATION & GLOBAL STATE MANAGEMENT ---
const state = {
    user: localStorage.getItem('bloom_user') || null,
    entries: JSON.parse(localStorage.getItem('bloom_entries')) || [],
    theme: localStorage.getItem('bloom_theme') || 'dark',
    selectedMood: null,
    chart: null
};

// --- CORE APPLICATION INITIALIZER ---
document.addEventListener('DOMContentLoaded', () => {
    // Apply UI theme instantly on startup
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeButtonIcon();
    
    // Check if configuration profile exists
    initAppRouting();
    setupEventListeners();
});

// --- ROUTING & ROUTINE SECURITY INTERCEPTORS ---
function initAppRouting() {
    const loginScreen = document.getElementById('login-screen');
    const appScreen = document.getElementById('app-screen');

    if (!state.user) {
        loginScreen.classList.add('active');
        appScreen.classList.remove('active');
    } else {
        loginScreen.classList.remove('active');
        appScreen.classList.add('active');
        
        // Populate profile identities
        document.getElementById('user-greeting').innerText = state.user;
        document.getElementById('display-name').innerText = state.user;
        document.getElementById('avatar-initial').innerText = state.user[0].toUpperCase();
        
        // Render systems dashboard components
        renderJournalHistory();
        renderAnalyticsChart();
    }
}

// --- SYSTEM EVENT LISTENERS REGISTER ---
function setupEventListeners() {
    // Account Authentication Operations
    document.getElementById('login-btn').onclick = handleLogin;
    document.getElementById('logout-btn').onclick = handleLogout;
    
    // Interface Config Mode Toggles
    document.getElementById('theme-toggle').onclick = toggleThemeMode;

    // Mood Item Interactive Event Core Loop
    document.querySelectorAll('.mood-item').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mood-item').forEach(item => item.classList.remove('selected'));
            btn.classList.add('selected');
            
            state.selectedMood = {
                name: btn.dataset.mood,
                color: btn.dataset.color,
                score: parseInt(btn.dataset.score)
            };
        };
    });

    // Journal Entry Pipeline Action Submission
    document.getElementById('save-btn').onclick = handleSaveEntry;
}

// --- INTERACTION & AUTH LOGIC CONTROLLERS ---
function handleLogin() {
    const usernameInput = document.getElementById('username-input');
    const cleanName = usernameInput.value.trim();

    if (cleanName) {
        state.user = cleanName;
        localStorage.setItem('bloom_user', cleanName);
        initAppRouting();
    } else {
        alert('Please enter your name to start tracking.');
    }
}

function handleLogout() {
    localStorage.removeItem('bloom_user');
    state.user = null;
    // Clear functional inputs
    document.getElementById('username-input').value = '';
    initAppRouting();
}

function toggleThemeMode() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('bloom_theme', state.theme);
    
    updateThemeButtonIcon();
    renderAnalyticsChart(); // Re-render chart to adapt context background styling rules
}

function updateThemeButtonIcon() {
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.innerHTML = state.theme === 'dark' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun"></i>';
}

function handleSaveEntry() {
    const noteTextArea = document.getElementById('mood-note');
    const currentNoteText = noteTextArea.value.trim();

    if (!state.selectedMood) {
        alert('Please select a mood option first!');
        return;
    }

    const structuredEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        name: state.selectedMood.name,
        color: state.selectedMood.color,
        score: state.selectedMood.score,
        note: currentNoteText
    };

    // Prepend entry object into array storage index
    state.entries.unshift(structuredEntry);
    localStorage.setItem('bloom_entries', JSON.stringify(state.entries));

    // Reset workflow states
    noteTextArea.value = '';
    document.querySelectorAll('.mood-item').forEach(item => item.classList.remove('selected'));
    state.selectedMood = null;

    // Refresh UI layer views dynamically
    renderJournalHistory();
    renderAnalyticsChart();
}

window.deleteEntry = (entryId) => {
    state.entries = state.entries.filter(entry => entry.id !== entryId);
    localStorage.setItem('bloom_entries', JSON.stringify(state.entries));
    
    renderJournalHistory();
    renderAnalyticsChart();
};

// --- DATA GRAPH & VISUAL RENDERING ENGINES ---
function renderJournalHistory() {
    const journalContainer = document.getElementById('journal-list');
    
    if (state.entries.length === 0) {
        journalContainer.innerHTML = '<p class="no-entries">Your journal is clean. No records written yet.</p>';
        return;
    }

    journalContainer.innerHTML = '';
    state.entries.forEach(entry => {
        const itemElement = document.createElement('div');
        itemElement.className = 'journal-item';
        itemElement.style.borderLeftColor = entry.color;

        itemElement.innerHTML = `
            <div class="journal-left-content">
                <div class="journal-meta">
                    <span class="journal-mood-tag" style="background-color: ${entry.color}">${entry.name}</span>
                    <span class="journal-date">${entry.date}</span>
                </div>
                <p class="journal-note">${entry.note || '<span style="color:var(--text-dim); font-style:italic;">No reflection written.</span>'}</p>
            </div>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})" title="Delete Entry">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        journalContainer.appendChild(itemElement);
    });
}

function renderAnalyticsChart() {
    const canvasContext = document.getElementById('moodChart').getContext('2d');
    
    // Process top 7 logs chronologically
    const processingDataset = [...state.entries].slice(0, 7).reverse();
    
    const xLabels = processingDataset.map(item => item.date);
    const yScores = processingDataset.map(item => item.score);
    const pointColors = processingDataset.map(item => item.color);

    if (state.chart) {
        state.chart.destroy();
    }

    // Determine current text scaling colors based on data-theme properties
    const isDark = state.theme === 'dark';
    const gridColorValue = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColorValue = isDark ? '#94a3b8' : '#64748b';

    state.chart = new Chart(canvasContext, {
        type: 'line',
        data: {
            labels: xLabels.length === 0 ? ['No Data'] : xLabels,
            datasets: [{
                label: 'Mood Engine Scale',
                data: yScores.length === 0 ? [3] : yScores,
                borderColor: '#8b5cf6',
                backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.05)',
                borderWidth: 4,
                tension: 0.4,
                pointBackgroundColor: pointColors.length === 0 ? ['#8b5cf6'] : pointColors,
                pointBorderColor: 'transparent',
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: gridColorValue },
                    ticks: { color: textColorValue, font: { family: 'Plus Jakarta Sans', weight: 500 } }
                },
                y: {
                    min: 1,
                    max: 5,
                    grid: { color: gridColorValue },
                    ticks: {
                        stepSize: 1,
                        color: textColorValue,
                        font: { family: 'Plus Jakarta Sans', weight: 600 },
                        callback: function(value) {
                            const customMapping = ['', 'Angry', 'Sad', 'Neutral', 'Calm', 'Happy'];
                            return customMapping[value] || '';
                        }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}