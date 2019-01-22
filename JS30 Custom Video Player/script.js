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

/* additional elements for the controls of the video
- button toggling the video
- button stopping the video and setting it back to 0
- input of type range to change the position of the video
- div used to alter the volume (replicating the logic used for the speed controller)
*/
const buttonToggle = document.querySelector('button#toggle');
const buttonStop = document.querySelector('button#stop');
const inputPosition = document.querySelector('input#position');
const volumeBar = document.querySelector('div#volume');

// keep a boolean to change the speed rate when the cursor is down and moved within the boundaries of the bar
let isSpeed = false;
// keep a boolean to change the volume, much alike the speed rate
let isVolume = false;


// create a utility function to round numbers to the second digit after the decimal point
const round = number => Math.round(number * 100) / 100;


// function called when clicking the toggle button (to play/pause the video)
function handleToggle(e) {
  // resume/pause the video depending on whether it is paused or not
  // update the UI using the reference to the play/pause icon
  if (video.paused) {
    video.play();
    buttonToggle.innerHTML = '<svg><use href="#pause-icon" /></svg>';
  } else {
    video.pause();
    buttonToggle.innerHTML = '<svg><use href="#play-icon" /></svg>';
  }
}
// when the video ends update the UI back to the play icon
video.addEventListener('ended', () => { buttonToggle.innerHTML = '<svg><use href="#play-icon" /></svg>'; });


// function called when clicking the stop button (to bring the video back to 0)
function handleStop(e) {
  video.pause();
  video.currentTime = 0;
  // update the play icon to match
  buttonToggle.innerHTML = '<svg><use href="#play-icon" /></svg>';
}

// // function called when using the input of type range
// function handleInput(e) {
//   const { value } = this;

// }
/* the input of type range needs to be updated according to the current time (beside itself changing the current time)
luckily (and I wished I knew sooner), the **timeupdate** event is fired at regular intervals to relate the currentTime

function called when the timeupdate event needs changing the position of the thumb in the input of type range
*/
function handleUpdate(e) {
  const { duration, currentTime } = video;
  // progress is a value in the [0-1] range
  // change the value of the input of type range (with a value in the [0-100] range)
  const progress = round(currentTime / duration);
  inputPosition.value = (progress * 100);
}

// function called when the value of the input of type range changes through the input event
function handleInput(e) {
  const { value } = this;
  // change the current time to match the percent value
  const { duration } = video;
  const currentTime = duration * (value / 100);
  video.currentTime = currentTime;
}


// function called when the cursor moves on top of the volume bar
// using the same logic detailed below for the speed bar
function handleVolume(e) {
  if (isVolume) {
    const { offsetWidth: width } = this;
    const { offsetX: x } = e;
    const progress = round(x / width);

    // volume for the video ought to be in the [0-1] range
    // in the custom property changing the color of the volume bar in the [0-100] range
    video.volume = progress;
    volumeBar.style.setProperty('--volume', `${progress * 100}%`);
  }
}

// attach the necessary event listeners on the button elements
buttonStop.addEventListener('click', handleStop);
buttonToggle.addEventListener('click', handleToggle);

// listen for the timeupdate event on the video, as to update the input of type range
video.addEventListener('timeupdate', handleUpdate);
// listen for the input event on the input of type range
inputPosition.addEventListener('input', handleInput);
// mirroring the speed barTip, attach the appropriate event listeners on the volume bar
volumeBar.addEventListener('mousedown', () => { isVolume = true; });
volumeBar.addEventListener('mouseup', () => { isVolume = false; });
volumeBar.addEventListener('mouseout', () => { isVolume = false; });
volumeBar.addEventListener('mousemove', handleVolume);


// function called when the cursor moves on top of the speed bar
function handleSpeed(e) {
  // check if the cursor is down, and if so proceed to change the speed rate/ udpate the UI
  if (isSpeed) {
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
    speedBar.style.setProperty('--speed', `${progress * 100}%`);
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
speedBar.addEventListener('mousedown', () => { isSpeed = true; });
speedBar.addEventListener('mouseup', () => { isSpeed = false; });
speedBar.addEventListener('mouseout', () => { isSpeed = false; });
speedBar.addEventListener('mousemove', handleSpeed);
