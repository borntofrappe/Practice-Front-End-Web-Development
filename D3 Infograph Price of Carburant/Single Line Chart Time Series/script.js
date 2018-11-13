/* globals d3 */
/*
create a line chart using brentRise
detailing the  rise in price for barrel oil
*/

// time frame: monthly from january 2009 to october 2018
// from january 2009 to october 2018
const brentRise = [43.29, 43.26, 46.54, 50.19, 57.38, 68.68, 64.46, 72.52, 67.61, 72.52, 76.65, 74.46, 76.00, 73.00, 78.00, 84.00, 75.00, 74.00, 75.00, 77.00, 77.00, 82.00, 85.00, 91.00, 96.61, 103.73, 114.64, 123.21, 114.40, 114.30, 116.75, 110.38, 112.84, 109.55, 110.61, 107.87, 110.68, 119.44, 125.45, 119.75, 110.17, 95.16, 102.54, 113.36, 113.50, 111.70, 109.14, 109.46, 112.95, 116.13, 108.50, 101.95, 102.53, 102.92, 107.83, 111.29, 111.73, 109.80, 107.96, 110.76, 108.12, 108.91, 107.48, 107.66, 109.52, 111.80, 106.86, 101.66, 97.29, 87.46, 79.00, 62.51, 47.71, 58.10, 55.89, 59.61, 64.40, 61.47, 56.56, 46.52, 47.62, 48.43, 44.29, 38.50, 30.69, 32.20, 38.32, 41.58, 46.79, 48.25, 44.95, 45.67, 46.57, 49.52, 44.73, 53.31, 54.58, 54.87, 51.59, 52.36, 50.32, 46.37, 48.48, 51.70, 56.15, 57.50, 62.73, 64.38, 69.90, 65.32, 66.20, 72.60, 76.98, 74.40, 74.25, 72.44, 78.89, 81.30];

// for the line chart referring to the price in euro simply use the following dataset (for the vertical scale, for the line and for the group elements)
// ! additionally change the unit of measure from dollar $ to euro €
// ! the text used around the visualization might also need some adjusting
// const brentRiseEuro = [32.7, 33.8, 35.7, 38.0, 42.1, 49.0, 45.8, 50.8, 46.4, 48.9, 51.4, 51.0, 53.3, 53.3, 57.5, 62.6, 59.7, 60.6, 58.7, 59.7, 58.9, 59.0, 62.2, 68.8, 72.3, 76.0, 81.9, 85.3, 79.7, 79.4, 81.8, 77.0, 81.9, 79.9, 81.6, 81.8, 85.8, 90.3, 95.0, 91.0, 86.0, 76.0, 83.4, 91.4, 88.3, 86.1, 85.1, 83.5, 85.0, 86.9, 83.7, 78.3, 79.0, 78.0, 82.4, 83.6, 83.7, 80.5, 80.0, 80.8, 79.4, 79.7, 77.8, 77.9, 79.8, 82.3, 78.9, 76.3, 75.4, 69.0, 63.3, 50.7, 41.1, 51.2, 30.4, 33.5, 57.8, 54.8, 28.3, 41.8, 42.4, 43.1, 25.5, 20.5, 16.5, 29.0, 34.5, 36.7, 41.4, 43.0, 40.6, 40.7, 41.5, 44.9, 24.9, 34.5, 33.8, 33.4, 30.6, 30.4, 45.5, 41.3, 42.1, 43.8, 47.1, 48.9, 53.4, 54.4, 57.3, 52.9, 53.7, 59.1, 65.2, 63.7, 63.5, 62.7, 67.7, 70.8];


// color values
const colors = {
  gasoline: '#AACFB5',
  diesel: '#2b70b4',
  brent: '#39C1D8'
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
  .text('But why the rise in prices?');

containerMessage
  .append('p')
  .html('Because of the <strong>price of oil</strong>.');

containerMessage
  .append('p')
  .text('The price of a barrel has almost tripled from 2016. This naturally influences the price at the pump.');

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 35,
  left: 40
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale describe a time scale
// from January 2009 to october 2018
const xScale = d3
  .scaleTime()
  .domain([new Date('2009, 1'), new Date('2018, 10')])
  .range([0, width]);

// for the vertical scale detail a linear scale going from 0 to 20% on top of the highest value
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(brentRise) * 1.2])
  .range([height, 0]);

// on the horizontal axis show year values, but only for the first and last tick
const yearFormat = d3.timeFormat('%Y');
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat(d => ((yearFormat(d) === '2009' || yearFormat(d) === '2018') ? yearFormat(d) : ''));

// for the vertical axis hide the axis itself, but show the ticks labels and grid lines
const yAxis = d3
  .axisLeft(yScale)
  .tickSize(0)
  .tickPadding(10)
  .ticks(4);

containerFrame
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text')
  .attr('transform', 'translate(-10, 10) rotate(-45)');

containerFrame
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis);

d3
  .select('.y.axis')
  .select('path')
  .attr('opacity', 0);

d3
  .select('.y.axis')
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${width}`)
  .attr('stroke', '#33333311')
  .attr('stroke-width', '2px');

// utility function: create a function taking an index as argument and returning a date instance starting from May 2017
const dateInstance = (i) => {
  const startingMonth = 1;
  const startingYear = 2009;


  // compute the year and the month cognizant of the fact that after 2017-12 comes 2018-1
  let currentMonth = startingMonth + i;
  let currentYear = startingYear;

  const monthGap = Math.floor(i / 12);

  // if the computed month is beyond 12 deduct 12 to the month value, to retrieve the correct month
  // add a 1 to the year value to retrieve the correct year
  if (monthGap >= 1) {
    currentMonth -= 12 * monthGap;
    currentYear += monthGap;
  }
  // return the date instance
  return new Date(`${currentYear}, ${currentMonth}`);
};

// line function
const line = d3
  .line()
  // the horizontal mark is based on a date object, passed in the horizontal scale with a varying month value
  // value computed on the basis of the index
  // i === 0 --> 2009-01; i === 1 --> 2009-02
  .x((d, i) => xScale(dateInstance(i)))
  // the vertical mark is purely based on the data point
  .y(d => yScale(d));

// add a line through the specified function and a path element
containerFrame
  .append('path')
  .attr('d', line(brentRise))
  .attr('stroke', colors.brent)
  .attr('stroke-width', '2px')
  .attr('fill', 'none');

// detail a function to format the dates
const timeFormat = d3.timeFormat('%b %Y');

// for each band add  a group, nesting circle elements on the exact data points and transparent rectangles for the tooltip
const containerGroups = containerFrame
  .selectAll('g.group')
  .data(brentRise)
  .enter()
  .append('g')
  .attr('class', 'group')
  // on hover detail in the tooltip information regarding the data points
  // additionally show the connected circle element
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .select('circle')
      .attr('r', 4);

    tooltip
      .append('p')
      .text(timeFormat(dateInstance(i)));

    tooltip
      .append('p')
      .attr('class', 'brent')
      .html(`Price of a barrel of brent: <strong>${d}$</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .select('circle')
      .attr('r', 0);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

containerGroups
  .append('circle')
  .attr('cx', (d, i) => xScale(dateInstance(i)))
  .attr('cy', d => yScale(d))
  // .attr('r', 4)
  .attr('r', 0)
  .attr('fill', colors.brent)
  .attr('stroke', `${colors.brent}55`)
  .attr('stroke-width', '12px');

containerGroups
  .append('rect')
  .attr('x', (d, i) => xScale(dateInstance(i)))
  .attr('width', (d, i) => xScale(dateInstance(i + 1) - xScale(dateInstance(i))))
  .attr('y', 0)
  .attr('height', height)
  .attr('fill', 'transparent');
