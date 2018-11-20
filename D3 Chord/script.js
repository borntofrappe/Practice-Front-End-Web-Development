/* globals d3 */
// utility function: returns a random number between 250 and 1000
const randomInteger = () => {
  const max = 1000;
  const min = 100;
  return Math.round(Math.random() * (max - min) + min);
};

// select the HTML container and add introductory elemnts
const container = d3
  .select('.container');

container
  .append('h1')
  .text('Chord Layout');

container
  .append('p')
  .text('Random data, neatly laid out in a pretty package.');

// SVG FRAME
const margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
  chord: 15
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// DATA
// d3.chord requires an array of arrays, each describing the flow from node to node
// build a square matrix for as many name as are details in the labels array
const labels = ['Penelope', 'Timothy', 'Eliza', 'Geoffrey', 'Tina'];
const nodes = labels.length;
const dataNodes = [];
for (let i = 0; i < nodes; i += 1) {
  const dataNode = [];
  for (let j = 0; j < nodes; j += 1) {
    dataNode.push(randomInteger());
  }
  dataNodes.push(dataNode);
}
// console.log(dataNodes);

// create an instance of the layout function
// the padAngle() allows to detail a percentage value for the amount of padding at the bottom of the ribbon
const chord = d3
  .chord()
  .padAngle(0.05);
const dataChord = chord(dataNodes);

/*
chord(dataNodes) returns an array of chords, structured as follows:
{
  source,
  target
}

each with the following fields
{
  endAngle,
  index,
  startAngle,
  subIndex,
  value
}

describing where the specific point ought to start/end
generally used with a ribbon function

additionally, it displays another array under _groups_, where each item represents the combined flow for the point
meaning, used with an arc function, it maps the segment of the circular layout
*/
// console.log(chord(dataNodes));


// create an instance of the ribbon function, tailored for the chord layout
const ribbon = d3
  .ribbon()
  // specify a radius
  .radius(width / 2 - margin.chord);

/* for each object
{
  source,
  target
}
the ribbon function returns the SVG path of the ribbon
*/
// console.log(ribbon(dataChord[0]));

// for each data point add a group element centered in the svg
const containerRibbons = containerFrame
  .selectAll('g.group')
  .data(dataChord)
  .enter()
  .append('g')
  .attr('class', 'group')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

// add a path element formatting the data through the ribbon function
containerRibbons
  .append('path')
  .attr('d', ribbon)
  // determine the fill on the basis of the source object of each node
  .attr('fill', d => `hsl(${360 / dataChord.groups.length * d.source.index}, 50%, 50%)`)
  // on hover increase the opacity of the ribbon
  .attr('opacity', 0.6)
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .attr('opacity', 1);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .attr('opacity', 0.6);
  });

// create an instance of the arc function
const arc = d3
  .arc()
  // detail the inner and outer radius of each arc
  .innerRadius(width / 2 - margin.chord)
  .outerRadius(width / 2);

// for each item in the groups array add a group element, centered in the svg
const containerArcs = containerFrame
  .selectAll('g.arc')
  .data(dataChord.groups)
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

// add a path describing each arc
containerArcs
  .append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`);

// for each item in the groups array add a group element, centered in the svg
const containerText = containerFrame
  .selectAll('g.text')
  .data(dataChord.groups)
  .enter()
  .append('g')
  .attr('class', 'text')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

// detail the text labels and spread them around the chord layout
containerText
  .append('text')
  .text((d, i) => labels[i])
  .attr('font-size', '1.2rem')
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  // detail a text shadow matching the color of the respective arc
  .style('text-shadow', (d) => {
    const color = `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`;
    return `2px 2px ${color}, -2px -2px ${color}, 2px -2px ${color}, -2px 2px ${color}`;
  })
  .attr('fill', '#fff')
  .attr('transform', (d, i) => `rotate(${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI}) translate(0, ${-height / 2}) rotate(-${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI})`);
