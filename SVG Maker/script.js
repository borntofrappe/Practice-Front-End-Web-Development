/* necessary elements
- the SVG used as a canvas (to alter its structure and listen to click events)
! as it stands, the project heavily relies on a cursor
- buttons allowing to change the shape to be drawn
- buttons allowing to alter the canvas as a whole
! as it stands, there is only one of this global buttons
- input of type color to change the color used in the application
*/
const svgCanvas = document.querySelector('svg.maker__canvas');
const buttonTools = document.querySelectorAll('button.tool');
const buttonGlobals = document.querySelectorAll('button.global');
const inputColor = document.querySelector('input[type="color"]');

/* global variables
- two variables to keep track of the original position the cursor has in the SVG (to draw the shapes from this coordinate to the new one found in the mouse event)
- one variable to keep track of the color
- one boolean to allow mousemove events to draw a shape only when following the mousedown event
- one string to keep track of the shape to be drawn
*/
let startingX = 0;
let startingY = 0;
let startingColor = '#8be8dd';
let isDrawing = false;
let tool = 'line';

// essential utility function for the coordiante system, receiving as arguments the position of the cursor (clientX and clientY) as well as the svg element
// creating a point within the coordinate system of the SVG (in the 100x100 determined by the viewBox)
function getSVGPoint(x, y, svg) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

/* TOOLS */
// function called in response to a click event on one of the tools-buttons
// applying a class of active to the clicked button and updating the global tool with the value described in the equipped data attribute
function handleTool(e) {
  buttonTools.forEach(buttonTool => (buttonTool === this ? buttonTool.classList.add('active') : buttonTool.classList.remove('active')));
  tool = this.getAttribute('data-tool');
}
// fire the function whenever clicking on one of the prescribed buttons
buttonTools.forEach(buttonTool => buttonTool.addEventListener('click', handleTool));

/* SVG CANVAS */
// function called when the mousedown event is registered on the SVG
function prepareCanvas(e) {
  // set the boolean to true, as to allow the mousemove event to draw the approriate shape
  isDrawing = true;
  // update the starting values with the position of the cursor
  const { clientX, clientY } = e;
  const { x, y } = getSVGPoint(clientX, clientY, svgCanvas);
  startingX = x;
  startingY = y;

  // depending on the selected tool, add a line/rect/circle element to the SVG
  // ! x and y are not given by default to the rectangle as these might be updated with the values retrieved from the mousemove event
  // otherwise there's a risk to have width/height with a negative value
  switch (tool) {
    case 'line':
      svgCanvas.innerHTML += `<line x1=${startingX} y1=${startingY} />`;
      break;
    case 'rect':
      svgCanvas.innerHTML += '<rect />';
      break;
    case 'circle':
      svgCanvas.innerHTML += `<circle cx=${startingX} cy=${startingY} />`;
      break;
    default:
      return false;
  }
}

/* functions to draw the different shapes, according to the position of the cursor and the selected mode
currently
- line
- rect
- circle

each function selects the **last** element included in the SVG and changes its attribute according to the original/current position of the cursor
*/

// draw the line **to** the current coordinate (x1 and y1 are already established when creating the line)
function drawLine(x, y) {
  const lines = svgCanvas.querySelectorAll('line');
  const line = lines[lines.length - 1];
  line.setAttribute('x2', x);
  line.setAttribute('y2', y);
  line.setAttribute('stroke', startingColor);
  line.setAttribute('stroke-width', 2);
}

// draw the rectangle **from** the smallest value between original and current position (as to avoid negative values)
// width a width/height determined by the difference between the two
function drawRect(x, y) {
  const [minX, maxX] = [x, startingX].sort((a, b) => (a > b ? 1 : -1));
  const [minY, maxY] = [y, startingY].sort((a, b) => (a > b ? 1 : -1));

  const rects = svgCanvas.querySelectorAll('rect');
  const rect = rects[rects.length - 1];
  rect.setAttribute('x', minX);
  rect.setAttribute('y', minY);
  rect.setAttribute('width', maxX - minX);
  rect.setAttribute('height', maxY - minY);
  rect.setAttribute('fill', startingColor);
}

// draw the circle from the original coordinate altering only the radius, with the difference between the maximum and minimum value
// use currently the change in the horizontal coordinate
function drawCircle(x, y) {
  const [minX, maxX] = [x, startingX].sort((a, b) => (a > b ? 1 : -1));

  const circles = svgCanvas.querySelectorAll('circle');
  const circle = circles[circles.length - 1];
  circle.setAttribute('r', maxX - minX);
  circle.setAttribute('fill', startingColor);
}

// function called in response to the mousemove event on the SVG
// retrieve the coordinates of the cursor and call the function matching the currently selected mode
function drawCanvas(e) {
  if (isDrawing) {
    const { clientX, clientY } = e;
    const { x, y } = getSVGPoint(clientX, clientY, svgCanvas);
    switch (tool) {
      case 'line':
        drawLine(x, y);
        break;
      case 'rect':
        drawRect(x, y);
        break;
      case 'circle':
        drawCircle(x, y);
        break;
      default:
        return false;
    }
  }
}

// register the necessary events on the SVG
svgCanvas.addEventListener('mousemove', drawCanvas);
svgCanvas.addEventListener('mousedown', prepareCanvas);
svgCanvas.addEventListener('mouseup', () => { isDrawing = false; });
svgCanvas.addEventListener('mouseout', () => { isDrawing = false; });

/* GLOBALS */
// function fired in response to the input event on the input of type color
// retrieve the value and update the starting color as well as the custom properties used in the stylesheet
function handleInput() {
  const { value } = this;
  startingColor = value;
  document.documentElement.style.setProperty('--accent', value);
}

// function fired in response to a click event on the globals button
// ! currently, there exist only one
function handleGlobal() {
  const global = this.getAttribute('data-global');
  switch (global) {
    // if clear, empty the SVG element of all the nested shapes
    case 'clear':
      svgCanvas.innerHTML = '';
      break;
    default:
      return false;
  }
}

// register the events on the input of type color and the other globals button
// ! currently only one global button, so the .forEach() method is a bit of an overkill
inputColor.addEventListener('input', handleInput);
buttonGlobals.forEach(buttonGlobal => buttonGlobal.addEventListener('click', handleGlobal));
