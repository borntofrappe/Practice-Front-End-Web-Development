// introductory HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('It\'s not just Wednesday');

const details = [
  'The further from the center, the later in the month',
  'The larger, the darker the leaf, the stronger the wind',
  'Press a leaf to see how windy the day was'
];

const containerDetails = container
  .selectAll('div.details')
  .data(details)
  .enter()
  .append('div')
  .attr('class', 'details');


// add inline to the paragraph to show the nested SVG icon next to the text
containerDetails
  .append('p')
  .text(d => d)
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
const height = 2000 - (margin.top + margin.bottom);

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
! integerOfDay and intensityOfWind are randomly generated, between a minimum and maximum value
*/

const data = [
  {
    month: 'January',
    days: []
  },
  {
    month: 'February',
    days: []
  },
  {
    month: 'March',
    days: []
  },
  {
    month: 'April',
    days: []
  },
  {
    month: 'May',
    days: []
  },
  {
    month: 'June',
    days: []
  },
  {
    month: 'July',
    days: []
  },
  {
    month: 'August',
    days: []
  },
  {
    month: 'September',
    days: []
  },
  {
    month: 'October',
    days: []
  },
  {
    month: 'November',
    days: []
  },
  {
    month: 'December',
    days: []
  }
];

// generate the random data for each month
for (let i = 0; i < data.length; i += 1) {
  let day = 1;
  while (day <= 28) {
    day += Math.round(Math.random() * 5);
    const value = Math.round(Math.random() * 20) + 20;
    data[i].days.push({
      day,
      value
    });
    day += Math.round(Math.random() * 10);
  }
}

// scale for the size of the leafs
// based on the minimum and maximum value of the days
// ! all values, to avoid misconceptions between months

const dataDays = [];
for (let i = 0; i < data.length; i += 1) {
  const dataDay = data[i].days.map(d => d.value);
  dataDays.push(...dataDay);
}

const valueScale = d3
  .scaleLinear()
  .domain(d3.extent(dataDays))
  .range([20, 80]);

const dayScaleX = d3
  .scaleLinear()
  .domain([1, 31])
  .range([0, width / 2]);

const dayScaleY = d3
  .scaleLinear()
  .domain([1, 31])
  .range([0, height / data.length / 4]);

const colorScale = d3
  .scaleLinear()
  .domain(d3.extent(dataDays))
  .range([80, 50]);

function randomDirection() {
  const direction = Math.random() > 0.5 ? 1 : -1;
  return direction;
}

// loop through the array of data and add elements for each item
for (let i = 0; i < data.length; i += 1) {
  // add a group for each month
  const containerMonth = containerFrame
    .append('g')
    // position the group in the center horizontally and at a fraction of the height vertically
    .attr('transform', `translate(${width / 2} ${(height / (data.length - 1)) * i})`);

  // add a text label for the month
  containerMonth
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', '#072003')
    .attr('font-size', '1.25rem')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('text-transform', 'uppercase')
    .text(data[i].month);

  // add a line connecting the label to one another
  // ! for all but the last label
  if (i < data.length - 1) {
    containerMonth
      .append('path')
      .attr('d', `M 0 ${height / data.length / 4} v ${height / data.length / 2}`)
      .attr('stroke', 'hsl(240, 70%, 90%)')
      .attr('stroke-width', '1px')
      .attr('opacity', (i === data.length - 1) ? 0 : 1);
  }

  const containerDays = containerMonth
    .selectAll('svg')
    .data(data[i].days)
    .enter()
    .append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', d => valueScale(d.value))
    .attr('height', d => valueScale(d.value))
    .attr('viewBox', '0 0 26.458336 26.458401')
    .attr('x', d => -valueScale(d.value) / 2)
    .attr('y', d => -valueScale(d.value) / 2)
    .on('click', (d) => {
      const text = data[i].month;
      tooltip
        .append('p')
        .html(`<strong>${text}</strong> <strong>${d.day}</strong>`);

      tooltip
        .append('p')
        .html(`Wind intensity <strong>${d.value} m/s</strong>`);

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
    .attr('fill', d => `hsl(112, 49%, ${colorScale(d.value)}%)`)
    .attr('d', 'M12.264 21.416s3.406-.337 2.087-.128c-1.263.2 1.021 3.162 2.43 2.866 0 0-.27-.15-.994.921-.415.614-3.523-3.66-3.523-3.66z');

  containerDays
    .append('path')
    .attr('fill', d => `hsl(112, 36%, ${colorScale(d.value) - 20}%)`)
    .attr('stroke', d => `hsl(112, 49%, ${colorScale(d.value)}%)`)
    .attr('stroke-width', '4')
    .attr('transform', 'matrix(.09318 0 0 .07942 -8.601 -15.435)')
    .attr('d', 'M234.285 213.95s-155.215 167.528 0 257.142c155.215-89.614 0-257.143 0-257.143z');


  containerDays
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', d => `hsl(112, 49%, ${colorScale(d.value)}%)`)
    .attr('stroke-width', '.529')
    .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
    .attr('d', 'M61.988 124.643s-12.58-27.528 0-68.036M56.928 79.844s6.281-1.738 9.355-7.083M56.394 91.47s12.695-2.272 13.497-6.548M56.928 102.561s13.498-1.737 15.235-5.345');

  containerDays
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', d => `hsl(112, 49%, ${colorScale(d.value)}%)`)
    .attr('stroke-width', '.529')
    .attr('transform', 'matrix(.35217 0 0 .30017 -8.601 -15.435)')
    .attr('d', 'M73.5 107.907c-.936 3.34-14.968 5.746-14.968 5.746s-7.883.029-9.206-2.617M56.928 102.561s-7.98-.03-9.681-2.676M56.394 91.47s-6.88-.656-8.391-3.113M56.928 79.844s-4.767-.747-5.145-3.96');

  d3
    .selectAll('text')
    .raise()
    .style('pointer-events', 'none');

  containerDays
    .transition()
    .duration(250)
    .delay((d, index) => index * 25 + i * 150)
    .attr('x', d => (dayScaleX(d.day) * randomDirection()) - valueScale(d.value) / 2)
    .attr('y', d => (dayScaleY(d.day) * randomDirection()) - valueScale(d.value) / 2);
}

leaf
  .on('click', () => {
    tooltip
      .append('p')
      .text('Not this leaf :P');
    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX} px`)
      .style('top', `${d3.event.pageY} px`);
  })
  .on('mouseout', () => {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });