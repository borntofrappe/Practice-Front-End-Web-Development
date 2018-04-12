// target the semi-circle container to change its transform property
const semiCircleDiv = document.querySelector(".semi-circle");

// declare update function which defines the rotation assumed by the semi-circle div
function handleUpdate() {
  // this.value is a number between 0 and 180
  // you need to offset by the 90degrees which are already accumulated in the stylesheet
  let degrees = this.value - 90;
  semiCircleDiv.style.transform = "rotate(" + degrees + "deg)";
}

// target the input range and listen for two events on it: change and mousemove (the former is triggered only as the mouse clicks/leaves the input, the latter is triggered while the mouse is moved within the range)
const inputRange = document.querySelector("input");

// in response to the events, call the update function
inputRange.addEventListener("change", handleUpdate);
inputRange.addEventListener("mousemove", handleUpdate);