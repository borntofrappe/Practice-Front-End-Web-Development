/* globals d3 */

/* for both visualizations
- detail the source URL (added at the very end of the visualization)
- select the wrapping container
- add the heading used as a label
- include the tooltip
- detail a formatting function to include , commas in the place of the thousand digit
*/

// source URL
const sourceURL = 'http://www.securite-routiere.gouv.fr/la-securite-routiere/l-observatoire-national-interministeriel-de-la-securite-routiere/series-statistiques';
// target the single container
const container = d3.select('.container');
// label
container
  .append('h1')
  .text('Road safety');
// tooltip
const tooltip = container
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none');
// formatting function to show a dot separating the thousand's digit
const format = d3.format(',');

/* for each visualization, add the following
- div container
- data,
- html elements
- svg frame
- colors, scales, axes
- svg shapes
*/

// AREA CHART
// div container
const areaContainer = container
  .append('div')
  .attr('class', 'viz');

// data
const areaData = [
  { year: 1960, value: 8295 },
  { year: 1961, value: 9140 },
  { year: 1962, value: 9928 },
  { year: 1963, value: 10027 },
  { year: 1964, value: 11105 },
  { year: 1965, value: 12150 },
  { year: 1966, value: 12158 },
  { year: 1967, value: 13585 },
  { year: 1968, value: 14274 },
  { year: 1969, value: 14664 },
  { year: 1970, value: 15034 },
  { year: 1971, value: 16061 },
  { year: 1972, value: 16545 },
  { year: 1973, value: 15469 },
  { year: 1974, value: 13327 },
  { year: 1975, value: 12996 },
  { year: 1976, value: 13577 },
  { year: 1977, value: 12961 },
  { year: 1978, value: 11957 },
  { year: 1979, value: 12197 },
  { year: 1980, value: 12510 },
  { year: 1981, value: 11953 },
  { year: 1982, value: 12030 },
  { year: 1983, value: 11677 },
  { year: 1984, value: 11525 },
  { year: 1985, value: 10447 },
  { year: 1986, value: 10961 },
  { year: 1987, value: 9855 },
  { year: 1988, value: 10548 },
  { year: 1989, value: 10528 },
  { year: 1990, value: 10289 },
  { year: 1991, value: 9617 },
  { year: 1992, value: 9083 },
  { year: 1993, value: 9052 },
  { year: 1994, value: 8533 },
  { year: 1995, value: 8412 },
  { year: 1996, value: 8080 },
  { year: 1997, value: 7989 },
  { year: 1998, value: 8437 },
  { year: 1999, value: 8029 },
  { year: 2000, value: 7643 },
  { year: 2001, value: 7720 },
  { year: 2002, value: 7242 },
  { year: 2003, value: 5731 },
  { year: 2004, value: 5232 },
  { year: 2005, value: 5318 },
  { year: 2006, value: 4709 },
  { year: 2007, value: 4620 },
  { year: 2008, value: 4275 },
  { year: 2009, value: 4273 },
  { year: 2010, value: 3992 },
  { year: 2011, value: 3963 },
  { year: 2012, value: 3653 },
  { year: 2013, value: 3268 },
  { year: 2014, value: 3384 },
  { year: 2015, value: 3461 },
  { year: 2016, value: 3477 }
];

// html elements
areaContainer
  .append('h2')
  .text('A reduction of the mortaility rate following stricter legislation');

areaContainer
  .append('p')
  .text('This graph represents the number of deaths occurred on french roads between 1960 and 2016. Highlighted through circles, the most relevant changes in the legislation and traffic code.');

// SVG frame
const areaMargin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 40
};
const areaWidth = 500 - (areaMargin.left + areaMargin.right);
const areaHeight = 500 - (areaMargin.top + areaMargin.bottom);

const areaSVG = areaContainer
  .append('svg')
  .attr('viewBox', `0 0 ${areaWidth + (areaMargin.left + areaMargin.right)} ${areaHeight + (areaMargin.top + areaMargin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${areaMargin.left} ${areaMargin.top})`);

// colors
const areaColor = '#FFCA39';

// scales and axes
// x scale: linear scale considering the year value
const areaXScale = d3
  .scaleLinear()
  .domain(d3.extent(areaData, d => d.year))
  .range([0, areaWidth]);

const areaXAxis = d3
  .axisBottom(areaXScale)
  .ticks(5)
  .tickSizeOuter(0);

areaSVG
  .append('g')
  .attr('transform', `translate(0, ${areaHeight})`)
  .call(areaXAxis)
  .selectAll('text')
  .style('font-family', 'inherit')
  .style('font-weight', 'thin');

// y scale: linear scale ranging from 0 to 10% more than the biggest value
const areaYScale = d3
  .scaleLinear()
  .domain([0, d3.max(areaData, d => d.value) * 1.1])
  .range([areaHeight, 0]);

const areaYAxis = d3
  .axisLeft(areaYScale)
  .tickSizeOuter(0);

areaSVG
  .append('g')
  .call(areaYAxis)
  .selectAll('text')
  .style('font-family', 'inherit')
  .style('font-weight', 'thin');

// svg shapes
// define line and area functions
const areaLine = d3
  .line()
  .x(d => areaXScale(d.year))
  .y(d => areaYScale(d.value))
  .curve(d3.curveCatmullRom);

const areaArea = d3
  .area()
  .x(d => areaXScale(d.year))
  .y0(areaYScale(0))
  .y1(d => areaYScale(d.value))
  .curve(d3.curveCatmullRom);

// append path elements describing the line and the area in the d attribute
areaSVG
  .append('path')
  .attr('class', 'area-line')
  .attr('d', areaLine(areaData))
  .attr('fill', 'none')
  .attr('stroke', areaColor)
  .attr('stroke-width', '2px');

areaSVG
  .append('path')
  .attr('class', 'area-area')
  .attr('d', areaArea(areaData))
  .attr('fill', areaColor)
  .attr('stroke', 'none')
  .attr('opacity', 0.4);

// detail those values for which circle elements are included
const areaDataSpecial = [
  {
    year: 1973,
    title: 'Mandatory seatbelt'
  },
  {
    year: 1983,
    title: 'Measures against alcohol while driving'
  },
  {
    year: 1990,
    title: 'Speed limit to 50Km/h in urban areas'
  },
  {
    year: 2002,
    title: 'Automatic radars'
  }
];

// loop through the array and append to each object the value as found in the first array
areaDataSpecial.forEach((pointSpecial) => {
  const point = areaData.find(pointData => pointData.year === pointSpecial.year);
  return Object.assign(pointSpecial, { value: point.value });
});

// for each special data point add a group element, used to gather a circle and line each
const groupSpecial = areaSVG
  .selectAll('g.group')
  .data(areaDataSpecial)
  .enter()
  .append('g')
  // on hover highlight a tooltip detailing the value and the title properties
  // alter also the design of the circle and line to stress the hover event
  .on('mouseenter', function (d) {
    d3.select(this)
      .select('circle')
      .transition()
      .attr('r', 7.5);

    d3.select(this)
      .select('path')
      .transition()
      .attr('stroke-dasharray', '2px');

    tooltip
      .append('p')
      .text(`${d.year}: ${d.title}`);

    tooltip
      .append('p')
      .text(`${format(d.value)} deaths this year`);

    tooltip
      .transition()
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3.select(this)
      .select('circle')
      .transition()
      .attr('r', 5);

    d3.select(this)
      .select('path')
      .transition()
      .attr('stroke-dasharray', '5px');

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  })
  .attr('class', 'group')
  // position each group horizontally where each value ought to be represented
  .attr('transform', d => `translate(${areaXScale(d.year)}, 0)`);

// add a line
groupSpecial
  .append('path')
  .attr('d', d => `M 0 ${areaYScale(d.value)} V ${areaHeight}`)
  .attr('fill', 'none')
  .attr('stroke', '#33333377')
  .attr('stroke-width', '1px')
  .attr('stroke-dasharray', '5px')
  .style('pointer-events', 'none');

// add a circle
groupSpecial
  .append('circle')
  .attr('r', 5)
  .attr('cx', 0)
  .attr('cy', d => areaYScale(d.value))
  .attr('fill', '#333');


// HEATMAP
// div container
const heatmapContainer = container
  .append('div')
  .attr('class', 'viz');

// data
const heatmapData = [
  { year: 2005, month: 1, value: 405 },
  { year: 2005, month: 2, value: 345 },
  { year: 2005, month: 3, value: 396 },
  { year: 2005, month: 4, value: 370 },
  { year: 2005, month: 5, value: 450 },
  { year: 2005, month: 6, value: 480 },
  { year: 2005, month: 7, value: 608 },
  { year: 2005, month: 8, value: 478 },
  { year: 2005, month: 9, value: 441 },
  { year: 2005, month: 10, value: 472 },
  { year: 2005, month: 11, value: 413 },
  { year: 2005, month: 12, value: 460 },
  { year: 2006, month: 1, value: 346 },
  { year: 2006, month: 2, value: 266 },
  { year: 2006, month: 3, value: 314 },
  { year: 2006, month: 4, value: 369 },
  { year: 2006, month: 5, value: 382 },
  { year: 2006, month: 6, value: 392 },
  { year: 2006, month: 7, value: 471 },
  { year: 2006, month: 8, value: 420 },
  { year: 2006, month: 9, value: 425 },
  { year: 2006, month: 10, value: 439 },
  { year: 2006, month: 11, value: 405 },
  { year: 2006, month: 12, value: 480 },
  { year: 2007, month: 1, value: 395 },
  { year: 2007, month: 2, value: 286 },
  { year: 2007, month: 3, value: 318 },
  { year: 2007, month: 4, value: 411 },
  { year: 2007, month: 5, value: 346 },
  { year: 2007, month: 6, value: 385 },
  { year: 2007, month: 7, value: 478 },
  { year: 2007, month: 8, value: 399 },
  { year: 2007, month: 9, value: 428 },
  { year: 2007, month: 10, value: 368 },
  { year: 2007, month: 11, value: 396 },
  { year: 2007, month: 12, value: 410 },
  { year: 2008, month: 1, value: 327 },
  { year: 2008, month: 2, value: 292 },
  { year: 2008, month: 3, value: 362 },
  { year: 2008, month: 4, value: 312 },
  { year: 2008, month: 5, value: 399 },
  { year: 2008, month: 6, value: 306 },
  { year: 2008, month: 7, value: 416 },
  { year: 2008, month: 8, value: 392 },
  { year: 2008, month: 9, value: 334 },
  { year: 2008, month: 10, value: 440 },
  { year: 2008, month: 11, value: 333 },
  { year: 2008, month: 12, value: 362 },
  { year: 2009, month: 1, value: 288 },
  { year: 2009, month: 2, value: 299 },
  { year: 2009, month: 3, value: 294 },
  { year: 2009, month: 4, value: 327 },
  { year: 2009, month: 5, value: 386 },
  { year: 2009, month: 6, value: 403 },
  { year: 2009, month: 7, value: 396 },
  { year: 2009, month: 8, value: 412 },
  { year: 2009, month: 9, value: 384 },
  { year: 2009, month: 10, value: 429 },
  { year: 2009, month: 11, value: 349 },
  { year: 2009, month: 12, value: 306 },
  { year: 2010, month: 1, value: 273 },
  { year: 2010, month: 2, value: 254 },
  { year: 2010, month: 3, value: 300 },
  { year: 2010, month: 4, value: 296 },
  { year: 2010, month: 5, value: 336 },
  { year: 2010, month: 6, value: 329 },
  { year: 2010, month: 7, value: 453 },
  { year: 2010, month: 8, value: 383 },
  { year: 2010, month: 9, value: 357 },
  { year: 2010, month: 10, value: 377 },
  { year: 2010, month: 11, value: 339 },
  { year: 2010, month: 12, value: 295 },
  { year: 2011, month: 1, value: 324 },
  { year: 2011, month: 2, value: 269 },
  { year: 2011, month: 3, value: 301 },
  { year: 2011, month: 4, value: 360 },
  { year: 2011, month: 5, value: 322 },
  { year: 2011, month: 6, value: 336 },
  { year: 2011, month: 7, value: 354 },
  { year: 2011, month: 8, value: 370 },
  { year: 2011, month: 9, value: 347 },
  { year: 2011, month: 10, value: 351 },
  { year: 2011, month: 11, value: 296 },
  { year: 2011, month: 12, value: 333 },
  { year: 2012, month: 1, value: 297 },
  { year: 2012, month: 2, value: 204 },
  { year: 2012, month: 3, value: 276 },
  { year: 2012, month: 4, value: 277 },
  { year: 2012, month: 5, value: 321 },
  { year: 2012, month: 6, value: 322 },
  { year: 2012, month: 7, value: 366 },
  { year: 2012, month: 8, value: 339 },
  { year: 2012, month: 9, value: 341 },
  { year: 2012, month: 10, value: 299 },
  { year: 2012, month: 11, value: 292 },
  { year: 2012, month: 12, value: 319 },
  { year: 2013, month: 1, value: 243 },
  { year: 2013, month: 2, value: 221 },
  { year: 2013, month: 3, value: 200 },
  { year: 2013, month: 4, value: 236 },
  { year: 2013, month: 5, value: 224 },
  { year: 2013, month: 6, value: 293 },
  { year: 2013, month: 7, value: 344 },
  { year: 2013, month: 8, value: 322 },
  { year: 2013, month: 9, value: 312 },
  { year: 2013, month: 10, value: 308 },
  { year: 2013, month: 11, value: 252 },
  { year: 2013, month: 12, value: 313 },
  { year: 2014, month: 1, value: 235 },
  { year: 2014, month: 2, value: 225 },
  { year: 2014, month: 3, value: 261 },
  { year: 2014, month: 4, value: 254 },
  { year: 2014, month: 5, value: 260 },
  { year: 2014, month: 6, value: 311 },
  { year: 2014, month: 7, value: 302 },
  { year: 2014, month: 8, value: 306 },
  { year: 2014, month: 9, value: 317 },
  { year: 2014, month: 10, value: 347 },
  { year: 2014, month: 11, value: 280 },
  { year: 2014, month: 12, value: 286 },
  { year: 2015, month: 1, value: 262 },
  { year: 2015, month: 2, value: 235 },
  { year: 2015, month: 3, value: 219 },
  { year: 2015, month: 4, value: 258 },
  { year: 2015, month: 5, value: 267 },
  { year: 2015, month: 6, value: 299 },
  { year: 2015, month: 7, value: 353 },
  { year: 2015, month: 8, value: 332 },
  { year: 2015, month: 9, value: 257 },
  { year: 2015, month: 10, value: 378 },
  { year: 2015, month: 11, value: 296 },
  { year: 2015, month: 12, value: 305 },
  { year: 2016, month: 1, value: 236 },
  { year: 2016, month: 2, value: 263 },
  { year: 2016, month: 3, value: 255 },
  { year: 2016, month: 4, value: 243 },
  { year: 2016, month: 5, value: 294 },
  { year: 2016, month: 6, value: 285 },
  { year: 2016, month: 7, value: 356 },
  { year: 2016, month: 8, value: 301 },
  { year: 2016, month: 9, value: 334 },
  { year: 2016, month: 10, value: 315 },
  { year: 2016, month: 11, value: 258 },
  { year: 2016, month: 12, value: 337 },
  { year: 2017, month: 1, value: 257 },
  { year: 2017, month: 2, value: 203 },
  { year: 2017, month: 3, value: 266 },
  { year: 2017, month: 4, value: 287 },
  { year: 2017, month: 5, value: 294 },
  { year: 2017, month: 6, value: 329 },
  { year: 2017, month: 7, value: 346 },
  { year: 2017, month: 8, value: 296 },
  { year: 2017, month: 9, value: 289 },
  { year: 2017, month: 10, value: 315 },
  { year: 2017, month: 11, value: 281 },
  { year: 2017, month: 12, value: 293 },
  { year: 2018, month: 1, value: 235 },
  { year: 2018, month: 2, value: 217 },
  { year: 2018, month: 3, value: 231 },
  { year: 2018, month: 4, value: 279 },
  { year: 2018, month: 5, value: 272 },
  { year: 2018, month: 6, value: 294 },
  { year: 2018, month: 7, value: 324 },
  { year: 2018, month: 8, value: 251 },
  { year: 2018, month: 9, value: 323 }
];

// html elements
heatmapContainer
  .append('h2')
  .text('The seasonality of deaths on the road');

heatmapContainer
  .append('p')
  .text('This heatmap plots the number of deaths on the road of mainland France, by month.');

// SVG frame
const heatmapMargin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};
const heatmapWidth = 500 - (heatmapMargin.left + heatmapMargin.right);
const heatmapHeight = 500 - (heatmapMargin.top + heatmapMargin.bottom);

const heatmapSVG = heatmapContainer
  .append('svg')
  .attr('viewBox', `0 0 ${heatmapWidth + (heatmapMargin.left + heatmapMargin.right)} ${heatmapHeight + (heatmapMargin.top + heatmapMargin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${heatmapMargin.left} ${heatmapMargin.top})`);

// colors
const heatmapColors = [
  {
    range: 200,
    value: '#FED976'
  },
  {
    range: 241,
    value: '#FEB24C'
  },
  {
    range: 282,
    value: '#FD8D3C'
  },
  {
    range: 323,
    value: '#FC4E2A'
  },
  {
    range: 364,
    value: '#E31A1C'
  },
  {
    range: 405,
    value: '#BD0026'
  },
  {
    range: 446,
    value: '#800026'
  },
  {
    range: 487,
    value: '#34000F'
  }
];

// scales and axes
// create a scale for the color
const colorScale = d3
  .scaleLinear()
  .domain(heatmapColors.map(color => color.range))
  .range(heatmapColors.map(color => color.value));

// x scale: ordinal scale based on the month
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const heatmapXScale = d3
  .scaleBand()
  .domain(heatmapData.map(d => d.month))
  .range([0, heatmapWidth]);

const heatmapXAxis = d3
  .axisTop(heatmapXScale)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat((d, i) => months[i].substring(0, 3));

heatmapSVG
  .append('g')
  .call(heatmapXAxis)
  .selectAll('text')
  .style('font-family', 'inherit')
  .style('font-weight', 'thin');
// y scale: ordinal scale based on the year
const heatmapYScale = d3
  .scaleBand()
  .domain(heatmapData.map(d => d.year))
  .range([0, heatmapHeight]);

const heatmapYAxis = d3
  .axisLeft(heatmapYScale)
  .tickSize(0)
  .tickPadding(10);

heatmapSVG
  .append('g')
  .call(heatmapYAxis)
  .selectAll('text')
  .style('font-family', 'inherit')
  .style('font-weight', 'thin');

// svg shapes
// add a square for each month, one row for each year
heatmapSVG
  .selectAll('rect.square')
  .data(heatmapData)
  .enter()
  .append('rect')
  .attr('class', 'square')
  // on hover show the attached data through the tooltip
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .style('opacity', 1);
    tooltip
      .append('p')
      .text(`${months[d.month - 1]} ${d.year}`);

    tooltip
      .append('p')
      .text(`${format(d.value)} deaths this month`);

    tooltip
      .transition()
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .style('opacity', 0.8);
    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  })
  .attr('x', d => heatmapXScale(d.month))
  .attr('y', d => heatmapYScale(d.year))
  .attr('width', `${heatmapXScale.bandwidth()}`)
  .attr('height', `${heatmapYScale.bandwidth()}`)
  .attr('fill', d => colorScale(d.value))
  .attr('stroke', 'none')
  .style('opacity', 0.8);

// add the source URL
container
  .append('a')
  .text('Source')
  .attr('href', sourceURL);
