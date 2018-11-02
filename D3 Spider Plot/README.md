# D3 Spider Plot

Link to the working pen right [here](https://codepen.io/borntofrappe/full/MzWwRv).

## Preface

While sorting my notes on D3, I decided to create a simple visualization made up of a bar plot to practice with the concept of [object constancy](https://bost.ocks.org/mike/constancy/). Tinkering with simple visualization, and letting my brain stew on the subject a little, I realized I had maybe a solution to one of my long-standing d3-related issues: how to create a bar blot.

I am sure the approach is not the best way to plot a spider, or joy plot. I am awayre also that a spider plot is not a viable visualization for most datasets, and there are plenty more simple, effective layouts. Cognizent of this, the approach is as follows:

- create a scale for the data points;

- for each category in which the data points are detailed, draw a line. Rotate the lines according to how many categories there exist;

- for the value assumed by the data points, plot a circle element, rotating its position fom the first line, to match the second, third, fourth as needed;

- retrieve the x and y coordinates of the circle points;

- use a path or polygon element to connect all those coordinates.

## Update

The approach turned out to be the wrong solution. Retrieving the x and y coordinates of the rotated points returns the original coordinates, not the new ones. Turns out, "all" I needed was a bit of math. Including a couple of formulae (in the realm of trigonometry) it is possible to identify the specific points and later include circle and path elements as needed.
