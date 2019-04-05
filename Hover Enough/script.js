// target all button elements
const buttons = document.querySelectorAll('button');
// boolean to describe whether the button is hovered or not
let isHovered = false;

// when hovering
buttons.forEach(button => button.addEventListener('mouseenter', function () {
  // set isHovered to true
  isHovered = true;
  // after the number of seconds allowing for the default hover animation
  const timeoutID = setTimeout(() => {
    // if still hovered, add the prescribed class
    if (isHovered) {
      this.classList.add('hovered');
    }
    clearTimeout(timeoutID);
  }, 500);
}));

// when removing the cursor from the button
// similar logic, but mirrored to remove the hovered class
buttons.forEach(button => button.addEventListener('mouseout', function () {
  isHovered = false;
  const timeoutID = setTimeout(() => {
    if (!isHovered) {
      this.classList.remove('hovered');
    }
    clearTimeout(timeoutID);
  }, 350);
}));
