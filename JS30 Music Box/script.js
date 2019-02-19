// target all button elements
const buttons = document.querySelectorAll('button.piano__key');

// style each button element picking a color from the 360 color wheel
// using a saturation and lightness similar to the one picked for the background SVG shapes
const { length } = buttons;
buttons.forEach((button, index) => {
  button.style.setProperty('--highlight', `hsl(${360 / length * index}, 95%, 60%)`);
});


// function called on key down
// retrieve the key code, convert it to string and add a class of active on the matching button (if any)
function handleKeyDown(e) {
  const { keyCode } = e;
  const keyCandidate = String.fromCharCode(keyCode);

  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');

    if (keyCandidate.toLowerCase() === dataKey) {
      button.classList.add('active');
    }
  });
}

// function called on key up
// retrieve the key code, convert it to string and remove the class of active on the matching button (if any)
function handleKeyUp(e) {
  const { keyCode } = e;
  const keyCandidate = String.fromCharCode(keyCode);

  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');

    if (keyCandidate.toLowerCase() === dataKey) {
      button.classList.remove('active');
    }
  });
}

// listen for keydown and keyup events on the window
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
