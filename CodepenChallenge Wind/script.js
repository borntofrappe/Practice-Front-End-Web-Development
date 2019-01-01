// introductory HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('It\'s not just Wednesday');

const containerDetails = container
  .append('div')
  .attr('class', 'details');

// add inline to the paragraph to show the nested SVG icon next to the text
containerDetails
  .append('p')
  .text('Select a leaf to show the windiest days in each month.')
  .style('display', 'inline');

// add the leaf icon through a series of path elements
const leaf = containerDetails
  .append('svg')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  // width and height dictate the size of the icon
  .attr('width', '25')
  .attr('height', '25')
  .attr('viewBox', '0 0 26.458336 26.458401')
  // ! by default the icon points upwards
  .attr('transform', 'rotate(120)');

leaf
  .append('path')
  .attr('fill', '#72ca65')
  .attr('d', 'M12.264 21.416s3.406-.337 2.087-.128c-1.263.2 1.021 3.162 2.43 2.866 0 0-.27-.15-.994.921-.415.614-3.523-3.66-3.523-3.66z');

leaf
  .append('path')
  .attr('fill', '#549b49')
  .attr('stroke', '#72ca65')
  .attr('stroke-width', '4')
  .attr('transform', 'matrix(.09318 0 0 .07942 -8.601 -15.435)')
  .attr('d', 'M234.285 213.95s-155.215 167.528 0 257.142c155.215-89.614 0-257.143 0-257.143z');


leaf
  .append('path')
  .attr('fill', 'none')
  .attr('stroke', '#72ca65')
  .attr('stroke-width', '.529')
  .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
  .attr('d', 'M61.988 124.643s-12.58-27.528 0-68.036M56.928 79.844s6.281-1.738 9.355-7.083M56.394 91.47s12.695-2.272 13.497-6.548M56.928 102.561s13.498-1.737 15.235-5.345');


leaf
  .append('path')
  .attr('fill', 'none')
  .attr('stroke', '#72ca65')
  .attr('stroke-width', '.529')
  .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
  .attr('d', 'M73.5 107.907c-.936 3.34-14.968 5.746-14.968 5.746s-7.883.029-9.206-2.617M56.928 102.561s-7.98-.03-9.681-2.676M56.394 91.47s-6.88-.656-8.391-3.113M56.928 79.844s-4.767-.747-5.145-3.96');


// TOOLTIP
const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');


// SVG frame
const margin = {
  top: 90,
  right: 25,
  bottom: 90,
  left: 20
};
const width = 400 - (margin.left + margin.right);
const height = 1600 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left} ${margin.top})`);

/* the data is structured as follows
an array, nesting one object for each month, with the following props

{
  month: nameOfMonth,
  days: []
}

days is an additional array with one object for each windy day
windy as in: stronger winds than an arbitrary threshold
the nested object is structured as follows
{
  day: integerOfDay,
  value: intensityOfWind
}
*/

const dataWind = [
  {
    month: 'January',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'February',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'March',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'April',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'May',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'June',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'July',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'August',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'September',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'October',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'November',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 18
      },
      {
        day: 11,
        value: 14
      },
      {
        day: 21,
        value: 13
      },
    ]
  },
  {
    month: 'December',
    days: [
      {
        day: 2,
        value: 10
      },
      {
        day: 9,
        value: 7
      },
      {
        day: 11,
        value: 10
      },
      {
        day: 21,
        value: 20
      },
    ]
  }
];


// scale for the size of the leafs
// based on the minimum and maximum value of the days
// ! all values, to avoid misconceptions between months

const dataWindDays = [];
for (let i = 0; i < dataWind.length; i += 1) {
  const dataWindDay = dataWind[i].days.map(d => d.value);
  dataWindDays.push(...dataWindDay);
}

const valueScale = d3
  .scaleLinear()
  .domain(d3.extent(dataWindDays))
  .range([20, 50]);


// TODO comment the function
// TODO figure out how to implement the force layout to push later days further
function simulate(frame, nodes) {
  // create a container for the months
  const containerDays = frame
    .selectAll('svg')
    .data(nodes)
    .enter()
    .append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', d => valueScale(d.value))
    .attr('height', d => valueScale(d.value))
    .attr('viewBox', '0 0 26.458336 26.458401')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .on('mouseenter', (d) => {
      tooltip
        .append('p')
        .html(`Day <strong>${d.day}</strong>`);

      tooltip
        .append('p')
        .html(`Wind intensity <strong>${d.value} Km/h</strong>`);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();
    });

  containerDays
    .append('path')
    .attr('fill', '#72ca65')
    .attr('d', 'M12.264 21.416s3.406-.337 2.087-.128c-1.263.2 1.021 3.162 2.43 2.866 0 0-.27-.15-.994.921-.415.614-3.523-3.66-3.523-3.66z');

  containerDays
    .append('path')
    .attr('fill', '#549b49')
    .attr('stroke', '#72ca65')
    .attr('stroke-width', '4')
    .attr('transform', 'matrix(.09318 0 0 .07942 -8.601 -15.435)')
    .attr('d', 'M234.285 213.95s-155.215 167.528 0 257.142c155.215-89.614 0-257.143 0-257.143z');


  containerDays
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#72ca65')
    .attr('stroke-width', '.529')
    .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
    .attr('d', 'M61.988 124.643s-12.58-27.528 0-68.036M56.928 79.844s6.281-1.738 9.355-7.083M56.394 91.47s12.695-2.272 13.497-6.548M56.928 102.561s13.498-1.737 15.235-5.345');

  containerDays
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#72ca65')
    .attr('stroke-width', '.529')
    .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
    .attr('d', 'M73.5 107.907c-.936 3.34-14.968 5.746-14.968 5.746s-7.883.029-9.206-2.617M56.928 102.561s-7.98-.03-9.681-2.676M56.394 91.47s-6.88-.656-8.391-3.113M56.928 79.844s-4.767-.747-5.145-3.96');

}


// loop through the array of data and add elements for each item
for (let i = 0; i < dataWind.length; i += 1) {
  // add a group for each month
  const containerMonth = containerFrame
    .append('g')
    // position the group in the center horizontally and at a fraction of the height vertically
    .attr('transform', `translate(${width / 2} ${(height / (dataWind.length - 1)) * i})`);

  // add a text label for the month
  containerMonth
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .text(dataWind[i].month);

  // add a line connecting the label to one another
  // ! for all but the last label
  if (i < dataWind.length - 1) {
    containerMonth
      .append('path')
      .attr('d', `M 0 ${height / dataWind.length / 4} v ${height / dataWind.length / 2}`)
      .attr('stroke', 'hsl(240, 70%, 90%)')
      .attr('stroke-width', '1px')
      .attr('opacity', (i === dataWind.length - 1) ? 0 : 1);
  }

  // simulation for the leafs centered on each group
  // using the nodes described for each object under the `days` object
  const simulation = d3
    .forceSimulation(dataWind[i].days)
    .velocityDecay(0);

  // each simulation centered in the group element
  const center = d3
    .forceCenter()
    .x(0)
    .y(0);

  // each simulation pushing the nodes from the center
  const charge = d3
    .forceManyBody()
    .strength(width);

  // add a simulation to the container, for the nodes using the simulate function
  simulation
    .force('charge', charge)
    .force('center', center)
    .on('tick', simulate(containerMonth, dataWind[i].days));
}

