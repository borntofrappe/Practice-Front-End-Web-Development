// target the SVG used as cursor
const cursor = document.querySelector("svg#cursor");

// target the container element (to later retrieve and update the CSS variable it stores)
const container = document.querySelector(".container");

// target the SVG making up the clay target
const clayTarget = document.querySelector("svg#clay-target");

// call a function which positions the clay target and returns the x and y coordinates
let coordinates = positionTarget();
// pull the target, moving it into the screen depending on the value of the origial coordinates
pullTarget(coordinates);


// initialize score to 0
let score = 0;


// listen to a mousemove event on the entire window, at which point call a function which updates the position of the made-up cursor
window.addEventListener("mousemove", trackMovement);

function trackMovement(e) {
    // update the position of the made-up cursor according to the coordinates of the hidden mouse pointer
    // small caveat: the SVG is drawn from the origin (0,0) set in the top left corner, so the coordinates e.clientX and e.clientY are off by half of the width and half of the height of the SVG
    // luckily, the size of the SVG is known to be 50. As this might be later modified, it is more easy to include the sizes with the .clientWidth and .clientHeight properties
    cursor.style.left = `${e.clientX - cursor.clientWidth / 2}px`;
    cursor.style.top = `${e.clientY - cursor.clientHeight / 2}px`;
}

// listen to a click event on the same window, at which point call a function to pull the trigger
window.addEventListener("click", pullTrigger);

function pullTrigger(e) {
    // target the animation of the SVG making up the mouse cursor and let it run
    const animationShoot = document.querySelector("#shoot");
    animationShoot.beginElement();

    // store in a variable the name of the target of the click event 
    // this can be 'div', 'h1', 'ellipse' depending on the interacting element
    let target = e.target.localName;

    switch(e.target.localName) {
        // if the interacting element is the header, increment the score by one and remove the header out of sight
        case 'h1':
        case 'p':
            incrementScore();
            hideElement(e.target);
            break;
        // if the element is the SVG shape, increment the score and start a new round of animation
        case 'ellipse':
            incrementScore();

            // remove the target from view
            hideElement(clayTarget);
            // wait a second or two before showing the target again
            let randomWait = (Math.random() * 3 + 1) * 1000;
            let timeoutID = setTimeout(function() {
                showElement(clayTarget);
                clearTimeout(timeoutID);
            }, randomWait);
            break;
    }
}

// create a function which increments the score variable (variable which needs to be initialized)
function incrementScore() {
    score++;
    // update the CSS variables, keeping in mind that the content property requires a value in between quotes
    container.style.setProperty("--score", `'${score}'`);   
} 

// create a function which hides the header element as it is clicked
function hideElement(element) {
    element.style.display = "none";
}
function showElement(element) {
    element.style.display = "inline-block";
}


// create a function to randomly position the SVG making up the clay target, below the fold
function positionTarget() {
    // initialize x and y coordinates for the clay target
    // horizontally, the element changes through the property of left
    // horizontal range: -20%, 120%
    let xCoor = Math.floor(Math.random() * 141) - 20;
    // vertically, the element sticks below the fold with the bottom property, but within a range as well
    // vertical range: -20%, -40%
    let yCoor = Math.floor(Math.random() * (-21)) - 20;

    clayTarget.style.left = `${xCoor}%`;
    clayTarget.style.bottom = `${yCoor}%`;

    // return the coordinatee, used to animate the clay target 
    let coords = [xCoor, yCoor];
    return coords;
}

// create a function to animate the clay target into view
function pullTarget(coords) {
    // starting from the defined left abd bottom properties, move the clay target on the page
    let left = coords[0];
    let bottom = coords[1];

    // define a boolean to either move the element right or left, depending on where the element lies in the beginning
    let pullRight = (left <= 50);
    // define random integers to translate the element with some degree of randomness
    let randomLeft = Math.floor(Math.random()) + 1;
    let randomBottom = Math.floor(Math.random()) + 1;

    let intervalID = setInterval(function() {
        if(pullRight) {
            left += randomLeft;
        }
        else {
            left -= randomLeft;
        }
        bottom += randomBottom;

        clayTarget.style.left = `${left}%`;
        clayTarget.style.bottom = `${bottom}%`;

        if(left >= 100 || left <= -10 || bottom >= 100) {
            let coords = positionTarget();
            pullTarget(coords);
            clearInterval(intervalID);
        }
    }, 40);

}
