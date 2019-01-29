// create an instance of the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// set a few options
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;
// target the container in which to add the text matching the speech
const speech = document.querySelector('.app__speech');


// onstart event listener
// notify the user through a simple message
recognition.onstart = function (e) {
  speech.textContent = 'Let\'s go!';
};

// on
recognition.onspeechstart = function (e) {
  console.log(e);
};


// onerror event listener
// notify the user possibly with an error message
recognition.onerror = function (e) {
  const { error } = e;
  speech.innerHTML = `
  Oh - oh, something happened.
   <br/>
  Error: ${error}
  `;
};

// start the recognition asking for permission to listen to the mic
recognition.start();
