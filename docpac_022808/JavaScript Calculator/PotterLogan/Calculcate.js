function Calculate(){


number1 = document.getElementById("num1").value
number2 = document.getElementById("num2").value
operator =(document.getElementById("operation").value)

console.log("num1=" + number1 + " num2=" + number2 + " operation=" + operator)

if(number1 != "" && number2 != ""){
    number1 = Number(number1)
    number2 = Number(number2)
    switch(String(operator)){


        case "Multiply":
            output = number1 * number2
            break;
        case "Divide":
            if(number2 != 0){ output = number1 / number2 } else output = "Error!"
            break;
        case "Add":
            output = number1 + number2
            break;
        case "Subtract":
            output = number1 - number2
            break;
        case "Modulo":
            if(number2 != 0){output = number1 % number2} else output = "Error!"
            break;
    }

    console.log("num1=" + number1 + " num2=" + number2 + " operation=" + operator + " output=" + output)

} else {output = "Please input 2 numbers"}

document.getElementById("result").textContent = String(output)


}