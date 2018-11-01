# D3 Spider Plot

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

While sorting my notes on D3, I decided to create a simple visualization made up of a bar plot to practice with the concept of [object constancy](https://bost.ocks.org/mike/constancy/). Tinkering with simple visualization, and letting my brain stew on the subject a little, I realized I had maybe a solution to one of my long-standing d3-related issues: how to create a bar blot.

I am sure the approach is not the best way to plot a spider, or joy plot. I am awayre also that a spider plot is not a viable visualization for most datasets, and there are plenty more simple, effective layouts. Cognizent of this, the approach is as follows:

- create a scale for the data points;

- for each category in which the data points are detailed, draw a line. Rotate the lines according to how many categories there exist;

- for the value assumed by the data points, plot a circle element, rotating its position fom the first line, to match the second, third, fourth as needed;

- retrieve the x and y coordinates of the circle points;

- use a path or polygon element to connect all those coordinates.
