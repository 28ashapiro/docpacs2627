let score = 0;
let timer = 20;
let direction = 0;
let activeGamepadIndex = null;
let previousAButtonPressed = false;
let previousStartButtonPressed = false;
let gameEnded = false;

const JOYSTICK_THRESHOLD = 0.5;
const scoreBox = document.getElementById('scoreBox');
const timerBox = document.getElementById('timerBox');
const directionBox = document.getElementById('directionBox');
const controllerStatus = document.getElementById('controllerStatus');
const playerNameInput = document.getElementById('playerName');
const directionNames = ["Up", "Right", "Down", "Left"];
async function submitScore(name, score) {
    console.log('score submits');
    console.log('Name:', name);
    console.log('Score:', score);

    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                score: score
            })
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('save score!', data);
            controllerStatus.textContent = "Score saved! View High Scores";
        } else {
            const error = await response.json();
            console.error('Server rejected score:', error);
            controllerStatus.textContent = "Error: " + error.message;
        }

    } catch (error) {
        console.error('Network error:', error);
        controllerStatus.textContent = "Could not save score";
    }
}

function endGame() {
    if (gameEnded) return;
    gameEnded = true;

    console.log('Game Over!');

    clearInterval(timerInterval);
    clearInterval(directionInterval);

    directionBox.textContent = 'GAME OVER!';
    timerBox.textContent = 'Time: 0';
    controllerStatus.textContent = "Press Start to restart";

    const playerName = playerNameInput.value.trim() || "Anonymous";
    console.log('Player Name:', playerName);
    console.log('Final Score:', score);
    console.log('Score submission beep bop.');
    submitScore(playerName, score);
}

const timerInterval = setInterval(function () {
    if (timer > 0) {
        timer = timer - 1;
        timerBox.textContent = "Time: " + timer;
    } else {
        endGame();
    }
}, 1000);

const directionInterval = setInterval(function () {
    direction = Math.floor(Math.random() * 4);
    directionBox.textContent = directionNames[direction];
}, 2000);

window.addEventListener('gamepadconnected', function (event) {
    activeGamepadIndex = event.gamepad.index;
    controllerStatus.textContent = "Controller Connected";
});

window.addEventListener('gamepaddisconnected', function (event) {
    activeGamepadIndex = null;
    controllerStatus.textContent = "Controller Disconnected";
});

function checkDirection(requiredDirection, horizontal, vertical) {
    if (requiredDirection == 0) return vertical < -JOYSTICK_THRESHOLD;
    if (requiredDirection == 1) return horizontal > JOYSTICK_THRESHOLD;
    if (requiredDirection == 2) return vertical > JOYSTICK_THRESHOLD;
    if (requiredDirection == 3) return horizontal < -JOYSTICK_THRESHOLD;
    return false;
}

function pollGamepad() {
    const gamepads = navigator.getGamepads();

    if (activeGamepadIndex !== null && gamepads[activeGamepadIndex]) {
        const gamepad = gamepads[activeGamepadIndex];
        const aButtonPressed = gamepad.buttons[0].pressed;
        const startButtonPressed = gamepad.buttons[9].pressed;
        const horizontalAxis = gamepad.axes[0];
        const verticalAxis = gamepad.axes[1];

        if (aButtonPressed && !previousAButtonPressed) {
            if (timer > 0 && !gameEnded && checkDirection(direction, horizontalAxis, verticalAxis)) {
                score = score + 1;
                scoreBox.textContent = "Score: " + score;
            }
        }
        previousAButtonPressed = aButtonPressed;

        if (startButtonPressed && !previousStartButtonPressed && gameEnded) {
            location.reload();
        }
        previousStartButtonPressed = startButtonPressed;
    }
    requestAnimationFrame(pollGamepad);
}

pollGamepad();
