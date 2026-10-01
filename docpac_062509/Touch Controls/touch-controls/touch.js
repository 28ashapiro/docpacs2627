const touchArea = document.getElementById("touchArea");
const player = document.getElementById("player");
const touchStatus = document.getElementById("touchStatus");
let touchActive = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let deltaX = 0;
let deltaY = 0;
const SWIPE_DISTANCE = 100;
const TAP_TOLERANCE = 10;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;

function getLocalPosition(touch) {
    const areaRectangle = touchArea.getBoundingClientRect();
    const localX = touch.clientX - areaRectangle.left;
    const localY = touch.clientY - areaRectangle.top;
    return {
        x: localX,
        y: localY
    };
}

function movePlayer(localX, localY) {
    let objectX = localX - PLAYER_WIDTH / 2;
    let objectY = localY - PLAYER_HEIGHT / 2;
    const maxX = touchArea.clientWidth - PLAYER_WIDTH;
    const maxY = touchArea.clientHeight - PLAYER_HEIGHT;
    objectX = Math.max(0, Math.min(objectX, maxX));
    objectY = Math.max(0, Math.min(objectY, maxY));
    player.style.left = objectX + "px";
    player.style.top = objectY + "px";
}

function getDirection(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            return "Right";
        } else {
            return "Left";
        }
    } else {
        if (deltaY > 0) {
            return "Down";
        } else {
            return "Up";
        }
    }
}

touchArea.addEventListener("touchstart", function (event) {
    event.preventDefault();
    if (event.touches.length === 0) {
        return;
    }

    const touch = event.touches[0];
    const localPosition = getLocalPosition(touch);
    startX = localPosition.x;
    startY = localPosition.y;
    currentX = startX;
    currentY = startY;
    deltaX = 0;
    deltaY = 0;

    touchActive = true;
    movePlayer(currentX, currentY);
    touchStatus.innerHTML =
        "Event: touchstart<br>" +
        "Viewport X: " + touch.clientX + "<br>" +
        "Viewport Y: " + touch.clientY + "<br>" +
        "Local X: " + currentX.toFixed(0) + "<br>" +
        "Local Y: " + currentY.toFixed(0) + "<br>" +
        "Active touches: " + event.touches.length;
});

touchArea.addEventListener("touchmove", function (event) {
    event.preventDefault();
    if (!touchActive) {
        return;
    }

    if (event.touches.length === 0) {
        return;
    }

    const touch = event.touches[0];
    const localPosition = getLocalPosition(touch);
    currentX = localPosition.x;
    currentY = localPosition.y;
    deltaX = currentX - startX;
    deltaY = currentY - startY;

    const distance = Math.hypot(deltaX, deltaY);
    const direction = getDirection(deltaX, deltaY);
    movePlayer(currentX, currentY);
    touchStatus.innerHTML =
        "Event: touchmove<br>" +
        "Start X: " + startX.toFixed(0) + "<br>" +
        "Start Y: " + startY.toFixed(0) + "<br>" +
        "Current X: " + currentX.toFixed(0) + "<br>" +
        "Current Y: " + currentY.toFixed(0) + "<br>" +
        "deltaX: " + deltaX.toFixed(0) + "<br>" +
        "deltaY: " + deltaY.toFixed(0) + "<br>" +
        "Distance: " + distance.toFixed(1) + "<br>" +
        "Direction: " + direction;
});

touchArea.addEventListener("touchend", function (event) {
    event.preventDefault();
    if (!touchActive) {
        return;
    }

    if (event.changedTouches.length === 0) {
        return;
    }
    const touch = event.changedTouches[0];
    const localPosition = getLocalPosition(touch);
    currentX = localPosition.x;
    currentY = localPosition.y;
    deltaX = currentX - startX;
    deltaY = currentY - startY;

    const distance = Math.hypot(deltaX, deltaY);
    const direction = getDirection(deltaX, deltaY);
    if (distance <= TAP_TOLERANCE) {
        movePlayer(currentX, currentY);
        touchStatus.innerHTML =
            "Gesture: Tap<br>" +
            "Distance: " + distance.toFixed(1) + " pixels<br>" +
            "Position: (" +
            currentX.toFixed(0) +
            ", " +
            currentY.toFixed(0) +
            ")";
    } else if (distance >= SWIPE_DISTANCE) {
        let playerX = parseFloat(player.style.left) || 0;
        let playerY = parseFloat(player.style.top) || 0;
        const MOVE_AMOUNT = 50;
        if (direction === "Left") {
            playerX -= MOVE_AMOUNT;
        } else if (direction === "Right") {
            playerX += MOVE_AMOUNT;
        } else if (direction === "Up") {
            playerY -= MOVE_AMOUNT;
        } else if (direction === "Down") {
            playerY += MOVE_AMOUNT;
        }

        const maxX = touchArea.clientWidth - PLAYER_WIDTH;
        const maxY = touchArea.clientHeight - PLAYER_HEIGHT;
        playerX = Math.max(0, Math.min(playerX, maxX));
        playerY = Math.max(0, Math.min(playerY, maxY));
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
        touchStatus.innerHTML =
            "Gesture: Swipe " + direction + "<br>" +
            "Distance: " + distance.toFixed(1) + " pixels<br>" +
            "Moved: 50 pixels " + direction;
    } else {
        touchStatus.innerHTML =
            "Gesture: Drag<br>" +
            "Distance: " + distance.toFixed(1) + " pixels<br>" +
            "Direction: " + direction;
    }
    touchActive = false;
});

touchArea.addEventListener("touchcancel", function (event) {
    event.preventDefault();
    touchActive = false;
    deltaX = 0;
    deltaY = 0;
    touchStatus.innerHTML =
        "Gesture cancelled.<br>" +
        "Touch state has been reset.";
});