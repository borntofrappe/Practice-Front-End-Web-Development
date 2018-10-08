/* include share elements
- color scale
- source url
- data
*/
const colorScale = d3
  .scaleOrdinal(d3.schemeCategory10);

const url = 'http://www.statistiques.developpement-durable.gouv.fr/transports/r/immatriculations';

const data = [
  {
    year: 2003,
    lpg: 3863,
    electric: 113,
    hybrid: 32,
    gasoline: 651324,
    diesel: 1353914
  },
  {
    year: 2004,
    lpg: 2875,
    electric: 460,
    hybrid: 669,
    gasoline: 616780,
    diesel: 1392925
  },
  {
    year: 2005,
    lpg: 4014,
    electric: 6,
    hybrid: 1855,
    gasoline: 631877,
    diesel: 1429037
  },
  {
    year: 2006,
    lpg: 4594,
    electric: 14,
    hybrid: 6413,
    gasoline: 561831,
    diesel: 1427697
  },
  {
    year: 2007,
    lpg: 6233,
    electric: 6,
    hybrid: 7159,
    gasoline: 525706,
    diesel: 1525439
  },
  {
    year: 2008,
    lpg: 5888,
    electric: 4,
    hybrid: 8446,
    gasoline: 451507,
    diesel: 1584438
  },
  {
    year: 2009,
    lpg: 28476,
    electric: 12,
    hybrid: 9869,
    gasoline: 632822,
    diesel: 1597832
  },
  {
    year: 2010,
    lpg: 80784,
    electric: 187,
    hybrid: 9663,
    gasoline: 563199,
    diesel: 1556353
  },
  {
    year: 2011,
    lpg: 18634,
    electric: 2630,
    hybrid: 13635,
    gasoline: 568626,
    diesel: 1557403
  },
  {
    year: 2012,
    lpg: 9518,
    electric: 5661,
    hybrid: 27827,
    gasoline: 468953,
    diesel: 1345054
  },
  {
    year: 2013,
    lpg: 3194,
    electric: 8781,
    hybrid: 46730,
    gasoline: 530054,
    diesel: 1168193
  },
  {
    year: 2014,
    lpg: 2634,
    electric: 10567,
    hybrid: 43178,
    gasoline: 589522,
    diesel: 1119954
  },
  {
    year: 2015,
    lpg: 1912,
    electric: 17269,
    hybrid: 60497,
    gasoline: 736108,
    diesel: 1070443
  },
  {
    year: 2016,
    lpg: 1480,
    electric: 21751,
    hybrid: 58384,
    gasoline: 883136,
    diesel: 1050413
  },
  {
    year: 2017,
    lpg: 2051,
    electric: 24910,
    hybrid: 81559,
    gasoline: 978184,
    diesel: 992920
  }
];

// STACKED AREA CHART
// target the container in which to plot the visualization
const containerStacked = d3.select('.viz--stacked');

// add introductory elements
containerStacked
  .append('h3')
  .attr('class', 'title')
  .text('Stacked area chart');

containerStacked
  .append('p')
  .attr('class', 'description')
  .text('Cars immatriculated in France, since 2003 and according to energy source.');


// SVG G frame
const margin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 30
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const svgStacked = containerStacked
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES
// the horizontal dimension is based on the year value
const xScaleStacked = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([0, width]);

const xAxisStacked = d3
  .axisBottom(xScaleStacked)
  .ticks(5)
  .tickFormat(d3.format('d'));

svgStacked
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxisStacked);

// the vertical dimension is based on the values of the data points
// first, and for every data point, compute the total for each observation
const dataTotal = data.map((observation) => {
  // consider the values of each object
  const values = Object.values(observation);
  // minus the first element (describing the year)
  values.shift();
  // return the total
  return values.reduce((a, b) => a + b);
});

// base the y dimension on the array of totals
const yScaleStacked = d3
  .scaleLinear()
  .domain([0, d3.max(dataTotal)])
  .range([height, 0]);

const yAxisStacked = d3
  .axisLeft(yScaleStacked)
  .ticks(5)
  .tickSize(0)
  .tickPadding(10);

const yAxisGroup = svgStacked
  .append('g')
  .attr('class', 'axis')
  .call(yAxisStacked);

// include grid lines for each tick
yAxisGroup
  .selectAll('g')
  .append('line')
  .attr('x0', 0)
  .attr('y0', 0)
  .attr('x1', width)
  .attr('y1', 0)
  .attr('stroke-width', '0.5px');
// detail the ticks labels verticallly
yAxisGroup
  .selectAll('text')
  .style('writing-mode', 'vertical-rl')
  .style('text-anchor', 'middle');


// format the data through the layout .stack() function
// targeting all fields except the first
const stack = d3
  .stack()
  .keys(Object.keys(data[0]).slice(1));

const dataStack = stack(data);

// dataStack is an array of arrays
// each array nests one array for eahc observation (15 in this instance)
// each nested array then details two integers, for the starting and ending point
// it also details the key value in a field bearing the same name
// console.log(dataStack);

// line function
const line = d3
  .line()
  .x((d, i) => xScaleStacked(data[i].year))
  .y(d => yScaleStacked(d[1]));

// area function
const area = d3
  .area()
  .x((d, i) => xScaleStacked(data[i].year))
  .y0(d => yScaleStacked(d[0]))
  .y1(d => yScaleStacked(d[1]));

// add first a grouping element, for each array
// this to literally group the elements inside a common container
const groupStack = svgStacked
  .selectAll('g.stacked')
  .data(dataStack)
  .enter()
  .append('g')
  .attr('class', 'stacked');

// add a line for each set of bound data
groupStack
  .append('path')
  .attr('class', 'line')
  .attr('d', d => line(d))
  .attr('fill', 'none')
  .attr('stroke', (d, i) => colorScale(i))
  .attr('stroke-width', '2px');

// add an area for each set of bound data
groupStack
  .append('path')
  .attr('class', 'area')
  .attr('d', d => area(d))
  .attr('fill', (d, i) => colorScale(i))
  .attr('stroke', 'none');

// add a text label to create a legend
groupStack
  .append('text')
  .attr('class', 'label')
  .attr('x', (d, i) => (width / dataStack.length * i) + margin.left)
  .attr('y', height + margin.bottom * 0.95)
  .attr('fill', (d, i) => colorScale(i))
  .attr('stroke', 'none')
  .attr('text-anchor', 'middle')
  .style('font-weight', 'bold')
  .style('text-transform', 'uppercase')
  .text(d => d.key);

// add the source following the visualization elements
containerStacked
  .append('a')
  .attr('href', url)
  .attr('class', 'source')
  .text('Source');


// SEPARATE AREA CHARTS
// select the container wrapping the visualization
// include one container for each variable
const container = d3.select('.container__viz');
for (let i = 0; i < Object.keys(data[0]).slice(1).length; i += 1) {
  // retrieve the data connected to the single variables
  // array of objects with two fields: the year and the separate value
  const dataSeparate = data.map(observation => ({
    year: observation.year,
    value: observation[Object.keys(data[0]).slice(1)[i]]
  }));

  // add a container
  const containerSeparate = container
    .append('div')
    .attr('class', 'viz');

  // add introductory elements
  containerSeparate
    .append('h3')
    .attr('class', 'title')
    .text('Separate area chart');

  containerSeparate
    .append('p')
    .attr('class', 'description')
    .text('Cars immatriculated in France, since 2003 and ')
    .append('span')
    .text(Object.keys(data[0]).slice(1)[i])
    .style('color', colorScale(i))
    .style('font-weight', 'bold')
    .style('text-transform', 'uppercase');

  // SVG G frame
  const svgSeparate = containerSeparate
    .append('svg')
    .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Vertical scale fitted for the new values
  const yScaleSeparate = d3
    .scaleLinear()
    .domain([0, d3.max(dataSeparate, d => d.value) * 1.2])
    .range([height, 0]);

  const yAxisSeparate = d3
    .axisLeft(yScaleSeparate)
    .ticks(5)
    .tickSize(0)
    .tickPadding(10);

  const yAxisGroupSeparate = svgSeparate
    .append('g')
    .attr('class', 'axis')
    .call(yAxisSeparate);

  // include grid lines for each tick
  yAxisGroupSeparate
    .selectAll('g')
    .append('line')
    .attr('x0', 0)
    .attr('y0', 0)
    .attr('x1', width)
    .attr('y1', 0)
    .attr('stroke-width', '0.5px');
  // detail the ticks labels verticallly
  yAxisGroupSeparate
    .selectAll('text')
    .style('writing-mode', 'vertical-rl')
    .style('text-anchor', 'middle');


  // horizontal axis equal to the stacked counterpart
  svgSeparate
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisStacked);

  // add a group in which to nest the line and area elements
  const groupSeparate = svgSeparate
    .append('g')
    .attr('class', 'separate');


  // line function
  const lineSeparate = d3
    .line()
    .x(d => xScaleStacked(d.year))
    .y(d => yScaleSeparate(d.value));

  // area function
  const areaSeparate = d3
    .area()
    .x((d, i) => xScaleStacked(d.year))
    .y0(yScaleSeparate(0))
    .y1(d => yScaleSeparate(d.value));

  console.log(dataSeparate);
  groupSeparate
    .append('path')
    .attr('class', 'line')
    .attr('d', lineSeparate(dataSeparate))
    .attr('fill', 'none')
    .attr('stroke', colorScale(i))
    .attr('stroke-width', '2px');

  // add an area for each set of bound data
  groupSeparate
    .append('path')
    .attr('class', 'area')
    .attr('d', areaSeparate(dataSeparate))
    .attr('fill', colorScale(i))
    .attr('stroke', 'none');


  containerSeparate
    .append('a')
    .attr('href', url)
    .attr('class', 'source')
    .text('Source');
}
