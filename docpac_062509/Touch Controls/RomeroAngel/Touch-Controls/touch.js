const touchArea = document.getElementById('touchArea');
const player = document.getElementById('player');
const touchStatus = document.getElementById('touchStatus');

let touchActive = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let deltaX = 0;
let deltaY = 0;
let objectX = 0;
let objectY = 0;


const SWIPE_DISTANCE = 50;
const TAP_TOLERANCE = 12;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;

touchArea.addEventListener('touchstart', (event) => {
    const touch = event.touches[0]
    event.preventDefault();
    const rect = touchArea.getBoundingClientRect();

    const localX = touch.clientX - rect.left;
    const localY = touch.clientY - rect.top;

    startX = localX;
    startY = localY;
    currentX = localX;
    currentY = localY;
    touchActive = true;

    console.log(rect);
    touchStatus.textContent = "Viewport X: " + touch.clientX + " | Viewport Y: " +
        touch.clientY + " | Local X: " + currentX + " | Local Y: " + currentY;
});

touchArea.addEventListener('touchmove', (event) => {
    if (!touchActive) return;

    const touch = event.touches[0]
    const rect = touchArea.getBoundingClientRect();

    const playerRect = player.getBoundingClientRect();
    const PLAYER_WIDTH = playerRect.width;
    const PLAYER_HEIGHT = playerRect.height;

    const localX = touch.clientX - rect.left;
    const localY = touch.clientY - rect.top;

    objectX = localX - PLAYER_WIDTH / 2;
    objectY = localY - PLAYER_HEIGHT / 2;

    const maxX = rect.width - PLAYER_WIDTH;
    const maxY = rect.height - PLAYER_HEIGHT;

    objectX = Math.max(0, objectX);
    objectY = Math.max(0, objectY);
    objectX = Math.min(maxX, objectX);
    objectY = Math.min(maxY, objectY);

    player.style.left = objectX + "px";
    player.style.top = objectY + "px";

    currentX = localX;
    currentY = localY;
    deltaX = currentX - startX;
    deltaY = currentY - startY;

    const distance = Math.hypot(deltaX, deltaY);
    direction = "";

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            direction = "Right";  //right
        }
        else {
            direction = "Left";  //left
        }
    }

    else {
        if (deltaY > 0) {
            direction = "Down";  //down
        }
        else {
            direction = "Up";  //up
        }
    }

    touchStatus.textContent = "Start X: " + startX + " | StartY: " + startY + " | Current X: "
        + currentX + " | Current Y: " + currentY + "| Delta X:" + deltaX + "| Delta Y:" + deltaY,
        + " | Distance: " + distance + " | Direction: " + direction;
});

touchArea.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const rect = touchArea.getBoundingClientRect();
    const localX = touch.clientX - rect.left;
    const localY = touch.clientY - rect.top;
    const deltaX = localX - startX;
    const deltaY = localY - startY;
    const distance = Math.hypot(deltaX, deltaY);


    if (distance < TAP_TOLERANCE) {
        touchStatus.textContent = "Gesture is a tap";
    } else {
        if (distance >= TAP_TOLERANCE && distance <= SWIPE_DISTANCE) {
            console.log("SWIPE DETECTED - Distance:", distance, "Direction:", direction);
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    direction = "Right";
                } else {
                    direction = "Left";
                }
            } else {
                if (deltaY > 0) {
                    direction = "Down";
                } else {
                    direction = "Up";
                }
            }

            let newLeft = parseInt(player.style.left);
            let newTop = parseInt(player.style.top);

            if (direction === "Left") {
                newLeft = newLeft - 50;
            }
            else if (direction === "Right") {
                newLeft = newLeft + 50;
            }
            else if (direction === "Up") {
                newTop = newTop - 50;
            }
            else if (direction === "Down") {
                newTop = newTop + 50;
            }

            const playerRect = player.getBoundingClientRect();
            const PLAYER_WIDTH = playerRect.width;
            const PLAYER_HEIGHT = playerRect.height;
            const maxX = rect.width - PLAYER_WIDTH;
            const maxY = rect.height - PLAYER_HEIGHT;

            newLeft = Math.max(0, newLeft);
            newLeft = Math.min(maxX, newLeft);
            newTop = Math.max(0, newTop);
            newTop = Math.min(maxY, newTop);

            player.style.left = newLeft + "px";
            player.style.top = newTop + "px";

        } else {
            touchStatus.textContent = "Gesture is a Drag";
        }
    }

    touchActive = false;
});

touchArea.addEventListener('touchcancel', (event) => {
    touchActive = false;
    touchStatus.textContent = "Touch canceled";
});
