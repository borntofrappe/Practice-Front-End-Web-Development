// target the single container and include one div element for each data visualization
const container = d3.select(".container");

// include colors used by all visualizations (detailing the three categories of departmental, national, temporary permits)
const colors = [
    "#007a5e",
    "#0ec99e",
    "#c6990a"
];

// include a div for the tooltip, nesting two paragraphs element to detail the information in two organized lines
const tooltip = container
    .append("div")
    .attr("id", "tooltip")
    // opacity altered on hover on the slices (although it is also possible to set this property in CSS)
    .style("opacity", 0);

tooltip
    .append("p")
    .attr("class", "tooltip--main");

tooltip
    .append("p")
    .attr("class", "tooltip--details");


// PIE CHART
// include data, in an array detailing each slice in an object
const dataPie = [
    {
        category: 'departmental',
        value: 1055944
    },
    {
        category: 'national',
        value: 123652
    },
    {
        category: 'temporary',
        value: 66677
    }
];

// include introductory elements in a wrapping container
const containerPie = container
    .append("div")
    .attr("class", "chart chart--pie");

containerPie
    .append("h2")
    .attr("class", "title")
    .text("Permits by Category");

// include measures for the pie chart, for the width/height of the SVG and the margins by which the g element is nested
// include considerable margins to have the text for the slices around the pie chart and not cropped out
const pieMargin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

const pieWidth = 500 - pieMargin.left - pieMargin.right,
    pieHeight = 500 - pieMargin.top - pieMargin.bottom;

// include an SVG element and a group element nestled within
const svgPie = containerPie
    .append("svg")
    .attr("viewBox", `0 0 ${pieWidth + pieMargin.left + pieMargin.right} ${pieHeight + pieMargin.top + pieMargin.bottom}`)
    .append("g")
    .attr("transform", `translate(${pieMargin.left}, ${pieMargin.top})`);

// include a formatting function allowing a single number after the decimal point, and in percentage notation
// example input: 0.85132554
// example output: 85.1%
const formatPercent = d3.format(".1%");

// pie function
const pie = d3
    .pie();

// arc function, based on outer and inner radii
const innerRadius = 0;
const outerRadius = parseInt(pieWidth/2);

const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


// for each data point, append a group element and center it in the SVG using the measure of the outer radius (half the container)
const arcs = svgPie
    .selectAll("g")
    // pass the value of each data point in the pie function
    .data(pie(dataPie.map(data => data.value)))
    .enter()
    .append("g")
    // include mouseenter and mouseleave events on the group element
    // this to have the tooltip shown/hidden when entering/exiting the path elements of the text elements, both nested in the wrapping group
    .on("mouseenter", (d, i) => {
        // computed the total as the sum of all values
        let total = dataPie.map((item) => item.value).reduce((acc, curr) => acc+curr);
        // include the percentage as the specific value divided by the computed total and formatted by the format function
        let percentage = formatPercent(d.value/total);

        // show the tooltip and detail in the paragraph elements the desired information
        tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`)
            .style("border", `2px solid ${colors[i]}`);
        tooltip
            .select(".tooltip--main")
            .text("Macro Figures");
        tooltip
            .select(".tooltip--details")
            .text(`${dataPie[i].category}: ${percentage} of Total`);
    })
    .on("mouseleave", () => tooltip.style("opacity", 0))
    // center the arcs
    .attr("transform", `translate(${outerRadius}, ${outerRadius})`);


// include in each group an arc based on the data bound to the element
arcs
    .append("path")
    // fill according to the chosen colors
    .attr("fill", (d, i) => colors[i])
    .attr("class", "slice")
    // the d attribute of the SVG is determined by the arc function, considering the value of the bound data
    .attr("d", arc);


// include text labels next to each sllce
arcs
    .append("text")
    // to include the labels around the pie chart, and next to their respectful slice, rotate the text elements exactly midway through the slices
    .attr("transform",(d, i) => {
        // compute the angle relative to the midway point of each slice
        // this as half the difference between end and start angle, considering the starting point of each slice
        // ! beware, endAngle and startAngle are in radians, so you need to retrieve degrees for the transform property
        let radians = (d.endAngle - d.startAngle) / 2 + d.startAngle;
        // covert radians to degrees
        let degrees = radians * 180 / Math.PI;
        // to rotate the text elements rotate the text, translate it vertically atop the pie chart and have it rotate back to its not-skewed state
        // by changing the position with translateY, rotate considers the new coordinate system and rotates considering the starting point (not-translated) as the origin
        return `rotate(${degrees}) translate(0 ${-outerRadius - 40}) rotate(${-degrees})`;
    })
    // styled the text based on the categories, include their text bold and uppercased
    .attr("text-anchor", "middle")
    .attr("fill", (d, i) => colors[i])
    .style("font-weight", "bold")
    .style("text-transform", "capitalize")
    .style("font-size", "1.3rem")
    .text((d, i) => {
        return dataPie[i].category;
    });


// COMING SOON, as I'm too exhausted to actually continue
// BAR CHART
// include data, in an array detailing each slice in an object


// include introductory elements in a wrapping container

// const containerBar = container
//     .append("div")
//     .attr("class", "chart chart--bar");

// containerBar
//     .append("h2")
//     .attr("class", "title")
//     .text("Permits by Category & by Age");



// RADAR CHART
// include data


// include introductory elements in a wrapping container

// const containerRadar = container
//     .append("div")
//     .attr("class", "chart chart--radar");

// containerRadar
//     .append("h2")
//     .attr("class", "title")
//     .text("Comparison by age older than 15");