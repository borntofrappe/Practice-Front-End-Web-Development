/** script logic
 * include data
 * select container
 * add HTML elements
 * add svg g elements
 * format data through the treemap() layout function
 * define a color scale
 * append G element for each data point
 * include rectangle and text elements for all group elements
 */

// DATA
const data = {
  "name": "100DaysOfCode",
  "children": [
    {
      "name": "Front End",
      "children": [
        {
          "name": "React",
          "category": "Front End",
          "value": "17"
        },
        {
          "name": "D3.js",
          "category": "Front End",
          "value": "25"
        },
        {
          "name": "JS",
          "category": "Front End",
          "value": "5"
        },
        {
          "name": "CSS",
          "category": "Front End",
          "value": "23"
        },
        {
          "name": "SVG",
          "category": "Front End",
          "value": "11"
        }
      ]
    },
    {
      "name": "Back End",
      "value": "2"
    },
    {
      "name": "FCC",
      "value": "3"
    }
  ]
};


// target the single div container
const container = d3
  .select(".container");

// introductory HTML elements
container
  .append("h1")
  .attr("class", "title")
  .text("100 Days of Code 🔥");

container
  .append("p")
  .attr("class", "description")
  .style("margin", "0.5rem 0 1rem")
  .text("Highlighting the progress so far");

// add a tooltip
const tooltip = container
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", "none");



// SVG G ELEMENTS
const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 20
}

const width = 800 - (margin.left + margin.right),
  height = 350 - (margin.top + margin.bottom);


const svgContainer = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// TREEMAP LAYOUT
// include a root node based on the hierarchical data
const hierarchy = d3
  .hierarchy(data);

// compute the relative importance of each node according to the value of the nested elements
hierarchy.sum((d) => d.value);

// define an instance of the treemap function
const treemap = d3.treemap();

// format the data to draw rectangle elements accordingly, through the layout function
const treemapData = treemap(hierarchy);

// include in an array the nested data points, to draw a rectangle for each
let projects = [];
for(let i = 0; i < treemapData.children.length; i++) {
  if(Array.isArray(treemapData.children[i].children)) {
    for(let j = 0; j < treemapData.children[i].children.length; j++) {
      projects.push(treemapData.children[i].children[j]);
    }
  }
  else {
    projects.push(treemapData.children[i]);
  }
}

// include a color scale
const colorScale = d3
  .scaleOrdinal(d3.schemeSet2);



// G ELEMENT
// include a group element for the elements required by each data point (a rectangle and text element for each)
const groupingElement = svgContainer
  .selectAll("g")
  .data(projects)
  .enter()
  .append("g")
  // on hover display information related to each data point (the hover event occurs whenever hovering on the rectangle/text elements, and it bubbles up to the grouping element)
  .on("mouseenter", (d, i) => {
    tooltip
      .append("p")
      .text(() => {
        if(d.data.name === "FCC") {
          return `${d.data.value} ${d.data.name} Certifications`;
        }
        else {
          return `${d.data.value} ${d.data.name} Projects`;
        }
      })
      .style("border-bottom", () => `4px solid ${colorScale(i)}`);

    // retrieve the dimension of the tooltip (once it includes the paragraph element)
    let tooltipBox = tooltip.node().getBoundingClientRect();

    // position the tooltip atop and centered with respect to the cursor
    tooltip
      .style("opacity", 1)
      .style("top", `${d3.event.pageY - tooltipBox.height*1.25}px`)
      .style("left", `${d3.event.pageX - tooltipBox.width/2}px`);
  })
  // exiting the elements, hide the tooltip back and remove paragraph elements (as to avoid appending one paragraph after the other)
  .on("mouseout", () => {
    tooltip
      .style("opacity", 0)
        .selectAll("p")
        .remove();
  });

// for each data point
// add a rectangle element, accoding to the x and y coordinate dictated by the treemap function
groupingElement
  .append("rect")
  .attr("x", (d) => d.x0 * width)
  .attr("y", (d) => d.y0 * height)
  .attr("width", (d) => (d.x1 - d.x0) * width)
  .attr("height", (d) => (d.y1 - d.y0) * height)
  .attr("fill", (d, i) => colorScale(i));

// add a text element, below the rectangle elements and each at a fraction of the width
groupingElement
  .append("text")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("x", (d, i) => (width / (projects.length + 1)) * (i + 1))
  .attr("y", height + margin.bottom/2)
  .attr("fill", (d, i) => colorScale(i))
  .style("font-weight", "bold")
  .style("font-size", "1.1rem")
  .style("text-shadow", "1px 1px #00000077")
  .text((d) => d.data.name);