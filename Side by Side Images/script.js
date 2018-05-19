// target the div nesting both images
const imgContainer = document.querySelector(".container");
// target the div nesting the filter version of the image (the one on top, which is transitioned as to show/hide the bottom image)
const imgFilter = document.querySelector(".img-filter");
// target the div used as controller
const imgController = document.querySelector(".img-controller");

// listen to a drag inside of the wrapping container, delegating an action if the target of said event is the controller
imgContainer.addEventListener("drag", checkForTarget);

function checkForTarget(e) {
    e.preventDefault();
    // if the target is the image controller, call a function to move the controller and show the appropriate image 
    if(e.target == imgController) {
        moveController(e.clientX);
    }
}

// create a function which accepts the horizontal coordinate set by the mouse pointer and alters the property of left for the controller and the property of width for the left image
// both left and width need a value in the range of [0-100%]
function moveController(clientX) {
    // retrieve the space from the edge of the page to the beginning of the container 
    let containerOffset = imgContainer.offsetLeft;
    // reduce the coordinate of the mouse pointer by the offset ()
    let xCoor = clientX - containerOffset;
    
    // retrieve the width of the container
    let containerWidth = imgContainer.clientWidth;
    // divide the computed horizontal coordinate by the width of the container 
    // retrieving a 0-100 value
    let xCoorNorm = Math.floor(xCoor/containerWidth*100);

    // between 0 and 100
    if(xCoorNorm > 0 && xCoorNorm < 100) {
        // alter the properties of left for the controller and width for the image including the percentage sign
        imgController.style.left = xCoorNorm + "%";
        imgFilter.style.width = xCoorNorm + "%";
    }
}
