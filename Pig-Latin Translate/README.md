Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/VxKgQw/).

# Preface
The purpose of this project is to replicate in some ways, but change in other ways the interface provided by [Google Translate](https://translate.google.com/). Indeed this project is tasked to have two main areas, one in which to type a string or strings of text and another one in which to display the text, translated in another language.

I decided to go with pig latin as it was one of the "mockup" languages introduced in the front-end curriculum @freecodecamp, and I gladly make use of something created in my past endeavors.

# Plan
- [x] display two giant div containers, one next to the other (at least at the beginning; later on it might be best to change the layout for smaller screen devices)
- [x] for each container, include a tab describing the nature of the container itself. Your pick vs Pig latin
- [x] whenever a user types in the left/upper container, whenever he/she presses the space bar, translate the word which was just finished. I don't know whether instant translation would be a notable improvement
- [x] as soon as a character is typed, display an option in the upper right corner to delete the text present on page
- [x] for the translated text container, as soon as there is something translated, include an option to share the text

# Lessons Learned 

Here is the function used to translate from English/whichever language is typed in the text area and pig latin.

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

The challenge is then to include a regex which triggers a translation when a string is included in the text area.

TODO: add the logic behind the regex and the translate and display function
