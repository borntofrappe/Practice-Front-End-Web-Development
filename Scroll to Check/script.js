// target the elements making up the check feature
// list items
const listItems = document.querySelectorAll('li');
// sections
const sections = document.querySelectorAll('section');

// debouncing function to avoid running the onScroll logic too frequently
let isBouncing = false;
const debounce = (func, timeframe) => {
  // if the boolean describing the bouncing is set to true return the function pre emptively
  if (isBouncing) {
    return;
  }
  // if you are here you're not bouncing
  // fire the function
  func();
  // set the boolean to true
  isBouncing = true;

  // after the arbitrary delay. switch the boolean back to false
  const timeoutID = setTimeout(() => {
    isBouncing = false;
    clearTimeout(timeoutID);
  }, timeframe);
};



// function called when scrolling
function handleScroll() {
  // retrieve the distance from the top
  const { scrollY: scroll } = window;

  // retrieve the number of sections the page has scrolled past
  const scrolledPast = [...sections].reduce((acc, curr) => {
    // increment the accumulator only if the section scrollY is less than the scroll on the page
    const { offsetTop: top } = curr;
    return scroll > top ? acc += 1 : acc;
  }, 0);

  // add a class of .check to however many items as there are sections scrolled past
  listItems.forEach((listItem, index) => index < scrolledPast ? listItem.classList.add('check') : listItem.classList.remove('check'));
}

// call the debounce function when registering a scroll event on the entire window
window.addEventListener('scroll', () => debounce(handleScroll, 200));