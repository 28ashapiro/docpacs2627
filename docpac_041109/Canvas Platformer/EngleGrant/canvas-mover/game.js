var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var playerSprite = document.getElementById("playerSprite")

var player = { // Defines the player object and sets its properties.
    xPos: canvas.width/2,
    yPos: canvas.height/2,

    yVelocity: 0,
    gravity: .25,
    jumpPower: 10,

    grounded: false,

    width: 50,
    height: 50,

    color: "blue",

    speed: 5
}

player.xPos -= player.width/2
player.yPos -= player.height/2

keysPressed = { // Stores every key that should be used in the scripts lifetime.
    "w": false,
    "a": false,
    "d": false,

    "arrowup": false,
    "arrowleft": false,
    "arrowright": false
}

document.addEventListener("DOMContentLoaded", function() { // Fires once DOM content is loaded and fires the initial pulse for drawLoop().
    drawLoop()
})

document.addEventListener("keydown", function (event) { // Fires every time a key is pressed.
    if (!event.repeat) {
        let char = event.key.toLowerCase()
        if (keysPressed[char] != null) {
            keysPressed[char] = true
            console.log(keysPressed)
        }
    }
})

document.addEventListener("keyup", function (event) { // Fires every time a key stops being pressed.
    let char = event.key.toLowerCase()
    if (keysPressed[char] != null) {
        keysPressed[char] = false
        console.log(keysPressed)
    }
})

function drawLoop() { // Continuously draws the player every frame.
    context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas before everything is drawn.

    updatePlayer()
    drawPlayer()

    requestAnimationFrame(drawLoop) // Reruns the function on the next frame.
}

function updatePlayer() { // Determines what should be done with the player every frame.
    if (keysPressed.w || keysPressed.arrowup) {
        movePlayer(directions.UP)
    }
    if (keysPressed.a || keysPressed.arrowleft) {
        movePlayer(directions.LEFT)
    }
    if (keysPressed.s || keysPressed.arrowdown) {
        movePlayer(directions.DOWN)
    }
    if (keysPressed.d || keysPressed.arrowright) {
        movePlayer(directions.RIGHT)
    }

    player.yVelocity += player.gravity

    if (!(player.yPos+player.height > canvas.height)){ // Ground Check & Gravity
        player.yPos += player.yVelocity
        player.grounded = false
    } else {
        player.yPos = canvas.height-player.height
        player.yVelocity = 0
        player.grounded = true
    }
    
    if (!(player.yPos-player.height < -player.height)){ // Ceiling Check & Gravity
        player.yPos += player.yVelocity
    } else {
        player.yPos = 0
        player.yVelocity = 0
    }
}

function drawPlayer() { // Draws the player on the canvas.
    context.fillStyle = player.color
    /* Old player drawing
    context.fillRect(
        player.xPos,
        player.yPos,

        player.width,
        player.height
    );
    */
    context.drawImage(
        playerSprite,
        player.xPos,
        player.yPos,
        player.width,
        player.height
    )
}

const directions = { // Makes it easier for the developer to determine directions to ID.
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}

function movePlayer(direction) { // Moves the player. Duh.
    if (direction == 1 && !(player.yPos < 0) && player.grounded) { // UP
        player.yVelocity = -player.jumpPower
    }
    
    if (direction == 3 && !(player.xPos < 0)) { // LEFT
        player.xPos -= player.speed
    }
    if (direction == 4 && !(player.xPos+player.width > canvas.width)) { // RIGHT
        player.xPos += player.speed
    }
}

function updateJumpPower() { // Fetches the jump power from the HTML input and sets that value to the players jump power.
    jumpPowerInput = document.getElementById("jumpPowerInput")
    player.jumpPower = Number(jumpPowerInput.value)

    console.log("Updated JumpPower to",player.jumpPower)
}

function updateSpeed() { // Fetches the jump power from the HTML input and sets that value to the players speed.
    speedInput = document.getElementById("speedInput")
    player.speed = Number(speedInput.value)

    console.log("Updated Speed to",player.speed)
}