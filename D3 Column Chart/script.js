/** JAVASCRIPT LOGIC
 * select container and include introductory HTML elements
 * include the SVG, the frame, nested area and a label
 * include the scales and the range intervals
 * fetch data 
 * include the domain for the scales
 * include the axes 
 * include the tooltip
 * include the rectangle elements for each data point
 */

// SELECT container
const container = d3.select("div.container");

// include informative text
container 
  .append("p")
  .text("France 2000");

// SVG FRAME
// define the margin which nest the visualization in the SVG contours
const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 70
}
// define the width and height values including the chosen margins
// this to later include w and h in the data visualization and have them reference to the nested area 
const w = 750 - margin.right - margin.left;
const h = 500 - margin.top - margin.bottom;

// append an `<svg>` element including the chosen margins
// this to have the svg spread across the extent of the hard coded values (750 and 500)
const svg = container
  .append("svg")
  .attr("viewBox", `0, 0, ${w + margin.right + margin.left}, ${h + margin.top + margin.bottom}`);

// append a `<g>` element, translated in the SVG by the chosen margins
// this to create the nested area inside of the SVG
// the data visualization, for instance the rectangle elements, will be appended to this area
const svgCanvas = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// LABELS
// include a label describing the chart
// position in the top right corner of the canvas
// the element is included at the very edge of the width and positioned as wanted through the text-anchor attribute
svgCanvas
  .append("text")
  .text("Total Population / Age")
  .attr("x", w)
  .attr("y", 0)
  .attr("text-anchor", "end");

// SCALES
//define the scales

// for the horizontal scale, include a scaleBand, an ordinal scale which maps input values in a range given by the selected interval
const xScale = d3
  .scaleBand()
  .range([0, w]);

// for the vertical scale, include a linear scale, mapping input values from the bottom of the SVG to the top
const yScale = d3
  .scaleLinear()
  .range([h, 0]);

// FETCH
// retrieve the data from the public API
// caveat: http connection may not be secure, and some sites block the access to said URL
const URL = "http://api.population.io:80/1.0/population/2000/France/";

// fetch takes as argument the URL and then allows to chain operations based on the response
fetch(URL)
  // input: response
  // output: json
  .then((response) => response.json())
  // input: json
  // ouput: map json 
  .then((json) => plotChart(json));

// create a function to plot the chart based on the data
function plotChart(data) {
  /*
  data refers to an array of objects, each holding the following relevant fields: 
  - age
  - females
  - males
  - total

  Each mentioned field refers to a number without decimal digits
  - age is used for the ordinal scale
  - total for the linear scale
  - females and males for the informative tooltip
  */

  // DOMAIN
  // include the domain for both scales, based on the data

  // for the scaleBand scale, the domain is an array of values, each describing a band
  // to include band in the 0-data.length range, it is possible to generate an array with the d3.range function
  // input: integer
  // output: array with integers from 0 up to the input
  xScale.domain(d3.range(data.length));

  // for the linear scale, the domain is given by the minimum and maximum values of data[].total
  // it is possible to use d3.min and d3.max, each describing an end of the domain interval
  // .domain([d3.min(data, (d) => d["total"]), d3.max(data, (d) => d["total"])]);
  // d3.extent allows to retrieve both in a single statement
  yScale.domain(d3.extent(data, (d) => d["total"]));

  // AXES
  // define the x and y axes according to the defined scales

  // for the xAxis, display only every fifth tick
  // as the scale is ordinal, it is not possible to leverage the ticks() function
  // include tick values filtering the domain values instead
  // remove the ticks at either end of the axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(xScale.domain().filter((d) => d % 5 === 0))
    .tickSizeOuter(0);

  // for the yAxis, display the ticks in object notation
  // this to include 100k instead of 1000000 for instance
  // remove the ticks at either end of the axis
  const yAxis = d3 
    .axisLeft(yScale)
    .tickFormat(d3.format("~s"))
    .tickSizeOuter(0);

  // include the axes in the SVG
  // position the horizontal axis at the bottom of the canvas
  svgCanvas
    .append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(xAxis);

  svgCanvas
    .append("g")
    .call(yAxis);

  // TOOLTIP
  // append a div for the tooltip
  const tooltip = container
    .append("div")
    .attr("id", "tooltip");

  // COLUMN CHART
  // append a rectangle element for each data point, as to include vertical bars
  svgCanvas
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    // include event listener to show the tooltip and text describing the data point on hover
    .on("mouseenter", (d) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${d3.event.layerX}px`)
        .style("top", `${d3.event.layerY}px`)
        .text(() => `Age: ${d["age"]} Female: ${d["females"]} Male: ${d["males"]}`);
    })
    // include event listener to hide the tooltip when leaving the data point
    .on("mouseout", (d) => {
      tooltip
        .style("opacity", 0);
    })
    // position the rectangle elements
    // horizontally position each eleent according to the d["age"] value, mapped according to the xScale
    .attr("x", (d) => xScale(d["age"]))
    // widen the rectangle elements to each take a portion of the total width
    .attr("width", w/data.length)
    // vertically and initially, position each rectangle elements at the very bottom of the SVG
    .attr("y", h)
    // include a transition
    .transition()
    // include a delay totaling up 1s, and divided for each subsequent rectangle to include them one after the other
    .delay((d, i) => i/data.length * 1000)
    // have the transition last 1s
    .duration(1000)
    // once the transition is hover, the rectangle elements are given the height described by the d["total"] value
    // have the top of the rectangle positioned according to d["total"], weighed by the scale
    .attr("y", (d) => yScale(d["total"]))
    // as the rectangle elements are drawn top down, include a height equal to the d["total"], weighed by the scale
    // deducting this value from the total height of the SVG
    .attr("height", (d) => h - yScale(d["total"]));
}
