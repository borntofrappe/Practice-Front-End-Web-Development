// create a simple sentence to be displayed in the main.items cotainer
const sentence = 'Feel free to drag and scroll';
// target the container
const items = document.querySelector('.items');
// for each letter of the sentence (and using a simple substitute character for whitespace) add a div.item to the main.items container
items.innerHTML = sentence.replace(/ /gi, '•').split('').map(char => `<div class="item">${char}</div>`).join('');

// initialize a variable to keep track of the mousedown event
let isMouseDown = false;
/* initialize a variable to keep track of the horizontal scroll
the idea is to change this value according to the position and movement of the cursor
AND
to alter the horizontal scroll according to this measure
*/
let xCoor = 0;

// function called in response to the mousedown event
function handleMouseDown(e) {
  // prevent the default behavior which would cause minor annoyances (trying to highlight text)
  e.preventDefault();
  // ! the coordinates taken from the moving cursor relate to the visible window, and it is therefore necessary to consider the distance from the very beginning of the container
  // retrieve the amount of space the cursor has in relation to the beginning of the container and change the original x-coordinate to this value
  const { scrollLeft: x } = items;
  xCoor = x;
  // set the boolean to true
  isMouseDown = true;
}
// attach the described function to the mousedown event
items.addEventListener('mousedown', handleMouseDown);
// on mouseup set the boolean back to false
items.addEventListener('mouseup', () => isMouseDown = false);

// function called in response to the mousemove event
function handleMove(e) {
  // pre-emptively exit the function is the boolean is set to false
  if (!isMouseDown) {
    return false;
  }

  // decrement the x-coordinate by the value of movementX (this value offers negative numbers when scrolling to the left, positive ones when scrolling to the right)
  xCoor -= e.movementX;
  // update the scroll position of the container to the prescribed x-coordinate
  items.scrollTo(xCoor, 0);
}

// attach the function to the mousemove event
items.addEventListener('mousemove', handleMove);
