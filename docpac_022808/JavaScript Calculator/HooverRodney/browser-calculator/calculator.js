const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");
const operation = document.getElementById("operation");
const resultdiv = document.getElementById("result");
let firstValue;
let secondValue;
let operationValue;
let firstConValue;
let secondConValue;
let result;

function calculate() {
    firstValue = (firstNumber.value);
    secondValue = (secondNumber.value);
    operationValue = operation.value;

    console.log("First Number: " + firstValue);
    console.log("Second Number: " + secondValue);
    console.log("Operation: " + operationValue);
    console.log("Unconverted types are as follows: " + typeof firstValue, typeof secondValue);

    convert();
    checkOperation();
}

function convert() {
    firstConValue = parseFloat(firstValue);
    secondConValue = parseFloat(secondValue);
    console.log("Converted types are as follows:");
    console.log("firstConValue: " + typeof firstConValue + " ", "secondConValue: " + typeof secondConValue) + ";";
    console.log("firstConValue: " + firstConValue);
    console.log("secondConValue: " + secondConValue);
}

function checkOperation() {
    if (Number.isNaN(firstConValue) | Number.isNaN(secondConValue)) {
        result = "Please enter two numbers";
        updateUI();
    } else {
        if (operationValue == 'add') {
            result = firstConValue + secondConValue;
            updateUI();
        } else if (operationValue == 'subtract') {
            result = firstConValue - secondConValue;
            updateUI();
        } else if (operationValue == 'multiply') {
            result = firstConValue * secondConValue;
            updateUI();
        } else if (operationValue == 'divide') {
            if (firstConValue == 0 | secondConValue == 0) {
                result = 'Error!';
                updateUI();
            }
            else {
                result = firstConValue / secondConValue;
                updateUI();
            }
        } else if (operationValue == 'percent') {
            if (firstConValue == 0 | secondConValue == 0) {
                result = 'Error!';
                updateUI();
            } else {
                result = firstConValue % secondConValue;
                updateUI();
            }
        }
        else {
            result = 'Error!';
            updateUI();
        }
    }
}

function updateUI() {
    console.log(result);
    resultdiv.innerHTML = result;
}

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        calculate();
    }
})