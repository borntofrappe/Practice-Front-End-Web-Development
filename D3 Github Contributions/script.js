/** SCRIPT STRUCTURE
 * select container
 * include a text element with a random month of the year
 * include a container for the grid of cells
 * include a tooltip
 * include one div element for each day of the month
 */


// SELECT 
const container = d3.select("div.container");

// RANDOM MONTH
// parse integers to date object, format the date object to include the full name of each month
const parseMonths = d3.timeParse("%m");
const formatMonths = d3.timeFormat("%B");
let months = [];
for(let i = 1; i <= 12; i++) {
  i = (i < 10) ? `0${i}` : i.toString();
  months.push(formatMonths(parseMonths(i)));
}
// generate a random index for the array of 12 elements
let randomIndex = Math.floor(Math.random()*months.length);
// retrieve a random month, and its first three letters
let randomMonth = months[randomIndex].substring(0,3);

// include a paragraph with the random month
container
  .append("p")
  .attr("class", "container__p")
  .text(randomMonth);

// GRID CONTAINER
// include a container for the grid
const containerGrid = container
                        .append("div")
                        .attr("class", "container__grid");

// include an integer for the days of the month, randomly picked between 31,30,28
let dayOfMonths = (Math.random() < 1/ 3) ? 31 : (Math.random() < 2/ 3) ? 30 : 28;

// TOOLTIP
// include one div for the tooltip
const tooltip = container
                .append("div")
                .attr("id", "tooltip");

// GRID CELLS
// create an array with as many integers as there are days in the month
// include in the array a random number between 0 and 19
let contributions = [];
for(let i = 1; i <= dayOfMonths; i++) {
  contributions.push(Math.floor(Math.random() * 20));
}

// append one div element for each array item
// change the color to show greater integers with greater saturation and less luminosity
// on hover show the tooltip with the text displaying the array items
containerGrid
  .selectAll("div")
  .data(contributions)
  .enter()
  .append("div")
  .style("background", (d) => `hsl(132, ${50 + d}%, ${90 - d*2}%)`)
  .on("mouseenter", (d, i) => {
    tooltip
      .style("opacity", 1)
      .style("left", `${d3.event.x + 15}px`)
      .style("top", `${d3.event.y - 15}px`)
      .text(() => `${d} Contributions ${randomMonth} ${i+1}`);
      console.log(d3.event);
  })
  .on("mouseout", () => {
    tooltip
      .style("opacity", 0);
  });