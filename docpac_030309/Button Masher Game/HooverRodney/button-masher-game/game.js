let score = 0;
let timer = 20;
let direction = 0;
let activeControllerIndex;
let aIsPressedDuringFrame;
let aWasPressedLastFrame;
let startIsPressedDuringFrame;
let startWasPressedLastFrame;
let gameActive = false;
let controllerIndex = null;
let gameEnded = false;

const scoreBox = document.getElementById("scoreBox");
const timerBox = document.getElementById("timerBox");
const directionBox = document.getElementById("directionBox");
const controllerStatus = document.getElementById("controllerStatus");
const directions = ["up", "right", "down", "left"];
const controllerMessages = [
    "Controller not detected",
    "Controller connected",
    "Controller disconnected"
];
const message = document.getElementById("message");

function updateUI() {
    scoreBox.innerHTML = "Score: " + score;
    timerBox.innerHTML = "Timer: " + timer;
    directionBox.innerHTML = "Direction: " + directions[direction];
    if (direction == 0) {
        directionBox.style = "background-color: lime; border-color: #00a700";
    } else if (direction == 1) {
        directionBox.style = "background-color: orange; border-color: #b17300";
    } else if (direction == 2) {
        directionBox.style = "background-color: yellow; border-color: #a7a700";
    } else if (direction == 3) {
        directionBox.style = "background-color: pink; border-color: #9d767d";
    }
}

function updateScoreBoxStyle() {
    scoreBox.style = "padding: 2.5em";

    setTimeout(function () {
        scoreBox.style = "padding: 2em";
    }, 50);
}

function pollGamepad() {
    const gamepads = navigator.getGamepads();
    if (controllerIndex === null) {
        requestAnimationFrame(pollGamepad);
        return;
    }
    const gamepad = gamepads[controllerIndex];
    const aIsPressed = gamepad.buttons[0].pressed;
    const startIsPressed = gamepad.buttons[9].pressed;
    const horizontal = gamepad.axes[0];
    const vertical = gamepad.axes[1];
    // console.log("Horizontal: ", horizontal, "Vertical:", vertical);
    if (gameActive == true) {
        if (aWasPressedLastFrame === false && aIsPressed === true && doesJoyStickMatchDirection(direction, horizontal, vertical)) {
            console.log("A button newly pressed");
            score += 1;
            updateScoreBoxStyle();
            updateUI();
        }
    }
    if (startWasPressedLastFrame === false && startIsPressed === true) {
        console.log("Start button newly pressed");
        if (gameActive === false && gameEnded === false) {
            gameActive = true;
            message.innerHTML = "The game has started!";
        } else if (gameActive === false && gameEnded === true) {
            location.reload();
        }
    }
    aWasPressedLastFrame = aIsPressed;
    startWasPressedLastFrame = startIsPressed;
    requestAnimationFrame(pollGamepad);
}

function doesJoyStickMatchDirection(requiredDirection, horizontal, vertical) {
    switch (requiredDirection) {
        case 0:
            return vertical < -0.5;
        case 1:
            return horizontal > 0.5;
        case 2:
            return vertical > 0.5;
        case 3:
            return horizontal < -0.5;
        default:
            return false;
    }
}

function endGame() {
    console.log("Timer ran out");
    gameActive = false;
    message.innerHTML = "The game has ended! Click 'Start' to play again! (Refreshes Page)";
    scoreBox.innerHTML = "Final Score: " + score;
    gameEnded = true;
}

window.addEventListener("gamepadconnected", (event) => {
    controllerIndex = event.gamepad.index;
    controllerStatus.innerHTML = controllerMessages[1];
    console.log("Controller connected at index: " + controllerIndex);
});

window.addEventListener("gamepaddisconnected", (event) => {
    endGame();
    controllerIndex = null;
    controllerStatus.innerHTML = controllerMessages[2];
    console.log("Controller disconnected!");
    message.innerHTML = "The game was abruptly ended due to controller disconnection! Reconnect controller and press the 'Start' button to restart!";
})

window.addEventListener('blur', () => {
    if (gameActive == true) {
        console.log("The page has lost focus.");
        endGame();
        message.innerHTML = "The game was abruptly ended due to the user clicking off of the page!";
    }
});

const timerInterval = setInterval(function () {
    if (gameActive == true) {
        if (timer > 0) {
            timer -= 1;
        } else if (timer == 0) {
            endGame();
        }
    }
    updateUI();
}, 1000)

const directionInterval = setInterval(function () {
    if (gameActive == true) {
        direction = Math.floor(Math.random() * 4);
        updateUI();
    } else if (gameActive == false) {

    }
}, 2000)

window.onload = function () {
    updateUI();
    pollGamepad();
}
