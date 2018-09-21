Link to the working pen right [here](https://codepen.io/borntofrappe/full/RYddjp).

## Preface

This project sets out to practice with another D3 layout, another hierarchical D3 layout to be precise. Be it a tree diagram, a dendogram or some other type of chart, the goal is the same: lay a series of interconnected items one after the other. Connect the items with simple `path` elements.

_A note on hierarchical layouts_

Just like with treemap, circular packing, partition layouts, a couple of setup instructions are required:

- create a root element out of the data, through the `hierarchy()` function.

```JS
const hierarchy = d3.hierarchy(data);
```

- include a value describing the relation of the different elements. Previously, this value was based on an actual value detailed for the outermost leafs, but for the tree diagram, all that is required is the knowledge of how many leafs are nested in a node (if any). Such a function is solved by the `count()` method.

```JS
hierarchy.count();
```

For the rest of the logic, the `.tree()` function is applied much alike the `partition()` or `stack()` layout function, to include the properties which are then included through SVG elements. In this instance, `x` and `y` properties to position text elements and draw the lines connecting them.