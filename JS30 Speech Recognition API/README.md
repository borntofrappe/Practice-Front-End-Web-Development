# Speech Recognition

Proud working pen [right here](https://codepen.io/borntofrappe/full/exzxgB).

In this folder you find the UI and the complete files in the **Working Project** folder. You need a bit of a setup to enjoy it locally.

## Preface

One of the hopefully more teaching and entertaining projects in the #javascript30 course, this project is tasked with the exploration and use of the Web Speech API.

## Update Day 1 - 28/01/2019

I decided to spend the first day in crafting the UI of the application. This has allowed me to tinker with a simple CSS drawn icon to craft a rather pleasing design. I don't seem to immediately be able to consider the input from the SpeechRecognition instance, but I don't know whether it has something to do with my microphone or my lack of practice with the library.

## Update Day 2 - 29/01/2019

Updated the UI to match the expectations of the project. As it stands, the container displays a hint, a placeholder guiding the user toward the desired action.

I also started working on the JavaScript, but I am currently having some issues with the microphone. I cannot seem to have the mic working on chrome. It is a bit disappointing. I've tried out [this reference website](https://mdn.github.io/web-speech-api/speech-color-changer/) from MDN, but that one comes back with the same error: _no speech_. It's quite weird, given that locally Cortana can hear me, but on the website, no input is being registered.

# Update Day 3 - 30/01/2019

After re-opening the project with my mobile phone, and tinkering a bit with the event listeners, I was able to indeed find a response from the SpeechRecognition instance. That got me started, but luckily I also found another keyboard-friendly device to develop the rest of the application.

It allowed me not only to tinker with the Web Speech API, but to also bring back a bit of back-end material. It is a rather small, tentative participation, but it is there nonetheless. Luckily, spinning up a server is a simple matter of installing express and running a small script which references the HTML and the stylesheet/script files with a simple middleware function.

To keep things organized:

- scrap the `script.js`file from the root folder, and display only the files making up the UI of the application. Files updated with the more friendly parrot icon.

- add a 'complete' or otherwise labeled folder in which to include the `package.json` file alongside the script spinning up a localhost server and the necessary files. This is where, in the public sub-folder specifically, you find all the JavaScript code necessary to run a functioning, simple, speech recognition application.
