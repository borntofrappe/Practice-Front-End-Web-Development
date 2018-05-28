/* 
target 
    the input, from where to retrieve the markdown
    the create-index button, which prompts the creation of the index
    the copy-index button, which promts the copy of the index to the clipboard
    the output, in which to show the index based on the markdown text
*/

const input = document.querySelector("textarea.input-area");
const buttonIndex = document.querySelector("button.create-index");
const buttonCopy = document.querySelector("button.copy-index");
const output = document.querySelector("textarea.output-area");

// define a regex to find a header (a header made up of up to six pound # signs and one or more words afterwords)
const regexHeaders = /#{1,6} (\w+)( \w+)*/g;

// when clicking the create-index button, consider the value of the input textarea
buttonIndex.addEventListener("click", checkForHeaders);

// when the output text area changes in value, visually remark its click-able nature depending on the value itself
output.addEventListener("input", checkForOutput);

// create a function which checks if in the input textarea there are headers, in which case prompt the creation of an index
function checkForHeaders() {
    // store in a variable the text of the textarea element
    let inputValue = input.value;

    // if in the textarea element there is a header proceed to create an index and enable a copy of the index
    if(regexHeaders.test(inputValue)) {
        // call a function which creates the index, taking as argument the headers found in the textarea element 
        createIndex(inputValue.match(regexHeaders));

        // make the copy button visually click-able
        buttonCopy.classList.add("enabled");
        // listen for a click event on the copy button
        buttonCopy.addEventListener("click", copyIndex);
    }
    // display a message if no header is found in the textarea element (useful in de-bugging)
    // remove the possibility to copy the index
    else {
        output.value = "No headers found";
        buttonCopy.classList.remove("enabled");
        buttonCopy.removeEventListener("click", copyIndex);
    }
}

// create a function which takes as input an array of headers and outputs an index based on them
function createIndex(headers) {
    // empty the output textarea from eventual pre-existing text
    output.value = "";

    // loop through the array of headers
    for(let i = 0; i < headers.length; i++) {
        // consider the last position of the pound sign #
        // store in a variable the position of the pound sign
        let indexOfPound = headers[i].indexOf("#");
        // create a variable in which to store the position of the last pound sign (used to consider the text of the headers only)
        let lastIndexOfPound;
        // create a variable in which to store the number of pound signs (used to consider the indentation of the headers in the output list)
        let count = 0;

        // while there is a pound sign in the header
        while(indexOfPound !== -1) {
            // increment the number of pound signs
            count++;
            // store in the last instance the position of the current pound sign
            lastIndexOfPound = indexOfPound;
            // look for another pound sign in the rest of the string (in the following iteration, if present, this value is stored in lastIndexOfPound)
            indexOfPound = headers[i].indexOf("#", indexOfPound + 1);
        }

        // consider the text portion of the header (2 places away from the last pound sign #, since there is a whitespace between the pound sign and the first letter of the header)
        let headerTitle = headers[i].slice(lastIndexOfPound+2);
        // consider the lowercase version of the header
        let headerReference = headerTitle.toLowerCase();
        // remove the whitespace from the reference and substitute it with a hyphen sign -
        headerReference = headerReference.replace(/ /g, "-");

        // create a variable to indent headers, if need be
        let tabIndent = "";
        // for every extra pound sign #, include a tab character in the tabIndent variable
        for(let i = 1; i < count; i++) {
            tabIndent += "\t";
        }

        // include the header in the output textarea, as a list item with the reference-able header
        // include a new line following each header
        output.value += `${tabIndent}- [${headerTitle}](#${headerReference})\n`;
    }
}

// create a function which copies the text present in the output textarea element
function copyIndex() {
    output.select();
    document.execCommand("copy");
    // remove the value of the output textarea element
    output.value = "";
}