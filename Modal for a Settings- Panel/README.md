Link to the working pen right [here](https://codepen.io/borntofrappe/full/vjaeJd/).

# Preface 

The purpose of this project is the creation of a settings' panel, which is shown on screen at the toggle of a button. The component is eventually included in the larger project in which I am currently invested, namely the creation of a Tic-Tac-Toe game, but it is also a good excuse to practice with different approaches, and weigh their feasibility/ usefulness.

Indeed I often hear thrown around HTML elements such as modals or dialogues. I therefore got to wonder about the best approach in displaying the settings behind a page, in a functional and then pleasing way.

# Plan

- [x] research HTML elements such as modal and dialogue. 
- [x] browse codepen/ the larger web to assess how settings are incorporated in a web application.

# Notes

Starting with a quick look-see in google drive, the settings are tucked behind an icon, with a card/panel shown on top of the underlying application. In google keep, settings are slightly more out of reach, as they are located in the navigation drawer, but they are always displayed with an overlay. 

Concerning the elements cited in the planning phase:

- The dialogue element, while intriguing, doesn't seem to be supported in any of the IE/ Edge browsers. 

- Modal doesn't actually seem to be an element. While a staple of frameworks like Bootstrap and Materialize, it is just an approach at displaying an overlay on top of the application.

Considering this last approach, I decided to create a simple panel which is toggled in visibility and opacity into and out of view. At the end of the day it may not fall in either of the cited approaches, but it is a nice excuse to practice with transition, especially multiple transform values to create a neat, swoshing animation.
