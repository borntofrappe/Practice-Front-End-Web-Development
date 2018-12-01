// target the dinosaur
const dino = document.querySelector('.dino');
// target the gage
const gauge = document.querySelector('.gauge');

// global variables
// time to keep track of the passing time
// interval id to clear any present interval
// a boolean to avoid the same function from firing again and again during the event
let time = 0;
let intervalID = 0;
let isSquatting = false;
// transition duration o match the interval/timeouts to the transitioon
const transitionDuration = 0.3;

// function called in response to the mousedown and keydown event
function squat(e) {
  // if the dinosaur is not already squat(ted?)
  if (!isSquatting) {
    // pre emptively terminate the function if the event is a keyboard event and anything but the space bar is hit
    if (e.keyCode && e.keyCode !== 32) {
      return;
    }
    // squat the dinosaur, with each passing through the nterval
    // likewise, leverage the time variable to update the gauge and display an increasing amount of striped background
    isSquatting = true;
    // using the sme length as the interval allows a smooth linear transition
    dino.style.transformOrigin = '50% 100%';
    dino.style.transition = `transform linear ${transitionDuration}s`;
    intervalID = setInterval(() => {
      time += 1;
      gauge.style.backgroundSize = `${time * 10}% 100%`;
      dino.style.transform = `translate(-50%, 0) scaleY(${1 - time / 100})`;
      // stop the interval when time hits 10, to avoid excesses
      if (time >= 10) {
        clearInterval(intervalID);
      }
    }, transitionDuration * 1000);
  }
}

// function called in response to the mouseup and keyup events
function jump() {
  // set properties back to their default
  // consider in a variable (power) a measure relative to time
  // reset time and clear the interval
  isSquatting = false;
  gauge.style.backgroundSize = '0% 100%';
  const power = 10 * (time + 1);
  time = 0;
  clearInterval(intervalID);
  // set transition properties for the jump and use power to have the dinosaur jumping at the pre-established height
  dino.style.transition = `transform cubic-bezier(.26,1.48,.73,1.02) ${transitionDuration}s`;
  dino.style.transform = `translate(-50%, -${power}%) scaleY(1)`;
  // once dino has reached the new value, reset its height back to the original value
  const timeoutID = setTimeout(() => {
    dino.style.transform = 'translate(-50%, 0) scaleY(1)';
    clearTimeout(timeoutID);
  }, transitionDuration * 1000);
}

// add the event listenrs for the space key and the tap/mousedown
window.addEventListener('keydown', squat);
window.addEventListener('keyup', jump);

dino.addEventListener('mousedown', squat);
dino.addEventListener('mouseup', jump);
