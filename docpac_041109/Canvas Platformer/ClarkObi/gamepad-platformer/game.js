let canvas = document.getElementById("gameCanvas")
let ctx = canvas.getContext("2d")

const keys = {w:false,a:false,s:false,d:false,}
window.addEventListener('keydown',(e) => updateKey (e,true))
window.addEventListener('keyup',(e) => updateKey (e,false))

function updateKey(e,isDown){
    switch(e.key.toLowerCase()){
        case 'w':keys.w = isDown; break;
        case 'a':keys.a = isDown; break;
        case 's':keys.s = isDown; break;
        case 'd':keys.d = isDown; break;
    }
}

class wall {
    constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;}
    draw(){ctx.fillStyle='yellow'
        ctx.fillRect(
        this.x,
        this.y,
        this.w,
        this.h
    )}
}
class players extends wall{
    constructor(x,y,w,h,speed,jumpStrength,grounded){super(x,y,w,h)    
    this.vx=0;this.vy=0;this.speed=5;this.jumpStrength=10;this.grounded=false}
    draw(){ctx.fillRect(this.x,this.y,this.w,this.h)}
}
gameRunning=false
let walls = []
let player = new players(30,30,20,20,)
let frameId 
function setup() {
    player.draw();
    gameRunning=true
    loop()
}
function loop(){
    if(gameRunning===true) {
        ctx.clearRect(0,0,800,600);
        if (keys.w) player.y -= player.speed
        if (keys.s) player.y += player.speed
        if (keys.a) player.x -= player.speed
        if (keys.d) player.x += player.speed
        if (player.x < 0) player.x = 0;
        if (player.y < 0) player.y = 0;
        if (player.x + player.w> 800) player.x = 780;
        if (player.y + player.h> 600) player.y = 580;
        frameId = requestAnimationFrame(loop);
        player.draw();   
    }
}
function end() {
    gameRunning=false
    cancelAnimationFrame(frameId)
    ctx.fillText("Gameover")
}
setup()