const episodeProgress = document.querySelector('.episode--progress');
const timingCurrent = document.querySelector('.timing--current');
const toggleButton = document.querySelector('.controls--toggle');
const toggleSVG = toggleButton.querySelector('svg');
const audio = toggleButton.querySelector('audio');
const vinyl = document.querySelector('.player__vinyl');
let isPlaying = false;
let timer = 0;

const total = 216552;
let intervalID = 0;

const playAudio = () => {
  toggleSVG.innerHTML = '<use href="#pause"/>';
  audio.play();
  intervalID = setInterval(() => {
    timer += 1;
    const { currentTime } = audio;
    let currentSeconds = Math.floor(currentTime);
    let currentMinutes = Math.floor(currentSeconds / 60);
    const currentHours = Math.floor(currentMinutes / 60);
    if (currentMinutes > 0) {
      currentSeconds -= 60 * currentMinutes;
    }
    if (currentHours > 0) {
      currentMinutes -= 60 * currentHours;
    }
    timingCurrent.textContent = `${currentHours < 10 ? `0${currentHours}` : currentHours}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;
    episodeProgress.style.background = `linear-gradient(to right, #007e00, #007e00 ${timer / total * 100}%, white ${timer / total * 100}%)`;
  }, 1000);
};
const pauseAudio = () => {
  toggleSVG.innerHTML = '<use href="#play"/>';
  audio.pause();
  clearInterval(intervalID);
};

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
