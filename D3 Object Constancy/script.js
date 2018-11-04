/* globals d3 */
/*
include the data, in the form of three variables
- riders, an array describing an object for each rider, its name and position in the races
- races, an array of strings describing the circuits
- points, an array of integer describing the number of points according to position (starting with 0 for the 0-th index)
*/
const riders = [
  {
    name: 'marquez',
    position: [2, 18, 1, 1, 1, 16, 2, 1, 1, 3, 2, 2, 1, 1, 1, 0, 1]
  },
  {
    name: 'dovizioso',
    position: [1, 6, 5, 0, 0, 2, 0, 4, 7, 1, 3, 1, 2, 2, 18, 3, 6]
  },
  {
    name: 'rossi',
    position: [3, 19, 4, 5, 3, 3, 3, 5, 2, 4, 6, 7, 8, 4, 4, 6, 18]
  },
  {
    name: 'vinales',
    position: [6, 5, 2, 7, 7, 8, 6, 3, 3, 0, 12, 5, 10, 3, 7, 1, 4]
  },
  {
    name: 'crutchlow',
    position: [4, 1, 19, 0, 8, 6, 4, 6, 0, 5, 4, 3, 0, 7, 2, 0, 0]
  },
  {
    name: 'petrucci',
    position: [5, 10, 12, 4, 2, 7, 8, 0, 4, 6, 5, 11, 7, 9, 9, 12, 9]
  },
  {
    name: 'zarco',
    position: [8, 2, 6, 2, 0, 10, 7, 8, 9, 7, 9, 10, 14, 5, 6, 0, 3]
  },
  {
    name: 'iannone',
    position: [9, 8, 3, 3, 0, 4, 10, 11, 12, 10, 13, 8, 3, 11, 0, 2, 0]
  },
  {
    name: 'lorenzo',
    position: [0, 15, 11, 0, 6, 1, 1, 7, 6, 2, 1, 17, 0, 0, 0, 0, 0]
  },
  {
    name: 'rins',
    position: [0, 3, 0, 0, 10, 5, 0, 2, 0, 11, 8, 4, 4, 6, 3, 5, 2]
  },
  {
    name: 'bautista',
    position: [13, 16, 15, 8, 0, 9, 9, 9, 5, 9, 10, 9, 0, 8, 5, 4, 7]
  },
  {
    name: 'pedrosa',
    position: [7, 0, 7, 0, 5, 0, 5, 15, 8, 8, 7, 6, 5, 0, 8, 0, 5]
  }
];

const races = [
  'qatar',
  'argentina',
  'americas',
  'spain',
  'france',
  'italy',
  'catalunya',
  'netherlands',
  'germany',
  'czech republic',
  'austria',
  // ! the UK grand prix was canceled
  // 'great britain',
  'san marino',
  'aragon',
  'thailand',
  'japan',
  'australia',
  'malaysia',
  // ! the valencia grand prix is still yet to come
  // 'valencia',
];
const points = [0, 25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// select the container and add introductory HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('MotoGP Rankings');

container
  .append('p')
  .style('margin', '1rem 0')
  .text('Select a rider to assess the number of points acquired in each circuit');

// add a select element, in which to include every rider
const select = container
  .append('select');

// for each rider (found in the riders array) add an option to the select element
// sort the riders alphabetically
const ridersSorted = riders.sort((a, b) => ((a.name[0] > b.name[0]) ? 1 : -1));
for (rider of ridersSorted) {
  select
    .append('option')
    // each option has a value equal to the name of the rider
    .attr('value', rider.name)
    .text(rider.name);
}

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 80
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES and AXES
// for the horizontal scale describe a linear scale for the number of points (ranging from 0 to 25
const xScale = d3
  .scaleLinear()
  .domain(d3.extent(points))
  .range([0, width]);

// for the vertical scale, detail an ordinal scale for the circuits
const yScale = d3
  .scaleBand()
  .domain(races)
  .range([0, height]);

// add axes
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10)
  // specify on the horizontal axis one tick for each available number of points
  .tickValues(points);

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text')
  .attr('font-family', 'inherit');

const yAxis = d3
  .axisLeft(yScale)
  .tickSizeOuter(0);

containerFrame
  .append('g')
  .call(yAxis)
  .selectAll('text')
  .attr('font-family', 'inherit')
  .style('text-transform', 'capitalize');

// declare a function to draw a bar plot for the selected rider
function drawPlot(riderName) {
  // find the instance in the riders array matching the selected name
  const riderSelection = riders.find(rider => rider.name === riderName);

  // create the update selection
  // selection of existing rectangles, to which the data is bound
  const update = containerFrame
    .selectAll('rect')
    // include for the data the position assumed by the rider in each circuit
    .data(riderSelection.position, (d, i) => i);

  // create the enter selection, for those rectangle elements to be added to fit the data
  const enter = update
    .enter();

  // the exit selection is not needed as the number of data points is equal for all selections
  // const exit = update
  //   .exit();

  // for the update selection transition the width to match the new data points
  update
    .transition()
    .attr('width', (d) => {
      // based on the position retrieve the number of points
      // there might be a chance the rider doesn't collect any points
      if (d >= points.length) {
        return xScale(0);
      }
      return xScale(points[d]);
    });

  // for the enter selection append a rectangle for each position
  // vertically matching the circuit, horizontally the number of points
  enter
    .append('rect')
    .attr('x', 0)
    .attr('rx', 10)
    .attr('ry', 0)
    .attr('y', (d, i) => yScale(races[i]))
    .attr('width', (d) => {
      // based on the position retrieve the number of points
      // there might be a chance the rider doesn't collect any points
      if (d >= points.length) {
        return xScale(0);
      }
      return xScale(points[d]);
    })
    .attr('height', yScale.bandwidth())
    .attr('fill', '#E11656');
}

// call the function for the first rider
drawPlot(ridersSorted[0].name);

// attach a listener for the input event on the select element as to call the function with the new rider's name
select
  .on('change', () => {
    const name = d3.event.target.value;
    drawPlot(name);
  });
