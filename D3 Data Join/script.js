// include a random set of data, with ten data points
let data = []
  , max = 1000;
for(let i = 0; i < 10; i++) {
  data.push(Math.ceil(Math.random()*max));
}

/* create a function which 
- takes as input an array
- adds or removes a value in a copy of the array
- returns said copy
*/

function updateDataset(dataset) {
  // add or remove an item based on a simple boolean which is either true or false depending on chance
  let isAdding = (Math.random() > 0.5);
  // if the array has only one item, always have the function add a value
  if(dataset.length === 1) {
    isAdding = true;
  }
  // if adding a value, include a random integer at the end of a copy of the array 
  if(isAdding) {
    let dataPoint = Math.ceil(Math.random()*max);
    return [...dataset, dataPoint]
  }
  // if not adding a value, remove an item considering a random index 
  else {
    let dataIndex = Math.floor(Math.random() * dataset.length);
    return [...dataset.slice(0, dataIndex), ...dataset.slice(dataIndex + 1)];
  }
}


// test the function
// console.log(data);
// console.log(updateDataset(data));

// select the container in which to include the bar chart
const container = d3.select(".container");

// append a heading, a sub-heading and a button 
container
  .append("h1")
  .attr("id", "title")
  .text("D3 data join");

container
  .append("h3")
  .attr("id", "description")
  .text("theory in practice");

updateButton = container
  .append("button")
  .text("change data");

// include an SVG for the visualization itself
// an svg element for the frame and a nested g element for the canvas 
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
}

const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svgContainer = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left +margin.right} ${height + margin.top + margin.bottom}`);

const svgCanvas = svgContainer
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// include a scale band for the horizontal axis, to position the rectangle elements one after the other
// padding allows to include some space between bands
const xScale = d3
  .scaleBand()
  .domain(d3.range(0, data.length))
  .range([0, width])
  .paddingInner([0.1])
  .paddingOuter([0.1]);

// include a scale for the vertical axis
const yScale = d3
  .scaleLinear()
  .domain([0, max])
  .range([height, 0]);

// incllude a color scale for the rectangle elements' fills
const colorScale = d3
  .scaleOrdinal(d3.schemeSet2);

// create axes on the basis of the scale
// tick format to include indexes from 1 up to the length of the array (instead of 0 and lenght-1)
const xAxis = d3
  .axisBottom(xScale)
  .tickFormat((d) => d + 1);

const yAxis = d3.axisLeft(yScale);

// include the axis to the bottom and to the left of the canvas
svgCanvas
  .append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svgCanvas
  .append("g")
  .attr("id", "y-axis")
  .call(yAxis);


// create a function to draw a bar chart depending on a set of data
function barChart(dataset) {
  // update the domain of the horizontal scale, as the array might change in length
  xScale
    .domain(d3.range(0, dataset.length));

  // update the axis on the basis of the updated scale
  svgCanvas
    .select("#x-axis")
    .transition()
    .call(xAxis);

  // include a reference for the update, enter and exit selections

  // update selection: already bound elements
  let update = svgCanvas
    .selectAll("rect")
    // include a function which identifies the data to the rectangle elements
    // this is a rough way to identify rectangles, as two might have the same values
    // the function ought to reference a unique ID
    .data(dataset, (d) => d);

  // enter selection: new elements (as the array is increased in number)
  let enter = update
    .enter();

  // exit selection: elements no longer needed (as the array is decreased in number)
  let exit = update
    .exit();

  update
    // for the existing elements, include a transition for the width, as this might change in response to the new domain 
    .transition()
    .attr("x", (d, i) => xScale(i))
    .attr("width", (d, i) => xScale.bandwidth());

  enter
    // for the new elements, include one rectangle element and transition the height
    .append("rect")
    .attr("class", "bar")
    // include a fill color dependant on the color scale
    .attr("fill", (d, i) => colorScale(i))
    // the horizontal coordinate is determined by the position in the scale band
    .attr("x", (d, i) => xScale(i))
    // the width is determined the width of each band (which includes some padding to separate the bars from one another)
    .attr("width", xScale.bandwidth())
    // the height and vertical coordinate initially position the rectangle element at the bottom of the svg
    // these are transitioned into their rightful values
    .attr("height", 0)
    .attr("y", (d, i) => height)
    .transition()
    .delay((d, i) => 100)
    // after the prescribed delay, include the rectangle elements spanning the height expected by the data points
    .attr("height", (d, i) => height - yScale(d))
    .attr("y", (d, i) => yScale(d));

  exit
    // for the elements no longer required, transitioned them out of view before removing them
    .transition()
    .attr("width", 0)
    .remove();
}

// immediately call the function to draw the bar chart with the ten element long array
barChart(data);

// listen for a click event on the update button, at which point call the drawing function with an updated set of data
updateButton
  .on("click", () => {
    // retrieve the data bound to the rectangle elements
    let oldData = d3.selectAll("rect").data()
    // draw the bar chart with the data updated as per the update function
    barChart(updateDataset(oldData));
  });