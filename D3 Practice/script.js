/*
// d3 viz @line 305

data is provided in the following arrays
- priceCarburant, detailing the price of diesel and gasoline
- priceRise, detailing the rise in price and the percentage in taxes
- taxesRise, detailing the rise of taxes for diesel and gasoline
- brentRise, detailing the rise of price for a barrel of oil
- brentRiseEuro, counterpart in euro
- priceComponents, detailing the division of the price of fuel
- taxesDiesel, detailing the percentage of the price devoted to taxes, for diesel
- taxesGasoline, counterpart for gasoline
- taxesComponents, detailing how taxes are divided by the state
- emissionsComponent, detailing the impact of automobiles and heavy weight vehicles on gas emissions
- countriesGasoline, detailing the price of gasoline for a selection of countries (divided in taxes/other cost)
*/

// time frame: monthly from may 2017 to october 2018
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
// other costs are computed by difference
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

// time range: yearly from 2013 to 2022
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

// time frame: monthly from january 2009 to october 2018
// from january 2009 to october 2018
const brentRise = [43.29, 43.26, 46.54, 50.19, 57.38, 68.68, 64.46, 72.52, 67.61, 72.52, 76.65, 74.46, 76.00, 73.00, 78.00, 84.00, 75.00, 74.00, 75.00, 77.00, 77.00, 82.00, 85.00, 91.00, 96.61, 103.73, 114.64, 123.21, 114.40, 114.30, 116.75, 110.38, 112.84, 109.55, 110.61, 107.87, 110.68, 119.44, 125.45, 119.75, 110.17, 95.16, 102.54, 113.36, 113.50, 111.70, 109.14, 109.46, 112.95, 116.13, 108.50, 101.95, 102.53, 102.92, 107.83, 111.29, 111.73, 109.80, 107.96, 110.76, 108.12, 108.91, 107.48, 107.66, 109.52, 111.80, 106.86, 101.66, 97.29, 87.46, 79.00, 62.51, 47.71, 58.10, 55.89, 59.61, 64.40, 61.47, 56.56, 46.52, 47.62, 48.43, 44.29, 38.50, 30.69, 32.20, 38.32, 41.58, 46.79, 48.25, 44.95, 45.67, 46.57, 49.52, 44.73, 53.31, 54.58, 54.87, 51.59, 52.36, 50.32, 46.37, 48.48, 51.70, 56.15, 57.50, 62.73, 64.38, 69.90, 65.32, 66.20, 72.60, 76.98, 74.40, 74.25, 72.44, 78.89, 81.30];
const brentRiseEuro = [32.7, 33.8, 35.7, 38.0, 42.1, 49.0, 45.8, 50.8, 46.4, 48.9, 51.4, 51.0, 53.3, 53.3, 57.5, 62.6, 59.7, 60.6, 58.7, 59.7, 58.9, 59.0, 62.2, 68.8, 72.3, 76.0, 81.9, 85.3, 79.7, 79.4, 81.8, 77.0, 81.9, 79.9, 81.6, 81.8, 85.8, 90.3, 95.0, 91.0, 86.0, 76.0, 83.4, 91.4, 88.3, 86.1, 85.1, 83.5, 85.0, 86.9, 83.7, 78.3, 79.0, 78.0, 82.4, 83.6, 83.7, 80.5, 80.0, 80.8, 79.4, 79.7, 77.8, 77.9, 79.8, 82.3, 78.9, 76.3, 75.4, 69.0, 63.3, 50.7, 41.1, 51.2, 30.4, 33.5, 57.8, 54.8, 28.3, 41.8, 42.4, 43.1, 25.5, 20.5, 16.5, 29.0, 34.5, 36.7, 41.4, 43.0, 40.6, 40.7, 41.5, 44.9, 24.9, 34.5, 33.8, 33.4, 30.6, 30.4, 45.5, 41.3, 42.1, 43.8, 47.1, 48.9, 53.4, 54.4, 57.3, 52.9, 53.7, 59.1, 65.2, 63.7, 63.5, 62.7, 67.7, 70.8];

const priceComponents = {
  oilCrude: 30,
  taxes: 60,
  marginDistributor: 7,
  marginRefine: 3
};

// time frame: monthly from september 2008 to october 2018
const taxesDiesel = [48.2, 45.1, 40.6, 40.1, 39.2, 38.4, 39.5, 39.5, 41.8, 40.9, 42.5, 41.5, 42.0, 42.8, 42.5, 43.8, 44.1, 45.4, 46.6, 46.9, 46.9, 46.0, 46.1, 46.3, 46.9, 47.3, 48.7, 49.4, 50.2, 51.5, 51.6, 50.5, 50.5, 50.6, 50.3, 50.8, 51.2, 51.9, 51.7, 52.5, 52.6, 53.2, 52.9, 52.2, 50.9, 51.7, 53.2, 54.1, 54.2, 53.7, 52.1, 51.9, 52.4, 52.0, 51.0, 50.5, 50.4, 50.9, 51.1, 51.4, 50.5, 50.2, 50.6, 50.2, 50.2, 49.7, 49.6, 49.6, 49.7, 49.5, 49.4, 49.2, 48.3, 47.5, 44.5, 40.2, 42.8, 43.5, 43.3, 44.4, 43.8, 42.3, 40.3, 39.8, 39.7, 39.6, 36.7, 33.2, 33.1, 35.1, 35.4, 37.8, 39.2, 37.7, 36.9, 37.4, 39.3, 38.8, 40.6, 40.2, 40.1, 39.3, 39.4, 38.2, 37.0, 36.8, 37.7, 38.6, 39.3, 40.3, 40.6, 39.7, 39.1, 38.9, 39.9, 41.3, 41.7, 41.2, 41.3, 42.1, 43.3];
const taxesGasoline = [36.8, 31.4, 27.6, 28.6, 30.3, 30.5, 31.7, 33.4, 35.9, 34.5, 36.0, 34.7, 34.6, 35.7, 35.3, 36.7, 37.3, 38.8, 39.5, 39.3, 38.9, 38.1, 37.9, 37.9, 38.5, 39.0, 40.7, 41.7, 42.0, 43.0, 43.8, 43.7, 42.9, 43.0, 42.7, 43.3, 42.7, 42.6, 42.7, 44.1, 44.9, 46.2, 46.5, 44.9, 43.5, 44.1, 45.9, 46.4, 45.9, 44.6, 43.7, 44.3, 45.4, 45.2, 44.1, 43.5, 43.6, 43.8, 44.0, 43.6, 42.4, 42.2, 42.7, 42.4, 42.7, 42.6, 42.8, 43.0, 43.3, 43.3, 42.4, 42.2, 41.3, 40.1, 37.0, 33.9, 36.3, 38.0, 38.4, 39.4, 39.6, 39.1, 37.2, 34.9, 34.4, 34.5, 33.6, 32.2, 31.1, 31.9, 33.7, 34.7, 35.5, 33.5, 32.8, 33.3, 34.8, 34.2, 35.8, 36.6, 36.8, 35.8, 36.3, 35.2, 34.3, 33.4, 34.1, 35.1, 34.7, 36.3, 36.4, 36.4, 36.2, 35.9, 36.9, 38.2, 38.6, 38.2, 38.6, 38.9, 39.0];

const taxesComponents = {
  state: 61,
  regions: 18,
  departments: 18,
  infrastructure: 3
};

// carburantComponents detail the contribution of vehicles to the emission of gas
const emissionsComponent = {
  car: 16,
  heavyWeight: 6
};

// gasolineCountries details the price of gasoline, divided in taxes and other costs, for a selection of countries
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

// select the single container
const container = d3
  .select('.container');

// add a div for the tooltip, shared by all visualizations
const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// LINE CHART: price of carburant
// html elements
const containerPriceCarburant = container
  .append('div')
  .attr('class', 'visualization');

containerPriceCarburant
  .append('h3')
  .text('Has the price of carburant really risen?');

containerPriceCarburant
  .append('p')
  .style('margin', '0.25rem 0 0.5rem')
  .text('Yes');

// SVG FRAME
const marginPriceCarburant = {
  top: 20,
  right: 70,
  bottom: 50,
  left: 70
};
const widthPriceCarburant = 500 - (marginPriceCarburant.left + marginPriceCarburant.right);
const heightPriceCarburant = 500 - (marginPriceCarburant.top + marginPriceCarburant.bottom);

const containerFramePriceCarburant = containerPriceCarburant
  .append('svg')
  .attr('viewBox', `0 0 ${widthPriceCarburant + (marginPriceCarburant.left + marginPriceCarburant.right)} ${heightPriceCarburant + (marginPriceCarburant.top + marginPriceCarburant.bottom)}`)
  .append('g')
  .attr('transform', `translate(${marginPriceCarburant.left}, ${marginPriceCarburant.top})`);

// add text labels for the rise of diesel and gasoline
const dieselGap = d3.max(priceCarburant, d => d.diesel) - d3.min(priceCarburant, d => d.diesel);
const gasolineGap = d3.max(priceCarburant, d => d.gasoline) - d3.min(priceCarburant, d => d.gasoline);

const format = d3.format('.2');
containerFramePriceCarburant
  .append('text')
  .attr('x', widthPriceCarburant / 2)
  .attr('y', heightPriceCarburant / 2)
  .attr('fill', '#555')
  .attr('font-weight', 'bold')
  .text(`Diesel: +${(format(dieselGap) * 100)} cents`);

containerFramePriceCarburant
  .append('text')
  .attr('x', widthPriceCarburant / 2)
  .attr('y', heightPriceCarburant / 6)
  .attr('fill', '#555')
  .attr('font-weight', 'bold')
  .text(`Gasoline: +${(format(gasolineGap) * 100)} cents`);

// scales and axes
// for the horizontal scale detail a time scale ranging from may 2017 to october 2018
const xScalePriceCarburant = d3
  .scaleTime()
  // month is here an integer between 1 and 12
  .domain([new Date('2017, 5, 1'), new Date('2018, 10, 1')])
  .range([0, widthPriceCarburant]);

// for the vertical scale detail a linear scale going from 0 to 2 (bucks)
const yScalePriceCarburant = d3
  .scaleLinear()
  .domain([0, 2])
  .range([heightPriceCarburant, 0]);

// detail a function to format the dates
const timeFormat = d3.timeFormat('%b %Y');

// on the horizontal axis show only the first and last elements
const xAxisPriceCarburant = d3
  .axisBottom(xScalePriceCarburant)
  .tickFormat((d, i) => ((i === 0 || i === priceCarburant.length - 1) ? timeFormat(d) : ''));

// on the vertical axes show a limited number of ticks
const yAxisPriceCarburant = d3
  .axisLeft(yScalePriceCarburant)
  .ticks(4)
  .tickSize(0)
  .tickPadding(5)
  .tickFormat(d => (d !== 0 ? `${d}€/L` : ''));

// when adding the vertical axis add grid lines spanning the entirety of the width
containerFramePriceCarburant
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${heightPriceCarburant})`)
  .call(xAxisPriceCarburant);

containerFramePriceCarburant
  .append('g')
  .attr('class', 'axis')
  .call(yAxisPriceCarburant)
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${widthPriceCarburant}`)
  .attr('opacity', 0.3);

// line function
const linePriceCarburant = d3
  .line()
  // the horizontal mark is based on a date object, passed in the horizontal scale with a varying month value
  .x((d, i) => {
    const startingMonth = 5;
    const startingYear = 2017;

    let currentMonth = startingMonth + i;
    let currentYear = startingYear;
    if (currentMonth > 12) {
      currentMonth -= 12;
      currentYear += 1;
    }
    return xScalePriceCarburant(new Date(`${currentYear}, ${currentMonth}, 1`));
  })
  // the vertical mark is purely based on the data point
  .y(d => yScalePriceCarburant(d))
  .curve(d3.curveStepAfter);

// add two lines through path elements and the line function
// each time passing an array with the actual price values
containerFramePriceCarburant
  .append('path')
  .attr('class', 'priceDiesel')
  .attr('stroke', '#2B70B4')
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  .attr('d', linePriceCarburant(priceCarburant.map(price => price.diesel)));

containerFramePriceCarburant
  .append('path')
  .attr('class', 'priceGasoline')
  .attr('stroke', '#BFE2D0')
  .attr('stroke-width', '2px')
  .attr('fill', 'none')
  .attr('d', linePriceCarburant(priceCarburant.map(price => price.gasoline)));

// add a series of rectangles on top of the path elements to show the tooltip whenever the cursor hovers horizontally
containerFramePriceCarburant
  .selectAll('rect')
  // include as many rectangles as there are data points
  .data(priceCarburant)
  .enter()
  .append('rect')
  // spanning the entire height
  .attr('y', 0)
  .attr('height', heightPriceCarburant)
  // occupying a portion of the total width
  // ! TODO: section to be revised as to incorporate all values
  .attr('x', (d, i) => (widthPriceCarburant / (priceCarburant.length - 1)) * (i - 1))
  .attr('width', (d, i) => widthPriceCarburant / (priceCarburant.length))
  .attr('fill', 'transparent')
  .on('mouseenter', (d, i) => {
    // on mouseenter display the price of gasoline and fuel for the respective time frame
    const { diesel, gasoline } = priceCarburant[i];

    const startingMonth = 5;
    const startingYear = 2017;

    let currentMonth = startingMonth + i;
    let currentYear = startingYear;
    if (currentMonth > 12) {
      currentMonth -= 12;
      currentYear += 1;
    }

    const date = new Date(`${currentYear}, ${currentMonth}, 1`);

    tooltip
      .append('p')
      .text(`${timeFormat(date)}`);

    tooltip
      .append('p')
      .text('Diesel: ')
      .append('strong')
      .text(`${diesel} €/L`);

    tooltip
      .append('p')
      .text('Gasoline ')
      .append('strong')
      .text(`${gasoline} €/L`);

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


// append an svg literal line pointing toward the following visualization
const lineSeparator = container
  .append('svg')
  .attr('width', 10)
  .attr('height', 80);

lineSeparator
  .append('path')
  .attr('d', 'M 5 0 v 80')
  .attr('stroke', '#000')
  .attr('stroke-width', '1px');

lineSeparator
  .append('path')
  .attr('d', 'M 0 75 h 10 l -5 5 Z');

// BAR PLOT: price rise
// html elements
const containerPriceRise = container
  .append('div')
  .attr('class', 'visualization');

containerPriceRise
  .append('h3')
  .text('Because of taxes?')
  .style('margin', '1rem 0');

// add another svg separating the rest of the visualization
// TODO: fix the coordinates of the path elements, misbehaving on smaller screens
const vizSeparator = containerPriceRise
  .append('svg')
  .attr('width', 500)
  .attr('height', 100);

vizSeparator
  .append('path')
  .attr('d', 'M 250 0 q -150 45 -150 95')
  .attr('fill', 'none')
  .attr('stroke', '#000')
  .attr('stroke-width', '1px');

vizSeparator
  .append('path')
  .attr('d', 'M 95 95 h 10 l -5 5 Z');

vizSeparator
  .append('path')
  .attr('d', 'M 250 0 q 150 45 150 95')
  .attr('stroke', '#000')
  .attr('fill', 'none')
  .attr('stroke-width', '1px');

vizSeparator
  .append('path')
  .attr('d', 'M 395 95 h 10 l -5 5 Z');

const containerPriceRiseYes = containerPriceRise
  .append('div')
  .attr('class', 'half');

containerPriceRiseYes
  .append('h2')
  .text('Yes');

containerPriceRiseYes
  .append('h3')
  .text('A little');

containerPriceRiseYes
  .append('p')
  .text('A third of the price rise is caused by increasing taxes');

const containerPriceRiseNo = containerPriceRise
  .append('div')
  .attr('class', 'half');

containerPriceRiseNo
  .append('h2')
  .text('No');

containerPriceRiseNo
  .append('h3')
  .text('Essentially');

containerPriceRiseNo
  .append('p')
  .text('The rest is mainly a cost of the fuel without taxes');

containerPriceRise
  .append('p')
  .style('margin', '1rem 2rem')
  .text('too tired to continue... still much to do...trying to recreate ')
  .append('a')
  .attr('href', 'https://www.lemonde.fr/les-decodeurs/article/2018/11/09/petit-manuel-a-lire-avant-de-debattre-de-la-hausse-des-prix-du-carburant_5381196_4355770.html')
  .text('this visualization @lemondefr');
