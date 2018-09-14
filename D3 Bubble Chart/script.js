// target the single container and include introductory elements
const container = d3
    .select(".container");


container
    .append("h1")
    .text("Bubble plot");

container
    .append("p")
    .text("Like a scatter plot, but a bit more")
    .style("margin-bottom", "0.5rem");


// include random data for the x and y axis, as well as a value for the area of the circle
const data = [],
    xMax = 250,
    yMax = 100,
    areaMax = 20;

for(let i = 0; i < 10; i++) {
    let tempObj = {
        x: Math.floor(Math.random() * xMax),
        y: Math.floor(Math.random() * yMax),
        area: Math.floor(Math.random() * areaMax)
    }
    data.push(tempObj);
}
// test the validity of the loop
// console.log(data);


// include the svg frame and a g element nested inside of it (for the actual viz)
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30
};

const width = 500 - (margin.left + margin.right);
const height = 350 - (margin.top + margin.bottom);

const containerSVG = container
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// include some padding for the x and y axis, to avoid cropping the circles
// ! this will also push the axes from each other, but the effect is not too bad
// grid lines certainly help
const padding = 25;

// include scales based on the max values of the x and y properties
const xScale = d3
    .scaleLinear()
    .domain([0, xMax])
    .range([padding, width - padding]);

const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - padding, padding]);

// include a scale for the fill color
const colorScale = d3
  .scaleOrdinal(d3.schemeSet2);

// include a scale for the area, mapping the area interval to 5-100
const areaScale = d3
    .scaleLinear()
    .domain([0, areaMax])
    .range([5, 100]);

// include axes based on the scales
const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .ticks(8)
    .tickPadding(10);

const yAxis = d3
    .axisLeft(yScale)
    .tickSize(0)
    .ticks(5)
    .tickPadding(10);

const groupX = containerSVG
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

const groupY = containerSVG
    .append("g")
    .call(yAxis);


// include vertical grid lines
groupX
    .selectAll("g.tick")
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", - padding)
    .attr("y2", -height + padding)
    .attr("stroke", "#55555555")
    .attr("stroke-width", "0.5px")

// style the path and ticks labels
groupX
    .select("path")
    .attr("stroke", "#55555533")
    .attr("stroke-width", "2px");

groupX
    .selectAll("text")
    .attr("fill", "#555")
    .style("font-weight", "bold")
    .style("font-size", "0.6rem");


// include horizontal grid lines
groupY
    .selectAll("g.tick")
    .append("line")
    .attr("x1", padding)
    .attr("x2", width - padding)
    .attr("y1", 0)
    .attr("y2", 0)
    .attr("stroke", "#55555555")
    .attr("stroke-width", "0.5px")

// style the path and ticks labels
groupY
    .select("path")
    .attr("stroke", "#55555533")
    .attr("stroke-width", "2px");

groupY
    .selectAll("text")
    .attr("fill", "#555")
    .style("font-weight", "bold")
    .style("font-size", "0.6rem");


// include a circle element for each data point
containerSVG
    .selectAll("circle.point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    // as the value correspond to the area, compute the radius from it
    // 2*pi*r^2 = area
    // r = square(area/2*pi)
    // transition to such a value
    .transition()
    .duration(500)
    .delay((d, i) => 200 + 50*i)
    .attr("r", (d) => areaScale(Math.sqrt(d.area/Math.PI*2)))
    .attr("fill", (d, i ) => colorScale(i));