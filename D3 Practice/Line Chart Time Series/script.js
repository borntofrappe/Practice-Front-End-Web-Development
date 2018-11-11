/* globals d3 */
/*
create a line chart using
, detailing the price of diesel and gasoline from may 2017 to october 2018, with a monthly cadence
*/

const priceCarburant = [
  {
    diesel: 1.21,
    gasoline: 1.37
  },
  {
    diesel: 1.18,
    gasoline: 1.34
  },
  {
    diesel: 1.17,
    gasoline: 1.32
  },
  {
    diesel: 1.2,
    gasoline: 1.34
  },
  {
    diesel: 1.22,
    gasoline: 1.37
  },
  {
    diesel: 1.24,
    gasoline: 1.36
  },
  {
    diesel: 1.27,
    gasoline: 1.40
  },
  {
    diesel: 1.28,
    gasoline: 1.40
  },
  {
    diesel: 1.4,
    gasoline: 1.47
  },
  {
    diesel: 1.38,
    gasoline: 1.47
  },
  {
    diesel: 1.37,
    gasoline: 1.46
  },
  {
    diesel: 1.4,
    gasoline: 1.49
  },
  {
    diesel: 1.45,
    gasoline: 1.53
  },
  {
    diesel: 1.46,
    gasoline: 1.55
  },
  {
    diesel: 1.45,
    gasoline: 1.53
  },
  {
    diesel: 1.45,
    gasoline: 1.55
  },
  {
    diesel: 1.48,
    gasoline: 1.56
  },
  {
    diesel: 1.52,
    gasoline: 1.56
  }
];

//
const colors = {
  diesel: '#2b70b4',
  gasoline: '#AACFB5'
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
  .text('Has the price of carburant really risen?');

containerMessage
  .append('p')
  .text('Yes');

container
  .append('p')
  .text('From the beginning of the five year mandate:');

const containerList = container
  .append('div')
  .attr('class', 'detail')
  .append('ul');

containerList
  .append('li')
  .html('Diesel: <strong>+ 31 cents</strong>');

containerList
  .append('li')
  .html('Gasoline: <strong>+ 19 cents</strong>');

// SVG FRAME
const margin = {
  top: 20,
  right: 40,
  bottom: 25,
  left: 60
};
const width = 600 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale detail a time scale ranging from may 2017 to october 2018
const xScale = d3
  .scaleTime()
  // month is here an integer between 1 and 12
  .domain([new Date('2017, 5'), new Date('2018, 10')])
  .range([0, width]);

// for the vertical scale detail a linear scale going from 0 to 2 (euros per liter)
const yScale = d3
  .scaleLinear()
  .domain([0, 2])
  .range([height, 0]);

// detail a function to format the dates
const timeFormat = d3.timeFormat('%b %Y');

// on the horizontal axis show only the first and last elements
// with the specified format
const xAxis = d3
  .axisBottom(xScale)
  .tickFormat((d, i) => ((i === 0 || i === priceCarburant.length - 1) ? timeFormat(d) : ''));

// on the vertical axes show a limited number of ticks
// formatted with the unit of measure
const yAxis = d3
  .axisLeft(yScale)
  .ticks(4)
  .tickSize(0)
  .tickPadding(5)
  .tickFormat(d => (d !== 0 ? `${d} €/L` : ''));

containerFrame
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

// when adding the vertical axis add grid lines spanning the entirety of the width
containerFrame
  .append('g')
  .attr('class', 'axis')
  .call(yAxis)
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${width}`)
  .attr('stroke', '#333')
  .attr('stroke-width', '2px')
  .attr('opacity', 0.1);

// increase the size of the ticks labels
d3
  .selectAll('.axis')
  .selectAll('text')
  .attr('fill', '#777')
  .attr('font-size', '0.9rem')
  .attr('font-family', 'inherit');

// utility function: create a function taking an index as argument and returning a date instance starting from May 2017
const dateInstance = (i) => {
  const startingMonth = 5;
  const startingYear = 2017;

  // compute the year and the month cognizant of the fact that after 2017-12 comes 2018-1
  let currentMonth = startingMonth + i;
  let currentYear = startingYear;
  // if the computed month is beyond 12 deduct 12 to the month value, to retrieve the correct month
  // add a 1 to the year value to retrieve the correct year
  if (currentMonth > 12) {
    currentMonth -= 12;
    currentYear += 1;
  }
  // return the date instance
  return new Date(`${currentYear}, ${currentMonth}`);
};

// line function
const line = d3
  .line()
  // the horizontal mark is based on a date object, passed in the horizontal scale with a varying month value
  // value computed on the basis of the index
  // i === 0 --> 2017-05; i === 1 --> 2017-06
  .x((d, i) => xScale(dateInstance(i)))
  // the vertical mark is purely based on the data point
  .y(d => yScale(d))
  .curve(d3.curveStepAfter);

// add two lines through path elements and the line function
// each time passing an array with the actual price values
containerFrame
  .append('path')
  .attr('class', 'priceDiesel')
  .attr('stroke', colors.diesel)
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  .attr('d', line(priceCarburant.map(price => price.diesel)));

containerFrame
  .append('path')
  .attr('class', 'priceGasoline')
  .attr('stroke', colors.gasoline)
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  .attr('d', line(priceCarburant.map(price => price.gasoline)));

// for the tooltip, detail a group element for each data point
// add a circle element on top of the lines and rectangles spanning the entire width
// when hovering on the rectangles show the circle elements and the tooltip
const containerGroups = containerFrame
  .selectAll('g.point')
  .data(priceCarburant)
  .enter()
  .append('g')
  .attr('class', 'point')
  // on mouseenter detail the information connected to the highlighted group (by proxy called when hovering on the group children)
  // select also the connected circle element to highlight it (change radius)
  .on('mouseenter', function (d, i) {
    const { diesel, gasoline } = priceCarburant[i];
    const date = dateInstance(i);

    tooltip
      .append('p')
      .text(timeFormat(date));

    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Diesel: <strong>${diesel} €/L</strong>`);

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Gasoline: <strong>${gasoline} €/L</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);

    d3
      .select(this)
      .selectAll('circle')
      .attr('r', '5px');
  })
  .on('mouseout', function () {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();

    d3
      .select(this)
      .selectAll('circle')
      .attr('r', 0);
  });

// // it is possible to add a clip path on the group element as to avoid rectangle/circle elements from exceeding the contours of the visualization
// containerFrame
//   .append('clipPath')
//   .attr('id', 'clip')
//   .append('rect')
//   .attr('x', 0)
//   .attr('y', 0)
//   .attr('width', width)
//   .attr('height', height);

// containerGroups
//   .attr('clip-path', 'url(#clip)');

containerGroups
  .append('circle')
  .attr('class', 'diesel')
  // compute the horizontal coordinat3es just like previously done for the line function
  .attr('cx', (d, i) => xScale(dateInstance(i)))
  .attr('cy', d => yScale(d.diesel))
  // ultimately with the radius 4, but only when hovering on the respective group element
  // .attr('r', '4')
  .attr('stroke', `${colors.diesel}55`)
  .attr('stroke-width', '15px')
  .attr('fill', colors.diesel)
  .attr('r', '0');

containerGroups
  .append('circle')
  .attr('class', 'gasoline')
  .attr('cx', (d, i) => xScale(dateInstance(i)))
  .attr('cy', d => yScale(d.gasoline))
  // .attr('r', '4')
  .attr('stroke', `${colors.gasoline}55`)
  .attr('stroke-width', '15px')
  .attr('fill', colors.gasoline)
  .attr('r', '0');

// for each group element add also a rectangle, as to allow the mouseenter event whenever the cursor hovers on the viz horizontally
containerGroups
  .append('rect')
  .attr('y', 0)
  .attr('height', height)
  // centered in the horizontal coordinate of each point
  .attr('x', (d, i) => xScale(dateInstance(i)) - (xScale(dateInstance(1)) / 2))
  // occupying the space between the point and the following value
  .attr('width', (d, i) => xScale(dateInstance(i + 1)) - xScale(dateInstance(i)))
  .attr('fill', 'transparent');
