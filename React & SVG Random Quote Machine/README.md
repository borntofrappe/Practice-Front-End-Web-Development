_Please Note_: the following is actually a project I set out to create for the **Front End Libraries** certification for the @freeCodeCamp curriculum. In the end it didn't measure up to the testing suite for the certification, so I decided to keep it as a nice, experimental, stepping stone effort.

The following notes were included in the development of the application, at the time I first created it. I figured they still account for good practice with both **React.js** and **SVG**.

Link to the working pen right [here](https://codepen.io/borntofrappe/pen/PBmzGL).

## Preface

To earn the **Front End Libraries** certification for the @freeCodeCamp curriculum, I build with this project a _Random Quote Machine_, using the **React.js** library and **SVG** syntax for the overall design of the page.

I already built such an application before the freeCodeCamp curriculum was revisited with additional certifications and more strict testing. In that instance, I did not use any external library, but managed to create a rather [neat application](https://codepen.io/borntofrappe/pen/VQYmpJ).

To properly get a hold of the new certificate, I therefore decided to re-build the application, using the mentioned library. It is a nice pretext to practice with **React.js**, which is always a good thing, while pursuing one of my web development milestones. 

Given the library's inclusion, the project represents a new challenges in terms of application's development. In terms of design, I did not want to replicate the old style, so I also decided to create a new look. I felt a new application would deserve a new style, so to challenge myself also in terms of design.

With a [previous project](https://codepen.io/borntofrappe/pen/ejvdpj), I created a retro, old-timey-screen frame with SVG syntax which I think suits rather well a random quote machine. The text can be nicely framed and boldly displayed leveraging the different elements and attributes SVG has to offer. 

Since the design is already accounted for, and you can check the mentioned project [here on github](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/SVG%20Frame%20and%20Texture), I therefore use the rest of this README to document my technical challenges and overall web development process.

## User Stories

<!-- Cue sad music -->

To complete the testing set up by @freeCodeCamp, the application needs to fulfill several user stories.

Since most bullet points do seem like minor tweaks around a central challenge, literally building a random quote machine, I decided to develop the application first and fulfill the user stories later. Literally checking any requirement.

## Development 

The web development environment is set up locally through the `create-react-app` utility. On _CodePen_, the project uses instead the libraries for `react`, `react-dom`, `react-transition-group` as included in the settings panel. Just remember to add **Babel** to have the syntax properly render on the page.

### React.js

The project is divided in the following component-based structure:

```code
index.js
  App.js
    QuoteFrame

    QuoteControls
      ShareQuote
      GetNewQUote
```

- `index.js` is used to render the stateful component responsible for the application.

- `App.js` is used to set the state, manage any changes to the same and structure the project. It renders the different components responsible for the application's visuals and funcitonalities. In terms of functionalities, it is also responsible for calls to the API used to retrieve quotes (in `componentDidMount()`).

- `QuoteFrame.js` is used to display the quote, in terms of text and author. Both pieces of text are included through SVG elements and are framed together in an SVG element as well. The component solely renders the mentioned SVG elements, with the information passed from the state.

- `QuoteControls.js` is used to include the buttons responsible for 1) retrieve a new quote and 1) share the quote on Twitter. They are gathered here together in sort of a controls' panel (which may be styled additionally in the future).

- `ShareQuote.js` is responsible for the rendering of the button used to share the existing quote on Twitter.

- `GetNewQuote.js` is instead tasked to include a new call to the quote API, and for the rendering of said quote in the frame. 

### Layout

The layout of the frame is already decided through the [previous and documented effort](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/SVG%20Frame%20and%20Texture). The current project also includes a new layout element (the controls' panel), which needs to be positioned as to be clearly visible.

For screens smaller than 800px, the viewport allows for space below (or above if needed) the SVG frame. This space is created by the simple fact that the frame itself is sized relative to the width and its height is tightly coupled with this measure. For such viewports, the controls' panel can be readily positioned right below (or above if needed) the frame.

For viewports larger than 800px, the frame occupies a large portion of the viewport's height and the same choice may lead to the controls button being hidden below the fold. To account for such a circumstance, it might be better to position the buttons on the right side (or the left side) of the frame. The fact that the frame is fixed to be 800px guarantees that there is indeed space around it. (the media query might be created for screen sizes greater than 1000px).

### SVG Text

Since the SVG allows for only so many characters before it crops the text out, it is necessary to proof the input string. With some experimenting and with the prescribed width and font-size, each line in the frame can hold at most 25 characters. 

My approach to accommodate for such a circumstance is take the input string, convert it into an array of strings, which are at most 25 characters (or so) and then loop through this array, adding a <tspan> element for each array item.

The following is the detailed approach which solved my issue:

1. initialize a test string.

  ```JS
  let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that threshold";
  ```

1. split the string into an array in which the array items are single words.

  ```JS
  let arrWords = testString.split(" "); // array of words
  ```

1. initialize variables to keep track of the length of the string made up the words in the array and push said string to an array storing the desired element.

  ```JS
  let tempString = ""; // string to store the multiple words
  let arrStrings = []; // array in which to store strings up to a certain height 
  ```

1. lopp through the array of words.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {

  }
  ```

1. append the words to the temporary string, followed by a whitespace to separate each one of them.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
  }
  ```

1. test the length of the string. If this exceeds a threshold (let's say 18 characters), push the temporary string to the array of results and re-initialize it to an empty string .

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
    if(tempString.length >= 18) {
      arrStrings.push(tempString);
      tempString = "";
    }
  }
  ```

1. as the last array items may not be accounted, remember to include the last tempString even if said string is less than 18 characters long.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
    if(tempString.length >= 18) {
      arrStrings.push(tempString);
      tempString = "";
    }
    if(i == arrWords.length - 1) {
      arrStrings.push(tempString);
      tempString = "";
    }
  }
```

**Testing**

What is left is _testing_ the code, which all together comes as follows:

```JS
let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that threshold";

let arrWords = testString.split(" "); // array of words

let tempString = ""; // string to store the multiple words
let arrStrings = []; // array in which to store strings up to a certain height 

for(let i = 0; i < arrWords.length; i++) {
  tempString += arrWords[i] + " ";
  if(tempString.length >= 18) {
    arrStrings.push(tempString);
    tempString = "";
  }
  if(i == arrWords.length - 1) {
    arrStrings.push(tempString);
    tempString = "";
  }
}

console.log(arrStrings); // ?!
```

**Result**

```JS
[
  "This is a string with ", "only one responsibility. ", "That literally being ", "more than twenty and ", "five characters long. ", "I'd say this is pretty ", "much above that threshold ", ""
]
```

Seems to be working, but with a few annoyances:

- the white space at the end of each array item;

- the empty item at the end of the array.

The first issue is easily dealt with, by pushing the string up to its penultimate character:

```JS
arrStrings.push(tempString.substring(0, tempString.length-1));
```

The second issue is made evident when I remove the last word in the array... and realize the string is actually made of the exact number which does not need a catch-all condition.

Adding the last word, the array gets the last string and this statement adds an empty array.

```JS
if(i == arrWords.length - 1) {
  arrStrings.push(tempString);
  tempString = "";
}
```

A simple check can be included to prevent such a situation from occurring: 

```JS
if(i == arrWords.length - 1 && tempString != "") {
  arrStrings.push(tempString);
  tempString = "";
}
```

**Wrap-up**

```JS
let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that";

let arrWords = testString.split(" "); // array of words

let tempString = ""; // string to store the multiple words
let arrStrings = []; // array in which to store strings up to a certain height

for(let i = 0; i < arrWords.length; i++) {
  tempString += arrWords[i] + " ";
  if(tempString.length >= 18) {
    arrStrings.push(tempString.substring(0, tempString.length-1));
    tempString = "";
  }
  if(i == arrWords.length - 1 && tempString != "") {
    arrStrings.push(tempString.substring(0, tempString.length-1));
    tempString = "";
  }
}

console.log(arrStrings); // fingers crossed
```

**Result**

```JS
["This is a string with", "only one responsibility.", "That literally being", "more than twenty and", "five characters long.", "I'd say this is pretty", "much above that"]
```

Yay! It works.