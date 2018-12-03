/* globals d3 */
/*
! still much to do, the goal is to have a slider which is positioned exactly where the cursor lays it and a slider which can be also resized
*/
// global variables
const globals = {
  max: 100,
  isSelected: false,
  begin: 10,
  width: 10
};
// for the data create an arbitrary set of max numbers, potentially increasing in value
const data = [];

for (let i = 0; i < globals.max; i += 1) {
  data.push(i / 2 + Math.floor(Math.random() * 10));
}


// introductory elements for the entire visualization
const container = d3
  .select('.container');

container
  .append('h1')
  .text('D3 Slider');

container
  .append('p')
  .text('Enhancing a line chart with a draggable element');

// paragraph detailing the average value of the selected area (later to be changed as the selection area changes)
const paragraphSelection = container
  .append('p');
// paragraph updated through a function (later called when the slider is modified in its horizontal position)
function updateSelection(begin = 10) {
  globals.begin = begin;
  const selection = [...data.slice(globals.begin, globals.begin + globals.width)];
  const averageSelection = d3.sum(selection) / selection.length;
  const formatSelection = d3.format('.4');

  paragraphSelection
    .html(`Average in the selected area: ${formatSelection(averageSelection)}`);
}
updateSelection();

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 60
};

const width = 900 - (margin.left + margin.right);
const height = 400 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES
const xScale = d3
  .scaleLinear()
  .domain([0, globals.max - 1])
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

// AXES
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickFormat('');

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

const yAxis = d3
  .axisLeft(yScale)
  .ticks(7)
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
  .attr('stroke', '#B89C1AAA')
  .attr('stroke-width', '2px');

// path using the area function
containerFrame
  .append('path')
  .attr('d', area(data))
  .attr('fill', '#B89C1A22')
  .attr('stroke', 'none');


// group nesting the rectangle used for the slider
// detail a clip to crop out the stroke atop and below the rectangle
const clip = containerFrame
  .append('clipPath')
  .attr('id', 'clip');

clip
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height);

const containerSlider = containerFrame
  .append('g')
  .attr('clip-path', 'url(#clip)');

// detail a rectangle covering the prescribed selected area
// vertically going past the parent element (ultimately cropped with the clip path to show only horizontal elements)
const rectSlider = containerSlider
  .append('rect')
  .attr('x', xScale(globals.begin))
  .attr('y', -4)
  .attr('width', xScale(globals.width))
  .attr('height', height + 8)
  .attr('fill', '#B89C1A44')
  .attr('stroke', '#B89C1A')
  .attr('stroke-width', '4px');


// handling the slider with an overlay covering the entire viz
const overlay = containerSlider
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'transparent')
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
  .on('mousemove', () => {
    // if the cursor is down on the visualization proceed finding the horizontal coordinate and updating the slider's position
    if (globals.isSelected) {
      const svg = document.querySelector('svg');
      const rect = svg.getBoundingClientRect();
      const xCoor = d3.event.pageX - rect.x;

      rectSlider
        .attr('x', xCoor);

      // modify the text in the pargraph selection to match the new set of data
      // based on the value retrieved from the scale, from the actual coordinate
      const xCoorScale = Math.floor(xScale.invert(xCoor));
      updateSelection(xCoorScale);
    }
  });
