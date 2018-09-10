Link to the working pen right [here](https://codepen.io/borntofrappe/full/LJQObZ/).

## Preface

In my quest to master D3.js, I was once more inspired by [Data to Viz](https://www.data-to-viz.com/). This rather helpful website provides heaps of possible visualizations, from established and already implemented layouts to new and intriguing choices.

For the relatively small exercise of the day, I decided to pick and plot a box plot. This proved to be a good pretext to practice with the data driven library and SVG syntax.

The comments do a pretty good job explaining the process, but the logic is rather straightforward:

- compute the metrics required for the box plot: the median, the first and third quartile, the extremes;

    This values can be computed through JavaScript logic implementing statistical formulae, or more handily using functions provided by D3.js.

- based on the metrics, include simple SVG shapes, such as lines, rectangles and circles to plot the box itself and the observations all around it.