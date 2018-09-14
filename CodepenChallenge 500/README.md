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