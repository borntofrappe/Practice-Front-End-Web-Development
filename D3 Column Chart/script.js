/**SETUP
 * select container 
 * include HTML elements introducing the visual
 * include SVG canvas and g element in which to append SVG element
 */

const container = d3.select("div.container");


container 
  .append("p")
  .text("France 2000");

const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 70
}
const w = 750 - margin.right - margin.left;
const h = 500 - margin.top - margin.bottom;

const svg = container
  .append("svg")
  .attr("viewBox", `0, 0, ${w + margin.right + margin.left}, ${h + margin.top + margin.bottom}`);

const svgCanvas = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// LABELS: include a label
svgCanvas
  .append("text")
  .text("Total Population / Age")
  .attr("x", w)
  .attr("y", 0)
  .attr("text-anchor", "end");

// SCALES: define the linear cale for the y-axis and ordinal scale for the x-axis

const yScale = d3
  .scaleLinear()
  .range([h, 0]);

const xScale = d3
  .scaleBand()
  .range([0, w]);

// FETCH: retrieve the data from the public API
const URL = "http://api.population.io:80/1.0/population/2000/France/";

fetch(URL)
  .then((response) => response.json())
  .then((json) => plotChart(json));

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
  */

  // DOMAIN
  // include the domain for both scales, based on the data
  // for the ordinal scale, the domain is given by an array of indexes starting from 0 and ending with the last object value
  xScale.domain(d3.range(data.length));

  // for the linear scale, the domain is given by the minimum and maximum values of data[].total
  yScale.domain(d3.extent(data, d => d["total"]));

  // AXES
  // define the x and y axes according to the defined scales
  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(xScale.domain().filter(d => d%5 === 0))
    .tickSizeOuter(0);

  const yAxis = d3 
    .axisLeft(yScale)
    .tickFormat(d3.format("~s"))
    .tickSizeOuter(0);

  // include the axes in the SVG
  svgCanvas
    .append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(xAxis);

  svgCanvas
    .append("g")
    .call(yAxis);

  const tooltip = container
    .append("div")
    .attr("id", "tooltip");

  svgCanvas
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .on("mouseenter", (d) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${d3.event.layerX}px`)
        .style("top", `${d3.event.layerY}px`)
        .text(() => {
          let age = d["age"];
          let female = d["females"];
          let male = d["males"];
          return `
          Age: ${age}
          Female: ${female}
          Male: ${male}
          `;
        });
    })
    .on("mouseout", (d) => {
      tooltip
        .style("opacity", 0);
    })
    .attr("x", (d) => xScale(d["age"]))
    .attr("y", h)
    .attr("width", w/data.length)
    .transition()
    .delay((d, i) => i/data.length * 1000)
    .duration(1000)
    .attr("height", (d) => h - yScale(d["total"]))
    .attr("y", (d) => yScale(d["total"]));

}
