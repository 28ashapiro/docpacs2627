let indx = 0
let prevFA = false
let Apressed = false
let Startpressed = false
let prevFS = true
let ASC = false
let gameEnded = false
let score = 0
let timer = 20
let direction
let controllerStatus = document.getElementById("controllerStatus")
let scoreBox = document.getElementById("scoreBox")
let directionBox = document.getElementById("directionBox")
let timerBox = document.getElementById("timerBox")
const dirMap = ["Up", "Right", "Down", "Left"]
let gamepad

let timerID = setInterval(function () {
    if (timer > 0) {
        timer--
        timerBox.textContent = `Time:  ${timer}`
    }
    if (timer == 0) {
        gameEnded = true
        timerBox.textContent = "Game Over! Press start to restart."
        clearInterval(timerID)
    }
}, 1000)

direction = Math.floor(Math.random() * 4)
directionBox.textContent = dirMap[direction]

let directionID = setInterval(function () {
    if (gameEnded == false) {
        direction = Math.floor(Math.random() * 4)
        directionBox.textContent = dirMap[direction]
    }
    else {
        clearInterval(directionID)
    }
}, 2000)

function pollGamepad() {
    gamepad = navigator.getGamepads()[indx]

    if (gamepad.buttons[0].pressed) {
        Apressed = true
        if (prevFA == false) {
            ASC = true
            console.log("a pressed")
        }
        else{
            ASC = false
        }
    }
    else {
        Apressed = false
    }

    if (gamepad.buttons[9].pressed) {
        Startpressed = true
        if (prevFS == false) {
            location.reload()
        }
    }
    else {
        Startpressed = false
    }

    function dirMatch(reqDirection, horAX, verAX){
    let helddirection
        if (verAX > 0.5){
        helddirection = dirMap[2]
    }
    else if (verAX < -0.5){
        helddirection = dirMap[0]
    }
    else if (horAX > 0.5){
        helddirection = dirMap[1]
    }
    else if (horAX < -0.5){
        helddirection = dirMap[3]
    }
    else{
        helddirection = null
    }
    console.log(helddirection)

    if (reqDirection == helddirection){
        return true
    }
    else{
        return false
    }
}

    if (ASC == true && timer > 0 && gameEnded == false && dirMatch(dirMap[direction], gamepad.axes[0], gamepad.axes[1]) == true){
        score ++
        scoreBox.textContent = `Score: ${score}`
    }

    prevFA = Apressed
    prevFS = Startpressed
    requestAnimationFrame(pollGamepad)
}



window.addEventListener("gamepadconnected", function (event) {
    indx = event.gamepad.index
    console.log(indx)
    controllerStatus.textContent = "Controller connected"
    pollGamepad()
})
window.addEventListener("gamepaddisconnected", function (event) {
    controllerStatus.textContent = "Controller disconnected"
    indx = null
})