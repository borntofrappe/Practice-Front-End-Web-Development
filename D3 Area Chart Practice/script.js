/** ALL VIZ(S) SHARE
 * data
 * wrapping container
 * color sclale
 * svg measures (margin, width, height)
 */

// DATA
// include data in the form of an array of random integers
const populateArray = (min = 100, max = 1000, length = 10) => {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    const randomInt = Math.floor(Math.random() * (max - min) + min);
    arr.push(randomInt);
  }
  return arr;
};

/*
the data is sorted as an array of objects
each object has two properties
- category
- value, with an array of random integers, as per the defined function
*/
const data = [
  {
    category: 'random',
    value: populateArray()
  },
  {
    category: 'unsystematic',
    value: populateArray()
  },
  {
    category: 'arbitrary',
    value: populateArray()
  },
  {
    category: 'unmethodical',
    value: populateArray()
  },
  {
    category: 'haphazard',
    value: populateArray()
  }
];

// wrapping container
const container = d3
  .select('.container');

// color scale
const colorScale = d3
  .scaleOrdinal(d3.schemeSet1);

// svg measures
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


/** FOR EACH VIZ
 * include a wrapping container
 * add HTML elements
 * update the data to fit the visualization
 * define layout functions
 * add svg elements
*/

// AREA CHART
// a simple area chart displays the evolution of a single numeric variable
// in d3, this can be plotted through the line() and area() functions
// ! plot only one set of data, chosen at random among the ones stored in the array

// HTML ELEMENTS
const containerArea = container
  .append('div')
  .attr('class', 'visualization');

containerArea
  .append('h1')
  .attr('class', 'title')
  .text('Area plot');

containerArea
  .append('p')
  .attr('class', 'description')
  .text('Plotting the evolution of a single numeric variable.');

// SVG G FRAME
const svgArea = containerArea
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// DATA
// for the area chart the data is retrieved from the array of objects
const randomIndex = Math.floor(Math.random() * data.length);
const dataArea = data[randomIndex];

// SCALES
// x scale: band scale, with a tick for each data point, mapped considering the width
const xScaleArea = d3
  .scaleBand()
  .domain(d3.range(dataArea.value.length))
  .range([0, width]);

// y scale: linear scale, mapping the actual values relative to the height
const yScaleArea = d3
  .scaleLinear()
  .domain([0, d3.max(dataArea.value)])
  .range([height, 0]);

const xAxisArea = d3
  .axisBottom(xScaleArea)
  // include tick labels starting from 1 instead of 0
  .tickFormat(d => d + 1);

const yAxisArea = d3
  .axisLeft(yScaleArea)
  // remove vertical ticks
  .tickSize(0)
  .tickPadding(10);

svgArea
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxisArea);

svgArea
  .append('g')
  .attr('class', 'axis')
  .call(yAxisArea)
  // include ticks labels vertically, next to the y axis
  .selectAll('text')
  .style('writing-mode', 'vertical-rl')
  .attr('text-anchor', 'middle');

// SVG ELEMENTS
// add a clip path defined by a rectangle of the width and height matching the viz
const clipArea = svgArea
  .append('clipPath')
  .attr('id', 'clipArea')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height);

// append first a grouping element, wrapping all SVG elements making up the visualization
// apply the clip path cropping anything outside of the defined scope
const svgAreaGroup = svgArea
  .append('g')
  .attr('clip-path', 'url(#clipArea)');

// the line delimiting the area chart is visualized through the iine() function
// this function specifies the horizontal and vertical coordinates of the points making up the line
// its output is included in the `d` attribute of a path element
const lineArea = d3
  .line()
  // for the x dimension consider each single tick
  .x((d, i) => xScaleArea(i) + xScaleArea.bandwidth() / 2)
  // for the y dimension consider the actual value
  .y(d => yScaleArea(d));

svgAreaGroup
  .append('path')
  .attr('d', lineArea(dataArea.value))
  .attr('fill', 'none')
  .attr('stroke', (d, i) => colorScale(i))
  .attr('stroke-width', '4px');

// the area is visualized instead through the area() function
// this is similar to the line function, but it accepts two functions for each dimension
// the space between these coordinates (x0, x1, y0, y1) makes up the area
// its output is included once again in the `d` attribute of a path element
const areaArea = d3
  .area()
  // x() can be used in place of x0 and x1 if these values match
  .x((d, i) => xScaleArea(i) + xScaleArea.bandwidth() / 2)
  // starting on the bottom of the svg
  .y0(yScaleArea(0))
  .y1(d => yScaleArea(d));

svgAreaGroup
  .append('path')
  .attr('class', 'area')
  .attr('d', areaArea(dataArea.value))
  .attr('fill', (d, i) => colorScale(i))
  .attr('stroke', 'none');


// STACKED AREA
// the stacked area plot is visualized through the stack() layout function
// this allows to obtain starting and ending coordinates for each subset of data

// HTML ELEMENTS
const containerStack = container
  .append('div')
  .attr('class', 'visualization');

containerStack
  .append('h1')
  .attr('class', 'title')
  .text('Stacked area plot');

containerStack
  .append('p')
  .attr('class', 'description')
  .text('Plotting the evolution of a multiple numeric variables.');

// SVG G FRAME
const svgStack = containerStack
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// DATA
// a stack() function requires an array of objects
// format the data to have such a construct
// to have an array of 10 objects, each nesting 1 observation for each category
const stackData = [];

for (let j = 0; j < data[0].value.length; j += 1) {
  stackData.push({});
  for (let i = 0; i < data.length; i += 1) {
    stackData[j][i] = data[i].value[j];
  }
}
// console.log(stackData);

// with the array of objects, the stack layout is defined accoring to the object's properties
// properties detailed in the keys() function
const stack = d3
  .stack()
  .keys(Object.keys(stackData[0]));

const dataStack = stack(stackData);
// the stacked data includes an array of two dimensional arays
// describing the starting and ending point of each category
// console.log(dataStack);

// SCALES
// x scale: band scale, with a tick for each observation
const xScaleStack = d3
  .scaleBand()
  .domain(d3.range(dataStack[0].length))
  .range([0, width]);

// y scale: linear scale, considering the smallest and greates values in the stacked data array
const yScaleStack = d3
  .scaleLinear()
  .domain([d3.min(dataStack[0], d => d[0]), d3.max(dataStack[dataStack.length - 1], d => d[1])])
  .range([height, 0]);

const xAxisStack = d3
  .axisBottom(xScaleStack)
  .tickFormat(d => d + 1);

const yAxisStack = d3
  .axisLeft(yScaleStack)
  .ticks(5)
  .tickSize(0)
  .tickPadding(10);

svgStack
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxisStack);

svgStack
  .append('g')
  .attr('class', 'axis')
  .call(yAxisStack)
  .selectAll('text')
  .style('writing-mode', 'vertical-rl')
  .attr('text-anchor', 'middle');

// SVG ELEMENTS
const clipStack = svgStack
  .append('clipPath')
  .attr('id', 'clipStack')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height);

const svgGroupStack = svgStack
  .append('g')
  .attr('clip-path', 'url(#clipStack)');

// LINE for the stacked area plot
// based on the second item of each array item
const lineStack = d3
  .line()
  .x((d, i) => xScaleStack(i) + xScaleStack.bandwidth() / 2)
  .y(d => yScaleStack(d[1]));

// AREA for the stacked area plot
// considering also the first item of each array as where each area begins
const areaStack = d3
  .area()
  .x((d, i) => xScaleStack(i) + xScaleStack.bandwidth() / 2)
  .y0(d => yScaleStack(d[0]))
  .y1(d => yScaleStack(d[1]));

// for each category, add a path for the line and one for the area
for (let i = 0; i < dataStack.length; i += 1) {
  // include each visualization in a common group
  const stackSingle = svgGroupStack
    .append('g');

  stackSingle
    .append('path')
    .attr('class', 'area')
    .attr('d', areaStack(dataStack[i]))
    // ! i refers to the variable of the for loop
    .attr('fill', colorScale(i))
    .attr('stroke', 'none');

  stackSingle
    .append('path')
    .attr('d', lineStack(dataStack[i]))
    .attr('fill', 'none')
    .attr('stroke', colorScale(i))
    .attr('stroke-width', '3px');
}


// STREAMGRAPH
// the streamgraph is close to the stacked area plot, but without corners
// the structure is eerily similar, replicating the area with a curve() function

// HTML ELEMENTS
const containerStreamgraph = container
  .append('div')
  .attr('class', 'visualization');

containerStreamgraph
  .append('h1')
  .attr('class', 'title')
  .text('Streamgraph');

containerStreamgraph
  .append('p')
  .attr('class', 'description')
  .text('Plotting the evolution of a multiple numeric variables, without edges.');

// SVG G FRAME
const svgStreamgraph = containerStreamgraph
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


svgStreamgraph
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxisStack);

svgStreamgraph
  .append('g')
  .attr('class', 'axis')
  .call(yAxisStack)
  .selectAll('text')
  .style('writing-mode', 'vertical-rl')
  .attr('text-anchor', 'middle');


// SVG ELEMENTS
const clipStreamgraph = svgStreamgraph
  .append('clipPath')
  .attr('id', 'clipStreamgraph')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height);

const svgGroupStreamgraph = svgStreamgraph
  .append('g')
  .attr('clip-path', 'url(#clipStreamgraph)');

// AREA for the streamgraph
// match the curve of the line by applying the same curve
const areaStreamgraph = d3
  .area()
  .x((d, i) => xScaleStack(i) + xScaleStack.bandwidth() / 2)
  .y0(d => yScaleStack(d[0]))
  .y1(d => yScaleStack(d[1]))
  .curve(d3.curveCardinal);

for (let i = 0; i < dataStack.length; i += 1) {
  const streamgraphSingle = svgGroupStreamgraph
    .append('g');

  streamgraphSingle
    .append('path')
    .attr('class', 'area')
    .attr('d', areaStreamgraph(dataStack[i]))
    .attr('fill', colorScale(i))
    .attr('stroke', 'none');
}
