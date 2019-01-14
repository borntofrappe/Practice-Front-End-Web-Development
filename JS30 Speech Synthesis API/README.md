# Talk back to me

You can find the proud result of this repo [right here](https://codepen.io/borntofrappe/pen/JwwJgZ) on codepen.

## Preface

This is the first of perhaps two projects I intend to pursue with the Web Speech API, following the docs from MDN, which you can find [right here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), and a couple videos from @websos, and his #javascript30 course, which I'll link to it later, as I review the content.

Apparently, the API is made up of two parts: SpeechSynthesis and SpeechRecognition. Both offer exciting opportunities, in text-to-speech and speech recognition applications. With this specific effort, I plan to tacle the first, using the SpeechSynthesis API to create a very simple interface in which any text displayed in a _textarea_ element is recited verbatim back to the visitor.

## Design

The interface of the project is nothing special, but particular attention was given to the color palette and the background applied through multiple radial gradients. Repeating radial gradients actually. I spell out this feat to remark the possibility which are available when using such gradients and the _transparent_ keyword, opening up quite a few entertaining opportunities.

In addition to the background of the application, I had some fun with the UI of the actual application. The colors quite complement each other, and the simple animations included for the buttons, alongside CSS properties styling the input elements of type range, really made a difference.

## Development

I managed to document the code as I was developing the application, and it gives an idea as to how implement the speech synthesis API. That being said, and especially as I added new features (the possibility to toggle and stop the audio for instance), I acknowledge that the codebase has become quite cluttered. With this section I plan to document my experience with the API in question.

Here's the gist of how to use the _Speech Synthesis API_:

- retrieve a reference of the `speechSythesis` object:

  ```js
  const synth = window.speechSynthesis;
  ```

- create an utterance. This is what ultimately is passed to the `synth.speak()` method, and utters whichever text is specified.

  ```js
  const utterance = new SpeechSynthesisUtterance();
  ```

  Setting the `utterance` as a global variable allows to later access it in multiple methods.

- to properly utter a sentence, the instance of the `SpeechSynthesisUtterance` object needs a voice. Voices can be retrieved through the `synth.getVoices()` method, but voices might take some time to be readily available. with this in mind.

  create a global variable in which to store voices (or in this case the voice).

  ```js
  let voice = "";
  ```

  Following `onvoiceschanged` method, call a function to make use of available voices.

  ```js
  synth.onvoiceschanged = retrieveVoices;
  ```

  A simple function to retrieve the voice might look something as follows:

  ```js
  function retrieveVoices() {
    // retrieve the voices from the speechSynthesis object
    const voices = synth.getVoices();

    // if available, store the first english-speaking voice you get in the option object
    if (voices) {
      voice = voices.find(item => /en/gi.test(item.lang));
    }
  }
  ```

- with this basic setup, it is possible to use the `synth` object to utter any piece of text.

  Just include the voice and the text in the `utterance` instance:

  ```js
  utterance.voice = voice;
  utterance.text = "Amazing!";
  ```

  And use the afore-mentioned `speak` method to let the program speak.

  ```js
  synth.speak(utterance);
  ```

This simple unordered list covers a very basic example. In the project, I set additional properties and even listeners, allowing to:

- change the pitch and the rate, through the respective properties on the `utterance` instance.

  ```js
  utterance.rate = someRateValue;
  utterance.pitch = somePitchValue;
  ```

- cancel the instance when reaching the end of the `utterance`

  ```js
  utterance.onend = function() {
    synth.cancel();
  };
  ```

- pause and resume the instance, through the `synth.pause()` and `synth.resume()` functions.

- update the UI of the application to highlight each spoken word. This required a bit more trickery and use of the `onboundary` event, which is fired off whenever the synthesizer reaches a boundary (word). By leveraging the index the event gives in the `e.charIndex` property, it is roughly possible to find the exact position of the spoken text.

With this last feature in mind, I had to change the UI of the application, from a `textarea` element to a `div` container with a property of `contentEditable`. To cover a few edge cases I 'sanitized' the input with a simple regular expression and injected the spoken text in the `div` container, wrapping the spoken words in `mark` elements.

I might really come back to this project, if nothing to see the use of seldom used CSS selectors (`:empty`) and how to sanitize input text. With this last regard, I am sure the approach I took, using a simple regular expression, is quite naive. Another area of study: how to sanitize user input.
