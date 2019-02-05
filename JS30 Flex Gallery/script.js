// target all panel elements
const panels = document.querySelectorAll('.panel');

// detail the maximum rotation assumed by the cards
const maxRotation = 45;
// retrieve the number of panels
// the idea is to use the index of each panel vis-a-vis this integer to rotate the cards in an arc
const { length } = panels;


// when clicking on a panel, loop through the list of elements
function handleClick() {
  panels.forEach((panel) => {
    // add the prescribed class increasing the flex-grow value (among many other values)
    // ! only to the selected item and only if the selected item doesn't already have the prescribed class
    if (panel === this && !panel.classList.contains('hover')) {
      panel.classList.add('hover');
    } else {
      panel.classList.remove('hover');
    }
  });
}


// loop through the list
// attach the click event listener on each panel and rotate each item based on its index
panels.forEach((panel, index) => {
  panel.addEventListener('click', handleClick);

  // consider the distance between the index and the center of the list
  // this value starts out negative (-3, -2) and proceeds positive
  const fromHalf = index - (length - 1) / 2;
  // give the consideration of the halfway point, be sure to double the total rotation, or to halve the length integer
  // this because fromHalf will be at most equal to half the length of the list
  panel.style.transform = `rotate(${maxRotation * 2 / length * fromHalf}deg)`;
  // give a higher z-index value to those elements more distant from the center
  panel.style.zIndex = Math.abs(fromHalf);
});
