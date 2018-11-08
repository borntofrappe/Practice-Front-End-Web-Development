// INTRODUCTORY HTML ELMEMENTS
const container = d3
  .select('.container');

container
  .append('h1')
  .text('CodePen Stack');

container
  .append('p')
  .text('Hover to highlight the technologies available in the settings tab.');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// SVG FRAME
const margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


// NETWORK DIAGRAM
// create an array for the nodes in the application
const nodes = [
  { tech: 'HTML' },
  { tech: 'CSS' },
  { tech: 'JavaScript' },
  { tech: 'Haml' },
  { tech: 'Markdown' },
  { tech: 'Slim' },
  { tech: 'Pug' },
  { tech: 'LESS' },
  { tech: 'SCSS' },
  { tech: 'Sass' },
  { tech: 'Stylus' },
  { tech: 'PostCSS' },
  { tech: 'Babel' },
  { tech: 'TypeScript' },
  { tech: 'CoffeeScript' },
  { tech: 'LiveScript' },
];

// SIMULATION
// use the forceSimulation() function passing the nodes as argument
// this allows to detail x, y, vx, vy values describing the changing position and velocity of each node
const simulation = d3
  .forceSimulation(nodes)
  .velocityDecay(0.6);

// FORCES
// define the forces responsible for the actual behavior of the nodes

// forceCenter() creates a new centering force specifying an x and y coordinate
// by default { 0, 0 }
// can be specified in the force function itself or through additinal .x and .y functions
const center = d3
  .forceCenter()
  .x(width / 2)
  .y(height / 2);

// forceLink() details a link, an attracting force between connected nodes

// links can be specified through an array describing the source and target nodes
// accepting a value which refers to the index in the nodes array

// const links = [
//   { source: 0, target: 1 },
//   { source: 0, target: 2 },
//   { source: 0, target: 3 },
//   { source: 0, target: 4 },
//   { source: 0, target: 5 },
//   { source: 0, target: 6 },
//   { source: 1, target: 7 },
//   { source: 1, target: 8 },
//   { source: 1, target: 9 },
//   { source: 1, target: 10 },
//   { source: 1, target: 11 },
//   { source: 2, target: 12 },
//   { source: 2, target: 13 },
//   { source: 2, target: 14 },
//   { source: 2, target: 15 },
// ];

// alternatively describing a string value later accessed through an accessor function
const links = [
  { source: 'HTML', target: 'CSS' },
  { source: 'HTML', target: 'JavaScript' },
  { source: 'HTML', target: 'Haml' },
  { source: 'HTML', target: 'Markdown' },
  { source: 'HTML', target: 'Slim' },
  { source: 'HTML', target: 'Pug' },
  { source: 'CSS', target: 'LESS' },
  { source: 'CSS', target: 'SCSS' },
  { source: 'CSS', target: 'Sass' },
  { source: 'CSS', target: 'Stylus' },
  { source: 'CSS', target: 'PostCSS' },
  { source: 'JavaScript', target: 'Babel' },
  { source: 'JavaScript', target: 'TypeScript' },
  { source: 'JavaScript', target: 'CoffeeScript' },
  { source: 'JavaScript', target: 'LiveScript' },
];

// accessor function detailed through the .id() function
const link = d3
  .forceLink()
  .links(links)
  .id(d => d.tech)
  .distance(50);

// forceManyBody() simulates attraction or repulsion between the nodes
// by default -30
// can be specified through an additional .strength() function
// negative - repulsion, positive - attraction
// negative - charge, positive - gravity
const charge = d3
  .forceManyBody()
  .strength(-width / 2);

// for every tick of the simulation, a function is called to change the position/ overall behavior of the SVG elements
// for each node detail a circle and a text element
// ! additionally add path elements for each link
function simulate() {
  // add as many circle elements as there are nodes
  const updateCircle = containerFrame
    .selectAll('circle')
    .data(nodes);

  // when introducing the elements attribute a radius and a data-tech attribute
  updateCircle.enter()
    .append('circle')
    .attr('r', 7)
    .attr('data-tech', d => d.tech)
    .attr('fill', '#fff')
    // for both selection set the x and y coordinates benefiting from the x and y values of each object
    // values added and updated every 'tick'
    .merge(updateCircle)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    // on hover highlight the information bound to each circle in the tooltip
    .on('mouseenter', function (d) {
      d3.select(this)
        .transition()
        .attr('r', 10)
        .attr('stroke', '#805e00')
        .attr('stroke-width', '2px');

      tooltip
        .append('p')
        .text('Supported Technology: ')
        .append('strong')
        .text(d.tech);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', function () {
      d3.select(this)
        .transition()
        .attr('r', 7)
        .attr('stroke', 'none');

      tooltip
        .style('opacity', 0)
        .select('p')
        .remove();
    });

  // replicate the structure specified for the circles for the text elements
  // ! highlight only the first three nodes, set to be the most prominent of the bunch
  const updateText = containerFrame
    .selectAll('text')
    .data([...nodes.slice(0, 3)]);

  // show each text as a transparent heading and behind the node it represents
  updateText.enter()
    .append('text')
    .text(d => d.tech)
    .attr('data-tech', d => d.tech)
    .attr('fill', '#fff')
    .attr('font-size', '3.5rem')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('opacity', '0.1')
    .style('pointer-events', 'none')
    .merge(updateText)
    .attr('x', d => d.x)
    .attr('y', d => d.y);

  // for the path make use of the links array, but retrieve matching values from the nodes array
  // this because the nodes array is the data structure detailing the changing x, y coordinates
  const updatePath = containerFrame
    .selectAll('path')
    .data(links);

  updatePath.enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-width', '2px')
    .attr('opacity', '0.1')
    .style('pointer-events', 'none')
    .merge(updatePath)
    // detail a path going from the source to the target element
    .attr('d', (d) => {
      const { source, target } = d;
      const matchSource = nodes.find(node => node.tech === source.tech);
      const matchTarget = nodes.find(node => node.tech === target.tech);

      const sourceX = matchSource.x;
      const sourceY = matchSource.y;

      const targetX = matchTarget.x;
      const targetY = matchTarget.y;
      return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    });
}

// summing everything up, set up the simulation with the specified forces
// listen for the tick event, at which point call the function updating the elements' position
simulation
  .force('charge', charge)
  .force('center', center)
  .force('link', link)
  .on('tick', simulate);
