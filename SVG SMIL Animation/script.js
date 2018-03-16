/*
target svg elements on which to listen for the click event
*/
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

/*
target animate tags in order to trigger their animation
*/
const leftArrowCircleAnimate = document.querySelectorAll(".left-arrow__circle--animate");
const rightArrowCircleAnimate = document.querySelectorAll(".right-arrow__circle--animate");

const leftArrowRectangleAnimate = document.querySelector(".placeholder__rectangle--animate--left");
const rightArrowRectangleAnimate = document.querySelector(".placeholder__rectangle--animate--right");

/*
listen for a click event on each element, at which point trigger the animation, on the prescribed animation tags
*/
leftArrow.addEventListener("click", function() {
  // loop through all selectors of the same class
  leftArrowCircleAnimate.forEach(function(animateAttribute) {
    animateAttribute.beginElement();
  });
  leftArrowRectangleAnimate.beginElement();
});

rightArrow.addEventListener("click", function() {
  // loop through all selectors of the same class
  rightArrowCircleAnimate.forEach(function(animateAttribute) {
    animateAttribute.beginElement();
  });
  rightArrowRectangleAnimate.beginElement();
});
