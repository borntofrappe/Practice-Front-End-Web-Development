// select the body and append an svg container absolutely positioned to cover the entirety of the page
const { innerWidth: width, innerHeight: height } = window;

const frame = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('position', 'absolute')
  .style('left', 0)
  .style('top', 0);

// create an array of empty objects, as many as wanted
const nodes = [];
const particles = 100;
for (let i = 0; i < particles; i += 1) {
  nodes.push({});
}

// append the circle elements in the center of the svg
const circles = frame
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  // with a random radius (between a selected min and max)
  .attr('r', (d, i) => Math.floor(Math.random() * (8 - 2) + 2))
  // with a color from the 0-360 spectrum
  .attr('fill', (d, i) => `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`)
  .attr('cx', width / 2)
  .attr('cy', height / 2);

// create the function called in response to the tick event
// simply updating the position of the existing circle elements with the coordinates dictated by d3.simulation
function simulate() {
  circles
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
}

// function called after a brief timeout to enable the simulation
function pressButton() {
  // describe the simulation based on the nodes
  // creating a center of gravity in the middle of the svg
  // at first with a positive charge (creating an attraction toward the center)
  const simulation = d3
    .forceSimulation(nodes)
    .force('center', d3.forceCenter().x(width / 2).y(height / 2))
    .force('charge', d3.forceManyBody().strength(width / 2))
    .on('tick', simulate);

  // after an arbitrary brief moment modify the simulation with a negative charge (creative a repulsion from the center)
  setTimeout(() => {
    simulation
      .force('charge', d3.forceManyBody().strength(-width));
  }, 3000);
}

// after a timeout roughly matching the animation described in CSS call the function which triggers the simulation
setTimeout(() => {
  pressButton();
}, 3200);
