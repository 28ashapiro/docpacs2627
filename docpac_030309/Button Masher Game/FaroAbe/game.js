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
const directionNames = ["Up", "Right", "Down", "Left"];
const timerInterval = setInterval(function () {
    if (timer > 0) {
        timer = timer - 1;
        timerBox.textContent = "Time: " + timer;
    }
    else {
        gameEnded = true;
        gameEnded = true;
        clearInterval(directionTimer);
        directionBox.textContent = "GAME OVER";
        controllerStatus.textContent = "Press Start to restart";
    }
}, 1000);
const directionTimer = setInterval(function () {
    direction = Math.floor(Math.random() * 4)
    directionNames[direction]
    directionBox.textContent = directionNames[direction];
}, 2000);
window.addEventListener('gamepadconnected', function (event) {
    activeGamepadIndex = event.gamepad.index
    controllerStatus.textContent = "Controller Connected"
});
window.addEventListener('gamepaddisconnected', function (event) {
    activeGamepadIndex = null;
    controllerStatus.textContent = "Controller Disconnected"
});
function checkDirection(requiredDirection, horizontal, vertical) {
    if (requiredDirection == 0) {
        return vertical < -JOYSTICK_THRESHOLD;
    }
    else if (requiredDirection == 1) {
        return horizontal > JOYSTICK_THRESHOLD;
    }
    else if (requiredDirection == 2) {
        return vertical > JOYSTICK_THRESHOLD;
    }
    else if (requiredDirection == 3) {
        return horizontal < -JOYSTICK_THRESHOLD;
    }

}
function pollGamepad() {
    const gamepads = navigator.getGamepads();

    if (activeGamepadIndex !== null) {
        const gamepad = gamepads[activeGamepadIndex];
        const aButtonPressed = gamepad.buttons[0].pressed;
        const startButtonPressed = gamepad.buttons[9].pressed;
        const horizontalAxis = gamepad.axes[0];
        const verticalAxis = gamepad.axes[1];
        if (aButtonPressed && !previousAButtonPressed) {
            if (timer > 0 && !gameEnded && checkDirection(direction, horizontalAxis, verticalAxis)) {
                scoreBox.textContent = "Score: " + score;
                score = score + 1;
            }
        }
        previousAButtonPressed = aButtonPressed;
        if (startButtonPressed && !previousStartButtonPressed && gameEnded) { //I added gameEnded because otherwise you could just spam start to constantly reload the page 
            location.reload();
        }
        previousStartButtonPressed = startButtonPressed;
    }
    requestAnimationFrame(pollGamepad);
}

pollGamepad();
