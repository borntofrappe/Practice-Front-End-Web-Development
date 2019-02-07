// intervalID to ensure only one interval runs at a tim
let intervalID = 0;

// function zero-padding the integer passed as argument
const zeroPad = num => (num < 10 ? `0${num}` : num);


// function showing the countdown in the selected element
// accepting a number of seconds and displaying the number of minutes and seconds
function showTimer(seconds) {
  // target the container in which to show the countdown and apply a class to slightly update the visual
  const appTimer = document.querySelector('.app__timer');
  appTimer.classList.add('active');

  // compute the number of minutes and of seconds
  const minutes = Math.floor(seconds / 60);
  // using the modulo operator to consider the remainder past the 60s marker
  const remainingSeconds = seconds % 60;

  // add the information in the main heading
  appTimer.querySelector('h1').textContent = `${zeroPad(minutes)}:${zeroPad(remainingSeconds)}`;
}


// function creating the timer
// accepting as argument a number of seconds, setting up an interval to update the UI every second as to show the passage of time
function timer(seconds) {
  // immediately clear any, if existing, intervals
  clearInterval(intervalID);

  // create two dates instances, one for the moment in which the timer begins, one for the moment in which it should end
  const now = Date.now();
  const then = new Date(now + seconds * 1000);

  // compute the number of seconds between the two SVGElementInstanceList, and immediately call the function to highlight the amount of time
  const totalSeconds = Math.round((then - now) / 1000);
  // immediately show the timer for the number of seconds
  showTimer(totalSeconds);

  // change the text of the sub-heading to show the time at which the timer will end
  const appTimer = document.querySelector('.app__timer');
  // based on the number of hours and minutes of the `then` instance
  appTimer.querySelector('h3').textContent = `Back @ ${then.getHours()}:${zeroPad(then.getMinutes())}`;

  // set up the interval
  intervalID = setInterval(() => {
    // compute the number of seconds between the current instance and the instance represented by `then`
    const missingSeconds = Math.round((then - Date.now()) / 1000);
    showTimer(missingSeconds);

    // when reaching 0 clear the interval and remove the arbitrary class
    if (missingSeconds <= 0) {
      appTimer.classList.remove('active');
      clearInterval(intervalID);
    }
  }, 1000);
}


// target the buttons which allow to run a timer for a prescribed amount of time
const buttons = document.querySelectorAll('button');

// function called in response to a click event on one of the buttons
function handleClick() {
  // retrieve the number of seconds described in the data.time attribute
  // ! use the parse function to store a reference to the value as an integer
  const seconds = parseInt(this.getAttribute('data-time'), 10);
  // start the timer for the selected number of seconds
  timer(seconds);
}
// attach an event listener on each button for a click event
buttons.forEach(button => button.addEventListener('click', handleClick));


// target the form detailing an integer for a selected number of minutes
// ! it is possible to call an element by name through `document.name`
const form = document.customTimer;

// function called in response to the submit event being fired on the form
function handleSubmit(e) {
  // prevent the default behavior
  e.preventDefault();

  // retrieve the value detailed in the input element
  /* minutes is the name of the input element, which means that
      this.minutes.value
    targets the same element as
      this.querySelector('input[name="minutes"])
  */
  const minutes = parseInt(this.minutes.value, 10);
  // start the timer for the selected number of minutes
  timer(minutes * 60);

  // clear the form of any value
  this.reset();
}

// listen for the submit event on the entire form
form.addEventListener('submit', handleSubmit);
