const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const img = document.getElementById('bent')

class platform {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    playerCollide() {


        if (player['x'] < this.x + this.w && player['x'] + player['width'] > this.x) {
            if (player['y'] + player['height'] >= this.y) {
                if (player['dy'] > 0) {
                    player['y'] = this.y - player['height']
                    if (player['dy'] > 0) {
                        player['dy'] = 0
                        player['grounded'] = true
                    }
                }

                else if (player['y'] + player['height'] + this.h * (1 / 16)) {
                    if (player['x'] < this.x + this.w / 2) {
                        player['x'] = this.x - player['width']
                    }
                    else {
                        player['x'] = this.x + this.w
                    }
                }
            }
        }
    }
}

let platforms = [
    new platform(500, canvas.height - 100, 100, 100),
    new platform(200, canvas.height - 100, 100, 100)
]

let player = {
    'x': 400,
    'y': canvas.height,
    'width': 40,
    'height': 40,
    'moveSpeed': 5,
    'dy': 0,
    'grounded': true
}
let gravity = 1.5


function drawPlayer() {
    /*ctx.fillStyle = 'red'
    ctx.fillRect(player['x'], player['y'], player['width'], player['height'])
    */
    ctx.drawImage(img, player['x'], player['y'])

}


let heldUp = false
let heldLeft = false
let heldDown = false
let heldRight = false

window.onkeydown = function (event) {
    if (event.key == 'ArrowLeft') {
        heldLeft = true
    }
    else if (event.key == 'ArrowRight') {
        heldRight = true
    }
    else if (event.key == ' ' && player['grounded']) {
        player['dy'] -= 25
        player['grounded'] = false
    }
}

window.onkeyup = function (event) {
    if (event.key == 'ArrowLeft') {
        heldLeft = false
    }
    else if (event.key == 'ArrowRight') {
        heldRight = false
    }
}



function loop() {
    player['dy'] += gravity
    if (player['dy'] > 7) {
        player['dy'] = 7
    }

    if (heldLeft) {
        player['x'] -= player['moveSpeed']
    }
    else if (heldRight) {
        player['x'] += player['moveSpeed']
    }

    if (player['x'] < 0) {
        player['x'] = 0
    }
    else if (player['x'] + player['width'] > canvas.width) {
        player['x'] = canvas.width - player['width']
    }
    if (player['y'] < 0) {
        player['y'] = 0
    }
    else if (player['y'] + player['height'] >= canvas.height) {
        player['y'] = canvas.height - player['height']
        if (player['dy'] > 0) {
            player['dy'] = 0
            player['grounded'] = true
        }
    }


    player['y'] += player['dy']




    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer()
    ctx.fillStyle = 'brown'
    for (plat in platforms) {
        platforms[plat].playerCollide()
        ctx.fillRect(platforms[plat].x, platforms[plat].y, platforms[plat].w, platforms[plat].h)
    }
    requestAnimationFrame(loop)
}
loop()