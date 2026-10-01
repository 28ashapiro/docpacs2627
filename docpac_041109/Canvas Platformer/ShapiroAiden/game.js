let activeGamepadIndex = null;
let aPressed = [];
let player;
let walls = [];
let gameRunning = false;
let animationFrameId;
const gravity = 0.5;
const stickDrift = 0.2;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let controllerStatusBox = document.getElementById("controllerStatus");

// ctx.fillRect(100, 100, 100, 100);

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Player extends Wall {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpStrength = 12;
        this.grounded = false;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "black";
    }
}

window.addEventListener(
    "gamepadconnected", (e) => {
        let gpIndex = e.gamepad.index;
        activeGamepadIndex = gpIndex;
        console.log(`Controller Connected! Gamepad Index: ${gpIndex}`);
        controllerStatusBox.innerHTML = "Controller Connected!";
        controllerStatusBox.style.color = "green";
    }
);

window.addEventListener(
    "gamepaddisconnected", (e) => {
        activeGamepadIndex = null;
        console.log("Lost connection to Controller...");
        controllerStatusBox.innerHTML = "Controller Disconnected...";
        controllerStatusBox.style.color = "red";
    }
);

function checkCollision(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function setup() {
    player = new Player(100, 400, 50, 50);

    walls = [
        new Wall(0, 560, 700, 40),
        new Wall(300, 400, 30, 160),
        new Wall(100, 470, 150, 20),
        new Wall(500, 350, 150, 20)
    ];

    gameRunning = true;
    animationFrameId = requestAnimationFrame(loop);
}

function loop() {
    if (gameRunning == false) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gamepads = navigator.getGamepads();
    const gp = activeGamepadIndex !== null ? gamepads[activeGamepadIndex] : null;

    if (gp) {
        let horizontalInput = gp.axes[0];

        if (horizontalInput > -stickDrift && horizontalInput < stickDrift) {
            horizontalInput = 0;
        }

        player.vx = horizontalInput * player.speed;

        const aNow = gp.buttons[0].pressed;

        if (aNow && !aPressed[0] && player.grounded) {
            player.vy = -player.jumpStrength;
            player.grounded = false;
        }

        aPressed[0] = aNow;
    } else {
        player.vx = 0;
        aPressed[0] = false;
    }

    player.x += player.vx;

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    }

    if (player.y < 0) {
        player.y = 0;
        player.vy = 0;
    }

    for (let wall of walls) {
        if (checkCollision(player, wall)) {

            if (player.vx > 0) {
                player.x = wall.x - player.w;
            }

            if (player.vx < 0) {
                player.x = wall.x + wall.w;
            }

            player.vx = 0;
        }
    }

    player.vy += gravity;
    player.y += player.vy;
    player.grounded = false;

    for (let wall of walls) {
        if (checkCollision(player, wall)) {

            if (player.vy > 0) {
                player.y = wall.y - player.h;
                player.vy = 0;
                player.grounded = true;
            }

            else if (player.vy < 0) {
                player.y = wall.y + wall.h;
                player.vy = 0;
            }
        }
    }

    if (player.y > canvas.height) {
        end();
        return;
    }

    for (let wall of walls) {
        wall.draw();
    }
    player.draw();

    ctx.font = "14px Arial";
    ctx.fillText(`X: ${player.x.toFixed(1)}`, 10, 20);
    ctx.fillText(`Y: ${player.y.toFixed(1)}`, 10, 40);
    ctx.fillText(`VX: ${player.vx.toFixed(1)}`, 10, 60);
    ctx.fillText(`VY: ${player.vy.toFixed(1)}`, 10, 80);
    ctx.fillText(`Grounded: ${player.grounded}`, 10, 100);
    ctx.fillText(`Controller: ${gp ? "Connected" : "Disconnected"}`, 10, 120);

    animationFrameId = requestAnimationFrame(loop);
}


function end() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "32px Comic Sans MS";
    ctx.fillText("Game Over!", 320, 280);
    ctx.font = "18px Comic Sans MS";
    ctx.fillText("Refresh the page to restart.", 280, 320);
}

setup();