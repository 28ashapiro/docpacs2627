// Game Variables
let score = 0;
let timer = 20;
let currentDirection = 3; // top = 0, right = 1, etc.
let gameLoopID, directionLoopID;
// Controller Variables
let pressedButtonA = false;
let pressedButtonStart = false;
let lastHoldDirection = -1;
// Elements
const scoreBoxElement = document.getElementById("scoreBox");
const timerBoxElement = document.getElementById("timerBox");
const directionBoxElement = document.getElementById("directionBox");
const statusBoxElement = document.getElementById("statusMessage");
const controllerStatusElement = document.getElementById("controllerStatus");
// Direction Map
const directions = ["Up", "Right", "Down", "Left"];
let i = 0
// Controller handling and polling
addEventListener("gamepadconnected", (e) => {
    currentController = navigator.getGamepads()[e.gamepad.index];
    controllerStatusElement.textContent = "Controller connected";
    // dont reload the page if the controller connects holding the start button
    pollController(!e.gamepad.buttons[9].pressed);
});
addEventListener("gamepaddisconnected", (e) => {
    controllerStatusElement.textContent = "Controller disconnected";
});

function pollController(reload = true) {
    // example taken from https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API#complete_example_displaying_gamepad_state
    for (const controller of navigator.getGamepads()) {
        // getGamepads() can return null, so make sure controller is actually a gamepad object
        if (!controller) continue;
        
        // Calculate axes w/ deadzone
        let xAxis = controller.axes[0];
        let yAxis = controller.axes[1];
        const magnitudeSquared = xAxis**2 + yAxis**2;
        const deadzone = 0.3;
        if (magnitudeSquared < deadzone**2) {
            xAxis = yAxis = 0;
        }
        // Award point if direction matches and A is pressed
        if (testDirection(currentDirection, xAxis, yAxis) && timer > 0) {
            // 0 - Maps to 'A' button on classroom controllers
            if (controller.buttons[0].pressed && !pressedButtonA) {
                score += 1;
                scoreBoxElement.textContent = score;
            }    
        }

        // 9 - Maps to 'START' button on classroom controllers
        if (controller.buttons[9].pressed && !pressedButtonStart && reload) {
            location.reload();
        }

        // ==== DEBUG VIEW ====
        let direction = getDirection(xAxis, yAxis)
        if (controller.buttons[0].pressed && !pressedButtonA) {
            console.debug(`[DEBUG]: \"A\" button pressed. Current score ${score}`);
        }
        if (direction !== lastHoldDirection ) {
            console.debug(`[DEBUG]: Holding ${direction >= 0 ? directions[direction] : "nothing"}`);
        }
        // ====================

        pressedButtonA = controller.buttons[0].pressed;
        pressedButtonStart = controller.buttons[9].pressed;
        lastHoldDirection = direction;

        requestAnimationFrame(pollController);
    }
}



function getDirection(xAxis, yAxis) {
    // -1 indicates direction is not held
    let joystickDirection = -1;
    if (xAxis === 0 && yAxis === 0) {
        joystickDirection = -1;
    }
    // up
    else if (yAxis <= -Math.abs(xAxis)) {
        joystickDirection = 0;
    }
    // down 
    else if (yAxis > Math.abs(xAxis)) {
        joystickDirection = 2
    }
    // right
    else if (xAxis >= Math.abs(yAxis)) {
        joystickDirection = 1;
    }
    // left
    else {
        joystickDirection = 3;
    }
    return joystickDirection;
}

function testDirection(direction, xAxis, yAxis) {
    return getDirection(xAxis, yAxis) === direction;
}

//Game loop
gameLoopID = setInterval(gameLoop, 1000);

function gameLoop() {
    timer -= 1;
    timerBoxElement.textContent = timer;

    if (timer <= 0) {
        clearInterval(gameLoopID);
        directionBoxElement.textContent = "Game Over!";
        statusBoxElement.textContent = "Press the \"Start\" button to try again."
        statusBoxElement.style.display = "inherit";
    }
}

//Direction change loop
directionLoopID = setInterval(directionChangeLoop, 2000);
directionChangeLoop();

function directionChangeLoop() {
    if (timer <= 0) {
        clearInterval(directionLoopID);
        return;
    }
    currentDirection = Math.floor(Math.random() * 4);
    directionBoxElement.textContent = directions[currentDirection];
}