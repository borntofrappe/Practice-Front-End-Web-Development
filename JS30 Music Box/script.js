// create an instance of the audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// create an oscillator, responsible for the actual sound
// start the oscillator using oscillator.start() and play sounds by connecting/disconnecting the oscillator with the context's own destination
// ! start() can only be called once
const oscillator = audioContext.createOscillator();

// boolean to have the oscillator run once, and following user input
let isOscillating = false;
// boolean to keep track of whether the cursor is down (to avoid mis-firing the mouseout event)
let isMouseDown = false;
// character storing the last key, to avoid having the keydown event fired continuously and for the same key
let lastKey = '';

// function playing the sound specified by the frequency passed as argument
function playSound(frequency) {
  // if the oscillator is not already started, use the .start() function
  if (!isOscillating) {
    oscillator.start();
    isOscillating = true;
  }

  // set the frequency on the oscillator
  oscillator.frequency.value = frequency;
  // connect the oscillator effectively playing the audio
  oscillator.connect(audioContext.destination);
}

// BUTTONS AND MOUSE EVENTS
// target all button elements
const buttons = document.querySelectorAll('button.piano__key');
// style each button element picking a color from the 360 color wheel
// using a saturation and lightness similar to the one picked for the background SVG shapes
const { length } = buttons;
buttons.forEach((button, index) => {
  button.style.setProperty('--highlight', `hsl(${360 / length * index}, 95%, 60%)`);
});

// function called on mousedown
// switch isMouseDown to true and play the sound using the value retrieved from the data-frequency attribute
function handleMouseDown() {
  // once the oscillator is connected, there is no need of continuously call the function
  // therefore, run the logic only if the cursor wasn't already down
  if (!isMouseDown) {
    isMouseDown = true;
    this.classList.add('active');
    const dataFrequency = this.getAttribute('data-frequency');
    playSound(parseFloat(dataFrequency));
  }
}

// function called on mouseup
// disconnect the oscillator
// switch isMouseDown back to false and remove the class of active from every button
function handleMouseUp() {
  oscillator.disconnect(audioContext.destination);
  isMouseDown = false;
  buttons.forEach(button => button.classList.remove('active'));
}

// attach the appropriate event listeners on the button elements
buttons.forEach((button) => {
  button.addEventListener('mousedown', handleMouseDown);
  button.addEventListener('mouseup', handleMouseUp);
});


// WINDOW AND KEY EVENTS
// function called on key press
function handleKeyDown(e) {
  // retrieve the key code
  const { keyCode } = e;
  // convert the code to a letter
  const keyCandidate = String.fromCharCode(keyCode);

  // loop through the buttons and if a data-key attribute matches the lowercase letter retrieved from the event call the playSound function
  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');
    if (keyCandidate.toLowerCase() === dataKey) {
      // ! play the sound only as long as the data-key doesn't match the last key
      if (lastKey !== dataKey) {
        lastKey = dataKey;
        // class animating the key press
        button.classList.add('active');
        // frequency passed to the playSound function
        const dataFrequency = button.getAttribute('data-frequency');
        playSound(dataFrequency);
      }
    }
  });
}

// function called on key up
function handleKeyUp(e) {
  // retrieve the key code and convert it to a letter
  const { keyCode } = e;
  const keyCandidate = String.fromCharCode(keyCode);

  // loop through the buttons and if a data-key matches the lower case letter proceed to terminate the sound
  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');
    if (keyCandidate.toLowerCase() === dataKey) {
      // remove the animation applied through the class of active
      button.classList.remove('active');
      // disconnect the oscillator
      oscillator.disconnect(audioContext.destination);
    }
  });
}

// listen for keydown and keyup events on the window
window.addEventListener('keypress', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
