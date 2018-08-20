// select the single container div and include introductory HTML elements
const container = d3
  .select(".container");

container
  .append("h1")
  .attr("id", "title")
  .text("D3 Area Chart");

container
  .append("h3")
  .attr("id", "description")
  .text("d3.line() && d3.area()");

// include some arbitrary data with an array of objects
// the line is described by a {points} number of points, with the horizontal coordinate incremented each time, while the vertical coordinate displays a random number
// random number between {max} and {min}
let data = [];
const min = 10;
const max = 30;
const points = 15;

// include the data
for(let i = 0; i < max/2; i++) {
  data.push({ x: i, y: Math.floor(Math.random() * max) + min});
}

// include the SVG frame and the group element in which the visualization will be actually displayed
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svgContainer = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

const svgCanvas = svgContainer
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// include scales, for the horizontal and vertical axes
const xScale = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.x))
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  .domain([0, max+min])
  .range([height, 0]);

// inlude axes on the basis of the scales
// remove the ticks
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(8);

const yAxis = d3
  .axisLeft(yScale)
  .tickSize(0)
  .tickPadding(8);

// include the axes through a group element
// define a class which is used to style both
svgCanvas
  .append("g")
  .attr("id", "x-axis")
  .attr("class", "axis")
  // move the group element down to the bottom of the canvas, showing the horizontal line
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svgCanvas
  .append("g")
  .attr("id", "y-axis")
  .attr("class", "axis")
  .call(yAxis);

// include a line generator
// a line function specifies horizontal and vertical coordinates through two functions
// .x() and .y()
// these are redirected to the points described by the data, once the path element responsible for the line is included
// nevertheless, these are found under data.x and data.y, and they are weighed according to the defined scale
const line = d3
  .line()
  // .curve() allows to specify the behavior of the line itself
  .curve(d3.curveCardinal)
  .x((d) => xScale(d.x))
  .y((d) => yScale(d.y));

// include an area generator
// this one is used to draw an area below the line
// beside the same functions included for the line (and specified with the same values to have the area match the line)
// y0 allows to specify the _lower_ threshold of the area, while y1 the _upper_ threshold, effectively identifying the area below the line
// x1 and x0 match in value, and there's no need to specify them both
const area = d3
  .area()
  .curve(d3.curveCardinal)
  .x((d) => xScale(d.x))
  .y0(yScale(0))
  .y1((d) => yScale(d.y));

// include a path element for the line, specifying the `d` attribute through the line generator
svgCanvas
.append("path")
.attr("class", "line")
.attr("d", line(data));

// include a path element for the area, specifying the `d` attribute through the area generator
svgCanvas
  .append("path")
  .attr("class", "area")
  .attr("d", area(data));

// for each data points, include a circle, exactly where the data point lies
// this proved why certain curves for the lines would actually be quite inappropriate, drawing the lines outside of the defined data points
svgCanvas
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", (d) => xScale(d.x))
  .attr("cy", (d) => yScale(d.y))
  .attr("r", 0)
  // transition the circles into view, one at a time
  .transition()
  .duration(500)
  .delay((d, i) => 100 + 100*i)
  .attr("r", 5);
