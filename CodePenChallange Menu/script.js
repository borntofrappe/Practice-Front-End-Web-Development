// create an array of five nested arrays, with no two arrays carring the same two values
let randomArr = [];

// initialize a boolean which allows to keep creating an array of five nested arrays, until all nested arrays carry different values 
let isDuplicate = false;
do {
    // populate the arrays with two items each, one random number between 1 and 5, one random number between 1 and 3
    for(let i = 0; i < 5; i++) {    
        let itemOne = Math.floor(Math.random()*5) + 1;
        let itemTwo = Math.floor(Math.random()*3) + 1;
        let itemArray = [itemOne, itemTwo];
        // include the arrays in the main array
        randomArr.push(itemArray);
    }
    // loop through the array
    for(let i = 0; i < randomArr.length - 1; i++) {
        // set the boolean isDuplicate to false, to avoid an infinite loop
        isDuplicate = false;
        // store in an array the first nested array 
        let arrOne = randomArr[i];
        // loop through the rest of the array
        for(let j = i + 1; j < randomArr.length; j++) {
            // store each subsequent nested array in a variable
            let arrTwo = randomArr[j];
            // if the two nested arrays have the same values in both indexes
            if(arrOne[0] == arrTwo[0] && arrOne[1] == arrTwo[1]) {
                // set isDuplicate to true, running the function one more time 
                isDuplicate = true;
                // re-initialize the array to an empty array
                randomArr = [];
            }
        }
    }
} while(isDuplicate);



// initialize a variable which is updated at each iteration of the for each loop
let counter = 0;
// target all the list items nested in the first ordered list
const mainOptions = document.querySelectorAll("nav > ol > li");
console.log(mainOptions);
// loop through the selection
mainOptions.forEach(mainOption => {
    // add a click listener to each list item, to flip the card and show it clicked and/or to show additional options
    mainOption.addEventListener("click", showOptions);
    
    // store in different variables the column and row values created with the random array
    let columnStart = randomArr[counter][0];
    // as the list items are supposed to cover one cell only, increment each random value by one
    let columnEnd = columnStart + 1;

    let rowStart = randomArr[counter][1];
    let rowEnd = rowStart + 1;

    // for each option, update the grid properties to have the option occupy a random, single cell of the page
    mainOption.style.setProperty("--grid-column", `${columnStart}/${columnEnd}`);
    mainOption.style.setProperty("--grid-row", `${rowStart}/${rowEnd}`);
 
    // increment the counter variable to have subsequent options track subsequent random and unique points
    counter++;
});


// declare a function which applies the class of .pressed to the pressed list item
function showOptions(e) {
    // as the target of the click event might be the list item, but also the nested anchor link element
    // store in a variable the list item, if this was indeed the pressed target
    // otherwise store the parent element, if the nested anchor link was pressed 
    let target = (e.target.classList.contains("menu-item")) ? e.target : e.target.parentElement;
    
    // if the same list item is already pressed, remove the class from the same
    if(target.classList.contains("pressed")) {
        target.classList.remove("pressed");

    }
    // else remove it from all, but the pressed list item
    else {
        mainOptions.forEach(mainOption => mainOption.classList.remove("pressed"));
        target.classList.add("pressed");
    }
    
}
