// target the display and the buttons 
const display = document.querySelector(".container__display");
const buttons = document.querySelectorAll(".container__buttons button");

// listen for a click event on each button
buttons.forEach(button => button.addEventListener("click", displayDigit));

// create a function which includes in the display the value of the data attribute of the pressed button
function displayDigit(event) {
    let buttonValue = event.target.dataset.value;
    display.textContent += buttonValue;
}