// toggle a class for the panel div at the click of the button
const button = document.querySelector("button");
const panelToggle = document.querySelector(".panel-toggle");

button.addEventListener("click", () => panelToggle.classList.toggle("toggle-panel"));