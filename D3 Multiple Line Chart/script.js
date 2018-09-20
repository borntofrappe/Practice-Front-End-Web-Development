/** script logic
 *
 * data
 * color scale
 * introductory HTML elements (inclulding an anchor link referenccing the source data)
 * svg g elements
 * scales and axes
 * line() function
 * groups, nesting path and circle elements
 * rectangle elements for tooltip on hover
 */

// DATA
const data = [
    {
        trimester: "2012-T1",
        fifteenToTwentyFour: 22.9,
        twentyFiveToFortyNine: 9,
        aboveFortyNine: 5.8,
        total: 9.5
    },
    {
        trimester: "2012-T2",
        fifteenToTwentyFour: 23.6,
        twentyFiveToFortyNine: 9.1,
        aboveFortyNine: 6.2,
        total: 9.7
    },
    {
        trimester: "2012-T3",
        fifteenToTwentyFour: 24.7,
        twentyFiveToFortyNine: 9.1,
        aboveFortyNine: 6.1,
        total: 9.8
    },
    {
        trimester: "2012-T4",
        fifteenToTwentyFour: 26.1,
        twentyFiveToFortyNine: 9.2,
        aboveFortyNine: 6.5,
        total: 10.1
    },
    {
        trimester: "2013-T1",
        fifteenToTwentyFour: 25.7,
        twentyFiveToFortyNine: 9.5,
        aboveFortyNine: 6.7,
        total: 10.3
    },
    {
        trimester: "2013-T2",
        fifteenToTwentyFour: 25.4,
        twentyFiveToFortyNine: 9.7,
        aboveFortyNine: 6.9,
        total: 10.5
    },
    {
        trimester: "2013-T3",
        fifteenToTwentyFour: 24.7,
        twentyFiveToFortyNine: 9.6,
        aboveFortyNine: 6.9,
        total: 10.3
    },
    {
        trimester: "2013-T4",
        fifteenToTwentyFour: 23.9,
        twentyFiveToFortyNine: 9.6,
        aboveFortyNine: 6.6,
        total: 10.1
    },
    {
        trimester: "2014-T1",
        fifteenToTwentyFour: 23.8,
        twentyFiveToFortyNine: 9.5,
        aboveFortyNine: 7,
        total: 10.1
    },
    {
        trimester: "2014-T2",
        fifteenToTwentyFour: 24,
        twentyFiveToFortyNine: 9.6,
        aboveFortyNine: 6.8,
        total: 10.2,
    },
    {
        trimester: "2014-T3",
        fifteenToTwentyFour: 24.3,
        twentyFiveToFortyNine: 9.8,
        aboveFortyNine: 6.8,
        total: 10.3
    },
    {
        trimester: "2014-T4",
        fifteenToTwentyFour: 24.7,
        twentyFiveToFortyNine: 9.9,
        aboveFortyNine: 7,
        total: 10.4
    },
    {
        trimester: "2015-T1",
        fifteenToTwentyFour: 24.9,
        twentyFiveToFortyNine: 9.8,
        aboveFortyNine: 6.7,
        total: 10.3
    },
    {
        trimester: "2015-T2",
        fifteenToTwentyFour: 24.6,
        twentyFiveToFortyNine: 9.8,
        aboveFortyNine: 7.3,
        total: 10.5
    },
    {
        trimester: "2015-T3",
        fifteenToTwentyFour: 24.5,
        twentyFiveToFortyNine: 9.8,
        aboveFortyNine: 7.1,
        total: 10.4
    },
    {
        trimester: "2015-T4",
        fifteenToTwentyFour: 24.5,
        twentyFiveToFortyNine: 9.6,
        aboveFortyNine: 6.9,
        total: 10.2
    },
    {
        trimester: "2016-T1",
        fifteenToTwentyFour: 24.9,
        twentyFiveToFortyNine: 9.6,
        aboveFortyNine: 6.7,
        total: 10.2
    },
    {
        trimester: "2016-T2",
        fifteenToTwentyFour: 24.4,
        twentyFiveToFortyNine: 9.3,
        aboveFortyNine: 6.8,
        total: 10
    },
    {
        trimester: "2016-T3",
        fifteenToTwentyFour: 25.1,
        twentyFiveToFortyNine: 9,
        aboveFortyNine: 7.2,
        total: 10
    },
    {
        trimester: "2016-T4",
        fifteenToTwentyFour: 23.9,
        twentyFiveToFortyNine: 9.4,
        aboveFortyNine: 6.9,
        total: 10
    },
    {
        trimester: "2017-T1",
        fifteenToTwentyFour: 22.4,
        twentyFiveToFortyNine: 9,
        aboveFortyNine: 6.8,
        total: 9.6
    },
    {
        trimester: "2017-T2",
        fifteenToTwentyFour: 23.3,
        twentyFiveToFortyNine: 8.7,
        aboveFortyNine: 6.5,
        total: 9.4
    },
    {
        trimester: "2017-T3",
        fifteenToTwentyFour: 22.3,
        twentyFiveToFortyNine: 9.2,
        aboveFortyNine: 6.6,
        total: 9.7
    },
    {
        trimester: "2017-T4",
        fifteenToTwentyFour: 21.3,
        twentyFiveToFortyNine: 8.3,
        aboveFortyNine: 6.4,
        total: 8.9
    },
    {
        trimester: "2018-T1",
        fifteenToTwentyFour: 21.4,
        twentyFiveToFortyNine: 8.6,
        aboveFortyNine: 6.5,
        total: 9.2
    },
    {
        trimester: "2018-T2 (p)",
        fifteenToTwentyFour: 20.8,
        twentyFiveToFortyNine: 8.5,
        aboveFortyNine: 6.5,
        total: 9.1
    }
];

// include a color scale for the different lines
const colorScale = d3
  .scaleOrdinal(d3.schemeCategory10);


// HTML ELEMENTS
// target the container and append introductory elements
const container = d3
    .select(".container");

container
    .append("h1")
    .attr("class", "title")
    .text("Unemployment Rate");

container
    .append("p")
    .attr("class", "description")
    .style("margin", "1rem 0")
    .text("Metrics on employment in France, across age groups and the ages.");

// include one anchor link element for the source
container
    .append("a")
    .attr("href", "https://www.insee.fr/fr/statistiques/3598305")
    .attr("target", "_blank")
    .style("font-size", "0.75rem")
    .text("Source: INSEE");

// include a div for the tooltip
const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);


// SVG G FRAME
// include margin and measures for the svg
const margin = {
    top: 20,
    right: 20,
    bottom: 60,
    left: 30
};
const width = 500 - (margin.left + margin.right);
const height = 400 - (margin.top + margin.bottom);

// include the svg and g element in which to plot the chart
const containerSVG = container
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// SCALES & AXES
// include scales, ordinal for the horizontal dimension, linear for the vertical scale

const xScale = d3
    .scaleBand()
    // include as many bands as there are objects in the array
    .domain(d3.range(data.length))
    .range([0, width]);

const yScale = d3
    .scaleLinear()
    // map the values from 0 up to the biggest value in the array of object to the 0-width interval (plus 20% to have space before the top of the chart)
    .domain([0, d3.max(data, (d) => d.fifteenToTwentyFour) * 1.2])
    .range([height, 0]);


// include axes based on the scales
const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickPadding(10)
    // detail the respective trimester instead of the default index value
    .tickFormat((d, i) => data[i].trimester);

const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSize(0)
    .tickPadding(5)
    // show the ticks labels as percentage values
    // hide the first tick, when the label is 0
    .tickFormat((d) => (d === 0) ? '' : `${d}%`);


containerSVG
    .append("g")
    .attr("class", "axis")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
        // rotate the ticks labels
        .selectAll("text")
        .attr("transform", "translate(-10 10) rotate(-45)");

containerSVG
    .append("g")
    .attr("class", "axis")
    .attr("id", "y-axis")
    .call(yAxis)
        // add grid lines
        .selectAll("g.tick")
        .append("path")
        .attr("d", `M 0 0 h ${width}`)
        .attr("stroke-width", "1px")
        .style("opacity", 0.5);



// LINE FUNCTION
// include a line function which considers the items of the input array for the y coordinate
// the x coordinate is determined instead by the index of the array item
const line = d3
    .line()
    // include the bandwidth to center the values in the bands
    .x((d, i) => xScale(i) + xScale.bandwidth()/2)
    .y((d, i) => yScale(d));


// G PATH CIRCLE ELEMENTS
// include an array for the legend (and used in the tooltip)
const category = ["Years 15-24", "Years 25-49", "Years >49", "Total"];

// go through a for loop one time per object's field, to plot path and circle elements for each key
// exclude the first key, as this relates to the trimester of the observation
const keys = Object.keys(data[0]).slice(1);


for(let i = 0; i < keys.length; i++) {
    /* for each key include a group element, in which to gather
    a path for the line
    circle elements for the connecting dots
    a text element for the legend
    */

    let grouping = containerSVG
        .append("g")
        // add a class according to the key of the observation, to differentiate the group elements
        .attr("class", `${keys[i]}`)
        .style("pointer-events", "none");


    grouping
        // add a path through the line function, considering each time an array of values estimating each category
        .append("path")
        .attr("d", line(data.map((d) => d[keys[i]])))
        .attr("stroke", colorScale(i))
        .attr("stroke-width", "2px")
        .attr("fill", "none");

    grouping
        // add circle elements, for each single observation
        .selectAll(`circle`)
        .data(data.map((d) => d[keys[i]]))
        .enter()
        .append("circle")
        // add the single observation in a data-rate attribute, to retrieve the value for the tooltip
        .attr("data-rate", (d) => d)
        .attr("cx", (d, i) => xScale(i) + xScale.bandwidth()/2)
        .attr("cy", (d) => yScale(d))
        .attr("r", "2px")
        .attr("fill", "white")
        .attr("stroke", colorScale(i))
        .attr("stroke-width", "2px");

    containerSVG
        // add text elements
        .append("text")
        .attr("class", `${keys[i]}`)
        // on click hide the connected path/circle elements and render the text half transparent
        // ! select(this) does NOT work with arrow functions, as these do not have the instance of the "this" keyword, unlike normal functions
        .on("click", function() {

            let textOpacity = d3
                .select(this)
                .style("opacity");

            let textClass = d3
                .select(this)
                .attr("class");

            if(textOpacity === "1") {
                d3
                    .select(`g.${textClass}`)
                    .transition()
                    .style("opacity", 0);
                d3
                    .select(this)
                    .style("opacity", 1)
                    .transition()
                    .style("opacity", 0.5);
            }
            else {
                d3
                    .select(`g.${textClass}`)
                    .style("opacity", 1);
                d3
                    .select(this)
                    .transition()
                    .style("opacity", 1);
            }
        })
        // include each text element at a fraction of the width
        // with 4 items for instance, include them at 0.2, 0.4, 0.6, 0.8
        .attr("x", (width / (keys.length + 1)) * (i + 1))
        .attr("y", height + margin.bottom)
        .attr("text-anchor", "middle")
        .attr("fill", colorScale(i))
        .style("font-weight", "bold")
        .style("font-size", "0.7rem")
        .style("cursor", "pointer")
        .text(category[i]);
}


// RECTANGLES FOR TOOLTIP
// to highlight a tooltip regardless of the vertical coordinate, and display data related to all path elements together, overlap rectangle elements for each band
d3
    .select("#x-axis")
    .selectAll("g.tick")
    .append("rect")
    // whenever the cursor hovers on the transparent rectangle, retrieve the information connected to the underlying circle elements (store in the data-rate attribute) and display it in paragraph elements
    .on("mouseenter", (d, i) => {
        let circles = d3
            .selectAll(`g circle:nth-of-type(${i + 1})`)
            .transition()
            .attr("r", "5px")
            .attr("stroke-width", "3px");

        // the selection returns an object which details the single items in a node selection
        // retrieve the node selection
        let nodeList = circles._groups[0];
        // retrieve an array out of the node selection
        let arr = [...nodeList];

        // create an array detailing the rates of the different circle elements
        let rates = arr.map(circle => circle.getAttribute("data-rate"));

        // append one text element for each rate, detailing the actual value
        tooltip
            .selectAll("p")
            .data(rates)
            .enter()
            .append("p")
            // using the text from the legend's array
            .text((d, i) => `${category[i]}: `)
                // highlighting the rate in a separate span element
                .append("span")
                .text((d) => d)
                .style("font-weight", "bold")
                .style("color", (d, i) => colorScale(i));


        // retrieve the measures of the tooltip, as to position the div freely with respect to the cursor
        let tooltipBox = tooltip.node().getBoundingClientRect();

        // show the tooltip and position it to the right and centered or to the left and centered according to the cursor position
        tooltip
            .style("opacity", 1)
            .style("top", `${d3.event.pageY - tooltipBox.height/2}px`)
            .style("left", () => {
                // retrieve the horizontal coordinate of the cursor
                let xCoor = d3.event.pageX;
                // compute the threshold as the middle of the container (its distance from the left of the page + half its width)
                let threshold = container.node().offsetLeft + container.node().offsetWidth/2;
                // if after the threshold, show the tooltip to the left
                // else to the right
                if(xCoor > threshold) {
                    return `${d3.event.pageX - tooltipBox.width - 20}px`;
                }
                else {
                    return `${d3.event.pageX + 20}px`;
                }

            });
    })
    // when leaving the rectangle element, transition the circle elements back to their default values and remove the paragraph elements from the tooltip
    .on("mouseout", (d, i) => {
        d3
            .selectAll(`g circle:nth-of-type(${i + 1})`)
            .transition()
            .attr("r", "2px")
            .attr("stroke-width", "2px");

        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
    })
    // have the rectangle elements pick up the space of each band
    .attr("x", -xScale.bandwidth()/2)
    .attr("width", xScale.bandwidth())
    .attr("y", -height)
    .attr("height", height)
    .attr("stroke", "none")
    // ! fill none would not allow for the mouseenter/ mouseout events to be triggered
    .attr("fill", "transparent");
