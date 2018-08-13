/** JAVASCRIPT LOGIC
 * include the data
 * format the data for the stack layout
 * select container 
 * include the SVG elements making up the frame and the nested canvas
 * include a simple legend
 * include the scales, with domain and range intervals
 * include the axes 
 * create a tooltip
 * include d3.stack to create the data necessary for the stack layout
 * include the rectangle elements for each data point, on the basis of the stack-ed data
 * go to line 826 as to skip the data 
 */

const data = [
  {
      "females": 370973, 
      "country": "France", 
      "age": 0, 
      "males": 390520, 
      "year": 2000, 
      "total": 761493
  }, 
  {
      "females": 362089, 
      "country": "France", 
      "age": 1, 
      "males": 380728, 
      "year": 2000, 
      "total": 742817
  }, 
  {
      "females": 355862, 
      "country": "France", 
      "age": 2, 
      "males": 373872, 
      "year": 2000, 
      "total": 729734
  }, 
  {
      "females": 352003, 
      "country": "France", 
      "age": 3, 
      "males": 369623, 
      "year": 2000, 
      "total": 721626
  }, 
  {
      "females": 350223, 
      "country": "France", 
      "age": 4, 
      "males": 367648, 
      "year": 2000, 
      "total": 717871
  }, 
  {
      "females": 350232, 
      "country": "France", 
      "age": 5, 
      "males": 367614, 
      "year": 2000, 
      "total": 717846
  }, 
  {
      "females": 351741, 
      "country": "France", 
      "age": 6, 
      "males": 369191, 
      "year": 2000, 
      "total": 720932
  }, 
  {
      "females": 354461, 
      "country": "France", 
      "age": 7, 
      "males": 372048, 
      "year": 2000, 
      "total": 726509
  }, 
  {
      "females": 358102, 
      "country": "France", 
      "age": 8, 
      "males": 375852, 
      "year": 2000, 
      "total": 733954
  }, 
  {
      "females": 362377, 
      "country": "France", 
      "age": 9, 
      "males": 380271, 
      "year": 2000, 
      "total": 742648
  }, 
  {
      "females": 367198, 
      "country": "France", 
      "age": 10, 
      "males": 385281, 
      "year": 2000, 
      "total": 752479
  }, 
  {
      "females": 372485, 
      "country": "France", 
      "age": 11, 
      "males": 390856, 
      "year": 2000, 
      "total": 763341
  }, 
  {
      "females": 376919, 
      "country": "France", 
      "age": 12, 
      "males": 395132, 
      "year": 2000, 
      "total": 772051
  }, 
  {
      "females": 379805, 
      "country": "France", 
      "age": 13, 
      "males": 397165, 
      "year": 2000, 
      "total": 776970
  }, 
  {
      "females": 381465, 
      "country": "France", 
      "age": 14, 
      "males": 397543, 
      "year": 2000, 
      "total": 779008
  }, 
  {
      "females": 383646, 
      "country": "France", 
      "age": 15, 
      "males": 398479, 
      "year": 2000, 
      "total": 782125
  }, 
  {
      "females": 386861, 
      "country": "France", 
      "age": 16, 
      "males": 400352, 
      "year": 2000, 
      "total": 787213
  }, 
  {
      "females": 386806, 
      "country": "France", 
      "age": 17, 
      "males": 399288, 
      "year": 2000, 
      "total": 786094
  }, 
  {
      "females": 381787, 
      "country": "France", 
      "age": 18, 
      "males": 393848, 
      "year": 2000, 
      "total": 775635
  }, 
  {
      "females": 374130, 
      "country": "France", 
      "age": 19, 
      "males": 386131, 
      "year": 2000, 
      "total": 760261
  }, 
  {
      "females": 367021, 
      "country": "France", 
      "age": 20, 
      "males": 378850, 
      "year": 2000, 
      "total": 745871
  }, 
  {
      "females": 358818, 
      "country": "France", 
      "age": 21, 
      "males": 370478, 
      "year": 2000, 
      "total": 729296
  }, 
  {
      "females": 357211, 
      "country": "France", 
      "age": 22, 
      "males": 368515, 
      "year": 2000, 
      "total": 725726
  }, 
  {
      "females": 366023, 
      "country": "France", 
      "age": 23, 
      "males": 376654, 
      "year": 2000, 
      "total": 742677
  }, 
  {
      "females": 381315, 
      "country": "France", 
      "age": 24, 
      "males": 391064, 
      "year": 2000, 
      "total": 772379
  }, 
  {
      "females": 395606, 
      "country": "France", 
      "age": 25, 
      "males": 404523, 
      "year": 2000, 
      "total": 800129
  }, 
  {
      "females": 410740, 
      "country": "France", 
      "age": 26, 
      "males": 418846, 
      "year": 2000, 
      "total": 829586
  }, 
  {
      "females": 421811, 
      "country": "France", 
      "age": 27, 
      "males": 429059, 
      "year": 2000, 
      "total": 850870
  }, 
  {
      "females": 425736, 
      "country": "France", 
      "age": 28, 
      "males": 432075, 
      "year": 2000, 
      "total": 857811
  }, 
  {
      "females": 425052, 
      "country": "France", 
      "age": 29, 
      "males": 430464, 
      "year": 2000, 
      "total": 855516
  }, 
  {
      "females": 425244, 
      "country": "France", 
      "age": 30, 
      "males": 429683, 
      "year": 2000, 
      "total": 854927
  }, 
  {
      "females": 425043, 
      "country": "France", 
      "age": 31, 
      "males": 428391, 
      "year": 2000, 
      "total": 853434
  }, 
  {
      "females": 425784, 
      "country": "France", 
      "age": 32, 
      "males": 428339, 
      "year": 2000, 
      "total": 854123
  }, 
  {
      "females": 428627, 
      "country": "France", 
      "age": 33, 
      "males": 430862, 
      "year": 2000, 
      "total": 859489
  }, 
  {
      "females": 432560, 
      "country": "France", 
      "age": 34, 
      "males": 434728, 
      "year": 2000, 
      "total": 867288
  }, 
  {
      "females": 435620, 
      "country": "France", 
      "age": 35, 
      "males": 437711, 
      "year": 2000, 
      "total": 873331
  }, 
  {
      "females": 438451, 
      "country": "France", 
      "age": 36, 
      "males": 440668, 
      "year": 2000, 
      "total": 879119
  }, 
  {
      "females": 439581, 
      "country": "France", 
      "age": 37, 
      "males": 441159, 
      "year": 2000, 
      "total": 880740
  }, 
  {
      "females": 438160, 
      "country": "France", 
      "age": 38, 
      "males": 437875, 
      "year": 2000, 
      "total": 876035
  }, 
  {
      "females": 435103, 
      "country": "France", 
      "age": 39, 
      "males": 432263, 
      "year": 2000, 
      "total": 867366
  }, 
  {
      "females": 432095, 
      "country": "France", 
      "age": 40, 
      "males": 426952, 
      "year": 2000, 
      "total": 859047
  }, 
  {
      "females": 428705, 
      "country": "France", 
      "age": 41, 
      "males": 421266, 
      "year": 2000, 
      "total": 849971
  }, 
  {
      "females": 426221, 
      "country": "France", 
      "age": 42, 
      "males": 417348, 
      "year": 2000, 
      "total": 843569
  }, 
  {
      "females": 425430, 
      "country": "France", 
      "age": 43, 
      "males": 416480, 
      "year": 2000, 
      "total": 841910
  }, 
  {
      "females": 425676, 
      "country": "France", 
      "age": 44, 
      "males": 417599, 
      "year": 2000, 
      "total": 843275
  }, 
  {
      "females": 424467, 
      "country": "France", 
      "age": 45, 
      "males": 417245, 
      "year": 2000, 
      "total": 841712
  }, 
  {
      "females": 421028, 
      "country": "France", 
      "age": 46, 
      "males": 414767, 
      "year": 2000, 
      "total": 835795
  }, 
  {
      "females": 420482, 
      "country": "France", 
      "age": 47, 
      "males": 415477, 
      "year": 2000, 
      "total": 835959
  }, 
  {
      "females": 424716, 
      "country": "France", 
      "age": 48, 
      "males": 421231, 
      "year": 2000, 
      "total": 845947
  }, 
  {
      "females": 430703, 
      "country": "France", 
      "age": 49, 
      "males": 428930, 
      "year": 2000, 
      "total": 859633
  }, 
  {
      "females": 435794, 
      "country": "France", 
      "age": 50, 
      "males": 435671, 
      "year": 2000, 
      "total": 871465
  }, 
  {
      "females": 443235, 
      "country": "France", 
      "age": 51, 
      "males": 444502, 
      "year": 2000, 
      "total": 887737
  }, 
  {
      "females": 436329, 
      "country": "France", 
      "age": 52, 
      "males": 439430, 
      "year": 2000, 
      "total": 875759
  }, 
  {
      "females": 407368, 
      "country": "France", 
      "age": 53, 
      "males": 412990, 
      "year": 2000, 
      "total": 820358
  }, 
  {
      "females": 365263, 
      "country": "France", 
      "age": 54, 
      "males": 373587, 
      "year": 2000, 
      "total": 738850
  }, 
  {
      "females": 325542, 
      "country": "France", 
      "age": 55, 
      "males": 336174, 
      "year": 2000, 
      "total": 661716
  }, 
  {
      "females": 283797, 
      "country": "France", 
      "age": 56, 
      "males": 296660, 
      "year": 2000, 
      "total": 580457
  }, 
  {
      "females": 255719, 
      "country": "France", 
      "age": 57, 
      "males": 268808, 
      "year": 2000, 
      "total": 524527
  }, 
  {
      "females": 250276, 
      "country": "France", 
      "age": 58, 
      "males": 260626, 
      "year": 2000, 
      "total": 510902
  }, 
  {
      "females": 259677, 
      "country": "France", 
      "age": 59, 
      "males": 265248, 
      "year": 2000, 
      "total": 524925
  }, 
  {
      "females": 266807, 
      "country": "France", 
      "age": 60, 
      "males": 267509, 
      "year": 2000, 
      "total": 534316
  }, 
  {
      "females": 274661, 
      "country": "France", 
      "age": 61, 
      "males": 270108, 
      "year": 2000, 
      "total": 544769
  }, 
  {
      "females": 281850, 
      "country": "France", 
      "age": 62, 
      "males": 271911, 
      "year": 2000, 
      "total": 553761
  }, 
  {
      "females": 285828, 
      "country": "France", 
      "age": 63, 
      "males": 270723, 
      "year": 2000, 
      "total": 556551
  }, 
  {
      "females": 287694, 
      "country": "France", 
      "age": 64, 
      "males": 267540, 
      "year": 2000, 
      "total": 555234
  }, 
  {
      "females": 291422, 
      "country": "France", 
      "age": 65, 
      "males": 265818, 
      "year": 2000, 
      "total": 557240
  }, 
  {
      "females": 296602, 
      "country": "France", 
      "age": 66, 
      "males": 265182, 
      "year": 2000, 
      "total": 561784
  }, 
  {
      "females": 298751, 
      "country": "France", 
      "age": 67, 
      "males": 261996, 
      "year": 2000, 
      "total": 560747
  }, 
  {
      "females": 296155, 
      "country": "France", 
      "age": 68, 
      "males": 254891, 
      "year": 2000, 
      "total": 551046
  }, 
  {
      "females": 290492, 
      "country": "France", 
      "age": 69, 
      "males": 245220, 
      "year": 2000, 
      "total": 535712
  }, 
  {
      "females": 283979, 
      "country": "France", 
      "age": 70, 
      "males": 235051, 
      "year": 2000, 
      "total": 519030
  }, 
  {
      "females": 274764, 
      "country": "France", 
      "age": 71, 
      "males": 223188, 
      "year": 2000, 
      "total": 497952
  }, 
  {
      "females": 269969, 
      "country": "France", 
      "age": 72, 
      "males": 213922, 
      "year": 2000, 
      "total": 483891
  }, 
  {
      "females": 272910, 
      "country": "France", 
      "age": 73, 
      "males": 209345, 
      "year": 2000, 
      "total": 482255
  }, 
  {
      "females": 279417, 
      "country": "France", 
      "age": 74, 
      "males": 206978, 
      "year": 2000, 
      "total": 486395
  }, 
  {
      "females": 284385, 
      "country": "France", 
      "age": 75, 
      "males": 203695, 
      "year": 2000, 
      "total": 488080
  }, 
  {
      "females": 291688, 
      "country": "France", 
      "age": 76, 
      "males": 201850, 
      "year": 2000, 
      "total": 493538
  }, 
  {
      "females": 283883, 
      "country": "France", 
      "age": 77, 
      "males": 191245, 
      "year": 2000, 
      "total": 475128
  }, 
  {
      "females": 252685, 
      "country": "France", 
      "age": 78, 
      "males": 167047, 
      "year": 2000, 
      "total": 419732
  }, 
  {
      "females": 207579, 
      "country": "France", 
      "age": 79, 
      "males": 134880, 
      "year": 2000, 
      "total": 342459
  }, 
  {
      "females": 164537, 
      "country": "France", 
      "age": 80, 
      "males": 104238, 
      "year": 2000, 
      "total": 268775
  }, 
  {
      "females": 118210, 
      "country": "France", 
      "age": 81, 
      "males": 72057, 
      "year": 2000, 
      "total": 190267
  }, 
  {
      "females": 88285, 
      "country": "France", 
      "age": 82, 
      "males": 49751, 
      "year": 2000, 
      "total": 138036
  }, 
  {
      "females": 85485, 
      "country": "France", 
      "age": 83, 
      "males": 43589, 
      "year": 2000, 
      "total": 129074
  }, 
  {
      "females": 99670, 
      "country": "France", 
      "age": 84, 
      "males": 47771, 
      "year": 2000, 
      "total": 147441
  }, 
  {
      "females": 110721, 
      "country": "France", 
      "age": 85, 
      "males": 50558, 
      "year": 2000, 
      "total": 161279
  }, 
  {
      "females": 123555, 
      "country": "France", 
      "age": 86, 
      "males": 54680, 
      "year": 2000, 
      "total": 178235
  }, 
  {
      "females": 127857, 
      "country": "France", 
      "age": 87, 
      "males": 55126, 
      "year": 2000, 
      "total": 182983
  }, 
  {
      "females": 116752, 
      "country": "France", 
      "age": 88, 
      "males": 48346, 
      "year": 2000, 
      "total": 165098
  }, 
  {
      "females": 96063, 
      "country": "France", 
      "age": 89, 
      "males": 37240, 
      "year": 2000, 
      "total": 133303
  }, 
  {
      "females": 78503, 
      "country": "France", 
      "age": 90, 
      "males": 28180, 
      "year": 2000, 
      "total": 106683
  }, 
  {
      "females": 61557, 
      "country": "France", 
      "age": 91, 
      "males": 19796, 
      "year": 2000, 
      "total": 81353
  }, 
  {
      "females": 47047, 
      "country": "France", 
      "age": 92, 
      "males": 13120, 
      "year": 2000, 
      "total": 60167
  }, 
  {
      "females": 37169, 
      "country": "France", 
      "age": 93, 
      "males": 9276, 
      "year": 2000, 
      "total": 46445
  }, 
  {
      "females": 30492, 
      "country": "France", 
      "age": 94, 
      "males": 7380, 
      "year": 2000, 
      "total": 37872
  }, 
  {
      "females": 23255, 
      "country": "France", 
      "age": 95, 
      "males": 5361, 
      "year": 2000, 
      "total": 28616
  }, 
  {
      "females": 16042, 
      "country": "France", 
      "age": 96, 
      "males": 3555, 
      "year": 2000, 
      "total": 19597
  }, 
  {
      "females": 10401, 
      "country": "France", 
      "age": 97, 
      "males": 2209, 
      "year": 2000, 
      "total": 12610
  }, 
  {
      "females": 6675, 
      "country": "France", 
      "age": 98, 
      "males": 1215, 
      "year": 2000, 
      "total": 7890
  }, 
  {
      "females": 4399, 
      "country": "France", 
      "age": 99, 
      "males": 535, 
      "year": 2000, 
      "total": 4934
  }, 
  {
      "females": 6109, 
      "country": "France", 
      "age": 100, 
      "males": 962, 
      "year": 2000, 
      "total": 7071
  }
];

// a stack layout requires an object for each data point
// this object includes the properties detailing the different stacks 
// format the data to have an array of objects, with males and females numbers

const dataset = data.map((d, i) => {
  return { males: d.males, females: d.females };
});

// log the dataset to assess the data structure
// console.log(dataset);

// select container in which to include the stack layout
const container = d3.select("div.container__visualization");

// define the margin which nest the visualization in the SVG contours
const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 70
}

// define the width and height values including the chosen margins
// this to later include w and h in the data visualization and have them reference to the nested area 
const w = 750 - margin.right - margin.left;
const h = 500 - margin.top - margin.bottom;

// append an `<svg>` element including the chosen margins
// this to have the svg spread across the extent of the hard coded values (750 and 500)
const svg = container
    .append("svg")
    .attr("viewBox", `0, 0, ${w + margin.right + margin.left}, ${h + margin.top + margin.bottom}`);

// append a `<g>` element, translated in the SVG by the chosen margins
// this to create the nested area inside of the SVG
// the data visualization, for instance the rectangle elements, will be appended to this area
const svgCanvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// include an object with the details included in the legend
const legend = {
    colors: ["#FF425A", "#ABE2E8"],
    label: ["Female", "Male"]
}

// as a simple legend, include one text element for each different sub-set
// position in the top right corner of the canvas
// the element is included at the very edge of the width and positioned as wanted through the text-anchor attribute
svgCanvas
    .selectAll("text")
    .data(legend.colors)
    .enter()
    .append("text")
    .text((d, i) => `${legend.label[i]} Population`)
    .attr("x", w)
    // position the strings on top of one another
    .attr("y", (d, i) => i*25)
    // include the respective colors
    .style("fill", (d, i) => legend.colors[i])
    .attr("text-anchor", "end");

// define the scales for the visualization
// for the horizontal scale, include a scaleBand, an ordinal scale which maps input values in a range given by the selected interval
const xScale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, w]);

// for the vertical scale, include a linear scale, mapping input values from the bottom of the SVG to the top
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d["total"])])
  .range([h, 0]);

// include axes on the basis of the defined scales
const xAxis = d3
  .axisBottom(xScale)
  // show only every fifth tick
  .tickValues(xScale.domain().filter((d) => d % 5 === 0))
  // remove the ticks at either end of the axis
  .tickSizeOuter(0);

const yAxis = d3 
  .axisLeft(yScale)
  .tickFormat(d3.format("~s"))
  .tickSizeOuter(0);
  
// append the axes with group elements
svgCanvas
  .append("g")
  .attr("transform", `translate(0, ${h})`)
  .call(xAxis);

svgCanvas
  .append("g")
  .call(yAxis);

// create a tooltip
const tooltip = container.append("div").attr("id", "tooltip");

// define the stack data based on the females and males keys
const stack = d3
  .stack()
  .keys(["females", "males"]);  

// include rectangle elements on the basis of the dataset
// as the stack dataset is divided in two arrays, include one group element for each and rectangle elements for both 
const males = svgCanvas
    .append("g");

males
    .selectAll("rect")
    // include the data relating to the males array
    // each data point has an array with two values: d[1] and d[0] (d[0] relates to the starting point, and for the males array this is the same value as the final point of the females array (for which it is 0))
    .data(stack(dataset)[1])
    .enter()
    .append("rect")
    // include event listeners to show/ hide the tooltip with the detailed information
    .on("mouseenter", (d) => {
        tooltip
          .style("opacity", 1)
          .style("left", `${d3.event.x}px`)
          .style("top", `${d3.event.y}px`)
          .text(() => `Male Population: ${d[1] - d[0]}`);
    })
    // include event listener to hide the tooltip when leaving the data point
    .on("mouseout", (d) => {
    tooltip
        .style("opacity", 0);
    })
    // include the rectangle elements one after the other
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d, i) => h)
    .style("fill", "white")
    // transition the width, height, y and fill properties
    .transition()
    .duration(1000)
    .delay((d, i) => i/stack(dataset)[0].length * 1000)
    .attr("width", xScale.bandwidth())
    .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]))
    .attr("y", (d, i) => yScale(d[1]))
    .style("fill", legend.colors[1]);

// replicate the structure for the females sub-array
const females = svgCanvas
    .append("g");
    
females
    .selectAll("rect")
    // include the data relating to the females array
    .data(stack(dataset)[0])
    .enter()
    .append("rect")
    .on("mouseenter", (d) => {
        tooltip
          .style("opacity", 1)
          .style("left", `${d3.event.x}px`)
          .style("top", `${d3.event.y}px`)
          .text(() => `Female Population: ${d[1] - d[0]}`);
    })
    .on("mouseout", (d) => {
    tooltip
        .style("opacity", 0);
    })
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d, i) => h)
    .style("fill", "white")
    .transition()
    .duration(1000)
    .delay((d, i) => i/stack(dataset)[0].length * 1000)
    .attr("width", xScale.bandwidth())
    .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]))
    .attr("y", (d, i) => yScale(d[1]))
    .style("fill", legend.colors[0]);