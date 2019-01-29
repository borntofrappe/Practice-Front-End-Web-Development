# Speech Recognition

Link to the work-in-progress pen [right here](https://codepen.io/borntofrappe/full/exzxgB).

## Preface

One of the hopefully more teaching and entertaining projects in the #javascript30 course, this project is tasked with the exploration and use of the Web Speech API.

## Update Day 1 - 28/01/2019

I decided to spend the first day in crafting the UI of the application. This has allowed me to tinker with a simple CSS drawn icon to craft a rather pleasing design. I don't seem to immediately be able to consider the input from the SpeechRecognition instance, but I don't know whether it has something to do with my microphone or my lack of practice with the library.

## Update Day 2 - 29/01/2019

Updated the UI to match the expectations of the project. As it stands, the container displays a hint, a placeholder guiding the user toward the desired action.

I also started working on the JavaScript, but I am currently having some issues with the microphone. I cannot seem to have the mic working on chrome. It is a bit disappointing. I've tried out [this reference website](https://mdn.github.io/web-speech-api/speech-color-changer/) from MDN, but that one comes back with the same error: _no speech_. It's quite weird, given that locally Cortana can hear me, but on the website, no input is being registered.
