// create an instance of the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

// set a few options
recognition.lang = 'en-US';

// interim results allow to retrieve the transcript as something is being said, and not only after it was said
// default to false
recognition.interimResults = true;


// target the container in which to add the text matching the speech
const speech = document.querySelector('.app__speech');
// target the parrot, as to request mic access only as the animation is complete
const parrot = document.querySelector('.app__parrot');


// initialize a variable to keep track of the text
// pauses should be the equivalent of a new line, so create a paragraph for each set of continuous speech
let p = document.createElement('p');
speech.appendChild(p);

// on result event listener
// show the words in the container
recognition.onresult = function (e) {
  /* in the eevent being registered
  the result is found in the **results** object
  the actual word in the results[0][0] object, which considers the actual result (first array) and the first alternative (second array)
  (there can be more alternatives if the recognition instance is set up accordingly and through the .maxAlternatives prop)
  in this object you find the following properties
  1. confidence [seemingly a 0-1 range]
  1. transcript [the proposition matching the user input]
  */

  // find the word being registered by the web spech API, and the level of confidence
  const { transcript, confidence } = e.results[0][0];
  const { isFinal } = e.results[0];


  // append it to the variable and display it in the container
  // ! only with a decent degree of confidence
  if (confidence > 0.5) {
    p.textContent = transcript;

    colors.forEach(color => {
      if (transcript.toLowerCase().includes(color)) {
        p.style.setProperty('--color-accent', color);
      }
    })

    if (transcript === 'clear') {
      speech.innerHTML = '';
    }

    if (isFinal) {
      p = document.createElement('p');
      speech.appendChild(p);
    }
  }
};

recognition.addEventListener('end', recognition.start);
// recognition.onend = function (e) {
//   recognition.start;
// }

// onerror event listener
// notify the user possibly with an error message
recognition.onerror = function (e) {
  const { error } = e;
  if (error === 'not-allowed') {
    speech.innerHTML = `
    Oh - oh, something happened.
     <br/>
    Error: ${error}
    `;
  }
};

recognition.start();
// start the recognition asking for permission to listen to the mic
// parrot.addEventListener('animationend', () => recognition.start());