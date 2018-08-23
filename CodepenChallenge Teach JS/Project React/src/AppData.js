const AppData = [
  {
    heading: "JavaScript Array && Object Methods",
    brief: "As featured @syntaxfm",
    snippet: ""
  },
  {
    heading: ".filter()",
    brief: "Filter an array on the basis of a condition.",
    snippet: 
    `
    // populate an array with random integers, which can be either positive or negative
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      // range [-50, 49]
      myArr.push(Math.floor((Math.random() - 0.5) * 100));
    }
    // populate an array with only the positive integers of the previous array
    let positiveArr = myArr.filter((item) => item > 0);
    `
  },
  {
    heading: ".map()",
    brief: "Easily modify array items in bulk.",
    snippet: 
    `
    // populate a list of something somebody might remember
    let past = ["the old times", "mmda, bab pab mmda", "Jackie says relax"];

    // return an array in which each item is preceded by a chosen verb
    let nostalgia = past.map((item) => \`Remember $\{item}\`);
    // ["Remember the old times", "Remember mmda, bab pab mmda", "Remember Jackie says relax"]    
    `
  },
  {
    heading: ".reduce()",
    brief: "Return a single value based on a computation of the array and its items. The method accepts as argument acc, initialized to the first item and updated at every iteration, and curr, representing the current array item.",
    snippet: 
    `
    // populate an array with random integers, which can be either positive or negative
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      // range [-50, 49]
      myArr.push(Math.floor((Math.random() - 0.5) * 100));
    }

    // compute the running total of the array
    // including in acc (which gets returned, the sum of all array items)
    let total = myArr.reduce((acc, curr) => acc+curr);
    `
  },
  {
    heading: ".forEach()",
    brief: "Loop through an array and include some kind of functionality with every iteration.",
    snippet: 
    `
    // target all buttons
    const buttons = document.querySelectorAll("button");

    // loop through the collection and attach an event listener to each button
    buttons.forEach((button) => button.addEventListener("click", gtd));

    function gtd() {
      console.log("Get things done!");
    }
    `
  },
  {
    heading: ".some()",
    brief: "Check if some array items match a condition.",
    snippet: 
    `
    // consider an array including five random integers between 0 and 9
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // check if some integers are even
    // returning true or false (mostly true)
    myArr.some((item) => item % 2 === 0);
    `
  },
  {
    heading: ".every()",
    brief: "Check if all array items match a condition.",
    snippet: 
    `
    // consider an array including five random integers between 0 and 9
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // check if all integers are even
    // returning true or false (mostly false)
    myArr.every((item) => item % 2 === 0);
    `
  },
  {
    heading: ".includes()",
    brief: "Check if an array contains a value.",
    snippet: 
    `
    // consider an array including five random integers between 0 and 9
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // check if the array includes the number five
    // returning true or false (who knows)
    myArr.includes(5);
    `
  },
  {
    heading: ".from()",
    brief: "Create an array out of an iterable object. The method is applied on the Array global object and it also accepts a second argument, in a function which allows to map through each item.",
    snippet: 
    `
    // create an array out of the lowercase characters of an prescribed string
    let myArr = Array.from("JohNny", (letter) => letter.toLowerCase()); 
    // ["j", "o", "h", "n", "n", "y"]
    `
  },
  {
    heading: ".of()",
    brief: "Create an array out of the values included as arguments. Applied on the Array global object.",
    snippet: 
    `
    // create an array out of simple integers
    let myArr = Array.of(1, 2, 3); 
    // [1, 2, 3]
    `
  },
  {
    heading: ".values()",
    brief: "Return an array of all values contained in an object. Applied on the Object global object.",
    snippet: 
    `
    // include an object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    let objVal = Object.values(myObj); 
    // ["Johhny", "ynnhoj5"]
    `
  },
  {
    heading: ".keys()",
    brief: "Return an array of all keys contained in an object. Applied on the global Object.",
    snippet: 
    `
    // include an object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    let objVal = Object.keys(myObj); 
    // ["user", "password"]
    `
  },
  {
    heading: ".entries()",
    brief: "Return an array of all key-value pairs contained in an object. Applied on the global Object.",
    snippet: 
    `
    // include an object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    let objVal = Object.entries(myObj); 
    // [ ["user", "Johnny"], ["password", "ynnho5"] ]
    `
  },
  {
    heading: "[spread]",
    brief: "Create a shallow copy of an array.",
    snippet: 
    `
    // include an array
    let myArr = [1, 2, 3, 4];

    // create an array which extends upon the defined array
    let myExtendedArr = [...myArr, 5, 6, 7]; 
    // [1, 2, 3, 4, 5, 6, 7];
    `
  },
  {
    heading: "{spread}",
    brief: "Create a shallow copy of an object.",
    snippet: 
    `
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
    `
  },
  {
    heading: "[rest]",
    brief: "Easily destructure array items.",
    snippet: 
    `
    // include an array
    let myArr = ["Johnny", "ynnhoj5", "silver", 12];
    
    // desctructure the array to store its items in several variables
    let [name, passowrd, ...rest] = myArr;
    // name references "Johnny"
    // password references "ynnhoj5"
    // rest references ["silver", 12]
    `
  },
  {
    heading: "(rest)",
    brief: "Handle a flexible number of arguments in a function.",
    snippet: 
    `
    // create a function which considers two parameters an additional catch-all param
    function handleAll(name, password, ...args) {
      // log the first two arguments
      console.log(\`name: $\{name}, password: $\{password}\`);
      // if the third argument, an array, is not empty, log also the third
      if(args.length !== 0) {
        console.log(\`rest: $\{args}\`);
      }
    }
    
    handleAll("Jonnhy", "yhnnoj5"); 
    // name: Johnny, password: yhnnoj5
    handleAll("Jonnhy", "yhnnoj5", "silver", 12);
    // name: Johnny, password: yhnnoj5
    // rest: silver,12
    `
  },
  {
    heading: ".freeze()",
    brief: "Prevent adding or modifying properties. Applied on the global Object and in strict mode, such action would result in an error.",
    snippet: 
    `
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
    `
  },
  {
    heading: ".seal()",
    brief: "Prevent adding properties. Applied on the global Object and in strict mode, such action would result in an error.",
    snippet: 
    `
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
    `
  },
  {
    heading: ".assign()",
    brief: "Include in a target object property-value pairs of source object(s). Applied on the global Object. Conflicting priorities are resolved by the value of the last instance.",
    snippet: 
    `
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
    `
  }

];

export default AppData;