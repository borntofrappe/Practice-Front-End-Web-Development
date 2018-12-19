/* globals d3 */
// data is fetched from this public API
// http://ergast.com/mrd/

// global variables for colors and the starting/ending year
const globals = {
  themeColor: '#e10600',
  backgroundColor: '#fff',
  startingYear: 2000,
  endingYear: 2018
};
// color scale for a minor design tweak
const color = d3
  .scaleOrdinal(d3.schemeAccent);

// HTML elements
const container = d3.select('.container');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

const containerHTML = container
  .append('div')
  .attr('class', 'introduction');

containerHTML
  .append('h1')
  .attr('class', 'title')
  .text('F1 Standings');

containerHTML
  .append('p')
  .attr('class', 'description')
  .text('How Formula One champions fared in the years.');

// in a separate div nest as many buttons as one would fancy
// the API gives information from 1950
const containerControls = container
  .append('div')
  .attr('class', 'controls');

containerControls
  .selectAll('button')
  // ! d3.range can accept two values, providing an array with values between the two
  // non inclusive of the upper bound, hence the +1
  .data(d3.range(globals.startingYear, globals.endingYear + 1))
  .enter()
  .append('button')
  .text(d => d)
  // by default highlight the 2018 option
  .classed('selection', d => d === 2018);


// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 1000 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// define only the vertical scale, to have each rider cover a fraction of the height
// as far as the width is concerned, each rectangle will spread to consider the entirety of the horizontal dimension
const yScale = d3
  .scaleBand()
  .range([0, height]);

// function visualizing the standing on the basis of two arrays
// an array describing the names, one describing objects with the points and names
function showStandings(riderNames, riderPoints) {
  console.log(riderNames, riderPoints);
  // complete the vertical scale
  yScale
    .domain(d3.range(riderNames.length));

  // detail the update, enter, exit selection
  const updateSelection = containerFrame
    .selectAll('g')
    // bind each group to the name of the rider
    .data(riderNames, d => d);

  const enterSelection = updateSelection
    .enter();

  const exitSelection = updateSelection
    .exit();

  // for existing elements, update the vertical position, the size of the rectangles and the text describing the points
  updateSelection
    .transition()
    .attr('transform', (d, i) => `translate(0, ${yScale(i)})`);

  updateSelection
    .selectAll('rect')
    .transition()
    .delay(100)
    .attr('height', yScale.bandwidth());

  updateSelection
    .selectAll('text')
    .transition()
    .delay(100)
    .attr('y', yScale.bandwidth() / 2);

  updateSelection
    .selectAll('text.points')
    .text(d => riderPoints.find(rider => rider.name === d).points);


  // for new elements, add a group and nest one rectangle element for the bar and two text elements for the name/points
  const enterContainer = enterSelection
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${yScale(i)})`);

  enterContainer
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', yScale.bandwidth())
    .attr('stroke', globals.backgroundColor)
    .attr('stroke-width', '2px')
    .attr('fill', globals.themeColor)
    .attr('width', 0)
    // transition the width
    .transition()
    .delay((d, i) => 50 + 20 * i)
    .attr('width', width);

  enterContainer
    .append('text')
    .attr('x', 10)
    .attr('y', yScale.bandwidth() / 2)
    .attr('alignment-baseline', 'middle')
    .text(d => d)
    .attr('fill', globals.backgroundColor);

  enterContainer
    .append('text')
    .attr('class', 'points')
    .attr('x', width - 10)
    .attr('y', yScale.bandwidth() / 2)
    .attr('text-anchor', 'end')
    .attr('alignment-baseline', 'middle')
    .text(d => riderPoints.find(rider => rider.name === d).points)
    .attr('fill', globals.backgroundColor);

  // for unnecessary elements remove them from the visualization
  exitSelection
    .remove();
}

// function fetching the data
// accepting an year value as argument
function fetchData(year) {
  // based on the year value fetch the names and points from the API endpoint
  fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
    .then(response => response.json())
    .then((json) => {
      const { DriverStandings } = json.MRData.StandingsTable.StandingsLists[0];
      const names = DriverStandings.map(d => d.Driver.familyName);
      const points = DriverStandings.map(d => ({ name: d.Driver.familyName, points: d.points }));
      showStandings(names, points);
    });
}
// call immediately the function for 2018
fetchData(2018);

// attach event listeners on the buttons to have them call the fetching function for their respective values
d3.selectAll('button')
  .on('click', function (d) {
    fetchData(d);
    d3
      .selectAll('button')
      .classed('selection', false);
    d3
      .select(this)
      .classed('selection', true);
  });
