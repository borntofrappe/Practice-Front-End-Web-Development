/* script logic
- set up the canvas
- handle click and touch events to draw in the canvas following user input
- consider the color buttons and change the color of the canvas to match the selection
- consider the tools button and clear the canvas
*/

// CANVAS SETUP
// target the canvas element
const canvas = document.querySelector('canvas');
// retrieve the context
const context = canvas.getContext('2d');

// create a function to change the original size of the canvas
function fitCanvas() {
  // cap the width to a sizeable measure
  canvas.width = (window.innerWidth >= 700) ? 700 : window.innerWidth * 0.8;
  canvas.height = canvas.width * 0.6;
}
// immediately call the function
fitCanvas();
// attach the fitCanvas function to a resize event on the window
window.addEventListener('resize', fitCanvas);


// CANVAS DRAWING
/* create variables to
- check if the cursor is down on the canvas
- keep track of the last horizontal and vertical coordinates
- specify default values for the hue, saturation and stroke width
*/
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let saturation = 50;
let lineWidth = 20;

// create a function to draw in the canvas following the horizontal and vertical coordinates
// function called in response to the touchmove and mousemove events
function draw(e) {
  // draw only if the cursor is down on the canvas
  if (isDrawing) {
    // set basic settings for the path
    context.strokeStyle = `hsla(${hue}, ${saturation}%, 60%)`;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // begin drawing a path, from the last recorded coordinates to the new values
    context.beginPath();
    context.moveTo(lastX, lastY);

    // the current values are retrieved from the touchmove or mousemove event
    let currentX;
    let currentY;
    // touchmove: the coordinates are found in the e.touches array
    if (e.touches) {
      currentX = e.touches[0].pageX - canvas.offsetLeft;
      currentY = e.touches[0].pageY - canvas.offsetTop;
    } else {
      // mousemove: the coordinates are found directly on the event
      currentX = e.pageX - canvas.offsetLeft;
      currentY = e.pageY - canvas.offsetTop;
    }
    context.lineTo(currentX, currentY);
    context.stroke();

    // update the coordinates to the current points
    [lastX, lastY] = [currentX, currentY];

    // decrease the saturation and the line width
    saturation -= 0.3;
    lineWidth -= 0.8;
    // reaching a small size, remove the event listeners to stop drawing
    // this to make up a paint brush drying up
    if (lineWidth <= 5) {
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('touchmove', draw);
    }
  }
}
// create a function to start listening for the touchmove/mousemove events
// function called in response to the touchstart and mousedown events
function prepareDrawing(e) {
  // retrieve the current coordinates, from the touchmove or mousemove events
  // attach also these events to the canvas
  let currentX;
  let currentY;
  if (e.touches) {
    [currentX, currentY] = [e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop];
    canvas.addEventListener('touchmove', draw);
  } else {
    [currentX, currentY] = [e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop];
    canvas.addEventListener('mousemove', draw);
  }

  // update the last coordinates and set the variables to start drawing
  [lastX, lastY] = [currentX, currentY];
  isDrawing = true;
  // reset the width and saturation
  lineWidth = 20;
  saturation = 50;
}

// on mouseup, mouseleave and touchend set the boolean to false, as to stop drawing following the touchmove/mousemove events
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);

// on touchstart and mousedown call the function to prepare drawing (setting the boolean to true and retrieving horizontal and vertical coordinates)
canvas.addEventListener('touchstart', prepareDrawing);
canvas.addEventListener('mousedown', prepareDrawing);


// COLOR BUTTONS
const buttonColors = document.querySelectorAll('.container__colors button');
function changeHue(e) {
  // retrieve the hue from the data-hue attibute
  const dataHue = parseInt(e.target.getAttribute('data-hue'), 10);
  // change the hue to the selected value
  hue = dataHue;

  // loop through all button elements removing the class of .selection and adding it back only on the selected button
  buttonColors.forEach(buttonColor => buttonColor.classList.remove('selection'));
  e.target.classList.add('selection');
}
buttonColors.forEach(buttonColor => buttonColor.addEventListener('click', changeHue));


// BUTTON TOOLS
// create a function to clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
// listen for a click event on the button, at which point clear the cavas
const buttonClear = document.querySelector('.container__tools button');
buttonClear.addEventListener('click', clearCanvas);
