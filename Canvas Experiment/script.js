// target the canvas element
const canvas = document.querySelector('canvas');
// retrieve the context
const context = canvas.getContext('2d');

// create coordinates as an array of objects
let coordinates = [];

// set default values for the color and width of the line
// detail a couple of variables for the color and size of the stroke
let color = 'hsl(0, 50%, 50%)';
const size = '8';

/* every time a mousedown event occurs, add an object of the type
{
	x,
	y
}
detailing the coordinates in arrays

every time the mousemove event occurs, push the coordinates in the last object
then call a function to loop through the array and for every set of coordinates draw a path
*/

/* event listeners:
window: on resize update the width and height of the canvas (although this doesn't affect the actual drawing)
button: on click clear the canvas
canvas:
	- mousedown allow drawing (set boolean to track the movement of the cursor, create a new object in the array)
	- mousemove draw (keeping track of the cursor coordinates)
	- mouseup and mouseleave stop drawing
*/
// create a function to change the original size of the canvas
function fitCanvas() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.75;
}
// immediately call the function and attach it to a resize event on the window
fitCanvas();
window.addEventListener('resize', fitCanvas);

// listen for a click event on the button, at which point clear the cavas
const button = document.querySelector('button');
button.addEventListener('click', clearCanvas);

// create a function to clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // set the coordinate array back to its original state
  coordinates = [];
}

// set a boolean to keep track of whether the cursor is down or not
let isDrawing = false;

// on mouseup set the boolean back to its original position
canvas.addEventListener('mouseup', () => isDrawing = false);
// on mouseleave also set the boolean back
canvas.addEventListener('mouseleave', () => isDrawing = false);
// on mousedown call a function to set the boolean to true and add an object to the coordinates array
canvas.addEventListener('mousedown', prepareDrawing);
// on mousemove call a function to check if the boolean is true and then (and only then) track the cursor's movements
canvas.addEventListener('mousemove', draw);

// create a function called in response to the mousedown event
function prepareDrawing() {
  const set = {
    x: [],
    y: []
  };
  coordinates.push(set);
  isDrawing = true;
}

// create a function called in response to the mousemove event
function draw(event) {
  if (isDrawing) {
    // retrieve the coordinates of the cursor
    const xCoor = event.pageX - canvas.offsetLeft;
    const yCoor = event.pageY - canvas.offsetTop;

    // push the x and y coordinates in the last object of the coordinates array
    const last = coordinates.length - 1;
    coordinates[last].x.push(xCoor);
    coordinates[last].y.push(yCoor);
    // call a function drawing a path with the values described in the object
    drawCanvas();
  }
}

// create a function considering the coordinates found in the coordinates array and drawing a path for each set of arrays
function drawCanvas() {
  // set the stroke color, size and line join
  context.strokeStyle = color;
  context.lineWidth = size;
  context.lineJoin = 'round';

  // clear the previous canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // looop through each array's item
  for (set of coordinates) {
    context.beginPath();
    // move to the first coordinates
    context.moveTo(set.x[0], set.y[0]);
    // consider all the values of each set of coordinates
    for (index in set.x) {
      // set a color
      color = `hsl(${index}, 50%, 50%)`;
      context.strokeStyle = color;
      // update the custom variable to match
      document.documentElement.style.setProperty('--color-theme', color);

      context.lineTo(set.x[index], set.y[index]);
    }
    context.stroke();
  }
}
