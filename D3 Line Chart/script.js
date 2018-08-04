/* include the object with the data
each data point is an object with 
- codename, for a three letter name surmising the name of the rider
- position, to describe the position in each subsequent lap
- team, an hex color used for the line describing the rider's position
*/
const data = {
  hamilton: {
    codename: 'ham',
    position: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
    team: "#6DC2C0"
  },
  bottas: {
    codename: 'bot',
    position: [2,2,2,2,2,2,2,2,2,4,4,4,3,3,3,3,3,3,3,3],
    team: "#6DC2C0"
  },
  raikkonen: {
    codename: 'rai',
    position: [3,4,4,4,4,4,4,6,6,6,3,3,5,5,5,4,4,4,4,4],
    team: "#DB0914"
  },
  vettel: {
    codename: 'vet',
    position: [4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,1,1],
    team: "#DB0914"
  },
  sainz: {
    codename: 'sai',
    position: [5,6,6,5,5,5,5,4,4,5,5,5,4,4,4,5,5,5,6,6],
    team: "#F8EA31"
  },
  gasly: {
    codename: 'gas',
    position: [6,5,5,6,6,6,6,5,5,5,6,6,6,6,6,6,6,6,5,5],
    team: "#3750CF"
  }
};

// the y axis is based on a _scaleBand_
// the domain is an array with a number identifying each subsequent rider (as in [1,2,3,4...])
// the axis itself has as tick values the three letter codename of each rider (as in ["ham", "bot", "rai", "vet"...])
// create the two arrays based on the data

const objectKeys = Object.keys(data);

let riders = [];
for(let i = 1; i <= objectKeys.length; i ++) {
  riders.push(i);
}

let codenames = [];
for(let i = 0; i < objectKeys.length; i ++) {
  codenames.push(data[objectKeys[i]].codename);
}

// the line is based on the value of the y scale, defined through the mentioned array
// moreover, it is based on an array of each subsequent lap (as in [1,2,3,4...])
// create such an array depending on number of laps

let laps = [];
for(let i = 1; i <= data[objectKeys[0]].position.length; i ++) {
  laps.push(i);
}


// select the node in which to include the data visualization
const containerData = d3.select("div.container__data");

// define values which distance the data visualization from the wrapping <svg> element
const margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
};

// define the width and height value deducting the respective margin values
// this allows to later use the values for the data visualization as a whole, safely inside of the wrapping g element
// without needing further adjustment with margin/ padding
const w = 900 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

// append an <svg> element with a viewBox attribute described by the width and height values
// these augmented by the margin values as to have the SVg encompass exactly the measures defined by the absolute units (900 and 750) 
const svg = containerData
              .append("svg")
              .attr("viewBox", `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`);

// inside of the <svg> element include a <g> element, in which the data visualization will be included 
// translate <g> to have the grouping element nestled inside of the SVG
// this structure allows some space in which the data visualization can be depicted without fear of cropping
// moreover, it allows to use the width and height values as is
const svgCanvas = svg
                  .append("g")
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// define the intervals for the domain and range, for both axes
// the x scale is simply a linear scale going from 1 to 25
// the y scale is a scaleBand, an ordinal scale detailing in the y axis each subsequent element
const xScale = d3
                .scaleLinear()
                .domain([1, data[objectKeys[0]].position.length])
                .range([0, w]);

const yScale = d3
                .scaleBand()
                .domain(riders)
                // the elements are included from the top down, without need for further adjustments
                .range([0, h]);

// create axes on the basis of the scales 
// reduce the size of the axes
const xAxis = d3
                .axisBottom(xScale)
                .tickSize(3);

const yAxis = d3
                .axisLeft(yScale)
                .tickSize(3)
                // alter the format of the ticks to show the codenames instead of the integers
                .tickFormat((d, i) => codenames[i])
                .tickPadding(5);
                
// include the axis on the left and at the bottom of the SVG container
svgCanvas
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${h})`)
        .call(xAxis);

svgCanvas
        .append("g")
        .attr("id", "y-axis")
        .call(yAxis);

// the line is created by passing the different arrays describing the riders' positions
// as in [1,2,1,3,1,1,1]
// the horizontal coordinate of each point is each subsequent lap, allowing to draw the line from the left to the right
// the vertical coordinate is based on the value of the array itself
// important: scaleBand includes the element at the top of each band; offset by half the band through the bandWidth() function, applied to the scale
const line = d3
  .line()
  .x((d, i) => xScale(laps[i]))
  .y((d, i) => yScale(d) + yScale.bandwidth()/2);

// loop through the object, on the basis of the array nesting the different data points
// append a path including a line for each array
// datum is used instead of data to immediately bind the element to the SVG container 
for(let i = 0; i < objectKeys.length; i++) {
  svgCanvas
    .append("path")
    .datum(data[objectKeys[i]].position)
    .attr("d", line)
    .attr("class", "line")
    .attr("stroke", data[objectKeys[i]].team)
    .attr("stroke-width", 5)
    .attr("fill", "none");
}

// with plain javascript loop through all SVG elements responsible for the riders' lines
// hide the elements by including strokedash properties based on the length of the elements themselves
// the elements are animated in CSS, where the stroke-dashoffset property is altered to 0
const paths = document.querySelectorAll("path.line");
paths.forEach(path => {
  console.log(path.getTotalLength());
  path.style.strokeDasharray = path.getTotalLength();
  path.style.strokeDashoffset = path.getTotalLength();
});