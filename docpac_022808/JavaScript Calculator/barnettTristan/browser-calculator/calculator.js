function calculate() {
let number1 = document.getElementById("firstnumber").value
number1 = parseFloat(number1)
let operation = document.getElementById("operation").value
let number2 = document.getElementById("secondnumber").value
number2 = parseFloat(number2)
let div = document.getElementById("result")
if (operation == "+")   {
    result = number1 + number2}
else if (operation == "-") {
    result = number1 - number2}
else if (operation == "*") {
    result = number1 * number2 }
else if (operation == "/") {
    result = number1 / number2
    if (number2 == 0) {
        result = "Error!" }}
else if (operation == "%") {
    result = number1 % number2
    if (number2 == 0) {
        result = "Error!"}}
if (Number.isNaN(result)) {
    div.textContent = "please enter vaild numbers"
}
else {
    div.textContent = result
}
}
