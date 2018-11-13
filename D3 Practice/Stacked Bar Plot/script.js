/* globals d3 */
/*
create a bar plot describing the price of gasoline in a selection of countries
*/

const countriesGasoline = [
  {
    country: 'Bulgary',
    taxes: 0.55,
    other: 0.51
  },
  {
    country: 'Poland',
    taxes: 0.60,
    other: 0.49
  },
  {
    country: 'Romania',
    taxes: 0.60,
    other: 0.51
  },
  {
    country: 'Luxembourg',
    taxes: 0.64,
    other: 0.51
  },
  {
    country: 'Hungary',
    taxes: 0.65,
    other: 0.51
  },
  {
    country: 'Lithuania',
    taxes: 0.64,
    other: 0.52
  },
  {
    country: 'Austria',
    taxes: 0.69,
    other: 0.48
  },
  {
    country: 'Czech Republic',
    taxes: 0.72,
    other: 0.49
  },
  {
    country: 'Cyprus',
    taxes: 0.69,
    other: 0.53
  },
  {
    country: 'Spain',
    taxes: 0.68,
    other: 0.56
  },
  {
    country: 'Latvia',
    taxes: 0.74,
    other: 0.50
  },
  {
    country: 'Slovenia',
    taxes: 0.81,
    other: 0.50
  },
  {
    country: 'Malta',
    taxes: 0.75,
    other: 0.57
  },
  {
    country: 'Germany',
    taxes: 0.88,
    other: 0.47
  },
  {
    country: 'United Kingdom',
    taxes: 0.89,
    other: 0.47
  },
  {
    country: 'Ireland',
    taxes: 0.88,
    other: 0.51
  },
  {
    country: 'Sweden',
    taxes: 0.92,
    other: 0.51
  },
  {
    country: 'Finland',
    taxes: 0.95,
    other: 0.49
  },
  {
    country: 'France',
    taxes: 0.94,
    other: 0.52
  },
  {
    country: 'Portugal',
    taxes: 0.94,
    other: 0.53
  },
  {
    country: 'Denmark',
    taxes: 0.92,
    other: 0.57
  },
  {
    country: 'Greece',
    taxes: 1.01,
    other: 0.52
  },
  {
    country: 'Netherlands',
    taxes: 1.06,
    other: 0.49
  },
  {
    country: 'Italy',
    taxes: 1.01,
    other: 0.55
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
  .text('And others in Europe?');

// the margin convention is perhaps overkill for the following visualizations
// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};
const width = 200 - (margin.left + margin.right);
const height = 300 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale describe a linear scale from 0 to 2 (euro per liter)
const xScale = d3
  .scaleLinear()
  .domain([0, 2])
  .range([0, width]);

// for the vertical scale, a band scale based on an array of countries
const yScale = d3
  .scaleBand()
  .domain(countriesGasoline.map(countries => countries.country))
  .range([0, height]);

const format = d3.format(',');
// for the horizontal dimension add an axis above the visualization
const xAxis = d3
  .axisTop(xScale)
  .ticks(2)
  .tickSize(0)
  .tickFormat(d => `${d} €`);

containerFrame
  .append('g')
  .attr('class', 'x axis')
  .call(xAxis);

d3
  .select('.x.axis')
  .select('path')
  .attr('opacity', 0);

// for the vertical dimension add labels for each country
const yAxis = d3
  .axisLeft(yScale)
  .tickSizeOuter(0)
  .tickSize(0)
  .tickPadding(5);

containerFrame
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis);

// one one group for each data point
const containerGroups = containerFrame
  .selectAll('g.group')
  .data(countriesGasoline)
  .enter()
  .append('g')
  .attr('class', 'group')
  .attr('transform', (d, i) => `translate(0, ${yScale(d.country)})`)
  // on hover detail pertinent information in the tooltip
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .attr('opacity', 0.7);

    tooltip
      .append('p')
      .append('strong')
      .text(d.country);

    tooltip
      .append('p')
      .html(`<strong>Total price of a liter of gasoline</strong>: ${format(d.taxes + d.other)}€`);

    tooltip
      .append('p')
      .html(`<strong>Taxes</strong>: ${d.taxes}€`);

    tooltip
      .append('p')
      .html(`<strong>Others</strong>: ${d.other}€`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function (d) {
    d3
      .select(this)
      .attr('opacity', 1);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// for each group add a rectangle based on the described values
containerGroups
  .append('rect')
  .attr('x', 0)
  .attr('y', yScale.bandwidth() / 4)
  .attr('width', d => xScale(d.taxes))
  .attr('height', yScale.bandwidth() / 2)
  .attr('fill', d => d.country === 'France' ? colors.diesel : colors.gasoline);

containerGroups
  .append('rect')
  .attr('x', d => xScale(d.taxes))
  .attr('y', yScale.bandwidth() / 4)
  .attr('width', d => xScale(d.other))
  .attr('height', yScale.bandwidth() / 2)
  .attr('fill', d => d.country === 'France' ? `${colors.diesel}55` : `${colors.gasoline}55`);

// it might be beneficial to also include a rectangle spanning the entire width and height of the band
containerGroups
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', d => xScale(2))
  .attr('height', yScale.bandwidth())
  .attr('fill', 'transparent');
