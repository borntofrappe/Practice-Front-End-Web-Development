// target the HTML elements required to enable the animation 

// elements enabling the toggle action, for which an event listener is added
const menuToggle = document.querySelector(".menu-toggle");
// spans making up the "hamburger" menu
const menuToggleFirstSpan = document.querySelector(".menu-toggle span:nth-child(1)");
const menuToggleSecondSpan = document.querySelector(".menu-toggle span:nth-child(2)");
const menuToggleThirdSpan = document.querySelector(".menu-toggle span:nth-child(3)");

// container of additional information
const menuToggleMenuItems = document.querySelector(".menu-items");


menuToggle.addEventListener("click", toggleMenu);

/* using the .classList property toggle the class for each element
remove if present, add if missing
*/
function toggleMenu() {
    menuToggleFirstSpan.classList.toggle("rotation-first-span");
    menuToggleSecondSpan.classList.toggle("scale-second-span");
    menuToggleThirdSpan.classList.toggle("rotation-third-span");
    menuToggleMenuItems.classList.toggle("horizontal-translation");    
}
