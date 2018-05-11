// target the button which triggers the animation 
const loadButton = document.querySelector(".container button");
// target the animation to be instantiated (the other animate tags depend on this one)
const svgAnimation = document.querySelector(".container svg #greenCircle");

// listen for a click event on the button, at which point begin the selected animation
loadButton.addEventListener("click", () => svgAnimation.beginElement());