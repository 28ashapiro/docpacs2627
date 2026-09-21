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
class player extends wall{
    constructor(x,y,w,h){super(x,y,w,h)    
    this.vx=0;this.vy=0;this.speed=5;this.jumpStrength=10;this.grounded=false}
    draw(){ctx.fillRect('yellow')}
}
gameRunning=true
let backWall = new wall(25,25,600,300);
function setup() {
    backWall.draw();
}
function loop() {
}
function end() {
}