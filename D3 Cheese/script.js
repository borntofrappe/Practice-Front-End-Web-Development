// DATA
// array describing the names of the months
const monthNames = [
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
]

// data retrieved from the following table
// https://s1.lemde.fr/assets-redaction/img/saison_des_fromages.jpg
const data = [
  {
    name: 'Bouton d\'Or',
    months: [2, 3, 4]
  },
  {
    name: 'Brebiou',
    months: [2, 3, 4]
  },
  {
    name: 'Brie',
    months: [0, 1, 2, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Camembert',
    months: [4, 5, 6, 7, 8, 9]
  },
  {
    name: 'Caprice des Dieux',
    months: [4, 5, 6, 7]
  },
  {
    name: 'Chaource',
    months: [6, 7, 8, 9, 10]
  },
  {
    name: 'Chavre Doux',
    months: [5, 6, 7]
  },
  {
    name: 'Coulommiers',
    months: [2, 3, 4]
  },
  {
    name: 'Dauphib',
    months: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Epoisses',
    months: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Langres',
    months: [4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Livarot',
    months: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Maroilles',
    months: [0, 1, 2, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Munster',
    months: [0]
  },
  {
    name: 'Neuchatel',
    months: [1, 2, 3, 4, 9, 10, 11]
  },
  {
    name: 'Picodon',
    months: [0, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Pont-l\'Eveque',
    months: [0, 1, 2, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Reblochon',
    months: [6, 7]
  },
  {
    name: 'Rollot',
    months: [4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Saint Albray',
    months: [5, 6, 7]
  },
  {
    name: 'Saint Marcelin',
    months: [6]
  },
  {
    name: 'Saint-Maure',
    months: [6, 7, 8, 9]
  },
  {
    name: 'Selles-sur-Cher',
    months: [6, 7, 8, 9]
  },
  {
    name: 'Tomme de Belley',
    months: [4, 5, 6, 7, 8, 9]
  },
  {
    name: 'Vacherin',
    months: [11]
  },
  {
    name: 'Vieux Pane',
    months: [2, 3, 4, 5, 6, 7]
  }
];


// target the node in the HTML
const container = d3.select('.container');

// HEADER introducing the project
const containerHeader = container
  .append('header');

containerHeader
  .append('h1')
  .text('Practicing D3');

containerHeader
  .append('p')
  .text('With cheese 🇫🇷');

containerHeader
  .append('a')
  .text('Source')
  .attr('target', '_blank')
  .attr('href', 'https://s1.lemde.fr/assets-redaction/img/saison_des_fromages.jpg');


// TOOLTIP
const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('opacity', 0)
  .style('pointer-events', 'none');
// fist visualization
containerFirstViz = container
  .append('section');

containerFirstViz
  .append('h2')
  .text('Cheese for every month');

containerFirstViz
  .append('p')
  .text('Hover to identify the different types');

/*
the first visualization plots one form of cheese for each month

desired data structure
{
  name of the month: [array of cheeses in the month]
}
*/

// map through the array of months
const dataMonths = monthNames.map((month, index) => {
  // month being January, February, so on
  // index being 0, 1, 2 (and matching the structure included in the data array)

  // initialize an array in which to add the cheeses matching the month
  const cheeses = [];
  // loop through the array of data retrieving the array of months and the cheese's name
  data.forEach(({ months, name }) => {
    // if the array of months includes the index, the cheese is in the matching month
    if (months.includes(index)) {
      // add it to the cheeses array
      cheeses.push(name);
    }
  });
  // return an object matching the desired data structure
  return { month, cheeses };
});
// console.log(dataMonths);

// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 20
};
const width = 1000 - (margin.left + margin.right);
const height = 750 - (margin.top + margin.bottom);

const svgFirstViz = containerFirstViz
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left} ${margin.top})`);

// SCALES
// x: ordinal scale to display the months
const xScale = d3
  .scaleBand()
  .domain(monthNames)
  .range([0, width])


// y: size determined by the maximum number of cheeses in a month
// no scale necessary
const yMax = d3.max(dataMonths, d => d.cheeses.length);


// AXES
// showing the x axis with the name of the months
const xAxis = d3
  .axisBottom(xScale)
  .tickFormat(d => d.substring(0, 3))
  .tickSize(0);

const gAxis = svgFirstViz
  .append('g')
  .attr('transform', `translate(0 ${height})`)
  .call(xAxis)

// highlight the name of the months
gAxis
  .selectAll('text')
  .attr('transform', 'translate(0 20)')
  .style('font-size', '1.25rem')
  .style('font-weight', '800');

// remove the line marking the axis
gAxis
  .select('path')
  .style('display', 'none');

// loop through the data
dataMonths.forEach(({ month, cheeses }, index) => {
  // add one rectangle for each month
  svgFirstViz
    .selectAll(`rect.${month}`)
    .data(cheeses)
    .enter()
    .append('rect')
    .attr('class', month)
    .attr('data-cheese', d => d)
    // occupying a space equal to the band of each month
    .attr('x', xScale(month))
    .attr('width', xScale.bandwidth())
    // occupying a fraction of the total height
    .attr('y', (d, i) => height - (height / yMax) * (i + 1))
    .attr('height', height / yMax)
    .attr('rx', 5)
    .attr('fill', '#FFD362')
    .attr('stroke', '#854d0d')
    .attr('stroke-width', 5)
    .on('click', function (d) {
      const match = data.find(dataPoint => dataPoint.name === d);
      cheeseIt(match);
    })
    .on('mouseenter', function (d) {
      d3.select(this)
        .transition()
        .attr('fill', '#DE841A');

      tooltip
        .append('p')
        .text(month);

      tooltip
        .append('p')
        .append('strong')
        .text(d);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', function () {
      d3.select(this)
        .transition()
        .attr('fill', '#FFD362');

      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();

    });
});



/*
the second visualization displays the months for a selected cheese
the data already provides the desired structure
{
  cheese,
  months
}
*/

const randomCheese = data[Math.floor(Math.random() * data.length)];


containerSecondViz = container
  .append('section');

const cheeseName = containerSecondViz
  .append('h2')
  .html('Months for ')
  .append('strong')
  .text(randomCheese.name);

containerSecondViz
  .append('p')
  .text('Select a form in the previous chart to highlight a different randomCheese');

const svgSecondViz = containerSecondViz
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height / 4 + (margin.top + margin.bottom) / 4}`)
  .append('g')
  .attr('transform', `translate(${margin.left} ${margin.top / 6})`);


const groupSecondViz = svgSecondViz
  .append('g')
  .attr('transform', `translate(${(width / 2) - ((width / 12 * randomCheese.months.length) / 2)} 0)`);

const cheeseForm = groupSecondViz
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', (width / 12) * randomCheese.months.length)
  .attr('height', height / 6)
  .attr('rx', 50)
  .attr('fill', '#FEC906')
  .attr('stroke', '#b16814')
  .attr('stroke-width', 2);


// include as many circle elements as there are months

const groupsSecondViz = groupSecondViz
  .selectAll('g')
  .data(randomCheese.months)
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(${i * width / 12} 0)`);


groupsSecondViz
  .append('circle')
  .attr('cx', width / 24)
  // vertically centered in the rectangle
  .attr('cy', height / 12)
  // in size use the width of the rectangle, but cap the size at slightly less than half the height of the rectangle itself
  .attr('r', height / 24)
  .attr('fill', '#DE841A');

groupsSecondViz
  .append('text')
  .attr('x', width / 24)
  .attr('y', height / 4)
  .text(d => monthNames[d].substring(0, 3))
  .attr('text-anchor', 'middle')
  // .style('writing-mode', 'vertical-rl')
  .style('font-size', '1.5rem')
  .style('font-weight', '900');

function cheeseIt(cheese) {
  cheeseName.text(cheese.name);

  groupSecondViz
    .transition()
    .attr('transform', `translate(${(width / 2) - ((width / 12 * cheese.months.length) / 2)} 0)`);

  cheeseForm
    .transition()
    .attr('width', (width / 12) * cheese.months.length);

    groupsSecondViz = groupSecondViz


}
