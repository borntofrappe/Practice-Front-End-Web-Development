/* globals d3 */
// detail the URL from which to fetch the relevant data
const URL = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json';

/** for the treemap diagram add
 * html elements
 * tooltip
 * svg frame
 * layout function
 * svg elements
 */

const container = d3.select('.container');
// detail the formatting function for the thousand digit
const format = d3.format(',');

// HTML ELEMENTS
container
  .append('h1')
  .attr('class', 'title')
  .text('Kickstarter Pledges');

container
  .append('p')
  .attr('class', 'description')
  .style('margin', '0.5rem 0 1rem')
  .text('Visualize pledges on kickstarter according to their category.');

// TOOLTIP
const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('opacity', 0)
  .style('pointer-events', 'none');

// SVG FRAME
// the visualization doesn't need margin values, so the elements are directly nested in the SVG element
// no nested group element required
const width = 500;
const height = 500;

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0, 0 ${width} ${height}`);

// define a function used to draw the treemap diagram based on the data returned in a JSON object
function treemapDiagram(data) {
  // compute a hierarchy based on the JSON data
  const hierarchy = d3.hierarchy(data);
  // compute for each node the relative weight, through the _value_ property
  hierarchy.sum(d => d.value);
  // console.log(hierarchy);

  // define the layout function
  const treemap = d3.treemap();
  // format the data through the layout function
  // the function adds four important values in x0, x1, y0 and y1, to describe the starting and ending point
  // values in the 0-1 range
  const treemapData = treemap(hierarchy);
  // console.log(treemapData);

  // consider every node
  const descendants = treemapData.descendants();
  // console.log(descendants);

  // split the categories from the actual projects
  const categories = descendants.filter(descendant => descendant.depth === 1);
  const projects = descendants.filter(descendant => descendant.depth === 2);

  // include one rectangle for each category, with a color picked from the 0-360 spectrum
  containerFrame
    .selectAll('rect.category')
    .data(categories)
    .enter()
    .append('rect')
    .attr('class', 'category')
    .attr('x', d => d.x0 * width)
    .attr('y', d => d.y0 * height)
    .attr('width', d => (d.x1 - d.x0) * width)
    .attr('height', d => (d.y1 - d.y0) * height)
    .attr('fill', (d, i) => `hsl(${360 / categories.length * i}, 60%, 50%)`);

  // include one re ctangle for each project, but show only the stroke
  containerFrame
    .selectAll('rect.project')
    .data(projects)
    .enter()
    .append('rect')
    .attr('class', 'project')
    .attr('x', d => d.x0 * width)
    .attr('y', d => d.y0 * height)
    .attr('width', d => (d.x1 - d.x0) * width)
    .attr('height', d => (d.y1 - d.y0) * height)
    // ! setting the fill to none causes mouse events to be fired only when crossing the stroke
    .attr('fill', 'transparent')
    .attr('stroke', '#33333322')
    // on mousenter highlight the selected rectangle and include pertinent information in the tooltip
    .on('mouseenter', function (d) {
      d3.select(this)
        .attr('fill', '#33333311')
        .attr('stroke', '#333333aa');

      tooltip
        .append('p')
        .text(d.data.category)
        .style('font-weight', 'bold');

      tooltip
        .append('p')
        .text(d.data.name);

      tooltip
        .append('p')
        .text(`$ ${format(d.data.value)}`);

      // retrieve the element for the tooltip, to position the same atop the cursor
      const tooltipElement = tooltip.node().getBoundingClientRect();
      const { height: heightElement } = tooltipElement;
      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - heightElement}px`);
    })
    .on('mouseout', function () {
      d3.select(this)
        .attr('fill', 'transparent')
        .attr('stroke', '#33333322');

      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();
    });
}

// fetch data from the selected URL
// call the treemap diagram to draw the visualization based on the JSON data
fetch(URL)
  .then(res => res.json())
  .then((json) => {
    treemapDiagram(json);
  });
