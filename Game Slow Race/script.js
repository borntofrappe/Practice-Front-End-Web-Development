/*
store in an array all the racers,
each array item detailing the following object
{
  snail (svg element),
  number (the number on the 'outfit')
  color (the color of the 'outfit')
}
the last two fields to diplay the correct winner in the heading
*/
const racers = [];

// target the buttons to start the race, add and remove snails
const startButton = document.querySelector('.start');
const addButton = document.querySelector('.add');
const removeButton = document.querySelector('.remove');
// target the goal post to stop the race as one snail reaches its horizontal coordinate
const goal = document.querySelector('.goal');
// target the heading in which to show the result
const result = document.querySelector('h1.result');

// define a global variable to toggle between starting and resetting the race
let raceIsOn = false;
// define a global variable for the interval id
let intervalID = 0;

// function declaring a winner in the heading element
function declareWinner(racer) {
  // destructure the color and number from the input object
  const { number, color } = racer;
  // show a fitting text in the heading
  result.style.color = color;
  result.innerHTML = `Winner <br>Snail #${number}!`;
  result.classList.add('show-result');
}

// function moving the racers
function moveRacers() {
  // flip the start button to visualize how clicking on the same button resets the race
  startButton.style.transform = 'rotateY(180deg)';
  // remove event listeners for the add/remove racer
  addButton.classList.remove('able');
  addButton.removeEventListener('click', addRacer);
  removeButton.classList.remove('able');
  removeButton.removeEventListener('click', removeRacer);

  // target all the svg elements of the page
  const racersSVG = document.querySelectorAll('.racers svg');

  // set up an interval to update the --dist property and move each racer
  // freequency determines the speed of the movement, gait the top length of each step
  const frequency = 500;
  const gait = 25;
  intervalID = setInterval(() => {
    // at every interval loop through the array of svg elements
    for (let i = 0; i < racersSVG.length; i += 1) {
      // compute a px value to increase the distance from the left edge
      const randomDist = Math.floor(Math.random() * gait);

      // for every racer
      const racer = racersSVG[i];
      // set up a transition matching the length of the interval
      racer.style.transition = `${frequency / 1000}s linear all`;
      // retrieve the current px value from the CSS custom property
      const racerStyle = getComputedStyle(racer);
      const dist = racerStyle.getPropertyValue('--dist');
      // extract the number out of the property (which is a string such as 0px, 123px)
      const numberDist = dist.substring(0, dist.length - 2);
      // increment the distance with the random value
      const sumDist = Number(numberDist) + randomDist;

      // ! safety check
      // if the distance already reaches the goal post (goalpost coordinate - width of the element), stop the race,
      // else simply add the distance to the custom property
      const finishLine = goal.offsetLeft - racer.clientWidth;
      if (sumDist >= finishLine) {
        // stop the interval
        clearInterval(intervalID);
        // set --dist to end at the precise spot
        racer.style.setProperty('--dist', `${finishLine}px`);

        // call a function to declare a winner
        declareWinner(racers[i]);
      } else {
        racer.style.setProperty('--dist', `${sumDist}px`);
      }
      // racers[i].style.transform
    }
  }, frequency);
}

// function resetting the racers to their original position
function resetRace() {
  // add event listeners for the add/remove racer
  addButton.classList.add('able');
  addButton.addEventListener('click', addRacer);
  removeButton.classList.add('able');
  removeButton.addEventListener('click', removeRacer);
  // clear the interval
  clearInterval(intervalID);
  // remove the class show-result from the heading
  result.classList.remove('show-result');
  // flip back the start button
  startButton.style.transform = 'rotateY(0deg)';
  // loop through the array of racers and reset their --dist custom property
  // target all the svg elements of the page
  const racersSVG = document.querySelectorAll('.racers svg');
  for (let i = 0; i < racersSVG.length; i += 1) {
    racersSVG[i].style.setProperty('--dist', '0px');
  }
}
// function adding a racer
function addRacer() {
  // if the remove button doesn't contain a class of able, add it (as it becomes possible to now remove a racer)
  if (!removeButton.classList.contains('able')) {
    removeButton.classList.add('able');
    removeButton.addEventListener('click', removeRacer);
  }

  // detail a random and a random color for the outfit of the racer
  const randomInt = Math.ceil(Math.random() * 9);
  const randomHue = Math.floor(Math.random() * 360);
  // the svg makes use of two hsl values
  const hslDark = `hsl(${randomHue}, 50%, 45%)`;
  const hslLight = `hsl(${randomHue}, 55%, 60%)`;

  // detail the svg with the random values
  const racerElement = `<svg class="snail" xmlns="http://www.w3.org/2000/svg" width="145.486" height="123.396" viewBox="0 0 38.493 32.649"><g transform="matrix(.87417 0 0 .87417 -5.617 -222.023)"><rect width="44.034" height="8.315" x="6.426" y="283.015" rx="4.533" ry="5.292" fill="${hslDark}" paint-order="stroke fill markers"/><rect ry="1.323" rx="1.323" y="284.338" x="14.322" height="1.512" width="28.241" fill="${hslLight}" paint-order="stroke fill markers"/><rect ry="1.062" rx=".91" y="117.745" x="-263.338" height="1.669" width="8.84" transform="rotate(-75)" fill="${hslDark}" paint-order="stroke fill markers"/><rect transform="rotate(-108.755)" width="8.84" height="1.669" x="-284.481" y="-48.571" rx=".91" ry="1.062" fill="${hslDark}" paint-order="stroke fill markers"/></g><g transform="matrix(.98654 0 0 .98654 -8.367 -254.08)"><circle cx="27.454" cy="271.585" r="14.037" fill="${hslLight}" paint-order="stroke fill markers"/><circle r="11.899" cy="271.585" cx="27.454" fill="${hslDark}" paint-order="stroke fill markers"/><circle cx="27.454" cy="271.585" r="9.627" fill="${hslLight}" paint-order="stroke fill markers"/><circle r="7.489" cy="271.585" cx="27.454" fill="${hslDark}" paint-order="stroke fill markers"/></g><text style="line-height:1.25;-inkscape-font-specification:Mogra" x="15.224" y="282.443" font-weight="400" font-size="12.705" font-family="Mogra" letter-spacing="0" word-spacing="0" fill="#fff" stroke-width=".318" transform="translate(0 -264.351)"><tspan x="15.224" y="282.443">${randomInt}</tspan></text></svg>`;
  racers.push({
    racer: racerElement,
    number: randomInt,
    color: hslDark
  });

  // target the container nesting the racers and render as many elements as contained in the racers array
  const racersContainer = document.querySelector('.racers');
  racersContainer.innerHTML = racers.map(racer => racer.racer);

  // if racers holds more than 5 racers remove the event listener on the add button element
  // moreover remove the class of 'able'
  if (racers.length >= 5) {
    addButton.removeEventListener('click', addRacer);
    addButton.classList.remove('able');
  }
}

// immediately add two racers
addRacer();
addRacer();

// function removing a racer
function removeRacer() {
  // mirroring the behavior of the add function enable the addRacer button
  if (!addButton.classList.contains('able')) {
    addButton.classList.add('able');
    addButton.addEventListener('click', addRacer);
  }
  // remove an item from the array and render the updated elements
  racers.pop();
  const racersContainer = document.querySelector('.racers');
  racersContainer.innerHTML = racers.map(racer => racer.racer);

  // if racers holds only 2 racers, remove the possibility to remove other ones
  if (racers.length <= 2) {
    removeButton.removeEventListener('click', removeRacer);
    removeButton.classList.remove('able');
  }
}

// when clicking the start button toggle the boolean variable and call the function to either move the racers or reset the race
startButton.addEventListener('click', () => {
  raceIsOn = !raceIsOn;
  if (raceIsOn) {
    moveRacers();
  } else {
    resetRace();
  }
});

// when clicking the add/remove button call the respective functions
addButton.addEventListener('click', addRacer);
removeButton.addEventListener('click', removeRacer);
