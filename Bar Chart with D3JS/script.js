// include data points and titles for each one of them
const dataset = [151, 100, 135, 107, 156, 72, 86];
const datasetTitles = ["Kanto", "Jotho", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"];

// start by including a header in the DOM
d3.select(".container")
    .append("h1")
    .text("Numbers by Generation");


// in order to draw the chart, you need to include an SVG element. Define width and height of the SVG canvas
// as the bars are drawn horizontally, the width needs to consider all data-points, so its value is set in relation to the largest data-point
const w = d3.max(dataset)*2;
// as the bars need to be a certain measure tall and separated from each other, the height needs to encompass their scale (width 35px + margin 5px)
const h = dataset.length*40;

// append an SVG element to the .container div with the prescribed with and height
const svg = d3.select(".container")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

// for each data point include a rectangle element
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    // the horizontal coordinate is equal for all data-point, as they all start from the left
    .attr("x", 0)
    // the vertical coordinate is altered for each data point, on the basis of its index
    .attr("y", (d, i) => i*40)
    // the width is eventually set by the data point value itself [not here, as it is animated with a transition() function later in the script]
    // .attr("width", (d, i) => d*1.5);
    // the height is arbitrarily set to 35px
    .attr("height", (d, i) => 35)
    // include a class to otherwise style each rectangle with css
    .attr("class", "bar")
    // include a title for each rectangle, with a string of text referencing a label with the appropriate index
    .append("title")
    .text((d, i) => datasetTitles[i]);

// in addition to the rectangle, include text elements in the svg (one for each data point)
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    // include as text the data-point values
    .text((d) => d)
    // include the text elements right next to the rectangle used as bars
    // horizontally and eventually next to the data-points (which start at x=0 with width=d) [not here, as this attribute as well is animated later on]
    //.attr("x", (d, i) => d*1.5 + 5)
    // vertically at each iteration of the y coordinate (i*40) [as text elements are drawn from a coordinate upwards, you need to offset for the height of the text itself]
    .attr("y", (d, i) => i * 40 + 25)
    .attr("class", "data-point");


// animate the rectangles from to a width given by each data-point value
svg.selectAll("rect")
    .transition()
    .duration(1000)
    .delay((d, i) => 1000 + i*200)
    .attr("width", (d, i) => d*1.5);

// animate the text right next to the animated bars
svg.selectAll("text")
    .transition()
    .duration(1000)
    .delay((d, i) => 1000 + i*200)
    .style("opacity", 1)
    .attr("x", (d, i) => d*1.5 + 5);

