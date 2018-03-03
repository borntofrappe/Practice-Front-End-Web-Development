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


// target all images and the text to be transitioned
const images = document.querySelectorAll(".image-default");
const text = document.querySelector(".text-default");

// define a function to respond to the scroll event
/*
- as the page reaches distance of the elements from the top
- add a class of .image-scroll and .text-scroll respectively

*/
function checkForScroll(event) {
  // get distance from the top of the page to the bottom of the visible area
  var distanceFromBottomToTop = window.scrollY + window.innerHeight;

  // for each image
  images.forEach(function(image) {
    // get the simple image, compute its distance from the top of the page
    var distanceFromImageToTop = image.offsetTop;
    // if the distance computed prior to this value surpasses the vertical position of the image
    if(distanceFromBottomToTop > distanceFromImageToTop) {
      // add class of image-scroll, transitioning the image
      image.classList.add("image-scroll");
    }
  });
  /*
  // alternatively an arrow function can be used; but since I'm not used to ES6, I'll stick to what I undestand better, at least for now
  images.forEach(image => {
    image.classList.add("image-scroll");
  });
  */

  // for the single text div, compute its distance from the top
  var distanceFromTextToTop = text.offsetTop;
  // if the distance from the top of the page reaches this value
  if(distanceFromBottomToTop > distanceFromTextToTop) {
    // add class of text-scroll, transitioning the div
    text.classList.add("text-scroll");
  }

}

// listen to the scroll event and call the  the debounce function passing as argument the declared function
window.addEventListener("scroll", debounce(checkForScroll));
