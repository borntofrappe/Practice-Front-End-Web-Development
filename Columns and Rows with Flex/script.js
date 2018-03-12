/*
Project discussed on github

*/

/*
debounce function to limit how often the code reacts to the scroll event
*/
function debounce(func, wait = 20, immediate = true) {

  var timeout;

  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) {
      func.apply(context, args);
    }
  };
};

// target the left-columns for all containers following the first one
const leftColumnContainerTwo = document.querySelector(".container-two .left-column");
const leftColumnContainerThree = document.querySelector(".container-three .left-column");
const leftColumnContainerFour = document.querySelector(".container-four .left-column");

// target all the right-columns
const rightColumnContainerOne = document.querySelector(".container .right-column");
const rightColumnContainerTwo = document.querySelector(".container-two .right-column");
const rightColumnContainerThree = document.querySelector(".container-three .right-column");
const rightColumnContainerFour = document.querySelector(".container-four .right-column");


function checkForScroll(event) {
  // get distance from the top of the page to the center of the visible area
  var distanceFromBottomToTop = window.scrollY + (window.innerHeight / 2);

  // get breakpoints consisting of the vertical distance from the top to the containers height
  var distanceFromLeftColumnContainerTwo = leftColumnContainerTwo.offsetTop,
      distanceFromLeftColumnContainerThree = leftColumnContainerThree.offsetTop,
      distanceFromLeftColumnContainerFour = leftColumnContainerFour.offsetTop;

  // alter the property of z-index when the ditance from the top surpasses the defined breakpoints
  if(distanceFromBottomToTop > distanceFromLeftColumnContainerFour) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "1";
  }
  else if(distanceFromBottomToTop > distanceFromLeftColumnContainerThree) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "1";
    rightColumnContainerFour.style.zIndex = "0";
  }
  else if(distanceFromBottomToTop > distanceFromLeftColumnContainerTwo) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "1";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "0";
  }
  else {
    rightColumnContainerOne.style.zIndex = "1";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "0";
  }
}

// listen to the scroll event and call the  the debounce function passing as argument the declared function
window.addEventListener("scroll", debounce(checkForScroll));
