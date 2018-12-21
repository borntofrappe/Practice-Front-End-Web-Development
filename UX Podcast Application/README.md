# UX Podcast App

Proud result live [right here on codepen](https://codepen.io/borntofrappe/full/YdGwow).

## Preface

Following up the effort initiated in the **UI Podcast App** folder, I decided to develop the application a bit further, with Vanilla JavaScript. This even if the idea was to create a full-fledged React application.

Features:

- play, pause;

- mute/unmute;

- change the speed;

- stop (meaning go back to 00:00:00).

## Update 19-12-2018

Another feature added with regards to the progress bar. It is now possible to change the current time stamp by interacting with the bar atop the play/pause button. Quite the neat, much needed functionality.

Functionality complemented by a tooltip, shown when hovering on the progress bar itself. Inspired by D3.js.

## Update 20-12-2018

Another great step toward completing this application. Adding a panel in which it is possible to select other episodes.

I quite enjoy how I created the panel with a scrollable list.

As it currently stands, the application makes use of static files, and hard-coded URL for the different audio files, but it is more a proof of concept than the final product. Final product which will need to incorporate information from the RSS feed and benefit from event delegation to target buttons and audio elements not yet present on the page.

To do: fix the volume icon. It's hideous.
