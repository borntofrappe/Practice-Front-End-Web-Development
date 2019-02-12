// target all images
const images = document.querySelectorAll('img');
// use a variable to keep track of the running timeout
let timeoutID = 0;
// use a variable to avoid running the function every time the window scroll
let isBouncing = false;


/** debounce function
 * arguments
 *  function to run
 *  timeframe in which the function may not be run twice
 */
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
  timeoutID = setTimeout(() => {
    isBouncing = false;
    clearTimeout(timeoutID);
  }, timeframe);
};


// function fired on scroll
function handleScroll() {
  // retrieve the distance from the top and the height of the window
  const { scrollY, innerHeight } = window;
  // compute the distance from the top of the page to the bottom of the screen
  const fromTopToFold = scrollY + innerHeight;

  // loop through the images
  images.forEach((image) => {
    // retrieve the distance from the top of the page as well as the height of the image
    const { offsetTop, offsetHeight } = image;

    // if the image falls within the viewpoint, add a class of shown, else remove it
    /* consider the following frame of reference
      ----top----
      |
      |  scroll  <-- scrollY
      |
      ---image--- <-- offsetTop
      ---image--- <-- offsetTop + offsetHeight
      |
      |
      ---fold---- <-- innerHeight
      |
      |
      |
      ---image--- <-- offsetTop
      ---image--- <-- offsetTop + offsetHeight
    */
    // subtract fromTopToFold by half the height to make the image slide in **before** reaching the actual height of the image
    if (offsetTop <= fromTopToFold - offsetHeight / 2 && offsetTop + offsetHeight >= scrollY) {
      image.classList.add('shown');
    } else {
      image.classList.remove('shown');
    }
  });
}

// on scroll call the debounce function which fires the handleScroll function ever so often
window.addEventListener('scroll', () => debounce(handleScroll, 200));
// immediately call the function to show the images already in scope
handleScroll();
