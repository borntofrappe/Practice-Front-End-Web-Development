# D3 Density

Link to the working pen right [here](https://codepen.io/borntofrappe/full/WgBLam).

## Preface

With this project I plan to finally plot a visualization detailing the density of a numeric variable distribution, This to build a density and violin plot.

Both are based on a simple computation, which considers the relative importance of each data point. Each data point is indeed attributed a value on the basis of the sum of all data points, obtaining therefore a decimal number smaller than 1. Starting then from the vertical origin, each data point is plotted through a line function, considering this computed importance for the vertical dimension.

It may not be how a kernel density distribution is computed, but it does convey the general pattern of the variable. This even if the data included in the project is purely random, filler data, chaacterized by such a variation to show some vertical disparity in the line function.

The violin plot is exactly the same density plot, but plotted atop and below the middle of the SVG responsible for the visualization.