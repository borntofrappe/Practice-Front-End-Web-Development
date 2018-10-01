# D3 Ridgeline Plot

Link to the working pen right [here](https://codepen.io/borntofrappe/full/QZbyGj/).

## Preface

Through this project I plan to practice once more with D3.js, before starting a deep dive in React land.

I plan to practice with area charts, as in:

- [x] area chart;

- [x] stacked area chart;

- [x] streamgraph.

## d3.stack()

The layout function necessary to create the stacked and streamgraph visualizations is `d3.stack()`.

This function requires an array of objects, with as many objects as there are observations. Each object details a value, updatefor the different categories.

Something akin to:

```JS
const data = [
  {
    apple: 100,
    samsung: 124,
    blackberry: 89
  },
  {
    apple: 110,
    samsung: 120,
    blackberry: 67
  },
  {
    apple: 120,
    samsung: 125,
    blackberry: 52
  }
];
```

Once the data is set up in such a construct, it is not as simple as including the data in the layout function. It is necessary to here specify the object properties making up the stacks, through the `keys()` function.

```JS
const stack = d3
  .stack()
  .keys(["apple", "samsung", "blackberry"]);
```

Once set up in such a manner, the data can be updated through the defined function, to obtain the values where the line/area/rectangle elements are to begin and to end:

```JS
const stack = d3
  .stack()
  .keys(['apple', 'samsung', 'blackberry']);

const dataStack = stack(data);
console.log(dataStack);
```

The function provides an array for each category, itself made up of a 2D array, where each observation is described in two items: where the item begins, where it ends.

_Small note_: the keys can also and more efficiently be included through the `Object.keys` function, applied on an item of the data array.

```JS
const stack = d3
  .stack()
  .keys(Object.keys(data[0]));
```

## clipPath

When including such visualizations as line and area charts, it may happen that the `stroke` of an SVG element might end up _on top_ of the group elements making up the axes. To avoid such an occurrence it is possible to benefit from a `clipPath` element. Anything inside of the area specified by such an element will be made visible, and anything outside of it will be cropped out.

To have the entire visualization benefit from this logic, it is helpful to introduce a wrapping `g` element, in which the `line`, `area` and other visual elements will be included. This allows to include a clip only on the wrapping element, and avoid repeating its application on all elements.

1. add a `clipPath` element specifying the structure of the clip itself:

```JS
const clipArea = svgArea
  .append('clipPath')
  .attr('id', 'clipArea')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height);
```

Just be mindful to add an `id` attribute, which allows to target the element.

1. reference the newly created element in the `clip-path` attribute of the selected, to-be-clipped, element:

```JS
const svgAreaGroup = svgArea
  .append('g')
  .attr('clip-path', 'url(#clipArea)');
```

All the elements nested inside of this group element will be then visualized only inside of the mentioned frame.
