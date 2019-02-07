/* list of bands retrieved from the js30 repo
https://github.com/wesbos/JavaScript30/blob/master/17%20-%20Sort%20Without%20Articles/index-START.html
*/
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// create an array of possible articles
const articles = ['the', 'a', 'an'];

// target the ul element
const ul = document.querySelector('ul#bands');
// loop through the array of bands and add one list element for each item
ul.innerHTML = bands.map(band => `
  <li>${band}</li>
`).join('');

/* the idea is to show the list as-is and have it sorted as the visitor presses the button
it is sorted in two steps though

1. create an array in which any article introducing a band name is appended to the name itself
1. sort the array according to the first letter of this new array
! as array.sort() actually mutates the original array, be sure to create a copy of it
*/


/*
array in which the articles are appended to the band names, and as follows:

  The Plot in You -> Plot in You, The
  The Devil Wears Prada -> Devil Wears Prada, The
  Pierce the Veil -> Pierce the Veil    <-- no change
*/
const bandsArticleAppended = bands.map((band) => {
  // initialize a variable to store the article, if any
  let article = '';
  // loop through the array of articles
  for (let i = 0; i < articles.length; i += 1) {
    // create a regular expression  looking for the article at the very beginning
    // ! the second argument represents the flags applied to the regular expression
    // for the first article, this expression is equivalent to /^the/i
    const regex = new RegExp(`^${articles[i]} `, 'i');
    // if the regex is found in the band name --> there is an article in the bginning
    if (regex.test(band)) {
      // store the article in the variable initialized earlier
      // ! match returns an array of result, to destructure the desired value
      [article] = band.match(regex);
    }
  }
  // if an article is found, the initialized variable refers to said article
  // return the band name starting from the index past the article and append the article after a comma
  if (article) {
    return `${band.substring(article.length)}, ${article}`;
  }
  // by default return the band name as is
  return band;
});


/* or the button, allow the program to go through three stages
0 --> default list of band names
1 --> list of band names with any article appended at the end of the screen
2 --> list of point 1, just sorted

initialize a variable to go through these stages
*/
let stage = 0;

// target the single button element
const button = document.querySelector('button');

// function called in response to the click event being fired on the only button
function handleClick() {
  // increment the variable identifying the stage
  /* ! in each conditional, update also the --tip custom property to describe the stage
  in any instance, add also a class and remove it after the animation it producces has ended
  */
  stage += 1;
  ul.classList.add('active');
  // to avoid repetition also remove the event listner and re-attach it once the animation is over
  button.removeEventListener('click', handleClick);
  ul.addEventListener('animationend', () => {
    ul.classList.remove('active');
    button.addEventListener('click', handleClick);
  });

  if (stage === 1) {
    // stage 1: show one list item for each string in the array of band names in which the articles are appended
    ul.innerHTML = bandsArticleAppended.map(band => `
      <li>${band}</li>
    `).join('');

    // change the string value included in the `content` property of the pseudo element
    ul.style.setProperty('--tip', "'Almost there'");
    // update the text of the button to describe the change
    this.textContent = 'Sort names';
  } else if (stage === 2) {
    // stage 2: use the same array as stage 1, but sort it on the basis of the first letter
    // ! .sort() actually mutates the array, so it is necessary to sort a copy of it
    // otherwise, once the visitor goes through the stages once more the array would be always sorted
    ul.innerHTML = [...bandsArticleAppended].sort((a, b) => (a[0] > b[0] ? 1 : -1)).map(band => `
      <li>${band}</li>
    `).join('');

    ul.style.setProperty('--tip', "'Sorted!'");
    this.textContent = 'From the top';
  } else {
    // stage 0 (shown as the stage variables reaches 3)
    // show the list of band names as is
    ul.innerHTML = bands.map(band => `
      <li>${band}</li>
    `).join('');
    ul.style.setProperty('--tip', "'Back at it'");
    this.textContent = 'Append articles';
    // reset the stage back to 0
    stage = 0;
  }
}

// listen for the click event on the button
button.addEventListener('click', handleClick);
