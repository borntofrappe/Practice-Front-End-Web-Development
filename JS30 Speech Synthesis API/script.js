// retrieve a reference to the speechSynthesis API
// create an instance of an utterance which is later passed as argument to the synth.speak() function, as to precisely speak
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

// store a reference to the button and input elements and the contentEditable div
const buttonSpeak = document.querySelector('button.button--speak');
const inputRanges = document.querySelectorAll('input[type="range"]');
const textInput = document.querySelector('div#features--text');
// store a reference to the other two buttons
const buttonToggle = document.querySelector('button.button--toggle');
const buttonStop = document.querySelector('button.button--stop');


// global variables:
// - fallback, a sting passed to the synthesizer if the textarea element has no value
// - isMouseInRange, to modify the options of the inputs of type range only when the mouse is down on them (and later moved)
// - isPlaying, to toggle between pause and play (by default set to false, and toggle it to true whenever clicking the mic button)
const fallback = 'Write something here, hit the mic and behold, the program talks back! Amazing, 🙌';
let isMouseInRange = false;
let isPlaying = false;

// initialize variable in which to store the voice and a variable in which to store the markup eventually injected in the contentEditable div
let voice = '';
let markup = '';

// function called when retrieving the text input, to sanitize a few text elements requiring escaping
// called as the second argument of the String.replace() function
function handleBasicSanityCheck(match) {
  // replace a matching value with the escaped counterpart
  switch (match) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '\"':
      return '&quot;';
    case '\'':
      return '&#x27;';
    case '/':
      return '&#x2F;';
    default:
      return '';
  }
}

// function called in response to the mousemove event on the input elements
function handleMove(e) {
  // pre-emptively exit the function if the arbitrary boolean is set to false
  if (!isMouseInRange) {
    return false;
  }

  // retrieve the name and value of the input of type range
  const { target } = e;
  const { name, value } = target;

  // change the properties on the utterance instance to match with the new values
  utterance[name] = value;
}
// toggle the boolean when the mouse is down/up on the input elements
inputRanges.forEach(inputRange => inputRange.addEventListener('mousedown', () => isMouseInRange = true));
inputRanges.forEach(inputRange => inputRange.addEventListener('mouseup', () => isMouseInRange = false));
// call the function updating the options when moving the cursor on the input elements
inputRanges.forEach(inputRange => inputRange.addEventListener('mousemove', handleMove));


// function called in response to a click on the toggle button
// show the correct svg by using the reference to voice-play and voice-pause
function handleToggle() {
  isPlaying = !isPlaying;
  let reference = '';
  if (isPlaying) {
    reference = 'voice-pause';
    // resume the speech
    synth.resume();
  } else {
    reference = 'voice-play';
    // pause the speech
    synth.pause();
  }
  buttonToggle.innerHTML = `<svg><use href="#${reference}"</svg>`;
}

// function called in response to a click on the stop button
function handleStop() {
  // stop the audio and hide the buttons from view, removing also the attached event listeners
  synth.cancel();

  // apply a class of .active to the other two buttons, showing them
  buttonToggle.classList.remove('active');
  buttonStop.classList.remove('active');
  // attach event listeners on the two buttons, to pause/resume the speech and stop it respectively
  buttonToggle.removeEventListener('click', handleToggle);
  buttonStop.removeEventListener('click', handleStop);

  // empty the value of the div container
  textInput.textContent = '';

  // attach the event listener to the speak button, as to allow another instance of utterance
  // re-attacha class of active to show the hover state (mirror behavior with respect to the other two buttons)
  buttonSpeak.classList.add('active');
  buttonSpeak.addEventListener('click', speak);
}

// function called in response to the onboundary event, to update the UI according to the spoken text
function handleBoundary(e) {
  // char index refers to the index at which the utterance hits a boundary
  const { charIndex } = e;
  // to avoid highlighting a word midway through, find the index of the nearest whitespace after this index
  const { text } = e.currentTarget;
  let lastIndex = text.indexOf(' ', charIndex);
  // the index of the whitespace or the very last position in the string, to nicely wrap the entire text
  if (lastIndex === -1) {
    lastIndex = text.length;
  }
  // inject the text up to lastInde in a mark element, effectively highlighting it
  markup = `
      <mark>${text.substring(0, lastIndex)}</mark>
      ${text.substring(lastIndex)}
    `;
  textInput.innerHTML = markup;
}

// function called in response to a click on the speak button
// ! the event listener is attached on the button only when the voices from the speechSynthesis object are readily available
function speak() {
  // change the boolean to true and show the pause icon
  isPlaying = true;
  buttonToggle.innerHTML = '<svg><use href="#voice-pause"</svg>';

  // extract the text from the div container
  const { textContent: value } = textInput;

  // for the utterance, set the text to the value or a fallback if this returns false
  let speech = fallback;
  if (value) {
    // sanitize the text covering a few special characters
    speech = value.replace(/[&<>"'/]/gi, handleBasicSanityCheck);
  } else {
    // else set the text content to the fallback value, as to highlight this text as well
    textInput.textContent = speech;
  }

  // set the options specified by the speech and the (retrieved) voice
  utterance.text = speech;
  utterance.voice = voice;

  // when the utterance hits a boundary, call the handleBoundary function to update the UI
  utterance.onboundary = handleBoundary;

  // when the utterance is over, call the handleStop function to terminate the current synth
  utterance.onend = handleStop;
  synth.speak(utterance);

  // remove a class of active from the button.speak, as to remove the hover animation
  // remove the event listener to the same button, to avoid overlapping utterances
  buttonSpeak.classList.remove('active');
  buttonSpeak.removeEventListener('click', speak);

  // apply a class of .active to the other two buttons, showing them
  buttonToggle.classList.add('active');
  buttonStop.classList.add('active');
  // attach event listeners on the two buttons, to pause/resume the speech and stop it respectively
  buttonToggle.addEventListener('click', handleToggle);
  buttonStop.addEventListener('click', handleStop);
}

// funciton called in response to the _onvoiceschanged_ method, when voices are changed (or made available)
function retrieveVoices() {
  // retrieve the voices from the speechSynthesis object
  const voices = synth.getVoices();

  // if available, store the first english-speaking voice you get in the option object
  if (voices) {
    voice = voices.find(item => /en/gi.test(item.lang));
    // attach a listener for a click event on the button, which can now trigger the speechSynthesis object with the retrieved voice
    buttonSpeak.addEventListener('click', speak);
  }
}

retrieveVoices();
// call the getVoices function when the onvoiceschanged method occurs
synth.onvoiceschanged = retrieveVoices;
