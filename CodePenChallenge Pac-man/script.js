// store in an array the possible colors of the ghosts: clyde, blinky, inky, pinky
const ghostHue = ['#ffa003','#fe2502','#05dade','#fdb3b0'];
  
// target the root element, to update the CSS variables for colors and coordinates
const root = document.querySelector(':root');
// target the ghost div container
const ghost = document.querySelector('.ghost');

// trigger a toggleGhost() function in response to a click event on the light switch
const lightSwitch = document.querySelector('.light-switch');
lightSwitch.addEventListener('click', toggleGhost);

/*
the toggleGhost function
1. changes the color of the ghost
1. changes the coordinates of the ghost
*/

// create a function to apply a random color to the .ghost container
function changeGhostHue() {
  // create a random number between 0 and 3
  const randomDigit = Math.floor(Math.random()*4);
  // change the variable for the color of the ghost, to one of the values of the array
  root.style.setProperty('--ghost-color', ghostHue[randomDigit]);
}

// create a function to apply random coordinates to the .ghost container
/* coordinates in the following ranges
  x-axis: [15-75]vw 
  y-axis: [20-50]vh
*/
function changeGhostCoord() {
  /* 
  create random integers in the defined ranges
  remember to include the unit of measure to correctly change the CSS variable
  */
  const randomDigitX = Math.floor(Math.random()*61) + 15;
  const randomDigitY = Math.floor(Math.random()*31) + 20;

  // concatenate the integer in a string for the correct format
  const xAxisCoor = randomDigitX + 'vw';
  const yAxisCoor = randomDigitY + 'vh';

  /* update the respective variables with the newfound values */
  root.style.setProperty('--x-axis-coordinate', xAxisCoor);
  root.style.setProperty('--y-axis-coordinate', yAxisCoor);  
}

// create a function to toggle the visibility of the ghost container and also change its color upon appearing
function toggleGhost() {  
  if(ghost.style.opacity == 1) {
    // hide the ghost element
    ghost.style.opacity = 0;
    // change the color of the light switch as to make it evidently active
    root.style.setProperty('--light-switch-color', "#5892ff");
  }
  else {
    // change color of the element through the defined function
    changeGhostHue();    
    // change coordinates of the element through the defined function
    changeGhostCoord();
    // change the color of the light switch back to its default hue
    root.style.setProperty('--light-switch-color', "#eee");
    // display the ghost div element (opacity is transitioned as per the CSS property)
    ghost.style.opacity = 1;
  }

}
  
// call the function immediately as the page first loads
toggleGhost();


// to animate the eyes toward the mouse pointer listen for a mousemove event on the window
window.addEventListener('mousemove', moveIris);

/* values of interest are:
- event.x and event.y, as these express the coordinates of the mouse pointer
- window.innerWidth and window.innerHeight, as these describe the size of the window

simply divide the coordinates by the window's sizes and normalize this value to the range of accepted values

for the left property: [0-11px]
for the top property: [0-17px]
*/
function moveIris(event) {
    let xCoor = Math.floor(event.x/window.innerWidth*12) + 'px';
    let yCoor = Math.floor(event.y/window.innerHeight*18) + 'px';

    // update the variables with the correct unit of measure
    root.style.setProperty('--x-axis-coordinate-iris', xCoor);
    root.style.setProperty('--y-axis-coordinate-iris', yCoor);
}