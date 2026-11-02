let score = 0;
let aWasPressedBefore = false;
let startWasPressedBefore = false;
let activeGamepadIndex = null;
const playerNameInput = document.getElementById('playername');

let countdownInterval;
let directionInterval;

playerNameInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        let userName = playerNameInput.value;
        let trimmedName = userName.trim();

        if (trimmedName.length > 0) {
            document.getElementById("playername").hidden = true;
            document.getElementById("namelabel").hidden = true;
            startgame()
        } else {
            alert("Please put a name in!!!");
        }
    }
});

let directions = ["Up!", "Down!", "Left!", "Right!"]
let requiredDirection = "Up!";

window.addEventListener('gamepadconnected', function (e) {
    console.log('Controller connected!', e.gamepad);
    activeGamepadIndex = e.gamepad.index;
    controllerStatusElement.textContent = "Controller connected!";
    loop();
});

window.addEventListener('gamepaddisconnected', function (e) {
    controllerStatusElement.textContent = "Uh No Controller Disconnected!!!";
});

function loop() {
    let gamepad = navigator.getGamepads()[activeGamepadIndex];
    console.log('Start button (9):', gamepad.buttons[9].pressed);

    if (!gamepad) {
        return;
    }

    let isHoldingCorrectDirection = false;

    if (requiredDirection === "Up!") {
        if (gamepad.axes[1] < -0.5) {
            isHoldingCorrectDirection = true;
        }
    }

    if (requiredDirection === "Down!") {
        if (gamepad.axes[1] > 0.5) {
            isHoldingCorrectDirection = true;
        }
    }

    if (requiredDirection === "Left!") {
        if (gamepad.axes[0] < -0.5) {
            isHoldingCorrectDirection = true;
        }
    }

    if (requiredDirection === "Right!") {
        if (gamepad.axes[0] > 0.5) {
            isHoldingCorrectDirection = true;
        }
    }

    let aIsPressedNow = gamepad.buttons[0].pressed;
    let startIsPressedNow = gamepad.buttons[9].pressed;
    // console.log('Joystick X:', gamepad.axes[0], 'Joystick Y:', gamepad.axes[1]);

    if (aIsPressedNow && !aWasPressedBefore && isHoldingCorrectDirection && gameisRunning) {
        console.log("Scoring! gameisRunning is:", gameisRunning);
        score = score + 1;
        let scoreBox = document.getElementById('scoreBox')
        scoreBox.textContent = "Score: " + score;
    }

    if (aIsPressedNow && !aWasPressedBefore) {
        console.log("A Pressed!", "X:", gamepad.axes[0], "Y:", gamepad.axes[1], requiredDirection);
    }

    if (startIsPressedNow && !startWasPressedBefore) {
        console.log("You have pressed the start button!!!!!!!!!! ET READY FOR THE NEXT ROUNDA!!!")
        location.reload()
    }

    aWasPressedBefore = aIsPressedNow;
    startWasPressedBefore = startIsPressedNow;
    requestAnimationFrame(loop);
}

let timeLeft = 20;
let gameisRunning = true;

const ScoresAndItsMessage = document.getElementById("ScoresAndItsMessage");
const controllerStatusElement = document.getElementById('controllerStatus');
controllerStatusElement.textContent = "Press A Button To Begin!!!";
const timerElement = document.getElementById('timeBox');

function changeDirection() {
    let randomIndex = Math.floor(Math.random() * 4);

    let pickedDirection = directions[randomIndex];

    requiredDirection = pickedDirection;

    directionBox.textContent = 'Direction:' + pickedDirection;
}

function submitScore(name, score) {
    let datasend = {
        name: name,
        score: score
    };
    let jsonData = JSON.stringify(datasend);

    fetch("/api/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {

                throw new Error('An Error Occured! The Score Shall Not Be Saved!');
            }
        })
        .then(data => {

            ScoresAndItsMessage.textContent = "Here's your scores, go review and see how high you get next time!"
            console.log("Server Is Now Saving The Score Data!:", data);
        })
        .catch(error => {
            ScoresAndItsMessage.textContent = "The Score Couldn't Be Saved!?!";
            console.error("Oh! An Error Had Occured!:", error);
        });
}

function endGame() {
    clearInterval(countdownInterval);
    timerElement.textContent = "YOUR TIME IS UP!!!!! Press Start To Replay!";
    clearInterval(directionInterval);
    gameisRunning = false;
    clearInterval(countdownInterval);
    console.log("The Game Has Ended, gameIsRunning is:", gameisRunning);

    let playerName = playerNameInput.value;
    let trimmedName = playerName.trim();
    console.log("The Player's Name:", playerName);
    console.log("Final Score You Get:", score);

    if (trimmedName.length === 0 || trimmedName.length > 50) {
        console.log("This Is Not A Vaild Name!")
        return;
    }

    if (score < 0 || !Number.isInteger(score)) {
        console.log("You Score Must Be A Full Number!")
        return;
    }

    submitScore(trimmedName, score);
}

function startgame() {
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);

    directionInterval = setInterval(changeDirection, 2000);
}