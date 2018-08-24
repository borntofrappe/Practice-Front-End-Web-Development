The project is currently being developed through the `create-react-app` utility. Live pen soon to follow.

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I plan to create an entry for the weekly #codepenchallenge, built around the topic of teaching a JavaScript concept.

Inspired by @syntafm, and specifically [episode number 043](https://syntax.fm/show/043/20-javascript-array-and-object-methods-to-make-you-a-better-developer), the project sets out to describe quite a handful of really helpful methods around arrays and objects.

## Design

The pen itself is divided in two main sections:

- one column in which to list on multiple rows the different methods. These are included in sequence and in button elements, which allow to change the appearance of the other section. As the user presses on a button, the other section is indeed scheduled to display the specific method in detail;

- one column in which to explain each different method. This should at first include some kind of text presenting the project, but after a button on the left section is clicked. The section should showcase the method, a brief description and a snippet describing a use-case.

The two sections are always set to be side by side, with the first column occupying a fixed width and the second occupying the rest of the page.

The first column is itself divided in grid cells, with each method separated in a cell of fixed width and matching height. The cells are always shown one on top of another, even at the price of causing vertical scrolling.

The second column contains as mentioned three elements: a heading introducing the method, a brief shortly describing it and a snippet showcasing a use-case.

On large screen the heading and brief should be one on top of the other, with the snippet on the side. On smaller viewports, each should occupy a row and the entirety of the parent's width. I am still uncertain whether the heading and brief should be in the same position in this instance, but this can be easily tested by changing the `order` property of this last element.

You can find a first rough "sketch" of this layout in the "Project Layout" folder.

**Layout Update**

When including more button elements than the vertical space can accommodate, the section displaying the content on the right column is centered lower and lower on the screen. To avoid such a mishap, scrolling is allowed, but only on the column responsible for the buttons' grid. This way the grid showing the content is simply centered in the viewport, the page shows the application immediately and all methods are accessible, at most after some scrolling.

**Color and Fonts Update**

In terms of visuals, the project ought to resemble a simple dashboard, with the buttons in the left and the content in the center, center right sections. 

The color palette sets out to resemble the site of [syntaxfm](https://syntax.fm/) itself.

- #1d1d1d for the color of the text;
- #000000 for the background of the body;
- #f9f9f9 for the background of the grid;
- #f1c15d for accent color.

The snippet displayed after the heading and paragraph element has color and background color flipped with respect to the grid itself (#f9f9f9 and #1d1d1d respectively).

The fonts chosen for the project distinguish themselves for the headings the paragraphs and the code snippet:

- Black Lato for headings;
- Open Sans for paragraphs;
- Fira Mono for code snippets.

**Methods Update**

The buttons used to represent the different methods previously included only text, describing exactly the matching method. I decided to however turn to icon and SVG icons for a more visual representation.

All SVG assets can be found in the 'Project Resources' folder.

## Data

The methods described in the project are included with an array of objects, structured as follows:

```JS
const methods = [
  {
    heading: "",
    brief: "",
    snippet: ""
  }
];
```

I should be able to section the information in each field and later populate the page according to which button is pressed.

There should also be an additional section displaying introductory elements. While this object in particular might have the same structure (minus the snippet), it does mean it is advisable to change the name of the variable.

**Update**

With the inclusion of an SVG icon representing each button, an additional property is included for the SVG syntax behind each method, effectively updating the objects' structure as follows:

```JS
const data = [
  {
    heading: "",
    brief: "",
    icon: "",
    snippet: ""
  }
];
```

Without further ado, here are all the elements displayed on the page, alongside the brief and snippet used to describe them.

1. **array.filter()**

  Filter an array on the basis of a condition.

  ```JS
  // array of random integers
  let myArr = [];
  for(let i = 0; i < 10; i++) {
    // range [-50, 49]
    myArr.push(Math.floor((Math.random() - 0.5) * 100));
  }
  // array of positive integers only
  let positiveArr = myArr.filter((item) => item > 0);
  ```

**array.map()**

Apply some logic on each array item.

```JS
// array of strings
let past = ["the old times", "mmmbop, ba duba dop", "Jackie says relax"];

// array of updated strings
let nostalgia = past.map((item) => `Remember ${item}?`);
// ["Remember the old times?", "Remember mmmbop, ba duba dop?", "Remember Jackie says relax?"]
```

_Small note_: in the project, where the code snippets are wrapped in between `backticks`, the backtick ` sign and curly {braces} need escaping.

**array.reduce()**

Return a single value based on a computation of the array and its items.

```JS
// array of random integers
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [-50, 49]
  myArr.push(Math.floor((Math.random() - 0.5) * 100));
}

// running total of the array
let total = myArr.reduce((acc, curr) => acc+curr);
```

**array.forEach()**

Execute a function repeated for every array item.

```JS
// target all buttons
const buttons = document.querySelectorAll("button");

// attach an event listener on each button
buttons.forEach((button) => button.addEventListener("click", gtd));

function gtd() {
  console.log("Get things done!");
}
```

**array.some()**

Check if some array items match a condition.

```JS
// array of random intgers
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [0-9]
  myArr.push(Math.floor(Math.random()*10));
}

// are some integers even? (mostly true)
myArr.some((item) => item % 2 === 0);
```

**array.every()**

Check if every array item matches a condition.

```JS
// array of random intgers
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [0-9]
  myArr.push(Math.floor(Math.random()*10));
}

// is every integer even? (mostly false)
myArr.every((item) => item % 2 === 0);
```

**array.includes()**

Check if an array contains a value.

```JS
// array of random intgers
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [0-9]
  myArr.push(Math.floor(Math.random()*10));
}

// is there a number five? (who knows)
myArr.includes(5);
```

**Array.from()**

Create an array out of an iterable object.

```JS
let myStr = "JoHNnY";

// array of lowercase characters
let myArr = Array.from(myStr, (letter) => letter.toLowerCase()); 
// ["j", "o", "h", "n", "n", "y"]
```

**Array.of()**

Create an array out of the values included as arguments.

```JS
// array of arguments
let myArr = Array.of(1, 2, 3); 
// [1, 2, 3]
```

**Object.values()**

Return all the values of an object, in an array.

```JS
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

// retrieve values
let objVal = Object.values(myObj); 
// ["Johnny",  "ynnhoj5"]
```

**Object.keys()**

Return all the keys of an object, in an array.

```JS
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

// retrieve keys
let objVal = Object.keys(myObj); 
// ["user", "password"]
```

**Object.entries()**

Return key-value pairs of an object, in nested arrays.

```JS
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

// retrieve key value pairs
let objVal = Object.entries(myObj);
// [ ["user", "Johnny"], ["password", "ynnho5"] ]
```

**Array ...spread**

Create a shallow copy of an array.

```JS
let myArr = [1, 2, 3, 4];

// array which extends upon the previous one
let myExtendedArr = [...myArr, 5, 6, 7];
// [1, 2, 3, 4, 5, 6, 7];
```

**Object ...spread**

Create a shallow copy of an object.

```JS
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

// object which extends upon the previous one
let myExtendedObj = {
  ...myObj,
  color: "silver"
};
// { user: "Johnny", password: "ynnhoj5", color: "silver" }
```

**Array ...rest**

Destructure, access array items.

```JS
let myArr = ["Johnny", "ynnhoj5", "silver", 12];
    
// desctructure the array
let [name, passowrd, ...rest] = myArr;
// name: "Johnny"
// password: "ynnhoj5"
// rest: ["silver", 12]
```

**Function ...rest**

Handle a flexible number of arguments in a function.

```JS
// function which considers a variable number of arguments
function handleAll(name, password, ...args) {
  // log the first two arguments
  console.log(`name: ${name}, password: ${password}`);
  // log [additional arguments]
  if(args.length !== 0) {
    console.log(`rest: ${args}`);
  }
}

handleAll("Jonnhy", "yhnnoj5"); 
// name: Johnny, password: yhnnoj5
handleAll("Jonnhy", "yhnnoj5", "silver", 12);
// name: Johnny, password: yhnnoj5
// rest: silver,12
```

**Object.freeze()**

Prevent adding or modifying properties.

```JS
'use strict'

let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}

// freeze the object
Object.freeze(myObj);

myObj.user = "Elizabeth"; 
// cannot assign read-only prop

myObj.color = "silver"; 
// cannot add property color
```

**Object.seal()**

Prevent adding properties.

```JS
'use strict'

let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}

// seal the object
Object.seal(myObj);

myObj.user = "Elizabeth"; 
// myObj.user is successfully updated

myObj.color = "silver"; 
// cannot add property color
```

**Object.assign()**

Include in a target object the entry(ies) of source object(s).

```JS
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}
let myOtherObj = {
  color: "silver",
  password: "whyBother71"
}

// object merging the previous two
let myExtendedObj = Object.assign({}, myObj, myOtherObj);
// { user: "Johnny", password: "whyBother71", color: "silver" }
```
