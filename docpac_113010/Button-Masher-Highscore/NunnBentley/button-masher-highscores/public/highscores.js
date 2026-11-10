const tableScore = document.getElementById("tableScore")
const scoreMessage = document.getElementById("scoreMessage")

async function loadScores() {
    try {
        const response = await fetch("/api/scores")

        if (!response.ok) {
            throw new Error("Server responded with " + response.status)
        }

        const scores = await response.json()
        displayScores(scores)
    } catch (err) {
        console.error("Could not load scores:", err)
        scoreMessage.textContent = "Could not load scores. Please try again later."
    }
}

function displayScores(scores) {
    tableScore.textContent = ""

    if (scores.length === 0) {
        scoreMessage.textContent = "No scores have been submitted."
        return
    }

    scoreMessage.textContent = ""

    scores.forEach(function(entry, index) {
        const row = document.createElement("tr")

        const rankCell = document.createElement("td")
        rankCell.textContent = index + 1

        const nameCell = document.createElement("td")
        nameCell.textContent = entry.name
        const scoreCell = document.createElement("td")
        scoreCell.textContent = entry.score

        row.appendChild(rankCell)
        row.appendChild(nameCell)
        row.appendChild(scoreCell)
        tableScore.appendChild(row)
    })
}

loadScores()
