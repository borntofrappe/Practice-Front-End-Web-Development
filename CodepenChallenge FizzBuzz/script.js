// integer to keep track of the game's value
let counter = 0;

/* elements used in the application */
const tally = document.querySelector('h1.tally');

const controls = document.querySelector('.controls');
const buttons = controls.querySelectorAll('button');

const score = document.querySelector('.score');
const scoreHeading = score.querySelector('h2');
const scoreButton = score.querySelector('button');

// immediately show the first number
tally.textContent = counter;

// function called in response to a click on the .controls buttons, or a press on the [1-4] keys of the keyboard
// receiving as input the button with the desired textContent
function tallyButton(button) {
  // add the selected class to style the button and remove it as soon as the transition is complete
  button.classList.add('selected');
  button.addEventListener('transitionend', () => button.classList.remove('selected'));

  // find the value from the text specified in the button
  const value = button.textContent;

  // increment the counter variable
  counter += 1;
  // consider the expected value following fizz's and buzz's and fizzbuzz's rules
  let expectedValue = counter.toString();
  if (counter % 5 === 0 && counter % 3 === 0) {
    expectedValue = 'FIZZBUZZ';
  } else if (counter % 3 === 0) {
    expectedValue = 'FIZZ';
  } else if (counter % 5 === 0) {
    expectedValue = 'BUZZ';
  }

  // if the two match
  if (value === expectedValue) {
    // modify the text of the heading to match the value (or the expected value as the two match)
    tally.textContent = value;
    // update the data-value attribute of the first button to consider the value which follows
    buttons[0].textContent = (counter + 1).toString();
    buttons[0].setAttribute('data-value', (counter + 1).toString());
  } else {
    // if the two don't match
    // remove the event listeners
    buttons.forEach(button => button.removeEventListener('click', handleClick));
    window.removeEventListener('keyup', handleKey);

    // remove the button elements from view
    controls.classList.add('blast');

    // update the score shown in heading and target the button to play the game once more
    scoreHeading.textContent = (counter - 1).toString();

    // attach the event listenrs on the single button and the window to reset the game and play anew
    scoreButton.addEventListener('click', handleScoreClick);
    window.addEventListener('keyup', handleScoreKey);

    // show the score
    score.classList.add('blast');
  }
}

// function called in response to the handleScoreClick and handleScoreKey functions, to reset the game
function tallyReset() {
  // remove the event listeners prompting the function
  scoreButton.removeEventListener('click', handleScoreClick);
  window.removeEventListener('keyup', handleScoreKey);

  // attach the necessary event listeners on the buttons and window
  buttons.forEach(button => button.addEventListener('click', handleClick));
  window.addEventListener('keyup', handleKey);

  // rest the firs button's value
  buttons[0].textContent = '1';

  // reset the original values
  counter = 0;
  tally.textContent = counter;

  // hide the score
  score.classList.remove('blast');
  // show the controls
  controls.classList.remove('blast');
}

// function called in response to a click on the button nested in the .score container
function handleScoreClick() {
  // reset the game
  tallyReset();
}
// function called in response to a key event on the window _once_ the .score containet is shown
function handleScoreKey(e) {
  // retrieve the key and if it matches the length of the controls button + 1 (identifying tbe last button in the page)
  // reset the game
  const { key } = e;
  const code = Number.parseInt(key, 10);
  if (code === buttons.length + 1) {
    tallyReset();
  }
}

// function following a click event on every button
function handleClick() {
  // call the tally function passing the particular button as argument
  tallyButton(this);
}

// register a click event on each button
buttons.forEach(button => button.addEventListener('click', handleClick));

// function following a key event on the window
function handleKey(e) {
  // extract the keycode and find the [1-4] keys
  const { key } = e;
  // compute the code considering that arrays are 0-based indexed
  const code = Number.parseInt(key, 10) - 1;
  // if there exist a button with the code, call the tally function
  if (buttons[code]) {
    tallyButton(buttons[code]);
  }
}
window.addEventListener('keyup', handleKey)