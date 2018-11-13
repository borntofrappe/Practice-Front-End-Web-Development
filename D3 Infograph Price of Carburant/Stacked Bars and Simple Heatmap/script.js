/* globals d3 */
/*
create a few visualizations with very small sets of data
*/

// single stacked bar
const priceComponents = {
  oilCrude: 30,
  taxes: 60,
  marginDistributor: 7,
  marginRefine: 3
};

// 'broken' stacked bar
// showing three bars one atop the other
const taxesComponents = {
  state: 61,
  regions: 18,
  departments: 18,
  infrastructure: 3
};

// very basic heatmap, showing colored squares for the selected types of emission
const emissionsComponent = {
  automobiles: 16,
  heavyWeight: 6
};

// color values
const colors = {
  gasoline: '#AACFB5',
  diesel: '#2b70b4',
  brent: '#39C1D8',
  automobiles: '#EF6100',
  heavyWeight: '#F19300',
  transparency: ['ff', 'cc', 'aa', '88']
};

// select the single container
const container = d3
  .select('.container');

// add a div for the tooltip
const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// SINGLE STACKED BAR
// introductory HTML elements
// nest the central message in a container
const containerMessage = container
  .append('div')
  .attr('class', 'message');

containerMessage
  .append('h3')
  .text('Refineries and distributors. Don\'t they have margins?');

containerMessage
  .append('p')
  .html('Yes, but they are not responsible for the rise in prices.');

containerMessage
  .append('h3')
  .html('The price of fuel:');

// the margin convention is perhaps overkill for the following visualizations
// SVG FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 20
};
const width = 500 - (margin.left + margin.right);
const height = 125 - (margin.top + margin.bottom);

const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// SCALES AND AXES
// for the horizontal scale describe a linear scale going from 0 to 100 (percent)
const xScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width]);

// for the vertical dimension use a portion of the height
// additionally, no axes are being used; in their stead, use carefully placed text labels

// use a stack function to describe the coordinates of each rectangle element
const stack = d3
  .stack()
  // based on the properties of the dataset
  .keys(Object.keys(priceComponents));

// append one group for each array; then nest rectangles and text labels
const containerGroups = containerFrame
  .selectAll('g')
  // ! remember the stack function relies on an array of values detailing each set of data
  // in this instance, an array of a single object
  .data(stack([priceComponents]))
  .enter()
  .append('g')
  // position each group where each rectangle ought to begin
  .attr('transform', d => `translate(${xScale(d[0][0])}, 0)`);

containerGroups
  .append('rect')
  // the origin is already set by the group element
  .attr('x', 0)
  // compute the width based on the end and start value of the stack
  .attr('width', d => xScale(d[0][1] - d[0][0]))
  // occupy a fourth of the height and center horizontally
  // this leaves a fourth of the height atop and below the rectangle for the text labels
  .attr('y', height / 4)
  .attr('height', height / 2)
  // detail a fill increasingly transparent
  .attr('fill', (d, i) => `${colors.diesel}${colors.transparency[i]}`);

// for the text labels define a description for each category
const priceComponentsDescription = [
  'Crude oil',
  'Taxes',
  'Distributor margins',
  'Refineries margin'
];
// add text labels atop and below the bar
containerGroups
  .append('text')
  // horizontally position the labels slightly after or slightly before the midpoint of each rectangle
  // this to have a straight line side the label from the midpoint itself
  .attr('x', (d, i) => {
    const midPoint = xScale(d[0][1] - d[0][0]) / 2;
    if (i < 2) {
      return midPoint + 5;
    }
    return midPoint - 5;
  })
  // vertically offsetting each label and describing the first pair atop the rectangle
  // the second pair below it
  .attr('y', (d, i) => {
    // remember the rectangle starts at height/4 and ends at height*3/4
    if (i < 2) {
      // show the first two labels right at the top of the viz and at height/6
      return height / 6 * i;
    }
    // mirroring the pattern, show the last two at 5/6 height and right at the bottom
    // ! important: you need to also change the alignment-baseline property to have the labels truly mirror the first pair
    return (height * 5 / 6) + (height / 6 * (i - 2));
  })
  // horizontally position the first two pair starting from the x coordinate, the latter ending there
  .attr('text-anchor', (d, i) => ((i < 2) ? 'start' : 'end'))
  // vertically change the alignment of the second pair to match the first two labels
  .attr('alignment-baseline', (d, i) => ((i < 2) ? 'auto' : 'hanging'))
  .attr('font-size', '0.7rem')
  .text((d, i) => `${priceComponentsDescription[i]}: ${d[0].data[Object.keys(priceComponents)[i]]}%`);

// add vertical lines visually connecting the text elements to the rectangle elements
containerGroups
  .append('path')
  // starting from the midpoint and vertically reaching the text labels
  .attr('d', (d, i) => {
    const midPoint = xScale(d[0][1] - d[0][0]) / 2;
    console.log(d);
    if (i < 2) {
      return `M ${midPoint} ${height / 4} V ${height / 6 * i}`;
    }

    return `M ${midPoint} ${height * 3 / 4} V ${(height * 5 / 6) + (height / 6 * (i - 2))}`;
  })
  .attr('stroke', '#555')
  .attr('stroke-width', '1px');

// MULTIPLE BARS
// the visualization for taxesComponent could be very well be implemented with simple div elements
const containerMessageTaxes = container
  .append('div')
  .attr('class', 'message');

containerMessageTaxes
  .append('h3')
  .text('How much does the state earn?');

containerMessageTaxes
  .append('h3')
  .text('34 Billions of Euro');

containerMessageTaxes
  .append('p')
  .text('They are distributed between');

const marginTaxes = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const widthTaxes = 500 - (marginTaxes.left + marginTaxes.right);
const heightTaxes = 300 - (marginTaxes.top + marginTaxes.bottom);


const containerFrameTaxes = container
  .append('svg')
  .attr('viewBox', `0 0 ${widthTaxes + (marginTaxes.left + marginTaxes.right)} ${heightTaxes + (marginTaxes.top + marginTaxes.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginTaxes.left}, ${marginTaxes.top})`);

// detail a scale capping at the maximum value of the dataset, to have all bars proportionate that that value
const xScaleTaxes = d3
  .scaleLinear()
  .domain([0, d3.max(Object.values(taxesComponents))])
  .range([0, widthTaxes]);

// include three groups for the text labels and bars, each at a fraction of the total height
const containerGroupsTaxes = containerFrameTaxes
  .selectAll('g')
  .data(Object.values(taxesComponents))
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(0, ${heightTaxes / Object.values(taxesComponents).length * i})`);

// add bold text labels
containerGroupsTaxes
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('font-size', '0.9rem')
  .attr('font-weight', 'bold')
  .style('text-transform', 'capitalize')
  .text((d, i) => Object.keys(taxesComponents)[i]);

// add bars
containerGroupsTaxes
  .append('rect')
  .attr('x', 0)
  .attr('y', heightTaxes / 16)
  .attr('width', d => xScaleTaxes(d))
  .attr('height', heightTaxes / 16)
  .attr('fill', colors.gasoline);

// add digits at the end of each bar with the percentage
containerGroupsTaxes
  .append('text')
  .attr('x', d => xScaleTaxes(d))
  // centered in the rectangle
  .attr('y', heightTaxes * 3 / 32)
  .attr('alignment-baseline', 'middle')
  .attr('text-anchor', 'end')
  .attr('fill', '#333')
  .attr('font-weight', 'bold')
  .text(d => `${d}%`);

// SIMPLE HEATMAP
const containerMessageHeatmap = container
  .append('div')
  .attr('class', 'message');

containerMessageHeatmap
  .append('h3')
  .text('Nevertheless, do our vehicles pollute that much?');


containerMessageHeatmap
  .append('p')
  .text('Individual cars and heavy weight vehicles are responsible for a substantial part of gas emissions in France.');

// detail margin allowing for a square (same width and height)
// include a larger margin below to position the text labels and pointing arrows
const marginHeatmap = {
  top: 20,
  right: 80,
  bottom: 140,
  left: 80
};


const widthHeatmap = 500 - (marginHeatmap.left + marginHeatmap.right);
const heightHeatmap = 500 - (marginHeatmap.top + marginHeatmap.bottom);

const containerFrameHeatmap = container
  .append('svg')
  .attr('viewBox', `0 0 ${widthHeatmap + (marginHeatmap.left + marginHeatmap.right)} ${heightHeatmap + (marginHeatmap.top + marginHeatmap.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginHeatmap.left}, ${marginHeatmap.top})`);

// include 100 rectangles with same width as height
containerFrameHeatmap
  .selectAll('rect.square')
  .data(d3.range(100))
  .enter()
  .append('rect')
  .attr('class', 'square')
  .attr('x', (d, i) => {
    // position the squares horizontally changing the coordinate every 10 squares
    // for the first: x
    // for the eleventh: x = 0 + a portion of the width and so forth
    const squareGap = Math.floor(i / 10);
    return squareGap * (widthHeatmap / 10);
  })
  .attr('y', (d, i) => {
    // position the square vertically according to the unit
    // for the first (eleventh, twenty-first and so on): y = 0
    // for the second (twelvth, twenty-second and so forth) y = 0 + a portion of the height
    const numberString = i.toString();
    const unitString = numberString[numberString.length - 1];
    const unit = parseInt(unitString);
    return unit * (heightHeatmap / 10);
  })
  .attr('width', widthHeatmap / 10)
  .attr('height', heightHeatmap / 10)
  // color the first squares according to the value for automobiles
  // the last squares according to the value of heavy eight vehicles
  .attr('fill', (d, i) => {
    if (i < emissionsComponent.automobiles) {
      return colors.automobiles;
    }
    if (i < 100 - emissionsComponent.heavyWeight) {
      return '#77777777';
    }
    return colors.heavyWeight;
  })
  // stroke equal to the background to fake a gap between the squares
  .attr('stroke', '#fff')
  .attr('stroke-width', '5px');

// append text labels below the heatmap
containerFrameHeatmap
  .append('text')
  .attr('x', 10)
  .attr('y', heightHeatmap + marginHeatmap.top)
  .attr('font-weight', 'bold')
  .attr('fill', colors.automobiles)
  .text(`${emissionsComponent.automobiles} %`);

containerFrameHeatmap
  .append('text')
  .attr('x', 10)
  .attr('y', heightHeatmap + marginHeatmap.top + 10)
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.automobiles)
  .text('Automobiles');


// append text labels below the heatmap
containerFrameHeatmap
  .append('text')
  .attr('x', widthHeatmap - 10)
  .attr('y', heightHeatmap + marginHeatmap.top)
  .attr('text-anchor', 'end')
  .attr('font-weight', 'bold')
  .attr('fill', colors.heavyWeight)
  .text(`${emissionsComponent.heavyWeight} %`);

containerFrameHeatmap
  .append('text')
  .attr('x', widthHeatmap - 10)
  .attr('y', heightHeatmap + marginHeatmap.top + 10)
  .attr('text-anchor', 'end')
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.heavyWeight)
  .text('Heavy weight');

// include path straight lines visually connecting the labels with the heatmap
containerFrameHeatmap
  .append('path')
  .attr('d', `M ${5} ${heightHeatmap} v ${marginHeatmap.top}`)
  .attr('stroke', colors.automobiles)
  .attr('stroke-width', '3px');

containerFrameHeatmap
  .append('path')
  .attr('d', `M ${widthHeatmap - 5} ${heightHeatmap} v ${marginHeatmap.top}`)
  .attr('stroke', colors.heavyWeight)
  .attr('stroke-width', '3px');
