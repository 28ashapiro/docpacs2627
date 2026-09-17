const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d');
let gameRunning = false
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};
window.addEventListener("keydown", (e) => updateKey (e, true));
window.addEventListener("keyup", (e) => updateKey (e, false));

function updateKey(e, isDown) {
    switch (e.key.toLowerCase()) {
      case 'w': keys.w = isDown; break;
      case 'a': keys.a = isDown; break;
      case 's': keys.s = isDown; break;
      case 'd': keys.d = isDown; break;
    }
}

class Wall {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
}
class Player extends Wall {
    constructor(x,y,w,h,speed,jumpStrength,grounded) {
        super(x,y,w,h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 10;
        grounded = false;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
}

function setup() {
    gameRunning = true
    player = new Player(0,0,30,30)
    player.draw()
    loop()
}

function loop() {
    if (gameRunning == true);
        ctx.clearRect(0, 0, 800, 600)
        if (keys.w) player.y -= player.speed
        if (keys.s) player.y += player.speed
        if (keys.a) player.x -= player.speed
        if (keys.d) player.x += player.speed
        if (player.x < 0) player.x = 0;
        if (player.y < 0) player.y = 0;
        if (player.x + player.w > 800) player.x = 770;
        if (player.y + player.h > 600) player.y = 570;
        player.draw()
        requestAnimationFrame(loop)
}

setup()