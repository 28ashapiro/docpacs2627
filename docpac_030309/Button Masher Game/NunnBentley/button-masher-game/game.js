let gameStarted = false

window.addEventListener('DOMContentLoaded', function() {
    this.document.getElementById("ControllerStatus").textContent = "No Controller Detected"
    waitForStart()
})

let score = 0
let currentDirection = Math.floor(Math.random() * 4);
let countdowntimer = null
let timeremaining = 20;
let gamepad = null
let buttonPressed = false
let directionTimer = null
let gameOver = false

let directionMap = {
    0: "UP",
    1: "DOWN",
    2: "LEFT",
    3: "RIGHT"
}

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected:", e.gamepad.id)
    gamepad = e.gamepad
    document.getElementById("ControllerStatus").textContent = "controller: " + e.gamepad.id


})

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected")
    gamepad = null
    document.getElementById("ControllerStatus").textContent = "No controller Detected"

})

function waitForStart() {
    document.getElementById("directionbox").textContent = "press START to begin"
    requestAnimationFrame(checkForStart)
}

function checkForStart() {
    if (gamepad) {
        let gp = navigator.getGamepads()[gamepad.index]

        if (gp.buttons[9].pressed || gp.buttons[8].pressed) {
            if  (!gameStarted || gameOver) {
            resetGame()
            gameStarted = true
            gameOver = false
            startgame()
            return
            }
        }
    }

    if (!gameStarted || gameOver) {
        requestAnimationFrame(checkForStart)
    }

}

function resetGame() {
    if (countdowntimer) clearInterval(countdowntimer)
    if (directionTimer) clearInterval(directionTimer)

    score = 0
    timeremaining = 20
    currentDirection = Math.floor(Math.random() * 4)
    buttonPressed = false
}

function checkGamepadInput() {
    if (!gamepad || timeremaining < 0) return

    let gp = navigator.getGamepads()[gamepad.index]

    let aButtonPressed = gp.buttons[0].pressed

    let dpadPressed = gp.buttons[12].pressed || gp.buttons[13].pressed ||
                    gp.buttons[14].pressed || gp.buttons[15].pressed

    let joystickUp = gp.axes[1] < -0.5
    let joystickDown = gp.axes[1] > 0.5
    let joystickLeft = gp.axes[0] < -0.5
    let joystickRight = gp.axes[0] > 0.5
    let joystickPressed = joystickUp || joystickDown || joystickLeft || joystickRight

    let anyPressed = (dpadPressed || joystickPressed) && aButtonPressed

    if (anyPressed && !buttonPressed) {
        buttonPressed = true
    
        if (gp.buttons[12].pressed || joystickUp) handleInput(0)
        else if (gp.buttons[13].pressed || joystickDown) handleInput(1)
        else if (gp.buttons[14].pressed || joystickLeft) handleInput(2)
        else if (gp.buttons[15].pressed || joystickRight) handleInput(3)

    } else if (!anyPressed) {
        buttonPressed = false
    }
}

function handleInput(direction) {
    if (direction === currentDirection) {
        score++
        document.getElementById("SCORE").textContent = "Score: " + score
    }
}

function changeDirection() {
    currentDirection = Math.floor(Math.random() * 4)
    document.getElementById("directionbox").textContent = directionMap[currentDirection]
}

function gameLoop() {
    checkGamepadInput()
    requestAnimationFrame(gameLoop)
}

function startgame() {

document.getElementById("SCORE").textContent = "Score: " + score;
document.getElementById("restartMessage").textContent = ""
changeDirection()

gameLoop()

directionTimer = setInterval(function() {
    changeDirection()
}, 2000);

countdowntimer = setInterval(function() {
        document.getElementById("TIMER").textContent = "Time: " + timeremaining;
        console.log(timeremaining);

        timeremaining--;

        if (timeremaining < 0) {
            clearInterval(countdowntimer);
            clearInterval(directionTimer);
            console.log("Time's up!");
            gameOver = true
            document.getElementById("directionbox").textContent = "GAME OVER";
            document.getElementById("TIMER").textContent = "Time: 0";
            document.getElementById("restartMessage").textContent = "Press START to restart"

            requestAnimationFrame(checkForStart)

        }
}, 1000);
}