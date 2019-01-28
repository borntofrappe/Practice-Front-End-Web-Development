// create an instance of the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// set a few options
recognition.lang = 'en-US';

// target the container in which to add the text matching the speech
const speech = document.querySelector('.app__speech');


// onerror event listener
// notify the user direclty in the selected containarr
recognition.onerror = function (e) {
  const { error } = e;
  speech.innerHTML = `
   Oh-oh, something happed.
   <br/>
   Error: ${error}
  `;
};

// start the recognition asking for permission to listen to the mic
// recognition.start();
