window.addEventListener("gamepadconnected", (e) => {
    console.log("gamepad is connected");
    controllers = navigator.getGamepads();
    if (controllers[0] && !controllers[1]){
        document.getElementById("gamepadBox").textContent = "Press Start"
        input();
    }
});
window.addEventListener("gamepaddisconnected", (e) => {
        console.log("gamepad is disconnected");
        control = 0;
        button = 0;
        controllers = navigator.getGamepads();
        if (controllers[0]){ 
        } else {
            active = false;
            document.getElementById("gamepadBox").textContent = "Please connect a controller"
        }
});

let controllers = [];
let score = 0;
let timer = 20;
let direction = 0;
let heldDirect = 0;
let aPressed = false;
let startPressed = false;
let directPressed = 0;
let active = false;
const getScore = document.getElementById("scoreBox");
const getTime = document.getElementById("timeBox");
const getDirection = document.getElementById("directionBox");
const getGamepad = document.getElementById("gamepadBox");
const point = ["./arrows/up.png", "./arrows/down.png", "./arrows/right.png", "./arrows/left.png"];

function updateTime(){
    if (timer > 0 && active){
        timer-= 1;
        document.getElementById("timeBox").textContent = "Time: " + timer;
    }
    if (timer == 0){
        active = false;
        document.getElementById("gamepadBox").textContent = "GAME OVER, Press Start To Play Again"
    }
}

function randomDirection(){
    if (active){
        direction = Math.random() * 4;
        direction = Math.floor(direction);
        if (direction == 4){
            direction = 0;
        }
        document.getElementById("arrowBox").src = point[direction];
    }
}

function input(){
    controllers = navigator.getGamepads();
    if (controllers[0]){ 
        if (controllers[0].axes[1] < -.50 && controllers[0].axes[0] < .25 && controllers[0].axes[0] > -.25){
            heldDirect = 0;
        } else if (controllers[0].axes[1] > .50 && controllers[0].axes[0] < .25 && controllers[0].axes[0] > -.25){
            heldDirect = 1;
        } else if (controllers[0].axes[0] > .50 && controllers[0].axes[1] < .25 && controllers[0].axes[1] > -.25){
            heldDirect = 2;
        } else if (controllers[0].axes[0] < -.50 && controllers[0].axes[1] < .25 && controllers[0].axes[1] > -.25){
            heldDirect = 3;
        } 
        if (controllers[0].buttons[0].pressed){
            if (aPressed){
            } else if (aPressed == false){
                aPressed = true;
                if (active){
                    if (heldDirect == direction){
                        score+=1;
                        document.getElementById("scoreBox").textContent = "Score: " + score;
                    }
                }
            }
        } else {
            aPressed = false;
        }
        if (controllers[0].buttons[9].pressed){
            if (active){
            } else {
                active = true;
                document.getElementById("gamepadBox").textContent = "Hold The Direction And Mash A"
                if (timer == 0){
                    score = 0;
                    timer = 20;
                    document.getElementById("scoreBox").textContent = "Score: " + score;
                    document.getElementById("timeBox").textContent = "Time: " + timer;
                }
            }
        }
    }
    requestAnimationFrame(input);
}

let countdown = setInterval(updateTime, 1000);
let direct = setInterval(randomDirection, 2000);