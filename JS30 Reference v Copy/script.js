/** the idea is to have a giant object detailing the explanation and the snippets of code through array of object
 * each object has a structure tailored to create HTML elements, with keys making up the tag type and the values the text/markup to be injected in each tag
 */
const explanation = [
  {
    h1: 'Reference v Copy',
    p: [
      'Here\'s a small refresher on JavaScript, and what happens when you assign a variable to another variable.',
      'Inspired by <a href="https://youtu.be/YnfwDQ5XYF4">this video</a> in the <mark>#javascript30</mark> course. Credit <a href="https://twitter.com/wesbos">@wesbos</a>.'
    ]
  },
  {
    p: [
      'Let\'s say you assign an integer to a variable, <mark>source</mark>.',
      'Let\'s say you assign this new variable to another variable, <mark>destination</mark>.'
    ]
  },
  {
    p: [
      'If you were to change either one of them, the other variable would be unaffected.',
      'Changing <mark>source</mark> won\'t affect <mark>destination</mark>.'
    ]
  },
  {
    p: [
      'Like changing <mark>destination</mark> won\'t affect <mark>source</mark>.',
      'This is perhaps what you\'d always expect, but alas, it is not the case with arrays and objects.'
    ]
  },
  {
    p: [
      'Let\'s say you assign an array to a variable, <mark>sourceArray</mark>.',
      'Let\'s say you assign this new variable to another variable, <mark>destinationArray</mark>.'
    ]
  },
  {
    p: [
      'If you were to directly modify <mark>sourceArray</mark>, you\'d be modifying <mark>destinationArray</mark> as well.'
    ]
  },
  {
    p: [
      'What\'s more, if you were to directly modify <mark>destinationArray</mark>, you\'d be modifying <mark>sourceArray</mark> too.',
      'This is because both variables refer to the same data structure. Their value is a reference to the same array.'
    ]
  },
  {
    p: [
      'How to copy only the values then?',
      'You have a few options:',
      '<strong>#1</strong> <mark>Array.slice()</mark>',
      'Without specifying any argument, the function returns a copy to the entire array.'
    ]
  },
  {
    p: [
      '<strong>#2</strong> <mark>Array.from()</mark>',
      'The method allows to create a copy of an array-like object, like an array.'
    ]
  },
  {
    p: [
      '<strong>#3</strong> The <mark>[...]</mark> Spread Operator',
      'The three dots allow to spread out the items of an array, while the square brackets allow to wrap said items in another array. Posthaste.'
    ]
  },
  {
    p: [
      'And what about objects?',
      'The same behavior highlighted with arrays occurs.',
      'Modify one variable to have the change reflected in the other one.'
    ]
  },
  {
    p: [
      'A possible solution?',
      'Assuming you want to create a copy of the values only, you can make use of <mark>Object.assign</mark>.'
    ]
  },
  {
    p: [
      'You are not making a copy as much as creating a new object and adding the values from scratch.',
      'But the method allows to reduce the number of keystrokes it takes.'
    ]
  },
  {
    p: [
      '<strong>Disclaimer</strong>',
      'The copies obtained so far are all <em>shallow</em> copies, meaning that they do not consider nested structures.',
      'There\'s more to consider for multi-dimensional arrays and complex objects.'
    ]
  }
];

const snippet = [
  {
    code: 'let getStarted = true;'
  },
  {
    code: [
      'let source = 12;',
      'let destination = source;'
    ]
  },
  {
    code: [
      'let source = 12;',
      'let destination = source;',
      'source = \'Something else\';',
      'console.log(destination); <em>// 12</em>',
    ]
  },
  {
    code: [
      'let source = \'Something else\';',
      'let destination = source;',
      'destination = 12;',
      'console.log(source); <em>// Something else</em>'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = sourceArray;'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = sourceArray;',
      'sourceArray.push(\'Value\');',
      'console.log(destinationArray); <em>// [\'New\', \'Item\', \'Value\']</em>'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = sourceArray;',
      'destinationArray.pop();',
      'console.log(sourceArray); <em>// [\'New\']</em>'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = sourceArray.slice();',
      'sourceArray.pop();',
      'console.log(sourceArray); <em>// [\'New\']</em>',
      'console.log(destinationArray); <em>// [\'New\', \'Item\']</em>'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = Array.from(sourceArray);',
      'sourceArray.pop();',
      'console.log(sourceArray); <em>// [\'New\']</em>',
      'console.log(destinationArray); <em>// [\'New\', \'Item\']</em>'
    ]
  },
  {
    code: [
      'let sourceArray = [\'New\', \'Item\'];',
      'let destinationArray = [...sourceArray];',
      'sourceArray.pop();',
      'console.log(sourceArray); <em>// [\'New\']</em>',
      'console.log(destinationArray); <em>// [\'New\', \'Item\']</em>'
    ]
  },
  {
    code: [
      'let sourceObject = { name: \'Tim\' };',
      'let destinationObject = sourceObject;',
      'sourceObject.age = 32;',
      'console.log(destinationObject); <em>// { name: \'Tim\', age: 32 }</em>'
    ]
  },
  {
    code: [
      'let sourceObject = { name: \'Tim\' };',
      'let destinationObject = Object.assign({}, sourceObject);',
      'sourceObject.age = 32;',
      'console.log(sourceObject); <em>// { name: \'Tim\', age : 32 }</em>',
      'console.log(destinationObject); <em>// { name: \'Tim\' }</em>'
    ]
  },
  {
    code: [
      'let destinationObject = Object.assign({}, { name: \'Tim\' });',
    ]
  },
  {
    code: [
      'const isDone = \'unlikely\';'
    ]
  }
];

const presentation = {
  explanation,
  snippet
};


/** function including the content passed as first argument in the container passed as second
 * content is assumed to be an object detailing HTML elements in its property/value pairs
 * container is presumed to be an existing HTML element
*/
function populateSection(content, container) {
  // retrieve the property/value pairs of the content object
  const entries = Object.entries(content);
  // initialize a string variable in which to describe the markup
  let markup = '';

  // loop through the array of arrays
  for (let i = 0; i < entries.length; i += 1) {
    // destructure the tag making up the element and the value describing what goes in between tags
    const [tag, value] = entries[i];
    // ! value can be an array of strings, detailing multiple elements with the same tag
    if (Array.isArray(value)) {
      // if value is indeed an array include the values one element at a time
      markup += value.map(single => `<${tag}>${single}</${tag}>`).join('');
    } else {
      // else value the element as-is
      markup += `<${tag}>${value}</${tag}>`;
    }
  }
  container.innerHTML = markup;
}

// function used to populate the page considering the explanation and snippet at the provided index
function showPresentation(index) {
  // target the elements in which to inject the markup
  const explanationContainer = document.querySelector('div.explanation');
  const snippetContainer = document.querySelector('section.snippet');

  // target the span element in which to describe the number of the slide
  const spanIndex = document.querySelector('div.controls span');
  spanIndex.textContent = `${(index + 1)} / ${explanation.length}`;

  // call the populateSection function for the selected index
  populateSection(presentation.explanation[index], explanationContainer);
  populateSection(presentation.snippet[index], snippetContainer);
}
// initialize a variable to keep track of the current index
let number = 0;
// immediately call the function for the first pair of explanation/snippet
showPresentation(number);

// target both button elements
const buttons = document.querySelectorAll('button');
// function called in response ot a click event on the button elements
function handleClick() {
  // retrieve the data-action attribute of the button
  const dataAction = this.getAttribute('data-action');
  // modify number according to the data attribute, clamping its value to the interval [0, length - 1]
  // where the considered length is the length of the arrays making up the explanation and the snippet
  if (dataAction === 'prev') {
    number = Math.max(0, number - 1);
  } else {
    number = Math.min(explanation.length - 1, number + 1);
  }
  // if number reaches either end of the specified interval remove the class of .active from the matching button
  buttons.forEach(button => button.classList.add('active'));
  if (number === 0 || number === explanation.length - 1) {
    this.classList.remove('active');
  }
  // call the function to show the HTML for the selected index
  showPresentation(number);
}

// listen for the click event on both buttons
buttons.forEach(button => button.addEventListener('click', handleClick));


// function called in response to the keydown event being registered on the window
function handleKeyDown(e) {
  // retrieve the key code and if it matches 37 / 39 (the left or right arrow keys) call the function to consider the previous/following slide
  const { keyCode } = e;
  // pre emptively terminate the function if the keycode doesn't match one of the expected values
  if (keyCode !== 37 && keyCode !== 39) {
    return false;
  }

  // the only two key codes left are the ones for the left and right arrow keys, allowing to change number in the prescribed interval
  if (keyCode === 37) {
    number = Math.max(0, number - 1);
  } else {
    number = Math.min(explanation.length - 1, number + 1);
  }

  // remove the class of .active to the buttons when reaching the edge of the array
  buttons.forEach((button) => {
    const dataAction = button.getAttribute('data-action');
    if ((dataAction === 'prev' && number === 0) || (dataAction === 'next' && number === explanation.length - 1)) {
      button.classList.remove('active');
    } else {
      button.classList.add('active');
    }
  });

  showPresentation(number);
}

// listen for the keydown event on the entire window
window.addEventListener('keydown', handleKeyDown);
