let time = 20;
let score = 0;
let direction = 0;
let aButtonState = false;
let hitLastFrame = false;
const timeBox = document.getElementById('timerBox');
const directionBox = document.getElementById('directionBox');
const scoreboard = document.getElementById('scoreboard');
const directions = ["Up", "Right", "Down", "Left"];
const controller = document.getElementById('controllerStatus');

directionNum = Math.floor(Math.random() * 4);
directionBox.textContent = directions[directionNum]

window.addEventListener("gamepadconnected", (e) => {
    controller.textContent = "Controller connected press A to start"
    const gp = navigator.getGamepads() [e.gamepad.index];
    window.addEventListener("gamepaddisconnected", (e) => {
        controller.textContent = "Controller disconnected",
        delete activeGamepads[gp.index];
    }),

    loop()
})
function loop() {
    certainGp = navigator.getGamepads()[0];
    aButton = certainGp.buttons[0].pressed;
    let stickX = certainGp.axes[0];
    let stickY = certainGp.axes[1];
    console.log(stickX, stickY);
    if (stickX > 0.1 && stickY) {
        stickdir = directions[1]
    }
    if (stickX < -0.1 && stickY) {
        stickdir = directions[3]
    }
    if (stickY > 0.1 && stickX) {
        stickdir = directions[2]
    }
    if (stickY < -0.1 && stickX) {
        stickdir = directions[0]
    }
    if (hitLastFrame == false && aButton == true && stickdir == direction) {
        if (time > 0) {
            score += 1
            hitLastFrame = true
            scoreboard.textContent = "score:"+score;
        }
    }

    if (aButton == false) {
        hitLastFrame = false
    }
    console.log(stickdir);
    requestAnimationFrame(loop)
}



setInterval(function timer() {
    if (time > 0) {
        time -= 1,
        timeBox.textContent = "time:" + time;
    }
}, 1000)

setInterval(function directionDecide() {
    if (time > 0) {
        directionNum = Math.floor(Math.random() * 4);
        direction = directions[directionNum]
        directionBox.textContent = directions[directionNum]
    }
}, 2000)
