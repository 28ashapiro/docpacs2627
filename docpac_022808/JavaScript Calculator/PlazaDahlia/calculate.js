function calculate() {
    let firstInput = document.getElementById("firstNumber").value;
    let secondInput = document.getElementById("secondNumber").value;

    if (firstInput === "" || secondInput === "") {
        document.getElementById("result").value = "Please enter two numbers.";
        return;
    }

    let firstNumber = Number(firstInput);
    let secondNumber = Number(secondInput);
    let operation = document.getElementById("operation").value;

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        document.getElementById("result").value = "Please enter two numbers.";
        return;
    }

    let result;
    if (operation == "+") {
        result = firstNumber + secondNumber;
    }
    else if (operation == "-") {
        result = firstNumber - secondNumber;
    }
    else if (operation == "*") {
        result = firstNumber * secondNumber;
    }
    else if (operation == "/") {
        if (secondNumber == 0) {
            result = "Error!";
        } else {
            result = firstNumber / secondNumber;
        }
    }
    else if (operation == "%") {
        if (secondNumber == 0) {
            result = "Error!";
        } else {
            result = firstNumber % secondNumber;
        }
    }
    document.getElementById("result").value = result;
}