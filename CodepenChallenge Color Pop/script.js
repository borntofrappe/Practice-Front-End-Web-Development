// the idea is to wait for the animation on the heading to finish and then begin a simple game in which x balloons appear on page
// as a click event is registered on one of these balloons, the the score highlighted in the bottom right is incremented
// a simple animation plays out to actually pop the balloon (to avoid multiple clicks being registered it'd be useful to remove the event listener after the first instance)

/* necessary elements
- the body (in which the balloons are appended)
- the svg (keeping track of the score, as to animate it in the center of the page as the game comes to a close)
- the heading (animated directly in CSS with the name of the game)
- the subheading (positioned whenever a click on a balloon is registered)
*/
const body = document.querySelector('body');
const scoreboard = body.querySelector('svg#score');
const heading = body.querySelector('h1');
const subheading = body.querySelector('h2');


/* global variables
- a variable to count the number of balloons included in the body
- a variable to cap the number of balloons to be included in the body
- a variable to keep track of the balloon actually being burst
- the width and height of the body
- two variables to distinguish the smaller and greater between the width and height
- a variable to size the SVG to be 1/10th of the greater value
*/
let counter = 0;
const balloons = 15;
let score = 0;
const { offsetWidth: width, offsetHeight: height } = body;
const [min, max] = [width, height].sort((a, b) => (a > b ? 1 : -1));
const tenth = max / 10;

// utility function returning a random integer between 0 and a selected number (defaulted to 10)
const randomInt = (cap = 10) => Math.floor(Math.random() * cap);

/* function called in response to a click event on any SVG element of class .balloon
- animate the SVG out of sight
- show the subheading with the +1 signallng the successful move
- increase the score in the scoreboard
*/
function popBaloon(e) {
  this.style.animation = 'pop 0.2s ease-out forwards';

  const { clientX: left, clientY: top } = e;
  subheading.style.left = `${left}px`;
  subheading.style.top = `${top}px`;
  subheading.style.opacity = 1;


  score += 1;
  scoreboard.querySelector('text').textContent = `${score}x`;

  // remove also the event listener to the specific SVG, as to avoid counting the same balloon twice
  this.removeEventListener('click', popBaloon);
}

/* function called in response to the animationend on the last SVG element
- hide the subheading back
- after a brief delay show the score higlighting the selected SVG in the center of the page
*/
function showScore() {
  subheading.style.opacity = 0;
  const timeoutID = setTimeout(() => {
    scoreboard.style.animation = 'showScore 1s ease-out forwards';
    scoreboard.querySelector('text').style.animation = 'highlightScore 0.5s 1.2s 5 step-end';
    clearTimeout(timeoutID);
  }, 1000);
}

// function called when aniomationend is registered on the heading, as to play the game **after** the trivial animation
function playGame() {
  // include the balloons at a specified interval (repeated for as many balloons as specified in the global variable)
  const intervalID = setInterval(() => {
    // compute the horizontal and vertical coordinate of the SVG through the randomInt function
    // up to the width and height of the body respectively
    const left = randomInt(width);
    const top = randomInt(height);

    // create an svg element with default attributes
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', tenth);
    svg.setAttribute('height', tenth);
    // absolute position the SVG ih the body following the random coordinates
    svg.style.position = 'absolute';
    svg.style.top = `${top}px`;
    svg.style.left = `${left}px`;
    // add a class to distinguish said SVG from the existing one(s)
    svg.classList.add('balloon');
    // play the appear animation created in the stylesheet with a random delay
    svg.style.animation = `appear 2s ${randomInt(5)}s ease-out forwards`;
    // attach the event listener to fire the popBaloon function on click
    svg.addEventListener('click', popBaloon);

    // add to the SVG the path elements making up the balloon's shape
    svg.innerHTML = `
    <path d="M 50 0 a 50 45 0 0 1 50 45 a 50 50 0 0 1 -50 50 a 50 50 0 0 1 -50 -50 a 50 45 0 0 1 50 -45" fill="#FF1EAD" />
    <path d="M 50 94 a 6 6 0 0 1 6 6 h -12 a 6 6 0 0 1 6 -6" fill="#FF1EAD" />
    <path d="M 50 5 a 40 40 0 0 1 40 40 a 5 5 0 0 1 -5 5 a 40 40 0 0 0 -40 -40 a 5 5 0 0 1 5 -5" fill="#fff" opacity="0.3" />
    `;

    // append the balloon to the body
    body.appendChild(svg);

    // increment the counter variable and clear the interval if the maximum number of balloons is reached
    counter += 1;
    // if counter reaches the total number of balloons clear the interval and call the function showing the score, as the last SVG finishes animating
    if (counter >= balloons - 1) {
      svg.addEventListener('animationend', showScore);
      clearInterval(intervalID);
    }
  }, 1000);
}

// listen for the animationend event on the heading, at which point call the function to play the game
heading.addEventListener('animationend', playGame);
