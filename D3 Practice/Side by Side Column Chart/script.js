/* globals d3 */
/*
create a stacked column chart using priceRise
detailing the  rise in price and the portion due to taxes
*/

// time range: yearly from 2013 to 2022
const taxesRise = [
  {
    diesel: 0.43,
    gasoline: 0.61
  },
  {
    diesel: 0.43,
    gasoline: 0.61
  },
  {
    diesel: 0.47,
    gasoline: 0.62
  },
  {
    diesel: 0.50,
    gasoline: 0.64
  },
  {
    diesel: 0.53,
    gasoline: 0.65
  },
  {
    diesel: 0.59,
    gasoline: 0.68
  },
  {
    diesel: 0.65,
    gasoline: 0.71
  },
  {
    diesel: 0.70,
    gasoline: 0.73
  },
  {
    diesel: 0.75,
    gasoline: 0.75
  },
  {
    diesel: 0.78,
    gasoline: 0.78
  }
];

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
  .text('But why has the govermnent introduced these taxes?');

containerMessage
  .append('p')
  .html('At first to <strong>suppress the fiscal advantage toward diesel</strong>.');

containerMessage
  .append('p')
  .text('In 2013, it was less taxed than gasoline (-20 cents/l). In 2021, it is scheduled to be taxed equally.');

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 35,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale a band scale, tp plot the ten groups of columns
const xScale = d3
  .scaleBand()
  .domain(d3.range(10))
  .range([0, width]);

// for the vertical scale detail a linear scale going from 0 to the maximum value found in the last array item
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(taxesRise, d => d.gasoline)])
  .range([0, height]);
// on the horizontal axis show only the first and last ticks
const formatYear = d3.timeFormat('%Y');

const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat((d, i) => {
    if (i === 0 || i === taxesRise.length - 1) {
      const year = 2013 + i;

      const date = new Date(`${year}, 1, 1`);
      return formatYear(date);
    }

    return '';
  });

// select the two tick labels and rotate them -45deg
containerFrame
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text')
  .attr('transform', 'translate(-10, 10) rotate(-45)')
  .attr('font-size', '0.8rem')
  .attr('font-weight', 'bold')
  .attr('fill', '#999');

// append one group for each set of value
// in this group later include two columns, for the taxation on gasoline and diesel respectively
const containerGroups = containerFrame
  .selectAll('g.group')
  .data(taxesRise)
  .enter()
  .append('g')
  .attr('class', 'group')
  .attr('transform', (d, i) => `translate(${xScale(i)}, 0)`)
  // on hover detail the information for the respective rectangles
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .select('rect.tool')
      .attr('opacity', 0.3);

    const year = 2013 + i;
    const { diesel, gasoline } = d;
    tooltip
      .append('p')
      .append('strong')
      .text(year);

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Taxes on gasoline: <strong>${gasoline} €/L</strong>`);

    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Taxes on diesel: <strong>${diesel} €/L</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .select('rect.tool')
      .attr('opacity', 0);
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// add two columns, one for each set of data
containerGroups
  .append('rect')
  .attr('class', 'gasoline')
  .attr('x', xScale.bandwidth() / 4)
  .attr('y', d => height - yScale(d.gasoline))
  .attr('width', xScale.bandwidth() / 4)
  .attr('height', d => yScale(d.gasoline))
  .attr('fill', colors.gasoline);

containerGroups
  .append('rect')
  .attr('class', 'diesel')
  .attr('x', xScale.bandwidth() / 2)
  .attr('y', d => height - yScale(d.diesel))
  .attr('width', xScale.bandwidth() / 4)
  .attr('height', d => yScale(d.diesel))
  .attr('fill', colors.diesel);

// add also a transparent rectangle occupying each band, as to show pertinent information for each rectangle
containerGroups
  .append('rect')
  .attr('class', 'tool')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', xScale.bandwidth())
  .attr('height', height)
  .attr('fill', '#fff')
  .attr('opacity', 0);
