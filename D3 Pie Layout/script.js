// TABLE AND RANDOM DATA

// select the table element 
const table = d3.select("table.container__data");

// create a set of data, with a random data value ranging between 5 and 25
const data = [];
for(let i = 0; i <= 10; i++) {
  let value = Math.floor(Math.random()*26);
  if(value < 5) {
    i--;
  }
  else {
    data.push(value);
  }
}

// loop through the data array and add a tr element for each item
// add a td element detailing the key and value for each row
for(let i = 0; i < data.length; i++) {
  let row = table
    .append("tr");

  row
    .append("td")
    .text(i);

  row
    .append("td")
    .text(data[i]);
}



// PIE CHART

// define the size of the SVG (which is re-established with CSS properties)
const w = 300, h = 300;

// define the SVG container in which to include the pie chart
const svgPie = d3
  .select(".container .container__viz .viz--pie")
  .append("svg") 
  .attr("viewBox", `0 0 ${w} ${h}`);

// establish the data required for the pie chart, with the d3.pie function
// input: data
// output: data primed to include arc elements, designing a pie chart
const pie = d3
  .pie(data)
  // avoid the default sorting of the data points
  .sort(null);

// define an arc element, used to create the slices of the pie chart
// this arc element takes advantage of the d3.arc() function, and the functions describing the innerRadius and outerRadius variables (these describe the radius at the beginning and end of the slice respectively) 

// compute the outer radius as half the SVG with (thanks to this the diameter stretches exactly across the width)
const outerRadius = parseInt(w/2);
// include some non-zero inner radius, to have an empty area in the center of the pie
const innerRadius = 0;

let arc = d3
  .arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);


// append one group element for each data, passed in the pie() function which incldes the necessary values of startAngle and endAngle 
// position the group element in the center of the SVG
// g elements occupy no space, and by later including arc elements, these will start from the very center of the SVG
let arcs = svgPie
  .selectAll("g")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("transform", `translate(${outerRadius}, ${outerRadius})`);

// append a path element for each arc element
// path including the defined arc and for the respective data point
// with a varying color 
arcs
  .append("path")
  .attr("fill", (d, i) => `hsl(${100*i}, 45%, 50%)`)
  .attr("class", "slice")
  .attr("d", arc);

// again for each arc element, append a text, displaying the value of the slice
arcs
  .append("text")
  // center the label with the arc.centroid() function
  .attr("transform", (d) => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .attr("class", "label")
  // diplay the value, accessible in the object included thanks to the d3.pie() function
  // under d.value 
  .text((d) => d.value);



// BAR CHART

// include an SVG element using the same sizes of the pie chart
const svgBar = d3
  .select(".container .container__viz .viz--bar")
  .append("svg") 
  .attr("viewBox", `0 0 ${w} ${h}`);

// include one rectangle for each data point
let rect = svgBar
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => w/data.length * i)
  .attr("y", (d) => h - d*10)
  .attr("width", w/data.length)
  .attr("height", (d) => d*10)
  .attr("fill", (d, i) => `hsl(${100*i}, 45%, 50%)`);

svgBar
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", (d, i) => w/data.length * i)
  .attr("y", (d) => h - 2)
  .text((d) => d);