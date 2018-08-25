// target all code elements and add the example snippet to both
const snippets = document.querySelectorAll("pre code");

const code = `
  // array of random integers
  let myArr = [];
  for(let i = 0; i < 10; i++) {
    // range [-50, 49]
    myArr.push(Math.floor((Math.random() - 0.5) * 100));
  }
  // array of positive integers only
  let positiveArr = myArr.filter((item) => item > 0);
`;

snippets.forEach(snippet => snippet.textContent = code);


// target the snippet in the regex section
const snippetRegex = document.querySelector(".snippet--regex pre code");

// include the regular expressions to find specific sections of text
// include them in an array of object, each detailing the expression and the class which needs to be applied upon the strings matching the connecting expression
const regularExpressions = [
  { 
    expression: /\/\/.+\n/gi,
    class: "comments"
  },
  { 
    expression: /[0-9]+/gi,
    class: "numbers"
  },
  { 
    expression: /[\+\-\*]/gi,
    class: "operators"
  },
  { 
    expression: /\.\w+/gi,
    class: "functions"
  },
  { 
    expression: /for|let/gi,
    class: "keywords"
  }
];

// loop through the array of regex and update the HTML structure of the snippet wrapping the strings matching the expressions in span elements, bearing a class paired to the expression itself
// class defined in the stylesheet to alter the appearance of the matching strings
regularExpressions.forEach((regularExpression) => snippetRegex.innerHTML = snippetRegex.innerHTML.replace(regularExpression.expression, `<span class=${regularExpression.class}>$&</span>`));
