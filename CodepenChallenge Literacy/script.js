// target the svg
const svg = document.querySelector('svg');
svg.style.transition = 'opacity 0.2s ease-out';
// loop through all path elements in the svg and set the stroke-dash property to match the length of each path
svg.querySelectorAll('path').forEach((path, index) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.transition = `all 1.5s ${index * 0.05}s ease-out`;
});


// target the snitch
const snitch = document.querySelector('.snitch');

// find the width/height of the window
const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
// find the width/height of the div
const { offsetWidth: snitchWidth, offsetHeight: snitchHeight } = snitch;

// utility function returning a random integer up to a maximum value (not included)
const randomInt = max => Math.floor(Math.random() * max);

// function to position the snitch at (x,y) coordinates
const positionInWindow = (x, y) => {
  // position the div element at random, in the visible area
  snitch.style.left = `${x}px`;
  snitch.style.top = `${y}px`;
};

// immediately call the positioning function to have the snitch positioned somewhere on the page
positionInWindow(randomInt(windowWidth - snitchWidth), randomInt(windowHeight - snitchHeight));

// function called in response to the mosuemove event on the snitch
function captureSnitch(e) {
  // retrieve the position of the snitch on the page
  const boundingBox = snitch.getBoundingClientRect();
  const { left: snitchX, top: snitchY } = boundingBox;
  // retrieve the mouse coordinates on the window
  const { pageX, pageY } = e;

  // estimate the distance between the cursor and the snitch
  const diffX = pageX - snitchX;
  const diffY = pageY - snitchY;

  // change the position of the snitch to have it move away from the cursor
  // mouse to the left, move the snitch to the right, and viceversa, and for the vertical direction
  const x = diffX > 0 ? (snitchX - randomInt(15)) : (snitchX + randomInt(15));
  const y = diffY > 0 ? (snitchY - randomInt(15)) : (snitchY + randomInt(15));
  positionInWindow(x, y);

  // if the snitch exceeds the boundaries of the window place it again and at random in the window
  if (snitchX > windowWidth || snitchX + snitchWidth < 0 || snitchY > windowHeight || snitchY + snitchHeight < 0) {
    positionInWindow(randomInt(windowWidth - snitchWidth), randomInt(windowHeight - snitchHeight));
  }

  // if the cursor reaches the snitch, remove the event listener for the mousemove event and display the message
  if (pageX > snitchX && pageX < snitchX + snitchWidth && pageY > snitchY && pageY < snitchY + snitchHeight) {
    snitch.removeEventListener('mousemove', captureSnitch);
    svg.style.opacity = 0.2;
    svg.style.visibility = 'visible';

    svg.querySelectorAll('path').forEach((path) => {
      path.style.strokeDashoffset = 0;
    });
  }
}

// listen for the mousemove event on the snitch
// ! the event is registered before the cursor has a chance to overlap on the div, thanks to the pseudo element
snitch.addEventListener('mousemove', captureSnitch);
