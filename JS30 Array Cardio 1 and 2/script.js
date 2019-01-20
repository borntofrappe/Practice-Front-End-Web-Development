// target the two elements nesting the content of the panel and the display
const editorPanel = document.querySelector('.editor__panel');
const editorDisplay = document.querySelector('.editor__display');

// function adding a class of active on the button passed as argument, and removing it from all other buttons
function handleActive(selectedButton) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => { button === selectedButton ? button.classList.add('active') : button.classList.remove('active'); });
}
// function adding a 0 to integers smaller than 10
const zeroPad = integer => (integer >= 10 ? integer : `0${integer}`);

/* datasets used in the exercises (and shown in the data folder)
arrays for
  - inventors
  - people
  - boulevards
  - instances

  - persons (for lack of a better word, and to avoid using people twice)
  - comments

*/
const data = {
  inventors: [
    {
      first: 'Albert', last: 'Einstein', year: 1879, passed: 1955
    },
    {
      first: 'Isaac', last: 'Newton', year: 1643, passed: 1727
    },
    {
      first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642
    },
    {
      first: 'Marie', last: 'Curie', year: 1867, passed: 1934
    },
    {
      first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630
    },
    {
      first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543
    },
    {
      first: 'Max', last: 'Planck', year: 1858, passed: 1947
    },
    {
      first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979
    },
    {
      first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852
    },
    {
      first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905
    },
    {
      first: 'Lise', last: 'Meitner', year: 1878, passed: 1968
    },
    {
      first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909
    }
  ],
  people: ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'],
  boulevards: [
    'Boulevards of Paris',
    'City walls of Paris',
    'Thiers wall',
    'Wall of Charles V',
    'Wall of Philip II Augustus',
    'City gates of Paris',
    "Haussmann's renovation of Paris",
    'Boulevards of the Marshals',
    'Boulevard Auguste-Blanqui',
    'Boulevard Barbès',
    'Boulevard Beaumarchais',
    "Boulevard de l'Amiral-Bruix",
    'Boulevard des Capucines',
    'Boulevard de la Chapelle',
    'Boulevard de Clichy',
    'Boulevard du Crime',
    'Boulevard Haussmann',
    "Boulevard de l'Hôpital",
    'Boulevard des Italiens',
    'Boulevard de la Madeleine',
    'Boulevard de Magenta',
    'Boulevard Montmartre',
    'Boulevard du Montparnasse',
    'Boulevard Raspail',
    'Boulevard Richard-Lenoir',
    'Boulevard de Rochechouart',
    'Boulevard Saint-Germain',
    'Boulevard Saint-Michel',
    'Boulevard de Sébastopol',
    'Boulevard de Strasbourg',
    'Boulevard du Temple',
    'Boulevard Voltaire',
    'Boulevard de la Zone'
  ],

  instances: ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'],
  persons: [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ],
  comments: [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ]

};

// dataset created for the exercises in Array Cardio day 1
// detailing a simple structure through markup syntax, adding also JavaScript in the wrapping backticks to run the actual code behind the exercises
const dayOne = {
  filter: `
      <h1>array.filter</h1>

      <h2>Assignment</h2>

      Using the array of inventors, filter the list for those particular individuals who were born in the 1500's.

      <h2>Snippet</h2>

      <code>const filter = data.inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600)</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Year of birth</mark></th>
        </tr>
        ${data.inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.year}</td>
          </tr>
        `).join('')}
      </table>


      <h2>Notes</h2>

      <p>
        <code>array.filter()</code> accepts a function and filters out those items for which the function returns false.
      Conversely, the items for which the function returns true are returned (and here stored in a separate variable).
      </p>
  `,
  map: `
      <h1>array.map</h1>

      <h2>Assignment</h2>

      Create an array nesting one string for each inventor, corresponding to his/her first and last name.

      <h2>Snippet</h2>

      <code>const map = data.inventors.map(inventor => \`\${inventor.first}\ \${inventor.last}\`)</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th><mark>Full name</mark></th>
        </tr>
        ${data.inventors.map(inventor => `
          <tr><td>${inventor.first} ${inventor.last}</td></tr>
        `).join('')}
      </table>

      <h2>Notes</h2>

      <p>
        <code>array.map()</code> loops through an array and returns an array of the same length. The function specified between parens determines
      what is returned. In this instance, the first and last name for each inventors are concatenated and saved in a new array.
      </p>
  `,
  sort: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Sort the inventors by birthdate, from oldest to youngest.

      <h2>Snippet</h2>

      <code>const sort = data.inventors.sort((inventorA, inventorB) => (inventorA.year > inventorB.year ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Birthdate</mark></th>
        </tr>
        ${data.inventors.sort((inventorA, inventorB) => (inventorA.year > inventorB.year ? 1 : -1)).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.year}</td>
          </tr>
        `).join('')}
      </table>

      <h2>Notes</h2>

      <p>
        <code>array.sort()</code> compares two subsequent values and swaps their places if a condition is met. In the example, if the birthyear of the inventor
      is greater than the value for the following one, these two inventors are swapped, effectively bubbling down the oldest individual.
      </p>
      <p>
        <mark>Beware: this method actually mutates the original array.</mark>
      </p>
  `,
  reduce: `
      <h1>array.reduce</h1>

      <h2>Assignment</h2>

      Compute the total number of years lived by all inventors.

      <h2>Snippet</h2>

      <code>const reduce = data.inventors.reduce((accumulator, currentValue) => accumulator + (currentValue.passed - currentValue.year), 0)</code>

      <h2>Result</h2>

      Total age: <mark>${data.inventors.reduce((accumulator, currentValue) => accumulator + (currentValue.passed - currentValue.year), 0)}</mark>

      <h2>Notes</h2>

      <p>
        <code>array.reduce()</code> returns one single value on the basis of the array.
      </p>
      <p>
        It takes as argument an <em>accumulator</em>, initialized with the value specified after the function and
      kept in memory as the method loops through the array, as well as the <em>currentValue</em>, which refers to one item after the other in the array.
      It finally returns the value held by the accumulator.
      </p>
  `,
  sortPlus: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Sort the inventors by years lived.

      <h2>Snippet</h2>

      <code>const sort = data.inventors.sort((inventorA, inventorB) => ((inventorA.passed - inventorA.year) < (inventorB.passed - inventorB.year) ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Years lived</mark></th>
        </tr>
        ${data.inventors.sort((inventorA, inventorB) => ((inventorA.passed - inventorA.year) < (inventorB.passed - inventorB.year) ? 1 : -1)).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.passed - inventor.year}</td>
          </tr>
        `).join('')}
      </table>

      <h2>Notes</h2>

      <p>
        Beside comparing two values, the function can be used to sort items on the basis of a computation.
      </p>
  `,
  filterPlus: `
      <h1>array.filter</h1>

      <h2>Assignment</h2>

      Using the boulevards array, create a list of boulevards which contain 'de' anywhere in the name

      <h2>Snippet</h2>

      <code>const filter = data.boulevards.filter(boulevard => /de/.test(boulevard))</code>

      <h2>Result</h2>

      <ul>
        ${data.boulevards.filter(boulevard => /de/.test(boulevard)).map(boulevard => `
          <li>${boulevard.replace(/de/gi, '<mark>de</mark>')}</li>
        `).join('')}
      </ul>

      <h2>Notes</h2>

      <p>
        Instead of using a regular expression (as shown above), it is possible to use the <code>includes()</code> function,
      and pass as argument the desired string.
      </p>
      <p>
      As in: <code>boulevard.includes('de')</code>.
      </p>
  `,
  sortPlusPlus: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Using the people array, sort the people alphabetically by last name.

      <h2>Snippet</h2>

      <code>const sort = data.people.map(person => person.split(', ')).sort((parsonA, parsonB) => (parsonA[0] > parsonB[0] ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th><mark>Last name</mark></th>
          <th>First name</th>
        </tr>
        ${data.people.map(person => person.split(', ')).sort((parsonA, parsonB) => (parsonA[0] > parsonB[0] ? 1 : -1)).map(person => `
          <tr>
            <td>${person[0]}</td>
            <td>${person[1]}</td>
          </tr>
        `).join('')}
    </table>

    <h2>Notes</h2>

    <p>
      Beside comparing numbers, the function can be used to also compare strings.
    </p>
  `,
  reducePlus: `
      <h1>array.reduce</h1>

      <h2>Assignment</h2>

      Using the instances array, count the number of instances of each item.

      <h2>Snippet</h2>

      <code>const instancesObject = data.instances.reduce((accumulator, currentValue) => {<br/>
        accumulator[currentValue] ? accumulator[currentValue] += 1 : accumulator[currentValue] = 1;<br/>
        return accumulator;<br/>
      }, {})</code>

      <h2>Result</h2>

      <table>
      <tr>
        <th>Word</th>
        <th><mark>Instances</mark></th>
      </tr>
      ${Object.entries(data.instances.reduce((accumulator, currentValue) => {
    accumulator[currentValue] ? accumulator[currentValue] += 1 : accumulator[currentValue] = 1;
    return accumulator;
  }, {})).sort((entryA, entryB) => (entryA[1] > entryB[1] ? -1 : 1)).map(entry => `
        <tr>
          <td>${entry[0]}</td>
          <td>${entry[1]}</td>
        </tr>
      `).join('')}
    </table >

    <h2>Notes</h2>

    <p>
      <code>array.reduce()</code> returns one single value. That value can be a number or a more complex data structure,
    as in the object returned above.
    </p>
  `
};

// dataset created for the exercises in Array Cardio day 2
// similar structure to day 1, but separated from it as to include it in a separate 'branch' so to speak
const dayTwo = {
  some: `
      <h1>array.some</h1>

      <h2>Assignment</h2>

      Using the array of persons, check if at least one person is 19 years or older.

      <h2>Snippet</h2>

      <code>const isOlder = data.persons.some(person => {<br/>
        const date = new Date();</br>
        return date.getFullYear() - person.year >= 19;</br>
      }</code>

      <h2>Result</h2>

      Somebody is 19 years or older: ${data.persons.some((person) => {
    const date = new Date();
    return date.getFullYear() - person.year >= 19;
  }) ? '<mark>yep</mark>' : '<mark>nope</mark>'}

      <h2>Notes</h2>

      <p>
        <code>array.some()</code> returns false only if no single item matches the condition specified between parens.
      </p>
  `,
  every: `
      <h1>array.every</h1>

      <h2>Assignment</h2>

      Check if everybody in the persons array is 19 years or older.

      <h2>Snippet</h2>

      <code>const areAllOlder = data.persons.every(person => {<br/>
        const date = new Date();</br>
        return date.getFullYear() - person.year >= 19;</br>
      }</code>

      <h2>Result</h2>

      Everybody is 19 years or older: ${data.persons.every((person) => {
    const date = new Date();
    return date.getFullYear() - person.year >= 19;
  }) ? '<mark>yep</mark>' : '<mark>nope</mark>'}

      <h2>Notes</h2>

      <p>
        <code>array.every()</code> returns true only if every single item matches the condition specified between parens.
      </p>

  `,
  find: `
      <h1>array.find</h1>

      <h2>Assignment</h2>

      Using the comments array, find the comment with the ID of 823423.

      <h2>Snippet</h2>

      <code>const targetComment = data.comments.find(comment => comment.id === 823423)</code>

      <h2>Result</h2>

      Target comment: <mark>${data.comments.find(comment => comment.id === 823423).text}</mark>

      <h2>Notes</h2>

      <p>
        <code>array.find()</code> returns the item matching the defined condition, if any.
        </p>
  `,
  findIndex: `
      <h1>array.findIndex</h1>

      <h2>Assignment</h2>

      Find the comment with the ID of 823423 and remove it.

      <h2>Snippet</h2>

      <code>const targetComment = data.comments.findIndex(comment => comment.id === 823423)</code><br/>
      <code>const newComments = [...data.comments.slice(0, targetComment), ...data.comments.slice(targetComment + 1)]</code>

      <h2>Result</h2>

      <table>
      <tr>
        <th>Comment</th>
        <th><mark>ID</mark></th>
      </tr>
      ${[...data.comments.slice(0, data.comments.findIndex(comment => comment.id === 823423)), ...data.comments.slice(data.comments.findIndex(comment => comment.id === 823423) + 1)].map(comment => `
        <tr>
          <td>${comment.text}</td>
          <td>${comment.id}</td>
        </tr>
      `).join('')}
    </table >

    <h2>Notes</h2>

    <p>
      <code>array.findIndex()</code> returns the position in the array of the item matching the specified condition, if any.
    </p>
    <p>
      In the snippet above, <code>array.slice()</code> is used to return a new array, <mark>without</mark> modifying the original one.
    </p>
    <p>
      The three dots <code>...</code> represent the <mark>spread</mark> operator, and literally spread out the items of the sliced array, to easily
      concatenate multiple arrays.
    </p>
  `
};

// collect the data structures for the two days in a single object
const exercises = {
  dayOne,
  dayTwo
};


// function displaying the structures found in the data folder (and in the data object)
// receiving as argument code and including it in the HTML of the display
function displayData(dataStructure) {
  editorDisplay.innerHTML = `<pre class="display--data"><code>${dataStructure}</code></pre>`;
}
// function called in response to a click event on one of the buttons in the data folder
// retrieving the data-value attribute and populating the HTML with the matching data structure
function handleData(target) {
  const dataValue = target.getAttribute('data-value');
  displayData(`const ${dataValue} = ${JSON.stringify(data[dataValue], null, 10)}`);
  // function highlighting the selected button
  handleActive(target);
}

// function displaying the exercises found in the exercises folder (and in the exercises object)
// receiving as argument the value wrapped in between backticks and injecting it in the display
function displayExercise(exerciseStructure) {
  editorDisplay.innerHTML = `
    <div class="display--exercise">
      ${exerciseStructure}
    </div>
  `;
}
// function called in response to a click event on one of the buttons in the exercise folder
// retrieving the data-day and data-value attributes and populating the HTML referring the object with the matching value
function handleExercise(target) {
  const dataDay = target.getAttribute('data-day');
  const dataValue = target.getAttribute('data-value');
  displayExercise(exercises[dataDay][dataValue]);
  handleActive(target);
}

// by default call the displayExercise function to highlight one of the exercises
displayExercise(exercises.dayOne.map);

// fill the panel to the left with two details element
// in these details element add the buttons for the data and the exercises
// ! be sure to reference the handleExercise and handleData functions in the onclick listener of the buttons
// ! add open to the details elements which shows the exercise displayed by default (through the displayExercise() function)
// ! nest the exercises for day 1 and day 2 each in a separate details element
editorPanel.innerHTML = `
  <details class="panel--data">
    <summary>Data</summary>

    <div class="buttons">
      ${Object.keys(data).map(key => `
          <button onclick="handleData(this)" class="buttons--data" data-value=${key}>
            ${key}.js
          </button>
        `).join('')}
    </div>
  </details>

  <details open>
    <summary>Exercises</summary>

    <details open>
      <summary>Day One</summary>
      <div class="buttons">
        ${Object.entries(exercises.dayOne).map((entry, index) => `
            <button onclick="handleExercise(this)" class="buttons--exercise ${entry[0] === 'map' && 'active'}" data-day="dayOne" data-value=${entry[0]}>
              ${zeroPad(index + 1)} ${entry[0]}.md
            </button>
          `).join('')}
      </div>
    </details>

    <details>
      <summary>Day Two</summary>
      <div class="buttons">
        ${Object.entries(exercises.dayTwo).map((entry, index) => `
            <button onclick="handleExercise(this)" class="buttons--exercise" data-day="dayTwo" data-value=${entry[0]}>
              ${zeroPad(index + 1)} ${entry[0]}.md
            </button>
          `).join('')}
      </div>
    </details>

  </details>
`;
