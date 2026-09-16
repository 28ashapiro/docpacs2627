let score = 0;
let timer = 20;
let direction = 0; //top=0, right=1, down=2, left=3
let gameloopVar;
let directionrandomVar;
let buttonAPressed = false;
let buttonStartPressed = false;
let gameOver = false
let randDirect

const scoreBoxElement = document.getElementById("scoreBox")
const timerBoxElement = document.getElementById("timerBox")
const directionBoxElement = document.getElementById("directionBox")
const controllerStatusElement = document.getElementById("controllerStatus")
const directions = ["Up", "Right", "Down", "Left"]
 
gameloopVar = setInterval(() => {
        --timer;
        timerBoxElement.textContent = timer
        
        if(timer <= 0) {
            clearInterval(gameloopVar);
            gameOver = true
            directionBoxElement.textContent = "Press START to play again!"
            timerBoxElement.textContent = "Game Over!"
        }
    }, 1000)

directionrandomVar = setInterval(directInit, 2000)

function directInit(){
        randDirect = Math.floor(Math.random() * 4)
        if(timer > 0){
            directionBoxElement.textContent = directions[randDirect]
        }
    }
directInit()

addEventListener("gamepadconnected", (e) => { 
    controllerStatusElement.textContent = "Controller Connected"; 
    controller = e.gamepad
    console.log(controller)
    requestAnimationFrame(controllerPoll)
})

addEventListener("gamepaddisconnected", (e) => {
    controllerStatusElement.textContent = "Controller Disconnected"
})

function controllerPoll() {
    for (const controller of navigator.getGamepads()){
        if (!controller) continue;
        
        if (controller.buttons[0].pressed && !buttonAPressed) {
            console.log("A button pressed!")
        }
        if (controller.buttons[9].pressed && !buttonStartPressed) {
            console.log("START button pressed!")
        }

        let yaxis = controller.axes[1]
        let xaxis = controller.axes[0]
        let deadzone = 0.5;
        
        if(Math.abs(yaxis) <= deadzone){
            yaxis = 0;
        }

        if(Math.abs(xaxis) <= deadzone){
            xaxis = 0;
        }

        console.log(xaxis, yaxis)

        if(timer > 0 && !gameOver && funcyDirection(randDirect,  xaxis, yaxis)){
        if(controller.buttons[0].pressed && !buttonAPressed) {
            ++score;
            scoreBoxElement.textContent = score
        }
        }
        buttonAPressed = controller.buttons[0].pressed
        buttonStartPressed = controller.buttons[9].pressed
        requestAnimationFrame(controllerPoll)

        if (buttonStartPressed){
        location.reload()
        }
    }
}

function funcyDirection(direction, xaxis, yaxis) {
    let stickDirection;
    if(yaxis === -1) {
        stickDirection = 0
    }

    else if(yaxis === 1) {
        stickDirection = 2
    }

    else if (xaxis === 1){
        stickDirection = 1
    } 

    else if (xaxis === -1){
        stickDirection = 3
    }
    return direction === stickDirection
    }


