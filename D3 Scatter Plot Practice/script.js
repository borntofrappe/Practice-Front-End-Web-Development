/* globals d3 */
// DATA
/* create random data for the scatter plot, with an array of objects each detailing three values:
- key
- x
- y

the first to identify the data point, the other two to detail the x and y coordinate respectively
*/
// create a function returning a random value between 1 and a maximum value
const maxValue = 100;
const randomInt = () => Math.ceil(Math.random() * maxValue);

// create an array for the data
const dataset = [];

// populate the dataset with as many objects as detailed by a control variable
const datasetLength = 200;
for (let i = 0; i < datasetLength; i += 1) {
  // use the index for the key and a random integer for the x and y coordinates
  const key = i;
  let x = randomInt();
  let y = randomInt();

  // in the middle of the array start incrementing the values as to show an uneven distribution in the scatter plot
  if (i >= datasetLength / 2) {
    x = (x < 50) ? x + 50 : x;
    y = (y < 50) ? y + 50 : y;
  }
  dataset.push({
    key,
    x,
    y
  });
}

// plot a scatter plot based on the dataset
// ! include noticeable margin at the top and to the right, as to later include the histograms

// SELECT
const container = d3
  .select('.container');

// HTML ELEMENTS
container
  .append('h1')
  .attr('class', 'title')
  .text('Scatter Plot Practice');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');

// SVG FRAME
const margin = {
  top: 100,
  right: 100,
  bottom: 50,
  left: 50
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// LABELS
// position arbitrary labels to the left and to the bottom of the scatter plot
containerFrame
  .append('text')
  .attr('x', -margin.left)
  .attr('y', height / 2)
  .attr('writing-mode', 'vertical-rl')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'after-edge')
  .text('Quality');

containerFrame
  .append('text')
  .attr('x', width / 2)
  .attr('y', height + margin.bottom)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'after-edge')
  .text('Quantity');

// SCALES
// for the scatter plot detail linear scales, based on the maximum value and the width/height
const xScale = d3
  .scaleLinear()
  .domain([0, maxValue])
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  .domain([0, maxValue])
  .range([height, 0]);

// reduce the number of ticks shown
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .ticks(4)
  .tickPadding(10)
  // hide the first tick to show the origin only on the y axis
  .tickFormat(d => (d !== 0 ? d : ''));

const yAxis = d3
  .axisLeft(yScale)
  .tickSize(0)
  .ticks(4)
  .tickPadding(10);

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .attr('class', 'x axis')
  .call(xAxis);

containerFrame
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis);

// add grid lines stemming from the ticks
d3.select('.x')
  .selectAll('g')
  .append('path')
  .attr('d', `M 0 0 v ${-height}`);


d3.select('.y')
  .selectAll('g')
  .append('path')
  .attr('d', `M 0 0 h ${width}`);

// reduce the weight of the axes
d3.selectAll('.axis')
  .selectAll('path')
  .attr('stroke', '#33333322')
  .attr('stroke-width', '1px')
  .attr('fill', 'none');


// add circles for the scatter plot
// separating the selection according to the update/enter/exit loop
// ! this is planned for a future update

const update = containerFrame
  .selectAll('circle')
  .data(dataset, d => d.key);

const enter = update
  .enter();

// const exit = update
//   .exit();

// for new elements, animate the circles into view following two control values
const circlesDuration = 200;
const circlesDelay = 1000;

enter
  .append('circle')
  .attr('cx', d => xScale(d.x))
  .attr('cy', d => yScale(d.y))
  .attr('r', 0)
  .transition()
  .duration(circlesDuration)
  .delay((d, i) => i / dataset.length * circlesDelay)
  .attr('r', 4)
  .attr('fill', '#ccc');

// exit
//   .remove();


// compute the histograms on the basis of the dataset and its x and y values
const histogram = d3
  .histogram()
  // limit the number of bins to the number of ticks for the axes
  // ! TODO: read the docs to have this number match the exact number of ticks and avoid magic numbers
  .thresholds(5);

// build the histograms
// ! each histogram is an array of arrays; in these last elements, the data points are separated according to value
const xHistogram = histogram(dataset.map(data => data.x));
const yHistogram = histogram(dataset.map(data => data.y));

// add a simple variable to include whitespace around the rectangle elements
const rectMargin = 2;

// create a scale based on the input data and available space (allocated by the margin.top value)
// input data in the form of the length of each histogram bin
const xHistogramScale = d3
  .scaleLinear()
  .domain([0, d3.max(xHistogram, d => d.length)])
  .range([0, margin.top]);

// based on the histogram, plot rectangle elements atop the scatter plot
// define variables for the transition (triggered as the transition for the circle elements come to a close)
const rectDuration = 200;
const rectDelay = 800;
containerFrame
  .selectAll('rect.x')
  .data(xHistogram)
  .enter()
  .append('rect')
  .attr('class', 'x')
  .attr('x', (d, i) => width / xHistogram.length * i)
  .attr('width', width / xHistogram.length - rectMargin)
  .transition()
  .duration(rectDuration)
  .delay((d, i) => i / xHistogram.length * rectDelay + circlesDelay)
  .attr('y', d => 0 - xHistogramScale(d.length))
  .attr('height', d => xHistogramScale(d.length))
  .attr('stroke', 'none');

// repeat for the y axis, but considering margin.right and the right side of the scatter plot
const yHistogramScale = d3
  .scaleLinear()
  .domain([0, d3.max(yHistogram, d => d.length)])
  .range([0, margin.right]);

// flip the logic for the x-width and y-height (as well as considering non-negative values for the starting x coordinate)
containerFrame
  .selectAll('rect.y')
  .data(yHistogram)
  .enter()
  .append('rect')
  .attr('class', 'y')
  .attr('y', (d, i) => height - height / yHistogram.length * (i + 1))
  .attr('height', height / yHistogram.length - rectMargin)
  .attr('x', width)
  .transition()
  .duration(rectDuration)
  .delay((d, i) => (xHistogram.length - i) / xHistogram.length * rectDelay + circlesDelay + rectDelay)
  .attr('width', d => yHistogramScale(d.length))
  .attr('stroke', 'none');

// select all rectangles and add a bit of interactivity increasing the opacity on hover
// ! detail also the number of points of each bin through the tooltip
containerFrame
  .selectAll('rect')
  .attr('fill', '#aaa')
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .attr('fill', '#777');

    tooltip
      .append('p')
      .text('Number of projects: ')
      .append('strong')
      .text(d.length);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .attr('fill', '#aaa');


    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });
