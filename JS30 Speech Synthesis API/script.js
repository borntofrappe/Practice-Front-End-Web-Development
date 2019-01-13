// retrieve a reference to the speechSynthesis API
const { speechSynthesis } = window;
// retrieve a reference to the button element
const buttonSpeak = document.querySelector('button#speak');


// initialize  variable to keep track of the voice and other options
const options = {
  voices: '',
  fallback: 'These voices. They\'re outside. Where I must be.'
};

// function called when clicking the speak button (and when voices are readily available)
// ! attach an event listener on the button only when the voices from the speechSynthesis object are readily available
function speak() {
  // extract the text from the textarea element
  const { value } = document.querySelector('textarea');

  // create an instance of SpeechSynthesisUtterance and use the .speak() method available on the speechSynthesis object
  // use the value of the textarea, or the fallback value detailed in the options if this proves to be an empty string
  const speech = value || options.fallback;

  const utterance = new SpeechSynthesisUtterance(speech);
  utterance.voice = options.voice;
  speechSynthesis.speak(utterance);
}

// funciton called in response to the _onvoiceschanged_ method, when voices are changed (or made available)
function getVoices() {
  // retrieve the voices from the speechSynthesis object
  const voices = speechSynthesis.getVoices();

  // if available, store the first english-speaking voice you get in the option object
  if (voices) {
    const englishVoices = voices.filter(voice => voice.lang === 'en-GB');
    options.voices = englishVoices[0];

    // attach a listener for a click event on the button, which can now trigger the speechSynthesis object with the retrieved voice
    buttonSpeak.addEventListener('click', speak);
  }
}

// call the getVoices function when the onvoiceschanged method occurs
speechSynthesis.onvoiceschanged = getVoices;
