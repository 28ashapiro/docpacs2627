const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const controllerStatus = document.getElementById("controllerStatus");
const GRAVITY = 0.5;
const playerXDisplay = document.getElementById('playerX');
const playerYDisplay = document.getElementById('playerY');
const playerVXDisplay = document.getElementById('playerVX');
const playerVYDisplay = document.getElementById('playerVY');
const groundedDisplay = document.getElementById('grounded');
const controllerDisplay = document.getElementById('controller');


function applyDeadzone(value, threshold = 0.2) {
    const magnitude = Math.abs(value);
    if (magnitude < threshold) {
        return 0;
    }
    return value;
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(context) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}
let topWall = new Wall(0, 0, 800, 20);
let bottomWall = new Wall(0, 580, 800, 20);
let leftWall = new Wall(0, 0, 20, 600);
let rightWall = new Wall(780, 0, 20, 600);

topWall.draw(ctx);
bottomWall.draw(ctx);
leftWall.draw(ctx);
rightWall.draw(ctx);

class Player extends Wall {
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.vx = 0;
        this.vy = 0;
        this.speed = 5
        this.jumpStrength = 10;
        this.grounded = false;
    }
    draw(context) {
        context.fillStyle = "purple";
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}

let player = null;
let walls = [
    new Wall(0, 580, 800, 20),
    new Wall(0, 0, 20, 600),
    new Wall(20, 510, 150, 20),
    new Wall(300, 500, 150, 20)
];
let gameRunning = false;
let animationFrameId = null;
let activeGamepadIndex = null;
let aButtonCurrent = false;
let aButtonPrevious = false;

window.addEventListener("gamepadconnected", (event) => {
    activeGamepadIndex = event.gamepad.index;
    controllerStatus.textContent = "Controller Connected!!!";
    controllerDisplay.textContent = 'Connected';
});

window.addEventListener("gamepaddisconnected", (event) => {
    activeGamepadIndex = null;
    controllerStatus.textContent = "Controller Disconnected!!!";
    controllerDisplay.textContent = 'Not connected';
});

function setup() {
    player = new Player(30, 510, 30, 40);

    walls = [
        new Wall(0, 580, 150, 20), //Floor
        new Wall(0, 0, 800, 20), //Roof
        new Wall(780, 0, 50, 600), //Right Wall
        new Wall(0, 0, 20, 600), //Left Wall
        new Wall(150, 510, 120, 20), //Platform 1
        new Wall(420, 550, 50, 20), //Platform 2
        new Wall(320, 370, 60, 20), //Platform 3
        new Wall(620, 470, 60, 20), //Platform 4
        new Wall(700, 400, 35, 10), //Platform 5
        new Wall(530, 380, 50, 10) //Platform 6
    ];

    gameRunning = true;
    loop();
}


function end() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", 400, 300);
}

function collisionDetect(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}

function loop() {
    if (!gameRunning) return;

    if (activeGamepadIndex !== null) {
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[activeGamepadIndex];
        let horizontalInput = gamepad.axes[0];
        aButtonCurrent = gamepad.buttons[0].pressed;
        horizontalInput = applyDeadzone(horizontalInput);
        console.log(horizontalInput);
        player.vx = horizontalInput * player.speed;
    }

    player.x += player.vx;

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.w > 800) {
        player.x = 800 - player.w;
    }

    if (player.y > 600) {
        end();
        return;
    }

    for (let i = 0; i < walls.length; i++) {
        if (collisionDetect(player, walls[i])) {


            if (player.vx > 0) {
                player.x = walls[i].x - player.w
                player.vx = 0
            }

            if (player.vx < 0) {
                player.x = walls[i].x + walls[i].w
                player.vx = 0
            }
        }
    }

    player.vy += GRAVITY;
    player.y += player.vy;
    player.grounded = false

    for (let i = 0; i < walls.length; i++) {
        if (collisionDetect(player, walls[i])) {
            if (player.vy > 0 && player.y + player.h - player.vy <= walls[i].y) {
                player.y = walls[i].y - player.h
                player.vy = 0
                player.grounded = true
            }

            if (player.vy < 0 && player.y - player.vy >= walls[i].y + walls[i].h) {
                player.y = walls[i].y + walls[i].h
                player.vy = 0
                player.grounded = false
            }
        }
    }

    playerXDisplay.textContent = player.x.toFixed(2);
    playerYDisplay.textContent = player.y.toFixed(2);
    playerVXDisplay.textContent = player.vx.toFixed(2);
    playerVYDisplay.textContent = player.vy.toFixed(2);
    groundedDisplay.textContent = player.grounded;


    ctx.clearRect(0, 0, 800, 600);

    for (let i = 0; i < walls.length; i++) {
        walls[i].draw(ctx);
    }

    player.draw(ctx);

    if (aButtonCurrent && !aButtonPrevious && player.grounded) {
        player.vy = -10;
        player.grounded = false;
    }

    aButtonPrevious = aButtonCurrent;

    animationFrameId = requestAnimationFrame(loop);
}

function end() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", 400, 300);
}

setup();