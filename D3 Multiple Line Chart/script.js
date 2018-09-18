/** script logic
 *
 * data
 * color scale
 * introductory HTML elements (inclulding an anchor link referenccing the source data)
 * svg frame
 * scales, axes
 * line() function
 * path and circle elements
 */

const data = [
  {
      trimester: "2012-T1",
      fifteenToTwentyFour: 22.9,
      twentyFiveToFortyNine: 9,
      aboveFortyNine: 5.8,
      total: 9.5
  },
  {
      trimester: "2012-T2",
      fifteenToTwentyFour: 23.6,
      twentyFiveToFortyNine: 9.1,
      aboveFortyNine: 6.2,
      total: 9.7
  },
  {
      trimester: "2012-T3",
      fifteenToTwentyFour: 24.7,
      twentyFiveToFortyNine: 9.1,
      aboveFortyNine: 6.1,
      total: 9.8
  },
  {
      trimester: "2012-T4",
      fifteenToTwentyFour: 26.1,
      twentyFiveToFortyNine: 9.2,
      aboveFortyNine: 6.5,
      total: 10.1
  },
  {
      trimester: "2013-T1",
      fifteenToTwentyFour: 25.7,
      twentyFiveToFortyNine: 9.5,
      aboveFortyNine: 6.7,
      total: 10.3
  },
  {
      trimester: "2013-T2",
      fifteenToTwentyFour: 25.4,
      twentyFiveToFortyNine: 9.7,
      aboveFortyNine: 6.9,
      total: 10.5
  },
  {
      trimester: "2013-T3",
      fifteenToTwentyFour: 24.7,
      twentyFiveToFortyNine: 9.6,
      aboveFortyNine: 6.9,
      total: 10.3
  },
  {
      trimester: "2013-T4",
      fifteenToTwentyFour: 23.9,
      twentyFiveToFortyNine: 9.6,
      aboveFortyNine: 6.6,
      total: 10.1
  },
  {
      trimester: "2014-T1",
      fifteenToTwentyFour: 23.8,
      twentyFiveToFortyNine: 9.5,
      aboveFortyNine: 7,
      total: 10.1
  },
  {
      trimester: "2014-T2",
      fifteenToTwentyFour: 24,
      twentyFiveToFortyNine: 9.6,
      aboveFortyNine: 6.8,
      total: 10.2,
  },
  {
      trimester: "2014-T3",
      fifteenToTwentyFour: 24.3,
      twentyFiveToFortyNine: 9.8,
      aboveFortyNine: 6.8,
      total: 10.3
  },
  {
      trimester: "2014-T4",
      fifteenToTwentyFour: 24.7,
      twentyFiveToFortyNine: 9.9,
      aboveFortyNine: 7,
      total: 10.4
  },
  {
      trimester: "2015-T1",
      fifteenToTwentyFour: 24.9,
      twentyFiveToFortyNine: 9.8,
      aboveFortyNine: 6.7,
      total: 10.3
  },
  {
      trimester: "2015-T2",
      fifteenToTwentyFour: 24.6,
      twentyFiveToFortyNine: 9.8,
      aboveFortyNine: 7.3,
      total: 10.5
  },
  {
      trimester: "2015-T3",
      fifteenToTwentyFour: 24.5,
      twentyFiveToFortyNine: 9.8,
      aboveFortyNine: 7.1,
      total: 10.4
  },
  {
      trimester: "2015-T4",
      fifteenToTwentyFour: 24.5,
      twentyFiveToFortyNine: 9.6,
      aboveFortyNine: 6.9,
      total: 10.2
  },
  {
      trimester: "2016-T1",
      fifteenToTwentyFour: 24.9,
      twentyFiveToFortyNine: 9.6,
      aboveFortyNine: 6.7,
      total: 10.2
  },
  {
      trimester: "2016-T2",
      fifteenToTwentyFour: 24.4,
      twentyFiveToFortyNine: 9.3,
      aboveFortyNine: 6.8,
      total: 10
  },
  {
      trimester: "2016-T3",
      fifteenToTwentyFour: 25.1,
      twentyFiveToFortyNine: 9,
      aboveFortyNine: 7.2,
      total: 10
  },
  {
      trimester: "2016-T4",
      fifteenToTwentyFour: 23.9,
      twentyFiveToFortyNine: 9.4,
      aboveFortyNine: 6.9,
      total: 10
  },
  {
      trimester: "2017-T1",
      fifteenToTwentyFour: 22.4,
      twentyFiveToFortyNine: 9,
      aboveFortyNine: 6.8,
      total: 9.6
  },
  {
      trimester: "2017-T2",
      fifteenToTwentyFour: 23.3,
      twentyFiveToFortyNine: 8.7,
      aboveFortyNine: 6.5,
      total: 9.4
  },
  {
      trimester: "2017-T3",
      fifteenToTwentyFour: 22.3,
      twentyFiveToFortyNine: 9.2,
      aboveFortyNine: 6.6,
      total: 9.7
  },
  {
      trimester: "2017-T4",
      fifteenToTwentyFour: 21.3,
      twentyFiveToFortyNine: 8.3,
      aboveFortyNine: 6.4,
      total: 8.9
  },
  {
      trimester: "2018-T1",
      fifteenToTwentyFour: 21.4,
      twentyFiveToFortyNine: 8.6,
      aboveFortyNine: 6.5,
      total: 9.2
  },
  {
      trimester: "2018-T2 (p)",
      fifteenToTwentyFour: 20.8,
      twentyFiveToFortyNine: 8.5,
      aboveFortyNine: 6.5,
      total: 9.1
  }
];

// include a color scale
const colorScale = d3
.scaleOrdinal(d3.schemeCategory10);


// HTML ELEMENTS
// target the container and append introductory elements
const container = d3
  .select(".container");

container
  .append("h1")
  .attr("class", "title")
  .text("Unemployment Rate");

container
  .append("p")
  .attr("class", "description")
  .style("margin", "1rem 0")
  .text("Metrics on employment in France, across age groups and the ages.");

// include one anchor link element for the source
container
  .append("a")
  .attr("href", "https://www.insee.fr/fr/statistiques/3598305")
  .attr("target", "_blank")
  .style("font-size", "0.75rem")
  .text("Source: INSEE");


// SVG FRAME
// include margin and measures for the svg
const margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 30
};
const width = 500 - (margin.left + margin.right);
const height = 400 - (margin.top + margin.bottom);

// include the svg and g element in which to plot the chart
const containerSVG = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// SCALES & AXES
// include scales, ordinal for the horizontal scale (not a time scale tihs time around), linear for the vertical scale
const xScale = d3
  .scaleBand()
  // include as many bands as there are objects in the array
  .domain(d3.range(data.length))
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  // map the values from 0 up to the biggest value in the array of object to the 0-width interval
  .domain([0, d3.max(data, (d) => d.fifteenToTwentyFour) * 1.2])
  .range([height, 0]);

// include axes based on the scales
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10)
  // include the respective trimester instead of the default index value
  .tickFormat((d, i) => data[i].trimester);

const yAxis = d3
  .axisLeft(yScale)
  .ticks(5)
  .tickSize(0)
  .tickPadding(5)
  // show the ticks labels as percentage values
  .tickFormat((d) => `${d}%`);

containerSVG
  .append("g")
  .attr("class", "axis")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)
      // rotate the ticks labels
      .selectAll("text")
      .attr("transform", "translate(-10 10) rotate(-45)");

containerSVG
  .append("g")
  .attr("class", "axis")
  .attr("id", "y-axis")
  .call(yAxis)
  .selectAll("g.tick")
      // grid lines
      .append("path")
      .attr("d", `M 0 0 h ${width}`)
      .attr("stroke-width", "1px")
      .style("opacity", 0.5);



// include a line function which considers the items of the input array for the y coordinate
// the x coordinate is determined instead by the index of the array item
const line = d3
  .line()
  // include the bandwidth to center the values in the bands
  .x((d, i) => xScale(i) + xScale.bandwidth()/2)
  .y((d, i) => yScale(d));



// include an array for the legend
const category = ["Years 15-24", "Years 25-49", "Years >49", "Total"];

// go through a for loop four times to plot one line for each key in the array of objects (excluding the first field)
const keys = Object.keys(data[0]).slice(1);

for(let i = 0; i < keys.length; i++) {
  /* for each key
  append a path for the line
  append circle elements for the connecting dots
  append a text element for the legend
  */

  containerSVG
      .append("path")
      // define the line as through the layout function, for each data point in the different categories
      .attr("d", line(data.map((d) => d[keys[i]])))
      // include the class according to the key respective key
      .attr("class", `${keys[i]}`)
      .attr("stroke", colorScale(i))
      .attr("stroke-width", "2px")
      .attr("fill", "none");

  containerSVG
      // work once more with the class according to the respective key
      .selectAll(`circle.${keys[i]}`)
      .data(data.map((d) => d[keys[i]]))
      .enter()
      // append a circle element for each data point
      .append("circle")
      .attr("class", `${keys[i]}`)
      .attr("cx", (d, i) => xScale(i) + xScale.bandwidth()/2)
      .attr("cy", (d) => yScale(d))
      .attr("r", "2px")
      .attr("fill", "white")
      .attr("stroke", colorScale(i))
      .attr("stroke-width", "2px");

  containerSVG
      .append("text")
      // include each text element at a fraction of the width
      // with 4 items for instance, include them at 0.2, 0.4, 0.6, 0.8
      .attr("x", (width / (keys.length + 1)) * (i + 1))
      .attr("y", height + margin.bottom)
      .attr("text-anchor", "middle")
      .attr("fill", colorScale(i))
      .style("font-weight", "bold")
      .style("font-size", "0.7rem")
      .text(category[i]);
}

