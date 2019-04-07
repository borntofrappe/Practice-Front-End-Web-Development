/* data regarding the images
beside the url referencing the image, detail
- type
- name

type used to animate the larger overlay when the type becomes different (for instance from tea to coffee)
*/
const images = [
  {
    src: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'tea',
    name: 'pepper'
  },
  {
    src: 'https://images.pexels.com/photos/428615/teacup-cup-of-tea-tee-drink-428615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'tea',
    name: 'mint'
  },
  {
    src: 'https://images.pexels.com/photos/900103/pexels-photo-900103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'tea',
    name: 'green'
  },
  {
    src: 'https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'coffee',
    name: 'milk'
  },
  {
    src: 'https://images.pexels.com/photos/6067/coffee-flower-reading-magazine.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'coffee',
    name: 'black'
  },
  {
    src: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'juice',
    name: 'orange'
  },
  {
    src: 'https://images.pexels.com/photos/161600/smoothie-fruit-beverage-drink-161600.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'juice',
    name: 'strawberry'
  },
  {
    src: 'https://images.pexels.com/photos/1869802/pexels-photo-1869802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'juice',
    name: 'kiwi'
  },
  {
    src: 'https://images.pexels.com/photos/1902322/pexels-photo-1902322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    type: 'juice',
    name: 'apple'
  }
];

// silly list of adjectives to style up the name of the drinks
const adjectives = [
  "feisty",
  "plain",
  "exquisite",
  "calming",
  "fancy",
  "glamorous",
  "sparkling",
  "mysterious",
];

// elements necessary for the slider

// elements being modified
const image = document.querySelector('img');
const item = document.querySelector('.item');
const itemType = item.querySelector('.type');
const itemName = item.querySelector('.name');
const itemDescription = item.querySelector('.description');
// buttons allowing to change the slide
const buttons = document.querySelectorAll('button');


// index to update the slide with the respective image
let index = 0;
// isTransitioning to avoid firing the transition before it has a chance to finish
let isTransitioning = false;
// identifiers for the interval and timeout, determining the interplay between clicking the controls' buttons and letting the page update the slide
let intervalID = 0;
let timeoutID = 0;

// function called in response to the changeItem() function, to show the image at the precise position of the array
function showItem(number) {
  // set isTransitioning to true to prevent a click event from running the function again before the animation is completed
  isTransitioning = true;

  // retrieve the existing type to animate the larger overlay if the new type is different
  const previousType = itemType.textContent.toLowerCase();
  // retrieve the necessary values from the array's object
  const { src, type, name } = images[number];
  // retrieve a random adjective
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // dictate the overlay on the basis of the type (larger overlay if the previous and current type don't match)
  const overlay = previousType === type ? document.querySelector('.overlay--s') : document.querySelector('.overlay--l');
  // animate the overlay to stretch to scaleX 1 and back to 0
  overlay.style.animation = 'overlay 1s 2 ease-in-out alternate';
  // after the animation is complete, remove it to have a chance to play the animation once again
  overlay.addEventListener('animationend', () => {
    overlay.style.animation = 'none';
    // update isTransitioning to have the button potentially restart the whole process
    isTransitioning = false;
  });

  // target the headings and paragraphs
  const itemChildren = item.children;
  // animate them to scroll out and back into view
  [...itemChildren].forEach((child, index) => {
    child.style.animation = `rollIn 0.9s ${index * 0.2}s 2 alternate-reverse ease-out both`;
    // remove the animation once it is complete
    child.addEventListener('animationend', () => child.style.animation = 'none');
  })

  // set a timeout to update the image whilst the overlay is imposed atop it and update the text elements while they are transitioned out of sight
  const timeoutAnimation = setTimeout(() => {
    // update the desired information
    image.src = src;
    // ! specify the alt attribute to match the name
    image.setAttribute('alt', `${adjective} ${name}`);
    itemType.textContent = type;
    itemName.textContent = `${adjective} ${name}`;
    clearTimeout(timeoutAnimation);
  }, 900);
}

// function called in response to either a click event on the button or the interval
function changeItem(direction = 'next') {
  // update the index on the basis of the direction and the boundaries of the images array
  if (direction === 'prev') {
    index = index > 0 ? index - 1 : (images.length - 1);
  }
  if (direction === 'next') {
    index = index < (images.length - 1) ? index + 1 : 0;
  }
  // call the function to show the desired image
  showItem(index);
}

// listen for a click event on every control button
buttons.forEach(button => button.addEventListener('click', () => {
  // pre-emptively terminate the function if the slider is still transitioning
  if (isTransitioning) {
    return false;
  }
  // clear the interval to have the user in control of the sliding animation
  clearInterval(intervalID);
  // set up a timeout to re-start the interval after a while
  timeoutID = setTimeout(() => {
    runInterval();
    clearTimeout(timeoutID);
  }, 5000);

  // retrieve the data-action attribute
  const action = button.getAttribute('data-action');
  // call the function updating the index based on the input direction
  changeItem(action);
}));

// function running the interval allowing to change the item every so often
function runInterval() {
  // start the interval
  // ! update the identifier to have the button potentially clear the interval through the updated value
  intervalID = setInterval(() => {
    // call the changeItem() function to go to the next image
    changeItem();
  }, 5000);
}
// immediately call the function running the interval
runInterval();