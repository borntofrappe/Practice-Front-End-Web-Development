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
! the functionaliity depends on the argument isTotal
if true, the function computes the total
otherwise, it simply includes the default 0 values in the headings
this to have the function both describe the initial and final tally
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
      const [seconds, minutes, hours] = match.split(':').reverse();

      let runningTotal = parseInt(seconds, 10);
      if (minutes) {
        runningTotal += parseInt(minutes, 10) * 60;
      }
      if (hours) {
        runningTotal += parseInt(hours, 10) * 3600;
      }

      return accumulator + runningTotal;
    }, 0);

    // based on seconds total update the time object
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
    document.querySelector('span.instruction').textContent = 'you have found';
  }

  // include the hours, minutes and seconds in the heading, separating each digit in a div element
  const headingAnswer = document.querySelector('#answer');

  headingAnswer.innerHTML = Object.values(time).map((timeComponent) => zeroPad(timeComponent)).join(':');
};


// call the function to immediately display the initial values
tallyUp(false);

// listen for a click event on the button, but make it so that the logic is fired only once
// once computed, the tally is not meant to change
buttonTally.addEventListener('click', () => tallyUp(true), {
  once: true
});
