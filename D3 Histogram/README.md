<!-- Link to the work-in-progress pen right [here](). -->

## Preface

This project sets out to practice with an additional layout function, as provided by the D3.js library.

The layout function in question: `d3.histogram()`. What this function achieves is creating a series of bins in which data points are sorted. The size of each bins can be estimated through the `length` property of each array. Each array specifies the values and two additional arguments: `x0` and `x1`. These could be actually used to plot one rectangle element for each array horizontally, but the index can also be used for the same purpose.
