/* globals d3 */
// DATA
/* create random data for the scatter plot, with an array of objects each detailing three values:
- key
- x
- y

the first to identify the data point, the other two to detail the x and y coordinate respectively
*/
// create a function returning a random value between 1 and a max value
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

const container = d3
  .select('.container');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');

container
  .append('h1')
  .attr('class', 'title')
  .text('Scatter Plot Practice');

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
// for the scatter plot detail linear scales
const xScale = d3
  .scaleLinear()
  .domain([0, maxValue])
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  .domain([0, maxValue])
  .range([height, 0]);

const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .ticks(4)
  .tickPadding(10)
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

d3.select('.x')
  .selectAll('g')
  .append('path')
  .attr('d', `M 0 0 v ${-height}`);


d3.select('.y')
  .selectAll('g')
  .append('path')
  .attr('d', `M 0 0 h ${width}`);


d3.selectAll('.axis')
  .selectAll('path')
  .attr('stroke', '#33333322')
  .attr('stroke-width', '1px')
  .attr('fill', 'none');


// add circles for the scatter plot
const circlesDuration = 200;
const circlesDelay = 1000;
const update = containerFrame
  .selectAll('circle')
  .data(dataset, d => d.key);

const enter = update
  .enter();

const exit = update
  .exit();

enter
  .append('circle')
  .attr('cx', d => xScale(d.x))
  .attr('cy', d => yScale(d.y))
  .attr('r', 0)
  .transition()
  .duration(circlesDuration)
  .delay((d, i) => i / dataset.length * circlesDelay)
  .attr('r', 4)
  .attr('fill', '#33333377');

exit
  .remove();


// compute the histograms on the basis of the dataset x and y values
const histogram = d3
  .histogram()
  .thresholds(5);

const xHistogram = histogram(dataset.map(data => data.x));
const yHistogram = histogram(dataset.map(data => data.y));
const histogramPadding = 2;

// create scales based on the input data and available space (allocated by the margin.top and margin.right values)
// input data in the form of the length of each histogram bin
const xHistogramScale = d3
  .scaleLinear()
  .domain([0, d3.max(xHistogram, d => d.length)])
  .range([0, margin.top]);


// based on the histogram, plot rectangle elements atop and to the right of the scatter plot
const rectDuration = 200;
const rectDelay = 800;
containerFrame
  .selectAll('rect.x')
  .data(xHistogram)
  .enter()
  .append('rect')
  .attr('class', 'x')
  .attr('x', (d, i) => width / xHistogram.length * i)
  .attr('width', width / xHistogram.length - histogramPadding)
  .transition()
  .duration(rectDuration)
  .delay((d, i) => i / xHistogram.length * rectDelay + circlesDelay)
  .attr('y', d => 0 - xHistogramScale(d.length))
  .attr('height', d => xHistogramScale(d.length))
  .attr('stroke', 'none')
  .attr('fill', '#333');

// repeat for the y axis, but considering margin.right
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
  .attr('height', height / yHistogram.length - histogramPadding)
  .attr('x', width)
  .transition()
  .duration(rectDuration)
  .delay((d, i) => (xHistogram.length - i) / xHistogram.length * rectDelay + circlesDelay + rectDelay)
  .attr('width', d => yHistogramScale(d.length))
  .attr('stroke', 'none')
  .attr('fill', '#333');

containerFrame
  .selectAll('rect')
  .attr('opacity', 0.4)
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .attr('opacity', 0.7);

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
      .attr('opacity', 0.4);


    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });
