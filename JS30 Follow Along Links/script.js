// target the SVG and the anchor link elements
const bubble = document.querySelector('svg');
const links = document.querySelectorAll('a');

// global variables to manage the animation and the blur/mouseout events (the SVG is repositioned to its original location in these two instances)
let timeoutID = 0;
let isOut = false;
const duration = '0.2';

// function receiving the coordinates and sizes of the SVG, which is positioned and sized with a transition
function moveBubble(x, y, width, height) {
  bubble.style.transition = `all ${duration}s ease-out`;
  bubble.style.left = x;
  bubble.style.top = y;
  bubble.style.width = width;
  bubble.style.height = height;
  // in addition to the transition a simple animation is introduced to add a touch of blur
  // it is removed when as the transition ends
  bubble.style.animation = `blur ${duration}s ease-out`;
  bubble.addEventListener('transitionend', () => { bubble.style.animation = 'none'; });
}

// function fired in response to the mouseenter and focus events
function handleEnter() {
  // isOut dictates whether a mouseout or blur event has been fired
  // in this instance clear the timeout predisposed for the transition and set the boolean back to false
  if (isOut) {
    isOut = false;
    clearTimeout(timeoutID);
  }

  // as to position the SVG element, retrieve the width and height of the anchor link element
  const { offsetWidth: width, offsetHeight: height } = this;
  // retrieve the position of the anchor link element relative to the parent main.container
  const { offsetLeft: x, offsetTop: y } = this;
  // loop through the anchor link elements and add the specified CSS class to only the selected one
  links.forEach(link => (link === this ? link.classList.add('selection') : link.classList.remove('selection')));
  // call the function to move the SVG element behind the anchor link, and have it take up its sizes
  moveBubble(x, y, width, height);
}

// function fired in response to the mouseout and blur events
function handleOut() {
  // if a mouseout or blur event has already been fired, clear the timeout to avoid overlapping instances
  if (isOut) {
    clearTimeout(timeoutID);
  }
  // set the boolean to true and start a timeout after which the SVG element is repositioned to its original location
  // this to avoid the SVG from being stuck behind an anchor link element
  isOut = true;
  timeoutID = setTimeout(() => {
    moveBubble(0, 0, 52, 52);
    // remove also the .selection class and while clearing the timeout, set isOut back to false (no need to further clear a timeout)
    links.forEach(link => link.classList.remove('selection'));
    clearTimeout(timeoutID);
    isOut = false;
  }, 1500);
}

// call the specified functions when hovering/focusing or un-hovering/un-focusing on each and every anchor link element
links.forEach(link => link.addEventListener('mouseenter', handleEnter));
links.forEach(link => link.addEventListener('focus', handleEnter));
links.forEach(link => link.addEventListener('mouseout', handleOut));
links.forEach(link => link.addEventListener('blur', handleOut));
