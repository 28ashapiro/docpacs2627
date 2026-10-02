
console.log("client.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("js-test");

    if (message) {
        message.textContent = "JavaScript loaded and is running in the browser!";
        message.style.color = "green";
        message.style.fontWeight = "bold";
    }
});
