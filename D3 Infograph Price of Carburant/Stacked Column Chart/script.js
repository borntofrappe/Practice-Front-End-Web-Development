/* globals d3 */
/*
create a stacked column chart using priceRise
detailing the  rise in price and the portion due to taxes
*/

const priceRise = [
  {
    type: 'gasoline',
    rise: 19,
    taxes: 34,
    others: 66
  },
  {
    type: 'diesel',
    rise: 31,
    taxes: 37,
    others: 63
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
  .text('Yes');

containerMessage
  .append('h4')
  .text('A little');

containerMessage
  .append('p')
  .text('Roughly a third of the change in price is due to an increase in taxes.');

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 50,
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
// for the horizontal scale a band scale, two simply plot the two stacked column side by side
const xScale = d3
  .scaleBand()
  .domain(d3.range(2))
  .range([0, width]);

// for the vertical scale detail a linear scale going from 0 to 100 (percent)
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, height]);

// on the horizontal axis hide the ticks labels
// ! the vertical axis is not used
const xAxis = d3
  .axisBottom(xScale)
  .tickFormat('')
  .tickSize(0);

containerFrame
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

// add text labels _below_ the x axis
// for gasoline
containerFrame
  .append('text')
  .text('Gasoline')
  .attr('font-weight', 'bold')
  .attr('x', xScale(0) + xScale.bandwidth() / 2)
  .attr('text-anchor', 'middle')
  .attr('y', height + margin.top);

containerFrame
  .append('text')
  .text('+ 19 cents')
  .attr('x', xScale(0) + xScale.bandwidth() / 2)
  .attr('text-anchor', 'middle')
  .attr('y', height + margin.bottom);

// for diesel
containerFrame
  .append('text')
  .text('Diesel')
  .attr('font-weight', 'bold')
  .attr('x', xScale(1) + xScale.bandwidth() / 2)
  .attr('text-anchor', 'middle')
  .attr('y', height + margin.top);

containerFrame
  .append('text')
  .text('+ 31 cents')
  .attr('x', xScale(1) + xScale.bandwidth() / 2)
  .attr('text-anchor', 'middle')
  .attr('y', height + margin.bottom);


// use the stack function to make up the relatively simple stacked structure
// it could as very well be recreated with simple rectangles one on top of the other

/* d3.stack is a function detailing through the .keys() method the values which need to be compared
it is applied on an array detailing one observation per type, such as
[
  { taxes: 37, others: 63 }
]
it is clearly thought for more complex datasets
*/
const stack = d3
  .stack()
  .keys(['others', 'taxes']);

// loop through the array of values and add elements for each stacked array
for (let i = 0; i < priceRise.length; i += 1) {
  // make an array out of the single objects contained in the array
  const priceArray = [priceRise[i]];
  // stack(typeArray) generates an array of arrays
  // console.log(stack(priceArray));

  // include one group element for each of the two array item of the stacked array
  const containerGroups = containerFrame
    .selectAll(`g.${priceRise[i].type}`)
    .data(stack(priceArray))
    .enter()
    .append('g')
    .attr('class', priceRise[i].type)
    // on hover show a tooltip describing the portion due to a rise in taxes
    .on('mouseenter', (d) => {
      tooltip
        .append('p')
        .html(`Taxes contribute to <strong>${d[0].data.taxes}%</strong> in the rise of prices for <strong>${d[0].data.type}</strong>`);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();
    });

  // for each group add a rectangle, according to the coordinates retrieved from the stacked array
  containerGroups
    .append('rect')
    // horizontally position each rectangle centered in the respective band
    .attr('x', xScale(i) + xScale.bandwidth() / 4)
    .attr('width', xScale.bandwidth() / 2)
    // d[0] provides in the first two items the starting and ending point
    .attr('y', d => height - yScale(d[0][1]))
    .attr('height', d => yScale(d[0][1] - d[0][0]))
    .attr('fill', colors[priceRise[i].type])
    // reduce the opacity of each second rectangle, the one showing other costs
    .attr('opacity', (d, index) => (index === 1 ? 0.8 : 0.2));

  // for each group add also a path and a text label to highlight the opaque section
  containerGroups
    .append('path')
    .attr('d', (d) => {
      // detail the d attribute based on whether the path refers to gasoline or diesel
      // path element drawing a a tab to the left and to the right alternatively
      const tabWidth = xScale.bandwidth() / 10;
      const tabHeight = yScale(d[0][1] - d[0][0]);
      const tabOriginY = height - yScale(d[0][1]);
      if (i === 0) {
        return `M ${xScale(i) + tabWidth * 2} ${tabOriginY} h ${-tabWidth} v ${tabHeight} h ${tabWidth}`;
      }

      return `M ${width - tabWidth * 2} ${tabOriginY} h ${tabWidth} v ${tabHeight} h ${-tabWidth}`;
    })
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-width', '1px')
    .attr('opacity', (d, index) => (index === 1 ? 1 : 0));

  // add a text element next to each "tab"
  containerGroups
    .append('text')
    .text(d => `${d.key}: ${d[0].data[d.key]}%`)
    .attr('x', () => ((i === 0) ? xScale(i) : width))
    .attr('text-anchor', 'middle')
    // vertically centered at half the width of each rectangle
    .attr('y', d => height - yScale(d[0][0]) - yScale(d[0][1] - d[0][0]) / 2)
    .style('writing-mode', 'vertical-rl')
    .style('text-transform', 'capitalize')
    .attr('opacity', (d, index) => (index === 1 ? 1 : 0));
}


/* to show others instead of taxes simply change the order of the keys function
from this: :
const stack = d3
  .stack()
  .keys(['others', 'taxes']);

const stack = d3
  .stack()
  .keys(['taxes', 'others']);

the second type will be shown
*/
