<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I plan to create an entry for the weekly #codepenchallenge, built around the topic of teaching a JavaScript concept.

Inspired by @syntafm, and specifically episode number 46, the pen sets out to elucidate quite a handful of really helpful methods around arrays and objects.

## Design

The pen itself is divided in two main sections:

- one column in which to list on multiple rows the different methods. These are included in sequence and in button elements, which allow to change the appearance of the other section, to display appropriate content;

- one column in which to explain each different method. This should at first include some kind of text presenting the project, but after a button on the left section is clicked, it should showcase the method, a brief description and a snippet describing a use-case.

The two sections are always set to be side by side, with the first column occupying a fixed width and the second occupying the rest of the page.

The first column is itself divided in grid cells, with each method separated in a cell of fixed width and matching height. The cells are always shown one on top of another, even at the price of including vertical scrolling.

The second column is contains three elements: a heading introducing the method, a brief shortly describing it and a snippet showcasing a use-case.

On large screen the heading and brief should be one on top of the other, with the snippet on the side. On smaller viewports, each should occupy a row and the entirety of the parent's width. I am still uncertain whether the heading and brief should be in the same position in this instance, but this can be easily tested by changing the order property of this last element.

You can find a first rough "sketch" of this layout in the "Project Layout" folder.

**Update**

When including more button elements than the vertical space can accommodate, the section displaying the content on the right is centered lower and lower on the screen. To avoid such a mishap, scrolling is allowed only on the columns responsible for the buttons' grid. This way the grid showing the content is simply centered in the viewport.

## Data

The methods which the pen tries to describe are as included with an array of objects, structured as follows:

```JS
const methods = [
  {
    heading: "",
    brief: "",
    snippet: ""
  }
];
```

I should be able to section the information in each field and later populate the right section with appropriate information.

There should also be an additional section displaying introductory elements. While this might have the same structure (minus the snippet), it does mean it is advisable to change the name of the variable.

Without further ado, here's a short list of all the objects to be displayed on the screen,

**JavaScript Array & Objects Methods**

As featured @syntaxfm.

**.filter()**

Filter an array on the basis of a condition.

```JS
// populate an array with random integers, which can be either positive or negative
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [-50, 49]
  myArr.push(Math.floor((Math.random() - 0.5) * 100));
}
// populate an array with only the positive integers of the previous array
let positiveArr = myArr.filter((item) => item > 0);
```

**.map()**

Easily modify array items in bulk.

```JS
// populate a list of something somebody might remember
let past = ["the old times", "mmda, bab pab mmda", "Jackie says relax"];

// return an array in which each item is preceded by a chosen verb
let nostalgia = past.map((item) => `Remember ${item}`);
// ["Remember the old times", "Remember mmda, bab pab mmda", "Remember Jackie says relax"]
```

**.reduce()**

Return a single value based on a computation of the array and its items. The method accepts as argument acc, initialized to the first item and updated at every iteration, and curr, representing the current array item.

```JS
// populate an array with random integers, which can be either positive or negative
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [-50, 49]
  myArr.push(Math.floor((Math.random() - 0.5) * 100));
}

// compute the running total of the array
// including in acc (which gets returned, the sum of all array items)
let total = myArr.reduce((acc, curr) => acc+curr);
```

**.forEach()**

Loop through an array and include some kind of functionality with every iteration.

```JS
// target all buttons
const buttons = document.querySelectorAll("button");

// loop through the collection and attach an event listener to each button
buttons.forEach((button) => button.addEventListener("click", gtd));

function gtd() {
  console.log("Get things done!");
}
```

**.some()**

Check if some array items match a condition.

```JS
// consider an array including five random integers between 0 and 9
let myArr = [];
for(let i = 0; i < 10; i++) {
  myArr.push(Math.floor(Math.random()*10));
}

// check if some integers are even
// returning true or false (mostly true)
myArr.some((item) => item % 2 === 0);
```

**.every()**

Check if all array items match a condition.

```JS
// consider an array including five random integers between 0 and 9
let myArr = [];
for(let i = 0; i < 10; i++) {
  myArr.push(Math.floor(Math.random()*10));
}

// check if all integers are even
// returning true or false (mostly false)
myArr.every((item) => item % 2 === 0);
```

**.includes()**

Check if an array contains a value.

```JS
// consider an array including five random integers between 0 and 9
let myArr = [];
for(let i = 0; i < 10; i++) {
  myArr.push(Math.floor(Math.random()*10));
}

// check if the array includes the number five
// returning true or false (who knows)
myArr.includes(5);
```

**Array.from()**

Create an array out of an iterable object. The method also accepts a second argument, in a function which allows to map through each item.

```JS
// create an array out of the lowercase characters of an prescribed string
let myArr = Array.from("JohNny", (letter) => letter.toLowerCase()); 
// ["j", "o", "h", "n", "n", "y"]
```

**Array.of()**

Create an array out of passing arguments.

```JS
// create an array out of simple integers
let myArr = Array.of(1, 2, 3); 
// [1, 2, 3]
```

**Object.values()**

Return an array of all values contained in an object.

```JS
// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

let objVal = Object.values(myObj); 
// ["Johhny", "ynnhoj5"]
```

**Object.keys()**

Return an array of all keys contained in an object.

```JS
// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

let objVal = Object.keys(myObj); 
// ["user", "password"]
```

**Object.entries()**

Return an array of all key-value pairs contained in an object.

```JS
// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

let objVal = Object.entries(myObj); 
// [ ["user", "Johnny"], ["password", "ynnho5"] ]
```

**Array ...spread**

Create a shallow copy of an array.

```JS
// include an array
let myArr = [1, 2, 3, 4];

// create an array which extends upon the defined array
let myExtendedArr = [...myArr, 5, 6, 7]; 
// [1, 2, 3, 4, 5, 6, 7];
```

**Object ...spread**

Create a shallow copy of an object.

```JS
// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
};

// create an object which extends upon the defined object
let myExtendedObj = {
  ...myObj,
  color: "silver"
};
// { user: "Johnny", password: "ynnhoj5", color: "silver" }
```

**Array ...rest**

Destructure array items.

```JS
// include an array
let myArr = ["Johnny", "ynnhoj5", "silver", 12];

// desctructure the array to store its items in several variables
let [name, passowrd, ...rest] = myArr;
// name references "Johnny"
// password references "ynnhoj5"
// rest references ["silver", 12]
```

**Function ...rest**

Handle a flexible number of a function's arguments.

```JS
// create a function which considers two parameters an additional catch-all param
function handleAll(name, password, ...args) {
  // log the first two arguments
  console.log(`name: ${name}, password: ${password}`);
  // if the third argument, an array, is not empty, log also the third
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

Prevent adding or modifying properties. In strict mode, such action would result in an error.

```JS
'use strict'

// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}

// prevent modifying existing properties
// prevent adding new properties
Object.freeze(myObj);

myObj.user = "Elizabeth"; 
// cannot assign read-only prop

myObj.color = "silver"; 
// cannot add property color
```

**Object.seal()**

Prevent adding properties. In strict mode, such action would result in an error.

```JS
'use strict'

// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}

// prevent adding new properties
Object.seal(myObj);

myObj.user = "Elizabeth"; 
// myObj.user is successfully updated

myObj.color = "silver"; 
// cannot add property color
```

**Object.assign()**

Include in a target object property-value pairs of source object(s). Conflicting priorities are resolved by the value of the last instance.

```JS
// include an object
let myObj = {
  user: "Johnny",
  password: "ynnhoj5"
}
let myOtherObj = {
  color: "silver",
  password: "whyBother71"
}

// include an object which considers the defined property value pairs
let myExtendedObj = Object.assign({}, myObj, myOtherObj);
// { user: "Johnny", password: "whyBother71", color: "silver" }
```

// END of day 1, project scheduled to last 2 days
