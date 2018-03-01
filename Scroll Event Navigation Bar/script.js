/*
the debounce function accepts up to three arguments
two of them have default values, used in the invoking function doesn't specify otherwise
  - func, the function to run ever so often
  - wait, how long the debounce function should wait before running the inner function again
  - immediate, to alter if the function needs to skip the wait time and run immediately
*/
function debounce(func, wait = 15, immediate = true) {
  // define a timeout variable
  var timeout;

  // return a function
  return function() {
    // function which stores in a variable the context of the function itself and the arguments it passes
    var context = this, args = arguments;
    // create a variable which stores a function
    var later = function() {
      // function which runs the function passed as parameter
      // if the argument immediate is passed as false
      timeout = null;
      if(!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    // or if the callNow variable is true (meaning: immediate is true and timeout is null (in other words, the time-out is not ongoing))
    if(callNow) {
      func.apply(context, args);
    }
  };
};


// define a function to respond to the scroll event
function checkForScroll(event) {
  // consider the navigation bar
  const navigationBar = document.querySelector(".navigation-bar");
  // store in a variable the distance from the top
  var distanceFromTheTop = window.scrollY;
  // if the distance is greater than a defined amount, add class
  if(distanceFromTheTop > 250) {
    navigationBar.classList.add("navigation-bar-toggle");
  }
  // otherwise remove the same class
  else {
    navigationBar.classList.remove("navigation-bar-toggle");
  }
}

// call the debounce function passing as argument the scrolling function, as a response to the scroll event
window.addEventListener("scroll", debounce(checkForScroll));
