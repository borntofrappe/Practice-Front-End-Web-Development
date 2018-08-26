Link to the working pen right [here](https://codepen.io/borntofrappe/full/gdPydW/).

## Preface

Inspired by [Data to Viz](https://www.data-to-viz.com/), I decided to try and built a lollipop plot. In the process, I decided to also tinker with a pie layout as to include slices of different sizes, and learnt plenty about both visualizations and the delved deeper in the library as a whole.

In the comments of the script.js file I included plenty of comments, but for posterity it is advisable to jot down here and now a few pointers to manufacture the showcased visualizations and highlight a few insights gained from the project.

**Lessons learned**

- based on the specificities of each visualization, the input data might be modified to present a cleaner visual.

  In the lollipop plot, for instance, the input made up of an array of random integers is sorted from biggest to smallest values. 

  ```JS
  const sortedArr = randomArr.sort((a, b) => b - a);
  ```

  This because, and specifically for the visualization at hand, a lollipop plot is most efficient when detailing lines the eyes can easily follow and is therefore primed to show variables in order.

- when including a visualization which associates single data points with multiple elements, it is advisable to append a `g` group element when binding the data and later append the multiple, specific visuals to said element. 

  In the lollipop plot, for instance, each data point is represented by a `path` and a `circle` elements. Both are appended to a wrapping `g` group element, which is included for each data point.

  ```JS
  const lollipop = svgLollipopPlot
    .selectAll("g.lollipop")
    .data(sortedArr)
    .enter()
    .append("g")
    .attr("class", "lollipop");
  ```

  To all `g` elements, the multiple visuals are then easily appended.

  ```JS
  lollipop
    .append("path");

  lollipop
    .append("circle");
  ```

  The append method provided by D3.js is smart enough to include a `path` and `circle` element to each `g` element of the selection.

- a `g` group element can be included to easily include multiple elements in a wrapping container, as mentioned in the previous point. That being said, it is also helpful to separate the project in a clearner, more understandable structure.

  This logic extends itself also to HTML elements, with reference to a `div` element.

- when including a layout from the D3.js library, it is mightigly important to understand how the bound data, and the `d` argument in any callback function, change.

  For the pie chart, for example, it is important to note that the following contrived example will not work as one would expect:

  ```JS
  const arcs = svgContainer
    .selectAll("g")
    .data(pie(sortedArr))
    .enter()
    .append("g")
    .attr("id", (d) => d); // d does not refer to the actual data point
  ```

  Indeed, the layout function changes the data bound to the selection. In the instance of a pie chart, to an object detailing multiple values. Among these values, the data points are stored in the `data` property.

  This explains why the arc function, used on the selection, defines a different outer radius on the basis of `d.data` instead of simply `d`. 

  ```JS
  .outerRadius((d) => d.data);
  ```

- scales are useful for axes, but more generally applicable to any situation in which input data needs to be mapped to some values in a range. 

  Such is the purpose of the `radiusScale` function in the specific project. This one maps the data point values, from minimum to maximum, to an interval which describes a different outer radius, from a fourth of the SVG width to a half. 
  
  ```JS
  const radiusScale = d3
    .scaleLinear()
    .domain(d3.extent(sortedArr))
    .range([width/4, width/2]);
  ```

  A half is chosen specifically as the radius is half the diameter, and by centering the slices in the SVG, these would reach at most the edge of the container.

**Pie Chart**

Specifically for the pie layout, the following procedure is followed:

- include the `d3.pie()` function, storing a reference to it in a variable. This separation allows to easily include additional options to the functions, by simply chaining other methods.

  ```JS
  const pie = d3
    .pie();
  ```

  The function takes as input some arbitrary data and returns as output an object detailing useful values to actually draw slices of the pie (specifically `startAngle` and `endAngle`).

  ```JS
  console.log(pie(sortedArr)); 
  ```

- include the `d3.arc` function. 

  ```JS
  const arc = d3
    .arc();
  ```

  This function takes as input an object which details, among other properties, a `startAngle` and `endAngle`. In turn, it outpus the SVG syntax which can be then included in the `d` attribute of a `path` element.

  _Please note_: this function must specify the inner and outer radius of the slices to actually draw the slices and the pie chart as a whole.

  ```JS
  const arc = d3
    .arc()
    .innerRadius()
    .outerRadius();
  ```

- include a `g` element for each data point, binding the data through the `pie()` function 

  ```JS
  const arcs = svgContainer
    .selectAll("g")
    .data(pie(sortedArr))
    .enter()
    .append("g");
  ```

  _Please note_: by default this statement places the group elements in the top left corner of the svg container. To center them, make use of the transform attribute.

  ```JS
  .attr("transform", `translate(${width/ 2}, ${width/ 2})`);
  ```

- include a `path` referring to the `arc` function in the `d` attribute.

  ```JS
  arcs
    .append("path")
    .attr("class", "slice")
    .attr("d", arc);
  ```