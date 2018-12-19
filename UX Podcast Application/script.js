// target the elements used for the simple play/pause animation

// tooltip for the progress bar
const tooltip = document.querySelector('.app__tooltip');

// div for the vinyl
const vinyl = document.querySelector('.player__vinyl');

// button for the play/ pause animation & functionality
// including the nested audio element
const toggleButton = document.querySelector('.controls--toggle');
const audio = toggleButton.querySelector('audio');

// button to mute the audio
const muteButton = document.querySelector('.controls--mute');

// button to change the speed rate, alongside an array detailing possible values
const speedButton = document.querySelector('.controls--speed');
const speedOptions = [1, 1.5, 1.75, 2, 2.5, 3];

// button to stop the audio
const stopButton = document.querySelector('.controls--stop');

// div for the progress bar
const episodeProgress = document.querySelector('.episode--progress');
// span for the current time stamp
const timingCurrent = document.querySelector('.timing--current');

// variable(s) to keep track of the play/pause alternative, as well the mute/ un-muted pair and to adjust the progress bar according to the total length of the podcast
let isPlaying = false;
let isMute = false;
let intervalID = 0;
const episodeDuration = 4152;


/* function playing the audio, and achieving the following
- play the audio
- set up an intervl used to update the current time stamp and the progress bar
! audio.currentTime allows to retrieve the number of seconds since the beginning of the audio
*/

// when reaching the end of the audio, clear the interval
audio.addEventListener('ended', () => clearInterval(intervalID));
const playAudio = () => {
  audio.play();

  intervalID = setInterval(() => {
    const { currentTime } = audio;

    // use three variables for the hours/minutes/seconds, to extract the precise values from the current timestamp
    let currentSeconds = Math.floor(currentTime);
    let currentMinutes = Math.floor(currentSeconds / 60);
    const currentHours = Math.floor(currentMinutes / 60);
    // using the unmodified value for currentSeconds, update the appearance of teh application (the vinyl rotation and the progress bar)
    vinyl.style.transition = 'transform 1s linear';
    vinyl.style.transform = `rotate(${currentSeconds * 6}deg)`;
    episodeProgress.style.background = `linear-gradient(to right, #006400, #006400 ${currentSeconds / episodeDuration * 100}%, white ${currentSeconds / episodeDuration * 100}%)`;
    if (currentMinutes > 0) {
      currentSeconds -= 60 * currentMinutes;
    }
    if (currentHours > 0) {
      currentMinutes -= 60 * currentHours;
    }
    // display the hour/minute/second as zero-padded integers
    timingCurrent.textContent = `${currentHours < 10 ? `0${currentHours}` : currentHours}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;
  }, 1000);
};

// function pausing the audio
const pauseAudio = () => {
  audio.pause();
  // ! clear the currently-ongoing interval
  clearInterval(intervalID);
};

// function called in response to a click event on the toggle button
// toggle the boolean and call the play/pause function according to its value
// detail the correct SVG in the toggleButton
const toggleEpisode = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    toggleButton.querySelector('svg').innerHTML = `
    <svg>
      <use href = "#pause" />
    </svg>`;
    playAudio();
  } else {
    toggleButton.querySelector('svg').innerHTML = `
    <svg>
      <use href = "#play" />
    </svg>`;
    pauseAudio();
  }
};

toggleButton.addEventListener('click', toggleEpisode);

// function muting (or restoring the volume) of the audio
const toggleVolume = () => {
  isMute = !isMute;
  if (isMute) {
    muteButton.innerHTML = `
    <svg width="50" height="50">
      <use href = "#mute" />
    </svg>`;
    audio.volume = 0;
  }
  else {
    muteButton.innerHTML = `
    <svg width="50" height="50">
      <use href = "#volume" />
    </svg>`;
    audio.volume = 1;
  }
}

muteButton.addEventListener('click', toggleVolume);

// function called to change the speed rate
const changeSpeedRate = () => {
  // retrieve the text from the speedButton
  // ! this is a string, which therefore needs parsing
  const { textContent } = speedButton;
  // find which speed matches the option detailed in the root array
  const indexSpeed = speedOptions.indexOf(parseFloat(textContent, 10));
  // detail the following speed rate (or the original if the application reaches the last option)
  if (indexSpeed < speedOptions.length - 1) {
    audio.playbackRate = speedOptions[indexSpeed + 1];
    speedButton.textContent = speedOptions[indexSpeed + 1];
  } else {
    audio.playbackRate = speedOptions[0];
    speedButton.textContent = speedOptions[0];
  }
}

speedButton.addEventListener('click', changeSpeedRate);

// function called to stop the audio
const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;

  // beside stopping the audio, alter the UI features dependant on the current timestamp
  // ! it'd behoove me to use a function such as changeUI(timestamp) and have it change the appearance depending on the seconds' value
  isPlaying = false;
  toggleButton.innerHTML = `
    <svg width="50" height="50">
      <use href = "#play" />
    </svg>`;
  vinyl.style.transform = 'rotate(0deg)';
  episodeProgress.style.background = 'linear-gradient(to right, #006400, #006400 0%, white 0%)';
  timingCurrent.textContent = '00:00:00';

  clearInterval(intervalID);
}

stopButton.addEventListener('click', stopAudio);


// function called when hovering on the progress bar
function showTooltip(e) {
  // retrieve the width and eight of the tooltip, to position it atop the cursor
  const { clientWidth: tooltipWidth, clientHeight: tooltipHeight } = tooltip;
  // retrieve the width of the progress bar, alongside the coordinates of the cursor
  // offsetX for the current progress, compared to the width of the progress bar
  // pageX, pageY to position the tooltip in the right place
  const { clientWidth: width } = episodeProgress;
  const { pageX, pageY, offsetX } = e;

  tooltip.style.transition = 'all 0.2s ease-out';
  tooltip.style.top = `${pageY - tooltipHeight}px`;
  tooltip.style.left = `${pageX - tooltipWidth / 2}px`;
  tooltip.style.opacity = 1;

  // compute the hours, minutes and seconds based on the total time
  const percentage = Math.round(offsetX / width * 100) / 100;
  let percentageTime = Math.round(percentage * episodeDuration);
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  while (percentageTime >= 3600) {
    hours++;
    percentageTime -= 3600;
  }
  while (percentageTime >= 60) {
    minutes++;
    percentageTime -= 60;
  }
  while (percentageTime > 0) {
    seconds++;
    percentageTime--;
  }
  // alter the text of the tooltip to fit the new timestamp
  tooltip.textContent = `${(hours) ? (hours >= 10) ? `${hours}:` : `0${hours}:` : ''}${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`}`;
}

// function called when hovering outside of the progress bar
function hideTooltip() {
  // remove the tooltip, without transition
  tooltip.style.transition = 'none';
  tooltip.style.opacity = 0;
  tooltip.textContent = '';
}

// function called when clicking on the progress bar
function changeCurrentTime(e) {
  // compute the timestamp similarly to the showTooltip function
  // change the currentTime to match
  const { clientWidth: width } = episodeProgress;
  const { offsetX } = e;

  const percentage = Math.round(offsetX / width * 100) / 100;

  const percentageTime = Math.round(percentage * episodeDuration);
  audio.currentTime = percentageTime;

  // update the background of the progress bar to match
  episodeProgress.style.background = `linear-gradient(to right, #006400, #006400 ${percentage * 100}%, white ${percentage * 100}%)`;
}

// add the appropriate event listeners on the progress bar, calling the respective functions
episodeProgress.addEventListener('click', changeCurrentTime);
episodeProgress.addEventListener('mousemove', showTooltip);
episodeProgress.addEventListener('mouseout', hideTooltip);