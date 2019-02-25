// target the .blobs container
const blobs = document.querySelector('div.blobs');
// variable to keep track and clear the timeout introduced when clicking a blob
let timeoutID = 0;

// function called in response to a click event on the .blobs container
function handleClick(e) {
  // proceed only if the target of the click event is a button
  // the event listener is placed on the container to react also to buttons created **after** the page is loaded
  const { tagName } = e.target;
  if (tagName === 'BUTTON') {
    // retrieve the element
    const { target: blob1 } = e;
    // reduce the size of the blob, as if losing a part of it
    const scale = getComputedStyle(blob1).getPropertyValue('--scale');
    blob1.style.setProperty('--scale', `${parseFloat(scale) * 0.9}`);

    // create a copy (which retains the same scale)
    const blob2 = blob1.cloneNode(false);

    // push the elements in opposite directions, and relative to the window's size
    // consider the distance between the blob and the edges of the window
    const bound = blob1.getBoundingClientRect();
    // based on the smallest distance horizontally and vertically detail a distance sure to fall within the boundaries of the window
    const pushX = Math.random() * Math.min(bound.left, bound.right) * 0.5;
    const pushY = Math.random() * Math.min(bound.top, bound.bottom) * 0.5;

    // after a brief delay update the translate properties with the describe values
    timeoutID = setTimeout(() => {
      blob1.style.setProperty('--translateX', `calc(-50% - ${pushX}px)`);
      blob1.style.setProperty('--translateY', `calc(-50% + ${pushY}px)`);
      blob2.style.setProperty('--translateX', `calc(-50% + ${pushX}px)`);
      blob2.style.setProperty('--translateY', `calc(-50% - ${pushY}px)`);

      clearTimeout(timeoutID);
    }, 100);

    // apend the button to the .blobs container
    blobs.appendChild(blob2);
  }
}

// listen for a click event on the .blobs container, at which point call the handleClick function
blobs.addEventListener('click', handleClick);
