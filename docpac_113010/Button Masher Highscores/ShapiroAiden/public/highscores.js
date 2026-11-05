const highScoreTableBody = document.getElementById('highScoreTableBody');
const highScoreStatus = document.getElementById('highScoreStatus');

async function getHighScores() {
    try {
        const response = await fetch('/api/scores');

        if (!response.ok) {
            throw new Error('Scores could not be loaded.');
        }

        const scores = await response.json();
        displayHighScores(scores);
    } catch (err) {
        console.log('Error loading scores:', err);
        highScoreStatus.textContent = 'High scores could not be loaded.';
    }
}

function displayHighScores(scores) {
    highScoreTableBody.textContent = '';

    if (scores.length === 0) {
        highScoreStatus.textContent = 'No scores have been submitted.';
        return;
    }

    highScoreStatus.textContent = '';

    scores.forEach((score, index) => {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        rankCell.textContent = index + 1;
        nameCell.textContent = score.name;
        scoreCell.textContent = score.score;

        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        highScoreTableBody.appendChild(row);
    });
}

getHighScores();
