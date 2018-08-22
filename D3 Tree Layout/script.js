// include the data considered for the tree layout
const json = {
  "name": "Pen Settings",
  "children": [
    {
      "name": "HTML",
      "children": [
        {
          "name": "HAML"
        },
        {
          "name": "Markdown"
        },
        {
          "name": "Slim"
        },
        {
          "name": "Pug"
        }
      ]
    },
    {
      "name": "CSS",
      "children": [
        {
          "name": "LESS"
        },
        {
          "name": "SCSS"
        },
        {
          "name": "Sass"
        },
        {
          "name": "Stylus"
        },
        {
          "name": "Post CSS"
        }
      ]
    },
    {
      "name": "JavaScript",
      "children": [
        {
          "name": "Babel"
        },
        {
          "name": "TypeScript"
        },
        {
          "name": "CoffeeScript"
        },
        {
          "name": "LiveScript"
        }
      ]
    }
  ]
}

// target the single HTML node and render some introductory elements
const container = d3.select(".container");

container
  .append("h1")
  .attr("id", "title")
  .text("tree layout");


// include an SVG element, to display the data visualization
// adopt the margin and group element convention
const margin = {
  top: 40,
  right: 20,
  bottom: 40,
  left: 20
};
const width = 850 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const svgCanvas = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// include the data required for the layout, based on the JSON object and the d3.tree() function
const tree = d3
  .tree()
  .size([width, height]);
// to benefit from the function, it is necessary to pass as argument of the function a hierarchy
const hierarchy = d3.hierarchy(json);

// materialize the inner workings of the tree() function
// console.log(tree(hierarchy));

// d3.tree returns an object with many relevant attributes among which data, x and y coordinates
const nodes = tree(hierarchy);
console.log(nodes);
// to access these data points, it is possible to use the descendants() function, which return all nodes from the modified dataset
// console.log(nodes.descendants());
// the link elements are included for all but the first node, which is conveniently disregarded with the .slice() function
// console.log(nodes.descendants().slice(1));

// include a path for all except the first descendant to link the different nodes
// exept the first as the d attribute leverages the coordinate of the data point and its parent element 
const link = svgCanvas
  .selectAll("path.link")
  .data(nodes.descendants().slice(1))
  .enter()
  .append("path")
  .attr("class", "link")
  // the complex portion of the path element is the bezier-curve included for each data point
  // effectively beginning where the data point lies and ending where the parent lies, with the control points located near the points
  .attr("d", (d) => {
    return `
      M ${d.x} ${d.y}
      C 
      ${d.x} ${(d.y + d.parent.y) / 2}
      ${d.parent.x} ${(d.y + d.parent.y) / 2}
      ${d.parent.x} ${d.parent.y}
      `;
    });

// include a group for each data point, used later to include a circle and text element each
const node = svgCanvas
  .selectAll("g.node")
  // considering all nodes
  .data(nodes.descendants())
  .enter()
  .append("g")
  .attr("class", "node")
  // translate the group elements on the basis of the x and y coordinates of each data point
  .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

// include a circle for each data point
node.append("circle")
  .attr("r", 7);


// include a text for each data point
// depending on the height of the data point (2 for the parent, 1 for the nested, 0 for the innermost elements)
// specify a different change in horizontal and vertical position, a different scale and writing mode
// this to have the innermost element displayed vertically next to the circle elements
node.append("text")
  .style("text-anchor", "middle")
  .attr("dx", (d) => (d.height === 0) ? "1.5rem" : "0")
  .attr("dy", (d) => (d.height === 0) ? "-2rem" : "-1rem")
  .style("writing-mode", (d) => (d.height === 0) ? "vertical-rl" : "horizontal-tb")
  .attr("transform", (d, i) => (d.height === 0) ? `scale(0.8)` : "scale(1.1)")
  // include the text representative of each data point
  .text((d) => d.data.name);