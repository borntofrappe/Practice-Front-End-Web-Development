const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const leftArrowCircleAnimate = document.querySelectorAll(".left-arrow__circle--animate");
const rightArrowCircleAnimate = document.querySelectorAll(".right-arrow__circle--animate");


const leftArrowRectangleAnimate = document.querySelector(".placeholder__rectangle--animate--left");
const rightArrowRectangleAnimate = document.querySelector(".placeholder__rectangle--animate--right");

leftArrow.addEventListener("click", function() {
  leftArrowCircleAnimate.forEach(function(animateAttribute) {
    animateAttribute.beginElement();
  });
  leftArrowRectangleAnimate.beginElement();
});

rightArrow.addEventListener("click", function() {
  rightArrowCircleAnimate.forEach(function(animateAttribute) {
    animateAttribute.beginElement();
  });
  rightArrowRectangleAnimate.beginElement();
});
