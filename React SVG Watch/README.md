# React Watch

Proud, and live!, pen [right here](https://codepen.io/borntofrappe/full/ebRVJd).

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

### Update

While developing the first three components, I realized that `spraed` would actually be repeated without modifications, so I decided to drop the argument and centralize its functionality in a wrapping group element.

A first group element is used to enfore the margin convention, the second to center the SVG elements in the SVG. This also allows to define the `<circle>` elements by setting `cx` and `cy` attributes to 0, and simply focus on the radius.

### Seconds Once More

In the end `spread` came back in full swing with the `Seconds` component. Indeed, as I want to create one tick for each second, and I'd like to have each tick start from the very end of the minute's hand and move toward the outermost ring, I need a measure from which to start off the path element. Hence the `spread` value.

With this in mind, `Seconds` accepts through `props` the following values:

- spread: where the tick ought to begin;

- size: the size of the tick. This should be small, but noticeable;

- seconds: not to actually draw a tick, but to give to a specific tick certain visual properties marking the current time.

The component destructures these arguments, draws 60 or even more ticks around the clock and attributes a special class to the tick representing the current second. By adding a transition which is definitely longer than a second, adding and removing this class allows to continuously animate successive ticks. As if time were to be flowing

```css
svg g.seconds path {
  opacity: 0.2;
  transition: 15s ease-out all;
}
svg g.seconds path.current {
  opacity: 1;
  stroke-width: 3px;
  transition: 1s ease-out all;
}
```

With these sets of property value pairs:

- it takes `15s` to reach an `opacity` value of `0.2`;

- it takes `1s` to reach the `opacity` of `1` and the described `stroke-width`, added for good measure.

I titled this section **Seconds and More** for a simple reason: the effect, while neat, is rather subdued. To remark the passage of time, it would also be nice to have a market, pointing at the exact second.

### Updating Time

Before actually diving in the implementation of a market for the seconds' ticks, it is actually high time to attach an interval to the application, as to update the time every second.

When the components are mounted:

```jsx
componentDidMount() {
    this.interval = setInterval(() => {
      const date = new Date();
      this.setState({
        date
      });
    }, 1000);
  }
```

### More than Seconds

As mentioned, the `Seconds` component suffered from a considerable issue: being too subtle. To compensate, a marker is introduced in the form of triangle, pointed toward the current second. This leverages a `path` element, simply using a few lines to craft the triangle in question.

### Pending Issues

There are still a few issues with how the rotation is applied to the `path` elements. Indeed, as the elements go from 360 to 0, it is animated _backwards_,

Additionally, as one tabs over to another page, the elements are not transitioned until the tab is switched back. It is entertaining, but unexpected. I might find a solution experimenting a bit more, but this project is considered good and done.

Pretty nifty watch.

### Final Update

I was still thinking about the issue the day after, so after a bit of thinking, I came up with a solution. It is not the most elegant fix, but it works far better than adding and removing a transition on the 359 degree threshold.

Simply put, through `state` I keep track of the number of times the hands and the marker go around the clock and increment the rotation by a matching number of turns. Instead of going back to 0 degrees, I rotate the hands and the marker 360, then 361 and so forth and so on.
