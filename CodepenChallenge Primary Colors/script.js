// select the SVG container and the three initial circles
const svg = document.querySelector('svg');
// circles now refers to only the three initial circles
// any event listener attached to this node list won't be extended to new circle elements (exactly as intended)
const circles = document.querySelectorAll('svg circle');
// variable keeping track of the mousedown event on new circle elements, to move them only as the cursor is down
let isSelected = false;

// variable storing a selection of blend modes (only those which show some nice effect)
const blendModes = [
  'normal',
  'multiply',
  // 'screen',
  // 'overlay',
  'darken',
  // 'lighten',
  // 'color-dodge',
  // 'color-burn',
  'hard-light',
  // 'soft-light',
  'difference',
  'exclusion',
  // 'hue',
  // 'saturation',
  // 'color',
  'luminosity'
];
// variable storing the blend mode used when creating new circle elements (and to update existing ones)
let selectedBlendMode = 'normal';

// select the details element nesting the blend modes and append a simple structure to show the blend moeds and a simple summary
const details = document.querySelector('details.blend-mode');
/* structure of the input elements:
div
  label
  input (of type radio)

all input sharing the same name
*/
const radioInputs = blendModes.map(blendMode => `
  <div class="radio">
    <label for=${blendMode}>${blendMode}</label>
    <input
      ${blendMode === selectedBlendMode && 'checked'}
      type="radio"
      name="blend-mode"
      value=${blendMode}
      id=${blendMode}
    />
  </div>
  `).join('');

details.innerHTML = `
  ${radioInputs}
  <summary>Change blend mode</summary>
`;

// function called in response to an input event, on the details element
// the event bubbles up from the input of type radio, even if are added later on
function handleInput(e) {
  // retrieve the value from the input element
  const { value } = e.target;
  // select all circle elements, new and old ones, but apply the blend mode to the new ones only
  const allCircles = document.querySelectorAll('svg circle');
  [...allCircles].slice(3).forEach((circle) => { circle.style.mixBlendMode = value; });
  // change the selectedBlendMode to match, as to update new circles with the same value
  selectedBlendMode = value;
}

details.addEventListener('input', handleInput);


// function called in response to the mousemove event, attached to only new circle elements as to move them
function moveCircle(e) {
  // check the boolean to see if the cursor is down on the circle element, and exit the function otherwise
  if (!isSelected) {
    return false;
  }
  // prevent default dragging behavior
  e.preventDefault();

  // take the element and append it at the bottom of the SVG (rising the selected circle atop the other ones and avoiding z-index conflicts)
  this.parentNode.appendChild(this);

  // create a point to find the precise coordinates of the cursor, within the boundaries of the SVG
  const point = svg.createSVGPoint();
  // add the coordinates of the cursor
  // ! e might provide the coordiantes in the e.touches array if the function is fired from a touch event
  if (e.touches) {
    point.x = e.touches[0].clientX;
    point.y = e.touches[0].clientY;
  } else {
    point.x = e.clientX;
    point.y = e.clientY;
  }
  // transform the coordinates from px values in the page to SVG coordinates (in the 0-100 range of the viewBox)
  const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
  // move the circle to match the coordinates
  this.setAttribute('cx', svgPoint.x);
  this.setAttribute('cy', svgPoint.y);
}

// function called in response to a mousedown event, attached to existing circle elements, and only those
function createCircle() {
  // retrieve the basic structure of the cirlce element
  const cx = this.getAttribute('cx');
  const cy = this.getAttribute('cy');
  const r = this.getAttribute('r');
  const fill = this.getAttribute('fill');

  // create a new circle element with the same values, except a larger radius
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', r * 1.35);
  circle.setAttribute('fill', fill);
  // add the blend mode as stored in the global variable
  circle.style.mixBlendMode = selectedBlendMode;

  // set is selected to true, to immediately allow to move the new circle away
  isSelected = true;
  // add the event listeners to the newly minted circle
  circle.addEventListener('mousemove', moveCircle);
  circle.addEventListener('mousedown', () => { isSelected = true; });
  circle.addEventListener('mouseup', () => { isSelected = false; });
  circle.addEventListener('mouseout', () => { isSelected = false; });


  // for mobile devices, add similar event listeners for touch events
  circle.addEventListener('touchmove', moveCircle);
  circle.addEventListener('touchstart', () => { isSelected = true; });
  circle.addEventListener('touchend', () => { isSelected = false; });


  // append the circle element to the SVG container
  svg.appendChild(circle);
}

// listen for a mousedown event on the existing circles, calling the function to create the new droplet
circles.forEach(circle => circle.addEventListener('mousedown', createCircle));


// target the button used to save the SVG (of the work, excluding the existing elements which are nested in a <g> element)
const button = document.querySelector('button');

// function considering the HTML of the SVG and allowing the user to save an SVG file with a copy of the work
function handleClick() {
  // retrieve the HTML structure
  const { outerHTML } = svg;
  // as to create a valid string to inject in a data URI, remove new lines, tabs and white space between characters
  const droplet = outerHTML
    .replace(/[\n\t]/gi, '')
    .replace(/>\s+</gi, '><')
    // remove also the SVG elements nested in the first group element (which nests default path and circle elements)
    .replace(/<g>.+<\/g>/gi, '');

  // ! save the image only if the work contains a circle element
  // else notify the user through the a pseudo element
  if (/circle/.test(droplet)) {
    // create the data URI
    const href = `data:image/svg+xml;utf8,${droplet}`;
    // create an anchor link element and add as reference the specified string
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'droplet');
    // programmatically click the link downloading the file
    link.click();
  } else {
    button.classList.add('empty');
  }
}

// attach a click event listener to the button, calling the prescribed function
button.addEventListener('click', handleClick);
