// target the button to tally up the number of hours, minutes and seconds
const buttonTally = document.querySelector('button');

// create an object in which to detail the time
const time = {
  hours: 0,
  minutes: 0,
  seconds: 0
};

// function adding a 0 to integers smaller than 10
const zeroPad = int => (int > 10 ? `${int}` : `0${int}`);

/* function considering the time object and displaying the total number of hours, minutes and seconds in the heading of id #answer
! the boolean passed as argument is used to compute the total or just include the initial values of the time object
this to have the function run immediately and later as a result of the button being clicked, with different behavior
*/
const tallyUp = (isTotal) => {
  if (isTotal) {
    // target all list item in the ul of class .videos
    const listItems = document.querySelectorAll('ul.videos li');
    // loop through all list items and return the total number of seconds
    let secondsTotal = [...listItems].reduce((accumulator, currentValue) => {
      /** for each item
       * retrieve the data-time attribute
       * use a regex to find colon:separated digits
       * destructure the digits into hours, minutes and seconds
       * return the number of seconds made up by the newfound the hours, minutes and seconds
       */
      const timeData = currentValue.getAttribute('data-time');
      // regex finding at most three pairs of digits, the last two of which are colon:separated
      const regex = /^\d+(:\d+)?(:\d+)?$/;
      const match = timeData.match(regex)[0];
      // match is a string describing the number of seconds, and possibly minutes and hours too
      // splitting the string on the basis of the colons and reversing it allows to always have the seconds first
      // minutes and hours are underfined unless the string accommodates for those values
      const [seconds, minutes, hours] = match.split(':').reverse();

      // initialize a variable to compute the total number of seconds for the video
      let runningTotal = parseInt(seconds, 10);
      if (minutes) {
        runningTotal += parseInt(minutes, 10) * 60;
      }
      if (hours) {
        runningTotal += parseInt(hours, 10) * 3600;
      }

      // return the accumulator incremented by the running total
      return accumulator + runningTotal;
    }, 0);

    // secondsTotal holds a reference to an integer describing the total number of seconds
    // based on this value update the time object
    while (secondsTotal >= 3600) {
      time.hours += 1;
      secondsTotal -= 3600;
    }
    while (secondsTotal >= 60) {
      time.minutes += 1;
      secondsTotal -= 60;
    }
    time.seconds = secondsTotal;

    // add a class of active to the button
    buttonTally.classList.add('active');
    // change the verb in the summary element, to fittingly describe the change
    document.querySelector('span.verb').textContent = 'you have found';
  }

  /* include the hours, minutes and seconds in the heading
  the idea is to include each of the six digit in a div container

    <div class="answer__digit"></div>

  in this container a span element is included for each number leading up to the digit
  for the number 4 for instance, the following span elements are included

    <div class="answer__digit">
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </div>

    by animating each successive span into view the correct digit is shown after a brief transition
  */
  const headingAnswer = document.querySelector('#answer');
  headingAnswer.innerHTML = Object.values(time).map((timeComponent, timeIndex) => {
    // for the desired div+span strcuture each set of time (hours, minutes and seconds) needs to be further split to consider each individual digit
    // zero pad the values
    const zeroPaddedDigit = zeroPad(timeComponent);
    // retrieve the first and second digit
    const [firstDigit, secondDigit] = zeroPaddedDigit.split('');

    // introduce arrays in which to describe every digit leading up to the first and second digit
    const firstDigitArray = [];
    const secondDigitArray = [];

    // populate the arrays from 0 up to the retrieved integers
    let firstDigitInt = parseInt(firstDigit, 10);
    while (firstDigitInt >= 0) {
      firstDigitArray.push(firstDigitInt);
      firstDigitInt -= 1;
    }

    let secondDigitInt = parseInt(secondDigit, 10);
    while (secondDigitInt >= 0) {
      secondDigitArray.push(secondDigitInt);
      secondDigitInt -= 1;
    }

    // include the div containers for the first and second digit, with the aforementioned span elements describing every digit starting from 0
    // ! animate the span elements to roll them progressively into view
    // ! use both the index describing the first-second digit and the index describing the hours, minutes, seconds for the delay
    return `
      <div class="answer__digit">
        ${firstDigitArray.reverse().map((digit, digitIndex) => `
          <span
            style="animation: rollDown 0.3s ${0.2 * digitIndex + 0.2 * (Object.values(time).length - timeIndex)}s ease-out forwards;"
          >
            ${digit}
          </span>`).join('')}
        </div>

      <div class="answer__digit">
        ${secondDigitArray.reverse().map((digit, digitIndex) => `
          <span
            style="animation: rollDown 0.2s ${0.1 * digitIndex + 0.2 * (Object.values(time).length - timeIndex)}s ease-out forwards;"
          >
            ${digit}
          </span>`).join('')}
      </div>
    `;
  }).join(':');
};

// call the function to immediately display the initial values
tallyUp(false);

// listen for a click event on the button, but make it so that the logic is fired only once
// once computed, the tally is not meant to change
buttonTally.addEventListener('click', () => tallyUp(true), {
  once: true
});
