// target all paths
const paths = document.querySelectorAll("path");

// loop through all path elements
paths.forEach(function(path) {
    // get the length of each individaul path
    const length = path.getTotalLength();

    // get the style properties of each individual path
    const pathStyle = getComputedStyle(path);

    // set the CSS variable of stroke length to the length of each path
    path.style.setProperty("--stroke-length", length);
});



// repeat the same script for polyline elements
const polyLines = document.querySelectorAll("polyline");
polyLines.forEach(function(polyline) {
    const length = polyline.getTotalLength();
    const polylineStyle = getComputedStyle(polyline);
    polyline.style.setProperty("--stroke-length", length);
});


