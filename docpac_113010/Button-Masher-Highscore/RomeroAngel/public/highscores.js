fetch("/api/scores")
    .then(response => response.json())
    .then(scores => {
        console.log(scores);
        const ThisHoldsTheTableScore = document.getElementById("ThisHoldsTheTableScore")

        if (scores.length === 0) {
            ThisHoldsTheTableScore.textContent = "No scores have been submitted.";
            return;
        }

        for (let i = 0; i < scores.length; i++) {
            const scoreRow = document.createElement("tr");
            const playerRank = document.createElement("td");
            const playerName = document.createElement("td");
            const playerScore = document.createElement("td");
            playerRank.textContent = i + 1;
            playerName.textContent = scores[i].name;
            playerScore.textContent = scores[i].score;

            scoreRow.appendChild(playerRank);
            scoreRow.appendChild(playerName);
            scoreRow.appendChild(playerScore);
            ThisHoldsTheTableScore.appendChild(scoreRow);
        }
    })
    .catch(error => {
        console.error("We Had An Error Loading You Scores:", error);
    });