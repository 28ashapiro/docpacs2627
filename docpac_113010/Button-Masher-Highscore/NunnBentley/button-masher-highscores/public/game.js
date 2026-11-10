let gameStarted = false
let gameOver = false

let score = 0
let finalScore = 0
let currentDirection = Math.floor(Math.random() * 4)
let countdowntimer = null
let directionTimer = null
let timeremaining = 20
let gamepad = null
let buttonPressed = false
let loopRunning = false
let scoreSaved = false
let submitting = false

const directionMap = {
    0: "UP",
    1: "DOWN",
    2: "LEFT",
    3: "RIGHT"
}

const controllerStatus = document.getElementById("ControllerStatus")
const scoreEl = document.getElementById("SCORE")
const timerEl = document.getElementById("TIMER")
const directionBox = document.getElementById("directionbox")
const restartMessage = document.getElementById("restartMessage")
const scoreForm = document.getElementById("scoreForm")
const finalScoreEl = document.getElementById("finalScore")
const playerName = document.getElementById("playerName")
const submitButton = document.getElementById("submitScore")
const scoreMessage = document.getElementById("scoreMessage")

controllerStatus.textContent = "No Controller Detected"
waitForStart()

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected:", e.gamepad.id)
    gamepad = e.gamepad
    controllerStatus.textContent = "controller: " + e.gamepad.id
})

window.addEventListener("gamepaddisconnected", function() {
    console.log("Gamepad disconnected")
    gamepad = null
    controllerStatus.textContent = "No controller Detected"
})

function waitForStart() {
    directionBox.textContent = "press START to begin"
    requestAnimationFrame(checkForStart)
}

function checkForStart() {
    if (gamepad) {
        const gp = navigator.getGamepads()[gamepad.index]

        if (gp && (gp.buttons[9].pressed || gp.buttons[8].pressed)) {
            if (!gameStarted || gameOver) {
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

    scoreSaved = false
    scoreForm.hidden = true
    playerName.value = ""
    submitButton.disabled = false
    scoreMessage.textContent = ""
}

function checkGamepadInput() {
    if (!gamepad || gameOver) return

    const gp = navigator.getGamepads()[gamepad.index]
    if (!gp) return

    const aButtonPressed = gp.buttons[0].pressed

    const dpadPressed = gp.buttons[12].pressed || gp.buttons[13].pressed ||
                        gp.buttons[14].pressed || gp.buttons[15].pressed

    const joystickUp = gp.axes[1] < -0.5
    const joystickDown = gp.axes[1] > 0.5
    const joystickLeft = gp.axes[0] < -0.5
    const joystickRight = gp.axes[0] > 0.5
    const joystickPressed = joystickUp || joystickDown || joystickLeft || joystickRight

    const anyPressed = (dpadPressed || joystickPressed) && aButtonPressed

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
        scoreEl.textContent = "Score: " + score
    }
}

function changeDirection() {
    currentDirection = Math.floor(Math.random() * 4)
    directionBox.textContent = directionMap[currentDirection]
}

function gameLoop() {
    if (gameOver) {
        loopRunning = false
        return
    }
    checkGamepadInput()
    requestAnimationFrame(gameLoop)
}

function startgame() {
    scoreEl.textContent = "Score: " + score
    timerEl.textContent = "Time: " + timeremaining
    restartMessage.textContent = ""
    changeDirection()

    if (!loopRunning) {
        loopRunning = true
        gameLoop()
    }

    directionTimer = setInterval(changeDirection, 2000)

    countdowntimer = setInterval(function() {
        timeremaining--
        timerEl.textContent = "Time: " + timeremaining

        if (timeremaining <= 0) {
            endGame()
        }
    }, 1000)
}

function endGame() {
    clearInterval(countdowntimer)
    clearInterval(directionTimer)
    console.log("Time's up!")

    gameOver = true
    finalScore = score
    directionBox.textContent = "GAME OVER"
    timerEl.textContent = "Time: 0"
    restartMessage.textContent = "Press START to restart"

    finalScoreEl.textContent = "Final score: " + finalScore
    scoreForm.hidden = false
    playerName.focus()

    requestAnimationFrame(checkForStart)
}

scoreForm.addEventListener("submit", async function(e) {
    e.preventDefault()

    if (scoreSaved || submitting) return

    const name = playerName.value.trim()
    if (name.length === 0) {
        scoreMessage.textContent = "Please enter your name."
        return
    }

    submitting = true
    submitButton.disabled = true
    scoreMessage.textContent = "Saving..."

    try {
        const response = await fetch("/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, score: finalScore })
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Server responded with " + response.status)
        }

        scoreSaved = true
        scoreMessage.textContent = "Score saved"
    } catch (err) {
        console.error("Could not save score:", err)
        scoreMessage.textContent = "Could not save score: " + err.message
        submitButton.disabled = fals
    } finally {
        submitting = false
    }
})
