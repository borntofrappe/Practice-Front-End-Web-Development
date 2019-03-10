// target all path elements in the svg
const paths = document.querySelectorAll('svg#drawing path');
// retrieve the number of path elements in order to compute the total duration of the animation
const { length } = paths;
// amount of time for each animation
const strokeDuration = 1;


// target the button element
const button = document.querySelector('button');

// function clearing the canvas by setting the stroke-dasharray and stroke-dashoffset properties to match the lenght of each path element
const blankCanvas = () => {
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.setAttribute('stroke-dasharray', length);
    path.setAttribute('stroke-dashoffset', length);
  });
}

// function drawing the path elements through the drawStroke animation
// include a delay for each path elements to have it draw after the previous one
const drawStrokes = () => {
  paths.forEach((path, index) => {
    path.style.animation = `drawStroke ${strokeDuration}s ${strokeDuration * index + 0.25}s ease-out both`;
  });
}


// function fired when pressing the buton
// clear the canvas and draw the path elements from scratch
const handleClick = () => {
  blankCanvas();
  drawStrokes();

  // remove the button elements, from view and from the HTML
  button.classList.add('clicked');
  button.removeEventListener('click', handleClick);
  button.addEventListener('transitionend', () => document.querySelector('body').removeChild(button));

  // when the animation ends include a paragraph closing the project exactly where the button was
  const timeoutID = setTimeout(() => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Thank you Sarah';
    document.querySelector('body').appendChild(paragraph);
    clearTimeout(timeoutID);
  }, length * strokeDuration * 1000);
}

// fire the handleClick function when registering a click event on the button
button.addEventListener('click', handleClick, { once: true });