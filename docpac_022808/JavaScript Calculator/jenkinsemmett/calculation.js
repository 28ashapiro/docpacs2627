function calculate(){
        if (typeof Number(document.getElementById("num1").value) != "number" || typeof Number(document.getElementById("num2").value) != "number"){
            document.getElementById("result").textContent = "Please input only numbers";
        } else if (document.getElementById("num1").value == null || document.getElementById("num2").value == null || document.getElementById("sign").value == null){
            document.getElementById("result").textContent = "Please fill ALL boxes";
        } else {
        let num1 = Number(document.getElementById("num1").value);
        let num2 = Number(document.getElementById("num2").value);
        let sign = document.getElementById("sign").value;
        console.log(document.getElementById("num1").value);
        console.log(document.getElementById("num2").value);
        console.log(document.getElementById("sign").value);
        let ans = 0;
        if (sign == "+"){
            ans = num1 + num2;
        } else if (sign == "-"){
            ans = num1 - num2;
        } else if (sign == "*"){
            ans = num1 * num2;
        } else if (sign == "/"){
            if (num2 != 0){
                ans = num1 / num2;
            } else {
                ans = "Error!"
            }
        } else if (sign == "%"){
            if (num2 != 0){
                ans = num1 % num2;
            } else {
                ans = "Error!"
            }
        }
        document.getElementById("result").textContent = ans;
        }
    }