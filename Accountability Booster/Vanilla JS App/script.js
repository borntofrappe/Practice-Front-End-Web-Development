/** project functionalities
 * toggle between light and dark theme
 * include the text of the buttons in the textarea, when pressed
 * share the text in a tweet
 */

/* to toggle the theme of the application
- target the trigger-button
- target the root element to alter the CSS custom properties detailing the theme
- target the use element to change the SVG icon being shown
*/
const buttonTheme = document.querySelector('.app__theme');
const root = document.documentElement;
const iconTheme = document.querySelector('.app__theme svg use');

// detail the values in an object
const theme = [
  {
    name: 'dark',
    bgStart: '#4d1894',
    bgEnd: '#21046c',
    icon: 'sun-icon'
  },
  {
    name: 'light',
    bgStart: '#71a0f6',
    bgEnd: '#5181db',
    icon: 'moon-icon'
  }
];

// create a variable which is used to toggle between the two array items
let isDark = true;

// when pressing the theme button check the value of the boolean variable
// change the necessary CSS custom properties as needed
buttonTheme.addEventListener('click', () => {
  if (!isDark) {
    root.style.setProperty('--color-bg-start', theme[0].bgStart);
    root.style.setProperty('--color-bg-end', theme[0].bgEnd);
    iconTheme.setAttribute('href', `#${theme[0].icon}`);
  } else {
    root.style.setProperty('--color-bg-start', theme[1].bgStart);
    root.style.setProperty('--color-bg-end', theme[1].bgEnd);
    iconTheme.setAttribute('href', `#${theme[1].icon}`);
  }
  isDark = !isDark;
});


/* to add the text of the button elements in the text area
- target all the buttons
- target the textarea element
*/
const buttonsTags = document.querySelectorAll('.app__tags button');
const textarea = document.querySelector('.app__share textarea');
/*
listen for a click event on all buttonsTags, at which point
- retrieve the text value of the buttons
- append the text to the textarea element
*/

buttonsTags.forEach(button => button.addEventListener('click', () => {
  let text = button.textContent;

  // if the last character is not white space, add one space to separate the text from the hashtag
  const textareaLastCharacter = textarea.value[textarea.value.length - 1];
  if (textareaLastCharacter !== ' ') {
    text = ` ${text}`;
  }
  textarea.value += text;
}));


/* to share the text of the panel on twitter
- target the button which allows to share the text
*/
const buttonShare = document.querySelector('.app__share button');
// on click check if there is actually some text in the textarea element
// ! the url necessary for the tweet accepts text, hashtags, url through different parameters

/* define regular expressions to
1. find the hashtags
1. find the url
1. find the whitespace, at the beginning, end and otherwise in the middle of the string
*/
const regex = {
  hashtags: /#\S+/g,
  url: /http[s]?.+/g,
  whitespace: /\s/g,
  initialWhitespace: /^\s+/,
  finalWhitespace: /\s+$/
};

buttonShare.addEventListener('click', () => {
  // consider the value of the textarea
  let text = textarea.value;

  if (text) {
    // retrieve the values for the hashtags and url parameters
    // ! remember that .match() returns an array of results, if existing
    const hashtags = text.match(regex.hashtags);
    const url = text.match(regex.url);

    // format the text by removing the hashtags, the url, the whitespace at either end
    text = text
      .replace(regex.hashtags, '')
      .replace(regex.url, '')
      .replace(regex.initialWhitespace, '')
      .replace(regex.finalWhitespace, '')
      // format the remaining whitespace to include the escape sequence for whitespace
      .replace(regex.whitespace, '%20');

    // create the URL making up the tweet detailing the text
    let tweet = `https://twitter.com/intent/tweet?text=${text}`;
    // add the hashtags/ url if present
    // ! .match() returns an array
    if (hashtags) {
      // ! the URL demands hashtags as comma-separated values, added to the _hashtags_ parameter
      const hashtagString = hashtags.map(hashtag => hashtag.substring(1)).join(',');
      tweet += `&hashtags=${hashtagString}`;
    }
    if (url) {
      // ! the URL requires the URL to be included through the _url_ parameter
      const urlString = url[0];
      tweet += `&url=${urlString}`;
    }


    window.open(tweet);
  }
});
