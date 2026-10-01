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

const SWIPE_DISTANCE = 100;
const TAP_TOLERANCE = 10;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

touchArea.addEventListener('touchstart', (event) => {
    event.preventDefault();

    if (event.touches.length > 0) {
        const touch = event.touches[0];

        const viewportX = touch.clientX;
        const viewportY = touch.clientY;

        const rect = touchArea.getBoundingClientRect();
        const localX = viewportX - rect.left;
        const localY = viewportY - rect.top;

        startX = localX;
        startY = localY;
        currentX = localX;
        currentY = localY;
        touchActive = true;

        touchStatus.innerHTML = `
            <strong>Event:</strong> touchstart<br>
            <strong>Viewport X:</strong> ${viewportX.toFixed(0)}<br>
            <strong>Viewport Y:</strong> ${viewportY.toFixed(0)}<br>
            <strong>Local X:</strong> ${localX.toFixed(0)}<br>
            <strong>Local Y:</strong> ${localY.toFixed(0)}<br>
            <strong>Active touches:</strong> ${event.touches.length}
        `;
    }
});


touchArea.addEventListener('touchmove', (event) => {
    event.preventDefault();

    if (touchActive && event.touches.length > 0) {
        const touch = event.touches[0];

        const rect = touchArea.getBoundingClientRect();
        const localX = touch.clientX - rect.left;
        const localY = touch.clientY - rect.top;

        currentX = localX;
        currentY = localY;

        deltaX = currentX - startX;
        deltaY = currentY - startY;

        let playerX = localX - (PLAYER_WIDTH / 2);
        let playerY = localY - (PLAYER_HEIGHT / 2);

        playerX = Math.max(0, Math.min(playerX, touchArea.offsetWidth - PLAYER_WIDTH));
        playerY = Math.max(0, Math.min(playerY, touchArea.offsetHeight - PLAYER_HEIGHT));

        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';

        touchStatus.innerHTML = `
            <strong>Event:</strong> touchmove<br>
            <strong>Start X:</strong> ${startX.toFixed(0)}, <strong>Y:</strong> ${startY.toFixed(0)}<br>
            <strong>Current X:</strong> ${currentX.toFixed(0)}, <strong>Y:</strong> ${currentY.toFixed(0)}<br>
            <strong>Delta X:</strong> ${deltaX.toFixed(0)}, <strong>Y:</strong> ${deltaY.toFixed(0)}
        `;
        console.log(`Event: touchmove | Start X: ${startX.toFixed(0)}, Y: ${startY.toFixed(0)} | Current X: ${currentX.toFixed(0)}, Y: ${currentY.toFixed(0)} | Delta X: ${deltaX.toFixed(0)}, Y: ${deltaY.toFixed(0)}`);

    }

});
touchArea.addEventListener('touchend', (event) => {
    if (touchActive && event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        const viewportX = touch.clientX;
        const viewportY = touch.clientY;
        const rect = touchArea.getBoundingClientRect();
        const localX = viewportX - rect.left;
        const localY = viewportY - rect.top;
        deltaX = localX - startX;
        deltaY = localY - startY;
        const distance = Math.hypot(deltaX, deltaY);
        let gestureType = "";
        if (distance >= 10) {
            gestureType = "drag";

            if (distance >= 100) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {

                    if (deltaX < 0) {
                        currentPX = parseInt(player.style.left)
                        currentPX -= 50
                        currentPX = Math.max(0, Math.min(currentPX, touchArea.offsetWidth - PLAYER_WIDTH));
                        player.style.left = currentPX + 'px';
                        gestureType = "swipe";
                    } else {
                        currentPX = parseInt(player.style.left)
                        currentPX += 50
                        currentPX = Math.max(0, Math.min(currentPX, touchArea.offsetWidth - PLAYER_WIDTH));
                        player.style.left = currentPX + 'px';
                        gestureType = "swipe";

                    }
                } else {

                    if (deltaY < 0) {
                        currentPY = parseInt(player.style.top)
                        currentPY -= 50
                        currentPY = Math.max(0, Math.min(currentPY, touchArea.offsetHeight - PLAYER_HEIGHT));
                        player.style.top = currentPY + 'px';
                        gestureType = "swipe";

                    } else {
                        currentPY = parseInt(player.style.top)
                        currentPY += 50
                        currentPY = Math.max(0, Math.min(currentPY, touchArea.offsetHeight - PLAYER_HEIGHT));
                        player.style.top = currentPY + 'px';
                        gestureType = "swipe";

                    }
                }
            }

        }

        if (distance <= 10) {
            gestureType = "tap";
        }
        touchActive = false
        touchStatus.innerHTML = gestureType;
    }

});
touchArea.addEventListener('touchcancel', (event) => {
    if (touchActive) {
        touchActive = false
        touchStatus.innerHTML = "Touch Cancelled";
    }
});
