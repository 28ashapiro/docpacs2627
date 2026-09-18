const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;


const player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    speed: 5
};
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (leftPressed == true) {
        player.x -= player.speed
    }
    if (rightPressed == true) {
        player.x += player.speed
    }
    if (upPressed == true) {
        player.y -= player.speed
    }
    if (downPressed == true) {
        player.y += player.speed
    }
    if (player.x < 0) {
        player.x = 0
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height
    }

    drawPlayer();
    requestAnimationFrame(loop)
}
window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }
    if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
    if (event.key === 'ArrowUp') {
        upPressed = true;
    }
    if (event.key === 'ArrowDown') {
        downPressed = true;
    }

});
window.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
    if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
    if (event.key === 'ArrowUp') {
        upPressed = false;
    }
    if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});
loop();
