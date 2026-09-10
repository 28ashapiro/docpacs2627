function calculate() {
    let result = 0
    let firstNumberElement = document.getElementById("firstNumber");
    let secondNumberElement = document.getElementById("secondNumber");
    let operationElement = document.getElementById("operation");
    let resultElement = document.getElementById("result");
    if (firstNumberElement.value == "" || secondNumberElement.value == "") {
        resultElement.innerHTML = "Please enter two numbers";
        return;
    }
    let firstNumberValue = Number(firstNumberElement.value);
    let secondNumberValue = Number(secondNumberElement.value);
    let operationValue = operationElement.value;
    if (isNaN(firstNumberValue) || isNaN(secondNumberValue)) {
        resultElement.innerHTML = "Please enter two numbers";
        return;
    }
    if (operationValue == "+") {
        result = firstNumberValue + secondNumberValue
    }
    if (operationValue == "-") {
        result = firstNumberValue - secondNumberValue
    }
    if (operationValue == "*") {
        result = firstNumberValue * secondNumberValue
    }
    if (operationValue == "/") {
        if (secondNumberValue != 0) {
            result = firstNumberValue / secondNumberValue
        }
        else {
            result = "Error!"
        }

    }
    if (operationValue == "%") {
        if (secondNumberValue != 0) {
            result = firstNumberValue % secondNumberValue
        }

        else {
            result = "Error!"
        }
    }
    resultElement.innerHTML = result;


}