Link to the working pen right [here](https://codepen.io/borntofrappe/full/VxKgQw/).

# Preface
The purpose of this project is to replicate in some ways, but change in other ways the interface provided by [Google Translate](https://translate.google.com/). Indeed this project is tasked to have two main areas, one in which to type a string or strings of text and another one in which to display the text, translated in another language.

I decided to go with pig latin as it was one of the "mockup" languages introduced in the front-end curriculum @freecodecamp, and I gladly make use of something created in my past endeavors.

# Plan
- [x] display two giant div containers, one next to the other (at least at the beginning; later on it might be best to change the layout for smaller screen devices)
- [x] for each container, include a tab describing the nature of the container itself. Your pick vs Pig latin
- [x] whenever a user types in the left/upper container, whenever he/she presses the space bar, translate the word which was just finished. I don't know whether instant translation would be a notable improvement
- [x] as soon as a character is typed, display an option in the upper right corner to delete the text present on page
- [x] for the translated text container, as soon as there is something translated, include an option to share the text

# Notes 

**Translate**

In order to translate the text from English/whichever language is typed in the text area to pig latin, the following function is used.

It accepts a string as an argument and returns said string modified as to include prefixes and whatnot to achieve the "translation". The comments in the code already explain the purpose of each line.

```JS
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
```

With the given, working function, the challenge is to then include a regular expression which triggers a translation when a string is included in the text area.

**Regex**

The regular expression used for the project looks for any character, however many there might be in succession, followed by a single white space.

```JS
const regex = /\w+ /gi;
```

This allows to retrieve single strings, but it comes with the price of including one extra character, the white space between string. This also means that a function triggered at this regular expression conveniance will be triggered only when a string is typed and another is being included. Only when a space is included, the script will translate the preceding string (taking care of not considering the extra white space character).


**Display and Translate**

The regular expression is used to check for the presence of a string in the text area element. It is also used to retrieve the actual string matching the pattern, through the `match()` function. This one, as allowed by the flags included in the regex, returns one or more strings in an array and it is therefore necessary to loop through this array to consider each text individually and translate each text one at a time.

The following, well documented function achieves the desired effect, but a couple of words are warranted for the new type of loop hereby included and the inclusion of an extra variable in which to store the translated text.

```JS
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
```

*for*

Instead of the usual for loop, 

```JS
for(let i = 0; i < array.length; i ++) {}
```

The code makes use of new-fangled syntax allows by ES6.

```
for(let something of somethingBigger) {}
```

The implications are virtually identical. The loop iterates through the string/array labeled in this instance `somethingBigger`, assigning at each iteration a character/array item to the variable in this instance labeled `something`.

*let stringReturn = ''*

In the function ,the purpose of this string is already explained, but its inclusion may seem confusing at first. Superfluous might be a better word. 

At first, it would seem obviously better to include the translated text in the prescribed HTML element, directly through the `textContent` handle. Unfortunately this would come at the expense of an increasingly repeating string, which would concatenate previous values at each iteration.

To avoid this compounding effect, the variable `stringReturn` is created to store the translated text, and it is updated at each iteration with the text included in the input element. Only outside of the for loop, the value of this string is then passed to the display method.

