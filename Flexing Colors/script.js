// target the container in which to nest the different colors
const containerColors = document.querySelector(".container__colors");

// the goal is to have five buttons each with a different background color, appended to the container div
// each background color is made up of six hex characters, chosen at random
// the whole thing is wrapped in a function, which is called anew whenever the button is pressed
populateColors();


function populateColors() {
    // empty the container, to remove existing elements (if present)
    containerColors.innerHTML = '';

    /* the logic of the function boils down as follows
    - for five times create a button and append it to the container
    - for six times create a random hex value depicting the background of the button
    */

    // iterate through a for loop 5 times, each time appending a button with a defined background color
    // create an array of five items, to easily iterate through a for loop
    let loopsFive = Array.from('loops');

    // for five times
    for(i of loopsFive) {
        // create an array of six items, to easily iterate through a for loop, but siz times instead of five
        let loopsSix = Array.from('colors');

        // create an array in which to push the random hex colors
        let colors = [];

        // for six times
        for(j of loopsSix) {
            // generate a random integer, ranging from 0 to 15
            let randomInt = Math.floor(Math.random()*16);
            // covert the integer to hex character
            let randomHex = randomInt.toString(16);
            // include each hex character in the place of the existing elements of the array
            colors.push(randomHex);
        }

        // based on the six characters, create the hex code for the background color
        let hexCode = `#${colors.join("")}`;

        // create a button element
        let childContainer = document.createElement("button");
        // style the background of the button according to the hex code
        childContainer.style.background = hexCode;

        // append the button to the container
        containerColors.appendChild(childContainer);
    }
}


/* beside the core functionality of creating the five buttons of different hex colors (which ideally would allow to copy the color value when clicked), the following features are included
1. when clicking the button element refresh the set of colors
1. when hovering on the colored buttons, display the color values of each one of them
*/

// for the button, target the refresh button
const button = document.querySelector(".container__refresh");
// listen for a click event, at which point repopulate the colors container
button.addEventListener("click", populateColors);

// for the buttons, target the wrapping container and listen to a hover event on them by delegating the event to it
// this comes in handy as the buttons do not exist initially
const containerDisplay = document.querySelector(".container__display");

// listen for a hovering event on the container
containerColors.addEventListener("mouseover", (e) => {
    // retrieve the color value of the target
    let color = e.target.style.background;

    // display the color value in the predefined container
    containerDisplay.style.color = color;
    containerDisplay.innerHTML = `This color <br/>${color}`;
});