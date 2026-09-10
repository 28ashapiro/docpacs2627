function calculate() {
    const resultElement = document.getElementById("result");
    const number1Input  = document.getElementById("number1");
    const number2Input  = document.getElementById("number2");
    const operatorInput = document.getElementById("operation");

    const number1Value = number1Input.value;
    const number2Value = number2Input.value;
    const operatorValue = operatorInput.value;
    
    if (!number1Value || !number2Value) {
        resultElement.innerHTML = "Please enter two numbers.";
        return;
    }
    
    const number1 = Number(number1Value);
    const number2 = Number(number2Value);
    
    let result = "Unknown Error";
    switch (operatorValue) {
        case "+": 
            result = String(number1 + number2);
            break;
        case "-":
            result = String(number1 - number2);
            break;
        case "*":
            result = String(number1 * number2);
            break;
        case "/":
            if (number2 === 0) {
                result = "Error!";
            }
            else {
                result = String(number1 / number2);
            }
            break;
        case "%":
            if (number2 === 0) {
                result = "Error!";
            }
            else {
                result = String(number1 % number2);
            }
            break;
    }
    resultElement.innerHTML = result;
}