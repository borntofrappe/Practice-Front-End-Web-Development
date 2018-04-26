// target the text area (input) and the paragraph (output) on either side of the page
const textArea = document.querySelector(".input-text textarea");
const displayText = document.querySelector(".display-text p");

// define a regular expression looking for any character followed by a whitespace
const regex = /\w+ /gi;

// listen for a keyup event on the text area, upon which translate the text and display it in the display-text container
textArea.addEventListener("keyup", translateAndDisplay);

// define a function to display the translated text 
function translateAndDisplay(event) {
  // the event provides information regarding the input value under the tree event.target.value
  let inputString = event.target.value.toLowerCase();
  // string.match(regex) returns an array for all matches to the regular expression
  let matchingString = inputString.match(regex);
  // create an empty string in which to pour the results one after the other (used to then include the translated matches in the display)
  let stringReturn = '';
  
  // if matching string is different than null (in which case there are no matches)
  if(matchingString) {
    // loop through the array 
    for(let match of matchingString) {
      // append all translated items to the empty string (as it is emptied on each iteration through the function, there's no risk of bloating the display container)
      // match.length -1 as to avoid the white space separating each word
      // + " " to include separation among the matches 
      stringReturn += translatePigLatin(match.substring(0, match.length-1)) + " ";
    }
    // include the translated matches in the display container
    displayText.textContent = stringReturn;
  }
}


// describe the function which turns a string into pig-latin
function translatePigLatin(str) {
    // store in an array every single character of the string
    var arrayOfCharacters = str.split("");
  
    // create an array storing the five vowels
    var vowels = ["a", "e", "i", "o", "u"];
    // create an array in which to store the positions of vowels in the array of characters
    // this is useful to find the first instance of a vowel and change the string according to its position
    var vowelsInArrayOfCharacters = [];
  
    // loop through the vowels array, noting that what matters is only the first occurrence of each vowel
    for(var i=0; i < vowels.length; i++) {
      // push in the empty array the position in which each vowel first appears
      vowelsInArrayOfCharacters.push(arrayOfCharacters.indexOf(vowels[i]));
    }
    // filter the array considering only not-negative values
    // taking into consideration which vowels indeed appear
    // remember that you need to return filter somewhere, as filter does not modify the array on which it is applied
    vowelsInArrayOfCharacters = vowelsInArrayOfCharacters.filter(function(value) {
        return value >= 0;
     });
  
    // sort the array from smallest to biggest value
    // no need to return sort, as it alters the array on which it is applied
    vowelsInArrayOfCharacters.sort(function(a,b) {
        return a - b;
     });
  
    // now it is possible to find the first occurrence of any vowel in the first array item of the array, vowelsInArrayOfCharacters[0]
    var firstVowelInString = vowelsInArrayOfCharacters[0];
  
    // if the string begins with a vowel, firstVowelInString has index 0
    // in this occurrence return the string in which you incllude the suffix -way
    if(firstVowelInString == 0) {
      // return the string made up of every item of the origin array
      // concatenated with the prescribed suffix
      return arrayOfCharacters.join("") + "way";
    }
    // else
    else {
      // return the string starting from the first vowel (through substr), to which you concatenate the skipped consonants and the suffix -ay
      return arrayOfCharacters.join("").substr(firstVowelInString) + arrayOfCharacters.join("").substr(0, firstVowelInString) + "ay";
    }
  }

// as a silly addendum (which can definitely be improved), give the possibility to share the translated text on twitter by clicking on the SVG icon
const svg = document.querySelector(".pig-latin-icon");
svg.addEventListener("click", shareOnTwitter);
function shareOnTwitter() {
  var text = displayText.textContent;
  if(text != "") {
    var url = "https://twitter.com/intent/tweet?text=" + text;
    window.open(url);
  }
}
