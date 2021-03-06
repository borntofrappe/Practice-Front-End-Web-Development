/* globals d3 */
/** script visualizations
 * line chart displaying the evolution of fuel prices from May 2017 to October 2018
 * fork in the road
 *  one one side
 *    column chart highlighting the portion of the increase of price due to taxes
 *    column chart describing the taxation on gasoline and diesel
 *
 *  on the other side
 *    column chart highlighting the portion of the increase of price due to other costs
 *    line chart describing the price of a barrel of brent
 *    line chart describing the price of a barrel of brent in euros
 *    stacked bar describing the components of the price of fuel
 *
 * stacked column chart detailing the portions of the price of gasoline devoted to taxes and other costs
 * stacked column chart detailing the portions of the price of diesel devoted to taxes and other costs
 * simple bars describing how taxes are distributed
 *
 * another fork in the road
 *  on one side
 *    heatmap describing the contribution of vehicles to gas emissions
 *
 *  on the other side no visualizatioons
 *
 * yet another fork in the road
 *  on one side no visualization
 *
 *  on the other side
 *    bar plot describing the price of gasoline in a selection of countries
 */

// DATA for each visualization (ends at line 321)
// one observation per month, starting from May 2017 and ending in October 2018, in euros
const priceCarburant = [
  {
    diesel: 1.21,
    gasoline: 1.37
  },
  {
    diesel: 1.18,
    gasoline: 1.34
  },
  {
    diesel: 1.17,
    gasoline: 1.32
  },
  {
    diesel: 1.2,
    gasoline: 1.34
  },
  {
    diesel: 1.22,
    gasoline: 1.37
  },
  {
    diesel: 1.24,
    gasoline: 1.36
  },
  {
    diesel: 1.27,
    gasoline: 1.40
  },
  {
    diesel: 1.28,
    gasoline: 1.40
  },
  {
    diesel: 1.4,
    gasoline: 1.47
  },
  {
    diesel: 1.38,
    gasoline: 1.47
  },
  {
    diesel: 1.37,
    gasoline: 1.46
  },
  {
    diesel: 1.4,
    gasoline: 1.49
  },
  {
    diesel: 1.45,
    gasoline: 1.53
  },
  {
    diesel: 1.46,
    gasoline: 1.55
  },
  {
    diesel: 1.45,
    gasoline: 1.53
  },
  {
    diesel: 1.45,
    gasoline: 1.55
  },
  {
    diesel: 1.48,
    gasoline: 1.56
  },
  {
    diesel: 1.52,
    gasoline: 1.56
  }
];

// rise in cents, taxes in percentage
const priceRise = [
  {
    type: 'gasoline',
    rise: 19,
    taxes: 34
  },
  {
    type: 'diesel',
    rise: 31,
    taxes: 37
  }
];

// one observation per year, from 2013 to 2022, in cents
const taxesRise = [
  {
    diesel: 0.43,
    gasoline: 0.61
  },
  {
    diesel: 0.43,
    gasoline: 0.61
  },
  {
    diesel: 0.47,
    gasoline: 0.62
  },
  {
    diesel: 0.50,
    gasoline: 0.64
  },
  {
    diesel: 0.53,
    gasoline: 0.65
  },
  {
    diesel: 0.59,
    gasoline: 0.68
  },
  {
    diesel: 0.65,
    gasoline: 0.71
  },
  {
    diesel: 0.70,
    gasoline: 0.73
  },
  {
    diesel: 0.75,
    gasoline: 0.75
  },
  {
    diesel: 0.78,
    gasoline: 0.78
  }
];

// one observation for each month from January 2009 to October 2018
// in dollars
const brentRiseDollar = [43.29, 43.26, 46.54, 50.19, 57.38, 68.68, 64.46, 72.52, 67.61, 72.52, 76.65, 74.46, 76.00, 73.00, 78.00, 84.00, 75.00, 74.00, 75.00, 77.00, 77.00, 82.00, 85.00, 91.00, 96.61, 103.73, 114.64, 123.21, 114.40, 114.30, 116.75, 110.38, 112.84, 109.55, 110.61, 107.87, 110.68, 119.44, 125.45, 119.75, 110.17, 95.16, 102.54, 113.36, 113.50, 111.70, 109.14, 109.46, 112.95, 116.13, 108.50, 101.95, 102.53, 102.92, 107.83, 111.29, 111.73, 109.80, 107.96, 110.76, 108.12, 108.91, 107.48, 107.66, 109.52, 111.80, 106.86, 101.66, 97.29, 87.46, 79.00, 62.51, 47.71, 58.10, 55.89, 59.61, 64.40, 61.47, 56.56, 46.52, 47.62, 48.43, 44.29, 38.50, 30.69, 32.20, 38.32, 41.58, 46.79, 48.25, 44.95, 45.67, 46.57, 49.52, 44.73, 53.31, 54.58, 54.87, 51.59, 52.36, 50.32, 46.37, 48.48, 51.70, 56.15, 57.50, 62.73, 64.38, 69.90, 65.32, 66.20, 72.60, 76.98, 74.40, 74.25, 72.44, 78.89, 81.30];
// in euros
const brentRiseEuro = [32.7, 33.8, 35.7, 38.0, 42.1, 49.0, 45.8, 50.8, 46.4, 48.9, 51.4, 51.0, 53.3, 53.3, 57.5, 62.6, 59.7, 60.6, 58.7, 59.7, 58.9, 59.0, 62.2, 68.8, 72.3, 76.0, 81.9, 85.3, 79.7, 79.4, 81.8, 77.0, 81.9, 79.9, 81.6, 81.8, 85.8, 90.3, 95.0, 91.0, 86.0, 76.0, 83.4, 91.4, 88.3, 86.1, 85.1, 83.5, 85.0, 86.9, 83.7, 78.3, 79.0, 78.0, 82.4, 83.6, 83.7, 80.5, 80.0, 80.8, 79.4, 79.7, 77.8, 77.9, 79.8, 82.3, 78.9, 76.3, 75.4, 69.0, 63.3, 50.7, 41.1, 51.2, 30.4, 33.5, 57.8, 54.8, 28.3, 41.8, 42.4, 43.1, 25.5, 20.5, 16.5, 29.0, 34.5, 36.7, 41.4, 43.0, 40.6, 40.7, 41.5, 44.9, 24.9, 34.5, 33.8, 33.4, 30.6, 30.4, 45.5, 41.3, 42.1, 43.8, 47.1, 48.9, 53.4, 54.4, 57.3, 52.9, 53.7, 59.1, 65.2, 63.7, 63.5, 62.7, 67.7, 70.8];

// percentages
const priceComponents = {
  oilCrude: 30,
  taxes: 60,
  marginDistributor: 7,
  marginRefine: 3
};

// one observation per month, from September 2008 to October 2018
// percentage values (taxes are obtained deducting this value from 100)
const otherCostsDiesel = [48.2, 45.1, 40.6, 40.1, 39.2, 38.4, 39.5, 39.5, 41.8, 40.9, 42.5, 41.5, 42.0, 42.8, 42.5, 43.8, 44.1, 45.4, 46.6, 46.9, 46.9, 46.0, 46.1, 46.3, 46.9, 47.3, 48.7, 49.4, 50.2, 51.5, 51.6, 50.5, 50.5, 50.6, 50.3, 50.8, 51.2, 51.9, 51.7, 52.5, 52.6, 53.2, 52.9, 52.2, 50.9, 51.7, 53.2, 54.1, 54.2, 53.7, 52.1, 51.9, 52.4, 52.0, 51.0, 50.5, 50.4, 50.9, 51.1, 51.4, 50.5, 50.2, 50.6, 50.2, 50.2, 49.7, 49.6, 49.6, 49.7, 49.5, 49.4, 49.2, 48.3, 47.5, 44.5, 40.2, 42.8, 43.5, 43.3, 44.4, 43.8, 42.3, 40.3, 39.8, 39.7, 39.6, 36.7, 33.2, 33.1, 35.1, 35.4, 37.8, 39.2, 37.7, 36.9, 37.4, 39.3, 38.8, 40.6, 40.2, 40.1, 39.3, 39.4, 38.2, 37.0, 36.8, 37.7, 38.6, 39.3, 40.3, 40.6, 39.7, 39.1, 38.9, 39.9, 41.3, 41.7, 41.2, 41.3, 42.1, 43.3];
const otherCostsGasoline = [36.8, 31.4, 27.6, 28.6, 30.3, 30.5, 31.7, 33.4, 35.9, 34.5, 36.0, 34.7, 34.6, 35.7, 35.3, 36.7, 37.3, 38.8, 39.5, 39.3, 38.9, 38.1, 37.9, 37.9, 38.5, 39.0, 40.7, 41.7, 42.0, 43.0, 43.8, 43.7, 42.9, 43.0, 42.7, 43.3, 42.7, 42.6, 42.7, 44.1, 44.9, 46.2, 46.5, 44.9, 43.5, 44.1, 45.9, 46.4, 45.9, 44.6, 43.7, 44.3, 45.4, 45.2, 44.1, 43.5, 43.6, 43.8, 44.0, 43.6, 42.4, 42.2, 42.7, 42.4, 42.7, 42.6, 42.8, 43.0, 43.3, 43.3, 42.4, 42.2, 41.3, 40.1, 37.0, 33.9, 36.3, 38.0, 38.4, 39.4, 39.6, 39.1, 37.2, 34.9, 34.4, 34.5, 33.6, 32.2, 31.1, 31.9, 33.7, 34.7, 35.5, 33.5, 32.8, 33.3, 34.8, 34.2, 35.8, 36.6, 36.8, 35.8, 36.3, 35.2, 34.3, 33.4, 34.1, 35.1, 34.7, 36.3, 36.4, 36.4, 36.2, 35.9, 36.9, 38.2, 38.6, 38.2, 38.6, 38.9, 39.0];

// percentages
const taxesComponents = {
  state: 61,
  regions: 18,
  departments: 18,
  infrastructure: 3
};

// percentages (not totalling 100)
const emissionComponents = {
  automobiles: 16,
  heavyWeight: 6
};

// one observation for each country, values in euros
const countriesGasoline = [
  {
    country: 'Bulgary',
    taxes: 0.55,
    other: 0.51
  },
  {
    country: 'Poland',
    taxes: 0.60,
    other: 0.49
  },
  {
    country: 'Romania',
    taxes: 0.60,
    other: 0.51
  },
  {
    country: 'Luxembourg',
    taxes: 0.64,
    other: 0.51
  },
  {
    country: 'Hungary',
    taxes: 0.65,
    other: 0.51
  },
  {
    country: 'Lithuania',
    taxes: 0.64,
    other: 0.52
  },
  {
    country: 'Austria',
    taxes: 0.69,
    other: 0.48
  },
  {
    country: 'Czech Republic',
    taxes: 0.72,
    other: 0.49
  },
  {
    country: 'Cyprus',
    taxes: 0.69,
    other: 0.53
  },
  {
    country: 'Spain',
    taxes: 0.68,
    other: 0.56
  },
  {
    country: 'Latvia',
    taxes: 0.74,
    other: 0.50
  },
  {
    country: 'Slovenia',
    taxes: 0.81,
    other: 0.50
  },
  {
    country: 'Malta',
    taxes: 0.75,
    other: 0.57
  },
  {
    country: 'Germany',
    taxes: 0.88,
    other: 0.47
  },
  {
    country: 'United Kingdom',
    taxes: 0.89,
    other: 0.47
  },
  {
    country: 'Ireland',
    taxes: 0.88,
    other: 0.51
  },
  {
    country: 'Sweden',
    taxes: 0.92,
    other: 0.51
  },
  {
    country: 'Finland',
    taxes: 0.95,
    other: 0.49
  },
  {
    country: 'France',
    taxes: 0.94,
    other: 0.52
  },
  {
    country: 'Portugal',
    taxes: 0.94,
    other: 0.53
  },
  {
    country: 'Denmark',
    taxes: 0.92,
    other: 0.57
  },
  {
    country: 'Greece',
    taxes: 1.01,
    other: 0.52
  },
  {
    country: 'Netherlands',
    taxes: 1.06,
    other: 0.49
  },
  {
    country: 'Italy',
    taxes: 1.01,
    other: 0.55
  }
];

// GLOBAL variables shared by all visualizaitons
// max values for the scale
const max = {
  priceCarburant: 2,
  percent: 100
};
// colors
const colors = {
  gasoline: '#8cb999',
  diesel: '#2b70b4',
  brent: '#39C1D8',
  automobiles: '#EF6100',
  heavyWeight: '#F19300',
  black: '#111',
  // transparency details a set of 4 values to be added after a color, to increase its transparency
  transparency: ['ff', 'cc', 'aa', '88', '55']
};

// function formatting to a year value
const formatAxes = d3.timeFormat('%Y');
// function formatting to a month and year value
const formatDate = d3.timeFormat('%b %Y');
// function formatting decimal numbers
const formatDecimal = d3.format(',');

// utility function returning a date instance based on an index and start month/year
const dateInstance = (i, startingMonth = 1, startingYear = 2009) => {
  // compute the current month adding the index value to the starting month
  let currentMonth = startingMonth + i;
  let currentYear = startingYear;

  // as currentMonth can increase past 12, compute a value monthGap to deduct the appropriate number of months and add the respective number of years
  // deduct 1 from the current month; this allows month gap to increase when the month is 13, 25, 37 (as new Date accepts up to 12 for the month value)
  const monthGap = Math.floor((currentMonth - 1) / 12);

  if (monthGap > 0) {
    currentMonth -= 12 * monthGap;
    currentYear += monthGap;
  }

  // return the date instance
  return new Date(`${currentYear}, ${currentMonth}`);
};

// select container
const container = d3
  .select('.container');

// add tooltip, shared by all visualizations
const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// LINE CHART describing the rising price of the price of gasoline and diesel
const containerPriceCarburant = container
  .append('div')
  .attr('class', 'visualization');

// introductory HTML elements
const messagePriceCarburant = containerPriceCarburant
  .append('div')
  .attr('class', 'message');

messagePriceCarburant
  .append('h3')
  .text('Is the price of fuel really rising?');

messagePriceCarburant
  .append('p')
  .text('Yes');

containerPriceCarburant
  .append('p')
  .text('From the beginning of the five year mandate:');

const messageList = containerPriceCarburant
  .append('ul');

messageList
  .append('li')
  .html(`Diesel: <strong style="color: ${colors.diesel}">+ 31 cents</strong>`);

messageList
  .append('li')
  .html(`Gasoline: <strong style="color: ${colors.gasoline}">+ 19 cents</strong>`);

// SVG FRAME
const marginPriceCarburant = {
  top: 20,
  right: 40,
  bottom: 30,
  left: 60
};

const widthPriceCarburant = 500 - (marginPriceCarburant.left + marginPriceCarburant.right);
const heightPriceCarburant = 400 - (marginPriceCarburant.top + marginPriceCarburant.bottom);

const containerFramePriceCarburant = containerPriceCarburant
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceCarburant + (marginPriceCarburant.left + marginPriceCarburant.right)} ${heightPriceCarburant + (marginPriceCarburant.top + marginPriceCarburant.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceCarburant.left}, ${marginPriceCarburant.top})`);

// SCALES
// x: time scale for the selected time period
const xScalePriceCarburant = d3
  .scaleTime()
  .domain([new Date('2017, 5'), new Date('2018, 10')])
  .range([0, widthPriceCarburant]);

// on the horizontal axis show only the first and last labels
const xAxisPriceCarburant = d3
  .axisBottom(xScalePriceCarburant)
  .tickPadding(10)
  .tickFormat((d, i) => ((i === 0 || i === priceCarburant.length - 1) ? formatAxes(d) : ''));

containerFramePriceCarburant
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightPriceCarburant})`)
  .call(xAxisPriceCarburant);

// y: linear scale from 0 to the maximum value for the price of carburant
const yScalePriceCarburant = d3
  .scaleLinear()
  .domain([0, max.priceCarburant])
  .range([heightPriceCarburant, 0]);

// on the vertical axes limit thenumber of ticks
const yAxisPriceCarburant = d3
  .axisLeft(yScalePriceCarburant)
  .ticks(4)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat(d => (d !== 0 ? `${d} €/L` : ''));

containerFramePriceCarburant
  .append('g')
  .attr('class', 'y axis')
  .call(yAxisPriceCarburant)
  // add grid lines for each vertical tick
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${widthPriceCarburant}`)
  .style('opacity', 0.2)
  .attr('stroke', `${colors.black}`)
  .attr('stroke-width', '1px');

// line function
// describe a line function determining the x coordinate on the bases of the index
// the y coordinate is instead computed on the basis of the bound data point
const linePriceCarburant = d3
  .line()
  .x((d, i) => xScalePriceCarburant(dateInstance(i, 5, 2017)))
  .y(d => yScalePriceCarburant(d))
  .curve(d3.curveStepAfter);

// through the line function, add two path elements binding each time an array of values
containerFramePriceCarburant
  .append('path')
  .attr('stroke', colors.diesel)
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  // array of values describing the price of diesel
  .attr('d', linePriceCarburant(priceCarburant.map(price => price.diesel)));

containerFramePriceCarburant
  .append('path')
  .attr('stroke', colors.gasoline)
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  // array of values describing the price of gasoline
  .attr('d', linePriceCarburant(priceCarburant.map(price => price.gasoline)));

// to show a tooltip whenever hovering on the visualization (and not only on the exact lines), add an additional set of elments
// one group for each data point (used for the mouseenter event)
const containerGroupsPriceCarburant = containerFramePriceCarburant
  // ! target a class as to avoid selecting already existing groups (the ones included for the axes)
  .selectAll('g.point')
  .data(priceCarburant)
  .enter()
  .append('g')
  .attr('class', 'point')
  // on mouseenter detail the information connected to the highlighted group elements
  // select also the connected circle element to change its radius
  .on('mouseenter', function (d, i) {
    const { diesel, gasoline } = priceCarburant[i];
    const date = dateInstance(i, 5, 2017);

    // add one paragraph for the date, one for each measurement
    tooltip
      .append('p')
      .append('strong')
      .text(formatDate(date));

    // detail classes to include the pseudo element crafted in CSS
    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Diesel: <strong>${diesel} €/L</strong>`);

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Gasoline: <strong>${gasoline} €/L</strong>`);

    // show the tooltip
    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);

    // highlight the nested circle element
    d3
      .select(this)
      .selectAll('circle')
      .attr('r', '5px');
  })
  // on mouseout restore the default values
  .on('mouseout', function () {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();

    d3
      .select(this)
      .selectAll('circle')
      .attr('r', 0);
  });

// circle elements (positioned at the exact coordinate of each data point)
// for diesel
containerGroupsPriceCarburant
  .append('circle')
  .attr('cx', (d, i) => xScalePriceCarburant(dateInstance(i, 5, 2017)))
  .attr('cy', d => yScalePriceCarburant(d.diesel))
  .attr('stroke', `${colors.diesel}${colors.transparency[4]}`)
  .attr('stroke-width', '15px')
  .attr('fill', colors.diesel)
  // by default with null radius, increased on hover on the connected group element
  // .attr('r', '5')
  .attr('r', '0');

// for gasoline
containerGroupsPriceCarburant
  .append('circle')
  .attr('cx', (d, i) => xScalePriceCarburant(dateInstance(i, 5, 2017)))
  .attr('cy', d => yScalePriceCarburant(d.gasoline))
  .attr('stroke', `${colors.gasoline}${colors.transparency[4]}`)
  .attr('stroke-width', '15px')
  .attr('fill', colors.gasoline)
  .attr('r', '0');

// transparent rectangles matching the height of the visualization
containerGroupsPriceCarburant
  .append('rect')
  .attr('y', 0)
  .attr('height', heightPriceCarburant)
  // centered in the horizontal coordinate of each point
  .attr('x', (d, i) => xScalePriceCarburant(dateInstance(i, 5, 2017)) - (xScalePriceCarburant(dateInstance(1, 5, 2017)) / 2))
  // occupying the space between the point and the following value
  .attr('width', (d, i) => xScalePriceCarburant(dateInstance(i + 1, 5, 2017)) - xScalePriceCarburant(dateInstance(i, 5, 2017)))
  .attr('fill', 'transparent');

// detail a connecting line through a simple SVG element
// the width variables will be shared by all elements to which a class of .connecting is added
const widthConnecting = 500;
const heightConnecting = 100;

const connectPriceCarburant = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectPriceCarburant
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

connectPriceCarburant
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// nest headings in a utiltity container when they appear on their own to connect other elements
container
  .append('div')
  .attr('class', 'intermittent')
  .append('h3')
  .text('Is it because of taxes?');

// introduce the first fork on the road with another connecting svg element
const connectFirstFork = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

// this one detailing two arrows pointing toward a portion of the width
connectFirstFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} ${widthConnecting / 20} ${heightConnecting / 5} h ${widthConnecting / 20} q ${widthConnecting / 6} 0 ${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectFirstFork
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

connectFirstFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} -${widthConnecting / 20} ${heightConnecting / 5} h -${widthConnecting / 20} q -${widthConnecting / 6} 0 -${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectFirstFork
  .append('path')
  .attr('d', `M ${widthConnecting * 1 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// first fork in the road, displaying different text/visualizations in each column
const taxesFork = container
  .append('div')
  .attr('class', 'fork');

// first half of the fork
const taxesFirstHalf = taxesFork
  .append('div')
  .attr('class', 'half');

// COLUMN chart highlighting the portion of increase due to taxes
const containerPriceRiseTaxes = taxesFirstHalf
  .append('div')
  .attr('class', 'visualization');

// introductory HTML elements
containerPriceRiseTaxes
  .append('h3')
  .text('Yes');

containerPriceRiseTaxes
  .append('h4')
  .text('A little');

containerPriceRiseTaxes
  .append('div')
  .attr('class', 'message')
  .append('p')
  .text('A third of the rise in prices is explained by higher taxes.');

// SVG FRAME
// margin, width and height shared by both column charts
const marginPriceRise = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 20
};
const widthPriceRise = 500 - (marginPriceRise.left + marginPriceRise.right);
const heightPriceRise = 500 - (marginPriceRise.top + marginPriceRise.bottom);

const containerFramePriceRiseTaxes = containerPriceRiseTaxes
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceRise + (marginPriceRise.left + marginPriceRise.right)} ${heightPriceRise + (marginPriceRise.top + marginPriceRise.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceRise.left}, ${marginPriceRise.top})`);

// SCALES and AXES
// ! the y axis is not shown
// the scales and axes are also shared by the column chart on the other fork
// x: band scale for the two values
const xScalePriceRise = d3
  .scaleBand()
  .domain(d3.range(2))
  .range([0, widthPriceRise]);

// show the x axis without ticks
const xAxisPriceRise = d3
  .axisBottom(xScalePriceRise)
  .tickFormat('')
  .tickSize(0);

containerFramePriceRiseTaxes
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightPriceRise})`)
  .call(xAxisPriceRise);

// y scale: linear scale capping to 100 (percent)
const yScalePriceRise = d3
  .scaleLinear()
  .domain([0, max.percent])
  .range([0, heightPriceRise]);

// add text labels _below_ the x axis
// gasoline
containerFramePriceRiseTaxes
  .append('text')
  .text('Gasoline')
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.4rem')
  .attr('alignment-baseline', 'hanging')
  .attr('x', xScalePriceRise(0) + xScalePriceRise.bandwidth() / 2)
  .attr('y', heightPriceRise + marginPriceRise.top);

// diesel
containerFramePriceRiseTaxes
  .append('text')
  .text('Diesel')
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.4rem')
  .attr('alignment-baseline', 'hanging')
  .attr('x', xScalePriceRise(1) + xScalePriceRise.bandwidth() / 2)
  .attr('y', heightPriceRise + marginPriceRise.top);

// add one group for each data point
const containerGroupsPriceRiseTaxes = containerFramePriceRiseTaxes
  .selectAll('g.group')
  .data(priceRise)
  .enter()
  .append('g')
  .attr('class', 'group')
  // when hovering on a group element show connected information
  .on('mouseenter', function (d, i) {
    const { rise, taxes } = d;

    tooltip
      .append('p')
      .attr('class', `${priceRise[i].type}`)
      .append('strong')
      .text(`${priceRise[i].type}`)
      .style('text-transform', 'capitalize');

    tooltip
      .append('p')
      .html(`Increase: <strong>${rise} cents</strong>`);

    tooltip
      .append('p')
      .html(`Taxes: <strong>${taxes}%</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);

    d3
      .select(this)
      .attr('opacity', 0.7);
  })
  .on('mouseout', function () {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();

    d3
      .select(this)
      .attr('opacity', 1);
  });

// for each group add two rectangles, describing the portion due to taxes (highlighted) and other costs
containerGroupsPriceRiseTaxes
  .append('rect')
  // horizontally centered att 1/4, 3/4 of the horizontal dimension
  .attr('x', (d, i) => xScalePriceRise(i) + xScalePriceRise.bandwidth() / 4)
  .attr('width', xScalePriceRise.bandwidth() / 2)
  // vertically using the taxes value
  .attr('y', 0)
  .attr('height', d => yScalePriceRise(d.taxes))
  .attr('fill', (d, i) => ((i === 0) ? colors.gasoline : colors.diesel));

// same structure for the section devoted to other costs, but with a transparent fill
containerGroupsPriceRiseTaxes
  .append('rect')
  .attr('x', (d, i) => xScalePriceRise(i) + xScalePriceRise.bandwidth() / 4)
  .attr('width', xScalePriceRise.bandwidth() / 2)
  .attr('y', d => yScalePriceRise(d.taxes))
  .attr('height', d => yScalePriceRise(100 - d.taxes))
  .attr('fill', (d, i) => ((i === 0) ? colors.gasoline : colors.diesel))
  .attr('opacity', 0.4);

// for each group add also a path element and a text label marking the highlighted section
containerGroupsPriceRiseTaxes
  .append('path')
  .attr('d', (d, i) => {
    const tabWidth = xScalePriceRise.bandwidth() / 10;
    const tabHeight = yScalePriceRise(d.taxes);
    const tabOriginY = yScalePriceRise(0);
    if (i === 0) {
      return `M ${xScalePriceRise(i) + tabWidth * 2} ${tabOriginY} h ${-tabWidth} v ${tabHeight} h ${tabWidth}`;
    }
    return `M ${widthPriceRise - tabWidth * 2} ${tabOriginY} h ${tabWidth} v ${tabHeight} h ${-tabWidth}`;
  })
  .attr('fill', 'none')
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

containerGroupsPriceRiseTaxes
  .append('text')
  .attr('x', (d, i) => (i === 0 ? xScalePriceRise(i) : widthPriceRise))
  .attr('y', d => yScalePriceRise(d.taxes) / 2)
  .attr('text-anchor', 'middle')
  .style('writing-mode', 'vertical-rl')
  .style('text-transform', 'capitalize')
  .text(d => `Taxes: ${d.taxes}%`);

// append also a rectangle for the tooltip
// enveloping the entire svg frame
containerGroupsPriceRiseTaxes
  .append('rect')
  .attr('x', (d, i) => xScalePriceRise(i))
  .attr('width', xScalePriceRise.bandwidth())
  .attr('y', yScalePriceRise(0))
  .attr('height', yScalePriceRise(max.percent))
  .attr('fill', 'transparent');

// below the visualization add a connecting line
const connectPriceRiseTaxes = taxesFirstHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectPriceRiseTaxes
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectPriceRiseTaxes
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -7 -7 h 14 l -7 7`)
  .attr('fill', colors.black);

// intermittent header
taxesFirstHalf
  .append('div')
  .attr('class', 'intermittent')
  .append('h3')
  .text('But why has the government raised taxes?');

// COLUMN chart showing the taxes on diesel and gasoline side by side
const containerTaxesRise = taxesFirstHalf
  .append('div')
  .attr('class', 'visualization');

// introductory HTML elements
containerTaxesRise
  .append('p')
  .html('First, to <strong>suppress fiscal advantges toward diesel</strong>.');

containerTaxesRise
  .append('p')
  .text('In 2013, it was taxed less than gasoline (-20 cents/l). In 2021, it\'ll be taxed with the same rate.');

// SVG FRAME
const marginTaxesRise = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 20
};

const widthTaxesRise = 500 - (marginTaxesRise.left + marginTaxesRise.right);
const heightTaxesRise = 300 - (marginTaxesRise.top + marginTaxesRise.bottom);

const containerFrameTaxesRise = containerTaxesRise
  .append('svg')
  .attr('viewBox', `0 0 ${widthTaxesRise + (marginTaxesRise.left + marginTaxesRise.right)} ${heightTaxesRise + (marginTaxesRise.top + marginTaxesRise.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginTaxesRise.left}, ${marginTaxesRise.top})`);

// SCALES and AXES
// x: a scale band to plot ten groups
const xScaleTaxesRise = d3
  .scaleBand()
  .domain(d3.range(10))
  .range([0, widthTaxesRise]);

// show only the first and last tick, displaying a value for the year
const xAxisTaxesRise = d3
  .axisBottom(xScaleTaxesRise)
  .tickSize(0)
  .tickPadding(20)
  .tickFormat((d, i) => ((i === 0 || i === taxesRise.length - 1) ? i + 2013 : ''));

containerFrameTaxesRise
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightTaxesRise})`)
  .call(xAxisTaxesRise);

// y: linear scale from 0 to the maximum value (which for the last observation is the same for both types)
const yScaleTaxesRise = d3
  .scaleLinear()
  .domain([0, d3.max(taxesRise, d => d.gasoline)])
  .range([0, heightTaxesRise]);

// append one group for each observation
const containerGroupsTaxesRise = containerFrameTaxesRise
  .selectAll('g.group')
  .data(taxesRise)
  .enter()
  .append('g')
  .attr('class', 'group')
  // horizontally position each group according to the index
  .attr('transform', (d, i) => `translate(${xScaleTaxesRise(i)}, 0)`)
  // on hover show connected information
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .attr('opacity', 0.8);

    const year = 2013 + i;
    const { diesel, gasoline } = d;
    tooltip
      .append('p')
      .append('strong')
      .text(year);

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Taxes on gasoline: <strong>${gasoline} €/L</strong>`);

    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Taxes on diesel: <strong>${diesel} €/L</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .attr('opacity', 1);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// for each group add two rectangles
// positioning the first just before the midpoint, the second just following it
containerGroupsTaxesRise
  .append('rect')
  .attr('class', 'gasoline')
  .attr('x', xScaleTaxesRise.bandwidth() / 4)
  .attr('y', d => heightTaxesRise - yScaleTaxesRise(d.gasoline))
  .attr('width', xScaleTaxesRise.bandwidth() / 4)
  .attr('height', d => yScaleTaxesRise(d.gasoline))
  .attr('fill', colors.gasoline);

containerGroupsTaxesRise
  .append('rect')
  .attr('class', 'diesel')
  .attr('x', xScaleTaxesRise.bandwidth() / 2)
  .attr('y', d => heightTaxesRise - yScaleTaxesRise(d.diesel))
  .attr('width', xScaleTaxesRise.bandwidth() / 4)
  .attr('height', d => yScaleTaxesRise(d.diesel))
  .attr('fill', colors.diesel);

// add also a transparent rectangle to display the tooltip whenever hovering horizontally on the visualization
containerGroupsTaxesRise
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', xScaleTaxesRise.bandwidth())
  .attr('height', heightTaxesRise)
  .attr('fill', 'transparent');

// add a connecting line
const connectTaxesRise = taxesFirstHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectTaxesRise
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectTaxesRise
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -7 -7 h 14 l -7 7`)
  .attr('fill', colors.black);

// detail text elements connecting toward the rest of the application
const dieselPollution = taxesFirstHalf
  .append('div')
  .attr('class', 'visualization');

dieselPollution
  .append('h3')
  .text('But diesel pollutes less than gasoline, right?');

dieselPollution
  .append('p')
  .text('One often hears that diesel vehicles consume less fuel, which allows them to emit less CO2 than gasoline vehicles (even if few sources are less certain on the subject).');

dieselPollution
  .append('p')
  .html('But <strong>it is not true for all types of pollution</strong>. Diesel vehicles, in particular older models, emit more fine particles in the air. They are the principal cause behind 48 000 deaths caused every year in France.');


// second half of the fork
// starting by replicating the same visualization, but highlighting the other section, and continuing with line charts
const taxesSecondHalf = taxesFork
  .append('div')
  .attr('class', 'half');

// COLUMN chart highlighting the portion of increase due to other costs
const containerPriceRiseOther = taxesSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerPriceRiseOther
  .append('h3')
  .text('No');

containerPriceRiseOther
  .append('h4')
  .text('Essentially');

// introductory HTML elements
containerPriceRiseOther
  .append('div')
  .attr('class', 'message')
  .append('p')
  .text('The rest is mainly explained by the cost of fuel without taxes.');

// SVG FRAME
// margin, width and height values are the same of the previous visualization
const containerFramePriceRiseOther = containerPriceRiseOther
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceRise + (marginPriceRise.left + marginPriceRise.right)} ${heightPriceRise + (marginPriceRise.top + marginPriceRise.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceRise.left}, ${marginPriceRise.top})`);

// SCALES and AXES
// the same scales and axes made for the first fork are used
containerFramePriceRiseOther
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightPriceRise})`)
  .call(xAxisPriceRise);

// add text labels _below_ the x axis
// gasoline
containerFramePriceRiseOther
  .append('text')
  .text('Gasoline')
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.4rem')
  .attr('alignment-baseline', 'hanging')
  .attr('x', xScalePriceRise(0) + xScalePriceRise.bandwidth() / 2)
  .attr('y', heightPriceRise + marginPriceRise.top);

// diesel
containerFramePriceRiseOther
  .append('text')
  .text('Diesel')
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.4rem')
  .attr('alignment-baseline', 'hanging')
  .attr('x', xScalePriceRise(1) + xScalePriceRise.bandwidth() / 2)
  .attr('y', heightPriceRise + marginPriceRise.top);

// replicate the same structure of the first fork, but show the section devoted to other costs
const containerGroupsPriceRiseOther = containerFramePriceRiseOther
  .selectAll('g.group')
  .data(priceRise)
  .enter()
  .append('g')
  .attr('class', 'group')
  .on('mouseenter', function (d, i) {
    const { rise, taxes } = d;

    tooltip
      .append('p')
      .attr('class', `${priceRise[i].type}`)
      .append('strong')
      .text(`${priceRise[i].type}`)
      .style('text-transform', 'capitalize');

    tooltip
      .append('p')
      .html(`Increase: <strong>${rise} cents</strong>`);

    tooltip
      .append('p')
      // show other costs instead of taxes
      .html(`Other Costs: <strong>${100 - taxes}%</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);

    d3
      .select(this)
      .attr('opacity', 0.7);
  })
  .on('mouseout', function () {
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();

    d3
      .select(this)
      .attr('opacity', 1);
  });


containerGroupsPriceRiseOther
  .append('rect')
  .attr('x', (d, i) => xScalePriceRise(i) + xScalePriceRise.bandwidth() / 4)
  .attr('width', xScalePriceRise.bandwidth() / 2)
  .attr('y', 0)
  .attr('height', d => yScalePriceRise(d.taxes))
  .attr('fill', (d, i) => ((i === 0) ? colors.gasoline : colors.diesel))
  .attr('opacity', 0.4);

containerGroupsPriceRiseOther
  .append('rect')
  .attr('x', (d, i) => xScalePriceRise(i) + xScalePriceRise.bandwidth() / 4)
  .attr('width', xScalePriceRise.bandwidth() / 2)
  .attr('y', d => yScalePriceRise(d.taxes))
  .attr('height', d => yScalePriceRise(100 - d.taxes))
  .attr('fill', (d, i) => ((i === 0) ? colors.gasoline : colors.diesel));

// include a label next to the other cost section
containerGroupsPriceRiseOther
  .append('path')
  .attr('d', (d, i) => {
    const tabWidth = xScalePriceRise.bandwidth() / 10;
    const tabHeight = yScalePriceRise(100 - d.taxes);
    const tabOriginY = yScalePriceRise(d.taxes);
    if (i === 0) {
      return `M ${xScalePriceRise(i) + tabWidth * 2} ${tabOriginY} h ${-tabWidth} v ${tabHeight} h ${tabWidth}`;
    }
    return `M ${widthPriceRise - tabWidth * 2} ${tabOriginY} h ${tabWidth} v ${tabHeight} h ${-tabWidth}`;
  })
  .attr('fill', 'none')
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

// show a label for other costs
containerGroupsPriceRiseOther
  .append('text')
  .attr('x', (d, i) => (i === 0 ? xScalePriceRise(i) : widthPriceRise))
  .attr('y', d => heightPriceRise - yScalePriceRise(100 - d.taxes) / 2)
  .attr('font-size', '1.5rem')
  .attr('text-anchor', 'middle')
  .style('writing-mode', 'vertical-rl')
  .style('text-transform', 'capitalize')
  .text(d => `Other: ${100 - d.taxes}%`);

containerGroupsPriceRiseOther
  .append('rect')
  .attr('x', (d, i) => xScalePriceRise(i))
  .attr('width', xScalePriceRise.bandwidth())
  .attr('y', yScalePriceRise(0))
  .attr('height', yScalePriceRise(max.percent))
  .attr('fill', 'transparent');

// connecting element
const connectPriceRiseOther = taxesSecondHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectPriceRiseOther
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectPriceRiseOther
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -7 -7 h 14 l -7 7`)
  .attr('fill', colors.black);

// LINE chart displaying the price of a barrel of brent in dollars

const containerBrentRiseDollars = taxesSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerBrentRiseDollars
  .append('h3')
  .text('But why the raise?');

containerBrentRiseDollars
  .append('p')
  .html('Because of the <strong>price of oil</strong>.');

containerBrentRiseDollars
  .append('p')
  .text('The price of a barrel has almost tripled since 2016. This directly influences the price at the pump.');

// SVG FRAME
// margin, width and height are shared by the dollar and euro visualizations
const marginBrentRise = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50
};

const widthBrentRise = 500 - (marginBrentRise.left + marginBrentRise.right);
const heightBrentRise = 500 - (marginBrentRise.top + marginBrentRise.bottom);

const containerFrameBrentRiseDollars = containerBrentRiseDollars
  .append('svg')
  .attr('viewBox', `0 0 ${widthBrentRise + (marginBrentRise.left + marginBrentRise.right)} ${heightBrentRise + (marginBrentRise.top + marginBrentRise.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginBrentRise.left}, ${marginBrentRise.top})`);

// SCALES and axes
// x: a time scale starting from January 2009 and ending in October 2018
// the same scale is used for the euro counterpart
const xScaleBrentRise = d3
  .scaleTime()
  .domain([new Date('2009, 1'), new Date('2018, 10')])
  .range([0, widthBrentRise]);

// on the horizontal axis show only the first and last tick labels
const xAxisBrentRise = d3
  .axisBottom(xScaleBrentRise)
  .tickSize(0)
  .tickPadding(20)
  .tickFormat(d => ((formatAxes(d) === '2009' || formatAxes(d) === '2018') ? formatAxes(d) : ''));

containerFrameBrentRiseDollars
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightBrentRise})`)
  .call(xAxisBrentRise);


// y: a linear scale capping to 20% on top of the maximum value
// this scale changes for the euro counterpart
const yScaleBrentRiseDollars = d3
  .scaleLinear()
  .domain([0, d3.max(brentRiseDollar) * 1.2])
  .range([heightBrentRise, 0]);

// for the vertical axis show only a limited number of ticks
// exclude the first (the origin)
const yAxisBrentRiseDollars = d3
  .axisLeft(yScaleBrentRiseDollars)
  .tickSize(0)
  .tickPadding(10)
  .ticks(4)
  .tickFormat(d => (d === 0 ? '' : d));

// add grid lines for each vertical tick
containerFrameBrentRiseDollars
  .append('g')
  .attr('class', 'y axis')
  .call(yAxisBrentRiseDollars)
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${widthBrentRise}`)
  .style('opacity', 0.2)
  .attr('stroke', '#333333')
  .attr('stroke-width', '1px');


// line function
// horizontally based on a date instance created on the basis of the input index
// vertically based on the y scale value
const lineBrentRiseDollars = d3
  .line()
  .x((d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .y(d => yScaleBrentRiseDollars(d));

// add a line based on the function and the brent dataset
containerFrameBrentRiseDollars
  .append('path')
  .attr('d', lineBrentRiseDollars(brentRiseDollar))
  .attr('stroke', colors.brent)
  .attr('stroke-width', '3px')
  .attr('fill', 'none');

// add a group element for each data point, to include a circle element and rectangle elements
// this last visual included for the tooltip
const containerGroupsBrentRiseDollars = containerFrameBrentRiseDollars
  .selectAll('g.group')
  .data(brentRiseDollar)
  .enter()
  .append('g')
  .attr('class', 'group')
  // on hover detail connected information and highlight the circle element
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .select('circle')
      .attr('r', 6);

    tooltip
      .append('p')
      .append('strong')
      .text(formatDate(dateInstance(i, 1, 2009)));

    tooltip
      .append('p')
      .attr('class', 'brent')
      .html(`Price of a barrel of brent: <strong>${d}$</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .select('circle')
      .attr('r', 0);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

containerGroupsBrentRiseDollars
  .append('circle')
  .attr('cx', (d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .attr('cy', d => yScaleBrentRiseDollars(d))
  // .attr('r', 4)
  .attr('r', 0)
  .attr('fill', colors.brent)
  .attr('stroke', `${colors.brent}55`)
  .attr('stroke-width', '20px');

containerGroupsBrentRiseDollars
  .append('rect')
  .attr('x', (d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .attr('width', (d, i) => xScaleBrentRise(dateInstance(i + 1, 1, 2009) - xScaleBrentRise(dateInstance(i, 1, 2009))))
  .attr('y', 0)
  .attr('height', heightBrentRise)
  .attr('fill', 'transparent');

// connecting line
const connectBrentRiseDollars = taxesSecondHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectBrentRiseDollars
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectBrentRiseDollars
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -7 -7 h 14 l -7 7`)
  .attr('fill', colors.black);


// LINE chart displaying the price of a barrel of brent in euros

const containerBrentRiseEuros = taxesSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerBrentRiseEuros
  .append('h3')
  .text('Yes, but the price of a barrel of oil is less expensive than it was five years ago...');

containerBrentRiseEuros
  .append('p')
  .text('That\'s true if one considers the price of a barrel in dollars. It is however necessary to consider the exchange rate between dollar  and euro, which varies considerably.');

containerBrentRiseEuros
  .append('p')
  .html('In euro, <strong>the price of oil almost approaches the heights reached in 2012</strong>.');

// SVG FRAME
// using the same margin, width, height, horizontal scale
const containerFrameBrentRiseEuros = containerBrentRiseEuros
  .append('svg')
  .attr('viewBox', `0 0 ${widthBrentRise + (marginBrentRise.left + marginBrentRise.right)} ${heightBrentRise + (marginBrentRise.top + marginBrentRise.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginBrentRise.left}, ${marginBrentRise.top})`);

containerFrameBrentRiseEuros
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightBrentRise})`)
  .call(xAxisBrentRise);

// y: a linear scale, but related to the euro dataset
const yScaleBrentRiseEuros = d3
  .scaleLinear()
  .domain([0, d3.max(brentRiseEuro) * 1.2])
  .range([heightBrentRise, 0]);

const yAxisBrentRiseEuros = d3
  .axisLeft(yScaleBrentRiseEuros)
  .tickSize(0)
  .tickPadding(10)
  .ticks(3)
  .tickFormat(d => (d === 0 ? '' : d));

containerFrameBrentRiseEuros
  .append('g')
  .attr('class', 'y axis')
  .call(yAxisBrentRiseEuros)
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${widthBrentRise}`)
  .style('opacity', 0.2)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

// line function
// similarly to the counterpart for dollars
const lineBrentRiseEuros = d3
  .line()
  .x((d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .y(d => yScaleBrentRiseEuros(d));

// add a line based on the function and the brent dataset
containerFrameBrentRiseEuros
  .append('path')
  .attr('d', lineBrentRiseEuros(brentRiseEuro))
  .attr('stroke', colors.brent)
  .attr('stroke-width', '3px')
  .attr('fill', 'none');

// group elements for the circle and rectangles, mirroring the same behavior for the dollars counterpart
const containerGroupsBrentRiseEuros = containerFrameBrentRiseEuros
  .selectAll('g.group')
  .data(brentRiseEuro)
  .enter()
  .append('g')
  .attr('class', 'group')
  // on hover detail connected information and highlight the circle element
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .select('circle')
      .attr('r', 6);

    tooltip
      .append('p')
      .append('strong')
      .text(formatDate(dateInstance(i, 1, 2009)));

    tooltip
      .append('p')
      .attr('class', 'brent')
      .html(`Price of a barrel of brent: <strong>${d}€</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .select('circle')
      .attr('r', 0);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

containerGroupsBrentRiseEuros
  .append('circle')
  .attr('cx', (d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .attr('cy', d => yScaleBrentRiseEuros(d))
  // .attr('r', 4)
  .attr('r', 0)
  .attr('fill', colors.brent)
  .attr('stroke', `${colors.brent}55`)
  .attr('stroke-width', '20px');

containerGroupsBrentRiseEuros
  .append('rect')
  .attr('x', (d, i) => xScaleBrentRise(dateInstance(i, 1, 2009)))
  .attr('width', (d, i) => xScaleBrentRise(dateInstance(i + 1, 1, 2009) - xScaleBrentRise(dateInstance(i, 1, 2009))))
  .attr('y', 0)
  .attr('height', heightBrentRise)
  .attr('fill', 'transparent');


// connecting line
const connectBrentRiseEuros = taxesSecondHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectBrentRiseEuros
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectBrentRiseEuros
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -7 -7 h 14 l -7 7`)
  .attr('fill', colors.black);


// BAR showing the components of price
const containerPriceComponents = taxesSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerPriceComponents
  .append('h3')
  .text('Refineries and distributors, don\'t they have margins?');

containerPriceComponents
  .append('p')
  .text('Yes, but they are not responsible for the increase in prices.');

containerPriceComponents
  .append('p')
  .text('There are two types of margin:');

const containerPriceComponentsList = containerPriceComponents
  .append('ul');

containerPriceComponentsList
  .append('li')
  .text('those of refineries, varying, but rather limited (2-5 cents/l).');

containerPriceComponentsList
  .append('li')
  .text('those of distributors, which vary heavily between establishment (on average 11 cents/l).');

// SVG FRAME
const marginPriceComponents = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 20
};
const widthPriceComponents = 500 - (marginPriceComponents.left + marginPriceComponents.right);
const heightPriceComponents = 300 - (marginPriceComponents.top + marginPriceComponents.bottom);

const containerFramePriceComponents = containerPriceComponents
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceComponents + (marginPriceComponents.left + marginPriceComponents.right)} ${heightPriceComponents + (marginPriceComponents.top + marginPriceComponents.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceComponents.left}, ${marginPriceComponents.top})`);

// SCALES AND AXES
// x: linear scale from 0 to 100 (percent)
const xScalePriceComponents = d3
  .scaleLinear()
  .domain([0, max.percent])
  .range([0, widthPriceComponents]);

// for the vertical dimension use a portion of the height
// additionally, no axes are being used; in their stead, use carefully placed text labels

// use a stack function to describe the coordinates of each rectangle element
const stack = d3
  .stack()
  // based on the properties of the dataset
  .keys(Object.keys(priceComponents));

// append one group for each array; then nest rectangles and text labels
const containerGroupsPriceComponents = containerFramePriceComponents
  .selectAll('g')
  // ! remember the stack function relies on an array of values detailing each set of data
  // in this instance, an array of a single object
  .data(stack([priceComponents]))
  .enter()
  .append('g')
  // position each group where each rectangle ought to begin
  .attr('transform', d => `translate(${xScalePriceComponents(d[0][0])}, 0)`);

containerGroupsPriceComponents
  .append('rect')
  // the origin is already set by the group element
  .attr('x', 0)
  // compute the width based on the end and start value of the stack
  .attr('width', d => xScalePriceComponents(d[0][1] - d[0][0]))
  // occupy a fourth of the height and center horizontally
  // this leaves three fourth of the height atop and below the rectangle for the text labels
  .attr('y', heightPriceComponents * 3 / 8)
  .attr('height', heightPriceComponents / 4)
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
containerGroupsPriceComponents
  .append('text')
  // horizontally position the labels slightly after or slightly before the midpoint of each rectangle
  // this to have a straight line side the label from the midpoint itself
  .attr('x', (d, i) => {
    const midPoint = xScalePriceComponents(d[0][1] - d[0][0]) / 2;
    if (i < 2) {
      return midPoint + 5;
    }
    return midPoint - 5;
  })
  // vertically offsetting each label and describing the first pair atop the rectangle
  // the second pair below it
  .attr('y', (d, i) => {
    // remember the rectangle starts at height*3/8 and ends at height*3/4
    if (i < 2) {
      // show the first two labels right at the top of the viz and at height/4
      return heightPriceComponents / 4 * i;
    }
    // mirroring the pattern, show the last two at 3/4 height and right at the bottom
    // ! important: you need to also change the alignment-baseline property to have the labels truly mirror the first pair
    return (heightPriceComponents * 3 / 4) + (heightPriceComponents / 4 * (i - 2));
  })
  // horizontally position the first two pair starting from the x coordinate, the latter ending there
  .attr('text-anchor', (d, i) => ((i < 2) ? 'start' : 'end'))
  // vertically change the alignment of the second pair to match the first two labels
  .attr('alignment-baseline', (d, i) => ((i < 2) ? 'auto' : 'hanging'))
  .attr('font-size', '0.7rem')
  .text((d, i) => `${priceComponentsDescription[i]}: ${d[0].data[Object.keys(priceComponents)[i]]}%`);

// add vertical lines visually connecting the text elements to the rectangle elements
containerGroupsPriceComponents
  .append('path')
  // starting from the midpoint and vertically reaching the text labels
  .attr('d', (d, i) => {
    const midPoint = xScalePriceComponents(d[0][1] - d[0][0]) / 2;
    if (i < 2) {
      return `M ${midPoint} ${heightPriceComponents * 3 / 8} V ${heightPriceComponents / 6 * i}`;
    }

    return `M ${midPoint} ${heightPriceComponents * 5 / 8} V ${(heightPriceComponents * 5 / 6) + (heightPriceComponents / 6 * (i - 2))}`;
  })
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

// element closing the fork
const connectPriceComponents = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

// this one detailing two arrows mergin in a single point in the middle
connectPriceComponents
  .append('path')
  .attr('d', `M ${widthConnecting / 4} 0 q 0 ${heightConnecting / 2} ${widthConnecting / 10} ${heightConnecting / 2} h ${widthConnecting / 25} q ${widthConnecting / 9} 0 ${widthConnecting * 11 / 100} ${heightConnecting / 2 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectPriceComponents
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} 0 q 0 ${heightConnecting / 2} -${widthConnecting / 10} ${heightConnecting / 2} h -${widthConnecting / 25} q -${widthConnecting / 9} 0 -${widthConnecting * 11 / 100} ${heightConnecting / 2 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectPriceComponents
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// end of the first fork
// STACKED COLUMN CHART displaying the split between taxes and other costs, for gasoline and diesel
const containerOtherCostsGasoline = container
  .append('div')
  .attr('class', 'visualization');

containerOtherCostsGasoline
  .append('div')
  .attr('class', 'message')
  .append('h3')
  .text('But in ten years, the increase in prices has been substantial. It must be because of taxes!');

containerOtherCostsGasoline
  .append('p')
  .html('Even there, only partially. Taxes have covered more than half the price of <strong>gasoline</strong> for a long time.');

// SVG FRAME
// margin, width and height shared by both column charts
// as well as the scales and axes
const marginOtherCosts = {
  top: 20,
  right: 40,
  bottom: 30,
  left: 40
};
const widthOtherCosts = 500 - (marginOtherCosts.left + marginOtherCosts.right);
const heightOtherCosts = 300 - (marginOtherCosts.top + marginOtherCosts.bottom);

const containerFrameOtherCostsGasoline = containerOtherCostsGasoline
  .append('svg')
  .attr('viewBox', `0 0 ${widthOtherCosts + (marginOtherCosts.left + marginOtherCosts.right)} ${heightOtherCosts + (marginOtherCosts.top + marginOtherCosts.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginOtherCosts.left}, ${marginOtherCosts.top})`);

// SCALES and AXES
// x: time scale between September 2009 to October 2018
const xScaleOtherCosts = d3
  .scaleTime()
  .domain([new Date('2008, 09'), new Date('2018, 10')])
  .range([0, widthOtherCosts]);

// show only two ticks
const xAxisOtherCosts = d3
  .axisBottom(xScaleOtherCosts)
  .tickSizeOuter(0)
  .tickPadding(10)
  .tickFormat(d => ((formatAxes(d) === '2009' || formatAxes(d) === '2018') ? formatAxes(d) : ''));

containerFrameOtherCostsGasoline
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightOtherCosts})`)
  .call(xAxisOtherCosts);

// y: linear scale between 0 and 100 (percent)
const yScaleOtherCosts = d3
  .scaleLinear()
  .domain([0, max.percent])
  .range([0, heightOtherCosts]);

// add one group per observation
const containerGroupsOtherCostsGasoline = containerFrameOtherCostsGasoline
  .selectAll('g.group')
  .data(otherCostsGasoline)
  .enter()
  .append('g')
  .attr('class', 'group')
  // horizontally translate the group where each rectangle ought to lie
  .attr('transform', (d, i) => `translate(${xScaleOtherCosts(dateInstance(i, 9, 2008))}, 0)`)
  // on hover detail connected information in the tooltip
  // reduce also the opacity of the group
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .attr('opacity', 0.7);

    tooltip
      .append('p')
      .append('strong')
      .text(formatDate(dateInstance(i, 9, 2008)));

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Portion explained by taxes: <strong>${100 - d}%</strong>`);

    tooltip
      .append('p')
      .attr('class', 'gasoline')
      .html(`Portion explained by other costs: <strong>${d}%</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .attr('opacity', 1);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// for each group add two rectangles, for the data point and the remainder from 100
containerGroupsOtherCostsGasoline
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 5)
  .attr('height', d => yScaleOtherCosts(d))
  .attr('stroke', '#fff')
  .attr('stroke-width', '1px')
  .attr('fill', `${colors.gasoline}${colors.transparency[3]}`);

containerGroupsOtherCostsGasoline
  .append('rect')
  .attr('x', 0)
  .attr('y', d => yScaleOtherCosts(d))
  .attr('width', (d, i) => xScaleOtherCosts(dateInstance(i + 1, 9, 2008)) - xScaleOtherCosts(dateInstance(i, 9, 2008)))
  .attr('height', d => yScaleOtherCosts(100 - d))
  .attr('stroke', '#fff')
  .attr('stroke-width', '1px')
  .attr('fill', `${colors.gasoline}`);

// add a dotted line halfway through the visualization
// ! add it after the stacked columns, as to have it overlaid on top
containerFrameOtherCostsGasoline
  .append('path')
  .attr('d', `M 0 ${yScaleOtherCosts(50)} h ${widthOtherCosts}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('stroke-dasharray', '10px');

// add also a simple text label marking the 50% threshold
containerFrameOtherCostsGasoline
  .append('text')
  .attr('x', widthOtherCosts + 5)
  .attr('y', yScaleOtherCosts(50))
  .attr('alignment-baseline', 'middle')
  .attr('font-weight', 'bold')
  .text('50%');

// repeat the same pattern with the diesel counterpart
const containerOtherCostsDiesel = container
  .append('div')
  .attr('class', 'visualization');

containerOtherCostsDiesel
  .append('p')
  .html('The portion of taxes is even larger for <strong>diesel</strong>, because of the \'catch-up\' of the taxation started in 2014. But it was already relevant ten years ago.');

const containerFrameOtherCostsDiesel = containerOtherCostsDiesel
  .append('svg')
  .attr('viewBox', `0 0 ${widthOtherCosts + (marginOtherCosts.left + marginOtherCosts.right)} ${heightOtherCosts + (marginOtherCosts.top + marginOtherCosts.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginOtherCosts.left}, ${marginOtherCosts.top})`);

containerFrameOtherCostsDiesel
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${heightOtherCosts})`)
  .call(xAxisOtherCosts);

const containerGroupsOtherCostsDiesel = containerFrameOtherCostsDiesel
  .selectAll('g.group')
  .data(otherCostsDiesel)
  .enter()
  .append('g')
  .attr('class', 'group')
  // horizontally translate the group where each rectangle ought to lie
  .attr('transform', (d, i) => `translate(${xScaleOtherCosts(dateInstance(i, 9, 2008))}, 0)`)
  // on hover detail connected information in the tooltip
  // reduce also the opacity of the group
  .on('mouseenter', function (d, i) {
    d3
      .select(this)
      .attr('opacity', 0.7);

    tooltip
      .append('p')
      .append('strong')
      .text(formatDate(dateInstance(i, 9, 2008)));

    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Portion explained by taxes: <strong>${100 - d}%</strong>`);

    tooltip
      .append('p')
      .attr('class', 'diesel')
      .html(`Portion explained by other costs: <strong>${d}%</strong>`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .attr('opacity', 1);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// for each group add two rectangles, for the data point and the remainder from 100
containerGroupsOtherCostsDiesel
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 5)
  .attr('height', d => yScaleOtherCosts(d))
  .attr('stroke', '#fff')
  .attr('stroke-width', '1px')
  .attr('fill', `${colors.diesel}${colors.transparency[3]}`);

containerGroupsOtherCostsDiesel
  .append('rect')
  .attr('x', 0)
  .attr('y', d => yScaleOtherCosts(d))
  .attr('width', (d, i) => xScaleOtherCosts(dateInstance(i + 1, 9, 2008)) - xScaleOtherCosts(dateInstance(i, 9, 2008)))
  .attr('height', d => yScaleOtherCosts(100 - d))
  .attr('stroke', '#fff')
  .attr('stroke-width', '1px')
  .attr('fill', `${colors.diesel}`);

containerFrameOtherCostsDiesel
  .append('path')
  .attr('d', `M 0 ${yScaleOtherCosts(50)} h ${widthOtherCosts}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('stroke-dasharray', '10px');

containerFrameOtherCostsDiesel
  .append('text')
  .attr('x', widthOtherCosts + 5)
  .attr('y', yScaleOtherCosts(50))
  .attr('alignment-baseline', 'middle')
  .attr('font-weight', 'bold')
  .text('50%');

// connecting line
const connectOtherCosts = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectOtherCosts
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

connectOtherCosts
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 7} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// SERIES of bars highlighting how much the state earns
const containerTaxesComponents = container
  .append('div')
  .attr('class', 'visualization');

const messageTaxesComponents = containerTaxesComponents
  .append('div')
  .attr('class', 'message');

messageTaxesComponents
  .append('h3')
  .text('How much does that make to the state?');

messageTaxesComponents
  .append('p')
  .style('color', '#FB5100')
  .style('font-weight', 'bold')
  .text('34 billions of euro');

containerTaxesComponents
  .append('p')
  .text('These come from the receipts for the TICPE, main tax on fuel, in 2018.');

containerTaxesComponents
  .append('p')
  .text('They are distributed to:');

const marginTaxesComponents = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const widthTaxesComponents = 500 - (marginTaxesComponents.left + marginTaxesComponents.right);
const heightTaxesComponents = 300 - (marginTaxesComponents.top + marginTaxesComponents.bottom);

const containerFrameTaxesComponents = containerTaxesComponents
  .append('svg')
  .attr('viewBox', `0 0 ${widthTaxesComponents + (marginTaxesComponents.left + marginTaxesComponents.right)} ${heightTaxesComponents + (marginTaxesComponents.top + marginTaxesComponents.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginTaxesComponents.left}, ${marginTaxesComponents.top})`);

// SCALES and AXES
// x: linear scale from 0 up to the greates value of the dataset
const xScaleTaxesComponents = d3
  .scaleLinear()
  .domain([0, d3.max(Object.values(taxesComponents))])
  .range([0, widthTaxesComponents]);

// no axes are being used
// additionally, the vertical dimension is simply coomputed on the basis of the height

// include one group for each value of the data point
const containerGroupsTaxesComponents = containerFrameTaxesComponents
  .selectAll('g')
  .data(Object.values(taxesComponents))
  .enter()
  .append('g')
  // vertically position each group at a fraction of the height
  .attr('transform', (d, i) => `translate(0, ${heightTaxesComponents / Object.values(taxesComponents).length * i})`);

// in each group add a text label and a rectangle scaled according to the bound data
containerGroupsTaxesComponents
  .append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('font-size', '0.9rem')
  .attr('font-weight', 'bold')
  .style('text-transform', 'capitalize')
  .text((d, i) => Object.keys(taxesComponents)[i]);

containerGroupsTaxesComponents
  .append('rect')
  .attr('x', 0)
  .attr('y', heightTaxesComponents / 16)
  .attr('width', d => xScaleTaxesComponents(d))
  .attr('height', heightTaxesComponents / 16)
  .attr('fill', colors.gasoline);

// add digits at the end of each bar, detailing the percentage
containerGroupsTaxesComponents
  .append('text')
  .attr('x', d => xScaleTaxesComponents(d))
  // centered in the rectangle
  .attr('y', heightTaxesComponents / 16)
  .attr('alignment-baseline', 'hanging')
  .attr('text-anchor', 'end')
  .attr('fill', '#333')
  .text(d => `${d}%`);

// line connecting text elements describing how the funds are spent
const connectTaxesComponents = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectTaxesComponents
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

connectTaxesComponents
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 7} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// header and paragraph elements detailing the way taxes are used
const containerTaxesExpenditure = container
  .append('div')
  .attr('class', 'visualization');

containerTaxesExpenditure
  .append('div')
  .attr('class', 'message')
  .append('h3')
  .text('What is the state doing of all that money?');

containerTaxesExpenditure
  .append('p')
  .append('strong')
  .text('It finances the ecological transition, but not only:');

containerTaxesExpenditure
  .append('p')
  .html('All collected taxes won\'t finance environmental measures: <strong>7.2 billions of euro are poured directly</strong>, on 33.8 billions total. The rest is versed in a common fund of the budget.');

containerTaxesExpenditure
  .append('p')
  .text('In a rather symptomatic manner, the 3.9 billions collected from the rise in taxes on fuel in 2019 will not influence the budget for ecological transition.');

// connecting element toward an ordered list detailing how the state fights again pollution
const connectTaxesExpenditure = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectTaxesExpenditure
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

connectTaxesExpenditure
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 7} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// header and ordered list describing  the way the state tackles pollution
const taxesMeasures = container
  .append('div')
  .attr('class', 'visualization');

taxesMeasures
  .append('div')
  .attr('class', 'message')
  .append('h3')
  .text('So, the state takes advantage of contributors under the pretext of fighting against pollution?');

taxesMeasures
  .append('p')
  .text('That is simplistic:');

const taxesMeasuresList = taxesMeasures
  .append('ol');

taxesMeasuresList
  .append('li')
  .html('the state and territorial collectivities <strong>finance the environmental transition on other basis</strong>.');

taxesMeasuresList
  .append('li')
  .html('Even if directed toward the general budget, <strong>taxes on carburants can be indirectly used to finance environmental measure</strong>, or other connected measures, like for the transport infrastructure.');

taxesMeasuresList
  .append('li')
  .html('That being said <strong>an greater effort in transparency</strong> could be achieved.');

// line connecting to the second fork
const connectTaxesMeasures = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectTaxesMeasures
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

connectTaxesMeasures
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 7} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// intermittent container directing toward the second fork
const intermittentPollution = container
  .append('div')
  .attr('class', 'intermittent');

intermittentPollution
  .append('h3')
  .text('But still, do our cars pollute that much?');

intermittentPollution
  .append('p')
  .text('Yes, really.');

// connecting element toward the second fork
const connectSecondFork = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectSecondFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} ${widthConnecting / 20} ${heightConnecting / 5} h ${widthConnecting / 20} q ${widthConnecting / 6} 0 ${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectSecondFork
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

connectSecondFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} -${widthConnecting / 20} ${heightConnecting / 5} h -${widthConnecting / 20} q -${widthConnecting / 6} 0 -${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectSecondFork
  .append('path')
  .attr('d', `M ${widthConnecting * 1 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// second fork in the road, displaying visualization on emissions
const pollutionFork = container
  .append('div')
  .attr('class', 'fork');

// first half of the fork
const pollutionFirstHalf = pollutionFork
  .append('div')
  .attr('class', 'half');


// HEATMAP displaying the compoments of pollution
const containerEmissionComponents = pollutionFirstHalf
  .append('div')
  .attr('class', 'visualization');

containerEmissionComponents
  .append('h4')
  .html('C0<sub>2</sub>');

containerEmissionComponents
  .append('p')
  .text('Cars and heavy weight vehicles are responsible for a substantial portion of the gas emissions in France.');

const marginEmissionComponents = {
  top: 20,
  right: 60,
  bottom: 100,
  left: 60
};

const widthEmissionComponents = 500 - (marginEmissionComponents.left + marginEmissionComponents.right);
const heightEmissionComponents = 500 - (marginEmissionComponents.top + marginEmissionComponents.bottom);

const containerFrameEmissionComponents = containerEmissionComponents
  .append('svg')
  .attr('viewBox', `0 0 ${widthEmissionComponents + (marginEmissionComponents.left + marginEmissionComponents.right)} ${heightEmissionComponents + (marginEmissionComponents.top + marginEmissionComponents.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginEmissionComponents.left}, ${marginEmissionComponents.top})`);

// include 100 rectangles with same width as height
containerFrameEmissionComponents
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
    return squareGap * (widthEmissionComponents / 10);
  })
  .attr('y', (d, i) => {
    // position the square vertically according to the unit
    // for the first (eleventh, twenty-first and so on): y = 0
    // for the second (twelvth, twenty-second and so forth) y = 0 + a portion of the height
    const numberString = i.toString();
    const unitString = numberString[numberString.length - 1];
    const unit = parseInt(unitString, 10);
    return unit * (heightEmissionComponents / 10);
  })
  .attr('width', widthEmissionComponents / 10)
  .attr('height', heightEmissionComponents / 10)
  // color the first squares according to the value for automobiles
  // the last squares according to the value of heavy eight vehicles
  .attr('fill', (d, i) => {
    if (i < emissionComponents.automobiles) {
      return colors.automobiles;
    }
    if (i < 100 - emissionComponents.heavyWeight) {
      return '#77777777';
    }
    return colors.heavyWeight;
  })
  // stroke equal to the background to fake a gap between the squares
  .attr('stroke', '#fff')
  .attr('stroke-width', '4px');

// append text labels below the heatmap
containerFrameEmissionComponents
  .append('text')
  .attr('x', 10)
  .attr('y', heightEmissionComponents + marginEmissionComponents.top * 2)
  .attr('font-weight', 'bold')
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.automobiles)
  .text(`${emissionComponents.automobiles} %`);

containerFrameEmissionComponents
  .append('text')
  .attr('x', 10)
  .attr('y', heightEmissionComponents + 5)
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.automobiles)
  .text('Automobiles');

// append text labels below the heatmap
containerFrameEmissionComponents
  .append('text')
  .attr('x', widthEmissionComponents - 10)
  .attr('y', heightEmissionComponents + 5)
  .attr('text-anchor', 'end')
  .attr('font-weight', 'bold')
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.heavyWeight)
  .text(`${emissionComponents.heavyWeight} %`);

containerFrameEmissionComponents
  .append('text')
  .attr('x', widthEmissionComponents - 10)
  .attr('y', heightEmissionComponents + marginEmissionComponents.top * 2)
  .attr('text-anchor', 'end')
  .attr('alignment-baseline', 'hanging')
  .attr('fill', colors.heavyWeight)
  .text('Heavy weight');

// include path straight lines visually connecting the labels with the heatmap
containerFrameEmissionComponents
  .append('path')
  .attr('d', `M ${5} ${heightEmissionComponents} v ${marginEmissionComponents.top}`)
  .attr('stroke', colors.automobiles)
  .attr('stroke-width', '3px');

containerFrameEmissionComponents
  .append('path')
  .attr('d', `M ${widthEmissionComponents - 5} ${heightEmissionComponents} v ${marginEmissionComponents.top * 2}`)
  .attr('stroke', colors.heavyWeight)
  .attr('stroke-width', '3px');


// second half of the fork
const pollutionSecondHalf = pollutionFork
  .append('div')
  .attr('class', 'half');

// text elements detailing the beginning of the fork
const containerAtmosphericPollution = pollutionSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerAtmosphericPollution
  .append('h4')
  .text('Atmospheric Pollution');

containerAtmosphericPollution
  .append('p')
  .html('Fine particles and in particular those emitted by old diesel vehicles, affect heavily the air quality and have <strong>health consequences</strong>.');

containerAtmosphericPollution
  .append('p')
  .text('On 425 000 premature deaths every year for the pollution of air in Europe, 10 000 can be attributed directly to emissions of nitrogen oxides, from diesel engines.');

// connecting line toward other text describing atmospheric pollution
const connectAtmosphericPollution = pollutionSecondHalf
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${(heightConnecting * 2)}`);

connectAtmosphericPollution
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${(heightConnecting * 2) - 7}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '2px');

connectAtmosphericPollution
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${(heightConnecting * 2) - 7} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// text elements describing the pollution provoked by new engines
const containerNewEngines = pollutionSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerNewEngines
  .append('h3')
  .text('Aren\'t new engines less pollutant?');

containerNewEngines
  .append('p')
  .html('Even most recent vehicles (gasoline as well as diesel) don\'t resolve all problems. <strong>Even electric cars have defects</strong>, notably tied to the lifecycle of batteries and the production of electricity required for their functioning.');

containerNewEngines
  .append('p')
  .html('Beyond the type of engine and carburant used, <strong>all vehicles pollute</strong>, because of degradation of tires, breaks and their global lifecycle.');

// connecting element closing the second fork
const connectNewEngines = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

// this one detailing two arrows mergin in a single point in the middle
connectNewEngines
  .append('path')
  .attr('d', `M ${widthConnecting / 4} 0 q 0 ${heightConnecting / 2} ${widthConnecting / 10} ${heightConnecting / 2} h ${widthConnecting / 25} q ${widthConnecting / 9} 0 ${widthConnecting * 11 / 100} ${heightConnecting / 2 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectNewEngines
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} 0 q 0 ${heightConnecting / 2} -${widthConnecting / 10} ${heightConnecting / 2} h -${widthConnecting / 25} q -${widthConnecting / 9} 0 -${widthConnecting * 11 / 100} ${heightConnecting / 2 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectNewEngines
  .append('path')
  .attr('d', `M ${widthConnecting / 2} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// intermittent header
container
  .append('div')
  .attr('class', 'intermittent')
  .append('h3')
  .text('Still, the price of fuel has reached delirious levels in France...');


// element connecting to the third fork
const connectThirdFork = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

connectThirdFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} ${widthConnecting / 20} ${heightConnecting / 5} h ${widthConnecting / 20} q ${widthConnecting / 6} 0 ${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectThirdFork
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

connectThirdFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} -${widthConnecting / 20} ${heightConnecting / 5} h -${widthConnecting / 20} q -${widthConnecting / 6} 0 -${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

connectThirdFork
  .append('path')
  .attr('d', `M ${widthConnecting * 1 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

// third fork in the road, displaying visualization on price across countries
const countriesFork = container
  .append('div')
  .attr('class', 'fork');

// first half of the fork
const countriesFirstHalf = countriesFork
  .append('div')
  .attr('class', 'half');

const containerHistoric = countriesFirstHalf
  .append('div')
  .attr('class', 'visualization');

containerHistoric
  .append('h4')
  .html('No more than before');

containerHistoric
  .append('p')
  .html('It is clear that the recent rise in prices weighs on the wallet of households. But compared to the purchasing power of minimum salary, <strong>the cost of gasoline is not at historic heights</strong> - far from there.');

containerHistoric
  .append('p')
  .text('Working an hour of minimum wage actually allows to purchase around six liters of gasoline, against only three liters forty years ago.');

// second half of the fork
const countriesSecondHalf = countriesFork
  .append('div')
  .attr('class', 'half');

const containerEurope = countriesSecondHalf
  .append('div')
  .attr('class', 'visualization');

containerEurope
  .append('h4')
  .html('And others in Europe?');

containerEurope
  .append('p')
  .html('<strong>France is in the top section</strong> in terms of price and level of taxation, but not in terms of disparate proportions.');

containerEurope
  .append('p')
  .text('Taxes represent between 50 and 70% of the price of fuel among the countries of the European Union.');

// BAR plot detailing the price of fuel across countries
// SVG FRAME
const marginCountries = {
  top: 20,
  right: 0,
  bottom: 20,
  left: 100
};
const widthCountries = 200 - (marginCountries.left + marginCountries.right);
const heightCountries = 500 - (marginCountries.top + marginCountries.bottom);

const containerFrameCountries = containerEurope
  .append('svg')
  .attr('viewBox', `0 0 ${widthCountries + (marginCountries.left + marginCountries.right)} ${heightCountries + (marginCountries.top + marginCountries.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginCountries.left}, ${marginCountries.top})`);

// SCALES AND AXES
// for the horizontal scale describe a linear scale from 0 to 2 (euro per liter)
const xScaleCountries = d3
  .scaleLinear()
  .domain([0, max.priceCarburant])
  .range([0, widthCountries]);

// for the vertical scale, a band scale based on an array of countries
const yScaleCountries = d3
  .scaleBand()
  .domain(countriesGasoline.map(countries => countries.country))
  .range([0, heightCountries]);

// for the horizontal dimension add an axis above the visualization
const xAxisCountries = d3
  .axisTop(xScaleCountries)
  .ticks(2)
  .tickSize(0)
  .tickFormat(d => `${d} €`);

containerFrameCountries
  .append('g')
  .attr('class', 'x axis small')
  .call(xAxisCountries);

// for the vertical dimension add labels for each country
const yAxisCountries = d3
  .axisLeft(yScaleCountries)
  .tickSizeOuter(0)
  .tickSize(0)
  .tickPadding(5);

containerFrameCountries
  .append('g')
  .attr('class', 'y axis small')
  .call(yAxisCountries);

// one one group for each data point
const containerGroupsCountries = containerFrameCountries
  .selectAll('g.group')
  .data(countriesGasoline)
  .enter()
  .append('g')
  .attr('class', 'group')
  .attr('transform', d => `translate(0, ${yScaleCountries(d.country)})`)
  // on hover detail pertinent information in the tooltip
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .attr('opacity', 0.7);

    tooltip
      .append('p')
      .append('strong')
      .text(d.country);

    tooltip
      .append('p')
      .html(`<strong>Total price of a liter of gasoline</strong>: ${formatDecimal(d.taxes + d.other)}€`);

    tooltip
      .append('p')
      .html(`<strong>Taxes</strong>: ${d.taxes}€`);

    tooltip
      .append('p')
      .html(`<strong>Others</strong>: ${d.other}€`);

    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .attr('opacity', 1);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

// for each group add a rectangle based on the described values
containerGroupsCountries
  .append('rect')
  .attr('x', 0)
  .attr('y', yScaleCountries.bandwidth() / 4)
  .attr('width', d => xScaleCountries(d.taxes))
  .attr('height', yScaleCountries.bandwidth() / 2)
  .attr('fill', d => ((d.country === 'France') ? colors.diesel : colors.gasoline));

containerGroupsCountries
  .append('rect')
  .attr('x', d => xScaleCountries(d.taxes))
  .attr('y', yScaleCountries.bandwidth() / 4)
  .attr('width', d => xScaleCountries(d.other))
  .attr('height', yScaleCountries.bandwidth() / 2)
  .attr('fill', d => ((d.country === 'France') ? `${colors.diesel}55` : `${colors.gasoline}${colors.transparency[3]}`));

// it might be beneficial to also include a rectangle spanning the entire width and height of the band
containerGroupsCountries
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', xScaleCountries(2))
  .attr('height', yScaleCountries.bandwidth())
  .attr('fill', 'transparent');
