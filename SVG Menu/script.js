// target the "button" to toggle the menu and the vertical rectangle to be transitioned out of/ into view
const toggleMenuButton = document.querySelector("#toggle-menu");
const toggleMenuButtonSign = document.querySelector("#toggle-menu #vertical-rectangle");

// target all the menu sections
const menus = document.querySelectorAll(".menu");

// listen for a click event on the "button"
toggleMenuButton.addEventListener("click", toggleMenu);

// declare a function which toggles the class of .menu--active for all menu sections and the class of .menu--close for the vertical rectangle
function toggleMenu () {
    menus.forEach(function(menu) {
        menu.classList.toggle("menu--active");
    });
    toggleMenuButtonSign.classList.toggle("menu--close");
}
