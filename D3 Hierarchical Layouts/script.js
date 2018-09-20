/** script logic
 * include data
 * format data through the pack function
 * include the data respective viz
 *
 * format the data through the partition function
 * include the data respective viz
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
          "value": "26"
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


// PACK LAYOUT
// include a root node based on the hierarchical data
const hierarchyPack = d3
.hierarchy(data);

// compute the relative importance of each node according to the value of the nested elements
hierarchyPack
.sum((d) => d.value);

// define an instance of the pack function
const pack = d3
.pack();

// format the data to draw rectangle elements accordingly, through the layout function
// ! this modifies the hierarchy, adding the properties through the layout function
const packData = pack(hierarchyPack);

/** the formatted data has now several properties, for each node; the most pertinent properties for the project at hand are
* r, for the radius of the circle (going from 0 to 1 for the outermost node)
* x and y, for the coordinate of hopefully the center of the circle
* it is possible to therefore leverage these properties, for each subsection, to draw nested circle elements
*
*/
// test the formatted data
// console.log(packData);



/** VIZ
* select container
* introduce introductory elements
* introduce svg & g frame elements
* introduce one circle element for each children
_no tooltip this time around, as this project simply sets out to test the layout function of d3.pack()_
*/

// HTML ELEMENTS
const containerPack = d3
.select(".container")
.append("div")
.attr("class", "visualization");

containerPack
.append("h1")
.attr("class", "title")
.text("Circular Packing");

containerPack
.append("p")
.attr("class", "description")
.style("margin", "0.5rem 0 1rem")
.style("text-transform", "uppercase")
.style("letter-spacing", "0.1rem")
.text("Enclosure diagrams");

// color scale
const colorScale = d3
.scaleOrdinal(d3.schemePaired);

// SVG G FRAME
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


const svgPack = containerPack
  .append("svg")
  .attr("viewBox", `0 0 ${width +(margin.left + margin.right)} ${height +(margin.top + margin.bottom)}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// append one group element for each node (to later add one circle and one text element per group)
// to retrieve all of them, use the descendants() function
// ! the depth property describes the level of each node (starting from 0 for the outermost element, incrementing the value for each nested structure)
// console.log(packData.descendants());
const groupPack = svgPack
  .selectAll("g")
  .data(packData.descendants())
  .enter()
  .append("g")
  /* center the group element according to the x and y coordinate of each circle
  this means the circle elements are already positioned, and require exclusively the radius attribute
  this also and already centers the text elements */
  .attr("transform", (d) => `translate(${(d.x) * width}, ${(d.y) * height})`)
  // on hover rescale the circle and text element of the group
  .on("mouseenter", function(d, i) {
      d3.select(this)
        .select("circle")
        .transition()
        .style("transform", "scale(1.05)");

      d3.select(this)
        .select("text")
        .transition()
        .style("font-size", "1rem");
  })
  // when leaving the group, rescale the elements to their default size
  .on("mouseout", function() {
      d3.select(this)
        .select("circle")
        .transition()
        .style("transform", "scale(1)");

      d3.select(this)
        .select("text")
        .transition()
        .style("font-size", "0.7rem");
  });

// for each group, add a circle
groupPack
  .append("circle")
  .attr("r", (d) => (d.r) * width)
  // use the color scale in relation to the depth of each value
  .attr("fill", (d) => colorScale(d.depth))
  .attr("stroke", "#00000011")
  .attr("stroke-width", "2px");

// for each group, add a text element
groupPack
  .append("text")
  .attr("fill", "#333")
  .style("text-shadow", "0 1px 1px #ffffffaa, 0 -1px 1px #ffffffaa")
  .style("font-size", "0.7rem")
  .style("font-weight", "bold")
  // if the data point has children, push the text elements to the top right of the circle element (otherwise leave the text centered)
  .attr("transform", (d) => {
      if(d.children) {
          return `rotate(-45) translate(${(d.r) * width}, 0) rotate(45)`;
      }
  })
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .style("pointer-events", "none")
  .text((d) => d.data.name);



// PARTITION LAYOUT
// ! create a new hierarchy on which to add values required by the partition layout
const hierarchyPartition = d3
.hierarchy(data);

hierarchyPartition
.sum((d) => d.value);

// with the already developed hierarchy (and the already implemented .sum() function)
// add a .partition() layout function
const partition = d3
  .partition();

const partitionData = partition(hierarchyPartition);
console.log(partitionData);

/** the formatted data has now several properties
* x0 and y0, for where the partition begins
* x1 and y1, for where it ends
*/


/** VIZ
* select container
* introduce introductory elements
* introduce svg & g frame elements
* introduce one circle element for each children
_no tooltip this time around, as this project simply sets out to test the layout function of d3.pack()_
*/



// HTML ELEMENTS
const containerPartition = d3
.select(".container")
.append("div")
.attr("class", "visualization");

containerPartition
.append("h1")
.attr("class", "title")
.text("Partition");

containerPartition
.append("p")
.attr("class", "description")
.style("margin", "0.5rem 0 1rem")
.style("text-transform", "uppercase")
.style("letter-spacing", "0.1rem")
.text("Adjacent diagrams");


// SVG G FRAME
const svgPartition = containerPartition
.append("svg")
.attr("viewBox", `0 0 ${width +(margin.left + margin.right)} ${height +(margin.top + margin.bottom)}`)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


// add a group element per descendant
const groupPartition = svgPartition
  .selectAll("g")
  .data(partitionData.descendants())
  .enter()
  .append("g")
  // on hover scale the text of the hovered group element
  .on("mouseenter", function(d, i) {
    d3.select(this)
      .select("text")
      .transition()
      .style("font-size", "1.1rem");
  })
  .on("mouseout", function() {
    d3.select(this)
      .select("text")
      .transition()
      .style("font-size", "0.9rem");
  });


// for each group, add a rectangle
groupPartition
  .append("rect")
  // detail the rectangle elements according to the partition properties
  .attr("x", (d) => d.x0 * width)
  .attr("y", (d) => d.y0 * height)
  .attr("width", (d) => (d.x1 - d.x0) * width)
  .attr("height", (d) => (d.y1 - d.y0) * height)
  // detail the fill color according to the depth value
  .attr("fill", (d) => colorScale(d.depth))
  // stroke to highlight the different rectangle elements
  .attr("stroke", "#00000044")
  .attr("stroke-width", "1px");

// for each group, add a text
groupPartition
  .append("text")
  // position the text in the top left of each rectangle
  .attr("x", (d) => d.x0 * width)
  .attr("y", (d) => d.y0 * height)
  .attr("fill", "#333")
  .style("text-shadow", "0 1px 1px #ffffffaa, 0 -1px 1px #ffffffaa")
  .style("font-size", "0.9rem")
  .style("font-weight", "bold")
  // detail the text vertically
  .style("writing-mode", "vertical-rl")
  // translate each text element to have it centered in the rectangle element
  .attr("transform", (d) => `translate(${(d.x1 - d.x0) * width / 2} ${(d.y1 - d.y0) * height / 2})`)
  .attr("text-anchor", "middle")
  .style("pointer-events", "none")
  .text((d) => d.data.name);