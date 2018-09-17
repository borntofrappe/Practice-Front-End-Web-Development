/** script logic
 * create data (through a function, which can be repeated as to update the data points)
 * include introductory HTML elements (heading, paragraph, tooltip)
 * include svg and g element
 * format the data through the d3.histogram() function
 * describe the scales, axes
 * plot labels, rectangle elements, group elements for the axes
 *
 * finally, update the rectangle elements and the affected axis every so often, with new data
 */

// create a function which returns an array populated by a certain amount of integers and at most as big as a certain measure
const populateArray = (arrLength, arrMax) => {
    let arr = [];
    for(let i = 0; i < arrLength; i++) {
        arr.push(Math.floor(Math.random() * arrMax));
    }
    return arr;
}


// DATA
// create an array for the dataset, according to the function
const max = 100,
    length = 500;

let data = populateArray(length, max);
console.log(data);


// CONTAINER
const container = d3
    .select(".container");

// TOOLTIP
const tooltip = container
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

// INTRODUCTORY HTML ELEMENTS
container
    .append("h1")
    .attr("class", "title")
    .text("Histogram");

container
    .append("p")
    .attr("class", "description")
    .style("margin", "1rem 0 2rem")
    .text(`${length} random integers, from 0 to ${max}, sorted in bins.`);


// SVG, G ELEMENTS
// describe the margin, width and height, to have the visualization plotted in a group element, safely nested in an svg element
const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50
};
const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


// FORMAT DATA
// through the .histogram() function, sort the different array items in bins
// the length of each bins describes the number of elements contained inside
// with two additional attributes, in x0 and x1 describing the lower and upper bound of each bin
// the length can be used for the vertical dimension, while the x0 x1 attributes help covering the horizontal dimension (the index of the data point can also be used)
const histogram = d3
    .histogram();

// format the data according to the layout function
const gramData = histogram(data);
// console.log(gramData);

// SCALES
// define an ordinal scale for the horizontal dimension
const xScale = d3
    .scaleBand()
    // include as many bands as there are bins
    .domain(d3.range(gramData.length))
    .range([0, width]);

// define a linear scale for the vertical dimension
const yScale = d3
    .scaleLinear()
    // map an interval going from 0 to 20% more than the value assumed by the largest bin
    .domain([0, d3.max(gramData, (d) => d.length) * 1.2])
    .range([height, 0]);

// define and plot axes
const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickPadding(10)
    // increment each tick label to show indexes starting from 1
    .tickFormat((d) => d + 1);

const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSizeOuter(0);



// SVG G ELEMENTS
const containerSVG = container
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// VIZ
// append a label for each axis
containerSVG
    .append("text")
    .attr("x", width/2)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text("Bins");

containerSVG
    .append("text")
    .attr("x", 0)
    .attr("y", -margin.top/2)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text("# Items");

// include a rectangle for each bin, according to the length of the bins
containerSVG
    .selectAll("rect.bin")
    .data(gramData)
    .enter()
    .append("rect")
    .attr("class", "bin")
    // on hover highlight the number of items of the rectangle, in the tooltip
    .on("mouseenter", (d, i) => {
        console.log(d.length);
        tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.x}px`)
            .style("top", `${d3.event.y}px`)
            .append("p")
            .text(`${d.length} numbers in this bin`);
    })
    .on("mouseout", () => {
        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
    })
    // have each rectangle centered in the band and covering 80% of the band width
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() * 0.1)
    .attr("width", xScale.bandwidth() * 0.8)
    // at first show the rectangle elements without height, at the bottom of the svg
    .attr("y", (d) => yScale(0))
    .attr("height", (d) => 0)
    // transition the y coordinate and height properties to the values required for the data points
    // the vertical dimension is plotted in relation to the length of each bin
    .transition()
    .duration(500)
    .delay((d, i) => 200 + 100 * i)
    .attr("y", (d) => yScale(d.length))
    .attr("height", (d) => height - yScale(d.length));

// append one group element for each axis
containerSVG
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

containerSVG
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis);


// set up an interval to update the rectangle's height, and the y-axis to match new values
setInterval(() => {
    // generate new data
    let newData = populateArray(length, max);
    // format it according to the histogram layout function
    let newGramData = histogram(newData)
    // console.log(newGramData);

    // select all rectangle elements and update the y/height properties to match the values
    containerSVG
        .selectAll("rect.bin")
        .data(newGramData)
        .transition()
        .duration(500)
        .delay((d, i) => 200 + 100 * i)
        .attr("y", (d) => yScale(d.length))
        .attr("height", (d) => height - yScale(d.length));

    // update the domain of the vertical axis
    yScale
        .domain([0, d3.max(newGramData, (d) => d.length) * 1.2]);

    // transition the ticks and the ticks labels according to the scale with the new domain
    d3
        .select("#y-axis")
        .transition()
        .duration(500)
        .delay(200)
        .call(yAxis);
}, 5000);