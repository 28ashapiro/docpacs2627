const touchArea = document.getElementById("touchArea");
const player = document.getElementById("player");
const touchStatus = document.getElementById("touchStatus");

const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 200;
const TOUCH_WIDTH = 600;
const TOUCH_HEIGHT = 400;
const SWIPE_DISTANCE = 50;
const TAP_TOLERANCE = 1;

let touchActive = false;
let objectX = 0;
let objectY = 0;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let deltaX = 0;
let deltaY = 0;

let direction = "";
let gestureType = "";

function checkBounds() {
    if (objectX < 0) {
        objectX = 0;
    }
    if (objectX > TOUCH_WIDTH - PLAYER_WIDTH) {
        objectX = TOUCH_WIDTH - PLAYER_WIDTH;
    }
    if (objectY < 0) {
        objectY = 0;
    }
    if (objectY > TOUCH_HEIGHT - PLAYER_HEIGHT) {
        objectY = TOUCH_HEIGHT - PLAYER_HEIGHT;
    }
}

function updatePlayer() {
    player.style.left = objectX.toString() + "px";
    player.style.top = objectY.toString() + "px";
}

touchArea.addEventListener('touchstart', function (event) {
    const areaRectangle = touchArea.getBoundingClientRect();
    startX = event.touches[0].clientX - areaRectangle.left;
    startY = event.touches[0].clientY - areaRectangle.top;
    currentX = event.touches[0].clientX - areaRectangle.left;
    currentY = event.touches[0].clientY - areaRectangle.top;
    viewportX = event.touches[0].clientX;
    viewportY = event.touches[0].clientY;
    //these variables names dont match 1:1 with the assignment because i removed the original ones that showed viewport coords, thinking they were unneeded and redundant
    touchActive = true;
    objectX = currentX - PLAYER_WIDTH / 2;
    objectY = currentY - PLAYER_HEIGHT / 2;
    checkBounds();
    updatePlayer();
    touchStatus.innerHTML = `
    <p>Event: touchstart</p>
    <p>Local X: ${currentX}</p>
    <p>Local Y: ${currentY}</p>
    <p>Viewport X: ${viewportX}</p>
    <p>Viewport Y: ${viewportY}</p>
    <p>Active Touches: ${event.touches.length}`;
});

touchArea.addEventListener('touchmove', function (event) {
    if (touchActive === true) {
        const areaRectangle = touchArea.getBoundingClientRect();
        currentX = event.touches[0].clientX - areaRectangle.left;
        currentY = event.touches[0].clientY - areaRectangle.top;
        deltaX = currentX - startX;
        deltaY = currentY - startY;
        const distance = Math.hypot(deltaX, deltaY);
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                direction = "right";
            } else {
                direction = "left";
            }
        } else {
            if (deltaY > 0) {
                direction = "down";
            } else {
                direction = "up";
            }
        }
        objectX = currentX - PLAYER_WIDTH / 2;
        objectY = currentY - PLAYER_HEIGHT / 2;
        checkBounds();
        updatePlayer();
        touchStatus.innerHTML = `
        <p>Event: touchmove</p>
        <p>Start X: ${startX}</p>
        <p>Start Y: ${startY}</p>
        <p>Local X: ${currentX}</p>
        <p>Local Y: ${currentY}</p>
        <p>Horizontal Change (Delta X): ${deltaX}</p>
        <p>Vertical Change (Delta Y): ${deltaY}</p>
        <p>Active Touches: ${event.touches.length}</p>
        <p>Direction: ${direction}</p>
        <p>Distance: ${distance}</p>`;
    }
});

touchArea.addEventListener('touchend', function (event) {
    const areaRectangle = touchArea.getBoundingClientRect();
    currentX = event.changedTouches[0].clientX - areaRectangle.left;
    currentY = event.changedTouches[0].clientY - areaRectangle.top;

    deltaX = currentX - startX;
    deltaY = currentY - startY;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance <= TAP_TOLERANCE) {
        gestureType = "Tap";
    } else if (distance >= SWIPE_DISTANCE) {
        //check direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                direction = "right";
                objectX += 50;
            } else {
                direction = "left";
                objectX -= 50;
            }
        } else {
            if (deltaY > 0) {
                direction = "down";
                objectY += 50;
            } else {
                direction = "up";
                objectY -= 50;
            }
        }
        gestureType = "Swipe " + direction;
    } else {
        gestureType = "Drag";
    }
    checkBounds();
    updatePlayer();
    touchActive = false
    touchStatus.innerHTML = `
    <p>Event: touchend</p>
    <p>Gesture: ${gestureType}</p>
    <p>Final Distance: ${distance}</p>`
});

touchArea.addEventListener('touchcancel', function (event) {
    touchActive = false;
    gestureType = "";
    touchStatus.innerHTML = `
    <p>Event: touchcancel</p>
    <p>Touch Cancelled!</p>`
});