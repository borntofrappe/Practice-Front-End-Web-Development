// function adding a 0 to integers smaller than 10
const zeroPad = int => (int > 10 ? int : `0${int}`);

// object describing the time
const time = {
  hours: 0,
  minutes: 0,
  seconds: 0
};

// function receiving as input an object and including its values in an element
const showTime = (timeObject, timeElement) => {
  timeElement.textContent = Object.values(timeObject).map(timeComponent => zeroPad(timeComponent)).join(':');
};

// target the heading
const headingAnswer = document.querySelector('#answer');
// immediately call the function to display the nil values
showTime(time, headingAnswer);


// trivial addition: when clicking the button toggle a class of .tally on the details element to show a text describing the current state of the project
const button = document.querySelector('button');
button.addEventListener('click', () => document.querySelector('details').classList.toggle('tally'));
