function calculate() {
    let inputOne = document.getElementById('input1');
    let inputTwo = document.getElementById('input2');
    let operator = document.getElementById('operation');
    let calculation = document.getElementById('result');
    let numberOne = Number(inputOne.value);
    let numberTwo = Number(inputTwo.value);
    let trueOperator = operator.value;
    let solution = '';
    
    if (!inputOne.value || !inputTwo.value) {
        calculation.innerHTML = "Please enter two numbers.";
        return;
    }
    if (trueOperator === "+"){
        solution = numberOne + numberTwo;
    }
    else if (trueOperator === "-"){
        solution = numberOne - numberTwo;
    }
    else if (trueOperator === "*"){
        solution = numberOne * numberTwo;
    }
    else if (trueOperator === "/"){
        if (numberTwo === 0){
            solution = "Error!";
        }
        else {
            solution = numberOne / numberTwo;
        }
    }
    else if (trueOperator === "%"){
        if (numberTwo === 0){
            solution = "Error!";
        }
        else {
            solution = numberOne % numberTwo;
        }
    }
    calculation.innerHTML = solution;
}