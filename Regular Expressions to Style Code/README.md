Link to the working pen right [here](https://codepen.io/borntofrappe/full/GXoMNx/).

## Preface

With this small effort, I'd like to practice with regular expressions in order to style the following block of code:

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

Indeed, while it may take a while to actually style the snippet as markdown syntax would effectively style it, I'd like to at least provide an alternative design for comments, and maybe a few keywords.

**Update**

In the end, I managed to include a few styling options for comments, numbers, operators, functions and a few keywords. By including the regular expressions each in an object and alongside another property, it is possible to streamline the `.replace` function to apply all expressions in one line of code.

```JS
regularExpressions.forEach((regularExpression) => snippetRegex.innerHTML = snippetRegex.innerHTML.replace(regularExpression.expression, `<span class=${regularExpression.class}>$&</span>`));
```

It may look cumbersome, it is the end result of multiple attempts, often repeating the same logic over and over. Broken down and commented it might be easier to grasp.

```JS
// given the array of objects, loop through the array
regularExpressions.forEach((regularExpression) => 
// for each object with the structure { expression: "", class: ""}
  // update the HTML structure of the code element
  snippetRegex.innerHTML = 
  // update the HTML with the HTML structure itself, where a modification is included as per the replace() function
  snippetRegex.innerHTML.replace(
    // replace accepts two arguments: as the first one, it accepts a regular expression
    // this is retrieved from the respective object
    regularExpresion.expression,
    // the second argument is a string which replaces the string matching the regular expression
    // $& can be used to include in this strin the string matching the regular expression
    // in this instance $& is wrapped in a span element
    // the span element details additionally a class
    // this is retrieved from the respective object
    `<span class=${regularExpression.class}>$&</span>`
  )
);
```