Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/ZoEabR).

# Preface 

The purpose of this project is to once again use the D3.js library to this time create a scatterplot for the monthy weather averages in Paris. In so doing, I get to experiment with the library, scale and axis functions.

# Plan
- [x] retrieve data regarding monthly averages, for maximum and minimum temperatures
- [x] drawn an svg element on the page 
- [x] include a dot for each data point in the SVG. Data points should be displayed "in pairs", with two dots matching in horizontal coordinate for the month to which they relate
- [x] include axis 
- [x] include a scale function as to allow for the graph to scale at will 
- [x] think of some ways in which to enhance the presentation, with text and title and perhaps additional elements and with transitions on hover.


# Lessons Learned

**`<g>` element**

To include 2 SVG elements instead of 1, meaning two items as siblings and not in a nested structure, it is possible to leverage the SVG element of group `<g>`. By appending this one to the larger SVG and then appending with two separate instances the different elements, it is indeed straightforward to include multiple elements side by side. As siblings.

```JS
const groupOfCircles = svg.selectAll("g")
     .data(monthlyAverages)
     .enter()
     .append("g");
     
groupOfCircles.append("circle")
  //continue element 
  
groupOfCircles.append("circle")
  //continue element 
```

This is useful for cases, such as with the project at hand, in which data points manifest themselves in multiple instances. For each data point indeed the project shows two circle elements.

**Scale**

To properly display data points spanning the wrapping SVG it is possible to define a scale. Specifically, the positioning is based on two intervals, defined through the functions of `domain()` and `range()`. 

Both of this accept an array of two values and declare how the data points used as input are converted in the SVG as output.

A simple example might help clear the air on the subject.
Say you have an array of data points, with different values.

```JS
const dataset = [2, 12, 62, 34, 54];
```

In order to display these data points in an SVG it is possible to specify attributes for their coordinates, based on the index of each data point.

```JS
const dataset = [2, 12, 62, 34, 54];

svg.append("circle")
  .attr("cx", (d, i) => i*12);
```

This allows to position each datapoint at the horizontal coordinate x=0, x=12, x=24.

Alternatively to this solution, it is possible to plan how the data points will map on the SVG through a scale.

Define first a scale

```JS
const xScale = d3.scaleLinear();
```

Define then the intervals creating the mapping from input to output values:

```JS
xScale.domain([0, 62]); // points ranging from 0 to 62 
xScale.range([0, 100]); // will be converted to points ranging from 0 to 100
```

In this instance, a data point with value 0 will be converted to 0; a data point with value 62 to 100; anything else will be mapped with the linear relation described by the extreme points.

Following such a definition, elements can use scale directly in callback functions:

```JS
const dataset = [2, 12, 62, 34, 54];

svg.append("circle")
  .attr("cx", (d) => xScale(d));
```

Beside being easier to read, this solution helps separating concerns. First you define a scale, based on the data you have and the SVG area which you want to encompass. Then you simply map out all data points in the definition of the various elements.

**Axes**

Once a scale is defined, an axis can be readily included on the basis of the input data.

First, you define an axis with the `axisLeft()` or `axisBottom()` functions, passing in as argument the scale as basis.

```JS
const xAxis = d3.axisLeft(xScale);
```

Then, you include the axis by appending a group `<g>` element to the all-wrapping SVG.

```JS
svg.append("g")
  .call(xAxis);
```

As the axes are actually displayed at the edges of the SVG, you may need to include some padding in their positioning. Through an attribute of `transform`, it is possible to move the axis horizontally or vertically as needed.  

```JS
svg.append("g")
  .attr("transform", "translate(0, " - 20 + ")")
  .call(xAxis);
```

Keep in mind that the `translate()` function accepts two values, for the horizontal and vertical translation. In the form of `translate(x, y)`.
