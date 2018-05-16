/* target all the paths element in the SVG
for the animation only 4 path elements are needed, one for each element
unfortunately, there are 5 path elements in the definition of the different SVG
to fix this nuisace, it is possible to remove the desired element with the splice() method 
*/
const svgPaths = document.querySelectorAll("path");

// create an array in which to include the length of the different path elements
let svgPathsLength = [];

// for each SVG path element
svgPaths.forEach(svgPath => {
    // push in the array the length of each path element (5 values)
    const length = Math.ceil(svgPath.getTotalLength());
    svgPathsLength.push(length);
});

// remove the fourth value, which describes the length of the lines inside the message icon
svgPathsLength.splice(3,1);

// target all four div containing the SVG elements
const svgIcons = document.querySelectorAll(".container .svg-icon");

// loop through the array storing the length of the different 4 strokes
for(let i = 0; i < svgPathsLength.length; i ++) {
    // update the property relating to stroke-dasharray and stroke-dashoffset according to the length of the path elements
    // each SVG icon has then the value required to animate the respective stroke
    svgIcons[i].style.setProperty("--stroke-length", svgPathsLength[i]);
}
