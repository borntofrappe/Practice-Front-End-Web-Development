// target the button and the svg element, to allow for multiple animations on click
const button = document.querySelector('button');
const svg = document.querySelector('svg');

// function called in response to the click event on the button
function handleClick() {
  // add the class of .play triggering the animations
  button.classList.add('play');
  // remove the event listener to avoid overlaps
  button.removeEventListener('click', handleClick);
}

// function called in response to the animationend event on the svg
function handleAnimationEnd() {
  // remove the class of play, as to allow for the animation to run once more when re-applying the class
  button.classList.remove('play');
  // listen for a click event on the button element
  button.addEventListener('click', handleClick);
}

// listen for the animationend event on the svg
svg.addEventListener('animationend', handleAnimationEnd);
