// target the container in which to inject the HTML elements
const appConsole = document.querySelector('.app__console');

// create an object from which to call the different functions
const c = {
  // each function accepts as argument a string of text and uses this text in a paragraph element
  // the class is used to differentiate between the different statements
  log(text) {
    appConsole.innerHTML += `<p class="console--log">${text}</p>`;
  },
  warn(text) {
    appConsole.innerHTML += `<p class="console--warn">${text}</p>`;
  },
  error(text) {
    appConsole.innerHTML += `<p class="console--error">${text}</p>`;
  },
  // ! console.query is not an actual method, just to clear things out
  query(text) {
    appConsole.innerHTML += `<p class="console--query">${text}</p>`;
  }
};

// target the textarea element from which to retrieve the console statements
const inputText = document.querySelector('.app__input textarea');

// by default include a series of statements including one of each function
const inputValue = `c.log('Just logging something');
c.warn('Live without warning');
c.error('This is not a test');
c.query('Should I console this?');
`;
inputText.textContent = inputValue;


// function receiving as argument the text of the textarea element
// using regular expression to identify the method and the string passed in parens
// and to make some kind of check on the input string
function processValue(value) {
  // valid statements are those in the sort of
  // c.log('stringoftext');
  /* regular expression structure
  c
  .
  a series of letters
  parens including anything
  semicolon (made optional).
  */
  const validRegex = /c\.[a-zA-Z]+\(.+\);?/gi;

  // find the statements matching the regular expression
  // if any, matches will hold an array of string values, with the specified regex
  const matches = value.match(validRegex);

  // first branch: does matches holds an actual value
  // yes --> extract the methods and expressions
  // no --> relate tbe missing value
  if (matches) {
    // for loop
    // loop through the array of matches
    for (let i = 0; i < matches.length; i += 1) {
      // extract the method (as the text following the c. prefix and preceding the parens)
      const method = matches[i].match(/c\.([a-zA-Z]+)\(.+\);?/);
      // extract the expression (as the string of text in between parens)
      const expression = matches[i].match(/c\.[a-zA-Z]+\(["'](.+)["']\);?/);

      // second branch: if existing, the method and expression variables each hold the result in the second item of the array
      // method[1] and expression[1]
      if (method && expression) {
        const matchingMethod = method[1];
        const matchingExpression = expression[1];

        // third branch: if the method matches one of the functions in the c object
        if (c[matchingMethod]) {
          c[matchingMethod](matchingExpression);
        } else {
          // display each valid option in a code tag
          c.error(`Unknown method. Try ${Object.keys(c).map(key => `<code>c.${key}()</code>`).join(', ')}`);
        } // end of third branch
      } else {
        c.error('Invalid statement, be sure to have a pair of quotes');
      } // end of second branch
    } // end of for loop
  } else {
    c.error('Invalid statement, try something like <strong>c.log(\'Hello world\');</strong>');
  } // end of first branch
}

// immediately process the value injected in the textarea element
processValue(inputValue);

// target the button in the input section
const inputButton = document.querySelector('.app__input button');

// function called in response to a click event on the button
function handleClick() {
  // remove the eleents in the console
  appConsole.innerHTML = '';

  // retrieve the value from the textarea and call the function which processes said value and includes the console statement in the respective container
  const { value } = inputText;
  if (value) {
    processValue(value);
  } else {
    c.warn('Warning: No text in the input field');
  }
}

// resiter the click event on the selected button
inputButton.addEventListener('click', handleClick);
