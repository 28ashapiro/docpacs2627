const errorElement = document.getElementById('error');
const leaderboard = document.getElementById('leaderboard');
const tbodyElement = document.getElementById('tbody');

async function loadHighScores() {
    try {
        const response = await fetch('/api/scores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            displayScores(data)
        } else {
            errorElement.textContent = 'Uh Oh! Something went wrong!'
        };

    } catch (error) {
        console.log("Error: Something went wrong", error)
        errorElement.textContent = 'ERROR'
    };
};

function displayScores(scores) {
        for (let i = 0; i < scores.length; i++){
        const row = document.createElement('tr');
        let cell1 = document.createElement('td');
        cell1.textContent = i + 1
        row.appendChild(cell1);

        let cell3 = document.createElement('td');
        cell3.textContent = scores[i].name;
        row.appendChild(cell3);

        let cell4 = document.createElement('td');
        cell4.textContent = scores[i].score;
        row.appendChild(cell4);
        tbodyElement.appendChild(row);
    };
};



loadHighScores();