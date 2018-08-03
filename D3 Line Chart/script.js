// select the node in which to include the data visualization
const containerData = d3.select("div.data");

// define values which distance the data visualization from the wrapping <svg> element
const margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
};

// define the width and height value deducting the respective margin values
// this allows to later use the values for the data visualization as a whole, safely inside of the wrapping g element
// without needing further adjustment with margin/ padding
const w = 900 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

// append an <svg> element with a viewBox attribute described by the width and height values
// these augmented by the margin values as to have the SVg encompass exactly the measures defined by the absolute units (900 and 750) 
const svg = containerData
              .append("svg")
              .attr("viewBox", `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`);

// inside of the <svg> element include a <g> element, in which the data visualization will be included 
// translate <g> to have the grouping element nestled inside of the SVG
// this structure allows some space in which the data visualization can be depicted without fear of cropping
// moreover, it allows to use the width and height values as is
const svgCanvas = svg
                  .append("g")
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);
