function calculate() {
    let firstNumberElement = document.getElementById('firstNumber')
    let secondNumberElement = document.getElementById('secondNumber')
    let operationElement = document.getElementById('operation')
    let resultElement = document.getElementById('result')
    let firstNumberValue = firstNumberElement.value
    let secondNumberValue = secondNumberElement.value
    let blankInput = false
    if (firstNumberValue == '' || secondNumberValue == '') {
        blankInput = true
    }
    else {
        firstNumberValue = Number(firstNumberValue)
        secondNumberValue = Number(secondNumberValue)
    }
    let operationValue = operationElement.value
    let result = 0
    if (blankInput == false) {
        switch (operationValue) {
            case "+":
                result = firstNumberValue + secondNumberValue
                break
            case "-":
                result = firstNumberValue - secondNumberValue
                break
            case "*":
                result = firstNumberValue * secondNumberValue
                break
            case "/":
                if (secondNumberValue == 0) {
                    result = "Error!"
                }
                else {
                    result = firstNumberValue / secondNumberValue
                }
                break
            case "%":
                if (secondNumberValue == 0) {
                    result = "Error!"
                }
                else {
                    result = firstNumberValue % secondNumberValue
                }
                break
        }
    }
    else {
        result = "Please enter two numbers."
    }
    resultElement.textContent = result
}