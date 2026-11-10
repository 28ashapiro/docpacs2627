async function requestScores() {
    const url = "/api/scores"
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json();
        display(data);
    } else {
        const message = document.querySelector("#message");
        message.innerHTML = "No scores have been submitted";
    }
}

function display(resData) {
    const scores = document.querySelector("#scores");
    if (resData.length == 0) {
        const message = document.querySelector("#message");
        message.innerHTML = "No scores have been submitted";
    }
    resData.forEach((item, index) => {
        const rank = index + 1;
        const tr = document.createElement('tr');
        const rankCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        rankCell.textContent = rank;
        nameCell.textContent = item.name;
        scoreCell.textContent = item.score;

        tr.appendChild(rankCell);
        tr.appendChild(nameCell);
        tr.appendChild(scoreCell);
        scores.appendChild(tr);
    })
}

window.onload = requestScores;