function calculate() {
document.getElementById("calculateButton").addEventListener("click", function(){
let num1 = (document.getElementById("numberInput1").value);
let num2 = (document.getElementById("numberInput2").value);
let operator = document.getElementById("operator").value;

if (num1 === "" && num2 === "") {
    document.getElementById("result").textContent = "Please enter both numbers.";
return;} else if (num1 === "") {
    document.getElementById("result").textContent = "Please enter the first number.";
return;} else if (num2 === "") {
    document.getElementById("result").textContent = "Please enter the second number.";
return;}


num1 = parseFloat(num1);
num2 = parseFloat(num2);

let result;



if ((operator === "divide" || operator === "modulo") && num2 === 0) {
    document.getElementById("result").textContent = "Error!: Division or modulo by zero is not allowed.";
    return;
}

if (operator === "add")
{ result = num1 + num2}
else if (operator === "subtract" )
{result = num1 - num2}
else if (operator === "multiply" )
{result = num1 * num2}
else if (operator === "divide" )
{result = num1 / num2}
else if (operator === "modulo" )
{result = num1 % num2}
else {document.getElementById("result").textContent = "please select a valid operator"; return;}

document.getElementById("result").textContent = "The result is: " + result;
});}