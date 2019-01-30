// create an instance of the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

/* global variables
array of colors, potentially used to style the paragraph elements
container element in which to display the text
container element for the parrot, to start listening only as the simple animation ends
*/
const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

const speech = document.querySelector('.app__speech');
const parrot = document.querySelector('.app__parrot');

// options on the speech recognition instance
// language
recognition.lang = 'en-US';

// interimResults, allowing to retrieve the transcript as something is being said, and not only after it has been said
// default to false
recognition.interimResults = true;

// create a paragraph element in which to display the text being registered from the speech recognition instance
// when registering a pause, re-initialize the element and append it as a new node in the container
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
  1. confidence [0-1 range, the higher the better]
  1. transcript [the proposition matching the user input]
  */

  // find the word being registered by the web spech API, and the level of confidence
  const { transcript, confidence } = e.results[0][0];
  // find whether the result is the last one of the current instance
  const { isFinal } = e.results[0];


  // ! continue only with a decent degree of confidence
  if (confidence > 0.5) {
    // modify the text of the paragraph element
    p.textContent = transcript;

    // if one of the color is found in the transcript string, use that color for the accent color of the specific paragraph
    colors.forEach(color => {
      if (transcript.toLowerCase().includes(color)) {
        p.style.setProperty('--color-accent', color);
      }
    })

    // if the transcript registers the word clear, remove all existing elements
    if (transcript === 'clear') {
      speech.innerHTML = '';
    }

    // if the instance of the result ends, re-initialize the paragraph and add it as a new element
    if (isFinal) {
      p = document.createElement('p');
      speech.appendChild(p);
    }
  }
};

// to keep listening, start the recognition as it reaches its end
recognition.addEventListener('end', recognition.start);

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

// start the recognition asking for permission to listen to the mic
parrot.addEventListener('animationend', () => recognition.start());