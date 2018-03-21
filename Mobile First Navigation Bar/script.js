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

/* using the .classList properties 
- check if an arbitrary span already has the class which enables its animation
    - if the class is present remove all classes used for the animation from the affected HTML elements
    - otherwise add the classes and enable the animation
    */
function toggleMenu() {
    
    if(menuToggleFirstSpan.classList.contains("rotation-first-span")) {
        menuToggleFirstSpan.classList.remove("rotation-first-span");
        menuToggleSecondSpan.classList.remove("scale-second-span");
        menuToggleThirdSpan.classList.remove("rotation-third-span");
        menuToggleMenuItems.classList.remove("horizontal-translation");
    }
    else {
        menuToggleFirstSpan.classList.add("rotation-first-span");
        menuToggleSecondSpan.classList.add("scale-second-span");
        menuToggleThirdSpan.classList.add("rotation-third-span");
        menuToggleMenuItems.classList.add("horizontal-translation");
    }
    
}