/* globals d3 */
// create random data for the (first) simple visualization (a character with certain skills)

const name = 'Gabriele';
const skills = ['front end', 'back end', 'design'];
const randomInt = (min = 2, max = 10) => Math.ceil(Math.random() * (max - min) + min);


const data = {
  name,
  skills: skills.map(skill => ({ name: skill, value: randomInt() }))
};
// console.log(data);

// select the container and add introductory elements
const container = d3
  .select('.container');

container
  .append('h1')
  .attr('class', 'title')
  .text('Spider Plot');

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerSVG = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`);

const containerFrame = containerSVG
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// for each skill, add a group element, to nest the lot in the center of the svg
const containerGroups = containerFrame
  .selectAll('g')
  .data(data.skills)
  .enter()
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

// for each group, add a line spanning half the size the container and rotated to spread the lines evenly
containerGroups
  .append('path')
  .attr('d', `M 0 0 v ${width * (-0.5)}`)
  .attr('stroke', '#FA5B05')
  .attr('stroke-width', '2px')
  .attr('transform', (d, i) => `rotate(${360 / data.skills.length * i})`);

containerGroups
  .append('text')
  .attr('x', 0)
  .attr('y', (d, i) => (i === 0 ? -5 : 20))
  .attr('fill', '#FA5B05')
  .attr('text-anchor', 'middle')
  .attr('transform', (d, i) => ` rotate(${360 / data.skills.length * i}) translate(0, ${-width * 0.5}) rotate(${-360 / data.skills.length * i})`)
  .style('text-transform', 'capitalize')
  .text(d => d.name);

// for each group, add a circle element according to the skill's value
// create first a scale, to map each value accordingly
const scale = d3
  .scaleLinear()
  .domain([0, 11])
  .range([0, (width * (-0.5))]);

containerGroups
  .append('circle')
  .attr('cx', '0')
  .attr('cy', d => scale(d.value))
  .attr('r', '5')
  .attr('fill', '#FA5B05')
  .attr('transform', (d, i) => `rotate(${360 / data.skills.length * i})`);

// retrieve the coordinates of the now positioned circles
// ! TODO: figure out how to
