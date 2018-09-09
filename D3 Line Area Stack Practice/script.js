/* script logic

    ** one div for each visualization (using line() and area() && stack() respectively)
    ** the visualization share the same
        ** data
        ** wrapping container
        ** tooltip
        ** SVG structure (margins, width and height)
        ** scales
        ** axes

    ** moreover, each visualization is structured as following:
        ** introductory HTML elements (title, description)
        ** svg - g elements (with a group element nested in the SVG bounding borders, to avoid cropping)
        ** visualization itself (with the mentioned layout functions)

    D3 logic starts at line 729
*/


// DATA
// an array of objects where the integers are included in several, repeated properties
const data = [
    {
        year: 1901,
        total: 917075,
        married: 836891,
        unmarried: 80184
    },
    {
        year: 1902,
        total: 904434,
        married: 824916,
        unmarried: 79518
    },
    {
        year: 1903,
        total: 884498,
        married: 806481,
        unmarried: 78017
    },
    {
        year: 1904,
        total: 877091,
        married: 799923,
        unmarried: 77168
    },
    {
        year: 1905,
        total: 865604,
        married: 788677,
        unmarried: 76927
    },
    {
        year: 1906,
        total: 864745,
        married: 788528,
        unmarried: 76217
    },
    {
        year: 1907,
        total: 829632,
        married: 753079,
        unmarried: 76553
    },
    {
        year: 1908,
        total: 848982,
        married: 773277,
        unmarried: 75705
    },
    {
        year: 1909,
        total: 824739,
        married: 752147,
        unmarried: 72592
    },
    {
        year: 1910,
        total: 828140,
        married: 756278,
        unmarried: 71862
    },
    {
        year: 1911,
        total: 793506,
        married: 724061,
        unmarried: 69445
    },
    {
        year: 1912,
        total: 801642,
        married: 731576,
        unmarried: 70066
    },
    {
        year: 1913,
        total: 795851,
        married: 725654,
        unmarried: 70197
    },
    {
        year: 1914,
        total: 757931,
        married: 693429,
        unmarried: 64502
    },
    {
        year: 1915,
        total: 482968,
        married: 428859,
        unmarried: 54109
    },
    {
        year: 1916,
        total: 384676,
        married: 331710,
        unmarried: 52966
    },
    {
        year: 1917,
        total: 412744,
        married: 354064,
        unmarried: 58680
    },
    {
        year: 1918,
        total: 472816,
        married: 407436,
        unmarried: 65380
    },
    {
        year: 1919,
        total: 506960,
        married: 439649,
        unmarried: 67311
    },
    {
        year: 1920,
        total: 838137,
        married: 754844,
        unmarried: 83293
    },
    {
        year: 1921,
        total: 816555,
        married: 742927,
        unmarried: 73628
    },
    {
        year: 1922,
        total: 764373,
        married: 698421,
        unmarried: 65952
    },
    {
        year: 1923,
        total: 765888,
        married: 699306,
        unmarried: 66582
    },
    {
        year: 1924,
        total: 757873,
        married: 693165,
        unmarried: 64708
    },
    {
        year: 1925,
        total: 774455,
        married: 707876,
        unmarried: 66579
    },
    {
        year: 1926,
        total: 771690,
        married: 706452,
        unmarried: 65238
    },
    {
        year: 1927,
        total: 748102,
        married: 685284,
        unmarried: 62818
    },
    {
        year: 1928,
        total: 753570,
        married: 690173,
        unmarried: 63397
    },
    {
        year: 1929,
        total: 734140,
        married: 672585,
        unmarried: 61555
    },
    {
        year: 1930,
        total: 754020,
        married: 691304,
        unmarried: 62716
    },
    {
        year: 1931,
        total: 737611,
        married: 678936,
        unmarried: 58675
    },
    {
        year: 1932,
        total: 726299,
        married: 669723,
        unmarried: 56576
    },
    {
        year: 1933,
        total: 682394,
        married: 631176,
        unmarried: 51218
    },
    {
        year: 1934,
        total: 681518,
        married: 632324,
        unmarried: 49194
    },
    {
        year: 1935,
        total: 643870,
        married: 598701,
        unmarried: 45169
    },
    {
        year: 1936,
        total: 634344,
        married: 592946,
        unmarried: 41398
    },
    {
        year: 1937,
        total: 621453,
        married: 581050,
        unmarried: 40403
    },
    {
        year: 1938,
        total: 615582,
        married: 576828,
        unmarried: 38754
    },
    {
        year: 1939,
        total: 615599,
        married: 576839,
        unmarried: 38760
    },
    {
        year: 1940,
        total: 561281,
        married: 521143,
        unmarried: 40138
    },
    {
        year: 1941,
        total: 522261,
        married: 480092,
        unmarried: 42169
    },
    {
        year: 1942,
        total: 575261,
        married: 530911,
        unmarried: 44350
    },
    {
        year: 1943,
        total: 615780,
        married: 567109,
        unmarried: 48671
    },
    {
        year: 1944,
        total: 629878,
        married: 570611,
        unmarried: 59267
    },
    {
        year: 1945,
        total: 645899,
        married: 578023,
        unmarried: 67876
    },
    {
        year: 1946,
        total: 843904,
        married: 770629,
        unmarried: 73275
    },
    {
        year: 1947,
        total: 870472,
        married: 804060,
        unmarried: 66412
    },
    {
        year: 1948,
        total: 870836,
        married: 807649,
        unmarried: 63187
    },
    {
        year: 1949,
        total: 872661,
        married: 811636,
        unmarried: 61025
    },
    {
        year: 1950,
        total: 862310,
        married: 801880,
        unmarried: 60430
    },
    {
        year: 1951,
        total: 826722,
        married: 770126,
        unmarried: 56596
    },
    {
        year: 1952,
        total: 822204,
        married: 766713,
        unmarried: 55491
    },
    {
        year: 1953,
        total: 804696,
        married: 750982,
        unmarried: 53714
    },
    {
        year: 1954,
        total: 810754,
        married: 757284,
        unmarried: 53470
    },
    {
        year: 1955,
        total: 805917,
        married: 754308,
        unmarried: 51609
    },
    {
        year: 1956,
        total: 806916,
        married: 755707,
        unmarried: 51209
    },
    {
        year: 1957,
        total: 816467,
        married: 766005,
        unmarried: 50462
    },
    {
        year: 1958,
        total: 812215,
        married: 762306,
        unmarried: 49909
    },
    {
        year: 1959,
        total: 829249,
        married: 778452,
        unmarried: 50797
    },
    {
        year: 1960,
        total: 819819,
        married: 770043,
        unmarried: 49776
    },
    {
        year: 1961,
        total: 838633,
        married: 788958,
        unmarried: 49675
    },
    {
        year: 1962,
        total: 832353,
        married: 783030,
        unmarried: 49323
    },
    {
        year: 1963,
        total: 868876,
        married: 817504,
        unmarried: 51372
    },
    {
        year: 1964,
        total: 877804,
        married: 825853,
        unmarried: 51951
    },
    {
        year: 1965,
        total: 865688,
        married: 814479,
        unmarried: 51209
    },
    {
        year: 1966,
        total: 863527,
        married: 812005,
        unmarried: 51522
    },
    {
        year: 1967,
        total: 840568,
        married: 788834,
        unmarried: 51734
    },
    {
        year: 1968,
        total: 835796,
        married: 782431,
        unmarried: 53365
    },
    {
        year: 1969,
        total: 842245,
        married: 787380,
        unmarried: 54865
    },
    {
        year: 1970,
        total: 850381,
        married: 792227,
        unmarried: 58154
    },
    {
        year: 1971,
        total: 881284,
        married: 819224,
        unmarried: 62060
    },
    {
        year: 1972,
        total: 877506,
        married: 811345,
        unmarried: 66161
    },
    {
        year: 1973,
        total: 857186,
        married: 786972,
        unmarried: 70214
    },
    {
        year: 1974,
        total: 801218,
        married: 733460,
        unmarried: 67758
    },
    {
        year: 1975,
        total: 745065,
        married: 681636,
        unmarried: 63429
    },
    {
        year: 1976,
        total: 720395,
        married: 658926,
        unmarried: 61469
    },
    {
        year: 1977,
        total: 744744,
        married: 679346,
        unmarried: 65398
    },
    {
        year: 1978,
        total: 737062,
        married: 667841,
        unmarried: 69221
    },
    {
        year: 1979,
        total: 757354,
        married: 679521,
        unmarried: 77833
    },
    {
        year: 1980,
        total: 800376,
        married: 709261,
        unmarried: 91115
    },
    {
        year: 1981,
        total: 805483,
        married: 703337,
        unmarried: 102146
    },
    {
        year: 1982,
        total: 797223,
        married: 683825,
        unmarried: 113398
    },
    {
        year: 1983,
        total: 748525,
        married: 629674,
        unmarried: 118851
    },
    {
        year: 1984,
        total: 759939,
        married: 624674,
        unmarried: 135265
    },
    {
        year: 1985,
        total: 768431,
        married: 617939,
        unmarried: 150492
    },
    {
        year: 1986,
        total: 778468,
        married: 607786,
        unmarried: 170682
    },
    {
        year: 1987,
        total: 767828,
        married: 582902,
        unmarried: 184926
    },
    {
        year: 1988,
        total: 771268,
        married: 568202,
        unmarried: 203066
    },
    {
        year: 1989,
        total: 765473,
        married: 549410,
        unmarried: 216063
    },
    {
        year: 1990,
        total: 762407,
        married: 533300,
        unmarried: 229107
    },
    {
        year: 1991,
        total: 759056,
        married: 517428,
        unmarried: 241628
    },
    {
        year: 1992,
        total: 743658,
        married: 496791,
        unmarried: 246867
    },
    {
        year: 1993,
        total: 711610,
        married: 463279,
        unmarried: 248331
    },
    {
        year: 1994,
        total: 710993,
        married: 454340,
        unmarried: 256653
    },
    {
        year: 1995,
        total: 729609,
        married: 455399,
        unmarried: 274210
    },
    {
        year: 1996,
        total: 734338,
        married: 448824,
        unmarried: 285514
    },
    {
        year: 1997,
        total: 726768,
        married: 435920,
        unmarried: 290848
    },
    {
        year: 1998,
        total: 738080,
        married: 437534,
        unmarried: 300546
    },
    {
        year: 1999,
        total: 744791,
        married: 433905,
        unmarried: 310886
    },
    {
        year: 2000,
        total: 774782,
        married: 444667,
        unmarried: 330115
    },
    {
        year: 2001,
        total: 770945,
        married: 433938,
        unmarried: 337007
    },
    {
        year: 2002,
        total: 761630,
        married: 424508,
        unmarried: 337122
    },
    {
        year: 2003,
        total: 761464,
        married: 417246,
        unmarried: 344218
    },
    {
        year: 2004,
        total: 767816,
        married: 411490,
        unmarried: 356326
    },
    {
        year: 2005,
        total: 774355,
        married: 407561,
        unmarried: 366794
    },
    {
        year: 2006,
        total: 796896,
        married: 402348,
        unmarried: 394548
    },
    {
        year: 2007,
        total: 785985,
        married: 387207,
        unmarried: 398778
    },
    {
        year: 2008,
        total: 796044,
        married: 384994,
        unmarried: 411050
    },
    {
        year: 2009,
        total: 793420,
        married: 374018,
        unmarried: 419402
    },
    {
        year: 2010,
        total: 802224,
        married: 368063,
        unmarried: 434161
    },
    {
        year: 2011,
        total: 792996,
        married: 356906,
        unmarried: 436090
    },
    {
        year: 2012,
        total: 790290,
        married: 349103,
        unmarried: 441187
    },
    {
        year: 2013,
        total: 781621,
        married: 341005,
        unmarried: 440616
    },
    {
        year: 2014,
        total: 781167,
        married: 332641,
        unmarried: 448526
    },
    {
        year: 2015,
        total: 760421,
        married: 320147,
        unmarried: 440274
    },
    {
        year: 2016,
        total: 744697,
        married: 309228,
        unmarried: 435469
    },
    {
        year: 2017,
        total: 730242,
        married: 301988,
        unmarried: 428254
    }
];


// ELEMENTS SHARED BY BOTH VIZ

// all wrapping container
const container = d3
    .select(".container");

// tooltip
container
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);


// svg g structure
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 60
};

const width = 550 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;


// scales
// x scale: time scale, based on the years
// ! to include the years as date objects, parse them based on the year value
const parseYear = d3.timeParse("%Y");

const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => parseYear(d.year)))
    .range([0, width]);

// y scale: linear scale, spanning from 0 up to 20% more than the highest total value
const yScale = d3
    .scaleLinear()
    .domain([0, 1000000])
    .range([height, 0]);


// axes
// based on the scales
// ! to show the full year instead of the parsed object, include an appropriate formatting function
const formatYear = d3.timeFormat("%Y");

const xAxis = d3
    .axisBottom(xScale)
    // format the ticks to show the full year instead of the entire date object
    // alternatively target all text elements when appending the g element and format their text there
    .tickFormat((d) => formatYear(d));

const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSize(0)
    .tickPadding(10);




// D3 LINE AREA
// introductory html elements
const containerLineArea = container
    .append("div")
    .attr("class", "chart")
    .attr("id", "line-area-chart");

containerLineArea
    .append("h2")
    .attr("class", "title")
    .text("D3 Line & Area");

containerLineArea
    .append("p")
    .attr("class", "description")
    .text("Number of births in France, metropolitan area");


// append svg and g elements nested within
const svgLineArea = containerLineArea
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.right})`);


// include axis in g elements, and on the bases of the defined scales and axis
svgLineArea
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

svgLineArea
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "axis")
    .call(yAxis)
        // include a grid line for each tick
        .selectAll("g.tick")
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke-width", "1px")
        .attr("stroke", "#00000022");

// LINE GENERATOR
// function specifying the coordinate of each data point
// the x coordinate is incrementally specified by the year value
// the y coordinate by the bound data point
const line = d3
    .line()
    .x((d, i) => xScale(parseYear(data[i].year)))
    .y((d) => yScale(d));


// AREA GENERATOR
// function detailing the area below the lines
// detail the area below the line considering the y coordinates of the data points
const area = d3
    .area()
    .x((d, i) => xScale(parseYear(data[i].year)))
    .y0(yScale(0))
    .y1((d) => yScale(d));


// include a path element for the first line, based on an array of values which consider the unmarried value
svgLineArea
    .append("path")
    .attr("class", "married")
    .attr("d", line(data.map((d) => d.married + d.unmarried)))
    .attr("fill", "none")
    .attr("stroke", "#1890C8")
    .attr("stroke-width", "5px");

// include a path element for the area of the first line
svgLineArea
    .append("path")
    .attr("class", "married-area")
    .attr("d", area(data.map((d) => d.married + d.unmarried)))
    .attr("fill", "#3fb2e8");


// include a path element for the first line, based on an array of values which consider the unmarried value
svgLineArea
    .append("path")
    .attr("class", "unmarried")
    .attr("d", line(data.map((d) => d.unmarried)))
    .attr("fill", "none")
    .attr("stroke", "#FFC832")
    .attr("stroke-width", "5px");

// include a path element for the area of the first line
svgLineArea
    .append("path")
    .attr("class", "unmarried-area")
    .attr("d", area(data.map((d) => d.unmarried)))
    .attr("fill", "#ffd665");



// D3 STACK
// introductory html elements
const containerStacked = container
    .append("div")
    .attr("class", "chart")
    .attr("id", "stack-chart");

containerStacked
    .append("h2")
    .attr("class", "title")
    .text("D3 Stack");

containerStacked
    .append("p")
    .attr("class", "description")
    .text("Number of births in France, metropolitan area");

// append svg and g elements nested within
const svgStacked = containerStacked
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.right})`);


// add the axes in group elements, exactly like accomplished with the line&area chart
svgStacked
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

svgStacked
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "axis")
    .call(yAxis)
        .selectAll("g.tick")
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke-width", "1px")
        .attr("stroke", "#00000022");

// create a stack layout based on the keys of unmarried and married
// the keys are specified in order, with the first displayed from the bottom of the svg (at 0)
const stack = d3
    .stack()
    .keys(["unmarried", "married"]);

// test the working layout function
// stack(data) streamlines the data points in two arrays, nesting one item for each object
// console.log(stack(data));

// add a rectangle for each data point of the first array (the one carrying the values for the first key)
svgStacked
.selectAll("rect.unmarried")
.data(stack(data)[0])
.enter()
.append("rect")
.attr("class", "unmarried")
// each rectangle spans a portion of the width
.attr("x", (d, i) => width/data.length*i)
.attr("width", width/data.length)
// each rectangle considers a height based on the difference between the items of the array (which each nest the starting/ending point of the stack)
.attr("y", (d, i) => yScale(d[1]))
.attr("height", (d, i) => yScale(d[0]) - yScale(d[1]))
.attr("fill", "#FFC832");


// add a rectangle for each data point of the second array (the one carrying the values for the second key)
// with the same reasoning, but for the second array
svgStacked
    .selectAll("rect.married")
    .data(stack(data)[1])
    .enter()
    .append("rect")
    .attr("class", "married")
    .attr("x", (d, i) => width/data.length*i)
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", width/data.length)
    .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]))
    .attr("fill", "#1890C8");


