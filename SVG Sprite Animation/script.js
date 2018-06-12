// target the div which displays (a portion of) the SVG
const sprite = document.querySelector(".container .sprite");

// listen for a keydown event on the window, at which point call a function to potentially "move" the graphic
window.addEventListener("keydown", handleKeyDown);

// create a variable to store the key pressed, to allow for the following behavior
// if the new key pressed matches the old one, move the div nesting the character
// if it does not, change the direction of the character toward the new angle, without moving it
// 40 as the sprite is shown facing down by default
let keyPressed = 40;

// create a function which handles the keydown event
function handleKeyDown(e) {
    /* 
    e.keyCode returns the key pressed
    37 left arrow
    38 up arrow
    39 right arrow
    40 bottom arrow    
    */
   // if one of the arrow key is pressed, proceed to handle the change in the sprite (movement or direction)
   if(e.keyCode >= 37 && e.keyCode <= 40) {
       // call a function to handle the movement
       // this intermediary step is useful to later call the same function when a button of the gamepad is pressed
       handleMovement(e.keyCode);
   }
}
function handleMovement(code) {
    // if one of the arrows is clicked, check to see if the key pressed matches the previous one
    if(code == keyPressed) {
        // if it does, move the character
        moveCharacter(keyPressed);
     }
     else {
         // if it doesn't, store in the variable which keeps track of the key pressed the new code
         // change the orientation of the character
         keyPressed = code;
         orientCharacter(keyPressed);
    }
}

// define variables used in the movement of the div 
// movement to increase/decrese the horizontal/ vertical coordinate
// xMovement and yMovement to keep track and update the coordinates
let movement = 25,
    xMovement = 0,
    yMovement = 0;

// create a function which moves the character toward the direction of the pressed key
function moveCharacter(arrow) {
    switch(arrow) {
        case 37:
            // left arrow key - move to the left, with a negative x translation
            xMovement -= movement;
            break;
        
        case 38:
            // up arrow key - move to the top, with a negative y translation
            yMovement -= movement;
            break;

        case 39:
            // right arrow key - positive x translation
            xMovement += movement;
            break;

        case 40:
            // bottom arrow key - positive y translation
            yMovement += movement;
            break;
    }
    // call a function which visually moves the sprite, changing its appearance for a brief movement to visualize a moving stance
    moveSprite(arrow);
    // move the sprite according to the translated values of the x and y coordinates
    sprite.style.transform = `translateX(${xMovement}px) translateY(${yMovement}px)`;
}

// create a function which points the character toward the direction of the pressed key
function orientCharacter(arrow) {
    console.log(arrow);
    switch(arrow) {
        case 37:
            // left arrow key - background-position-y 400
            // see comment in the styl stylesheet for the list of values matching the different sprites
            sprite.style.backgroundPositionY = "400px";
            break;
        
        case 38:
            // up arrow key - background-position-y 200
            sprite.style.backgroundPositionY = "200px";
            break;

        case 39:
            // right arrow key - background-position-y 300
            sprite.style.backgroundPositionY = "300px";
            break;

        case 40:
            // bottom arrow key - background-position-y 100
            sprite.style.backgroundPositionY = "100px";
            break;
    }
}


// create a variable used to alternate the vertical movement between one of two stances, based on the previous instance
// simply put: when moving downward, the character alternates between using the left and right foot 
// use this variable to alternatively include the different sprites
let keepGoing = true;

// create a function which changes the displayed sprite for a brief moment, before returning to the value described by the direction it had in the first place
function moveSprite(arrow) {
    // store in a variable the direction, assigned depending on the arrow being pressed
    let direction = 600;
    switch(arrow) {
        case 37:
            // left arrow key - background-position-y 700
            direction = 700;
            break;
        
        case 38:
            // up arrow key - background-position-y 900 and 1000
            direction = keepGoing ? 900 : 1000;
            keepGoing = !keepGoing;
            break;

        case 39:
            // right arrow key - background-position-y 800
            direction = 800;            
            break;

        case 40:
            // bottom arrow key - background-position-y 500 and 600
            // assign 500/600 depending on the true/false nature of the variable
            direction = keepGoing ? 500 : 600;
            // flip the variable from true to false or viceverse
            keepGoing = !keepGoing;
            break;
    }

    // store in a variable the background position of the sprite
    let previousPosition = sprite.style.backgroundPositionY;
    // alter the background position with the value described by the arrow clicked
    sprite.style.backgroundPositionY = `${direction}px`;
    // after a brief timeout, restore the background position to the stored value
    let timeoutID = setTimeout(function() {
        sprite.style.backgroundPositionY = previousPosition;
        clearTimeout(timeoutID);
    }, 150);
}


/*
 FOR THE GAMEPAD AND ITS BUTTONS  
*/
// listen for a click on the toggle button, at which point toggle the button's menu
const toggleController = document.querySelector(".controller--toggle");
const controller = document.querySelector(".controller--pad");


toggleController.addEventListener("click", togglePanel);

function togglePanel() {
    controller.classList.toggle("default");
}


// listen for a click on all buttons, at which point move/orient the character according to which button is pressed and according to the assumptions set by the behavior specified for the keydown event 
const controllerArrows = document.querySelectorAll(".pad--arrow");
controllerArrows.forEach(controllerArrow => controllerArrow.addEventListener("click", handleClick));

// create a function which considers the button pressed and dispatches the appropriate function
function handleClick(e) {
    // store in a variable the second class of the pressed button (which can be arrow--top or right, down, center)
    let arrowPressed = e.target.classList[1];
    // depending on the class identifier, handle the movement like you would for the key strokes
    switch(arrowPressed) {
        case 'arrow--up':
            handleMovement(38);
            break;
        case 'arrow--right':
            handleMovement(39);
            break;
        case 'arrow--down':
            handleMovement(40);
            break;
        case 'arrow--left':
            handleMovement(37);
            break;
    }
}