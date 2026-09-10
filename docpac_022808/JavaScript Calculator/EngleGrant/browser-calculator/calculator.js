function calculate() {
    firstNumberInput = document.getElementById("firstNumber")
    secondNumberInput = document.getElementById("secondNumber")
    operationInput = document.getElementById("operation").value
    resultTextbox = document.getElementById("result")

    if (firstNumberInput.value == 0) {
        firstNumberInput.value = 0
    } else if (secondNumberInput.value == 0) {
        secondNumberInput.value = 0
    }

    firstNumberInput = Number(firstNumberInput.value)
    secondNumberInput = Number(secondNumberInput.value)
    
    console.log(`Attempting to solve ${firstNumberInput} ${operationInput} ${secondNumberInput}...`)

    switch (operationInput){
        case "+":
            output = firstNumberInput + secondNumberInput
            break;
        case "-":
            output = firstNumberInput - secondNumberInput
            break;
        case "*":
            output = firstNumberInput * secondNumberInput
            break;
        case "/":
            if (secondNumberInput != 0) {
                output = firstNumberInput / secondNumberInput
            } else {
                output = "Cannot divide by zero."
            }
            break;
        case "%":
            if (secondNumberInput != 0) {
                output = firstNumberInput % secondNumberInput
            } else {
                output = "Cannot modulo by zero."
            }
            break;
    }

    if (output == NaN || output == Infinity) {
        console.log(output)
        output = "Invalid result."
        resultTextbox.value = output
    } else {
        console.log(`Solved with an answer of ${output}`)
        resultTextbox.value = output
    }
    
}