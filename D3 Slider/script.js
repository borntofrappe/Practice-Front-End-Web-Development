/* globals d3 */
// global variables
const globals = {
  // number of data points
  points: 100,
  // boolean for the draggable slider
  isSelected: false,
  // where the slider ought to begin and its width
  begin: 40,
  width: 10,
  // color used in the visualization
  color: '#F54780'
};
// for the data create an arbitrary set of #globals.points numbers, gradually increasing in value
const data = [];
for (let i = 0; i < globals.points; i += 1) {
  data.push(i / 2 + Math.floor(Math.random() * 10));
}


// HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('D3 Slider');

container
  .append('p')
  .text('Enhancing a line chart with a draggable element');


// paragraph detailing the average value of the selected area
// ! update the text of the strong element when the slider is dragged
const selectionElement = container
  .append('p')
  .text('Average in the selected area: ')
  .append('strong');

// the element updated with a function, computing the average of the data points falling in the selected area
function updateSelection(beginSelection = 10, widthSelection = 10) {
  // find the data points in the selection, compute the average and include it in the selected element
  const selection = [...data.slice(beginSelection, beginSelection + widthSelection)];
  const averageSelection = d3.sum(selection) / selection.length;
  const formatSelection = d3.format('.4');

  selectionElement
    .text(formatSelection(averageSelection));
}
// immediately call the function with the values specified in the globals object
updateSelection(globals.begin, globals.width);

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 60
};

const width = 900 - (margin.left + margin.right);
const height = 400 - (margin.top + margin.bottom);

const containerSVG = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`);

const containerFrame = containerSVG
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// ! for the slider, include a defs block in which to detail a linear gradient
const containerDefs = containerSVG
  .insert('defs');

// SCALES
// horizontal scale based on the number of observations
const xScale = d3
  .scaleLinear()
  .domain([0, globals.points - 1])
  .range([0, width]);

// vertical scale based on the actual values
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

// AXES
// don't show any label on the horizontal axis
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickFormat('');

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

// limit the number of ticks on the vertical axis
const yAxis = d3
  .axisLeft(yScale)
  .ticks(5)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat(d => (d !== 0 ? d : ''));

containerFrame
  .append('g')
  .call(yAxis);

// line function
// horizontally using the index of the data point, vertically its value
const line = d3
  .line()
  .x((d, i) => xScale(i))
  .y(d => yScale(d));

// area function
// closely matching the line
const area = d3
  .area()
  .x((d, i) => xScale(i))
  .y0(yScale(0))
  .y1(d => yScale(d));

// path using the line function
containerFrame
  .append('path')
  .attr('d', line(data))
  .attr('fill', 'none')
  .attr('stroke', `${globals.color}aa`)
  .attr('stroke-width', '3px');

// path using the area function
containerFrame
  .append('path')
  .attr('d', area(data))
  .attr('fill', `${globals.color}11`)
  .attr('stroke', 'none');


// group nesting the element(s) used for the slider
const containerSlider = containerFrame
  .append('g');

// detail a linear gradient applied on a section of a rectangle used as overlay
// this linear gradient is moved programmatically depending on user input

const containerGradient = containerDefs
  .append('linearGradient')
  .attr('id', 'gradient');


function updateGradient(beginGradient = 10, widthGradient = 10) {
  const dataGradient = [
    { offset: '0%', color: 'transparent' },
    { offset: `${beginGradient}%`, color: 'transparent' },
    { offset: `${beginGradient}%`, color: `${globals.color}55` },
    { offset: `${beginGradient + widthGradient}%`, color: `${globals.color}55` },
    { offset: `${beginGradient + widthGradient}%`, color: 'transparent' },
  ];

  const update = containerGradient
    .selectAll('stop')
    .data(dataGradient);

  const enter = update
    .enter();

  enter
    .append('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);

  update
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);
}

updateGradient(globals.begin, globals.width);

// handling the slider with an overlay covering the entire viz
const overlay = containerSlider
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'url(#gradient)')
  .style('cursor', 'move');

// when the cursor is down set the boolean to track a selection to true
// mirror this behavior when the cursor goes back up
overlay
  .on('mousedown', () => {
    d3.event.preventDefault();
    globals.isSelected = true;
  });

overlay
  .on('mouseup', () => {
    d3.event.preventDefault();
    globals.isSelected = false;
  });

// listen for a mousemove event
overlay
  .on('mousemove', function () {
    // if the cursor is down on the visualization proceed finding the horizontal coordinate and updating the slider's position
    if (globals.isSelected) {
      // find the horizontal coordinate
      const mouse = d3.mouse(this);
      const [xCoor] = mouse;
      // compute the distance from the left edge
      const x = Math.floor(xCoor / width * 100);
      updateSelection(x);
      updateGradient(x);
    }
  });
