/** Target
 * the input[type="range"], which triggers modifications based on its value
 * the label, to be altered in text
 * the ellipse making up the mouth of the simple SVG asset (the last ellipse)
 * the circle elements making up the eyes (the circles with no stroke)
 * 
 * yes, I could have added classes to the SVG elements to target them with precision, but it was a change to experiment with querySelector and the values it can accept (turns out it's quite a few of them)
 */

const inputRange = document.querySelector("input[type='range']");
const label = document.querySelector("label");
const ellipseMouth = document.querySelector("svg ellipse:last-of-type");
const circleEyes = document.querySelectorAll("svg circle[stroke='none']");


// add two even listers an the ranges 
// change event, when a new value is selected in the input
inputRange.addEventListener("change", handleChange);

// mousemove, to also listen for a change in value as the cursor is moving the thumb of the input
// caveat: mousemove is fired even if the cursor is not actually dragging the thumb
// it is fired as soon as the mouse hovers on the element
// it is possible to safeguard against such an occurrence by analysing the event returned from the listener
inputRange.addEventListener("mousemove", handleMove);

// create a function which handles the mousemove event
function handleMove(e) {
  // e.buttons is a read-only property indicating which button is pressed
  // 1 == primary button 
  if(e.buttons == 1) {
    // call the handleChange function, as if a new value is set
    // remember to pass in as argument the event itself
    handleChange(e);
  }
}

// create a function which handles changes in value
function handleChange(e) {
  // e.target.value returns the value of the input
  // console.log(e.target.value);

  /* as the value of the input is updated, few modifications are included in the DOM: 
  - the word "long" is elongated with more and more letter 'o'
  - the ellipse makin up the mouth of the makeshift icon is increased in radius
  - the circle elements making up the eyes of the same face are increased in values
  
  to accommodate such modifications, all that is required is a conversion of the value obtained from the event
  input range: 0-100
  the range needs to be normalized for each separate value
  */
  // value range: 0-100
  let value = e.target.value;
  // letter o range: 1-11
  let extraLetter = value / 10 + 1;
  // ellipse ry radius range: 1-11
  let ellipseRadiusY = value / 10 + 1;
  // ellipse stroke-width range: 1.5-2.5
  let ellipseStrokeWidth = value / 100 + 1.5;
  // circle radius range: 3-5
  let circleRadius = value / 50 + 3;

  // repeat as many letter o through the .repeat() function, passing as argument the integer for which the string is repeated
  let letterO = "o".repeat(extraLetter);
  // include the string "this long" with however many o the value implies 
  label.textContent = `this l${letterO}ng`;

  // change the attributes of the SVG elements with the .setAttribute() function, passing as argument the values dictated by the arbitrary ranges
  ellipseMouth.setAttribute("ry", ellipseRadiusY);
  ellipseMouth.setAttribute("stroke-width", ellipseStrokeWidth);
  circleEyes.forEach(circleEye => circleEye.setAttribute("r", circleRadius));
}


