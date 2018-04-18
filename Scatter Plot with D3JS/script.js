// include multi-dimensional array with maximum and minimum temperature for the year
const monthlyAverages = 
    [
        [7,3],
        [8,3],
        [12,5],
        [16,7],
        [19,11],
        [23,14],
        [25,16],
        [25,15],
        [21,13],
        [16,10],
        [11,6],
        [8,3],
     ];

// select the container and include a header
d3.select(".container")
     .append("h1")
     .text("Monthly Weather Averages in Paris");

// define the sizes of the SVG and its elements
const w = 600;
const h = 350;
const dotSize = 10;
const padding = dotSize*1.5;

// define a scale for the y-axis, going from 0 up to 25 degrees, map the output with the range function to encompass the height of the SVG (as the y coordinate is computed from the top with y=0 to the bottom with y=height, the range goes "backwards")
const verticalScale = d3.scaleLinear();
verticalScale.domain([0, 25]);
verticalScale.range([h - padding, padding]);

// include an svg with the prescribed measures
const svg = d3.select(".container")
     .append("svg")
     .attr("width", w)
     .attr("height", h)
     .attr("class", "frame");

// include a group element for each data point (each group element is then set to contain 2 circle elements)
const groupOfCircles = svg.selectAll("g")
     .data(monthlyAverages)
     .enter()
     .append("g");

// include a circle related to the maximum temperature
groupOfCircles.append("circle")
    // horizontally position the circle on the basis of their index (multiplied by 12 and offset by the padding and space occupied by the left axis)
     .attr("cx", (d, i) => i*(w/monthlyAverages.length) + padding + 20)
    // vertically position the circle on the basis of the data point, scaled according to the defined scale
     .attr("cy", (d, i) => verticalScale(d[0]))
    // radius originally set to one, transitioned to 1
     .attr("r", 0)
     .attr("class", "datapoint-max")
     .append("title")
     .text((d) => d[0] + "°C");

// include a circle related to the minimum temperature
groupOfCircles.append("circle")
     .attr("cx", (d, i) => i*(w/monthlyAverages.length) + padding + 20)
     .attr("cy", (d, i) => verticalScale(d[1]))
     .attr("r", 0)
     .attr("class", "datapoint-min")
     .append("title")
     .text((d) => d[1] + "°C");

// include the vertial axis based on the defined vertical scale (include also a transition)
const verticalAxis = d3.axisLeft(verticalScale).ticks(4).tickPadding(2);
svg.append("g")
  .transition()
  .duration(500)
  .delay(5000)
  .attr("transform", "translate(" + 20 + ", 0)")
  .call(verticalAxis);

// transition circles from opacity and radius of 0 to the prescribed measure
svg.selectAll("circle")
  .transition()
  .duration((d, i) => i*100 + 500)
  .delay(500)
  .attr("r", dotSize)
  .style("opacity", 1);