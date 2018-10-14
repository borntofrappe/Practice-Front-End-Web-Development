/* global d3 */
/** all eleemnts share
 * wrapping container
 * accent color
 * tooltip
 */

const container = d3
  .select('.container');

const colorAccent = '#FDA365';

const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');

/** script logic: for each visualization add
 * the data
 * a div element wrapping the viz
 * introductory HTML elements
 * scales and axes as needed
 * SVG elements depiting the data
 */


// LOLLIPOP PLOT
// display the number contributions according to day
// data
const dataContributions = [
  {
    name: 'monday',
    value: 30452
  },
  {
    name: 'tuesday',
    value: 27247
  },
  {
    name: 'wednesday',
    value: 23997
  },
  {
    name: 'thursday',
    value: 21218
  },
  {
    name: 'friday',
    value: 9976
  },
  {
    name: 'saturday',
    value: 11795
  },
  {
    name: 'sunday',
    value: 28248
  }
];

// wrapping element
const lollipopPlot = container
  .append('div')
  .attr('class', 'viz');

// HTML element(s)
lollipopPlot
  .append('h2')
  .attr('class', 'heading')
  .text('Most popular days to contribute');

// SVG G frame
const lollipopMargin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 75
};
const lollipopWidth = 500 - (lollipopMargin.left + lollipopMargin.right);
const lollipopHeight = 500 - (lollipopMargin.top + lollipopMargin.bottom);

const lollipopSVG = lollipopPlot
  .append('svg')
  .attr('viewBox', `0 0 ${lollipopWidth + (lollipopMargin.left + lollipopMargin.right)} ${lollipopHeight + (lollipopMargin.top + lollipopMargin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${lollipopMargin.left}, ${lollipopMargin.top})`);

// SCALES & AXES
// ! first update the data, to have the days sorted from highest to lowest value
const lollipopData = dataContributions.sort((a, b) => a.value > b.value);

// the horizontal scale is used to detail the days' values
const xScaleLollipop = d3
  .scaleLinear()
  // domain spanning from 0 up to the greatest value, incremented by 10%
  .domain([0, d3.max(lollipopData, d => d.value) * 1.1])
  .range([0, lollipopWidth]);

// the vertical scale is used to detail the days' names
const yScaleLollipop = d3
  .scaleBand()
  // domain encompassing each category
  // add an array which includes all the days' names
  .domain(lollipopData.map(day => day.name))
  .range([lollipopHeight, 0]);

// format the tick labels as to include a comma to separate the thousand mark
const format = d3.format(',');

// add axes
const xAxisLollipop = d3
  .axisBottom(xScaleLollipop)
  .tickSizeOuter(0)
  // display the formatted values, but hide the first tick
  .tickFormat(d => (d !== 0 ? format(d) : ''));

const yAxisLollipop = d3
  .axisLeft(yScaleLollipop)
  // remove ticks for the vertical axis
  .tickSize(0)
  .tickPadding(10);

lollipopSVG
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${lollipopHeight})`)
  .call(xAxisLollipop);

lollipopSVG
  .append('g')
  .attr('class', 'axis')
  .call(yAxisLollipop);

// SVG elements
// for each data point add a group element
// in said group element add a line and a circle at the very end of it
// add also a rectangle to prop the tooltip as the cursor hovers on the general area
// add also a group element used to draw a simle icon
const lollipopGroup = lollipopSVG
  // ! target group elements with a specific class as to avoid selecting the axes' group elements
  .selectAll('g.group')
  .data(lollipopData)
  .enter()
  .append('g')
  .attr('class', 'group')
  .attr('opacity', 0.8)
  // on hover show the tooltip with the pertinent information
  // mouse events are heard whenever hovering occurs on an element nested in the group
  .on('mouseenter', function (d) {
    /* on hover
    - make the group fully transparent
    - add in the tooltip paragraph elements describing the relevant information
    - show the tooltip where the event is registered
    */
    d3
      .select(this)
      .transition()
      .attr('opacity', 1);

    const { name, value } = d;

    tooltip
      .append('p')
      .text(name);
    tooltip
      .append('p')
      .text(format(value));

    tooltip
      .transition()
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`)
      .style('opacity', 1);
  })
  // when leaving the group, hide the tooltip and remove nested paragraph elements
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .attr('opacity', 0.8);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// add the line through a line or path element
lollipopGroup
  .append('line')
  .attr('x1', xScaleLollipop(0))
  .attr('x2', xScaleLollipop(0))
  .attr('y1', d => yScaleLollipop(d.name) + yScaleLollipop.bandwidth() / 2)
  .attr('y2', d => yScaleLollipop(d.name) + yScaleLollipop.bandwidth() / 2)
  .attr('class', 'line')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px')
  // animate the line to be drawn from the left side of the chart
  .transition()
  .duration(300)
  .delay((d, i) => 100 + i * 100)
  .attr('x2', d => xScaleLollipop(d.value));

// add a circle positioned exactly on the right-edge of the line
lollipopGroup
  .append('circle')
  .attr('cx', xScaleLollipop(0))
  .attr('cy', d => yScaleLollipop(d.name) + yScaleLollipop.bandwidth() / 2)
  .attr('r', 0)
  .attr('class', 'circle')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px')
  .attr('fill', '#fff')
  // animate the circle alongside the connected line
  .transition()
  .duration(300)
  .delay((d, i) => 100 + i * 100)
  .attr('cx', d => xScaleLollipop(d.value))
  .attr('r', 15);

// ! for the tooltip add a transparent rectangle
// this to prop the tooltip whever the cursor hovers anywhere on the chart (horizontally)
lollipopGroup
  .append('rect')
  .attr('x', xScaleLollipop(0))
  .attr('y', d => yScaleLollipop(d.name))
  .attr('width', lollipopWidth)
  .attr('height', yScaleLollipop.bandwidth())
  .attr('fill', 'transparent');

// add an SVG icon depicting a pull request, starting from a group element
const pullRequest = lollipopGroup
  .append('g');

// animate the group element to position itself exactly where the circle elements end up
pullRequest
  .attr('transform', d => `translate(0, ${yScaleLollipop(d.name) + yScaleLollipop.bandwidth() / 2})`)
  .attr('opacity', 0)
  .transition()
  .duration(300)
  .delay((d, i) => 100 + i * 100)
  .attr('opacity', 1)
  .attr('transform', d => `translate(${xScaleLollipop(d.value)}, ${yScaleLollipop(d.name) + yScaleLollipop.bandwidth() / 2})`);


// add a line connected to two circle elements
pullRequest
  .append('path')
  .attr('d', 'm -5 -6 v 12')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px');

pullRequest
  .append('circle')
  .attr('cx', -5)
  .attr('cy', 6)
  .attr('r', 2)
  .attr('fill', '#fff')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px');

pullRequest
  .append('circle')
  .attr('cx', -5)
  .attr('cy', -6)
  .attr('r', 2)
  .attr('fill', '#fff')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px');

// add a line connected on one side to a circle element, but otherwise ending with an arrow
pullRequest
  .append('path')
  .attr('d', 'm 5 6 v -8 a 4 4 0 0 0 -3 -4 v 2.5 l -2 -3 l 2 -2.5 v 2.5')
  .attr('stroke', colorAccent)
  .attr('fill', 'none')
  .attr('stroke-width', '2px');

pullRequest
  .append('circle')
  .attr('cx', 5)
  .attr('cy', 6)
  .attr('r', 2)
  .attr('fill', '#fff')
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px');


// AREA CHART

// data
// no need to detail the date, computed for each value on the base of its index
const dataRequests = [
  2782,
  17302,
  19127,
  16485,
  13359,
  12092,
  9799,
  9013,
  10946,
  11325,
  10762,
  10638,
  9126
];

// wrapping element
const areaChart = container
  .append('div')
  .attr('class', 'viz');

// HTML element(s)
areaChart
  .append('h2')
  .text('Pull requests opened');

// SVG G frame
const areaChartMargin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 40
};
const areaChartWidth = 500 - (areaChartMargin.left + areaChartMargin.right);
const areaChartHeight = 500 - (areaChartMargin.top + areaChartMargin.bottom);

const areaChartSVG = areaChart
  .append('svg')
  .attr('viewBox', `0 0 ${areaChartWidth + (areaChartMargin.left + areaChartMargin.right)} ${areaChartHeight + (areaChartMargin.top + areaChartMargin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${areaChartMargin.left}, ${areaChartMargin.top})`);

// SCALES && AXES
// the horizontal scale is set to display the dates
const xScaleArea = d3
  .scaleLinear()
  // map each seccessive observation to a fraction of the width
  .domain([0, dataRequests.length - 1])
  .range([0, areaChartWidth]);

// the vertical scale is based on the actual values
const yScaleArea = d3
  .scaleLinear()
  // increment the top value by 10%
  .domain([0, d3.max(dataRequests) * 1.1])
  .range([areaChartHeight, 0]);

// add axes
const xAxisArea = d3
  .axisBottom(xScaleArea)
  .tickSizeOuter(0)
  // for the x axis show dates starting from the 30th of september
  .tickFormat((d) => {
    const date = new Date('2018-09-30');
    date.setDate(date.getDate() + d);
    return `${date.getDate()}-${date.getMonth() + 1}`;
  });

// the formatting function is here used on the y axis
const yAxisArea = d3
  .axisLeft(yScaleArea)
  .tickSize(0)
  .tickPadding(5)
  .tickFormat(d => (d !== 0 ? format(d) : ''))
  .ticks(5);

areaChartSVG
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${areaChartHeight})`)
  .call(xAxisArea);

areaChartSVG
  .append('g')
  .attr('class', 'axis')
  .call(yAxisArea);

// SVG elements
// detail the line function used to detail the edge of the area chart
const line = d3
  .line()
  .x((d, i) => xScaleArea(i))
  .y(d => yScaleArea(d))
  .curve(d3.curveCatmullRom);

// detail the area function making up the area chart
const area = d3
  .area()
  .x((d, i) => xScaleArea(i))
  .y0(yScaleArea(0))
  .y1(d => yScaleArea(d))
  .curve(d3.curveCatmullRom);

// for the line, append a path using the line function in the d attribute
areaChartSVG
  .append('path')
  .attr('d', line(dataRequests))
  .attr('stroke', colorAccent)
  .attr('stroke-width', '2px')
  .attr('fill', 'none');

// for the area, append a path using the area function in the d attribute
areaChartSVG
  .append('path')
  .attr('d', area(dataRequests))
  .attr('fill', colorAccent)
  .attr('opacity', 0.2);

// append a group element for each observation
// this to gather together the circle elements and the transparent rectangles
// this as to show the pertinent information on hover
const areaGroup = areaChartSVG
  .selectAll('g.group')
  .data(dataRequests)
  .enter()
  .append('g')
  .attr('class', 'group')
  // on hover show the tooltip with the pertinent information
  // mouse events are heard whenever hovering occurs on an element nested in the group
  .on('mouseenter', function (d, i) {
    /* on hover
    - add in the tooltip paragraph elements describing the relevant information
    - show the tooltip where the event is registered
    - increase the radius of the circle elements
    - reduce the opacity of the rectangle elements, highlighting the space underneath
    */
    d3
      .select(this)
      .select('circle')
      .transition()
      .attr('r', 10);

    d3
      .select(this)
      .select('rect')
      .transition()
      .attr('opacity', 0);

    // retrieve the date, this time based on the index value
    const date = new Date('2018-09-30');
    date.setDate(date.getDate() + i);

    tooltip
      .append('p')
      .text(date.toDateString());

    tooltip
      .append('p')
      .text(format(d));

    tooltip
      .transition()
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`)
      .style('opacity', 1);
  })
  // when leaving the group, hide the tooltip and remove nested paragraph elements
  .on('mouseout', function () {
    d3
      .select(this)
      .select('circle')
      .transition()
      .attr('r', 5);

    d3
      .select(this)
      .select('rect')
      .transition()
      .attr('opacity', 0.7);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });


// add a transparent rectangle to show relevant information anywhere on the chart (vertically)
// each rectangle is centered around the respective circle element
areaGroup
  .append('rect')
  .attr('x', (d, i) => {
    // the first rectangle starts from the origin
    if (i === 0) {
      return xScaleArea(0);
    }
    // other rectangle elements start halfway back from the position of the tick
    return (xScaleArea(i) - xScaleArea(i - 1)) * i - xScaleArea(1) / 2;
  })
  .attr('y', 0)
  .attr('width', (d, i) => {
    // stretch the rectangle elements to cover the space from one tick to the other
    // for the first and last element, cut the width in half to prevent overflow
    if (i === 0 || i === (dataRequests.length - 1)) {
      return (xScaleArea(i) - xScaleArea(i - 1)) / 2;
    }
    return xScaleArea(i) - xScaleArea(i - 1);
  })
  .attr('height', areaChartHeight)
  // ! make the rectangle slightly transparent, as to reduce their opacity on hover
  .attr('fill', '#fff')
  .attr('opacity', 0.7);


// add a circle for each observation
areaGroup
  .append('circle')
  .attr('cx', (d, i) => xScaleArea(i))
  .attr('cy', d => yScaleArea(d))
  .attr('r', 5)
  .attr('fill', colorAccent);
