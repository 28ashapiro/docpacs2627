const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

// ctx.fillRect(400, 300, 20, 20);

let player = {
    x: 390,
    y: 290,
    width: 20,
    height: 20,
    speed: 5,
    vy: 0,
    vx: 0
    //spawns the player in the center of the screen, accounting for the size of the player and the dimensions of the canvas
}

let isGrounded;
let leftPressed = false;
let rightPressed = false;

const gravity = 0.15;

function drawPlayer() {
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function checkBorders() {
    if (player.y >= canvas.height - player.height) { //downcheck
        player.y = 580;
        player.vy = 0;
    }
    if (player.y <= 0) {//upcheck
        player.y = 0;
        player.vy = 0;
    }
    if (player.x <= 0) {//leftcheck
        player.x = 0;
        player.vx = 0;
    }
    if (player.x >= canvas.width - player.width) {//right check
        player.x = 780;
    }
}

function checkDirection() {
    if (leftPressed == true && rightPressed == false) {
        player.vx = -5;
    } else if (leftPressed == false && rightPressed == true) {
        player.vx = 5;
    } else {
        player.vx = 0;
    }
}

function loop() {
    player.vy += gravity;
    player.y += player.vy;
    player.x += player.vx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (player.y <= canvas.height - player.height) {//when it's less than or equal 580
        isGrounded = false;
    } else if (player.y > canvas.height - player.height) {
        isGrounded = true;
    }
    checkDirection();
    checkBorders();
    drawPlayer();
    requestAnimationFrame(loop);
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'a':
            leftPressed = true;
            break;
        case 's':
            player.y += player.speed; //move down
            break;
        case 'w':
            if (isGrounded == true) {
                player.vy -= player.speed; //move up
            }
            break;
        case ' ':
            if (isGrounded == true) {
                player.vy -= player.speed; //move up
            }
            break;
        case 'd':
            rightPressed = true;
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'a':
            leftPressed = false;
            break;
        case 'd':
            rightPressed = false;
            break;
    }
})

window.onload = loop;