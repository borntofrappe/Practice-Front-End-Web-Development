/* globals d3 */
// detail the URL from which to fetch the relevant data
const URL = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json';
// target the single container
const container = d3.select('.container');
// detail the formatting function for the thousand digit
const format = d3.format(',');

// INTRODUCTORY ELEMENTS
container
  .append('h1')
  .attr('class', 'title')
  .text('Kickstarter Pledges');

container
  .append('p')
  .attr('class', 'description')
  .text('Visualize pledges on kickstarter according to their category.');

// TOOLTIP
const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('opacity', 0)
  .style('pointer-events', 'none');

// before fetching the data, as to allocate the space for each visualization
// detail HTML elements and SVG frames (these do not rely on the actual data)
// LEGEND
const legendContainer = container
  .append('div')
  .attr('class', 'legend');

legendContainer
  .append('h2')
  .attr('class', 'subtitle')
  .text('Legend');

legendContainer
  .append('p')
  .attr('class', 'subdescription')
  .text('Hover to visualize each category.');

const legendWidth = 200;
const legendHeight = 20;
// for the legend detail a simple rectangular area, to be filled with one rectangle and one text element per category
const legendSVG = legendContainer
  .append('svg')
  .attr('viewBox', `0, 0 ${legendWidth} ${legendHeight}`);

// for the actual visualizations include introductory html elements (in the form of heading/possibly paragraph)
// add then the SVG frame, benefiting from the same widht and height
const width = 500;
const height = 500;

// TREEMAP
const treemapContainer = container
  .append('div')
  .attr('class', 'viz');

treemapContainer
  .append('h2')
  .attr('class', 'subtitle')
  .text('Treemap Diagram');

treemapContainer
  .append('p')
  .attr('class', 'subdescription')
  .text('Hover to highlight each project, its category and amount of pledges.');

const treemapSVG = treemapContainer
  .append('svg')
  .attr('viewBox', `0, 0 ${width} ${height}`);

// CIRCULAR PACKING
const packingContainer = container
  .append('div')
  .attr('class', 'viz');

packingContainer
  .append('h2')
  .attr('class', 'subtitle')
  .text('Circular Packing');

packingContainer
  .append('p')
  .attr('class', 'subdescription')
  .text('Hover to highlight each project, its category and amount of pledges.');


const packingSVG = packingContainer
  .append('svg')
  .attr('viewBox', `0, 0 ${width} ${height}`);


/* define a function to detail SVG elements for
- legend
- viz:
  - treemap
  - circular packing
*/
function drawViz(data) {
  // compute a hierarchy based on the JSON data
  const hierarchy = d3.hierarchy(data);
  // compute for each node the relative weight, through the _value_ property
  hierarchy.sum(d => d.value);
  // console.log(hierarchy);

  // consider every node
  const descendants = hierarchy.descendants();
  // console.log(descendants);

  // split the categories from the actual projects
  const categories = descendants.filter(descendant => descendant.depth === 1);

  // LEGEND
  // add a group element for each category (to later nest connected rect and text elements)
  // show the text element only when hovering on the rectangle elments
  // when hovering also expand the rectangle being hovered
  const legendGroups = legendSVG
    .selectAll('g.legend')
    .data(categories)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .on('mouseenter', function () {
      // expand the selected rectangle, contract every other one
      // restore on mouseout
      d3
        .selectAll('g.legend rect')
        .transition()
        .attr('width', 0);
      d3
        .select(this)
        .select('rect')
        .transition()
        .attr('x', 0)
        .attr('width', legendWidth);

      // introduce the text element with a small delay
      d3
        .select(this)
        .select('text')
        .transition()
        .delay(200)
        .style('opacity', 1);
    })
    .on('mouseout', function () {
      d3
        .selectAll('g.legend rect')
        .transition()
        .attr('x', (d, i) => legendWidth / categories.length * i)
        .attr('width', legendWidth / categories.length);

      d3
        .select(this)
        .select('text')
        .transition()
        .style('opacity', 0);
    });

  // add colored rectangles for each category
  legendGroups
    .append('rect')
    .attr('x', (d, i) => legendWidth / categories.length * i)
    .attr('y', 0)
    .attr('width', legendWidth / categories.length)
    .attr('height', legendHeight)
    .attr('fill', (d, i) => `hsl(${360 / categories.length * i}, 60%, 50%)`);

  // add text elements right above the rectangle elements
  legendGroups
    .append('text')
    .attr('x', legendWidth / 15)
    .attr('y', legendHeight / 2)
    .text(d => d.data.name)
    .attr('font-size', '0.6rem')
    .attr('fill', '#fff')
    .attr('alignment-baseline', 'middle')
    .style('pointer-events', 'none')
    .style('opacity', 0);


  // TREEMAP
  // define the layout function
  const treemap = d3.treemap();
  // format the data through the layout function
  // the function adds four important values in x0, x1, y0 and y1, to describe the starting and ending point
  // values in the 0-1 range
  const treemapData = treemap(hierarchy);
  // console.log(treemapData);

  // ! it is not possible to use the same descendants as before, as those do not possess the values just included through the layout function
  const descendantsTreemap = treemapData.descendants();
  const categoriesTreemap = descendantsTreemap.filter(descendant => descendant.depth === 1);
  const projectsTreemap = descendantsTreemap.filter(descendant => descendant.depth === 2);

  // include one rectangle for each category, with a color picked from the 0-360 spectrum
  treemapSVG
    .selectAll('rect.category')
    .data(categoriesTreemap)
    .enter()
    .append('rect')
    .attr('class', 'category')
    .attr('x', d => d.x0 * width)
    .attr('y', d => d.y0 * height)
    .attr('width', d => (d.x1 - d.x0) * width)
    .attr('height', d => (d.y1 - d.y0) * height)
    .attr('fill', (d, i) => `hsl(${360 / categories.length * i}, 60%, 50%)`);

  // include one re ctangle for each project, but show only the stroke
  treemapSVG
    .selectAll('rect.project')
    .data(projectsTreemap)
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


  // PACKING
  // repeat the same logc used in the treemap
  // layout function
  const pack = d3.pack();
  const packData = pack(hierarchy);
  // packData now has x, y and r values, for the coordinates of each circle and their radii

  // consider the categories and the projects repeating the same structure used for the treemap
  const descendantsPack = packData.descendants();
  const categoriesPack = descendantsPack.filter(descendant => descendant.depth === 1);
  const projectsPack = descendantsPack.filter(descendant => descendant.depth === 2);

  // instead of drawing rectangles, draw circle elements
  // based on the packData values
  packingSVG
    .selectAll('circle.category')
    .data(categoriesPack)
    .enter()
    .append('circle')
    .attr('class', 'category')
    .attr('cx', d => d.x * width)
    .attr('cy', d => d.y * height)
    .attr('r', d => d.r * width)
    .attr('fill', (d, i) => `hsl(${360 / categories.length * i}, 60%, 50%)`);

  // add the projects always as circles, but highlighting only the stroke
  // on hover detail the specific values
  packingSVG
    .selectAll('circle.project')
    .data(projectsPack)
    .enter()
    .append('circle')
    .attr('class', 'project')
    .attr('cx', d => d.x * width)
    .attr('cy', d => d.y * height)
    .attr('r', d => d.r * width)
    .attr('fill', 'transparent')
    .attr('stroke', '#33333322')
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
// call the drawViz function to detail the legend and the different layouts
fetch(URL)
  .then(res => res.json())
  .then((json) => {
    drawViz(json);
  });
