// target the single container and include introductory HTML elements
const container = d3
    .select(".container");

container
    .append("h1")
    .text("Box Plot");

container
    .append("p")
    .text("Jitters, whiskers and all");

// define also a tooltip, showing the actual value of each observation when hovering on the circle elements
const tooltip = container
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);


// DATA
// include an array of 20 items, randomly picked from 1 to 1000
const data = [];
for(let i = 0; i < 20; i++) {
    data.push(Math.ceil(Math.random()*1000));
}
// check the for loop
// console.log(data);

// sort the data from smallest to biggest value (as to easily retrieve the quartile, median values)
const sortedData = data.sort((a,b) => a - b);
// check the sort function
// console.log(sortedData);

// compute the values required for the box plot:

// median: the value in the center of the distribution, for which there are as many smaller numbers as there are bigger numbers



// the median can be easily computed through d3.median(), passing the array as argument
const median = d3.median(sortedData);
// console.log(median);

// alternatively, it is possible to easily compute its value on the basis of the sorted array

// for array of a length of uneven number, the median is found smack in the middle of the array
// ! remember how arrays are indexed stating from zero
// logic: say you have a sorted array of 7 items, the median value is the fourth, which you retrieve as arr[3]
// console.log(sortedData[Math.floor(sortedData.length/2)]);

// for array which have an even length, on the other hand, the median is the average of the two central values
// say you have an array of 8 items: the median is the average between the fourth and fifth items, which are arr[3] and arr[4]
// console.log((sortedData[Math.floor(sortedData.length/2) - 1] + sortedData[Math.floor(sortedData.length/2)])/2 );


// the first and third quartile follow the same logic applied for the median
// there exist a d3-powered function
const firstQuartile = d3.quantile(sortedData, 0.25);
// console.log(firstQuartile);
const thirdQuartile = d3.quantile(sortedData, 0.75);
// console.log(thirdQuartile);

// without using the d3-powered function, the first and third quartile are found as those numbers which have respectively 25% and 75% of the observations **before** them
// if it is not possible to evenly split the observations, the quartiles are found as the average of the observations before and after the 25% and 75% mark

// the mentioned quartiles define the edges of the box, while the median describes the line passing **through** the box
// the width of the box (therefore computed as the difference between third and first quartile), describes the interquartile range
// this measure is helpful to find the minimum and maximum values of the box plot
// ! these are not necessarily the minimum/ maximum values of the array; they are defined as the smallest and biggest values past the first and third quartiles, within a measure of 1.5 the interquartile range
// ! they are the minimum and maximum values if the computation goes past them
const interQuartileRange = thirdQuartile - firstQuartile;
// console.log(interQuartileRange);

const minAbsolute = d3.min(sortedData);
const minIQR = firstQuartile - interQuartileRange * 1.5;

const min = (minIQR > minAbsolute) ? minIQR : minAbsolute;


const maxAbsolute = d3.max(sortedData);
const maxIQR = thirdQuartile + interQuartileRange * 1.5;

const max = (maxIQR < maxAbsolute) ? maxIQR : maxAbsolute;

// console.log(minAbsolute, maxAbsolute);
// console.log(min, max);

// the box plot is then complete
// min - |first quartile | median | third quartile | - max



// include the SVG through the margin, width and height measures
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};
const width = 550 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// include the svg and g elements
const svgContainer = container
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// include a scale for the horizontal axis (for the box plot values)
const xScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([0, width]);

// include the horizontal axis on the basis of the scale
const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickPadding(10);

const groupAxis = svgContainer
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

// style the path responsible for the axis
groupAxis
    .select("path")
    .attr("fill", "none")
    .attr("stroke", "#00000055")
    .attr("stroke-width", "1px");

// style the ticks' labels
// the ticks are hidden as per tickSize(0)
groupAxis
    .selectAll("text")
    .attr("fill", "#00000088")
    .attr("stroke", "none")
    .style("font-weight", "bold")
    .style("font-size", "0.7rem");

// include a simple line for the vertical axis
svgContainer
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#00000055")
    .attr("stroke-width", "1px");


// BOX PLOT
// plot the box plot, alongside text elements describing each key value

// line from minimum to maximum value
svgContainer
    .append("line")
    .attr("x1", xScale(min))
    .attr("x2", xScale(max))
    // vertically centered
    .attr("y1", height/2)
    .attr("y2", height/2)
    // with a stroke matching the text color (as well as for the other box plot components)
    .attr("stroke", "#443785")
    .attr("stroke-width", "4px");

// labels for minimum and maximum values
// slightly offset atop the line
svgContainer
    .append("text")
    .attr("x", xScale(min))
    .attr("y", height / 2 - 10)
    .attr("text-anchor", "middle")
    .text("min")
    .attr("fill", "#443785")
    .attr("font-weight", "bold");

svgContainer
    .append("text")
    .attr("x", xScale(max))
    .attr("y", height / 2 - 10)
    .attr("text-anchor", "middle")
    .text("max")
    .attr("fill", "#443785")
    .attr("font-weight", "bold");

// include a box from the first quartile to the third
// by including a solid fill the box hides the line going from minimum to maximum value
svgContainer
    .append("rect")
    .attr("x", xScale(firstQuartile))
    .attr("width", xScale(thirdQuartile) - xScale(firstQuartile))
    .attr("y", height/2 - height/8)
    .attr("height", height/4)
    .attr("fill", "#fff")
    .attr("stroke", "#443785")
    .attr("stroke-width", "4px");

// include text for each quartile
svgContainer
    .append("text")
    .attr("x", xScale(firstQuartile))
    .attr("y", height/2 - height/8 - 10)
    .attr("text-anchor", "middle")
    .text("q1")
    .attr("fill", "#443785")
    .attr("font-weight", "bold");

svgContainer
    .append("text")
    .attr("x", xScale(thirdQuartile))
    .attr("y", height/2 - height/8 - 10)
    .attr("text-anchor", "middle")
    .text("q3")
    .attr("fill", "#443785")
    .attr("font-weight", "bold");

// include a line for the median
svgContainer
    .append("line")
    .attr("x1", xScale(median))
    .attr("x2", xScale(median))
    .attr("y1", height/2 - height/8)
    .attr("y2", height/2 + height/8)
    .attr("stroke", "#443785")
    .attr("stroke-width", "4px");

// include text for the median
svgContainer
    .append("text")
    .attr("x", xScale(median))
    .attr("y", height/2 - height/8 - 10)
    .attr("text-anchor", "middle")
    .text("median")
    .attr("fill", "#443785")
    .attr("font-weight", "bold");

// add jitters, those being the observations themselves, as transparent circles alongside the box plot
svgContainer
    .selectAll("circle")
    .data(sortedData)
    .enter()
    .append("circle")
    // on hover show the value of the data bound to the circle elements
    .on("mouseenter", (d) => {
        tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.pageX + 10}px`)
            .style("top", `${d3.event.pageY}px`);

        // append a paragraph detailing the observation
        tooltip
            .append("p")
            .text(`Observation Value: ${d}`);

    })
    // when leaving the circle, return the opacity of the tooltip to its default and remove the nested paragraph
    .on("mouseout", () => {
        tooltip
            .style("opacity", 0)
            .select("p")
            .remove();
    })
    .attr("cx", (d) => xScale(d))
    // position the circles randomly offset from the center, in between the range specified by the box itself
    .attr("cy", (d, i) => height/2 + Math.floor(Math.random() * height/4) - height/8)
    .attr("r", "3px")
    .attr("fill", "#44378588");