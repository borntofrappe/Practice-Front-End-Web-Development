Link to the working pen right [here](https://codepen.io/borntofrappe/full/ZMwPoz/).

## Preface

With this project I plan to consider hierarchical data as crafter for the previous project displaying a treemap diagram, and have it displayed in two additional layouts:

- circular packing, with enclosing diagrams;

- partition, with adjacent diagrams.

Each benefits from the appropriate function, in `d3.pack()` and `d3.partition()`. Each is well documented in the code, but for posterity requires a few notes.

Hierarchical layouts, such as treemap, circular packing, partition and possibly tree diagrams as well, need a couple of initial steps, to configure the data as to compute the rightful properties:

1. create a root element based on the hierarchical data:

  ```JS
  const hierarchy = d3
    .hierarchy(data);
  ```

  This will allow to later reference the variable and have access to a few useful methods, such as `.descendants()`, a function which returns a flat array detailing all nodes as array items.

1. compute a value for each node:

  ```JS
  hierarchy
    .sum((d) => d.value);
  ```

  Given a property of `value` on the "leafs", the innermost data points, this function will allow to add a `value` for all nodes. This will in turn allow layout functions to consider the relative importance of the nodes (depicting the properties in a 0-1 interval).


With this initial structure, the layout function adds the values required to then bind the data to SVG elements. Consider the `.pack()` function. This will include `r`, `x` and `y` values, to identify the center of the circle elements and their radii.