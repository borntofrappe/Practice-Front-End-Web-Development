// target the element in which the buttons are displayed and the different buttons of the calculator
const display = document.querySelector(".calculator__display h1");
const buttons = document.querySelectorAll(".calculator__input .input--button");

// when clicking a buttons, call a function which places in the display the data attribute of the button pressed
buttons.forEach(button => {
  button.addEventListener("click", handleClick);
});

function handleClick(e) {
  let target = e.target;
  let attribute = target.getAttribute("data-button");
  display.textContent = attribute;
}