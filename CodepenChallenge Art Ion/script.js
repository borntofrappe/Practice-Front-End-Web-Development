// function returning a random value in a range
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

// function returning a random hsl color for selected saturation and lightness
const randomHsl = () => `hsl(${randomBetween(0, 360)}, ${randomBetween(40, 70)}%, ${randomBetween(50, 90)}%)`;

// array describing possible strings for the heading
const words = ['codepen', 'random', 'word', 'think', 'more', 'creatively', 'beauty', 'fancy', 'click', 'weird', 'obnoxious'];
// array describing the possible values for the mix-blend-mode property
// blatantly copy-pasted from MDN
// https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
const blendModes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
];


// target the body
const body = document.querySelector('body');
// target the heading
const heading = document.querySelector('h1');

// function styling the document by including one of the words through span elements styled different from one another
const randomAll = () => {
  // random word
  heading.textContent = words[randomBetween(0, words.length)];
  // random bakground
  body.style.setProperty('--color-bg', randomHsl());

  // break the heading including one span for each letter
  const text = heading.textContent;
  /**
   * data-letter is used in the content property of the :after element
   * style is added to additionally give a random hsl color to the spans making up the heading
   */
  heading.innerHTML = text.split('').map(letter => `<span data-letter=${letter} style="color: ${randomHsl()};}">${letter}</span>`).join('');

  // random color for each :after element
  heading.style.setProperty('--color-letter', randomHsl());
  // random blend mode for each :after element
  heading.style.setProperty('--blend-mode', blendModes[randomBetween(0, blendModes.length)]);
};


// immediately call the function
randomAll();
// call the function whenever cliking on the body of the page
body.addEventListener('click', randomAll);
