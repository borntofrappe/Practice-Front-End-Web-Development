<!-- Link to the work-in-progress pen right [here](). -->

## Preface

For the weekly #codepenchallenge, I was inspired by several sources, to create a React-powered, styled-components-flared straightforward application.

A simple application in which a button is used to send a request or otherwise try to connect to a server, before inevitably encountering a 500 error. An error chosen at random between the possible 500 error values, with a possible description of the mishap and a message of comfort.

Specifically, I was inspired by the following:

- a [LevelUpTuts video](https://www.youtube.com/watch?v=M24k18agaso), which was itself spurred by a tweet [@wesbos](https://twitter.com/wesbos/status/952935092774633472?lang=en), motivating me to create a button which changes in value/style as it is pressed;

- [good email copy](https://www.goodemailcopy.com/), motivating me to create a series of comforting, conversational messages supporting the user through the error message. A 500 error seems to be a mistake out of the users' reach, and it is a perfect situation in which to show a bit of empathy and sympathy;

- Server error responses as described on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Server_error_responses), specifically 500 status codes.


## Design

You can find a first rendition of the design in the 'Project Skeleton' folder. The page is structured as follows:

- a monitor, boldly taking up the large portion of the page, to display the error message and possibly comforting message;

- a button, right beneath it, to send a request or otherwise try to connect to the server (before encountering one of the inevitable errors).

- svg line element, separating the two core elements.

As far as colors are concerned, I decided to include simple white/black-ish colors, and to add only a bit of flair in the activity bar of the monitor (in which to show two possible actions, through reddish and greenish circles).

The SVG is to be animated in the `stroke-dasharray` and `stroke-dashoffset` properties, to envision a connection between the elements it separates.

## Data

For each error message, a short description is included, following which a "suggested message" is detailed. For status codes: 506, 507, 508, 510 much information is not available. I might opt to avoid them or include some generic information describing how developers don't know much about the issue, but they are working on it.

## React App

From the structure explained in the HTML+CSS skeleton, the application powered by React needs to account for the following dynamics:

- immediately, as the page loads, introduce the monitor and button. Do not show at this stage the line connecting the two sections, and as a matter of fact retrieve the exact length of the line as to completely hide it;

- once the button is pressed, and only then, alter the value of the button to go from "send request" to something along the lines of "sending". Jointly with this modification, begin the animation of the SVG line, and keep track of how long this animation will take as to later introduce the text at the right moment;

- once the animation is completed, and after a brief delay, introduce the text. Stop therefore the animation of the SVG line and alter the text of the button as to display the mishap.

This is important: do not allow a press on the button if the animation is currently ongoing. At first I thought about handling this case by resetting the animation, but it is better to handle one request at a time.


## Styled Components

To practice once more with the library, I decided to move the CSS logic for the style of the different HTML elements to styled components.

// TOD0: after the project, adding comments where needed and properly documenting the effort #alwayslearning