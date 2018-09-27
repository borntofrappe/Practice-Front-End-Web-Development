/** script logic
 * include the elements which do not rely actual data (as the data will be included through a call to an external source)
 * fetch data in a JSON format
 * include one pie chart for each level of nested values
 */

// SELECT
const container = d3
  .select('.container');

// COLORS for the pie chart s
const colorScale = d3
  .scaleOrdinal(d3.schemePastel1);

// URL referencing the source material
const URL = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json';

// HTML introductory elements
// ! remember to include an anchor link element with the source URL, _after_ the visualization (below the SVG)
container
  .append('h1')
  .attr("class", "title")
  .text("Sunburst");

container
  .append('p')
  .attr("class", "description")
  .text("Highest grossing video games, according to platform.");

// TOOLTIP displaying the highlighted path on hover
const tooltip = container
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

// SVG G elements
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);


const svgContainer = container
  .append("svg")
  .attr("viewBox", `0 0 ${width +(margin.left + margin.right)} ${height +(margin.top + margin.bottom)}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// through the FETCH API retrieve the data from the selected URL
// call a function which plots the data according to the JSON file retrieved from the call
fetch(URL)
  .then((data) => data.json())
  .then((json) => plotSunburst(json));


function plotSunburst(data) {
  // console.log(data);

  // create a root node through the `hierarchy()` function
  const hierarchy = d3.hierarchy(data);
  // this function adds, among many useful properties, `depth` and `height` values
  // console.log(hierarchy);

  // compute a value for each node, based on the value of the nested items, through the `sum()` function
  hierarchy.sum((d) => d.value);
  // this adds a `value` property for all nodes
  // console.log(hierarchy);



  /* include pie charts elements with the following logic
  one pie chart for each `depth`
  each pie chart divided in slices according to the values it represents
  each pie chart starting from where the previous ends and occupying a fraction of the available space (for the first node nesting all elements either skip it or leave it with a transparent fill, to have the visualization resemble more a doughnut than a pie chart)

  // REFRESHER
  d3.pie() takes as input an array of data and returns the data alongside useful properties for a arc constructor:
  1. startAngle
  1. endAngle

  d3.arc() takes as input an argument with startAngle and endAngle values to return instead the SVG syntax used by path elements to actually draw the slices
  the function is joined by two additional method to specify the inner and outer radius of the slice (determining the size of the pie or doughnut)
  1. .innerRadius()
  1. .outerRadius()

  */

  // find each node through the `descendants()` function, available on the hierarchy
  const descendants = hierarchy.descendants();
  // console.log(descendants);

  // loop through the descendants and separate them on the basis of their depth (one pie chart per depth level)
  let pies = [],
    counter = 0;

  // ! if the object does not already contain a property for the level of depth add one
  // otherwise simply push the values to the existing fields
  for(let i=0; i < descendants.length; i++) {
    // for each depth value add an object to the array, nesting itself two arrays for the name and value of the nodes
    if(descendants[i].depth === counter) {
      pies.push({
        name: [descendants[i].data.name],
        value: [descendants[i].value]
      });
      counter++;
    }
    else {
      pies[descendants[i].depth].name.push(descendants[i].data.name);
      pies[descendants[i].depth].value.push(descendants[i].value);
    }
  }
  // pies is now an array of as many objects as there are depth level
  // for each depth level it contains two fields, with array for the names and respective values of the nodes
  // console.log(pies);

  // define the function which creates the pie chart
  const pie = d3
    .pie()
    // sort null to avoid the default sorting behavior (which would inevitably mess up the order of the elements)
    .sort(null);

  // for each object use the defined d3.pie() function to plot a pie chart, on the basis of the `value` field all objects share
  // use y instead of i to avoid confusion with the index used in the D3 callback functions
  for(let y = 0; y < pies.length; y++) {
    // define the arc generator
    let arc = d3
      .arc()
      // each pie chart begins from where the previous one leaves off
      .innerRadius((y) * (width/2) / (pies.length))
      // each pie chart takes a fraction of the total width (which is half the width, as the arc radius is half the diameter)
      .outerRadius((y+1) * (width/2) / (pies.length));


    // add a container for each pie chart
    let pieContainer = svgContainer
      .append("g")
      // white stroke to emulate uniform space among the slices
      .attr("stroke", "#fff")
      .attr("stroke-width", "1px");

    // for each data point in each object add a group element, which is centered and nests the path elements making up the slices
    let groupContainer = pieContainer
      .selectAll("g")
      // format the data through the pie function, referencing the values array
      .data(pie(pies[y].value))
      .enter()
      .append("g")
      // by default have the slices slightly transparent
      .style("opacity", 0.5)
      // the fill is (temporarily) determined by the index representing each slice, through the color scale
      .attr("fill", (d, i) => (y===0) ? "transparent" : colorScale(i))
      // show the tooltip on hover, detailing the value and name of the hovered element
      .on("mouseenter", function(d, i) {
        d3
          .select(this)
          .transition()
          .style("opacity", 1);
        // console.log(d, i);
        tooltip
          .append("p")
          .text(pies[y].name[i]);
        tooltip
          .append("p")
          .text(`Sales: ${pies[y].value[i].toFixed(2)}`);

        tooltip
          .style("opacity", 1)
          .style("top", `${d3.event.pageY}px`)
          .style("left", `${d3.event.pageX}px`);
      })
      // when leaving the slice, remove all paragraph elements
      .on("mouseout", function()  {
        d3
          .select(this)
          .transition()
          .style("opacity", 0.5);
        tooltip
          .style("opacity", 0)
          .selectAll("p")
          .remove();
      })
      .attr("transform", `translate(${width/2}, ${height/2})`);

    groupContainer
      // include the path elements through the arc constructor
      .append("path")
      .attr("d", arc);
  }

}

// include an anchor link element referencing the URL at the bottom of the container
container
  .append('a')
  .attr("class", "source")
  .attr("href", URL)
  .text("Source");