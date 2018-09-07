// target the circle element responsible for the mask
const circleMask = document.querySelector("#mask circle");

// listen for a move event on the entire window, at which point call a function to change the position of the mask (as to match the movement of the cursor)
window.addEventListener("mousemove", updateCircleMask);

function updateCircleMask(e) {
  // retrieve the x and y coordinates of the mouse cursor
  let xCoor = e.x;
  let yCoor = e.y;

  // update the attributes of the circle responsible for the mask to match the cursor position
  circleMask.setAttribute("cx", xCoor);
  circleMask.setAttribute("cy", yCoor);
}
