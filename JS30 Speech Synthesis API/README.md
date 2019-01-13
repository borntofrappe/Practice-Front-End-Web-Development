# Talk back to me

You can find the proud result of this repo [right here](https://codepen.io/borntofrappe/pen/JwwJgZ) on codepen. It's still missing a feature though. Namely changing the rate/pitch **as** the text is being read. I also need to jot down a few notes on the API and how to use it.

## Preface

This is the first of perhaps two projects I intend to pursue with the Web Speech API, following the docs from MDN, which you can find [right here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), and a couple videos from @websos, and his #javascript30 course, which I'll link to it later, as I review the content.

Apparently, the API is made up of two parts: SpeechSynthesis and SpeechRecognition. Both offer exciting opportunities, in text-to-speech and speech recognition applications. With this specific effort, I plan to tacle the first, using the SpeechSynthesis API to create a very simple interface in which any text displayed in a _textarea_ element is recited verbatim back to the visitor.

## Design

The interface of the project is nothing special, but particular attention was given to the color palette and the background applied through multiple radial gradients. Repeating radial gradients actually. I spell out this feat to remark the possibility which are available when using such gradients and the _transparent_ keyword, opening up quite a few entertaining opportunities.

In addition to the background of the application, I had some fun with the UI of the actual application. The colors quite complement each other, and the simple animations included for the buttons, alongside CSS properties styling the input elements of type range, really made a difference.

## Development

I managed to document the code as I was developing the application, and it gives an idea as to how implement the speech synthesis API. That being said, and especially as I added new features (the possibility to toggle and stop the audio for instance), I acknowledge that the codebase has become quite cluttered. With this section I plan to document my experience with the API in question.
