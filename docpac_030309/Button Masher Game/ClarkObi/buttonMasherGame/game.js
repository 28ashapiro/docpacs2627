let score = 0
let time = 20
let directions = ["Up","Right","Down","Left"]
let gamepadIndex = null
let lastFrame={pressed:false}
let lastStartButton={pressed:false}
let lastrestartButton={pressed:false}
let gameRunning=false 
const scorebox = document.getElementById("scoreBox")
const timerBox = document.getElementById("timerBox")
const directionBox = document.getElementById("directionBox")
const contollerStatus = document.getElementById("contollerStatus")
setInterval((interval) => {
    if(gameRunning===true){
        if (time > 0) {
            console.log("running")
            time = time - 1
            timerBox.textContent="Time:"+ time
        };
        if (time === 0) {timerBox.textContent ="GAMEOVER"}
    }
}, 1000);
setInterval((interval) => {
    if(gameRunning===true){
        if (time > 0){
            let number = Math.floor(Math.random()*4)
            let currentDirection=number
            directionBox.textContent = directions[number]
        } if (time === 0) {directionBox.textContent =null}
    }
}, 2000);
window.addEventListener('gamepadconnected', (event) => {
    gamepadIndex = event.gamepad.index
    contollerStatus.textContent = "Controler Connected"
});
window.addEventListener('gamepaddisconnected', (event) => {
    gamepadIndex = null
    contollerStatus.textContent = "You need a controler for this game."
});
function loop(){
    let gamepads = navigator.getGamepads()
    if (gamepadIndex !== null){
            let gamepad = gamepads[gamepadIndex]
            let startButton=gamepad.buttons[9]
            let currentx=gamepad.axes[0]
            let currenty=gamepad.axes[1]
            if(lastStartButton.pressed===false){
                if(startButton.pressed===true){
                    if(gameRunning === false){
                        gameRunning = true
                    }else{
                        location.reload()
                    }
                }
            }
            lastStartButton=gamepad.buttons[9]
            if(gameRunning===true){ 
                if(time > 0) {
                    if(gamepad) {
                        let currentFrame=gamepad.buttons[0]
                        console.log('Horizontal:',gamepad.axes[0],'Vertical:',gamepad.axes[1])
                        if (currentDirection === 0){gamepad.axes[1] < -0.5}
                        if (currentDirection === 1){gamepad.axes[0] < 0.5}
                        if (currentDirection === 2){gamepad.axes[1] < 0.5}
                        if (currentDirection === 3){gamepad.axes[0] < -0.5}
                        //console.log("button object:", gamepad.buttons[0])
                        if (lastFrame.pressed===false){
                            if (currentFrame.pressed===true){
                                score=score+1
                                scorebox.textContent="Score:"+ score
                            }
                        }
                        lastFrame=gamepad.buttons[0]
                    }
                }
            }
    }
    requestAnimationFrame(loop)
}
loop()