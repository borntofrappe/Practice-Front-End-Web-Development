// variables used in and for the visualization
const href = 'http://www.europarl.europa.eu/news/fr/headlines/society/20190226STO28804/les-femmes-au-parlement-europeen';
// colors referring to the red/green/beige hues for the slices and as a reference for the viz's background
const colors = ['#FC7C6E', '#9CD4AC', '#FFF2D8'];
/* dataset
years depicting the labels
percentage descirbing the proportions
size for the size of each slice (every slice with the same dimension, but different radius)
*/
const data = [
  {
    years: [1979, 1984],
    percentage: 15.2,
    size: 1
  },
  {
    years: [1984, 1989],
    percentage: 15.7,
    size: 1
  },
  {
    years: [1989, 1994],
    percentage: 19.9,
    size: 1
  },
  {
    years: [1994, 1999],
    percentage: 27.4,
    size: 1
  },
  {
    years: [1999, 2004],
    percentage: 27.5,
    size: 1
  },
  {
    years: [2004, 2009],
    percentage: 29.9,
    size: 1
  },
  {
    years: [2009, 2014],
    percentage: 35.5,
    size: 1
  },
  {
    years: [2014, 2019],
    percentage: 36.4,
    size: 1
  }
];


// introductory HTML elements
const viz = d3.select('.viz');

viz
  .append('h1')
  .html('Proportion of <strong>women</strong> and <strong>men</strong> at the European Parliament');

// svg container
// margin for the SVG as a whole
const margin = {
  top: 20,
  right: 50,
  bottom: 0,
  left: 50
};
// padding to avoid pushing the labels outside of the svg
const padding = 10;

const width = 600 - (margin.left + margin.right);
const height = 300 - (margin.top + margin.bottom);

const vizSVG = viz
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left} ${margin.top})`);

// radius scale, to have the percentages be represented proportionately
// ! use a square root scale to consider the area of the sector instead of the length of the radius
const radiusScale = d3
  .scaleSqrt()
  // up to 100 (percent)
  .domain([0, 100])
  // stretching to reach half the width (as the width is the diameter of the viz) minutes the arbitrary padding
  .range([0, (width / 2 - padding)]);

// pie function to detail the startAngle and endAngle
const pie = d3
  .pie()
  // do not sort the slices (by default sorted by size)
  .sort(null)
  // consider the size variable, depicting slices of equal size
  .value(d => d.size)
  // consider half a pie chart by having the layout start a quarter of the circle before its default and ending a quarter after
  .startAngle(-0.5 * Math.PI)
  .endAngle(0.5 * Math.PI);

// arc function, to have the data points include an arc proportionate the the percentage
const arc = d3
  .arc()
  // innerRadius greater than 0 to detail a donut chart
  .innerRadius(height / 7)
  // outer radius considering the percentage value
  .outerRadius(d => radiusScale(d.data.percentage));

// SLICES
/* the visualization is actually made up of 2 overlapping sets of data
- a donut chart for 100% values
- a donut chart for the percentages expressed in the dataset

by overlapping the latter, it is possible to visually differentiate the components of each section
*/

// first round
// create an array similar to the data array, but with percentages all set to 100
const dataFill = data.map(({ years, size }) => ({
  years,
  size,
  percentage: 100
}));

// add one group element per data point
const arcsMen = vizSVG
  .selectAll('g.men')
  // array of 100% values
  .data(pie(dataFill))
  .enter()
  .append('g')
  .attr('class', 'men')
  // horizontally centered, vertically pushed at the bottom of the viz
  .attr('transform', `translate(${width / 2} ${height})`);

// for each arc add a path element using the arc function
arcsMen
  .append('path')
  .attr('d', arc)
  .attr('fill', colors[1])
  // stroke matching the color of the background to pretend the slices are separated from one another
  .attr('stroke', colors[2])
  .attr('stroke-width', 2);

// second round, using the actual dataset
const arcsWomen = vizSVG
  .selectAll('g.women')
  // using an array describing the percentage values
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'women')
  .attr('transform', `translate(${width / 2} ${height})`);

arcsWomen
  .append('path')
  .attr('d', arc)
  .attr('fill', colors[0])
  .attr('stroke', colors[2])
  .attr('stroke-width', 2);

// TEXT LABELS
// arc.centroid() refers to the center of each slice
// considering the larger slices, add labels with the year values on the outer edge of the slices
arcsMen
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  // transform to push the labels on the outer section of the slice
  // rotate to rotate the labels toward the center (the angles are in radians and must be converted to degrees)
  .attr('transform', d => {
    const [left, top] = arc.centroid(d);
    console.log(d);
    return `translate(${left * 1.8} ${top * 1.8}) rotate(${(d.startAngle / 2 + d.endAngle / 2) * 180 / Math.PI})`;
  })
  .attr('fill', 'currentColor')
  .text(d => d.data.years.join('-'));

// considering the smaller slices, include the labels inside the slices
arcsWomen
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  // transform to push the labels on the center of each slice
  // rotate to have the labels rotated **alongside** the slice
  .attr('transform', (d, i) => {
    const [left, top] = arc.centroid(d);
    const rotation = (i + (i + 1)) / 2 * (180 / data.length);
    // mirroring the labels upon reaching half the semi-circle
    return `translate(${left} ${top}) rotate(${d.startAngle >= 0 ? `${rotation - 180}` : rotation})`;
  })
  .attr('fill', '#fff')
  .attr('font-size', '0.7rem')
  .text(d => `${d.data.percentage}%`);

// link to the article including the replicated visualization
viz
  .append('a')
  .attr('href', href)
  .text('Source');