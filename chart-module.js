// --- ANALYTICS GRAPH COMPONENT DEPLOYMENT ---
export let activeChartInstance = null;

export function renderAnalyticsChart(entries, currentTheme) {
    const canvas = document.getElementById('moodChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const recentDataset = [...entries].slice(0, 7).reverse();
    
    const xLabels = recentDataset.map(item => item.date);
    const yScores = recentDataset.map(item => item.score);
    const pointColors = recentDataset.map(item => item.color);

    if (activeChartInstance) {
        activeChartInstance.destroy();
    }

    const isDark = currentTheme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    activeChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels.length === 0 ? ['No Entry'] : xLabels,
            datasets: [{
                data: yScores.length === 0 ? [3] : yScores,
                borderColor: '#8b5cf6',
                backgroundColor: isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.04)',
                borderWidth: 4,
                tension: 0.4,
                pointBackgroundColor: pointColors.length === 0 ? ['#8b5cf6'] : pointColors,
                pointBorderColor: 'transparent',
                pointRadius: 6,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: textColor } },
                y: {
                    min: 1, max: 5,
                    grid: { color: gridColor },
                    ticks: {
                        stepSize: 1, color: textColor,
                        callback: (value) => ['', 'Angry', 'Sad', 'Neutral', 'Calm', 'Happy'][value] || ''
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}