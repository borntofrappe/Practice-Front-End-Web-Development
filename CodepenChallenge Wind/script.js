

// introductory HTML elements
const container = d3
  .select('.container');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');

container
  .append('h1')
  .text('It\'s not just Wednesday');

const containerDetails = container
  .append('div')
  .attr('class', 'details');

containerDetails
  .append('p')
  .text('Select a leaf to show the windiest days in each month.')
  .style('display', 'inline')
  .style('display', 'inline');

const leaf = containerDetails
  .append('svg')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', '25')
  .attr('height', '25')
  .attr('viewBox', '0 0 26.458336 26.458401')
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


// SVG container
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


const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const containerMonths = containerFrame
  .selectAll('g')
  .data(months)
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(${width / 2} ${height / (months.length - 1) * i})`);

containerMonths
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .text(d => d);


containerMonths
  .append('path')
  .attr('d', `M 0 ${height / months.length / 4} v ${height / months.length / 2}`)
  .attr('stroke', 'hsl(240, 70%, 85%)')
  .attr('stroke-width', '1px')
  .attr('opacity', (d, i) => ((i === months.length - 1) ? 0 : 1));

const data = [
  {
    month: 'January',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'February',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'March',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'April',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'May',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'June',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'July',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'August',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'September',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'November',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  },
  {
    month: 'December',
    nodes: [
      { node: '5' },
      { node: '12' },
      { node: '16' },
      { node: '29' },
    ]
  }
];



const simulation = d3
  .forceSimulation(data[0].nodes)
  .velocityDecay(0);

const center = d3
  .forceCenter()
  .x(0)
  .y(0);

const charge = d3
  .forceManyBody()
  .strength(-width / 2);

function simulate() {
  const containerDays = containerMonths
    .selectAll('svg')
    .data(data[0].nodes)
    .enter()
    .append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', ((d) => { console.log(d); return '20'; }))
    .attr('height', '20')
    .attr('viewBox', '0 0 26.458336 26.458401')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .on('mouseenter', (d) => {
      tooltip
        .append('p')
        .text(`Day ${d.node}`);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', (d) => {
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

simulation
  .force('charge', charge)
  .force('center', center)
  .on('tick', simulate);
