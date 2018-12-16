// target the elements used for the simple play/pause animation

// div for the vinyl
const vinyl = document.querySelector('.player__vinyl');

// button for the play/ pause animation & functionality
// including the nested svg and audio elements
const toggleButton = document.querySelector('.controls--toggle');
const toggleSVG = toggleButton.querySelector('svg');
const audio = toggleButton.querySelector('audio');

// div for the progress bar
const episodeProgress = document.querySelector('.episode--progress');
// span for the current time stamp
const timingCurrent = document.querySelector('.timing--current');

// global variable(s) to keep track of the play/pause alternative and adjust the progress bar according to the total length of the podcast
// ! this value, much alike those in the DOM, is hard coded, but in a working application it would be retrieved from the RSS feed
let isPlaying = false;
let intervalID = 0;
const total = 216552;

/* function playing the audio, and achieving the following
- change the reference of the <use /> element for the SVG, to pause
- play the audio
- set up an intervl used to update the current time stamp and the progress bar
! audio.currentTime allows to retrieve the number of seconds since the beginning of the audio
*/
const playAudio = () => {
  toggleSVG.innerHTML = '<use href="#pause"/>';
  audio.play();
  intervalID = setInterval(() => {
    const { currentTime } = audio;

    // use three variables for the hours/minutes/seconds, to extract the precise values from the current timestamp
    let currentSeconds = Math.floor(currentTime);
    let currentMinutes = Math.floor(currentSeconds / 60);
    const currentHours = Math.floor(currentMinutes / 60);
    if (currentMinutes > 0) {
      currentSeconds -= 60 * currentMinutes;
    }
    if (currentHours > 0) {
      currentMinutes -= 60 * currentHours;
    }
    // display the hour/minute/second as zero-padded integers
    timingCurrent.textContent = `${currentHours < 10 ? `0${currentHours}` : currentHours}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;

    // update the progress bar
    episodeProgress.style.background = `linear-gradient(to right, #006400, #006400 ${currentTime / total * 100}%, white ${currentTime / total * 100}%)`;
  }, 1000);
};

// function pausing the audio
const pauseAudio = () => {
  toggleSVG.innerHTML = '<use href="#play"/>';
  audio.pause();
  // ! clear the currently-ongoing interval
  clearInterval(intervalID);
};

// function called in response to a click event on the toggle button
// toggle the boolean and call the play/pause function according to its value
// ! add/remove a class of .playing to animate the vinyl
const toggleEpisode = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    vinyl.classList.add('playing');
    playAudio();
  } else {
    vinyl.classList.remove('playing');
    pauseAudio();
  }
};

toggleButton.addEventListener('click', toggleEpisode);
