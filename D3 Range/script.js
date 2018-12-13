/* globals d3 */
// data in the form of an array of objects, detailing values as % percentages
const data = [
  {
    country: 'Belgium',
    value: 22.7
  },
  {
    country: 'Bulgaria',
    value: 8.6
  },
  {
    country: 'Czechia',
    value: 16.6
  },
  {
    country: 'Denmark',
    value: 21.5
  },
  {
    country: 'Germany',
    value: 15.8
  },
  {
    country: 'Estonia',
    value: 20.9
  },
  {
    country: 'Ireland',
    value: 20.0
  },
  {
    country: 'Greece',
    value: 6.2
  },
  {
    country: 'Spain',
    value: 20.1
  },
  {
    country: 'France',
    value: 29.3
  },
  {
    country: 'Croatia',
    value: 9.2
  },
  {
    country: 'Italy',
    value: 15.3
  },
  {
    country: 'Cyprus',
    value: 7.9
  },
  {
    country: 'Latvia',
    value: 10.9
  },
  {
    country: 'Lithuania',
    value: 9.6
  },
  {
    country: 'Luxembourg',
    value: 26.4
  },
  {
    country: 'Hungary',
    value: 10.8
  },
  {
    country: 'Malta',
    value: 14.1
  },
  {
    country: 'Netherlands',
    value: 22.2
  },
  {
    country: 'Austria',
    value: 19.3
  },
  {
    country: 'Poland',
    value: 9.7
  },
  {
    country: 'Portugal',
    value: 12.7
  },
  {
    country: 'Romania',
    value: 7.1
  },
  {
    country: 'Slovenia',
    value: 11.9
  },
  {
    country: 'Slovakia',
    value: 12.5
  },
  {
    country: 'Finland',
    value: 18.1
  },
  {
    country: 'Sweden',
    value: 20.8
  },
  {
    country: 'United Kingdom',
    value: 20.3
  },
  {
    country: 'Iceland',
    value: 31.9
  },
  {
    country: 'Norway',
    value: 27.1
  },
  {
    country: 'Switzerland',
    value: 30.5
  },
  {
    country: 'Macedonia',
    value: 2.9
  },
  {
    country: 'Serbia',
    value: 6.6
  }
];

// global variables to centralize the values used for the input and the color
// the idea is to show a subset of the data, and later allow to alter this number
// within boundaries
const countries = {
  min: 12,
  max: data.length,
  color: '#f24537'
};

// CONTAINER && TOOLTIP
const container = d3
  .select('.container');

const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// INTRODUCTORY HTML ELEMENTS
const containerHTML = container
  .append('div')
  .attr('class', 'introduction');

containerHTML
  .append('h1')
  .attr('class', 'title')
  .text('Cultural Events in Europe');

// wrap the number within a strong element, to later target and change the value as the number of countries changes
containerHTML
  .append('p')
  .attr('class', 'description')
  .html(`Highlighting the <strong style="color: ${countries.color}">${countries.min}</strong> countries going to the cinema most frequently.`);

containerHTML
  .append('p')
  .attr('class', 'description')
  .text('Use the following input to change the number of countries.');


// INPUT TYPE RANGE
// wrap the input between two elements used to show the minimum and maximum values
const containerInput = containerHTML
  .append('div')
  // use D3 to create an horizontal row in which to wrap the input in between the minimum and maximum values
  .style('display', 'flex')
  .style('padding', '0.5rem 0.25rem')
  .style('color', '#fff')
  .style('background', countries.color)
  .style('border-radius', '5px');

containerInput
  .append('p')
  .text(countries.min);

const inputRange = containerInput
  .append('input')
  .attr('type', 'range')
  .attr('class', 'range')
  .attr('min', countries.min)
  .attr('max', data.length)
  .attr('value', countries.min)

containerInput
  .append('p')
  .text(countries.max);

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 90
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES && AXES
// ! describing only the range as the domain is added with the data
const xScale = d3
  .scaleLinear()
  .range([0, width]);

const xAxis = d3
  .axisBottom(xScale)
  .tickSize(0)
  .tickPadding(5);

containerFrame
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .attr('class', 'x axis')
  .call(xAxis);

// use an ordinal scale for the y dimension
const yScale = d3
  .scaleBand()
  .range([0, height]);

const yAxis = d3
  .axisLeft(yScale)
  .tickSize(0)
  .tickPadding(10);

containerFrame
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis);


// function plotting the lollipop chart according to the subset of data
function plotData(dataset) {
  // update the scale with the domain, on the basis of the dataset
  xScale
    .domain([0, d3.max(dataset, d => d.value) * 1.1]);
  yScale
    .domain(dataset.map(d => d.country));

  // select the axes and update their appearance
  // ! technically it is only the y axis changing, as the added values are always less than the existing ones
  // updating the x axis is overkill
  d3
    .select('g.x.axis')
    .transition()
    .call(d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(5));

  d3
    .select('g.y.axis')
    .transition()
    .call(d3
      .axisLeft(yScale)
      .tickSize(0)
      .tickPadding(10));

  /*
      update-enter-exit pattern
      update: existing elements, alter only the properties which need adjusting (like the size and coordinates)
      enter: new elements, create and append elements
      exist: old elements, delete
  */

  const update = containerFrame
    .selectAll('g.group')
    .data(dataset, d => d.country);

  const enter = update
    .enter();

  const exit = update
    .exit();


  // update the position (and the dimension) of the existing elements
  // ! the elements making up the visualization are wrapped in a container
  // ! this container allows to describe the different elements of the u-e-e pattern
  update
    .attr('transform', (d) => `translate(0, ${yScale(d.country)})`);

  update
    .selectAll('circle')
    .transition()
    .attr('cy', yScale.bandwidth() / 2)
    .attr('cx', d => xScale(d.value))
    .attr('r', yScale.bandwidth() / 5);

  update
    .selectAll('path')
    .transition()
    .attr('stroke-width', yScale.bandwidth() / 15)
    .attr('d', (d, i) => `M 0 ${yScale.bandwidth() / 2} h ${xScale(d.value)}`);

  update
    .selectAll('rect')
    .attr('height', yScale.bandwidth());


  // introduce elements for the new selection
  const enterGroup = enter
    .append('g')
    .attr('class', 'group')
    .attr('opacity', 0.7)
    .attr('transform', (d) => `translate(0, ${yScale(d.country)})`)
    // mouse events are registered when interacting with any child element of the group elements
    .on('mouseenter', function (d) {
      d3
        .select(this)
        .attr('opacity', 1);

      tooltip
        .append('p')
        .html(`Country: <strong>${d.country}</strong>`);

      tooltip
        .append('p')
        .html(`<strong>${d.value}%</strong> frequent a cinema 4 or more times in a week`);

      tooltip
        .style('opacity', 1)
        .style('top', `${d3.event.pageY}px`)
        .style('left', `${d3.event.pageX}px`);
    })
    .on('mouseout', function () {
      d3
        .select(this)
        .attr('opacity', 0.7);

      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();
    });


  enterGroup
    .append('circle')
    .attr('cy', yScale.bandwidth() / 2)
    .attr('r', yScale.bandwidth() / 5)
    .attr('fill', '#f24537')
    .attr('cx', 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 50)
    .attr('cx', d => xScale(d.value));

  enterGroup
    .append('path')
    .attr('stroke-width', yScale.bandwidth() / 15)
    .attr('stroke', '#f24537')
    .attr('d', (d, i) => `M 0 ${yScale.bandwidth() / 2} h 0`)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 50)
    .attr('d', (d, i) => `M 0 ${yScale.bandwidth() / 2} h ${xScale(d.value)}`);

  enterGroup
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', yScale.bandwidth())
    .attr('fill', 'transparent');

  // remove elements for the no-longer-necessary selection
  exit.remove();
}

// sort the data from highest % value to lowest
const sortData = data.sort((a, b) => (a.value > b.value) ? -1 : 1);
// plot the lollipop chart considering a subset of the larger data
plotData(sortData.slice(0, countries.min));

// when altering the value in the input of type range, plot the new subset of data
// ! alter also the text found in the HTML container
inputRange
  .on('change', () => {
    const { value } = d3.event.target;
    containerHTML
      .select('strong')
      .text(value);
    plotData(sortData.slice(0, value));
  });

