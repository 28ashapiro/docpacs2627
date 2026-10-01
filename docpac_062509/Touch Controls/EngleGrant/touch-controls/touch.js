const touchArea = document.getElementById("touchArea");
const movableObject = document.getElementById("movableObject");
const statusDisplay = document.getElementById("statusDisplay");

const MIN_SWIPE_DIST = 10;
const MAX_TAP_MOVEMENT = 5;
const MOVABLE_WIDTH = 100;
const MOVABLE_HEIGHT = 100;

const AREA_WIDTH = touchArea.clientWidth
const AREA_HEIGHT = touchArea.clientHeight
console.log(AREA_WIDTH,AREA_HEIGHT)

touchActive = false;

startX = 0;
startY = 0;

endX = 0;
endY = 0;

dominantDirection = "";

currentX = 0;
currentY = 0;

deltaX = 0;
deltaY = 0;
dragDistance = 0;

swipeForce = 50;

updateStatusDisplay();
touchArea.addEventListener("touchstart", (event) => {
    console.log("started touch")
    touchActive = true;

    startX = getTouchedPosition(event).x
    startY = getTouchedPosition(event).y

    console.log(startX,startY)

    setCurrentPos(event)
})

touchArea.addEventListener("touchmove", (event) => {
    if (touchActive) {
        setCurrentPos(event)
        updateStatusDisplay()
    }
});

touchArea.addEventListener("touchend", (event) => {
    currentX = getTouchedPosition(event).x;
    currentY = getTouchedPosition(event).y;
    
    endX = currentX;
    endY = currentY;

    dragDistance = Math.hypot(deltaX,deltaY)

    if (dragDistance > MAX_TAP_MOVEMENT) {
        swipe(event)
    } else {
        tap(event)
    }
    
    updateStatusDisplay();
})

touchArea.addEventListener("touchcancel", (event) => {
    touchActive = false;
    updateStatusDisplay("Touch Cancelled");
})

function swipe(event) {
    console.log(`Swiping ${dominantDirection}`)
    switch (dominantDirection) {
        case "left":
            setCubePosition(event,endX-swipeForce,endY)
            break;

        case "right":
            setCubePosition(event,endX+swipeForce,endY)
            break;
        
        case "up":
            setCubePosition(event,endX,endY-swipeForce)
            break;
        
        case "down":
            setCubePosition(event,endX,endY+swipeForce)
            break;
        
        default:
            break;
    }
    return
}

function tap() {
    console.log("tap")
    return
}

function setCurrentPos(event) {
    currentX = getTouchedPosition(event).x;
    currentY = getTouchedPosition(event).y;

    deltaX = (currentX - startX),0,AREA_WIDTH-startX
    deltaY = (currentY - startY),0,AREA_WIDTH-startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            dominantDirection = "right";
        } else {
            dominantDirection = "left";
        }
    } else {
        if (deltaY > 0) {
            dominantDirection = "down";
        } else {
            dominantDirection = "up";
        }
    }

    console.log(dominantDirection);
    console.log(deltaX,deltaY);

    return setCubePosition(event);
}

function getTouchedPosition(event) {
    let touchedObject = touchArea;
    let areaPos = touchedObject.getBoundingClientRect();

    return {
        x: (event["changedTouches"][0].clientX - areaPos.left),
        y: (event["changedTouches"][0].clientY - areaPos.top)
    }
};

function setCubePosition(event,x,y) {
    let numberLeftPos = getTouchedPosition(event).x-MOVABLE_WIDTH/2
    let numberTopPos = getTouchedPosition(event).y-MOVABLE_HEIGHT/2

    leftPos = Math.max(Math.min(numberLeftPos,AREA_WIDTH-MOVABLE_WIDTH),0)
    topPos = Math.max(Math.min(numberTopPos,AREA_HEIGHT-MOVABLE_HEIGHT),0)

    if (x || y) {
        console.log("SWIPE")

        leftPos = Math.max(Math.min(x-MOVABLE_WIDTH/2,AREA_WIDTH-MOVABLE_WIDTH),0)
        topPos = Math.max(Math.min(y-MOVABLE_HEIGHT/2,AREA_HEIGHT-MOVABLE_HEIGHT),0)
    }

    leftPos += "px"
    topPos += "px"

    movableObject.style.left = leftPos
    movableObject.style.top = topPos

    return [numberLeftPos,numberTopPos]
}

function updateStatusDisplay(input = "") {
    statusDisplay.innerText = `
    Starting Coords: (${round(startX)}, ${round(startY)})
    Current Coords: (${round(currentX)}, ${round(currentY)})
    deltaX: ${round(deltaX)}
    deltaY: ${round(deltaY)}
    Drag Distance: ${round(dragDistance)}
    Swipe Direction: ${dominantDirection}
    ${input}
    `
}

function round(value) {
    return Math.round((value*100))/100
}