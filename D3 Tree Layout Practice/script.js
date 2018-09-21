/** script logic
 * add data
 * format data through the .tree() layout function
 * add svg g containers
 * add elements according to the updated data
 */

// DATA
const data = {
  "name": "Roadmap",
  "children": [
    {
      "name": "FreeCodeCamp",
      "children": [
        {
          "name": "MongoDB and Mongoose",
          "category": "FreeCodeCamp"
        },
        {
          "name": "APIs and Microservices Projects",
          "category": "FreeCodeCamp"
        },
        {
          "name": "Podcast Player Design",
          "category": "FreeCodeCamp"
        }
      ]
    },
    {
      "name": "D3.js",
      "children": [
        {
          "name": "Density & Violin Plot",
          "category": "D3.js"
        },
        {
          "name": "Geomap Layouts",
          "category": "D3.js"
        },
        {
          "name": "Sunburst Diagram",
          "category": "D3.js"
        },
        {
          "name": "Stream Graph",
          "category": "D3.js"
        }
      ]
    },
    {
      "name": "React.js",
      "children": [
        {
          "name": "React Router",
          "category": "React.js"
        },
        {
          "name": "React Animation",
          "category": "React.js"
        },
        {
          "name": "Redux",
          "category": "React.js"
        },
        {
          "name": "React Docs",
          "category": "React.js"
        }
      ]
    },
    {
      "name": "Others",
      "children": [
        {
          "name": "SVG Flowchart",
          "category": "Others"
        },
        {
          "name": "SVG Icon Design",
          "category": "Others"
        },
        {
          "name": "So Good They Can't Ignore You",
          "category": "Others"
        }
      ]
    }
  ]
};

// console.log(data);


// TREE LAYOUT
// ! it is first necessary to include a root element
// hierarchy adds, among other values, `depth` and `height` properties
const hierarchy = d3.hierarchy(data);
// console.log(hierarchy);

// ! it is then necessary to compute the value of the individual nodes
// in this instance, the parent nodes need to simply acknowledge how many children elements are present
// use node.count() instead of node.sum(), as follows
// this adds a `value` property, describing the number of nested nodes through an integer
hierarchy.count();
// console.log(hierarchy);


// include the .tree() layout function
const tree = d3.tree();
// applied to the modified root node, this adds `x` and `y` properties describing the coordinates of each node
const treeData = tree(hierarchy);
// console.log(treeData);



// SVG G elements
const margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
}

// as the goals are laid left to right, stretch the visualization wider than taller
const width = 1000 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


const svgContainer = d3
  .select(".container")
  .append("svg")
  .attr("viewBox", `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


/* from the updated root element
- .descendants() returns a flat array describing all nodes
- .links() returns an array of objects detailing the connection between nodes (with `source` and `target` properties detailing the starting/ending coordinates)
*/
console.log(hierarchy.descendants());
// console.log(hierarchy.links());

// include one path element for each link, describing a two-step line from target to source
svgContainer
  .selectAll("path.link")
  .data(hierarchy.links())
  .enter()
  .append("path")
  .attr("class", "link")
  .attr("fill", "none")
  .attr("stroke", "#5979FF")
  .attr("stroke-width", "2px")
  // through the d attribute describe a line starting from source, moving upwards/downward to match the target's vertical position and then moving east toward the target's horizontal position
  .attr("d", (d) => {
    // mutiply by the width/height values as the coordinate describe a decimal number in the [0-1] range
    // ! invert the x and y coordinate to simply draw the lines from left to right (instead of the default from top to bottom)
    let sourceX = d.source.y * width;
    let sourceY = d.source.x * height;
    let targetX = d.target.y * width;
    let targetY = d.target.x * height;

    return `M ${sourceX} ${sourceY} V ${targetY} H ${targetX}`;
  });

// include a text element for each descendant
svgContainer
  .selectAll("text.goal")
  .data(hierarchy.descendants())
  .enter()
  .append("text")
  .attr("class", "goal")
  .attr("fill", "#5979FF")
  .attr("stroke", "none")
  .style("font-weight", "bold")
  // include a font size depending on the height value of each node (0 for the outermost leaf, incremented for each level)
  .style("font-size", (d) => `${1 + d.height * 0.5}rem`)
  // position the text elements where the path elements begin
  .attr("x", (d) => d.y * width)
  .attr("y", (d) => d.x * height)
  // specify the position of the text to be to the left and to the top of the path they represent
  // ! for the root node, position this to the center right of where its path element begins
  .attr("text-anchor", (d) => (d.depth === 0) ? "start" : "end")
  .attr("alignment-baseline", (d) => (d.depth === 0) ? "middle" : "auto")
  .attr("dx", (d) => (d.depth === 0) ? "5px" : "-5px")
  .attr("dy", (d) => (d.depth === 0) ? "0" : "-5px")
  .text((d) => d.data.name);