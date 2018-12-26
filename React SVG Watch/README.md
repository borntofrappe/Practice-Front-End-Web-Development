# React Watch

Semi-proud work-in-progress pen [right here](https://codepen.io/borntofrappe/full/ebRVJd).

## Preface

I found myself staring at the clock application on my mobile, mesmerized by the design na dits simple animation. After thinking a while on how to re-create the application on the web, I decided to try out my luck with React and styled-components.

**Update notice**

While developing the application, trying things out with little luck, I stumbled upon a good idea: developing the entire watch in an SVG element. I therefore decided to drop `styled-components`, use `index.css` to center the SVG and then complete the watch specifying the SVG attribute-value pairs, for each of the nested element.

Taking inspiration from `D3.js`, I also decided to implement a _margin convention_, as to frame every element well inside the SVG, and avoid cropping, by nesting a first `<g>` element and have it move within the boundaries of the outermost SVG.

I also decided to change the name of the project, to React SVG Watch, or React SVGatch, and to sketch down a piece of paper the way I plan to implement the project.

## Plan

The project is sketched out with the following components:

```text
<svg> // container with a width and height
  <g> // container translated as per the margin convention
    <circle> // outer ring of the watch
    <Digits>
    <Hours>
    <Minutes>
    <Seconds>
    <circle> // inner ring of the watch, overlaid on top of the hands
```

The three components between the `<circle>` elements describe the visuals of the watch. As follows:

### Digits

Component taking through the `props` object:

- howMany: an integer between 1 and 12 describing the number of digits to be displayed around the outermost ring;

- spread: the amount of space describing the point of origin from which all text element will be separated, all around the clock's face. It is used here, and for the other components, to center the elements.

- distance: the amount of space between the point of origin and where the text elements will eventually be positioned. In the instance of the text element, this should be almost of precisely exactly like the _spread_.

Itself, the component ought to be structured as follows:

```text
<g> // used mainly for grouping the elements
  <DigitsText> // a series of text elements positioned in the center and placed all around the clock according to the _howMany_ argument
```

### Hours

`props` arguments:

- spread: similar connotations to `Digits`;

- size: the length of the clock's hand;

- hours: an integer describing the hours and the rotation of the path element.

Structure:

```text
<g> // used to center the path
  <path> // element describing a straight line (a <line> element can be equally used) and rotated by the number of hours, to indicate the correct time frame
```

### Minutes

`Minutes` behaves pretty much like `Hours`, except it accepts `minutes` through props and this is an integer potentially larger than the highest hour value.

The structure is also and eerlily similar, barring a thicker `strokeWidth` and higher `opacity` (or with a color of stronger contrast).

### Seconds

Seconds is actually different than the minutes and hours counterpart. Indeed, instead of showing a clock's hand, it is planned as a series of ticks, positioned within the boundaries of the outermost ring and describing the number of seconds by highlighting the tick corresponding to the number of seconds. It will take through `props` values rather similar to the other two components, but it requires a bit more planning.