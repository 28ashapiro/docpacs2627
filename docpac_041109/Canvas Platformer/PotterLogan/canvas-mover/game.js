

const CANVAS = document.getElementById("gameCanvas")
const CONTEXT = CANVAS.getContext("2d");

const PLAYER = { xPos: 60, yPos: 80, width: 11, height: 10, speed: 5 }
xMovement = 0
yMovement = 0

loop()
document.addEventListener("keydown", function (event){

    if(event.key.toLowerCase() == "w"){
        yMovement = PLAYER.speed
    }
    if(event.key.toLowerCase() == "a"){
        xMovement = -PLAYER.speed
    }
    if(event.key.toLowerCase() == "s"){
        yMovement = -PLAYER.speed
    }
    if(event.key.toLowerCase() == "d"){
        xMovement = PLAYER.speed
    }

})

document.addEventListener("keyup", function (event){

    if(event.key.toLowerCase() == "w"){
        yMovement = 0
    }
    if(event.key.toLowerCase() == "a"){
        xMovement = 0
    }
    if(event.key.toLowerCase() == "s"){
        yMovement = 0
    }
    if(event.key.toLowerCase() == "d"){
        xMovement = 0
    }

})



drawPlayer()

function drawPlayer(){

    CONTEXT.fillStyle = "lime"
    CONTEXT.fillRect(PLAYER.xPos, PLAYER.yPos, PLAYER.width, PLAYER.height)

}


function loop(){
    CONTEXT.clearRect(0,0,CANVAS.width,CANVAS.height)
    drawPlayer()

    // This is a really cursed way to do this but it somehow works don't touch it
    if(PLAYER.xPos > 10){
        PLAYER.xPos = Math.min(PLAYER.xPos += xMovement, CANVAS.width - PLAYER.width)
    } else {
        PLAYER.xPos = Math.max(PLAYER.xPos += xMovement, 0)
    }
    
    if(PLAYER.yPos > 10){
        PLAYER.yPos = Math.min(PLAYER.yPos -= yMovement, CANVAS.height - PLAYER.height)
    } else {
        PLAYER.yPos = Math.max(PLAYER.yPos -= yMovement, 0)
    }
    
    
    //PLAYER.yPos -= yMovement


    console.log(PLAYER.xPos + " " + CANVAS.height)
    requestAnimationFrame(loop)
}