// target the single div container and append introductory elements
const container = d3.select("div.container");

// DATA
const trends = {
  html: [38,38,69,74,71,74,68,39,36,67,72,72,72,63,38,35,65,69,60,70,65,39,36,68,72,70,71,67,37,35],
  css: [22,21,46,48,48,48,46,23,20,45,48,47,48,43,22,20,43,45,40,48,43,21,20,44,46,47,47,43,20,21],
  js: [39,38,93,100,97,99,90,41,39,91,96,97,97,85,39,38,87,92,80,92,86,40,37,90,98,91,96,87,38,38]
}
// array of colors
const colors = ["#2196F3", "#F44336", "#FFCA28"];
// arrays of data's keys and values (used later in the project)
const keys = Object.keys(trends);
const values = Object.values(trends);

// TOOLTIP
const tooltip = container
  .append("div")
  .attr("id", "tooltip");

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const width = 400 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;


// LINE CHART
// include heading and paragraphs making up the legend
container
  .append("h4")
  .text("Google searches in the last 30 days");

container
  .selectAll("p")
  .data(colors)
  .enter()
  .append("p")
  .style("border-left", (d, i) => `5px solid ${colors[i]}`)
  // include the text included in the object's keys
  .text((d, i) => keys[i]);

// include the SVG element nesting a group element responsible for the actual visualization
const lineChart = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// SCALES
// include an horizontal scale based on the length of each array (to have one point per data point)
const xScale = d3
  .scaleBand()
  .domain(d3.range(trends.html.length))
  .range([0, width]);


// include a vertical scale based on the data points
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// AXES 
// include axes based on the scale
const xAxis = d3
  .axisBottom(xScale)
  // show only even-numbered ticks
  .tickValues(xScale.domain().filter((d) => d % 2 === 0));

const yAxis = d3
  .axisLeft(yScale);

lineChart
  .append("g")
  .attr("class", "axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

lineChart
  .append("g")
  .attr("class", "axis")
  .call(yAxis);


// line function
// base the horizontal coordinate on the index value (as there are x coordinates as there are data points)
// base the vertical coordinate on the data point itself
const line = d3
  .line()
  .x((d, i) => xScale(i))
  .y((d) => yScale(d));

// loop through the object and include a path element for each key
for(let i = 0; i < keys.length; i++) {
  lineChart
    .append(`path`)
    .datum(trends[keys[i]])
    .attr("class", "line")
    // the d attribute is determined by the line function (accessing the data point for the y coordinate)
    .attr("d", line)
    // when hovering on the path elements, show the text of the connected path element and style the tooltip accordingly
    .on("mouseenter", (d) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${d3.event.layerX}px`)
        .style("top", `${d3.event.layerY}px`)
        .style("background", `${colors[i]}`)
        .text(() => keys[i]);
    })
    // include the stroke color dependant on the path element (according to the colors values)
    .attr("stroke", colors[i]);
}

