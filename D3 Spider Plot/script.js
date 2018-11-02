/* globals d3 */
// create random data for the spider plot, in the form of a random integer value for each costume
const constumes = ['Ghost', 'Witch', 'Vampire', 'Mummy', 'Skeleton', 'Zombie', 'Wolf'];
const randomInt = (min = 1, max = 100) => Math.ceil(Math.random() * (max - min) + min);

// build an object for the data, detailing in a costume variable the name and value
const data = {
  costumes: constumes.map(constume => ({ name: constume, value: randomInt() }))
};
// data is now an object with a costumes property
// this property has two additional properties, detailing an array of names and values

// HTML introductory elements
const container = d3
  .select('.container');

container
  .append('h1')
  .attr('class', 'title')
  .text('Spider Plot');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');

// SVG FRAME
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SVG ELEMENTS
// for each costume add a group element, to nest the lot in the center of the svg
const containerGroups = containerFrame
  .selectAll('g')
  .data(data.costumes)
  .enter()
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)
  // when hovering on an element of the visualization, detail the information connected to all data points
  // access this information through the third argument of the callback function
  .on('mouseenter', (d, i, nodes) => {
    // create a paragraph element for each costume, add the lot to the tooltip and transition it into view
    const paragraphs = nodes.map(node => `<p>${node.__data__.name}: ${node.__data__.value}</p>`).join('');
    tooltip
      .html(`<p>Popular Costumes</p>${paragraphs}`)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`)
      .style('opacity', 1);
  })
  // on mouseout remove the tooltip paragraphs and hide it
  .on('mouseout', () => {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// SPIDER PLOT LINES
// for each group, add a line spanning half the size the container and rotated evenly around the center
containerGroups
  .append('path')
  .attr('d', `M 0 0 v ${width * (-0.5)}`)
  .attr('stroke', '#FA5B0544')
  .attr('stroke-width', '2px')
  .attr('transform', (d, i) => `rotate(${360 / data.costumes.length * i})`);

// // SPIDER PLOT ELEMENTS: area, circles, text labels
/* for the data points leverage:
- a scale, to find the radius of the circle on which the data points ought to be positioned
- a bit of trigonometry, to find based on the radius and the angle the x and y coordinates

Math refresher: give r radius and θ angle

x = sin(θ) * r
y = cos(θ) * r

! IMPORTANT: the angle θ is in radians
radians = degree * Math.PI / 180
*/

const scale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width / 2]);

// compute the x and y coordinates and include them each in an dedicated array
const coordinates = {
  x: [],
  y: []
};

for (let i = 0; i < data.costumes.length; i += 1) {
  // retrieve the value
  const { value } = data.costumes[i];
  // compute the angle
  const degrees = 360 / data.costumes.length * i;
  const radians = (degrees * Math.PI / 180).toFixed(2);

  // compute the radius
  const radius = scale(value);

  // compute the horizontal and vertical coordinates
  const xCoor = radius * Math.sin(radians);
  const yCoor = radius * Math.cos(radians);

  // add them to the coordinates object
  coordinates.x.push(xCoor);
  coordinates.y.push(yCoor);
}

// for the path, you need a string making up the area (in the form of **M startingPointX startingPointY L pointX pointY ... Z**)
// build also an array detailing the starting path (in the form of **M 0 0 L 0 0 ... Z**)
const pathOriginArray = [];
const pathActualArray = [];
for (let i = 0; i < coordinates.x.length; i += 1) {
  const xCoor = coordinates.x[i];
  // remember SVG reasons top to bottom, and since the group elements are centered, y coordinates need to be set negative to go upwards
  const yCoor = coordinates.y[i] * -1;

  pathOriginArray.push('0 0 L');
  pathActualArray.push(`${xCoor} ${yCoor} L`);
}
const pathOrigin = pathOriginArray.join(' ');
const pathActual = pathActualArray.join(' ');

containerGroups
  .append('path')
  .attr('d', `M ${pathOrigin.substring(0, pathOrigin.length - 1)} Z`)
  .transition()
  .delay(100)
  .attr('d', `M ${pathActual.substring(0, pathActual.length - 1)} Z`)
  .attr('stroke', '#FA5B05')
  .attr('stroke-width', '2px')
  .attr('fill', '#FA5B0522');

// add circle elements in the rightful coordinates
containerGroups
  .append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .transition()
  .delay(100)
  .attr('cx', (d, i) => coordinates.x[i])
  .attr('cy', (d, i) => coordinates.y[i] * (-1))
  .attr('r', '5')
  .attr('fill', '#FA5B05');

// add a text labels at the end of the line segments
containerGroups
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('fill', '#FA5B05')
  .attr('text-anchor', 'middle')
  .attr('transform', (d, i) => `rotate(${360 / data.costumes.length * i}) translate(0, ${-width * 0.55}) rotate(${-360 / data.costumes.length * i})`)
  .style('text-transform', 'capitalize')
  .text(d => d.name);
