// select all the buttons in the grid, and the button to focus/disperse the buttons
const gridButtons = document.querySelectorAll('.grid button');
const mouseButton = document.querySelector('button.mouse');
// consider the height and width of the window
const { innerWidth: width, innerHeight: height } = window;
// initialize a variable to keep track of the interval
let intervalID = 0;

// function dispersing the buttons
// simply using the transform property
function disperse() {
  // change the text of the mouse button
  mouseButton.textContent = 'Focus';

  // set the transition on the elements to match the frequency of the interval
  const transitionDuration = 2000;
  gridButtons.forEach(gridButton => gridButton.style.transition = `all ${transitionDuration / 1000}s linear`);
  // update the transform property to a new, random value creating a curvy movement
  intervalID = setInterval(() => {
    for (let i = 0; i < gridButtons.length; i += 1) {
      const rotate = (Math.random() > 50) ? Math.floor(Math.random() * 360) : Math.floor(Math.random() * 360 * -1);
      // use the smaller between the height and width value
      const translate = (height > width) ? Math.floor(Math.random() * width / 2) : Math.floor(Math.random() * height / 2);

      gridButtons[i].style.transform = `rotate(${-rotate}deg) translate(${translate}px, 0) rotate(${rotate}deg)`;
    }
  }, transitionDuration);
}
// immediately call the function to disperse the buttons
disperse();

// function used to restore the original position of the button elements
function focus() {
  // change the text of the mouse button
  mouseButton.textContent = 'Disperse';
  // clear the interval and restore the transform property ot the initial value
  // at a much speedier pace
  clearInterval(intervalID);
  gridButtons.forEach((gridButton) => {
    gridButton.style.transition = 'all 0.2s linear';
    gridButton.style.transform = 'rotate(0deg) translate(0, 0) rotate(0deg)';
  });
}

// attach the functions to the mouseenter and mouseout events
mouseButton.addEventListener('mouseenter', focus);
mouseButton.addEventListener('mouseout', disperse);
