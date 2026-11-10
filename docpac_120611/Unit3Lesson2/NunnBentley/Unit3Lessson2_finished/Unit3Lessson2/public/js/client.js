const btn = document.getElementById("myButton");
if (btn) {
    btn.addEventListener("click", () => {
        console.log("Button clicked!");
        btn.textContent = "button was pressed!"
    })
}
