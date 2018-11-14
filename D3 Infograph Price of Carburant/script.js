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
    type: 'diesel',
    rise: 31,
    taxes: 37
  },
  {
    type: 'gasoline',
    rise: 19,
    taxes: 34
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
const emissionsComponent = {
  car: 16,
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
  priceCarburant: 2
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
  transparency: ['ff', 'cc', 'aa', '88']
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

// LINE CHART describing the rising price of the price of fuel
const containerPriceCarburant = container
  .append('div')
  .attr('class', 'visualization');

// introductory HTML elements
const messagePriceCarburant = containerPriceCarburant
  .append('div')
  .attr('class', 'message');

messagePriceCarburant
  .append('h3')
  .text('Is the price of fuels really rising?');

messagePriceCarburant
  .append('p')
  .text('Yes');

const detailPriceCarburant = containerPriceCarburant
  .append('div')
  .attr('class', 'detail');

detailPriceCarburant
  .append('p')
  .text('From the beginning of the five year mandate:');

const messageList = detailPriceCarburant
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
  bottom: 25,
  left: 60
};

const widthPriceCarburant = 500 - (marginPriceCarburant.left + marginPriceCarburant.right);
const heightPriceCarburant = 400 - (marginPriceCarburant.top + marginPriceCarburant.bottom);

const containerFramePriceCarburant = containerPriceCarburant
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceCarburant + (marginPriceCarburant.left + marginPriceCarburant.right)} ${heightPriceCarburant + (marginPriceCarburant.top + marginPriceCarburant.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceCarburant.left}, ${marginPriceCarburant.top})`);

// scales and axes
// x: time scale for the selected time period
const xScalePriceCarburant = d3
  .scaleTime()
  .domain([new Date('2017, 5'), new Date('2018, 10')])
  .range([0, widthPriceCarburant]);

// on the horizontal axis show only the first and last labels
const xAxisPriceCarburant = d3
  .axisBottom(xScalePriceCarburant)
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

// on the vertical axes limit thenumber of ticks, but don't show the actual tick line
const yAxisPriceCarburant = d3
  .axisLeft(yScalePriceCarburant)
  .ticks(4)
  .tickSize(0)
  .tickPadding(5)
  .tickFormat(d => (d !== 0 ? `${d} €/L` : ''));

containerFramePriceCarburant
  .append('g')
  .attr('class', 'y axis')
  .call(yAxisPriceCarburant);

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
  .attr('stroke', `${colors.diesel}55`)
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
  .attr('stroke', `${colors.gasoline}55`)
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
const widthConnecting = 500;
const heightConnecting = 100;

const containerConnecting = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

containerConnecting
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 v ${heightConnecting - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px');

containerConnecting
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
const containerConnectingFork = container
  .append('svg')
  .attr('class', 'connecting')
  .attr('viewBox', `0 0 ${widthConnecting} ${heightConnecting}`);

// this one detailing two arrows pointing toward a portion of the width
containerConnectingFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} ${widthConnecting / 20} ${heightConnecting / 5} h ${widthConnecting / 20} q ${widthConnecting / 6} 0 ${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

containerConnectingFork
  .append('path')
  .attr('d', `M ${widthConnecting * 3 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);

containerConnectingFork
  .append('path')
  .attr('d', `M ${widthConnecting / 2} 0 q 0 ${heightConnecting / 5} -${widthConnecting / 20} ${heightConnecting / 5} h -${widthConnecting / 20} q -${widthConnecting / 6} 0 -${widthConnecting * 3 / 20} ${heightConnecting * 4 / 5 - 5}`)
  .attr('stroke', colors.black)
  .attr('stroke-width', '1px')
  .attr('fill', 'none');

containerConnectingFork
  .append('path')
  .attr('d', `M ${widthConnecting * 1 / 4} ${heightConnecting - 5} l -5 -5 h 10 l -5 5`)
  .attr('fill', colors.black);


const taxesFork = container
  .append('div')
  .attr('class', 'fork');

const taxesFirstHalf = taxesFork
  .append('div')
  .attr('class', 'half');

taxesFirstHalf
  .append('h3')
  .text('Yes');

taxesFirstHalf
  .append('h4')
  .text('A little');

const taxesSecondHalf = taxesFork
  .append('div')
  .attr('class', 'half');

taxesSecondHalf
  .append('h3')
  .text('No');

taxesSecondHalf
  .append('h4')
  .text('Essentially');

// COLUMNS highlighting the portion of increase due to taxes
