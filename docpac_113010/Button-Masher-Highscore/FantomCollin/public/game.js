let score = 0;
let timer = 20;
let direction = 0; //top=0, right=1, down=2, left=3
let gameloopVar;
let controllerPollLoop;
let directionrandomVar;
let buttonAPressed = false;
let buttonStartPressed = false;
let gameOver = false
let randDirect
let username;


const scoreBoxElement = document.getElementById("scoreBox");
const timerBoxElement = document.getElementById("timerBox");
const directionBoxElement = document.getElementById("directionBox");
const controllerStatusElement = document.getElementById("controllerStatus");
const directions = ["Up", "Right", "Down", "Left"]
const usernameElement = document.getElementById('input');
const submissionMessage = document.getElementById('submissionMessage');
const highScoreLink = document.getElementById('highScore');
console.log("Element:", usernameElement);
console.log("textContent:", usernameElement.textContent);


async function submitScore(username, score) {
    if (username.trim() === '' || username.trim().length > 20 || !Number.isInteger(score) || score < 0) {
        console.log("Can't submit - invalid data");
        return;
    }
    submissionMessage.textContent = 'Saving score...';
    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                score: score
            })
        });
        const data = await response.json();

        if (response.ok) {
            submissionMessage.textContent = 'Score saved'
            highScoreLink.style.display = 'block'
        } else if (response.status === 400) {
            submissionMessage.textContent = 'Invalid name or score'
        } else {
            submissionMessage.textContent = 'Score could not be saved'
        };

    } catch (error) {
        console.log("Error: Couldn't save score", error)
        submissionMessage.textContent = 'SCORE COULD NOT BE SAVED!'
    }
};

function startGame() {
    console.log('GAME STARTINGGGGG!!!!!!!');
    console.log("value:", usernameElement.value);
    console.log("Timer value at start:", timer);
    gameloopVar = setInterval(() => {
        console.log("Timer interval running! Timer is:", timer);
        --timer;
        timerBoxElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(gameloopVar);
            cancelAnimationFrame(controllerPollLoop);
            gameOver = true;
            submitScore(username, score)
            directionBoxElement.textContent = "Press START to play again!";
            timerBoxElement.textContent = "Game Over!";
            console.log("Fetch called");
        };
    }, 1000);

    directionrandomVar = setInterval(directInit, 2000);
    console.log("Intervals created");
}
;

function directInit() {
    randDirect = Math.floor(Math.random() * 4);
    if (timer > 0) {
        directionBoxElement.textContent = directions[randDirect];
    };
};
directInit();

addEventListener("gamepadconnected", (e) => {
    controllerStatusElement.textContent = "Controller Connected";
    controller = e.gamepad;
    console.log(controller);
    controllerPollLoop = requestAnimationFrame(controllerPoll);
})

addEventListener("gamepaddisconnected", (e) => {
    controllerStatusElement.textContent = "Controller Disconnected";
})

function controllerPoll() {
    console.log('Polling...')
    for (const controller of navigator.getGamepads()) {
        if (!controller) continue;

        if (controller.buttons[0].pressed && !buttonAPressed) {
            console.log("A button pressed!");
        };
        if (controller.buttons[9].pressed && !buttonStartPressed) {
            console.log("START button pressed!");
            username = usernameElement.value;
            startGame();
        };

        let yaxis = controller.axes[1];
        let xaxis = controller.axes[0];
        let deadzone = 0.5;

        if (Math.abs(yaxis) <= deadzone) {
            yaxis = 0;
        }

        if (Math.abs(xaxis) <= deadzone) {
            xaxis = 0;
        }

        console.log(xaxis, yaxis)

        if (timer > 0 && !gameOver && funcyDirection(randDirect, xaxis, yaxis)) {
            if (controller.buttons[0].pressed && !buttonAPressed) {
                ++score;
                scoreBoxElement.textContent = score;
            };
        };
        buttonAPressed = controller.buttons[0].pressed;
        buttonStartPressed = controller.buttons[9].pressed;
        controllerPollLoop = requestAnimationFrame(controllerPoll);
    }
}

function funcyDirection(direction, xaxis, yaxis) {
    let stickDirection;
    if (yaxis === -1) {
        stickDirection = 0;
    } else if (yaxis === 1) {
        stickDirection = 2;
    } else if (xaxis === 1) {
        stickDirection = 1;
    } else if (xaxis === -1) {
        stickDirection = 3;
    };

    return direction === stickDirection;
};


