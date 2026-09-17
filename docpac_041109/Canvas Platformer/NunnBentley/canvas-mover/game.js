const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600


const player = {
    "x": 400,
    "y": 300,
    "width": 16,
    "height": 16,
    "speed": 7,
    "color": "green"
    }

const keysPressed = new Set()

window.addEventListener('keydown', (event) => {
    keysPressed.add(event.key)
})

window.addEventListener('keyup', (event) => {
    keysPressed.delete(event.key)
})

function update() {
    if (keysPressed.has('a')) player.x -= player.speed
    if (keysPressed.has('d')) player.x += player.speed
    if (keysPressed.has('w')) player.y -= player.speed
    if (keysPressed.has('s')) player.y += player.speed

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x))
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y))
}



function drawplayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = player.color
    ctx.fillRect(player.x, player.y, player.width, player.height)
}

function gameLoop() {
    update()
    drawplayer()
    requestAnimationFrame(gameLoop)
}

gameLoop()


