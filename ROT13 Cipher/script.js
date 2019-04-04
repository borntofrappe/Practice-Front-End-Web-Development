/* necessary elements
input to retrieve the input value
cipher to display the letters and the ciphered version
button to cipher the input value
*/
const input = document.querySelector('input');
const cipher = document.querySelector('.cipher');
const button = document.querySelector('button');

// arbitrary max length to cap the number of characters
const maxLength = 10;

// function to retrieve the value from an input element
const getValue = (inputElement) => inputElement.value;

// function to describe in the .cipher container one span element for each character
// skip anything that is not a letter
const typeWord = (word) => cipher.innerHTML = [...word].map(letter => /[a-z]/i.test(letter) ? `<span>${letter}</span>` : '').join('');

// immediately include in the cipher the value of the input box
typeWord(getValue(input));

// function to cipher/decipher an input string
function rot13(str) {
  // compute the code of the thirtheenth lowercase letter
  const letterCode = 'a'.charCodeAt() + 13;
  // return the string where each letter is replaced following the algorithm's instructions
  return str.replace(/[a-z]/gi, (match) => {
    // to decide whether to add or remove 13, consider the code of the lower case match vis a vis the code of the 13th lowercase letter
    const matchCode = match.charCodeAt();
    const matchLetterCode = match.toLowerCase().charCodeAt();
    // return the match according to the comparison between codes
    return (matchLetterCode < letterCode) ? String.fromCharCode(matchCode + 13) : String.fromCharCode(matchCode - 13);
  });
}

// when typing
input.addEventListener('input', (e) => {
  // retrieve the value from the element
  const value = getValue(e.target);
  // consider any character that is not a letter
  const whiteNoise = value.match(/[^a-z]/gi);
  // increment the max lenght attribute by the number of characters which aren't a letter
  input.setAttribute('maxLength', whiteNoise ? maxLength + whiteNoise.length : maxLength);
  // remove the class of .de on the button element, if existing
  if (button.classList.contains('de')) {
    button.classList.remove('de');
  }
  // type the new value in the cipher container
  typeWord(value);
});

// when pressing the cipher button
button.addEventListener('click', () => {
  // add a class depicting how the button can be pressed again to decipher the word back to its original value
  button.classList.toggle('de');
  // type the ciphered string from the .cipher container
  // ! this to have the input element unscathed
  typeWord(rot13(cipher.textContent));
});


