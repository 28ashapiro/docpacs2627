console.log("fetching")

fetch("/api/scores")
.then(response => response.json())
.then(data => displayData(data))

function displayData(data) {
    console.log("displaying", data)

    
    
    item = 0
    if (data.length != 0) {

        const table = document.createElement("table");
        table.style.border = "1px solid black";

        document.body.appendChild(table)

        data.forEach(element => {
            const row = document.createElement("tr");
            table.appendChild(row);
    
            const rank = document.createElement("td")
            rank.style.border = "1px solid black"
            const playerName = document.createElement("td")
            playerName.style.border = "1px solid black"
            const score = document.createElement("td")
            score.style.border = "1px solid black"
            
            rank.textContent = `#${item+1}`
            playerName.textContent = `Name: ${data[item].name}`
            
            if (data[item].score != 67) {
                score.textContent = `Score: ${data[item].score}`
            } else {
                score.textContent = `Score: 66 + 1`
            }
            
            row.appendChild(rank);
            row.appendChild(playerName);
            row.appendChild(score);
    
            item++
        });
    } else {
        noScoreText = document.createElement("p");
        gameAnchor = document.createElement("a");

        noScoreText.textContent = "No scores submitted! Go play a game or something.";
        gameAnchor.textContent = "Game"
        gameAnchor.href = "/game.html";

        document.body.appendChild(noScoreText);
        document.body.appendChild(gameAnchor)
    }
}