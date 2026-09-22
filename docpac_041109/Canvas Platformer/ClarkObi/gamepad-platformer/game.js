let canvas = document.getElementById("gameCanvas")
let ctx = canvas.getContext("2d")

class wall {
    constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;}
    draw(){ctx.fillRect(
        this.x,
        this.y,
        this.w,
        this.h
    )}
}
class players extends wall{
    constructor(x,y,w,h){super(x,y,w,h)    
    this.vx=0;this.vy=0;this.speed=5;this.jumpStrength=10;this.grounded=false}
    draw(){ctx.fillRect('yellow')}
}
gameRunning=false
let walls = []
function setup() {
    let player = new players(30,30,10,10)
    gameRunning=true
}
function loop(){
    if(gameRunning===true) {
        ctx.clearRect(0,0,800,600);
        player.draw();
        let frameId = requestAnimationFrame(loop);
    }
}
function end() {
    gameRunning=false
    cancelAnimationFrame(frameId)
    ctx.fillText("Gameover")
}