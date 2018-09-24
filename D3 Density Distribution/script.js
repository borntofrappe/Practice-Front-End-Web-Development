/** script logic
 * include data
 *
 * select main container
 * include one container per visualization
 * include an interval updating the visualizations
*/

// create a function which populates an array with a certain number of items and within a selected range
// define default values for each argument
const populateArray = (min = 100, max = 1000, length = 10) => {
  let arr = [];
  for(let i = 0; i < length; i++) {
    let randomInt = Math.floor(Math.random()*(max-min) + min);
    arr.push(randomInt);
  }
  return arr;
}

// include notable difference between min and max to have disparity between the rectangle elements and the curve drawn from the same values
let data = populateArray();
// console.log(data);

// MAIN CONTAINER
const container = d3
  .select(".container");

/** for each viz
 * include div container
 * include introductory elements
 * include svg g frame
 * include svg elements (vary with the viz)
 */

// ! all viz share the same measures for the svg and g elements
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


// BAR CHART
const containerBarChart = container
  .append("div")
  .attr("class", "viz");

// HTML ELEMENTS
containerBarChart
  .append("h2")
  .attr("class", "title")
  .text("Bar chart");

containerBarChart
  .append("p")
  .attr("class", "description")
  .text("Random data, plotted into simple bars.");

// SVG ELEMENTS
svgBarChart = containerBarChart
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// SCALES & AXES
const xScaleBars = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, width]);

const xAxisBars = d3
  .axisBottom(xScaleBars)
  .tickFormat((d) => d+1);

svgBarChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxisBars);

// include the vertical scale through a modif-iable variable
let yScaleBars = d3
  .scaleLinear()
  .domain([0, d3.max(data)*1.2])
  .range([height, 0]);

let yAxisBars = d3
  .axisLeft(yScaleBars)
  .tickSize(0)
  .tickPadding(10);

svgBarChart
  .append("g")
  .attr("class", "y-axis")
  .call(yAxisBars)
  .selectAll("text")
  .style("text-anchor", "middle")
  .style("writing-mode", "vertical-rl");


// BARS
svgBarChart
  .selectAll("rect.bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => xScaleBars(i) + xScaleBars.bandwidth()*0.1)
  .attr("y", (d) => height - yScaleBars(d))
  .attr("width", xScaleBars.bandwidth()*0.8)
  .attr("height", (d) => yScaleBars(d))
  .attr("fill", "#555");


// DENSITY PLOT CHART
const containerDensityPlot = container
  .append("div")
  .attr("class", "viz");

// HTML ELEMENTS
containerDensityPlot
  .append("h2")
  .attr("class", "title")
  .text("Density Plot");

containerDensityPlot
  .append("p")
  .attr("class", "description")
  .text("Same data, visualizing the relative importance of each item.");

// SVG ELEMENTS
svgDensityPlot = containerDensityPlot
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// UPDATE DATA
// compute the relative importance of each data point (in the [0-1] interval where 1 is the sum of all values)
let total = data.reduce((a, b) => a+b);
let dataRelative = data.map((d) => d/total);
// console.log(dataRelative);
// include two additional elements to have the line start and end at the vertical origin
let  dataDensity = [0, ...dataRelative, 0];
// console.log(dataDensity);


// SCALES & AXES
// include axes based on the new data
const xScaleDensity = d3
  .scaleBand()
  .domain(d3.range(dataDensity.length))
  .range([0, width]);

const xAxisDensity = d3
  .axisBottom(xScaleDensity)
  // hide the first and last point (the ones describing the beginning and end of the line)
  .tickFormat((d, i) => (i === 0 || i === dataDensity.length-1) ? '': d);

svgDensityPlot
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxisDensity);

let yScaleDensity = d3
  .scaleLinear()
  .domain([0, d3.max(dataDensity)*1.2])
  .range([height, 0]);

let yAxisDensity = d3
  .axisLeft(yScaleDensity)
  .tickSize(0)
  .tickPadding(10);

svgDensityPlot
  .append("g")
  .attr("class", "y-axis")
  .call(yAxisDensity)
  .selectAll("text")
  .style("text-anchor", "middle")
  .style("writing-mode", "vertical-rl");

// LINE FUNCTION
// include a curve to plot the relative data, through a line() function
let lineDensity = d3
  .line()
  .x((d, i) => xScaleDensity(i) + xScaleDensity.bandwidth()/2)
  .y((d) => yScaleDensity(d))
  .curve(d3.curveBasis);

// plot the line based on the function and data
svgDensityPlot
  .append("path")
  // add a class to later identify the path element (otherwise selecting a path would return the first path, that being the path for the x-axis)
  .attr("class", "density")
  .attr("d", lineDensity(dataDensity))
  .attr("stroke", "#555")
  .attr("stroke-width", "3px")
  .attr("fill", "#555555aa");


// VIOLIN PLOT
// include the same density curve, but above and below a focal point, set in the vertical center of the chart
const containerViolinPlot = container
  .append("div")
  .attr("class", "viz");

// HTML ELEMENTS
containerViolinPlot
  .append("h2")
  .attr("class", "title")
  .text("Violin Plot");

containerViolinPlot
  .append("p")
  .attr("class", "description")
  .text("Same density, above and below the fold.");

// SVG ELEMENTS
svgViolinPlot = containerViolinPlot
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// the data is the same data used for the density plot
// the scales need however adjusting (for the yScale especially)
const xScaleViolin = d3
  .scaleBand()
  .domain(d3.range(dataDensity.length))
  .range([0, width]);

const xAxisViolin = d3
  .axisBottom(xScaleViolin)
  // hide the first and last point (the ones describing the beginning and end of the line)
  .tickFormat((d, i) => (i === 0 || i === dataDensity.length-1) ? '': d);

svgViolinPlot
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxisViolin);

let yScaleViolin = d3
  .scaleLinear()
  // update the vertical scale to have the density curve displayed equally atop and below the middle of the chart
  .domain([-d3.max(dataDensity)*1.2, d3.max(dataDensity)*1.2])
  .range([height, 0]);

let yAxisViolin = d3
  .axisLeft(yScaleViolin)
  .tickSize(0)
  .tickPadding(10)
  // display ticks labels always as positive numbers
  .tickFormat((d) => (d<0) ? d*-1: d);

svgViolinPlot
  .append("g")
  .attr("class", "y-axis")
  .call(yAxisViolin)
  .selectAll("text")
  .style("text-anchor", "middle")
  .style("writing-mode", "vertical-rl");

// LINE FUNCTION
// include the line function based on the updated scale values
let lineViolin = d3
  .line()
  .x((d, i) => xScaleViolin(i) + xScaleViolin.bandwidth()/2)
  .y((d) => yScaleViolin(d))
  .curve(d3.curveBasis);

// include the line through the updated line function
svgViolinPlot
  .append("path")
  .attr("class", "density")
  .attr("d", lineViolin(dataDensity))
  .attr("stroke", "#555")
  .attr("stroke-width", "3px")
  .attr("fill", "#555555aa");

// include a line, plotting the curve below the fold by detailing the negative counterpart of each data point
svgViolinPlot
  .append("path")
  .attr("class", "violin")
  .attr("d", lineViolin(dataDensity.map((d) => d*-1)))
  .attr("stroke", "#555")
  .attr("stroke-width", "3px")
  .attr("fill", "#555555aa");







// set up an interval to update the data every so often
setInterval(() => {
  // update the starting data
  data = populateArray();
  // console.log(dataUpdate);

  // update the vertical scale of the bar chart
  yScaleBars
    .domain([0, d3.max(data)*1.2]);

  yAxisBars = d3
    .axisLeft(yScaleBars)
    .tickSize(0)
    .tickPadding(10);

  svgBarChart
    .select("g.y-axis")
    .transition()
    .call(yAxisBars)
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("writing-mode", "vertical-rl");

  // update the height values of the rectangle elements
  svgBarChart
    .selectAll("rect.bar")
    .data(data)
    .transition()
    .attr("y", (d, i) => height - yScaleBars(d))
    .attr("height", (d, i) => yScaleBars(d));



  // update the data for the density plot
  total = data.reduce((a, b) => a+b);
  dataRelative = data.map((d) => d/total);
  dataDensity = [0, ...dataRelative, 0];

  // update the scale for the density plot
  yScaleDensity
    .domain([0, d3.max(dataDensity)*1.2]);

  yAxisDensity = d3
    .axisLeft(yScaleDensity)
    .tickSize(0)
    .tickPadding(10);

  svgDensityPlot
    .select("g.y-axis")
    .transition()
    .call(yAxisDensity)
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("writing-mode", "vertical-rl");

  // update the line function
  lineDensity
    .y((d) => yScaleDensity(d));

  // update the path
  svgDensityPlot
    .select("path.density")
    .transition()
    .attr("d", lineDensity(dataDensity));



  // update the scale for the violin plot
  yScaleViolin
    .domain([-d3.max(dataDensity)*1.2, d3.max(dataDensity)*1.2]);

  yAxisViolin = d3
    .axisLeft(yScaleViolin)
    .tickSize(0)
    .tickPadding(10)
    // display ticks labels always as positive numbers
    .tickFormat((d) => (d<0) ? d*-1: d);

  svgViolinPlot
    .select("g.y-axis")
    .transition()
    .call(yAxisDensity)
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("writing-mode", "vertical-rl");

  // update the line function
  lineViolin
    .y((d) => yScaleViolin(d));

  // update the path elements with the updated data
  svgViolinPlot
    .select("path.density")
    .transition()
    .attr("d", lineViolin(dataDensity));

  svgViolinPlot
    .select("path.violin")
    .transition()
    .attr("d", lineViolin(dataDensity.map((d) => d*-1)));

}, 5000);