/* target the svg usued for the signature and the button with the page's functionality
 add a click event listener, following which generate the signature in the viewbox
*/
const svgFrame = document.querySelector("svg");

const btn = document.querySelector("button");
btn.addEventListener("click", handleClick);

// initialize a variable for the length of the signature, which can be updated with the input of type range
let signatureLength = 150;

const inputRange = document.querySelector("input[type='range']");
inputRange.addEventListener("change", handleChange);

function handleChange(e) {
  // e.target.value returns an integer between 100 and 200
  // this describes exactly the range wanted for the signature
  // update the variable with the new value
  signatureLength = e.target.value;
  console.log(signatureLength);
}


function handleClick() {
  /* upon hitting the "generate signature" button, the following procedure enabled
  - remove existing elements from the SVG, starting with a clean slate
  - call a function which generates a random string for the **d** attribute of the path element
  - create a path element with the generated **d** attribute
  - update the properties of stroke-dasharray, stroke-dashoffset and animation duration to accommodate for the length of the path's stroke  
  - append the path element to the SVG, with a class which triggers the animation

  randomness is included 
  - in the initial position of the signature
  - in the position of each subsequent command in the d element

  input values are included
  - to specify the length of the svg stroke

  The syntax behind arc commands allow to easily retrieve the length of the stroke, so to continue adding arc elements until an arbitrary threshold is met

  using a absolute command (upper case A) allows to include an arc in the defined svg canvas (there might still be some cropping due to the arc extending the canvas to reach a point within the canvas)
  */


  // call a function to restore the SVG as included in the HTML document
  cleanSVG();

  // call a function which generates a random series of commands for the path element
  // the function returns a string which is used in the d attribute of a path element
  let pathAttribute = generatePathAttribute();

  // call a function which creates the SVG element according to the generated attribute
  let pathElement = generatePathElement(pathAttribute);
  
  // call a function which updates the CSS variables depending on the length of the SVG stroke
  updateVariables(pathElement);

  // call a function which appends the path element to the SVG frame
  appendElement(pathElement);

}


// create a function which includes in the SVG element only the nested element specified in the HTML markup
function cleanSVG() {
  svgFrame.innerHTML = 
  `
  <line x1="2" y1="50" x2="98" y2="50" stroke="white" stroke-width="1.5px"/>
  `;
}

// create a function which creates a string for the **d** attribute, made out of arc commands and some degree of randomness
function generatePathAttribute() {
  // begin from a random point in the svg canvas
  let xBegin = randomInRange(10,91);
  let yBegin = randomInRange(5, 46);
  let dAttribute = `M ${xBegin} ${yBegin}`;

  // from the beginning point, create arc elements until the lenght of the arc elements is less than the signature length, continue appending arc elements
  let length = 0;

  while(length < signatureLength) {    
    /*
    while the length is less than the arbitrary value 
    - compute a new point in which the arc ends
    - compute the distance as the hypotenuse of the triangle connecting the new and previous point
    - include this distance as the radius of the arcs
    - increment the length by the same distance value 
    */
    let xCoor = randomInRange(10,91);
    let yCoor = randomInRange(5, 46);

    let distance = Math.sqrt(Math.pow((xCoor - xBegin), 2) + Math.pow((yCoor - yBegin), 2));
    xBegin = xCoor;
    yBegin = yCoor;
    dAttribute += `A ${distance} ${distance} 0 0 0 ${xCoor} ${yCoor}`;
    length += distance;
  }

  // return the string making up the **d** attribute
  return `${dAttribute}`;
}

// create a function which creates the path element with the generated **d** attribute
function generatePathElement(d) {
  // when creating an SVG element from JS, use the createElementNS() function 
  // this accept two arguments
  // "http://www.w3.org/2000/svg" and the element to be included
  let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // include attributes for the **d** attribute, the fill and the stroke
  pathElement.setAttribute("d", d);
  pathElement.setAttribute("fill", "none");
  pathElement.setAttribute("stroke", "white");
  pathElement.setAttribute("stroke-width", "2px");
  // return the element
  return pathElement;
}

// create a function which updates the CSS variables, considering the values of the path element
function updateVariables(element) {
  // retrieve the length of the path element
  let length = element.getTotalLength();

  // update the variables for the values of stroke-dasharray and stroke-dashoffset to match the length of the path element
  element.style.setProperty("--dasharray", length);
  element.style.setProperty("--dashoffset", length);
  element.style.setProperty("--animation-duration", `1s`);

  // include stroke-dasharray and stroke-dashoffset attributes for the path element (which is to be animated from the value specified by the length to 0)
  element.setAttribute("stroke-dasharray", length);
  element.setAttribute("stroke-dashoffset", length);
}

// create a function which appends the element to the SVG frame, after adding the class which animates the path element
function appendElement(element) {
  element.setAttribute("class", "animation");
  svgFrame.appendChild(element);
}


// create a function which generates a random number, between a range which is delimited by the arguments of the function
function randomInRange(min, max) {
  // the function returns a random number between min and max
  // max excluded
  return Math.floor(Math.random() * (max-min)) + min;
}