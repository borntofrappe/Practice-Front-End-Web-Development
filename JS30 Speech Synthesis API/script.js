// retrieve a reference to the speechSynthesis API
const synth = window.speechSynthesis;

// store a reference to the button and input elements
const buttonSpeak = document.querySelector('button#feature--speak');
const inputRanges = document.querySelectorAll('input[type="range"]');

// global variables:
// - fallback, a sting passed to the synthesizer if the textarea element has no value
// - isMouseInRange, to modify the options of the inputs of type range only when the mouse is down on them (and later moved)
// - options, to alter the settings of the voice

const fallback = 'Write something here, hit the mic and behold, the program talks back!';
let isMouseInRange = false;
// initialize  variable to keep track of the voice and other options
const options = {
  voice: '',
  pitch: 1,
  rate: 1

};


// function called in response to the mousemove event on the input elements
function handleMove(e) {
  // pre-emptively exit the function if the arbitrary boolean is set to false
  if (!isMouseInRange) {
    return false;
  }

  // retrieve the name and value of the input of type range
  const { target } = e;
  const { name, value } = target;

  // change the option bearing the same name of the input element with the obtained value
  options[name] = value;
}
// toggle the boolean when the mouse is down/up on the input elements
inputRanges.forEach(inputRange => inputRange.addEventListener('mousedown', () => isMouseInRange = true));
inputRanges.forEach(inputRange => inputRange.addEventListener('mouseup', () => isMouseInRange = false));
// call the function updating the options when moving the cursor on the input elements
inputRanges.forEach(inputRange => inputRange.addEventListener('mousemove', handleMove));


// function called in response to a click on the selected button
// ! the event listener is attached on the button only when the voices from the speechSynthesis object are readily available
function speak() {
  // extract the text from the textarea element
  const { value } = document.querySelector('textarea');

  // create an instance of SpeechSynthesisUtterance and use the .speak() method available on the synth object
  // use the value of the textarea, or the fallback value
  const speech = value || fallback;

  const utterance = new SpeechSynthesisUtterance(speech);
  // set the options specified in the options object
  utterance.voice = options.voice;
  utterance.rate = options.rate;
  utterance.pitch = options.pitch;

  synth.speak(utterance);
}

// funciton called in response to the _onvoiceschanged_ method, when voices are changed (or made available)
function retrieveVoices() {
  // retrieve the voices from the speechSynthesis object
  const voices = synth.getVoices();

  // if available, store the first english-speaking voice you get in the option object
  if (voices) {
    options.voice = voices.find(item => /en/gi.test(item.lang));
    // attach a listener for a click event on the button, which can now trigger the speechSynthesis object with the retrieved voice
    buttonSpeak.addEventListener('click', speak);
  }
}

retrieveVoices();
// call the getVoices function when the onvoiceschanged method occurs
speechSynthesis.onvoiceschanged = retrieveVoices;
