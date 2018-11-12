/* globals d3 */
/*
create a stacked column chart displaying the price of gasoline, or diesel, as divided in taxes/other costs
*/

const taxesGasoline = [36.8, 31.4, 27.6, 28.6, 30.3, 30.5, 31.7, 33.4, 35.9, 34.5, 36.0, 34.7, 34.6, 35.7, 35.3, 36.7, 37.3, 38.8, 39.5, 39.3, 38.9, 38.1, 37.9, 37.9, 38.5, 39.0, 40.7, 41.7, 42.0, 43.0, 43.8, 43.7, 42.9, 43.0, 42.7, 43.3, 42.7, 42.6, 42.7, 44.1, 44.9, 46.2, 46.5, 44.9, 43.5, 44.1, 45.9, 46.4, 45.9, 44.6, 43.7, 44.3, 45.4, 45.2, 44.1, 43.5, 43.6, 43.8, 44.0, 43.6, 42.4, 42.2, 42.7, 42.4, 42.7, 42.6, 42.8, 43.0, 43.3, 43.3, 42.4, 42.2, 41.3, 40.1, 37.0, 33.9, 36.3, 38.0, 38.4, 39.4, 39.6, 39.1, 37.2, 34.9, 34.4, 34.5, 33.6, 32.2, 31.1, 31.9, 33.7, 34.7, 35.5, 33.5, 32.8, 33.3, 34.8, 34.2, 35.8, 36.6, 36.8, 35.8, 36.3, 35.2, 34.3, 33.4, 34.1, 35.1, 34.7, 36.3, 36.4, 36.4, 36.2, 35.9, 36.9, 38.2, 38.6, 38.2, 38.6, 38.9, 39.0];
// const taxesDiesel = [48.2, 45.1, 40.6, 40.1, 39.2, 38.4, 39.5, 39.5, 41.8, 40.9, 42.5, 41.5, 42.0, 42.8, 42.5, 43.8, 44.1, 45.4, 46.6, 46.9, 46.9, 46.0, 46.1, 46.3, 46.9, 47.3, 48.7, 49.4, 50.2, 51.5, 51.6, 50.5, 50.5, 50.6, 50.3, 50.8, 51.2, 51.9, 51.7, 52.5, 52.6, 53.2, 52.9, 52.2, 50.9, 51.7, 53.2, 54.1, 54.2, 53.7, 52.1, 51.9, 52.4, 52.0, 51.0, 50.5, 50.4, 50.9, 51.1, 51.4, 50.5, 50.2, 50.6, 50.2, 50.2, 49.7, 49.6, 49.6, 49.7, 49.5, 49.4, 49.2, 48.3, 47.5, 44.5, 40.2, 42.8, 43.5, 43.3, 44.4, 43.8, 42.3, 40.3, 39.8, 39.7, 39.6, 36.7, 33.2, 33.1, 35.1, 35.4, 37.8, 39.2, 37.7, 36.9, 37.4, 39.3, 38.8, 40.6, 40.2, 40.1, 39.3, 39.4, 38.2, 37.0, 36.8, 37.7, 38.6, 39.3, 40.3, 40.6, 39.7, 39.1, 38.9, 39.9, 41.3, 41.7, 41.2, 41.3, 42.1, 43.3];

// color values
const colors = {
  gasoline: '#AACFB5',
  diesel: '#2b70b4'
};

// select the single container
const container = d3
  .select('.container');

// add a div for the tooltip
const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// introductory HTML elements
// nest the central message in a container
const containerMessage = container
  .append('div')
  .attr('class', 'message');

containerMessage
  .append('h3')
  .text('But in ten years, the rise in prices is nevertheless substantial. Is must be because of taxes!');

containerMessage
  .append('p')
  .html('That again, only partially. Taxes have been from a long time more than half the price at the pump for <strong>gasoline</strong>:');

// the margin convention is perhaps overkill for the following visualizations
// SVG FRAME
const margin = {
  top: 20,
  right: 25,
  bottom: 20,
  left: 25
};
const width = 500 - (margin.left + margin.right);
const height = 300 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale describe a time scale from 2008 to 2018
const xScale = d3
  .scaleTime()
  .domain([new Date('2008, 09'), new Date('2018, 10')])
  .range([0, width]);

// for the vertical scale, a linear scale from 0 to 100 (percent)
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, height]);

// add an axis only for the horizontal dimension (showing the first and last tick labels)
const xAxis = d3
  .axisBottom(xScale);

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

// map through the array of values and include for each an object for the two different components
// this to accommodate the stack function
const dataStack = taxesGasoline.map(taxes => ({
  others: 100 - taxes,
  taxes
}));


// add a dotted line halfway through the visualization
// ! add it after the stacked columns, as to have it overlaid on top
containerFrame
  .append('path')
  .attr('d', `M 0 ${yScale(50)} h ${width}`)
  .attr('stroke', '#555')
  .attr('stroke-width', '1px')
  .attr('stroke-dasharray', '5px');

containerFrame
  .append('text')
  .attr('x', width)
  .attr('y', yScale(50))
  .attr('alignment-baseline', 'middle')
  .attr('font-size', '0.7rem')
  .attr('font-weight', 'bold')
  .text('50%');
