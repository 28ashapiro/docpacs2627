score = 0
timer = callTimer = 20
directionNum = [0, 1, 2, 3]
let gamepadIndex = []
let aPressed = []
let startPressed = []
let gameEnded = false

// const!!
const scoreBox = document.getElementById("scoreBox")
const timerBox = document.getElementById("timerBox")
const directionBox = document.getElementById("directionBox")
let controllerStatusBox = document.getElementById("controllerStatus")

// directions in an array
const directionArray = ["Up ⬆️", "Right ➡️", "Down ⬇️", "Left ⬅️"]

// timer
callTimer = setInterval(function () {
    if (timer <= 0) {
        clearInterval(callTimer);
        gameEnded = true;
        directionBox.innerHTML = "Game Over! Press Start to Restart!";
    } else {
        timer -= 1
        timerBox.innerHTML = "Time: " + timer;
    }
}, 1000)

// change and displa y direction every 2 seconds!!!!!!!
// im a tensai  !!!!!
directionTimer = setInterval(function () {
    if (gameEnded == false) {
        const randomIndex = Math.floor(Math.random() * 4);
        document.getElementById("directionBox").innerHTML = "Direction: " + directionArray[randomIndex];
        return directionArray[randomIndex];
    }
}, 2000)

function getRandomDirection() {
    const randomIndex = Math.floor(Math.random() * directionArray.length);
    document.getElementById("directionBox").innerHTML = "Direction: " + directionArray[randomIndex];
    return directionArray[randomIndex];
} getRandomDirection()

// controller connection (LAB)
// window.addEventListener("gamepadconnected", (e) => {
//     let gpIndex = e.gamepad.index;
//     gamepadIndex[0] = gpIndex;
//     console.log(
//         `Controller Connected! Gamepad Index: ${gpIndex}`
//     )
//     controllerStatusBox.innerHTML = "Controller Connected!"
// })
// window.addEventListener("gamepaddisconnected", (e) => {
//     let gpIndex = e.gamepad.index
//     console.log(
//         `Lost connection to Controller...`
//     )
//     controllerStatusBox.innerHTML = "Controller Disconnected..."
// })

// // controller input
// function updateGamepadLoop() {
//     const gamepads = navigator.getGamepads();
//     const gp = gamepads[gamepadIndex[0]];
//     if (gp) {
//         aPressed[0] = gp.buttons[0].pressed;
//         startPressed[0] = gp.buttons[9].pressed;
//     }
//     requestAnimationFrame(updateGamepadLoop);
// }
// updateGamepadLoop();

// // a button press
// const gp = navigator.getGamepads()[gamepadIndex[0]];
// if (gp) {
//     if (gp.buttons[0].pressed) {
//         console.log("A button is pressed!");
//     }
// }

// controller connection (HOME)
window.addEventListener("gamepadconnected", (e) => {
    let gpIndex = e.gamepad.index;
    gamepadIndex[0] = gpIndex;
    console.log(`Controller Connected! Gamepad Index: ${gpIndex}`);
    controllerStatusBox.innerHTML = "Controller Connected!";
    controllerStatusBox.style.color = "green";
});

window.addEventListener("gamepaddisconnected", (e) => {
    console.log("Lost connection to Controller...");
    controllerStatusBox.innerHTML = "Controller Disconnected...";
    controllerStatusBox.style.color = "red";
});

// // controller input & a button press
function updateGamepadLoop() {
    const gamepads = navigator.getGamepads();
    const gp = gamepads[gamepadIndex[0]];
    if (gp) {
        const aNow = gp.buttons[0].pressed;
        const startNow = gp.buttons[9].pressed;
        // a presse !!
        if (aNow && !aPressed[0]) {
            console.log("hi  A");
            a = true
        } else {
            a = false
        }
        // start presps 
        // reload the page it does
        if (startNow && !startPressed[0]) {
            location.reload();
            s = true
        } else {
            s = false
        }
        // rememerber perviolyus statse
        aPressed[0] = aNow;
        startPressed[0] = startNow;
        // x anb y but no z 
        // #wheredoditgo
        // #hideandseek
        const leftX = gp.axes[0];
        const leftY = gp.axes[1];
        // direc tion go wheremest
        // stick drift accounted for, for the unfortunate
        const stickDrift = 0.5;
        if (leftX > stickDrift) {
            console.log("righty tighty");
        }
        if (leftX < -stickDrift) {
            console.log("lefty loosey");
        }
        if (leftY > stickDrift) {
            console.log(" its going down down inanearlierorund");
        }
        if (leftY < -stickDrift) {
            console.log("uppieas!");
        }
        if (leftX > -stickDrift && leftX < stickDrift && leftY > -stickDrift && leftY < stickDrift) {
            // console.log("stick is centered");
        }
        if (a && leftX < -stickDrift && gameEnded == false && timer > 0) {
            if (document.getElementById("directionBox").innerHTML.includes("Left")) {
                score += 1;
                scoreBox.innerHTML = "Score: " + score;
            }
        }
        if (a && leftX > stickDrift && gameEnded == false && timer > 0) {
            if (document.getElementById("directionBox").innerHTML.includes("Right")) {
                score += 1;
                scoreBox.innerHTML = "Score: " + score;
            }
        }
        if (a && leftY > stickDrift && gameEnded == false && timer > 0) {
            if (document.getElementById("directionBox").innerHTML.includes("Down")) {
                score += 1;
                scoreBox.innerHTML = "Score: " + score;
            }
        }
        if (a && leftY < -stickDrift && gameEnded == false && timer > 0) {
            if (document.getElementById("directionBox").innerHTML.includes("Up")) {
                score += 1;
                scoreBox.innerHTML = "Score: " + score;
            }
        }
    }
    requestAnimationFrame(updateGamepadLoop);
}
updateGamepadLoop();
//IM MR JAVASCRIPT !!!!!!!!!!!

