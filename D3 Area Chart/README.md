Link to the working pen right [here](https://codepen.io/borntofrappe/full/xaxPVv).

## Preface

With this simple project I set out to practice with **d3 shapes** and in particular, with lines and areas to build an **area chart**.

The following links proved to be rather useful:

- [documentation on lines](https://github.com/d3/d3-shape#lines);

- [documentation on curves](https://github.com/d3/d3-shape#curves).

## Update

As I explored the D3.js library a little further, I decided to use the project to practice with two additional concepts:

- grid lines, including a line for each tick on the x and y axes;
- zoom and panning, allowing to namely zoom in on the chart, by a chosen factor, and pan to a zoomed area.

**Grid Lines**

The former feat is achieved by selecting the tick labels and including line elements.

The ticks themselves are described by a `g` element with `class="tick`, which makes them rather easy to target. All that is required is the selection of the horizontal and vertical ticks separately, with the inclusion of line elements which span the entire height and width respectively. 

```JS
// target all the horizontal ticks and include line elements making up vertical grid lines
d3
  .selectAll("g#x-axis g.tick")
  .append("line")
  .attr("class", "grid-line")
  .attr("x1", 0)
  .attr("x2", 0)
  .attr("y1", 0)
  .attr("y2", -height);

// repeat the operation, but with regards to horizontal grid lines
d3
  .selectAll("g#y-axis g.tick")
  .append("line")
  .attr("class", "grid-line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", 0)
  .attr("y2", 0);
```

As grid lines may be a tad overwhelming, it is perhaps better to reduce the weight they have on the page. This is the purpose of the common class included for all line elements, to include a subtle stroke color.

**Zoom and panning**

The latter feature to be included in the project regards a functionality of the library never used before. With this in mind, a bit of additional documentation is warranted.

Zoom and panning are obtained with the `d3.zoom()` function, called on the SVG element selected to benefit from the features:

```JS
svgContainer
  .call(d3.zoom());
```

While it is possible to specify this function in the `call()` function itself, it is advisable to store a reference to it in a separate variable, simply called when needed. This is especially handy as the zoom function has the possibility to include additional functions, to customize and specify the behavior.

```JS
const zoom = d3
  .zoom();

svgContainer
  .call(zoom);
```

One of the additional methods chained to the discussed function is `scaleExtent()`, which allows to describe the scope of the zoom. It accepts as argument an array of two items, responsible for the lower and upper threshold of the change in scale.

```JS
const zoom = d3
  .zoom()
  .scaleExtent([1,2])
```

Beside this function, `d3.zoom()` also includes an event listener. In response to an event, the function indeed needs to call a method which handles the zoom itself.

```JS
const zoom = d3
  .zoom()
  .scaleExtent([1,2])
  .on("zoom", zoomFunction);
```

In the callback function here specified in `zoomFunction` it is immediately possible to visualize the output of the zooming event.

```JS
function zoomFunction() {
  console.log(d3.event);
}
```

Which describes an event of type `zoom` with a `transform` field detailing the information required for the zoom and panning to occur.

Indeed, this object holds the following properties:

- `k`, for the scale;
- `x` and `y`, for the horizontal and vertical coordinates.

It is possible to reference these values in variables and later use them in the `transform` attribute for the container in which the zoom/panning ought to occur.

```JS
function zoomFunction() {
  let k = d3.event.transform.k;
  let x = d3.event.transform.x;
  let y = d3.event.transform.y;

  svgCanvas.attr("transform", `translate(${x} ${y}) scale(${k})`);
}
```

Thus allowing for the visualization _inside_ of the `svg` element to be zoomed in and out, to be moved around.