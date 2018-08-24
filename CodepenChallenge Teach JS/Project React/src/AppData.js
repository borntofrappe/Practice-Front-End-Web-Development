const AppData = [
  {
    heading: "JavaScript Array & Object Methods",
    brief: "As featured @syntaxfm",
    icon: "",
    snippet: "",
  },
  {
    heading: "array.filter()",
    brief: "Filter an array on the basis of a condition.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g><g transform='matrix(.84648 0 0 1 9.93 -.668)'><ellipse cx='3.929' cy='284.439' rx='7.262' ry='6.147'/><g fill='#000'><g transform='translate(-.325 .168)'><ellipse cx='.386' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='3.227'/><ellipse cx='5.911' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='8.121'/></g><g transform='translate(-.325 2.306)'><ellipse ry='.702' rx='.829' cy='281.064' cx='.386'/><ellipse cx='3.227' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='5.911'/><ellipse cx='8.121' cy='281.064' rx='.829' ry='.702'/></g><g transform='translate(-.325 4.444)'><ellipse cx='.386' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='3.227'/><ellipse cx='5.911' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='8.121'/></g><g transform='translate(-.325 6.582)'><ellipse ry='.702' rx='.829' cy='281.064' cx='.386'/><ellipse cx='3.227' cy='281.064' rx='.829' ry='.702'/><ellipse ry='.702' rx='.829' cy='281.064' cx='5.911'/><ellipse cx='8.121' cy='281.064' rx='.829' ry='.702'/></g></g></g></g></g></svg>",
    snippet: 
    `
    // array of random integers
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      // range [-50, 49]
      myArr.push(Math.floor((Math.random() - 0.5) * 100));
    }
    // array of positive integers only
    let positiveArr = myArr.filter((item) => item > 0);
    `
  },
  {
    heading: "array.map()",
    brief: "Modify array items in bulk.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g><path d='M6.474 278.425l3.424 1.003c2.131-.46 4.177-1.313 6.147-2.205l3.993 1.202v10.958l-3.993-1.804-6.147 2.74-3.424-.936z'/><path d='M.287 279.962v10.89M7.55 277.757v10.356' fill='none' stroke='#000' stroke-width='.144' transform='matrix(.84648 0 0 1 9.655 -.534)'/></g></g></svg>",
    snippet: 
    `
    // array of something somebody might remember
    let past = ["the old times", "mmmbop, ba duba dop", "Jackie says relax"];

    // array filled with nostalgia
    let nostalgia = past.map((item) => \`Remember $\{item}\`);
    `
  },
  {
    heading: "array.reduce()",
    brief: "Return a single value based on a computation of the array and its items.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g><path d='M6.307 278.352h13.898l-6.95 10.658z'/><path d='M12.454 282.779h1.604v6.411h-1.604z'/></g></g></svg>",
    snippet: 
    `
    // array of random integers
    let myArr = [];
    for(let i = 0; i < 10; i++) {
      // range [-50, 49]
      myArr.push(Math.floor((Math.random() - 0.5) * 100));
    }

    // running total of the array
    let total = myArr.reduce((acc, curr) => acc+curr);
    `
  },
  {
    heading: "array.forEach()",
    brief: "Execute a function at every iteration of the array.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g transform='translate(-1.07 -26.651) scale(1.09214)'><circle r='1.791' cy='280.715' cx='9.229' fill='#f1c15d'/><path d='M9.071 284.503v4.763h9.45v-8.514h-4.366' fill='none' stroke='#f1c15d' stroke-width='.794'/><path d='M14.453 279.155v3.12l-2.372-1.56z' fill='#f1c15d'/></g></g></svg>",
    snippet: 
    `
    // target all buttons
    const buttons = document.querySelectorAll("button");

    // attach an event listener on each button
    buttons.forEach((button) => button.addEventListener("click", gtd));

    function gtd() {
      console.log("Get things done!");
    }
    `
  },
  {
    heading: "array.some()",
    brief: "Check if some array items match a condition.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g transform='translate(-1.4 -26.651) scale(1.09214)' fill='#f1c15d'><circle cx='7.577' cy='284.876' r='1.791'/><path d='M13.568 286.318h3.598l-1.799-2.734z'/><circle r='1.791' cy='284.876' cx='19.262'/><path d='M9.673 283.584h3.598l-1.799 2.734z'/></g></g></svg>",
    snippet: 
    `
    // array of random intgers
    let myArr = [];
    // range [0-9]
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // are some integers even? (mostly true)
    myArr.some((item) => item % 2 === 0);
    `
  },
  {
    heading: "array.every()",
    brief: "Check if every array item matches a condition.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g fill='#f1c15d'><path d='M13.468 286.049h3.93l-1.965-2.986zM9.114 286.049h3.93l-1.965-2.986zM4.76 286.049h3.93l-1.965-2.986zM17.822 286.049h3.93l-1.965-2.986z'/></g></g></svg>",
    snippet: 
    `
    // array of random intgers
    let myArr = [];
    // range [0-9]
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // are all integers even? (mostly false)
    myArr.every((item) => item % 2 === 0);
    `
  },
  {
    heading: "array.includes()",
    brief: "Check if an array contains a value.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g transform='translate(-1.136 -26.651) scale(1.09214)' fill='#f1c15d'><circle cx='7.092' cy='284.876' r='1.791'/><path d='M13.407 286.318h3.597l-1.798-2.734z'/><circle r='1.791' cy='284.876' cx='19.262'/><circle r='1.791' cy='284.876' cx='11.149'/></g></g></svg>",
    snippet: 
    `
    // array of random intgers
    let myArr = [];
    // range [0-9]
    for(let i = 0; i < 10; i++) {
      myArr.push(Math.floor(Math.random()*10));
    }

    // is there a number five? (who knows)
    myArr.includes(5);
    `
  },
  {
    heading: "Array.from()",
    brief: "Create an array out of an iterable object.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.36864 0 0 .4355 16.593 166.11)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g><g transform='matrix(-.36864 0 0 .4355 20.342 166.11)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g fill='none' stroke='#f1c15d' stroke-width='1.639' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='0'><path d='M8.493 273.547s-6.357-.753-6.357 9.922c0 10.475 6.357 9.923 6.357 9.923M17.85 273.547s6.357-.753 6.357 9.922c0 10.475-6.357 9.923-6.357 9.923' paint-order='stroke fill markers' transform='matrix(.4632 0 0 .4632 1.271 146.306)'/></g><g><path d='M5.252 279.31h4.927v4.17' fill='none' stroke='#f1c15d' stroke-width='.528' transform='matrix(.84648 0 0 1 9.796 -.067)'/><path d='M17.589 283.084h1.648l-.824 1.301z' paint-order='stroke fill markers'/></g></g></g></svg>",
    snippet: 
    `
    // random string
    let myStr = "JohhnyApplePie";

    // array of lowercase characters
    let myArr = Array.from(myStr, (letter) => letter.toLowerCase()); 
    `
  },
  {
    heading: "Array.of()",
    brief: "Create an array out of the values included as arguments.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.36864 0 0 .4355 16.593 166.11)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g><g transform='matrix(-.36864 0 0 .4355 20.342 166.11)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><path d='M5.252 279.31h4.927v4.17' fill='none' stroke='#f1c15d' stroke-width='.528' transform='matrix(.84648 0 0 1 9.796 -.067)'/><path d='M17.589 283.084h1.648l-.824 1.301z' paint-order='stroke fill markers'/><g transform='matrix(.96625 0 0 .96625 -2.942 3.48)'><circle r='1.436' cy='285.255' cx='6.737'/><circle cx='14.752' cy='285.353' r='1.436'/><circle cx='10.744' cy='285.255' r='1.436'/></g></g></g></svg>",
    snippet: 
    `
    // array of few integers
    let myArr = Array.of(1, 2, 3); 
    `
  },
  {
    heading: "Object.values()",
    brief: "Return all the values of an object, in an array.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g transform='matrix(1.14344 0 0 1.14344 .673 -42.033)' fill='#f1c15d'><circle r='1.436' cy='284.933' cx='7.753'/><path d='M14.172 283.83l1.103 2.206H13.07z' stroke='#f1c15d' stroke-width='.832' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/><g transform='translate(0 .927)'><circle r='.353' cy='284.616' cx='10.733'/><circle cx='10.733' cy='283.397' r='.353'/></g></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    // random object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    // retrieve values
    let objVal = Object.values(myObj); 
    `
  },
  {
    heading: "Object.keys()",
    brief: "Return all the keys of an object, in an arra.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g transform='matrix(-1.14344 0 0 1.14344 25.838 -42.033)' fill='#f1c15d'><circle r='1.436' cy='284.933' cx='7.753'/><path d='M14.172 283.83l1.103 2.206H13.07z' stroke='#f1c15d' stroke-width='.832' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/><g transform='translate(0 .927)'><circle r='.353' cy='284.616' cx='10.733'/><circle cx='10.733' cy='283.397' r='.353'/></g></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    // random object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    // retrieve keys
    let objVal = Object.keys(myObj); 
    `
  },
  {
    heading: "Object.entries()",
    brief: "Return key-value pairs of an object, in nested arrays.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><path d='M9.247 282.51l-1.262 2.522h2.523z' stroke='#f1c15d' stroke-width='.95134208' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/><g transform='matrix(-1.14344 0 0 1.14344 25.528 -40.973)'><circle cx='10.733' cy='284.616' r='.353'/><circle r='.353' cy='283.397' cx='10.733'/></g><path d='M17.265 282.51l-1.261 2.522h2.522z' stroke='#f1c15d' stroke-width='.95134208' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    // random object
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };

    // retrieve [key, value] pairs
    let objVal = Object.entries(myObj); 
    `
  },
  {
    heading: "Array Spread Operator",
    brief: "Create a shallow copy of an array.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g transform='translate(1.521 -27.821) scale(1.09214)' fill='#f1c15d'><circle r='1.436' cy='285.255' cx='6.737'/><circle cx='14.752' cy='285.353' r='1.436'/><circle cx='10.744' cy='285.255' r='1.436'/></g></g></svg>",
    snippet: 
    `
    // random array
    let myArr = [1, 2, 3, 4];

    // array which extends upon the previous one
    let myExtendedArr = [...myArr, 5, 6, 7]; 
    `
  },
  {
    heading: "Object Spread Operator",
    brief: "Create a shallow copy of an object.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g transform='translate(2.655 2.284) scale(.98662)' fill='#f1c15d'><circle cx='6.737' cy='285.255' r='1.436'/><circle r='1.436' cy='285.353' cx='14.752'/><circle r='1.436' cy='285.255' cx='10.744'/></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    // random
    let myObj = {
      user: "Johnny",
      password: "ynnhoj5"
    };
    
    // object which extends upon the previous one
    let myExtendedObj = {
      ...myObj,
      color: "silver"
    };
    `
  },
  {
    heading: "Array Rest Operator",
    brief: "Easily access array items.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.84648 0 0 1 8.951 -.3)'><rect width='2.633' height='20.647' x='-9.038' y='273.748' rx='.657' ry='1'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='273.748' height='8.604' width='2.229'/><rect width='2.229' height='8.604' x='292.165' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/></g><g transform='matrix(-.84648 0 0 1 17.56 -.3)'><rect ry='1' rx='.657' y='273.748' x='-9.038' height='20.647' width='2.633'/><rect width='2.229' height='8.604' x='273.748' y='-.816' rx='.556' ry='.417' transform='rotate(90)'/><rect transform='rotate(90)' ry='.417' rx='.556' y='-.816' x='292.165' height='8.604' width='2.229'/></g></g><g fill='#f1c15d'><g transform='matrix(.7043 0 0 .7043 7.829 82.834)'><circle cx='6.737' cy='285.255' r='1.436'/><circle r='1.436' cy='285.353' cx='14.752'/><circle r='1.436' cy='285.255' cx='10.744'/></g><g aria-label='x,' style='line-height:1.25;-inkscape-font-specification:Lato' font-weight='400' font-size='4.825' font-family='Lato' letter-spacing='0' word-spacing='0' stroke-width='.121'><path d='M7.482 283.38l-.898-1.3h.45q.058 0 .084.018.027.018.048.053l.653 1q.024-.073.069-.147l.574-.843q.026-.037.053-.058.026-.024.066-.024h.432l-.899 1.275.936 1.394h-.451q-.058 0-.092-.029-.032-.031-.053-.068l-.672-1.046q-.018.076-.055.137l-.622.909q-.026.037-.058.068-.029.03-.081.03h-.42zM9.376 284.424q0-.06.02-.113.025-.055.064-.095.042-.042.1-.066.058-.023.127-.023.079 0 .14.028.062.03.102.082.042.05.063.119.021.066.021.145 0 .118-.034.247-.034.127-.097.25-.064.127-.158.246-.093.118-.211.218l-.08-.076q-.034-.032-.034-.074 0-.034.037-.071.027-.029.066-.08.042-.046.085-.11.042-.063.076-.14.037-.076.053-.163H9.68q-.068 0-.123-.023-.056-.024-.098-.066-.04-.045-.063-.103-.021-.06-.021-.132z' style='-inkscape-font-specification:Lato'/></g></g></g></svg>",
    snippet: 
    `
    // random array
    let myArr = ["Johnny", "ynnhoj5", "silver", 12];
    
    // desctructure the array to store its items in several variables
    let [name, passowrd, ...rest] = myArr;
    `
  },
  {
    heading: "Function Rest Operator",
    brief: "Handle a flexible number of arguments in a function.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d'><g transform='matrix(.7043 0 0 .7043 7.829 82.834)'><circle cx='6.737' cy='285.255' r='1.436'/><circle r='1.436' cy='285.353' cx='14.752'/><circle r='1.436' cy='285.255' cx='10.744'/></g><g aria-label='x,' style='line-height:1.25;-inkscape-font-specification:Lato' font-weight='400' font-size='4.825' font-family='Lato' letter-spacing='0' word-spacing='0' stroke-width='.121'><path d='M7.482 283.38l-.898-1.3h.45q.058 0 .084.018.027.018.048.053l.653 1q.024-.073.069-.147l.574-.843q.026-.037.053-.058.026-.024.066-.024h.432l-.899 1.275.936 1.394h-.451q-.058 0-.092-.029-.032-.031-.053-.068l-.672-1.046q-.018.076-.055.137l-.622.909q-.026.037-.058.068-.029.03-.081.03h-.42zM9.376 284.424q0-.06.02-.113.025-.055.064-.095.042-.042.1-.066.058-.023.127-.023.079 0 .14.028.062.03.102.082.042.05.063.119.021.066.021.145 0 .118-.034.247-.034.127-.097.25-.064.127-.158.246-.093.118-.211.218l-.08-.076q-.034-.032-.034-.074 0-.034.037-.071.027-.029.066-.08.042-.046.085-.11.042-.063.076-.14.037-.076.053-.163H9.68q-.068 0-.123-.023-.056-.024-.098-.066-.04-.045-.063-.103-.021-.06-.021-.132z' style='-inkscape-font-specification:Lato'/></g></g><g fill='none' stroke='#f1c15d' stroke-width='1.639' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='0'><path d='M8.577 273.547s-6.357-.753-6.357 9.922c0 10.475 6.357 9.923 6.357 9.923M17.934 273.547s6.357-.753 6.357 9.922c0 10.475-6.357 9.923-6.357 9.923' paint-order='stroke fill markers'/></g></g></svg>",
    snippet: 
    `
    // function which considers a variable number of arguments
    function handleAll(name, password, ...args) {
      // log the first two arguments
      console.log(\`name: $\{name}, password: $\{password}\`);
      // log [additional arguments]
      if(args.length !== 0) {
        console.log(\`rest: $\{args}\`);
      }
    }
    
    // working functions
    handleAll("Jonnhy", "yhnnoj5"); 
    handleAll("Jonnhy", "yhnnoj5", "silver", 12);
    `
  },
  {
    heading: "Object.freeze()",
    brief: "Prevent adding or modifying properties.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.542' rx='2' ry='2'/><g fill='#f1c15d' stroke='#f1c15d' stroke-linecap='round' stroke-linejoin='round'><path stroke-width='.8435887200000001' paint-order='stroke fill markers' d='M17.039 283.739v.064H9.472v-.064z'/><path stroke-width='.8435887200000001' paint-order='stroke fill markers' d='M13.288 287.555h-.064v-7.567h.064z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M13.143 281.564l-.107.107-1.065-1.065.107-.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M13.203 279.987l-.114.115-1.177-1.176.115-.115z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M13.263 281.564l.107.107 1.065-1.065-.107-.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M13.203 279.987l.115.115 1.176-1.176-.115-.115z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M13.347 285.978l.107-.108 1.066 1.066-.107.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M13.287 287.554l.115-.115 1.177 1.177-.115.115z'/><g><path stroke-width='.57861534' paint-order='stroke fill markers' d='M13.228 285.978l-.107-.108-1.066 1.066.107.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M13.288 287.554l-.115-.115-1.176 1.177.114.115z'/></g><g><path stroke-width='.48848834' paint-order='stroke fill markers' d='M12.568 283.983l.097.097-.835.835-.097-.097z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M11.049 283.863l.107.107-1.066 1.065-.107-.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M9.472 283.803l.115.114-1.176 1.177-.115-.115z'/><g><path stroke-width='.48848834' paint-order='stroke fill markers' d='M12.568 283.623l.097-.098-.835-.835-.097.098z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M11.049 283.743l.107-.107-1.066-1.065-.107.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M9.472 283.803l.115-.115-1.176-1.176-.115.115z'/></g></g><g><path stroke-width='.48848834' paint-order='stroke fill markers' d='M13.944 283.559l-.098-.098.835-.835.098.098z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M15.462 283.68l-.107-.108 1.066-1.065.107.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M17.039 283.739l-.115-.115 1.177-1.176.114.115z'/><g><path stroke-width='.48848834' paint-order='stroke fill markers' d='M13.944 283.919l-.098.097.835.835.098-.097z'/><path stroke-width='.57861534' paint-order='stroke fill markers' d='M15.462 283.798l-.107.108 1.066 1.065.107-.107z'/><path stroke-width='.62998773' paint-order='stroke fill markers' d='M17.039 283.739l-.115.114 1.177 1.177.114-.115z'/></g></g></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    'use strict'

    // random object
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
    heading: "Object.seal()",
    brief: "Prevent adding properties.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.778' rx='2' ry='2'/><g transform='matrix(-.90127 0 0 .90127 23.689 26.593)'><circle transform='scale(-1 1)' r='4.475' cy='285.595' cx='-11.583' stroke='#f1c15d' stroke-width='1.418' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/><circle cx='-11.583' cy='285.595' r='3.003' transform='scale(-1 1)' fill='#f1c15d' stroke='#f1c15d' stroke-width='.951' stroke-linecap='round' stroke-linejoin='round' paint-order='stroke fill markers'/><path d='M13.534 280.934s-1.32-1.355-2.046-1.355c-.727 0-2.046 1.355-2.046 1.355M13.534 290.292s-1.32 1.355-2.046 1.355c-.727 0-2.046-1.355-2.046-1.355M16.2 283.586s1.354 1.319 1.354 2.046c0 .726-1.354 2.046-1.354 2.046M6.953 283.586s-1.355 1.319-1.355 2.046c0 .726 1.355 2.046 1.355 2.046' fill='#f1c15d'/><path d='M9.846 280.692s-1.89-.025-2.404.489-.49 2.405-.49 2.405M13.306 280.692s1.891-.025 2.405.489c.514.514.489 2.405.489 2.405M13.306 290.571s1.891.025 2.405-.489c.514-.514.489-2.404.489-2.404M9.846 290.571s-1.89.025-2.404-.489-.49-2.404-.49-2.404' fill='#f1c15d'/></g><g><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g></g></g></svg>",
    snippet: 
    `
    'use strict'

    // random object
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
    heading: "Object.assign()",
    brief: "Include in a target object the entry(ies) of source object(s).",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458 26.458'><g transform='translate(0 -270.542)'><rect width='26.458' height='26.458' x='.026' y='270.778' rx='2' ry='2'/><g fill='none' stroke='#f1c15d' stroke-linecap='round'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425s-.24-4.109-3.906-4.109' stroke-width='1.259'/><path d='M9.378 273.547s-4.694-.753-4.694 9.922c0 10.475 4.694 9.923 4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M5.118 279.208s-.24 4.108-3.906 4.108M5.118 287.425c0-.05-.24-5.329-3.906-4.109'/></g><g><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425s.24-4.109 3.906-4.109' stroke-width='1.259'/><path d='M17.133 273.547s4.694-.753 4.694 9.922c0 10.475-4.694 9.923-4.694 9.923' stroke-width='1.559' stroke-linejoin='round' stroke-miterlimit='0' paint-order='stroke fill markers'/><g stroke-width='1.259'><path d='M21.393 279.208s.24 4.108 3.906 4.108M21.393 287.425c0-.05.24-5.329 3.906-4.109'/></g></g></g><g transform='translate(-.446 -.882)'><rect transform='rotate(-12.215)' ry='1' rx='1' y='278.512' x='-52.06' height='6.331' width='10.205' fill='#f1c15d' paint-order='stroke fill markers'/><circle r='2.032' cy='282.59' cx='13.371' fill='#f1c15d' paint-order='stroke fill markers'/><circle r='1.818' cx='13.371' cy='282.59' paint-order='stroke fill markers'/><rect width='9.147' height='5.675' x='-51.531' y='278.84' rx='.896' ry='.896' transform='rotate(-12.215)' paint-order='stroke fill markers'/><circle r='1.461' cy='282.59' cx='13.371' fill='#f1c15d' paint-order='stroke fill markers'/></g></g></svg>",
    snippet: 
    `
    // random object
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
    `
  }

];

export default AppData;