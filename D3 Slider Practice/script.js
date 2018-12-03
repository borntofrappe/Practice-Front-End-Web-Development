/* globals d3 */
const happy = [
  {
    time: '2013-12-08',
    value: 29
  },
  {
    time: '2013-12-15',
    value: 33
  },
  {
    time: '2013-12-22',
    value: 50
  },
  {
    time: '2013-12-29',
    value: 76
  },
  {
    time: '2014-01-05',
    value: 30
  },
  {
    time: '2014-01-12',
    value: 30
  },
  {
    time: '2014-01-19',
    value: 29
  },
  {
    time: '2014-01-26',
    value: 32
  },
  {
    time: '2014-02-02',
    value: 31
  },
  {
    time: '2014-02-09',
    value: 44
  },
  {
    time: '2014-02-16',
    value: 32
  },
  {
    time: '2014-02-23',
    value: 33
  },
  {
    time: '2014-03-02',
    value: 37
  },
  {
    time: '2014-03-09',
    value: 33
  },
  {
    time: '2014-03-16',
    value: 39
  },
  {
    time: '2014-03-23',
    value: 34
  },
  {
    time: '2014-03-30',
    value: 35
  },
  {
    time: '2014-04-06',
    value: 35
  },
  {
    time: '2014-04-13',
    value: 40
  },
  {
    time: '2014-04-20',
    value: 38
  },
  {
    time: '2014-04-27',
    value: 34
  },
  {
    time: '2014-05-04',
    value: 37
  },
  {
    time: '2014-05-11',
    value: 39
  },
  {
    time: '2014-05-18',
    value: 35
  },
  {
    time: '2014-05-25',
    value: 34
  },
  {
    time: '2014-06-01',
    value: 34
  },
  {
    time: '2014-06-08',
    value: 33
  },
  {
    time: '2014-06-15',
    value: 36
  },
  {
    time: '2014-06-22',
    value: 31
  },
  {
    time: '2014-06-29',
    value: 34
  },
  {
    time: '2014-07-06',
    value: 31
  },
  {
    time: '2014-07-13',
    value: 31
  },
  {
    time: '2014-07-20',
    value: 32
  },
  {
    time: '2014-07-27',
    value: 33
  },
  {
    time: '2014-08-03',
    value: 35
  },
  {
    time: '2014-08-10',
    value: 36
  },
  {
    time: '2014-08-17',
    value: 35
  },
  {
    time: '2014-08-24',
    value: 32
  },
  {
    time: '2014-08-31',
    value: 34
  },
  {
    time: '2014-09-07',
    value: 34
  },
  {
    time: '2014-09-14',
    value: 34
  },
  {
    time: '2014-09-21',
    value: 36
  },
  {
    time: '2014-09-28',
    value: 36
  },
  {
    time: '2014-10-05',
    value: 35
  },
  {
    time: '2014-10-12',
    value: 35
  },
  {
    time: '2014-10-19',
    value: 58
  },
  {
    time: '2014-10-26',
    value: 55
  },
  {
    time: '2014-11-02',
    value: 42
  },
  {
    time: '2014-11-09',
    value: 40
  },
  {
    time: '2014-11-16',
    value: 39
  },
  {
    time: '2014-11-23',
    value: 44
  },
  {
    time: '2014-11-30',
    value: 37
  },
  {
    time: '2014-12-07',
    value: 38
  },
  {
    time: '2014-12-14',
    value: 42
  },
  {
    time: '2014-12-21',
    value: 52
  },
  {
    time: '2014-12-28',
    value: 98
  },
  {
    time: '2015-01-04',
    value: 36
  },
  {
    time: '2015-01-11',
    value: 36
  },
  {
    time: '2015-01-18',
    value: 33
  },
  {
    time: '2015-01-25',
    value: 34
  },
  {
    time: '2015-02-01',
    value: 34
  },
  {
    time: '2015-02-08',
    value: 49
  },
  {
    time: '2015-02-15',
    value: 36
  },
  {
    time: '2015-02-22',
    value: 32
  },
  {
    time: '2015-03-01',
    value: 37
  },
  {
    time: '2015-03-08',
    value: 34
  },
  {
    time: '2015-03-15',
    value: 35
  },
  {
    time: '2015-03-22',
    value: 32
  },
  {
    time: '2015-03-29',
    value: 37
  },
  {
    time: '2015-04-05',
    value: 38
  },
  {
    time: '2015-04-12',
    value: 34
  },
  {
    time: '2015-04-19',
    value: 33
  },
  {
    time: '2015-04-26',
    value: 33
  },
  {
    time: '2015-05-03',
    value: 35
  },
  {
    time: '2015-05-10',
    value: 44
  },
  {
    time: '2015-05-17',
    value: 33
  },
  {
    time: '2015-05-24',
    value: 32
  },
  {
    time: '2015-05-31',
    value: 34
  },
  {
    time: '2015-06-07',
    value: 33
  },
  {
    time: '2015-06-14',
    value: 34
  },
  {
    time: '2015-06-21',
    value: 39
  },
  {
    time: '2015-06-28',
    value: 35
  },
  {
    time: '2015-07-05',
    value: 33
  },
  {
    time: '2015-07-12',
    value: 34
  },
  {
    time: '2015-07-19',
    value: 33
  },
  {
    time: '2015-07-26',
    value: 34
  },
  {
    time: '2015-08-02',
    value: 36
  },
  {
    time: '2015-08-09',
    value: 36
  },
  {
    time: '2015-08-16',
    value: 32
  },
  {
    time: '2015-08-23',
    value: 34
  },
  {
    time: '2015-08-30',
    value: 37
  },
  {
    time: '2015-09-06',
    value: 36
  },
  {
    time: '2015-09-13',
    value: 36
  },
  {
    time: '2015-09-20',
    value: 37
  },
  {
    time: '2015-09-27',
    value: 36
  },
  {
    time: '2015-10-04',
    value: 35
  },
  {
    time: '2015-10-11',
    value: 35
  },
  {
    time: '2015-10-18',
    value: 35
  },
  {
    time: '2015-10-25',
    value: 37
  },
  {
    time: '2015-11-01',
    value: 35
  },
  {
    time: '2015-11-08',
    value: 47
  },
  {
    time: '2015-11-15',
    value: 33
  },
  {
    time: '2015-11-22',
    value: 42
  },
  {
    time: '2015-11-29',
    value: 36
  },
  {
    time: '2015-12-06',
    value: 37
  },
  {
    time: '2015-12-13',
    value: 39
  },
  {
    time: '2015-12-20',
    value: 48
  },
  {
    time: '2015-12-27',
    value: 100
  },
  {
    time: '2016-01-03',
    value: 34
  },
  {
    time: '2016-01-10',
    value: 34
  },
  {
    time: '2016-01-17',
    value: 31
  },
  {
    time: '2016-01-24',
    value: 33
  },
  {
    time: '2016-01-31',
    value: 34
  },
  {
    time: '2016-02-07',
    value: 47
  },
  {
    time: '2016-02-14',
    value: 43
  },
  {
    time: '2016-02-21',
    value: 31
  },
  {
    time: '2016-02-28',
    value: 32
  },
  {
    time: '2016-03-06',
    value: 35
  },
  {
    time: '2016-03-13',
    value: 34
  },
  {
    time: '2016-03-20',
    value: 42
  },
  {
    time: '2016-03-27',
    value: 38
  },
  {
    time: '2016-04-03',
    value: 32
  },
  {
    time: '2016-04-10',
    value: 33
  },
  {
    time: '2016-04-17',
    value: 32
  },
  {
    time: '2016-04-24',
    value: 31
  },
  {
    time: '2016-05-01',
    value: 37
  },
  {
    time: '2016-05-08',
    value: 44
  },
  {
    time: '2016-05-15',
    value: 31
  },
  {
    time: '2016-05-22',
    value: 32
  },
  {
    time: '2016-05-29',
    value: 32
  },
  {
    time: '2016-06-05',
    value: 31
  },
  {
    time: '2016-06-12',
    value: 32
  },
  {
    time: '2016-06-19',
    value: 40
  },
  {
    time: '2016-06-26',
    value: 32
  },
  {
    time: '2016-07-03',
    value: 36
  },
  {
    time: '2016-07-10',
    value: 31
  },
  {
    time: '2016-07-17',
    value: 32
  },
  {
    time: '2016-07-24',
    value: 33
  },
  {
    time: '2016-07-31',
    value: 35
  },
  {
    time: '2016-08-07',
    value: 38
  },
  {
    time: '2016-08-14',
    value: 39
  },
  {
    time: '2016-08-21',
    value: 36
  },
  {
    time: '2016-08-28',
    value: 35
  },
  {
    time: '2016-09-04',
    value: 35
  },
  {
    time: '2016-09-11',
    value: 35
  },
  {
    time: '2016-09-18',
    value: 32
  },
  {
    time: '2016-09-25',
    value: 34
  },
  {
    time: '2016-10-02',
    value: 33
  },
  {
    time: '2016-10-09',
    value: 36
  },
  {
    time: '2016-10-16',
    value: 32
  },
  {
    time: '2016-10-23',
    value: 41
  },
  {
    time: '2016-10-30',
    value: 40
  },
  {
    time: '2016-11-06',
    value: 32
  },
  {
    time: '2016-11-13',
    value: 33
  },
  {
    time: '2016-11-20',
    value: 40
  },
  {
    time: '2016-11-27',
    value: 34
  },
  {
    time: '2016-12-04',
    value: 34
  },
  {
    time: '2016-12-11',
    value: 36
  },
  {
    time: '2016-12-18',
    value: 44
  },
  {
    time: '2016-12-25',
    value: 85
  },
  {
    time: '2017-01-01',
    value: 54
  },
  {
    time: '2017-01-08',
    value: 35
  },
  {
    time: '2017-01-15',
    value: 31
  },
  {
    time: '2017-01-22',
    value: 36
  },
  {
    time: '2017-01-29',
    value: 32
  },
  {
    time: '2017-02-05',
    value: 38
  },
  {
    time: '2017-02-12',
    value: 51
  },
  {
    time: '2017-02-19',
    value: 31
  },
  {
    time: '2017-02-26',
    value: 32
  },
  {
    time: '2017-03-05',
    value: 36
  },
  {
    time: '2017-03-12',
    value: 35
  },
  {
    time: '2017-03-19',
    value: 31
  },
  {
    time: '2017-03-26',
    value: 32
  },
  {
    time: '2017-04-02',
    value: 30
  },
  {
    time: '2017-04-09',
    value: 38
  },
  {
    time: '2017-04-16',
    value: 37
  },
  {
    time: '2017-04-23',
    value: 32
  },
  {
    time: '2017-04-30',
    value: 33
  },
  {
    time: '2017-05-07',
    value: 36
  },
  {
    time: '2017-05-14',
    value: 45
  },
  {
    time: '2017-05-21',
    value: 30
  },
  {
    time: '2017-05-28',
    value: 31
  },
  {
    time: '2017-06-04',
    value: 30
  },
  {
    time: '2017-06-11',
    value: 33
  },
  {
    time: '2017-06-18',
    value: 41
  },
  {
    time: '2017-06-25',
    value: 33
  },
  {
    time: '2017-07-02',
    value: 34
  },
  {
    time: '2017-07-09',
    value: 31
  },
  {
    time: '2017-07-16',
    value: 31
  },
  {
    time: '2017-07-23',
    value: 31
  },
  {
    time: '2017-07-30',
    value: 35
  },
  {
    time: '2017-08-06',
    value: 39
  },
  {
    time: '2017-08-13',
    value: 37
  },
  {
    time: '2017-08-20',
    value: 31
  },
  {
    time: '2017-08-27',
    value: 31
  },
  {
    time: '2017-09-03',
    value: 35
  },
  {
    time: '2017-09-10',
    value: 32
  },
  {
    time: '2017-09-17',
    value: 33
  },
  {
    time: '2017-09-24',
    value: 35
  },
  {
    time: '2017-10-01',
    value: 33
  },
  {
    time: '2017-10-08',
    value: 37
  },
  {
    time: '2017-10-15',
    value: 51
  },
  {
    time: '2017-10-22',
    value: 33
  },
  {
    time: '2017-10-29',
    value: 37
  },
  {
    time: '2017-11-05',
    value: 34
  },
  {
    time: '2017-11-12',
    value: 34
  },
  {
    time: '2017-11-19',
    value: 40
  },
  {
    time: '2017-11-26',
    value: 33
  },
  {
    time: '2017-12-03',
    value: 34
  },
  {
    time: '2017-12-10',
    value: 35
  },
  {
    time: '2017-12-17',
    value: 40
  },
  {
    time: '2017-12-24',
    value: 52
  },
  {
    time: '2017-12-31',
    value: 87
  },
  {
    time: '2018-01-07',
    value: 33
  },
  {
    time: '2018-01-14',
    value: 32
  },
  {
    time: '2018-01-21',
    value: 32
  },
  {
    time: '2018-01-28',
    value: 30
  },
  {
    time: '2018-02-04',
    value: 36
  },
  {
    time: '2018-02-11',
    value: 54
  },
  {
    time: '2018-02-18',
    value: 29
  },
  {
    time: '2018-02-25',
    value: 35
  },
  {
    time: '2018-03-04',
    value: 34
  },
  {
    time: '2018-03-11',
    value: 31
  },
  {
    time: '2018-03-18',
    value: 31
  },
  {
    time: '2018-03-25',
    value: 33
  },
  {
    time: '2018-04-01',
    value: 35
  },
  {
    time: '2018-04-08',
    value: 30
  },
  {
    time: '2018-04-15',
    value: 28
  },
  {
    time: '2018-04-22',
    value: 28
  },
  {
    time: '2018-04-29',
    value: 31
  },
  {
    time: '2018-05-06',
    value: 33
  },
  {
    time: '2018-05-13',
    value: 42
  },
  {
    time: '2018-05-20',
    value: 28
  },
  {
    time: '2018-05-27',
    value: 30
  },
  {
    time: '2018-06-03',
    value: 29
  },
  {
    time: '2018-06-10',
    value: 31
  },
  {
    time: '2018-06-17',
    value: 37
  },
  {
    time: '2018-06-24',
    value: 28
  },
  {
    time: '2018-07-01',
    value: 32
  },
  {
    time: '2018-07-08',
    value: 30
  },
  {
    time: '2018-07-15',
    value: 29
  },
  {
    time: '2018-07-22',
    value: 30
  },
  {
    time: '2018-07-29',
    value: 32
  },
  {
    time: '2018-08-05',
    value: 37
  },
  {
    time: '2018-08-12',
    value: 36
  },
  {
    time: '2018-08-19',
    value: 33
  },
  {
    time: '2018-08-26',
    value: 33
  },
  {
    time: '2018-09-02',
    value: 35
  },
  {
    time: '2018-09-09',
    value: 32
  },
  {
    time: '2018-09-16',
    value: 30
  },
  {
    time: '2018-09-23',
    value: 29
  },
  {
    time: '2018-09-30',
    value: 31
  },
  {
    time: '2018-10-07',
    value: 31
  },
  {
    time: '2018-10-14',
    value: 33
  },
  {
    time: '2018-10-21',
    value: 29
  },
  {
    time: '2018-10-28',
    value: 34
  },
  {
    time: '2018-11-04',
    value: 46
  },
  {
    time: '2018-11-11',
    value: 31
  },
  {
    time: '2018-11-18',
    value: 38
  },
  {
    time: '2018-11-25',
    value: 28
  }
];

// global variables
const globals = {
  // boolean for the draggable slider
  isSelected: false,
  // where the slider ought to begin and its width
  begin: 40,
  width: 10,
  // color used in the visualization
  color: '#F54780'
};

// HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('D3 Slider Practice');

container
  .append('p')
  .text('Using real data from Google Trends');


// paragraph detailing the average value of the selected area
// ! update the text of the strong element when the slider is dragged
const selectionElement = container
  .append('p')
  .text('Search interest for the word happy: ')
  .append('strong');

// the element updated with a function, computing the average of the data points falling in the selected area
function updateSelection(beginSelection = 10, widthSelection = 10) {
  // find the data points in the selection, compute the average and include it in the selected element
  const selection = [...happy.slice(beginSelection, beginSelection + widthSelection)];
  const selectionValues = selection.map(observation => observation.value);
  const averageSelection = d3.sum(selectionValues) / selectionValues.length;
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
  .scaleBand()
  .domain(d3.range(happy.length))
  .range([0, width]);

// vertical scale based on the actual values
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(happy, d => d.value)])
  .range([height, 0]);

// AXES
const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat((d, i) => ((i % 50 === 0) ? happy[i].time : ''));

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
  .y(d => yScale(d.value));

// area function
// closely matching the line
const area = d3
  .area()
  .x((d, i) => xScale(i))
  .y0(yScale(0))
  .y1(d => yScale(d.value));

// path using the line function
containerFrame
  .append('path')
  .attr('d', line(happy))
  .attr('fill', 'none')
  .attr('stroke', `${globals.color}aa`)
  .attr('stroke-width', '3px');

// path using the area function
containerFrame
  .append('path')
  .attr('d', area(happy))
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
      // for the selection function use the length of the dataset
      // for the gradient use 100, functioning with percentages (if the dataset is 100 data points long, the two match same )
      const xSelection = Math.floor(xCoor / width * happy.length);
      const xGradient = Math.floor(xCoor / width * 100);
      updateSelection(xSelection);
      updateGradient(xGradient);
    }
  });
