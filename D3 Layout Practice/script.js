// target the single container and include one div element for each data visualization
const container = d3.select(".container");

// include colors used by all visualizations (detailing the three categories of departmental, national, temporary permits)
const colors = [
    "#007a5e",
    "#0ec99e",
    "#c6990a"
];
// include highlight colors, used for the hover transition of the slices of the pie chart
const colorsHighlight = [
    "#C0DFD8",
    "#8CEFD8",
    "#F1E5C2"
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
// to compensate the padAngle, and include close to uniform space between slices, include also an inner radius greater than 0 (otherwise the padAngle would generate space mostly on the outermost section of the pie)
const innerRadius = 4;
const outerRadius = parseInt(pieWidth/2);

const arc = d3
    .arc()
    // include some space between slices
    .padAngle(0.03)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

// include an arc function for larger slices, of a brighter color and shown on hover
const arcHighlight = d3
    .arc()
    .padAngle(0.03)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius + 15);

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

        // show the tooltip
        tooltip
            .style("opacity", 1)
            // move the tooltip to the top left of the cursor
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`)
            .style("border", `2px solid ${colors[i]}`);

        // append paragraph elements with the detailed information
        tooltip
            .append("p")
            .text("Macro Figures");
        tooltip
            .append("p")
            .text(`${dataPie[i].category}: ${percentage} of Total`);

        // select the highlight slice of the hovering group element and change its opacity
        // i + 1 as nth-of-type(1) refers to the first element and i starts at zero
        svgPie
            .select(`g:nth-of-type(${i+1}) path.highlight`)
            .transition()
            .duration(250)
            .style("opacity", 0.5);
    })
    .on("mouseleave", (d, i) => {
        // hide the tooltip and remove the nested paragraph elements
        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();

        // transition the opacity of the highlight slice back to its default value
        svgPie
            .select(`g:nth-of-type(${i+1}) path.highlight`)
            .transition()
            .duration(250)
            .style("opacity", 0);

    })
    // center the arcs
    .attr("transform", `translate(${outerRadius}, ${outerRadius})`);


// include in each group an arc based on the data bound to the element
arcs
    .append("path")
    // fill according to the chosen colors
    .attr("fill", (d, i) => colors[i])
    // .attr("stroke-width", "4px")
    .attr("class", "slice")
    // the d attribute of the SVG is determined by the arc function, considering the value of the bound data
    .attr("d", arc);

// include slices for the highlight, hidden by default and shown when hovering the group element
// include them after the normal slices, to have them on top
arcs
    .append("path")
    .attr("fill", (d, i) => colorsHighlight[i])
    .attr("class", "highlight")
    .style("opacity", 0)
    .attr("d", arcHighlight);

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


// BAR CHART
// include data
const dataBar = [
    {
        category: "15-24",
        department: 72.24061983,
        national: 20.13964822,
        temporary: 7.61973195
    },
    {
        category: "25-34",
        department: 80.21689925,
        national: 10.13580629,
        temporary: 9.647294459
    },
    {
        category: "35-44",
        department: 82.53281102,
        national: 9.301237587,
        temporary: 8.165951395
    },
    {
        category: "45-54",
        department: 84.38854137,
        national: 9.495186228,
        temporary: 6.116272404
    },
    {
        category: "55-64",
        department: 85.80551822,
        national: 9.902865051,
        temporary: 4.291616731
    },
    {
        category: "65-74",
        department: 86.74456643,
        national: 10.0631972,
        temporary: 3.192236373
    },
    {
        category: "75 +",
        department: 92.76908954,
        national: 5.76046687,
        temporary: 1.470443592
    }
];

// include introductory elements in a wrapping container
const containerBar = container
    .append("div")
    .attr("class", "chart chart--bar");

containerBar
    .append("h2")
    .attr("class", "title")
    .text("Permits by Category & by Age");

// define the dimensions of the SVG
const barMargin = {
    top: 20,
    right: 20,
    // greater margin values to show the ticks labels
    bottom: 50,
    left: 40
};

const barWidth = 500 - barMargin.left - barMargin.right,
    barHeight = 500 - barMargin.top - barMargin.bottom;

// include an SVG element and a group element nestled within
const svgBar = containerBar
    .append("svg")
    .attr("viewBox", `0 0 ${barWidth + barMargin.left + barMargin.right} ${barHeight + barMargin.top + barMargin.bottom}`)
    .append("g")
    .attr("transform", `translate(${barMargin.left}, ${barMargin.top})`);

// define scales, an ordinal scale band for the horizontal dimension, a linear scale for the vertical one
const xScale = d3
    .scaleBand()
    // include as many bands as there are data points
    // one for category
    .domain(dataBar.map(data => data.category))
    .range([0, barWidth]);

const yScale = d3
    .scaleLinear()
    // include inputs spanning the entire range of 0-100%, since the data is in percentages
    .domain([0, 100])
    .range([barHeight, 0]);

// add the axes on the basis of the data
const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickPadding(15);

const yAxis = d3
    .axisLeft(yScale)
    .tickSize(0)
    .tickPadding(5)
    // show all tick labels except the first one followed by a percentage sign
    .tickFormat((d) => (d !== 0) ? `${d}%` : "");

// add the axes and immediately style the connected text elements used for the tick labels
svgBar
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${barHeight})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", `translate(-10, 10) rotate(-40)`)
    .attr("font-size", "1.2rem");

svgBar
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis)
    .selectAll("text")
    .attr("font-size", "1rem");

// include an additional label describing the horizontal tick labels
// position it aligned to the tick labels themselves (15 being the used padding)
svgBar
    .append("text")
    .text("years")
    .attr("text-anchor", "end")
    .style("text-transform", "uppercase")
    .style("opacity", 0.5)
    .attr("transform", `translate(0, ${barHeight + 15}) rotate(-45)`);

// append one group element per data point
const gBar = svgBar
    .selectAll("g.band")
    .data(dataBar)
    .enter()
    .append("g")
    // on hover show a tooltip with the desired information
    .on("mouseenter", (d, i) => {
        // store in a two dimensional array the [key-value] pairs of the object
        let entries = Object.entries(d);
        // remove the first array item, the one depicting the category, and store it in a separate variable
        let category = entries.shift();

        // show the tooltip
        tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`)
            .style("border", `2px solid #000`);

        // append a paragraph for the category
        tooltip
            .append("p")
            .text(`Years: ${category[1]}`);

        // append one paragraph per entry, showing the category and its respective value
        for(let i = 0; i < entries.length; i++) {
            tooltip
                .append("p")
                .text(`${entries[i][0]} ${formatPercent(entries[i][1]/100)}`);
        }

    })
    .on("mouseleave", () => {
        // hide the tooltip and remove the nested paragraph elements
        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
    })
    .attr("class", "band")
    // position each group element to begin at the beginning of each band
    .attr("transform", (d, i) => `translate(${xScale.bandwidth()*i}, 0)`);

// include one rectangle for each sub-category of the each data point (three sub-categories)
for(let i = 0; i < 3; i++) {
    gBar
        .append("rect")
        // each rectangle begins at a fraction of the band width
        // offset by half the width of a fraction to center the rectangle elements
        .attr("x", xScale.bandwidth()/4*i + xScale.bandwidth()/8)
        // each rectangle occupies the same fraction of space
        .attr("width", xScale.bandwidth()/4)
        // for the vertical dimension, detail the y coordinate and height on the basis of the value of the subcategories
        // as per the foor loop, use the first, second and third value of each data point (once the main category is removed)
        // ! i refers to the for loop **unless** you specify i as the second argument of the fallback function
        .attr("y", (d) => {
            let keys = Object.keys(d);
            keys.shift();
            return yScale(d[keys[i]]);
        })
        .attr("height", (d) => {
            let keys = Object.keys(d);
            keys.shift();
            return barHeight - yScale(d[keys[i]]);
        })
        // detail the fill colors, once again on the basis of the for loop
        .attr("fill", colors[i]);
}


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

