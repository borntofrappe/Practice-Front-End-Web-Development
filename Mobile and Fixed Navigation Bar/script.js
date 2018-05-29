// target the toggle button and the panel to be toggled
const toggleButton = document.querySelector(".toggle");
const linksPanel = document.querySelector(".links");

// listen for a click event on the toggle button, at which point toggle the panel showing the div with the anchor links
toggleButton.addEventListener("click", toggleNav);

// create a function which toggles the div with anchor links by toggling a class predisposed to show the div in the viewport
function toggleNav() {
    toggleButton.classList.toggle("toggle-active");
    linksPanel.classList.toggle("panel-active");
}