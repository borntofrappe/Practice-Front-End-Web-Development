/* globals d3 */
// describe an array of labels for each data point
const countries = ['Belgium', 'Germany', 'France', 'Italy', 'Luxembourg', 'Netherlands'];

// detail the data with a value for each year
// for the chord layout, an array of arrays is required, with one value for each node
const dataExport = {
  2016: [
    [0, 58529869.07, 54350358.47, 18332264.84, 4951048.29, 39845172.77],
    [32630803.37, 0, 69557447.88, 49313852.76, 4560724.77, 62596366.26],
    [26082184.40, 62288898.21, 0, 27815369.39, 1948689.22, 12700400.84],
    [13128552, 51157106.35, 42750171.33, 0, 465760.95, 9280851.06],
    [2356788.67, 3246391.63, 2156705.52, 542335.23, 0, 698494.45],
    [29979211.06, 81768936.37, 26701381.80, 14101623.12, 826491.23, 0]
  ],
  2015: [
    [0, 59410867.55, 55010618.78, 17708252.16, 5480117.67, 40987470.71],
    [32248948.53, 0, 85553074.01, 47803039.93, 4577282.34, 65319952.42],
    [25327522.51, 61102780.5, 0, 27207110.78, 1819361.69, 13517979.83],
    [13259924.36, 49109654.87, 41425250.39, 0, 510244.7, 9125469.78],
    [2553681.63, 3329185.51, 2562906.73, 713461.28, 0, 619769.46],
    [30302267.06, 82517679.93, 26031622.86, 13711525.54, 882811.43, 0]
  ],
  2014: [
    [0, 58700675.32, 55909267.05, 15308106.61, 5971255.19, 43098637.39],
    [33497718.03, 0, 84615496.26, 44967673.13, 4634225.52, 59347233.51],
    [24942089.91, 61007402.87, 0, 26516932.38, 2058395.80, 13533980.92],
    [12881912, 48663942.95, 41054136.57, 0, 470040.17, 8975853.84],
    [2307005.73, 3283378.99, 2453620.71, 794090.55, 0, 561821.17],
    [32346609, 86395002, 26807357.28, 14569275.36, 917982.55, 0]
  ]
};


// select the HTML container and add introductory elemnts
const container = d3
  .select('.container');

container
  .append('h1')
  .text('European Trade');

container
  .append('p')
  .text('Export flow between the six founding countries.');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

const format = d3.format(',');

// add a container for three button elements, used to go between year values
const containerButtons = container
  .append('div')
  .attr('class', 'container__buttons');

// add one button for each property
containerButtons
  .selectAll('button')
  .data(Object.keys(dataExport))
  .enter()
  .append('button')
  .classed('active', d => d === '2016')
  .text(d => d);

// // SVG FRAME
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
  chord: 15
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// // DATA
// // create an instance of the layout function
const chord = d3
  .chord()
  .padAngle(0.05);

// format the data
const dataChord = chord(dataExport[2016]);

/* refresher on d3.chord: the formatted data has the following properties
- an array of objects describing the source and target (for the ribbon function)
- an array under data.groups with the combined values (for the arc function)
*/

// create an instance of the ribbon function
const ribbon = d3
  .ribbon()
  // specify a radius
  .radius(width / 2 - margin.chord);

// for each object in the data array the function returns the SVG path for each ribbon

// for each data point add a group element centered in the svg
const containerRibbons = containerFrame
  .selectAll('g.ribbon')
  .data(dataChord)
  .enter()
  .append('g')
  .attr('class', 'ribbon')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

// add a path element formatting the data through the ribbon function
containerRibbons
  .append('path')
  .attr('d', ribbon)
  // determine the fill on the basis of the source object of each node
  .attr('fill', d => `hsl(${360 / dataChord.groups.length * d.source.index}, 50%, 50%)`)
  // on hover increase the opacity of the ribbon
  .attr('opacity', 0.4)
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .attr('opacity', 1);

    tooltip
      .append('p')
      .text(`${countries[d.source.index]} - ${countries[d.target.index]}`);

    tooltip
      .append('p')
      .text(`Value: ${format(d.source.value)}k €`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .attr('opacity', 0.4);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// create an instance of the arc function
const arc = d3
  .arc()
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
  .attr('fill', d => `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`);

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
  .text((d, i) => countries[i])
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('pointer-events', 'none')
  // detail a text shadow matching the color of the respective arc
  .style('text-shadow', (d) => {
    const color = `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`;
    return `2px 2px ${color}, -2px -2px ${color}, 2px -2px ${color}, -2px 2px ${color}`;
  })
  .attr('fill', '#fff')
  .attr('transform', d => `rotate(${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI}) translate(0, ${-height / 2}) rotate(-${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI})`);

// update function called when clicking on a button
function updateChord(year) {
  // format the data for the dataset matching the year value
  const data = chord(dataExport[year]);

  // bind the new data with the ribbons container
  containerRibbons
    .data(data);

  // alter the properties relying on the updated data
  containerRibbons
    .select('path')
    .transition()
    .attr('d', ribbon);

  // repeat the same reasoning for the arcs and text labels
  containerArcs
    .data(data.groups);

  containerArcs
    .select('path')
    .transition()
    .attr('d', arc);

  containerText
    .data(data.groups);

  containerText
    .select('text')
    .transition()
    .attr('transform', d => `rotate(${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI}) translate(0, ${-height / 2}) rotate(-${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI})`);
}

// add an event listener on each button
d3
  .selectAll('.container__buttons button')
  .on('click', (d, i, nodes) => {
    // remove the class of active on all but the selected button
    d3
      .selectAll(nodes)
      .classed('active', false);

    d3
      .select(nodes[i])
      .classed('active', true);

    // update the chord layout with the selected year
    updateChord(d);
  });
