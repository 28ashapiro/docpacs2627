window.addEventListener("gamepadconnected", (e) => {
    console.log("gamepad is connected");
    controllers = navigator.getGamepads();
    if (controllers[0] && !controllers[1]){
        document.getElementById("controlBox").textContent = "Get The Trophy"
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
            document.getElementById("controlBox").textContent = "Please connect a controller"
        }
});
//Drawing Functions
/*function renderText(){
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 10, 50);
}*/

let controllers = [];
let aPressed = false;
let heldDirect = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black"
ctx.lineWidth = "3"

class Object {
    constructor(type, posX, posY, opt1, opt2, opt3, opt4, opt5, opt6){
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.touch = false;
        if (type == "Key"){
            rectObjects.push(new Rectangle(opt1, opt2, opt3, opt4, opt5, opt6, "red"))
        }
    }
    touched(){
        this.touch = true;
        if (this.type == "Goal"){
            lvl++;
            level();
        } else if (this.type == "Key"){
            rectObjects.pop();
        }
    }
}

class Rectangle {
    constructor(posX, posY, coliX, coliY, width, height, color){
        /*Upper Left*/this.posX = posX;
        /*Upper Left*/this.posY = posY;
        this.coliX = coliX;
        this.coliY = coliY;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

//Move Through Levels
function level(){
    if (lvl == 1){
        document.getElementById("controlBox").textContent = "Level One: Trophy Hunt"
        rectObjects = levelOneRects;
        player = [[48, 48], 200, 200, false, 0, 0, false]
        goal = new Object("Goal", 1700, 775)
    }else if (lvl == 2){
        document.getElementById("controlBox").textContent = "Level Two: Jumper"
        rectObjects = levelTwoRects;
        player = [[48, 48], 200, 200, false, 0, 0, false]
        goal = new Object("Goal", 200, 100)
    } else if (lvl == 3){
        document.getElementById("controlBox").textContent = "Level Three: Back And Forth"
        rectObjects = levelThreeRects;
        player = [[48, 48], 200, 200, false, 0, 0, false]
        goal = new Object("Goal", 1650, 250)
    } else if (lvl == 4){
        document.getElementById("controlBox").textContent = "Level Four: Tight Security"
        rectObjects = levelFourRects;
        player = [[48, 48], 200, 200, false, 0, 0, false]
        key = new Object("Key", 1700, 400, 400, 0, 500, 300, 100, 300)
        goal = new Object("Goal", 200, 100)
    }else if (lvl == 5){
        document.getElementById("controlBox").textContent = "You Win!!!!"
    }
}

let rectObjects = [];
//Level Defines
let levelOneRects = [new Rectangle(0, 825, 1800, 875, 1800, 50, "lime")];
let levelTwoRects = [new Rectangle(0, 825, 1800, 875, 1800, 50, "lime"), new Rectangle(600, 700, 700, 750, 100, 50, "violet"), 
    new Rectangle(900, 600, 1000, 650, 100, 50, "violet"), new Rectangle(1200, 500, 1300, 550, 100, 50, "violet"),
    new Rectangle(900, 350, 1000, 400, 100, 50, "violet"), new Rectangle(600, 250, 700, 300, 100, 50, "violet"),
    new Rectangle(200, 150, 300, 200, 100, 50, "violet")];
let levelThreeRects = [new Rectangle(0, 825, 1800, 875, 1800, 50, "lime"), new Rectangle(400, 600, 500, 650, 100, 50, "violet"), 
    new Rectangle(700, 700, 800, 750, 100, 50, "violet"), new Rectangle(200, 500, 300, 550, 100, 50, "violet"),
    new Rectangle(400, 400, 500, 450, 100, 50, "violet"), new Rectangle(700, 300, 800, 350, 100, 50, "violet"),
    new Rectangle(1000, 300, 1100, 350, 100, 50, "violet"), new Rectangle(1300, 300, 1400, 350, 100, 50, "violet"),
    new Rectangle(1600, 300, 1700, 350, 100, 50, "violet")];
let levelFourRects = [new Rectangle(0, 825, 1800, 875, 1800, 50, "lime"), new Rectangle(600, 600, 700, 650, 100, 50, "violet"), 
    new Rectangle(900, 700, 1000, 750, 100, 50, "violet"), new Rectangle(900, 500, 1000, 550, 100, 50, "violet"), 
    new Rectangle(1100, 400, 1200, 450, 100, 50, "violet"), new Rectangle(400, 300, 500, 350, 100, 50, "violet"),
    new Rectangle(800, 300, 1000, 350, 200, 50, "violet"), new Rectangle(200, 150, 300, 200, 100, 50, "violet"), 
    new Rectangle(1300, 150, 1400, 200, 100, 50, "violet"), new Rectangle(1600, 450, 1800, 500, 200, 50, "violet")];
let actRect = 0
let lvl = 1;
let player = [[/*Width*/48, /*Height*/48], /*Xpos*/ 200, /*Ypos*/ 200, /*Grounded*/false, /*X Momentum*/0, /*Y Momentum*/0, /*Touching Platform*/false]
let flight = false;
let key = 0;
let goal = 0;
let init = 0;

const playerImg = new Image(); playerImg.src = "img/guy.png";
const goalImg = new Image(); goalImg.src = "img/trophy.png";
const keyImg = new Image(); keyImg.src = "img/key.png";
const orbImg = new Image(); orbImg.src = "img/orb.png";

function input(){
    if (init == 0){
        level()
        init = 1
    }
    ctx.clearRect(0, 0, 1790, 850);
    controllers = navigator.getGamepads();
    if (controllers[0]){
        //Reset A Variable
            player[6] = false;
        
            //Takes Joystick Input, Converts Into Momentum
        if (controllers[0].axes[1] < -.50 && flight){
            if (controllers[0].axes[0] < .25 && controllers[0].axes[0] > -.25){
                heldDirect = 0; //Up
                player[5] = -10;
            } else if (controllers[0].axes[0] > .25){
                heldDirect = 0; //Up
                player[4] = 5;
                player[5] = -5;
            } else if (controllers[0].axes[0] < -.25){
                heldDirect = 0; //Up
                player[4] = -5;
                player[5] = -5;
                
            }
        } else if (controllers[0].axes[1] > .50 && flight){
            if (controllers[0].axes[0] < .25 && controllers[0].axes[0] > -.25){
                heldDirect = 1; //Down
                player[5] = 10;
            } else if (controllers[0].axes[0] > .25){
                heldDirect = 1; //Down
                player[4] = 5;
                player[5] = 5;
            } else if (controllers[0].axes[0] < -.25){
                heldDirect = 1; //Down
                player[4] = -5;
                player[5] = 5;
            }
        } else if (controllers[0].axes[0] > .50 && controllers[0].axes[1] < .50 && controllers[0].axes[1] > -.25 && flight){
            heldDirect = 2; //Right
            player[4] = 10;
        } else if (controllers[0].axes[0] < -.50 && controllers[0].axes[1] < .50 && controllers[0].axes[1] > -.25 && flight){
            heldDirect = 3; //Left
            player[4] = -10;
        } else if (controllers[0].axes[0] > .50){
            heldDirect = 2; //Right
            player[4] = 10;
        } else if (controllers[0].axes[0] < -.50){
            heldDirect = 3; //Left
            player[4] = -10;
        }

        //Jump Code
        if (controllers[0].buttons[0].pressed){
            if (aPressed){
            } else if (aPressed == false){
                aPressed = true;
                if (player[3] == true){
                    player[5] -=20
                    player[3] = false;
                }
            }
        } else {
            aPressed = false;
        }

        //Move
        player[2] += player[5];
        player[1] += player[4];

        //Stay On Screen
        if (player[2] < 0){
                    player[2] = 0;
        }
        if (player[2] > canvas.height- player[0][1]){
                player[2] = canvas.height - player[0][1];
                player[3] = true;
                player[6] = true;
        }
        if (player[1] < 0){
            player[1] = 0;
        }
        if (player[1] > canvas.width- player[0][1]){
            player[1] = canvas.width - player[0][1];
        }

        //Momentum Change
        if (player[4] < 0){
            player[4] += 1;
        } else if (player[4] > 0) {
            player[4] -= 1;
        }
        if (player[3]){
            player[5] = 0;
        } else {
            player[5] += 1;
            if (player[5] > 10){
                player[5] = 10
            }
        }

        //Collision Code/Draw Rectangles
        for (obj = 0; obj < rectObjects.length; obj++){
            actRect = rectObjects[obj];
            ctx.fillStyle = actRect.color;
            ctx.fillRect(actRect.posX,actRect.posY, actRect.width, actRect.height);
            ctx.strokeRect(actRect.posX,actRect.posY, actRect.width, actRect.height);
            if (player[1] > actRect.posX - player[0][0] && player[1] < actRect.coliX){
                if (player[2] < actRect.posY){
                    if(player[2] >= actRect.posY - 50 && player[2] <= actRect.posY - 40){
                        player[3] = true;
                        player[6] = true;
                        player[5] = 0;
                    }
                } else if (player[2] > actRect.posY){
                    if (player[2] < actRect.coliY){
                        if (player[5] > 0){
                            player[5] = -5;
                        }
                        if (player[5] < 0){
                            player[5] = 5;
                        }
                        if (player[4] > 0){
                            player[1] -= 10;
                        }
                        if (player[4] < 0){
                            player[1] += 10;
                        }
                        player[4] = 0
                    }
                }
            }
        }

        //Reapply Gravity if Not Touching A Platform
        if (player[6] == false){
            player[3] = false;
        } else {
            player[3] = true;
        }

    

        //Touch Objects
        if (player[1] > key.posX - 20 && player[1] <key.posX + 20 && player[2] > key.posY - 20 && player[2] <key.posY + 20 && key.touch == false){
            key.touched();
        }
        if (player[1] > goal.posX - 20 && player[1] <goal.posX + 20 && player[2] > goal.posY - 20 && player[2] <goal.posY + 20 && goal.touch == false){
            goal.touched();
        }
    }

    //Render Objects And Player Character
    if (key.touch == false){
        ctx.drawImage(keyImg, key.posX, key.posY, 48, 48)
    }
    if (goal.touch == false){
        ctx.drawImage(goalImg, goal.posX, goal.posY, 48, 48)
    }
    ctx.drawImage(playerImg, player[1], player[2], player[0][1], player[0][1],);
    requestAnimationFrame(input);
}