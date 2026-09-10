
let gameState = false


let score = 0
let timer = 20
let direction = 0

let previousPressedState = false

const ScoreText = document.getElementById("scoreHolder")
const TimeText = document.getElementById("timeHolder")
const DirectionText = document.getElementById("directionHolder")
const ControllerStatusText = document.getElementById("controllerStatusHolder")

const directions = ["Up", "Left", "Down", "Right"];
//navigator.getGamepads



function start(){
    setInterval(oneSecond, 1000)

    setInterval(twoSeconds, 2000)
    gameState = true
    document.getElementById("start1").textContent = ""
    document.getElementById("start2").textContent = ""
}
window.addEventListener("gamepadconnected", (e) => {
    ControllerStatusText.textContent = "Gamepad Connected!"
    requestAnimationFrame(pollGamepad)
}
)
window.addEventListener("gamepaddisconnected", (e) => {
    ControllerStatusText.textContent = "Gamepad Disconnected!"
}
)

function addScore() {

    if (doesJoystickMatch() && timer > 0) {
        score += 1
        ScoreText.textContent = score
    }

}

function pollGamepad() {
    gr = navigator.getGamepads()[0]
    Yaxis = gr.axes[1]
    Xaxis = gr.axes[0]
    buttonPressed = gr.buttons[0].pressed
    if ((!previousPressedState && buttonPressed) && getGamepadDirection() != -1) {
        addScore()
    }
    previousPressedState = buttonPressed
    if (gr.buttons[9].pressed) {
        if(gameState == false){
            start()
        } else if(timer == 0){location.reload()}
    }
    requestAnimationFrame(pollGamepad)
}

function getGamepadDirection() {

    if (Yaxis > 0.7) {
        return 2;
    }
    if (Yaxis < -0.7) {
        return 0;
    }
    if (Xaxis > 0.7) {
        return 3;
    }
    if (Xaxis < -0.7) {
        return 1;
    }
    return -1;

}

function doesJoystickMatch() {
    if (getGamepadDirection() == direction) {
        return true;
    } else { return false; }
}

function oneSecond() {
    if (timer > 0) {
        timer -= 1
        TimeText.textContent = timer
    } else {
        document.getElementById("directionBox").textContent = "Game Over! Press START to restart!"
        
    }
}

function twoSeconds() {
    if (timer > 0) {
        direction = Math.floor(Math.random() * 4)
        DirectionText.textContent = directions[direction]
        console.log(direction)
    }
}



