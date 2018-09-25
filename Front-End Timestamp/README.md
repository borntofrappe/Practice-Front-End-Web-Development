# Timestamp Front-End

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this particular effort I plan to create the UI for a soon-to-be project. The project in question: a timestap service, first project of five necessary to earn the **"**Microservices and APIs**"** certification @freecodecamp.

## Design

For the style of the application, I was mostly inspired by this [dribble project](https://dribbble.com/shots/5242858-Timestamp-Magazine-Logo). I really liked the idea of including overlapping elements on top of a header, and moved also by my recent project practicing with [node, express and pug](https://witty-recess.glitch.me/), I decided to include three input elements on the header itself. The input elements are used to include values for the day, month and year, to generate a query string through a UI. For the back-end project, the request should be carried out through a GET request, when specifying the number of milliseconds as well as when the year, month and day values are included.

### Color Palette

- #000 for the text of the application;

- #fff for the background, as well as the color of the button;

- #f4511e for the input elements, as well as the color paired with #fff for the button.

### Font

- Oswald, the light version (`font-weight: 300`) for the header

- Open Sans, for the text and the button element.

## Update

Once the design of the application was actually completed, I decided to actually go one step further and include some interactivity purely through vanilla JavaScript.

1. when clicking the button, the date object specified as per the values of the input elements is highlighted below the button.

1. when loading the script, random values are included in the input elements.