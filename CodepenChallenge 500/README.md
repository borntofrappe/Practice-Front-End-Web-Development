Link to the working pen right [here](https://codepen.io/borntofrappe/full/zJJrEV).

## Preface

For the weekly #codepenchallenge, I plan to create a simple application, which allows to press a button and have a response from an hypothetical server hit back. The application shows itself with the afore mentioned button and a monitor, in which the response will be actually displayed. Considering the technical aspects of the project, the application will use React and the styled-component library, allowing me to put in more practice with both.

The response of the server, as per the weekly topic, wlll be a 500 error. Error chosen at random between the possible 500 error values, with a possible description of the mishap and a message of comfort.

For the application, the structure of the button and the list of error messages I was inspired by the following sources:

- a [LevelUpTuts video](https://www.youtube.com/watch?v=M24k18agaso), which was itself spurred by a tweet [@wesbos](https://twitter.com/wesbos/status/952935092774633472?lang=en), motivating me to create a button which changes in value and possibly style as it is pressed;

- [good email copy](https://www.goodemailcopy.com/), motivating me to create a series of comforting, conversational messages supporting the user through the error message. A 500 error seems to be a mistake out of the users' reach, and it is a perfect situation in which to show a bit of empathy and sympathy;

- Server error responses as described on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Server_error_responses), specifically 500 status codes.


## Design

You can find the basic wiring of the application, its design and layout, in the 'Project Skeleton' folder. The page is structured as follows:

- a monitor, boldly taking up the large portion of the page, to display the error message and possibly comforting message;

- a button, right beneath it, to send a request or otherwise try to connect to the server (before encountering one of the inevitable errors).

- an svg line element, separating the two core elements.

As far as colors are concerned, I decided to include simple white/black-ish colors, and to add only a bit of flair in the activity bar of the monitor (in which to show two possible actions, through reddish and greenish circles).

The SVG is to be animated in the `stroke-dasharray` and `stroke-dashoffset` properties, to envision a connection between the elements it separates.

**Update**

Concerning the color palette, I was less than inspired by the chosen hues, so I decided to search for an alternative pair of colors, and include them in the background in a duo-tone pattern. Solid color begets solid color, as the two are included side by side through a linear-gradient.

## Data

In `data.js` I specified each error message, with the fields of `id`, `heading` and `description`. While the first property is purely for peace of mind, the second and third are to be included in the monitor, through a heading and a paragraph element.

**Update**

Instead of including the description in a single paragraph, I decided to section the error description into multiple lines. In React, this feat is achieved by describing the error message in an array of strings and have each item wrapped in between `<p>` tags.

## React App

From the structure explained in the HTML & CSS skeleton, the application powered by React needs to account for the following dynamics:

- immediately, as the page loads, introduce the monitor and button. Do not show at this stage the line connecting the two sections, and as a matter of fact retrieve the exact length of the line as to completely hide it;

- once the button is pressed, and only then, alter the value of the button to go from "send request" to something along the lines of "sending". Together with this modification, begin the animation of the SVG line, and keep track of how long this animation will take as to later introduce the text at the right moment;

- once the animation is completed, and after a brief delay, introduce the text. Stop here the animation of the SVG line and alter the text of the button as to display the occurrence.

This is important: do not allow a press on the button if the animation is currently ongoing. At first I thought about handling this case by resetting the animation, but it is better to handle one request at a time.

**Update**

The choice of handling only one request at a time worked wonders in conjunction with the `cursor` property, modified for the button to a value of `not-allowed` while the animation is ongoing.

## Styled Components

To practice once more with the library, I decided to move the CSS logic for the style of the different HTML elements to styled components.

**Update**

In this round of practice I made use of the recurrent `styled` method, but also `keyframes`, to create a keyframe animation later referenced by a styled component.

For some reason this created quite a few issues on CodePen, where the `keyframes` function wasn't properly recognized (sometimes it was recognized, but only in "pen" mode and not "full" mode...wonder). This brough me to include the animations in the CSS stylesheet, but doesn't negate the progress made with the library locally, through the `create-react-app` utility.

For the `keyframes` function, and posterity's sake, `styled-components` works as follows:

1. import the appropriate functions

    ```JS
    import styled from 'styled-components';
    import { keyframes } from 'styled-components';
    ```

1. create the animation following the same pattern/ syntax used in CSS

    ```JS
    const fadeDown = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100vh) scale(1);
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    `;
    ```

1. reference the animation in the `animation` property, "injecting" the JavaScript variable through {curly brackets}, prefaced by a $ dollar sign. This is how styled component handles JavaScript logic in between `backticks`.

    ```JS
    const Button = styled.button`

    animation: ${fadeDown} 0.7s 0.7s cubic-bezier(.25,-0.3,.5,1.5) both;

    `;
    ```

    This, of course, in the styled component created through the `styled` function.