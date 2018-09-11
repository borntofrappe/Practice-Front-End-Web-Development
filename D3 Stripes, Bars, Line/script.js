// FOR BOTH VIZ(s)
/**
 * target single container
 * add a tooltip
 * define measures for the margin values, width and height
 * describe the colors used throughout the project
 */

const container = d3
    .select(".container");

const tooltip = container
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

const margin = {
    // taller margin on top to display the legend atop the charts
    top: 40,
    right: 20,
    bottom: 20,
    left: 20
};

// have the charts be slightly wider than taller
const width = 600 - (margin.left + margin.right);
const height = 400 - (margin.top + margin.bottom);

// describe in a centralized array the color values used in the project
const colors = ["#0881FA", "#B51A1E"];


// STRIPES CHART
/** logic
 * add data
 * include wrapping container
 * include introductory html elements
 * include svg
 * detail scales, axes (actually not necessary for the stripes)
 * ! remember the color scale from one color to another
 * detail a rectangle element for the legend (this requires a linear gradient, included in between defs tag)
 * detail rectangle elements
 */



// data for the warm stripes
/*
year, deviation from the average temperature
data sorted in objects structured as follows:
    {
        year: 1900,
        gap: -0.28
    }
*/
const dataStripes = [
    {
        year: 1905,
        gap: -0.28
    },
    {
        year: 1906,
        gap: -0.21
    },
    {
        year: 1907,
        gap: -0.37
    },
    {
        year: 1908,
        gap: -0.44
    },
    {
        year: 1909,
        gap: -0.42
    },
    {
        year: 1910,
        gap: -0.38
    },
    {
        year: 1911,
        gap: -0.43
    },
    {
        year: 1912,
        gap: -0.33
    },
    {
        year: 1913,
        gap: -0.32
    },
    {
        year: 1914,
        gap: -0.14
    },
    {
        year: 1915,
        gap: -0.07
    },
    {
        year: 1916,
        gap: -0.29
    },
    {
        year: 1917,
        gap: -0.31
    },
    {
        year: 1918,
        gap: -0.20
    },
    {
        year: 1919,
        gap: -0.20
    },
    {
        year: 1920,
        gap: -0.21
    },
    {
        year: 1921,
        gap: -0.14
    },
    {
        year: 1922,
        gap: -0.22
    },
    {
        year: 1923,
        gap: -0.21
    },
    {
        year: 1924,
        gap: -0.24
    },
    {
        year: 1925,
        gap: -0.14
    },
    {
        year: 1926,
        gap: -0.06
    },
    {
        year: 1927,
        gap: -0.14
    },
    {
        year: 1928,
        gap: -0.17
    },
    {
        year: 1929,
        gap: -0.29
    },
    {
        year: 1930,
        gap: -0.10
    },
    {
        year: 1931,
        gap: -0.07
    },
    {
        year: 1932,
        gap: -0.12
    },
    {
        year: 1933,
        gap: -0.24
    },
    {
        year: 1934,
        gap: -0.10
    },
    {
        year: 1935,
        gap: -0.14
    },
    {
        year: 1936,
        gap: -0.11
    },
    {
        year: 1937,
        gap: -0.02
    },
    {
        year: 1938,
        gap: -0.03
    },
    {
        year: 1939,
        gap: -0.01
    },
    {
        year: 1940,
        gap: 0.10
    },
    {
        year: 1941,
        gap: 0.19
    },
    {
        year: 1942,
        gap: 0.15
    },
    {
        year: 1943,
        gap: 0.15
    },
    {
        year: 1944,
        gap: 0.29
    },
    {
        year: 1945,
        gap: 0.17
    },
    {
        year: 1946,
        gap: -0.01
    },
    {
        year: 1947,
        gap: -0.06
    },
    {
        year: 1948,
        gap: -0.05
    },
    {
        year: 1949,
        gap: -0.06
    },
    {
        year: 1950,
        gap: -0.17
    },
    {
        year: 1951,
        gap: -0.02
    },
    {
        year: 1952,
        gap: 0.02
    },
    {
        year: 1953,
        gap: 0.09
    },
    {
        year: 1954,
        gap: -0.12
    },
    {
        year: 1955,
        gap: -0.14
    },
    {
        year: 1956,
        gap: -0.20
    },
    {
        year: 1957,
        gap: 0.04
    },
    {
        year: 1958,
        gap: 0.11
    },
    {
        year: 1959,
        gap: 0.06
    },
    {
        year: 1960,
        gap: 0.02
    },
    {
        year: 1961,
        gap: 0.07
    },
    {
        year: 1962,
        gap: 0.09
    },
    {
        year: 1963,
        gap: 0.11
    },
    {
        year: 1964,
        gap: -0.15
    },
    {
        year: 1965,
        gap: -0.08
    },
    {
        year: 1966,
        gap: -0.02
    },
    {
        year: 1967,
        gap: -0.02
    },
    {
        year: 1968,
        gap: -0.03
    },
    {
        year: 1969,
        gap: 0.09
    },
    {
        year: 1970,
        gap: 0.04
    },
    {
        year: 1971,
        gap: -0.08
    },
    {
        year: 1972,
        gap: 0.03
    },
    {
        year: 1973,
        gap: 0.16
    },
    {
        year: 1974,
        gap: -0.07
    },
    {
        year: 1975,
        gap: 0.00
    },
    {
        year: 1976,
        gap: -0.08
    },
    {
        year: 1977,
        gap: 0.20
    },
    {
        year: 1978,
        gap: 0.11
    },
    {
        year: 1979,
        gap: 0.23
    },
    {
        year: 1980,
        gap: 0.26
    },
    {
        year: 1981,
        gap: 0.30
    },
    {
        year: 1982,
        gap: 0.18
    },
    {
        year: 1983,
        gap: 0.34
    },
    {
        year: 1984,
        gap: 0.15
    },
    {
        year: 1985,
        gap: 0.13
    },
    {
        year: 1986,
        gap: 0.23
    },
    {
        year: 1987,
        gap: 0.37
    },
    {
        year: 1988,
        gap: 0.37
    },
    {
        year: 1989,
        gap: 0.29
    },
    {
        year: 1990,
        gap: 0.43
    },
    {
        year: 1991,
        gap: 0.40
    },
    {
        year: 1992,
        gap: 0.25
    },
    {
        year: 1993,
        gap: 0.28
    },
    {
        year: 1994,
        gap: 0.34
    },
    {
        year: 1995,
        gap: 0.45
    },
    {
        year: 1996,
        gap: 0.32
    },
    {
        year: 1997,
        gap: 0.52
    },
    {
        year: 1998,
        gap: 0.63
    },
    {
        year: 1999,
        gap: 0.44
    },
    {
        year: 2000,
        gap: 0.42
    },
    {
        year: 2001,
        gap: 0.54
    },
    {
        year: 2002,
        gap: 0.60
    },
    {
        year: 2003,
        gap: 0.61
    },
    {
        year: 2004,
        gap: 0.58
    },
    {
        year: 2005,
        gap: 0.66
    },
    {
        year: 2006,
        gap: 0.61
    },
    {
        year: 2007,
        gap: 0.61
    },
    {
        year: 2008,
        gap: 0.54
    },
    {
        year: 2009,
        gap: 0.63
    },
    {
        year: 2010,
        gap: 0.70
    },
    {
        year: 2011,
        gap: 0.58
    }
];


// add a container for the visualization
const containerStripes = container
    .append("div")
    .attr("class", "viz");

// hmtl elements
containerStripes
    .append("h2")
    .attr("class", "title")
    .text("Warming Stripes");

containerStripes
    .append("p")
    .attr("class", "description")
    .text("Simple, yet effective layout.")
    .style("margin-bottom", "1rem");

// svg g frame
const svgStripes = containerStripes
    .append("svg")
    .attr("viewBox", `0 0 ${width + (margin.left + margin.right)} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// scales
// include a single scale for the change in color
// for the dimensions, all rectangle have the same height and width, relative to the height and width of the SVG element
const colorScale = d3
    .scaleLinear()
    // map the gap values from smallest-cold color to biggest-warm color
    .domain(d3.extent(dataStripes, (d) => d.gap))
    .range([colors[0], colors[1]]);


// add a defs block to the svg element, in which to define a linear gradient (later used for the rectangle making up the legend)
const svgDefs = svgStripes
    .append("defs");

// add linearGradient tags, creating a gradient through <stop> elements
const svgGradient = svgDefs
    .append("linearGradient")
    .attr("id", "gradient");

// append two stop elements detailing the two colors, at the beginning and end of the gradient
svgGradient
    .append("stop")
    .attr("stop-color", colors[0])
    .attr("offset", "0");

svgGradient
    .append("stop")
    .attr("stop-color", colors[1])
    .attr("offset", "1");


// include a rectangle for the legend, with a fill benefiting from the linear gradient
svgStripes
    .append("rect")
    // have the rectangle atop the stripe chart, horizontally centered and spanning a sizeable portion of the width
    .attr("x", width/10)
    .attr("width", width - width/5)
    // display the rectangle atop the group element (but still visible, as within the margin value)
    .attr("y", -35)
    .attr("height", 15)
    .attr("fill", "url(#gradient)");

// append two text elements describing the smallest and biggest gap values
// position them at either end of the rectangle
svgStripes
    .append("text")
    .attr("x", width/10 - 5)
    .attr("y", -35 + 7.5)
    .text(`${d3.min(dataStripes, (d) => d.gap)}°`)
    // align the text element relative to the rectangle to which they refer
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "end")
    .style("font-weight", "bold")
    // differentiate the fill color depending on the gap value
    .attr("fill", colorScale(d3.min(dataStripes, (d) => d.gap)));

// same reasoning for the second label, but included at the right end of the rectangle
svgStripes
    .append("text")
    .attr("x", width - width/10 + 5)
    .attr("y", -35 + 7.5)
    .text(`${d3.max(dataStripes, d => d.gap)}°`)
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "start")
    .style("font-weight", "bold")
    .attr("fill", colorScale(d3.max(dataStripes, d => d.gap)));

// include one rectangle for each data point, as wide as a portion of the total width and as tall as the total height
svgStripes
    .selectAll("rect.stripe")
    .data(dataStripes)
    .enter()
    .append("rect")
    .attr("class", "stripe")
    // on mouseover display the tooltip with paragraph elements describing the data point
    .on("mouseenter", (d) => {
        tooltip
            .append("p")
            .text("Year: ")
                // include the data point values in span, styled differently from the rest of the paragraph's text
                .append("span")
                .text(d.year)
                .style("font-weight", "bold")
                .style("color", (d.gap > 0) ? colors[1] : colors[0]);

        tooltip
            .append("p")
            .text("Deviation from average: ")
                .append("span")
                .text(d.gap)
                .style("font-weight", "bold")
                .style("color", (d.gap > 0) ? colors[1] : colors[0]);

        // select the tooltip **with** the paragraph elements included
        let boundingTooltip = d3
            .select("#tooltip")
            .node()
            .getBoundingClientRect();

        // position the tooltip atop the cursor and horizontally centered
        tooltip
            .style("opacity", 1)
            .style("top", `${d3.event.pageY - boundingTooltip.height}px`)
            .style("left", `${d3.event.pageX - boundingTooltip.width/2}px`)
            // include a border-top changing in color depending on the value of the rectangle element
            .style("border-top", (d.gap > 0) ? `5px solid ${colors[1]}` : `5px solid ${colors[0]}`);
    })
    // when exiting the rectangle element hide the tooltip and remove all paragraph elements
    .on("mouseout", () => {
        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
    })
    // let each rectangle element cover a portion of the total width
    .attr("x", (d, i) => width/dataStripes.length * i)
    .attr("width", width/dataStripes.length)
    // spread each rectangle to cover the totality of the container's height
    .attr("y", 0)
    .attr("height", height)
    // describe the fill color as mappedd through the color scale
    .attr("fill", (d) => colorScale(d.gap));




// BAR AND LINE CHART
/** logic (eerily similar to the logic used for the first visualization)
 * add data
 * include wrapping container
 * include introductory html elements
 * include svg
 * detail scales, axes (this times for the dimensions as well)
 * detail rectangle elements
 * detail line
 */

// data for the chart with horizontal bars, describing values north and south of the x-axis, and a line showing the increasing/ decreasing trend of the observations
/*
year, deviation from the average temperature, deviation from the decennal value
data sorted in objects structured as follows:
    {
        year: 1900,
        yearGap: -0.6,
        decadeGap: -0.35
    }
*/
const dataBars = [
    {
        year: 1905,
        yearGap: -0.6,
        decadeGap: -0.35
    },
    {
        year: 1906,
        yearGap: 0.0,
        decadeGap: -0.43
    },
    {
        year: 1907,
        yearGap: -0.4,
        decadeGap: -0.31
    },
    {
        year: 1908,
        yearGap: -0.4,
        decadeGap: -0.29
    },
    {
        year: 1909,
        yearGap: -1.0,
        decadeGap: -0.25
    },
    {
        year: 1910,
        yearGap: -0.4,
        decadeGap: -0.29
    },
    {
        year: 1911,
        yearGap: 0.5,
        decadeGap: -0.27
    },
    {
        year: 1912,
        yearGap: -0.4,
        decadeGap: -0.29
    },
    {
        year: 1913,
        yearGap: 0.1,
        decadeGap: -0.37
    },
    {
        year: 1914,
        yearGap: -0.3,
        decadeGap: -0.35
    },
    {
        year: 1915,
        yearGap: -0.4,
        decadeGap: -0.32
    },
    {
        year: 1916,
        yearGap: -0.2,
        decadeGap: -0.27
    },
    {
        year: 1917,
        yearGap: -1.2,
        decadeGap: -0.26
    },
    {
        year: 1918,
        yearGap: -0.2,
        decadeGap: -0.29
    },
    {
        year: 1919,
        yearGap: -0.7,
        decadeGap: -0.31
    },
    {
        year: 1920,
        yearGap: 0.1,
        decadeGap: -0.31
    },
    {
        year: 1921,
        yearGap: 0.6,
        decadeGap: -0.34
    },
    {
        year: 1922,
        yearGap: -0.7,
        decadeGap: -0.29
    },
    {
        year: 1923,
        yearGap: -0.1,
        decadeGap: -0.18
    },
    {
        year: 1924,
        yearGap: -0.3,
        decadeGap: -0.11
    },
    {
        year: 1925,
        yearGap: -0.6,
        decadeGap: -0.07
    },
    {
        year: 1926,
        yearGap: 0.3,
        decadeGap: -0.04
    },
    {
        year: 1927,
        yearGap: -0.1,
        decadeGap: -0.16
    },
    {
        year: 1928,
        yearGap: 0.5,
        decadeGap: -0.11
    },
    {
        year: 1929,
        yearGap: -0.2,
        decadeGap: -0.13
    },
    {
        year: 1930,
        yearGap: 0.4,
        decadeGap: -0.05
    },
    {
        year: 1931,
        yearGap: -0.6,
        decadeGap: 0.01
    },
    {
        year: 1932,
        yearGap: -0.2,
        decadeGap: -0.03
    },
    {
        year: 1933,
        yearGap: -0.2,
        decadeGap: 0.04
    },
    {
        year: 1934,
        yearGap: 0.4,
        decadeGap: -0.02
    },
    {
        year: 1935,
        yearGap: -0.1,
        decadeGap: -0.03
    },
    {
        year: 1936,
        yearGap: 0.0,
        decadeGap: -0.15
    },
    {
        year: 1937,
        yearGap: 0.5,
        decadeGap: -0.19
    },
    {
        year: 1938,
        yearGap: -0.1,
        decadeGap: -0.20
    },
    {
        year: 1939,
        yearGap: -0.3,
        decadeGap: -0.11
    },
    {
        year: 1940,
        yearGap: -0.9,
        decadeGap: -0.18
    },
    {
        year: 1941,
        yearGap: -0.9,
        decadeGap: -0.12
    },
    {
        year: 1942,
        yearGap: -0.4,
        decadeGap: -0.15
    },
    {
        year: 1943,
        yearGap: 0.7,
        decadeGap: -0.12
    },
    {
        year: 1944,
        yearGap: -0.4,
        decadeGap: -0.08
    },
    {
        year: 1945,
        yearGap: 0.6,
        decadeGap: 0.03
    },
    {
        year: 1946,
        yearGap: -0.3,
        decadeGap: 0.15
    },
    {
        year: 1947,
        yearGap: 0.8,
        decadeGap: 0.23
    },
    {
        year: 1948,
        yearGap: 0.3,
        decadeGap: 0.27
    },
    {
        year: 1949,
        yearGap: 0.8,
        decadeGap: 0.21
    },
    {
        year: 1950,
        yearGap: 0.2,
        decadeGap: 0.20
    },
    {
        year: 1951,
        yearGap: -0.1,
        decadeGap: 0.14
    },
    {
        year: 1952,
        yearGap: 0.1,
        decadeGap: 0.06
    },
    {
        year: 1953,
        yearGap: 0.0,
        decadeGap: -0.02
    },
    {
        year: 1954,
        yearGap: -0.5,
        decadeGap: -0.05
    },
    {
        year: 1955,
        yearGap: 0.0,
        decadeGap: -0.06
    },
    {
        year: 1956,
        yearGap: -1.2,
        decadeGap: -0.08
    },
    {
        year: 1957,
        yearGap: 0.0,
        decadeGap: 0.01
    },
    {
        year: 1958,
        yearGap: 0.0,
        decadeGap: -0.07
    },
    {
        year: 1959,
        yearGap: 0.8,
        decadeGap: -0.19
    },
    {
        year: 1960,
        yearGap: 0.0,
        decadeGap: -0.15
    },
    {
        year: 1961,
        yearGap: 0.8,
        decadeGap: -0.21
    },
    {
        year: 1962,
        yearGap: -0.8,
        decadeGap: -0.06
    },
    {
        year: 1963,
        yearGap: -1.1,
        decadeGap: -0.06
    },
    {
        year: 1964,
        yearGap: -0.1,
        decadeGap: -0.07
    },
    {
        year: 1965,
        yearGap: -0.5,
        decadeGap: -0.17
    },
    {
        year: 1966,
        yearGap: 0.2,
        decadeGap: -0.19
    },
    {
        year: 1967,
        yearGap: 0.1,
        decadeGap: -0.29
    },
    {
        year: 1968,
        yearGap: -0.2,
        decadeGap: -0.26
    },
    {
        year: 1969,
        yearGap: -0.2,
        decadeGap: -0.16
    },
    {
        year: 1970,
        yearGap: -0.1,
        decadeGap: -0.15
    },
    {
        year: 1971,
        yearGap: -0.2,
        decadeGap: -0.10
    },
    {
        year: 1972,
        yearGap: -0.4,
        decadeGap: -0.09
    },
    {
        year: 1973,
        yearGap: -0.2,
        decadeGap: -0.09
    },
    {
        year: 1974,
        yearGap: 0.1,
        decadeGap: -0.12
    },
    {
        year: 1975,
        yearGap: 0.0,
        decadeGap: -0.11
    },
    {
        year: 1976,
        yearGap: 0.3,
        decadeGap: -0.16
    },
    {
        year: 1977,
        yearGap: 0.1,
        decadeGap: -0.13
    },
    {
        year: 1978,
        yearGap: -0.4,
        decadeGap: 0.00
    },
    {
        year: 1979,
        yearGap: -0.2,
        decadeGap: 0.07
    },
    {
        year: 1980,
        yearGap: -0.6,
        decadeGap: 0.05
    },
    {
        year: 1981,
        yearGap: 0.1,
        decadeGap: 0.00
    },
    {
        year: 1982,
        yearGap: 0.8,
        decadeGap: -0.04
    },
    {
        year: 1983,
        yearGap: 0.6,
        decadeGap: -0.07
    },
    {
        year: 1984,
        yearGap: -0.2,
        decadeGap: 0.04
    },
    {
        year: 1985,
        yearGap: -0.5,
        decadeGap: 0.18
    },
    {
        year: 1986,
        yearGap: -0.2,
        decadeGap: 0.36
    },
    {
        year: 1987,
        yearGap: -0.1,
        decadeGap: 0.37
    },
    {
        year: 1988,
        yearGap: 0.7,
        decadeGap: 0.34
    },
    {
        year: 1989,
        yearGap: 1.1,
        decadeGap: 0.31
    },
    {
        year: 1990,
        yearGap: 1.2,
        decadeGap: 0.47
    },
    {
        year: 1991,
        yearGap: 0.2,
        decadeGap: 0.62
    },
    {
        year: 1992,
        yearGap: 0.5,
        decadeGap: 0.65
    },
    {
        year: 1993,
        yearGap: 0.2,
        decadeGap: 0.79
    },
    {
        year: 1994,
        yearGap: 1.5,
        decadeGap: 0.80
    },
    {
        year: 1995,
        yearGap: 1.0,
        decadeGap: 0.80
    },
    {
        year: 1996,
        yearGap: 0.1,
        decadeGap: 0.82
    },
    {
        year: 1997,
        yearGap: 1.3,
        decadeGap: 0.89
    },
    {
        year: 1998,
        yearGap: 0.7,
        decadeGap: 0.97
    },
    {
        year: 1999,
        yearGap: 1.2,
        decadeGap: 1.12
    },
    {
        year: 2000,
        yearGap: 1.3,
        decadeGap: 1.05
    },
    {
        year: 2001,
        yearGap: 1.0,
        decadeGap: 1.02
    },
    {
        year: 2002,
        yearGap: 1.3,
        decadeGap: 1.16
    },
    {
        year: 2003,
        yearGap: 1.7,
        decadeGap: 1.14
    },
    {
        year: 2004,
        yearGap: 0.8,
        decadeGap: 1.14
    },
    {
        year: 2005,
        yearGap: 0.8,
        decadeGap: 1.14
    },
    {
        year: 2006,
        yearGap: 1.4,
        decadeGap: 1.01
    },
    {
        year: 2007,
        yearGap: 1.1,
        decadeGap: 1.09
    },
    {
        year: 2008,
        yearGap: 0.8,
        decadeGap: 1.06
    },
    {
        year: 2009,
        yearGap: 1.2,
        decadeGap: 0.95
    },
    {
        year: 2010,
        yearGap: 0.1,
        decadeGap: 1.06
    },
    {
        year: 2011,
        yearGap: 1.8,
        decadeGap: 1.16
    }
];


// add a container for the visualization
const containerBars = container
    .append("div")
    .attr("class", "viz");

// hmtl elements
containerBars
    .append("h2")
    .attr("class", "title")
    .text("Bars and line");

containerBars
    .append("p")
    .attr("class", "description")
    .text("Above and below the x-axis, plotting data and trends.")
    .style("margin-bottom", "1rem");

// svg g frame
const svgBars = containerBars
    .append("svg")
    .attr("viewBox", `0 0 ${width + (margin.left + margin.right)} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// scales
// for the x axis, the bars use a portion of the total width
// the viz maps the data vertically, so the horizontal scale is not required

// for the y axis, the scale goes from the minimum to the maximum value, mapping them relative to the height
const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataBars, (d) => d.yearGap))
    .range([height, 0]);

// include an axis for the scale, while the horizontal mark is included horizontally on the 0 mark
const yAxis = d3
    .axisLeft(yScale)
    // reduce the number of ticks labels and remove ticks
    .tickSize(0)
    .ticks(5);

const groupAxis = svgBars
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis);

groupAxis
    .select("path")
    .attr("stroke", "#00000055");

groupAxis
    .selectAll("text")
    .attr("font-weight", "bold")
    .attr("font-size", "0.8rem")
    .attr("fill", "#000000aa");


// include a line for the horizontal axis
svgBars
    .append("line")
    .attr("x1", 0)
    .attr("x2", width)
    // plot the line exactly at the 0 mark
    .attr("y1", yScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", "#00000033");


// include a rectangle element for each data point, starting from the 0 mark and scaling upwards/downwards according to the year gap
// ! rectangle elements do not accept a negative value for the height attribute, so you need to adjust the y coordinate to show them atop/below the 0 mark
svgBars
    .selectAll("rect.bars")
    .data(dataBars)
    .enter()
    .append("rect")
    // on hover show the value of the rectangle element, similarly to the warming stripes
    .on("mouseenter", (d) => {
        tooltip
            .append("p")
            .text("Year: ")
                .append("span")
                .text(d.year)
                .style("font-weight", "bold")
                .style("color", (d.yearGap > 0) ? colors[1] : colors[0]);

        tooltip
            .append("p")
            .text("Deviation from average: ")
                .append("span")
                .text(d.yearGap)
                .style("font-weight", "bold")
                .style("color", (d.yearGap > 0) ? colors[1] : colors[0]);


        let boundingTooltip = d3
            .select("#tooltip")
            .node()
            .getBoundingClientRect();

        tooltip
            .style("opacity", 1)
            .style("top", `${d3.event.pageY - boundingTooltip.height}px`)
            .style("left", `${d3.event.pageX - boundingTooltip.width/2}px`)
            .style("border-top", (d.yearGap > 0) ? `5px solid ${colors[1]}` : `5px solid ${colors[0]}`);
    })
    // leaving the rectangle elements, hide the tooltip and remove all paragraph elements
    .on("mouseout", () => {
        tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
    })
    // have each rectangle cover a portion of the width
    .attr("x", (d, i) => width/dataBars.length * i)
    .attr("width", width/dataBars.length)
    // for the height, since each bar needs to start from the 0 bar, include y and height values depending on whether the value to-be-mapped is positive or negative
    // if the year value is less than or equal to zero, have the rectangle start from the 0 mark and go downward (by a value equal to the scaled data, to which the 0 mark is detracted)
    // if the year value is more than zero, have the rectangle start atop the 0 mark, by a measure equal to the mapped data, and have it reach the 0 mark
    .attr("y", (d) => (d.yearGap <= 0) ? yScale(0) : yScale(d.yearGap))
    .attr("height", (d) => (d.yearGap <= 0) ? yScale(d.yearGap) - yScale(0) : yScale(0) - yScale(d.yearGap))
    // detail the fill color dependant on the positive/negative value of the data
    .attr("fill", (d) => (d.yearGap > 0) ? colors[1] : colors[0]);


// include a line which describes the trend, based on the gap from the decade average
const line = d3
    .line()
    // the horizontal coordinate is based on the width of the svg
    .x((d, i) => width/dataBars.length*i)
    // the vertical coordinate is determined by the gap value for the decade
    .y((d) => yScale(d.decadeGap));

// include a path element to actually draw the line
svgBars
    .append("path")
    .attr("stroke", "#FFA800")
    .attr("stroke-width", "3px")
    // remove the fill
    .attr("fill", "none")
    // describe the line based on the data and the line function
    .attr("d", line(dataBars))
    // remove pointer events as to avoid overlaps with the rectangle elements
    .style("pointer-events", "none");
