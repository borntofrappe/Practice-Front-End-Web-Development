/*
code to be polished and explained on github repo
https://github.com/borntofrappe/Practice-Front-End-Web-Development
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

/*
consider the sections .hero and .dark-overlay
the former used to retrieve the vertical coordinates at which to start the effect
the latter to implement the effect as the scroll event occurs
*/
const heroSection = document.querySelector(".hero");
const darkOverlay = document.querySelector(".dark-overlay");

function checkForScroll() {
  // get distance from the top
  var distanceFromTheTop = window.scrollY;
  // get height of the hero section
  var heightOfHero = heroSection.offsetHeight;

  /*
  the transition is set to begin when the distanceFromTheTop is halfway through the hero section, halfway through its height (set overlay opacity 0)
  the same transition should be completed when the distanceFromTheTop is at the end of the hero section, when it reaches its total height (set overlay opacity to 1)
  */

  // in the range between beginning and end of the transition
  if(distanceFromTheTop > heightOfHero/2 && distanceFromTheTop < heightOfHero) {
    // store in a variable the difference between the distanceFromTheTop (which changes as the scroll occurs) and the heightOfHero (which does not change) divided by 2
    var range = distanceFromTheTop - heightOfHero / 2;
    // normalize the range to have a range that goes from 0 to 1 and can be used to alter the property of opacity
    var rangeNormalized = range/(heightOfHero/2)

    // set the opacity to the value in the range of 0 to 1
    darkOverlay.style.opacity = rangeNormalized;
  }
  /* if the scroll event occurs prior of where the transition should begin set overlay to original opacity  */
  if(distanceFromTheTop < heightOfHero/2) {
    darkOverlay.style.opacity = 0;
  }
}

// listen to the scroll event and call the  the debounce function passing as argument the declared function
window.addEventListener("scroll", debounce(checkForScroll));
