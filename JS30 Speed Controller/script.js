/* necessary elements
- video element (to change its speed rate)
- bar used to change the speed rate
- tip relating the speed rate through text

- svg and specifically the group elements making up the dashes and the blob
*/
const video = document.querySelector('video');
const speedBar = document.querySelector('.speed--bar');
const barTip = speedBar.querySelector('.bar--tip');
const svg = document.querySelector('.speed--buddy');
const buddyDashes = svg.querySelector('g#buddy-dashes');
const buddyBlob = svg.querySelector('g#buddy-blob');

// keep a boolean to change the speed rate when the cursor is down and moved within the boundaries of the bar
let isDown = false;

// create a utility function to round numbers to the second digit after the decimal point
const round = number => Math.round(number * 100) / 100;

// function called when the cursor moves on top of the speed bar
function handleMove(e) {
  // check if the cursor is down, and if so proceed to change the speed rate/ udpate the UI
  if (isDown) {
    /* necessary variables
    - the width of the bar
    - the distance from the left

    the ratio between the two gives a value in the [0,1] range
    */
    const { offsetWidth: width } = this;
    const { offsetX: x } = e;
    const progress = round(x / width);


    // progress is a value in the [0-1] range, however the speed rate and the values for the SVG transform properties are not
    // it is necessary to map the values

    // speed rate: [0.5,3.5] -> simply multiply by 3 and add 0.5
    const rate = round(progress * 3 + 0.5);
    // transform rate: [-1,1], but not with a linear function
    // [-1, 0] for the rate values in the [0.5, 1] -> multiply by 2, subtract 2
    // [0, 1] for the rate values in the [1, 3.5] range -> subtract 1, divvy up by 2.5
    const transform = rate < 1 ? round(rate * 2 - 2) : round((rate - 1) / 2.5);

    // update the UI using the [0,1] range, changing the custom property for the linear gradient and the position / text of the tip
    speedBar.style.setProperty('--progress', `${progress * 100}%`);
    // barTip.style.left = `${progress * 100}%`;
    barTip.textContent = `${Math.round(rate * 100) / 100}x`;

    // update the SVG using the [-1,1] range, increasing the values for the skew property
    buddyDashes.setAttribute('transform', `scale(${transform} 1)`);
    buddyBlob.setAttribute('transform', `skewX(${transform * -5})`);

    // update the rate using the [0.5-3] range
    video.playbackRate = rate;
  }
}

/* attach the necessary event listeners to the speed bar
when the cursor is down set the boolean to true
when the cursor is up or outside of the bar scope, set the boolean back to false
when the cursor moves within the speed bar, call the function to update the UI and most importantly change the speed rate
*/
speedBar.addEventListener('mousedown', () => { isDown = true; });
speedBar.addEventListener('mouseup', () => { isDown = false; });
speedBar.addEventListener('mouseout', () => { isDown = false; });
speedBar.addEventListener('mousemove', handleMove);
