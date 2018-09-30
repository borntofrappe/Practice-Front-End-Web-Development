/** ALL VIZ(S) SHARE
 * data
 * wrapping container
 * SVG MEASURES
 */

// DATA
// include random data in the form of arrays, including x integers from a minimum to a maximum value
// ! by default the arrays are made 10 items long
const populateArray = (min = 100, max = 1000, length = 10) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randomInt = Math.floor(Math.random() * (max - min) + min);
    arr.push(randomInt);
  }
  return arr;
};

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

// WRAPPING CONTAINER
const container = d3
  .select('.container');


// SVG MREASURES
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
 * define the layout functions
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
  .text('Area chart');

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

// DATA for the area chart
// chosen at random from one of the array items
const randomIndex = Math.floor(Math.random() * data.length);
const dataArea = data[randomIndex];

// SCALES
// for the horizontal scale consider one tick for data point
const xScaleArea = d3
  .scaleBand()
  .domain(d3.range(dataArea.value.length))
  .range([0, width]);

// for the vertical scale, consider the actual value behind the data points
const yScaleArea = d3
  .scaleLinear()
  .domain([0, d3.max(dataArea.value)])
  .range([height, 0]);

const xAxisArea = d3
  .axisBottom(xScaleArea)
  .tickFormat(d => d + 1);

const yAxisArea = d3
  .axisLeft(yScaleArea)
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
  .selectAll('text')
  .style('writing-mode', 'vertical-rl')
  .attr('text-anchor', 'middle');

// SVG LINE & AREA
// the SVG syntax behind the line is obtained through the line() function
// the output of this function is included in the `d` attribute of a path element
const lineArea = d3
  .line()
  .x((d, i) => xScaleArea(i) + xScaleArea.bandwidth() / 2)
  .y(d => yScaleArea(d))
  .curve(d3.curveCardinal);

svgArea
  .append('path')
  .attr('d', lineArea(dataArea.value))
  .attr('fill', 'none')
  .attr('stroke', '#093497aa')
  .attr('stroke-width', '2px');

// the SVG syntax behind the area is obtained through the area() function
// the output of this function is included in the `d` attribute of a path element
// ! this function details `x0` and `x1` coordinate, alongside the vertical counterpart, describing the area behind the line
const areaArea = d3
  .area()
  // x() can be used in place of x0 and x1 if these values match
  .x((d, i) => xScaleArea(i) + xScaleArea.bandwidth() / 2)
  .y0(yScaleArea(0))
  .y1(d => yScaleArea(d))
  .curve(d3.curveCardinal);

svgArea
  .append('path')
  .attr('d', areaArea(dataArea.value))
  .attr('fill', '#09349722')
  .attr('stroke', 'none');


// STACKED AREA
// the stacked nature of the chart is obtained throug the stack() layout function
// this allows to obtain starting and ending coordinates for each subset of data

// HTML ELEMENTS
const containerStacked = container
  .append('div')
  .attr('class', 'visualization');

containerStacked
  .append('h1')
  .attr('class', 'title')
  .text('Stacked area chart');

containerStacked
  .append('p')
  .attr('class', 'description')
  .text('Plotting the evolution of a multiple numeric variables.');

// SVG G FRAME
const svgStack = containerStacked
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// DATA for the stacked area chart
// a stack() function requires an array of objects, in which each successive property describes a value
// format the data to have such a construct
// to have an array of 10 objects, each nesting 1 observation for each value of the subset
const stackedData = [];

for (let j = 0; j < 10; j++) {
  stackedData.push({});
  for (let i = 0; i < 5; i++) {
    stackedData[j][i] = data[i].value[j];
  }
}
// console.log(stackedData);

// // once you have an array of objects, you can include a stack based on the index of the nested arrays
const stack = d3
  .stack()
  .keys([0, 1, 2, 3, 4]);

const dataStack = stack(stackedData);
// // // the stacked data includes an array of two dimensional arays
// // // describing the starting and ending point of each stacked section in the first and second array item
// console.log(dataStack);

// SCALES
// ! the stacked area chart has one tick for each data point
const xScaleStack = d3
  .scaleBand()
  .domain(d3.range(dataStack[0].length))
  .range([0, width]);

// ! concerning the y dimension, it considers the smallest value in the first array and the biggest in the last one
const yScaleStack = d3
  .scaleLinear()
  .domain([d3.min(dataStack[0], (d) => d[0]), d3.max(dataStack[dataStack.length - 1], (d) => d[1])])
  .range([height, 0]);

const xAxisStack = d3
  .axisBottom(xScaleStack)
  .tickFormat(d => d + 1);

const yAxisStack = d3
  .axisLeft(yScaleStack)
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

// LINE for the stacked area chart
// based on the second item of each array item
const lineStack = d3
  .line()
  .x((d, i) => xScaleStack(i) + xScaleStack.bandwidth() / 2)
  .y(d => yScaleStack(d[1]))
  .curve(d3.curveCardinal);

// AREA for the stacked area chart
// considering also the first item of each array as the starting point
const areaStack = d3
  .area()
  .x((d, i) => xScaleStack(i) + xScaleStack.bandwidth() / 2)
  .y0(d => yScaleStack(d[0]))
  .y1(d => yScaleStack(d[1]))
  .curve(d3.curveCardinal);

// for each one of the 10 stacked objects, add a path for the line and one for the area
for (let i = 0; i < dataStack.length; i++) {
  svgStack
    .append('path')
    .attr('d', lineStack(dataStack[i]))
    .attr('fill', 'none')
    .attr('stroke', '#093497aa')
    .attr('stroke-width', '2px');

  svgStack
    .append('path')
    .attr('d', areaStack(dataStack[i]))
    .attr('fill', '#09349722')
    .attr('stroke', 'none');
}



