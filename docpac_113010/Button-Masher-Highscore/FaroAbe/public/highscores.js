const loading = document.getElementById('loading');
const error = document.getElementById('error');
const scoresTable = document.getElementById('scoresTable');
const scoresBody = document.getElementById('scoresBody');

async function loadHighScores() {
    try {
        const response = await fetch('/api/scores');

        if (!response.ok) {
            throw new Error('Failed to load scores');
        }

        const scores = await response.json();

        // Hide loading
        loading.style.display = 'none';

        if (scores.length === 0) {
            error.textContent = 'No scores yet. Be the first!';
            error.style.display = 'block';
            return;
        }

        scoresTable.style.display = 'table';

        scores.forEach((score, index) => {
            const row = document.createElement('tr');

            const date = new Date(score.created_at);
            const formattedDate = date.toLocaleDateString();

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.name}</td>
                <td>${score.score}</td>
                <td>${formattedDate}</td>
            `;

            scoresBody.appendChild(row);
        });

    } catch (err) {
        console.error('Error loading scores:', err);
        loading.style.display = 'none';
        error.textContent = 'Could not load high scores';
        error.style.display = 'block';
    }
}

loadHighScores();
