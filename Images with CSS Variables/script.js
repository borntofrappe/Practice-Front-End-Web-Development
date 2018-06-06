// target the input and the root element
const input = document.querySelector("input[type='range']");
const root = document.querySelector(":root");
 
// listen to a change and mousemove event 
// technically change occurs only when the cursor of the input[type="range"] is left, but mousemouve allows to check also when the cursor hovers on the input 
// this is acceptable as the value of the input is altered only as the cursor is actually moves
input.addEventListener("change", filterImage);
input.addEventListener("mousemove", filterImage);

function filterImage(e) {
    // for the opacity, the range of possible values fits with the 0-100 interval allowed byt the input
    let opacity = e.target.value/100;
    root.style.setProperty("--filter-opacity", opacity);

    // for the coordinate of the "darkness filter" , the following values are set to be described for the input[type="range"]
    // x coordinate: 0 50% 70%
    // y coordinate: 0% 33%
    // after picking the values, it's a metter of converting the 0-100 values allowed by the input 

    let xCoor = e.target.value;
    if(xCoor > 70) {
        xCoor = 70;
    }
    let yCoor = e.target.value/3;

    root.style.setProperty("--light-xcoor", `${xCoor}%`);
    root.style.setProperty("--light-ycoor", `${yCoor}%`);
}


