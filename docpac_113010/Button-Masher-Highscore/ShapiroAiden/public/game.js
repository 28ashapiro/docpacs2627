score = 0
timer = 20
directionNum = [0, 1, 2, 3]
let gamepadIndex = []
let aPressed = []
let startPressed = []
let gameEnded = false
let a = false
let callTimer = null
let directionTimer = null

// const!!
const scoreBox = document.getElementById("scoreBox")
const timerBox = document.getElementById("timerBox")
const directionBox = document.getElementById("directionBox")
let controllerStatusBox = document.getElementById("controllerStatus")
const playerNameBox = document.getElementById("playerName")
const submissionStatusBox = document.getElementById("submissionStatus")
const highScoreLink = document.getElementById("highScoreLink")

// directions in an array
const directionArray = ["Up ⬆️", "Right ➡️", "Down ⬇️", "Left ⬅️"]

// timer
callTimer = setInterval(function () {
    if (timer <= 0) {
        clearInterval(callTimer);
        endGame();
    } else {
        timer -= 1
        timerBox.textContent = "Time: " + timer;
        if (timer <= 0) {
            clearInterval(callTimer);
            endGame();
        }
    }
}, 1000)

// change and display direction every 2 seconds
directionTimer = setInterval(function () {
    if (gameEnded == false) {
        getRandomDirection();
    }
}, 2000)

function getRandomDirection() {
    const randomIndex = Math.floor(Math.random() * directionArray.length);
    directionBox.textContent = "Direction: " + directionArray[randomIndex];
    return directionArray[randomIndex];
}
getRandomDirection()

function endGame() {
    if (gameEnded == true) {
        return;
    }

    gameEnded = true;
    clearInterval(callTimer);
    clearInterval(directionTimer);
    directionBox.textContent = "Game Over!";
    timerBox.textContent = "Time: 0";
    submissionStatusBox.textContent = "Final score: " + score + ". Saving score...";

    submitScore();
}

async function submitScore() {
    const name = playerNameBox.value.trim();

    if (name === '' || name.length > 20) {
        submissionStatusBox.textContent = "Invalid name. Enter a name from 1 to 20 characters. Final score: " + score;
        return;
    }

    if (!Number.isInteger(score) || score < 0) {
        submissionStatusBox.textContent = "Invalid score. Final score: " + score;
        return;
    }

    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, score: score })
        });

        const result = await response.json();

        if (response.ok) {
            submissionStatusBox.textContent = "Score saved! Final score: " + score;
            highScoreLink.hidden = false;
        } else {
            submissionStatusBox.textContent = result.error || "Invalid name or score. Final score: " + score;
        }
    } catch (err) {
        console.log('Error submitting score:', err);
        submissionStatusBox.textContent = "Score could not be saved. Final score: " + score;
    }
}

// controller connection
window.addEventListener("gamepadconnected", (e) => {
    let gpIndex = e.gamepad.index;
    gamepadIndex[0] = gpIndex;
    console.log(`Controller Connected! Gamepad Index: ${gpIndex}`);
    controllerStatusBox.textContent = "Controller Connected!";
    controllerStatusBox.style.color = "green";
});

window.addEventListener("gamepaddisconnected", (e) => {
    console.log("Lost connection to Controller...");
    controllerStatusBox.textContent = "Controller Disconnected...";
    controllerStatusBox.style.color = "red";
    gamepadIndex[0] = undefined;
});

// controller input & a button press
function updateGamepadLoop() {
    const gamepads = navigator.getGamepads();
    const gp = gamepads[gamepadIndex[0]];

    if (gp && gameEnded == false) {
        const aNow = gp.buttons[0].pressed;
        const startNow = gp.buttons[9].pressed;

        // A press
        if (aNow && !aPressed[0]) {
            a = true
        } else {
            a = false
        }

        // Start restarts the game
        if (startNow && !startPressed[0]) {
            location.reload();
        }

        // remember previous states
        aPressed[0] = aNow;
        startPressed[0] = startNow;

        const leftX = gp.axes[0];
        const leftY = gp.axes[1];
        const stickDrift = 0.5;

        if (a && leftX < -stickDrift && timer > 0) {
            if (directionBox.textContent.includes("Left")) {
                score += 1;
                scoreBox.textContent = "Score: " + score;
            }
        }
        if (a && leftX > stickDrift && timer > 0) {
            if (directionBox.textContent.includes("Right")) {
                score += 1;
                scoreBox.textContent = "Score: " + score;
            }
        }
        if (a && leftY > stickDrift && timer > 0) {
            if (directionBox.textContent.includes("Down")) {
                score += 1;
                scoreBox.textContent = "Score: " + score;
            }
        }
        if (a && leftY < -stickDrift && timer > 0) {
            if (directionBox.textContent.includes("Up")) {
                score += 1;
                scoreBox.textContent = "Score: " + score;
            }
        }
    }
    requestAnimationFrame(updateGamepadLoop);
}
updateGamepadLoop();
