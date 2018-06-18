// target the div which re-creates the outline of the mouse pointer
const mouseCursor = document.querySelector(".mouse-cursor");

// listen to a mousemove event on the entire window, at which point update the position of the faux mouse pointer
window.addEventListener("mousemove", trackMovement);
// listen to a click event on the same window, at which point add a simple animation to visualize the click
window.addEventListener("click", showClick);

/*
the pertinent values are retrieved from the coordinates of the mousemove event
e.clientX
e.clientY

these can be directly included as the values for the left and top properties respectively
*/

// create a function which updates the left and top property depending on the coordinates of the mousemove event
function trackMovement(e) {
    mouseCursor.style.left = `${e.clientX}px`;
    mouseCursor.style.top = `${e.clientY}px`;
}

// create a function which adds a class to the mouse pointer, to "animate" the click 
function showClick() {
    // add the class 
    mouseCursor.classList.add("animation");
    // remove it after half a second (which is coincidentally the duration of the animation)
    let timeoutID = setTimeout(() => {
        mouseCursor.classList.remove("animation");
        clearTimeout(timeoutID);
    }, 500);
}