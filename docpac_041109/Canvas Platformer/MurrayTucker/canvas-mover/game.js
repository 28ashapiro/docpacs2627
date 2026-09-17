const canvasElement = document.getElementById("gameCanvas");
const canvas = canvasElement.getContext("2d");

const maxSpeed = 10;
const jumpForce = 30;
const gravity = 3;

const playerImage = new Image(50, 50);
playerImage.src = "beast.webp";

const player = {
    x: 800/2,
    y: 600/2,
    width: 50,
    height: 50,
    xSpeed: 0,
    ySpeed: 0,
    onFloor: false
}

const obstacles = [
    { x: 200, y: 500, width: 400, height: 30 },
    { x: 100, y: 0, width: 25, height: 600 },
    { x: 600, y: 100, width: 25, height: 600 },
    { x: 575, y: 200, width: 25, height: 30 },
    { x: 575, y: 100, width: 25, height: 30 },
    { x: 225, y: 400, width: 25, height: 30 },
    { x: 440, y: 330, width: 10, height: 30 }
    
]

addEventListener("keydown", (e) => {
    if (e.repeat) return;

    const key = e.key.toLowerCase();

    if (key.startsWith("arrow") || key === " ") {    
        e.preventDefault();
    }

    if (key === "a" || key === "arrowleft") {
        player.xSpeed += -maxSpeed;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed += maxSpeed;
    }

    if (key === " " && player.onFloor) {
        player.ySpeed = -jumpForce;
    }
});

addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    if (key.startsWith("arrow")) {    
        e.preventDefault();
    }

    if (key === "a" || key === "arrowleft") {
        player.xSpeed -= -maxSpeed;
    }
    else if (key === "d" || key === "arrowright") {
        player.xSpeed -= maxSpeed;
    }
});

function loop() {
    // Clear canvas
    canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Apply gravity
    player.ySpeed += gravity;
    // Apply speed
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    // Clamp position
    player.x = Math.min(Math.max(player.x, 0), canvasElement.width - player.width);
    player.y = Math.min(Math.max(player.y, 0), canvasElement.height - player.height);
    
    handleObstacleCollisions();

    drawPlayer(player);
    drawObstacles(obstacles);
    
    requestAnimationFrame(loop);
}
// Run game loop
loop();

// AABB overlap check, and then correct position using the smallest axis
function handleObstacleCollisions() {
    player.onFloor = (player.y + player.height >= canvasElement.height);

    for (const obstacle of obstacles) {
        if (checkAABBCollision(player, obstacle)) {
            // floor check
            if (player.y + player.height > obstacle.y) {
                player.onFloor = true;
            }
            // left, right
            const overlapPlayerLObstacleR = obstacle.width - (player.x - obstacle.x);
            const overlapPlayerRObstacleL = (obstacle.x - player.x) - player.width;
            // top, bottom
            const overlapPlayerTObstacleB = obstacle.height - (player.y - obstacle.y);
            const overlapPlayerBObstacleT = (obstacle.y - player.y) - player.height;

            const lowestLeftRight = overlapPlayerLObstacleR < Math.abs(overlapPlayerRObstacleL) ? overlapPlayerLObstacleR : overlapPlayerRObstacleL;
            const lowestTopBottom = overlapPlayerTObstacleB < Math.abs(overlapPlayerBObstacleT) ? overlapPlayerTObstacleB : overlapPlayerBObstacleT;

            if (Math.abs(lowestLeftRight) < Math.abs(lowestTopBottom)) {
                player.x += lowestLeftRight;
            }
            else {
                player.y += lowestTopBottom;
                player.ySpeed = 0;
            }
        }
    }
}

function checkAABBCollision(box1, box2) {
    return (
        box1.x < box2.x + box2.width  &&
        box1.x + box1.width > box2.x  &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y
    );
}

function drawPlayer(playerObject) {
    canvas.drawImage(
        playerImage,
        playerObject.x,
        playerObject.y,
        playerObject.width,
        playerObject.height
    );
}

function drawObstacles(obstacleArray) {
    for (const obstacle of obstacleArray) {
        canvas.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        )
    }
}
