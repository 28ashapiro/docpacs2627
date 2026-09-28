let score = 0
let time = 20
let directions = ["up","right","down","left"]
let gamepadIndex = null
const scorebox = document.getElementById("scoreBox")
const timerBox = document.getElementById("timerBox")
const directionBox = document.getElementById("directionBox")
const contollerStatus = document.getElementById("contollerStatus")
setInterval((interval) => {
    if (time > 0) {
        console.log("running")
        time = time - 1
        timerBox.textContent="Time:"+ time
    };
    if (time === 0) {timerBox.textContent ="GAMEOVER"}
}, 1000);
setInterval((interval) => {
    if (time > 0){
        let number = Math.floor(Math.random()*4)
        directionBox.textContent = directions[number]
    } if (time === 0) {directionBox.textContent =null}
}, 2000);
window.addEventListener('gamepadconnected', (event) => {
    gamepadIndex = event.gamepad.index
    contollerStatus.textContent = "Controler Connected"
});
window.addEventListener('gamepaddisconnected', (event) => {
    gamepadIndex = null
    contollerStatus.textContent = "You need a controler for this game."
});