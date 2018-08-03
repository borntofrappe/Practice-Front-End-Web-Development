// include the object storing the data 
const data = {
  hamilton: {
    codename: 'ham',
    position: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2]
  },
  bottas: {
    codename: 'bot',
    position: [2,2,2,2,2,2,2,2,2,4,4,4,3,3,3,3,3,3,3,3]
  },
  raikkonen: {
    codename: 'rai',
    position: [3,4,4,4,4,4,4,6,6,6,5,5,5,5,5,4,4,4,4,4]
  },
  vettel: {
    codename: 'vet',
    position: [4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,1,1]
  },
  sainz: {
    codename: 'sai',
    position: [5,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,6,6]
  },
  gastly: {
    codename: 'gas',
    position: [6,3,3,3,3,3,3,5,5,5,6,6,6,6,6,6,6,6,5,5]
  }
};

// as th y axis shows the three letter "code" name of each rider, loop through the object and create an array holding such values
// pass the array in the domain function of the scale for the y axis
const objectKeys = Object.keys(data);
let codenames = [];

for(let i = 0; i < objectKeys.length; i ++) {
  codenames.push(data[objectKeys[i]].codename);
}


// select the node in which to include the data visualization
const containerData = d3.select("div.data");

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
// the x scale is simply a linear scale going from 0 to 25
// the y scale is instead ordinal, and through the scaleBand function shows the codenames in the height of the SVG
const xScale = d3
                .scaleLinear()
                .domain([0,25])
                .range([0, w]);

const yScale = d3
                .scaleBand()
                .domain(codenames)
                .range([0, h]);

// limit the number of ticks in the horizontal axis
const xAxis = d3
                .axisBottom(xScale)
                .ticks(6)
                .tickSize(2);

// create some space between the text and the axis
const yAxis = d3
                .axisLeft(yScale)
                .tickSize(2)
                .tickPadding(10);
                
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

        