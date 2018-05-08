const button = document.querySelector(".container .grasshopper-button button");
const svg = document.querySelector(".container .grasshopper-button svg");

// button.addEventListener("click", () => svg.style.animation = 'grasshopp 1.5s ease-in-out');
button.addEventListener("click", grasshopp);

function grasshopp() {
    // if the element doesn't already have the animated class
    if(!svg.classList.contains("animated")) {
        // add the animated class and remove it when the animation is complete
        svg.classList.add("animated");
        setTimeout(function() {
            svg.classList.remove("animated");
        }, 1500);
    } 
};