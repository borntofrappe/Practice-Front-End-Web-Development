// target the button which triggers the animation
const toggleModal = document.querySelector(".container button");
// target the div which is subject to the animation
const modal = document.querySelector(".container .modal");

// listen for a click event on the button, at which point toggle the class of active on the div, displaying alternatively the panel on and off the screen
toggleModal.addEventListener("click", () => modal.classList.toggle("active"));

// target the radio menus
const inputRadioMenus = document.querySelectorAll("input[type='radio']");
inputRadioMenus.forEach(inputRadioMenu => inputRadioMenu.addEventListener("click", logChange));

function logChange(e) {
    console.log(e.target.value);
}
