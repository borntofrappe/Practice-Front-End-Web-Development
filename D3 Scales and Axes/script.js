/**SETUP
 * include introductory elements (header and paragraph)
 * include variables shared by all data visualizations
 */

const container = d3.select(".container");

container
    .append("h1")
    .text("D3.js: Scales and Axes");

container
    .append("p")
    .text("Different data formats, different scales");

// for continuous scales, include 20 random data points in the interval between 10 and 30
const data = [];
for(let i = 0; i < 20; i++) {
    data.push(Math.floor(Math.random() * 20) + 10);
}

// include a frame shared by all svg elements
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
}

const width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// for each visualization, include an SVG and a group in which to display the data without cropping

/**LINEAR SCALE */

const svgLinearScale = container
                        .append("svg")
                        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

const svgLinearScaleCanvas = svgLinearScale 
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

svgLinearScaleCanvas
    .append("text")
    .text("linear scale")
    .attr("x", 15)
    .style("text-transform", "uppercase");
   
// include a linear scale for both the x and y axes
const xLinearScale = d3.scaleLinear();

xLinearScale
    .domain(d3.extent(data))    
    .range([0, width]);

const xLinearScaleAxis = d3
                .axisBottom(xLinearScale);

svgLinearScaleCanvas
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xLinearScaleAxis);
    

const yLinearScale = d3.scaleLinear();

yLinearScale
    .domain(d3.extent(data))
    .range([height, 0]);

const yLinearScaleAxis = d3
                .axisLeft(yLinearScale);

svgLinearScaleCanvas
    .append("g")
    .call(yLinearScaleAxis);

svgLinearScaleCanvas
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xLinearScale(d))
    .attr("cy", d => yLinearScale(d));


/**EXPONENTIAL SCALE */

const svgExponentialScale = container
                        .append("svg")
                        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

const svgExponentialScaleCanvas = svgExponentialScale 
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

svgExponentialScaleCanvas
    .append("text")
    .text("exponential scale")
    .attr("x", 15)
    .style("text-transform", "uppercase");
   
// include a linear scale for the x axis
// include an exponential scale for the y axes

svgExponentialScaleCanvas
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xLinearScaleAxis);
    

// by default, the exponential scale behaves like a linear scale (the exponent is by default equal to 1)
// the exponent can be modified through the scale.exponent() function
// passing as argument the actual exponent
const yExpoScale = d3.scalePow();

yExpoScale
    .exponent(5)
    .domain(d3.extent(data))
    .range([height, 0]);

const yExpoScaleAxis = d3
                .axisLeft(yExpoScale);

svgExponentialScaleCanvas
    .append("g")
    .call(yExpoScaleAxis);

svgExponentialScaleCanvas
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xLinearScale(d))
    .attr("cy", d => yExpoScale(d));


/**LOG SCALE */

const svgLogarithmicScale = container
                        .append("svg")
                        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

const svgLogarithmicScaleCanvas = svgLogarithmicScale 
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

svgLogarithmicScaleCanvas
    .append("text")
    .text("Logarithmic scale")
    .attr("x", 15)
    .style("text-transform", "uppercase");
   
// include a linear scale for the x axis
// include a logarithmic scale for the y axes

svgLogarithmicScaleCanvas
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xLinearScaleAxis);
    

// the logarithmic scale needs to have a specific domain
// the domain must not include/cross zero and must be strictly positive/stricly negative

// by default, the scale has base 10
const yLogScale = d3.scaleLog();

yLogScale
    .domain(d3.extent(data))
    .range([height, 0]);

const yLogScaleAxis = d3
                .axisLeft(yLogScale);

svgLogarithmicScaleCanvas
    .append("g")
    .call(yLogScaleAxis);

svgLogarithmicScaleCanvas
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xLinearScale(d))
    .attr("cy", d => yLogScale(d));


/** TIME SCALE */


const svgTimeScale = container
                        // increase the horizontal margin to display the ticks
                        .append("svg")
                        .attr("viewBox", `0 0 ${width + margin.left * 1.5 + margin.right} ${height + margin.top + margin.bottom}`);

const svgTimeScaleCanvas = svgTimeScale 
                    .append("g")
                    // increase the horizontal margin to display the ticks
                    .attr("transform", `translate(${margin.left * 1.5}, ${margin.bottom})`);

svgTimeScaleCanvas
    .append("text")
    .text("time scale")
    .attr("x", 15)
    .style("text-transform", "uppercase");
   
// include a linear scale for the x axis
// include a time scale for the y axes

svgTimeScaleCanvas
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xLinearScaleAxis);
    

// for a time scale include date objects in the domain 
// the ticks of the scale will be evenly split to display the time intervals

const yTimeScale = d3.scaleTime();

// include 20 date objects starting from the first of january 2015, following up with each day
const dataDates = [];
for(let i = 0; i < 20; i++) {
    dataDates.push(new Date(2015, 0, i));
}

yTimeScale
    // use the date objects in the domain
    .domain(d3.extent(dataDates))
    .range([height, 0]);

// the ticks for the time scale can be altered and formatted with appropriate functions
// .ticks(number) allows to specify a number of ticks
// .tickFormat() allows to specify the format of the ticks themselves
// d3.formatTime can be specifically used with a time scale to display particular time intervals
const yTimeScaleAxis = d3
                .axisLeft(yTimeScale)
                .tickFormat(d3.timeFormat("%Y-%m-%d"));

svgTimeScaleCanvas
    .append("g")
    .call(yTimeScaleAxis);

svgTimeScaleCanvas
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xLinearScale(d))
    // map the y coordinate to consider the 20 date objects (as the x coordinate is chosen randomly, this will generate 20 points randomly in the canvas)
    .attr("cy", (d, i) => yTimeScale(dataDates[i]));