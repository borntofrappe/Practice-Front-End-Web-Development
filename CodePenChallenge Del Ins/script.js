/*
unfortunatly, I have no easy way of discovering which word is actually clicked in a paragraph element
that is why as soon as the page loads, the scripts takes the text and the paragraph and splits each word into its own separate span element
afterwards, it's a matter of targeting the specific span which is clicked
*/

// target the paragraph element and its text
const paragraph = document.querySelector(".container__text p");
const textParagraph = paragraph.textContent;

// define a regex for a word (a sequence of word characters however long)
const regexWord = /\w+/g;
// store in a variable the text in which every word is wrapped in a span, as per the instruction of the wrapInASpan function
const spanTextParagraph = textParagraph.replace(regexWord, wrapInASpan);

// declare a function which takes the match as argument and returns it nested in a span element
function wrapInASpan(match) {
    return "<span>" + match + "</span>";
}
// alter the content of the paragraph with the modified text
paragraph.innerHTML = spanTextParagraph;


/*
with the commented setup, the text of each span is highlighted/erased depending on the option selected in the settings' panel (highlight by default)
*/
// target button which toggles the appearance of the settings and the settings panel itself
const toggleSettings = document.querySelector(".container__toggle-settings");
const settingsPanel = document.querySelector(".container__settings");

// on click call a function to toggle the panel's visibility
toggleSettings.addEventListener("click", toggleSettingsPanel);

// declare a function which adds and removes the class of .active to the settings' panel, pushing it into/out of view
function toggleSettingsPanel() {
    settingsPanel.classList.toggle("active");
}



/*
once the panel is visible
when selecting an option, the class of .active is added to the respective SVG asset and removed from the other
moreover, a boolean variable is updated declaring which option is selected (used later in the script)
*/
let isHighlight = true;

const highlighter = document.querySelector(".container__settings .highlighter");
const eraser = document.querySelector(".container__settings .eraser");

highlighter.addEventListener("click", () => {
    highlighter.classList.add("active");
    eraser.classList.remove("active");
    isHighlight = true;
    
});
eraser.addEventListener("click", () => {
    highlighter.classList.remove("active");
    eraser.classList.add("active");
    isHighlight = false;
});

/*
with the defined setup, with the chosen option, what is left is style the text as it is clicked
*/

// listen for a click event on the paragraph, with an action delegated on a span element
// this allows to consider however many words there might be in the paragraph
paragraph.addEventListener("click", styleText);

function styleText(e) {
    // e.target provides the exact element with which the click event interacts
    // e.target.localName provides the string pertaining to the HTML element (p, span)

    // if the element clicked is a span
    if(e.target.localName == "span") {
        // if the option selected is highlight
        if(isHighlight) {
            // wrap the span element in a <ins> element
            e.target.innerHTML = "<ins>" + e.target.textContent + "</ins>";
        }
        else {
            // else wrap the span element in a <del> element
            e.target.innerHTML = "<del>" + e.target.textContent + "</del>";
        }   
    }
    // if the element is a ins or del element, try and remove the ins and del tags
    if(e.target.localName == "ins" || e.target.localName == "del") {
        // e.target gives the ins or del element
        // e.target.parentElement returns the span 
        // e.target.textContent (or e.target.parentElement.textContent for that matter), gives the text nested inside
        // the idea is to change the parent element as to include the text only, without additional html elements
        e.target.parentElement.innerHTML = e.target.textContent;
    }
}


/*
beside the first two mutually exclusive options, the panel provides two icons to 
1. change the color of the highlight 
1. copy the highlighted text to the clipboard

for the first task, the script is required to listen for the input type="color" and change the CSS variable --highlighter-color 
for the second, the script should copy to the clipboard the text which is stored in the <ins> elements. All of them. Moreover, there should be some kind of visual confirmation that the action has taken place 
*/

// target the input
const inputTypeColor = document.querySelector(".container__settings input[type='color']");
// listen for an input event on the input, at which point trigger a function to change the color of the highlight
inputTypeColor.addEventListener("input", changeHighlightColor);

function changeHighlightColor(e) {
    // e.target.value returns the color chosen by the color picker 
    // color as a string of 7 characters, representing the hex code (like #ffff00)
    
    // target the root element 
    const root = document.querySelector(":root");
    // change the value of the CSS variable to this new color
    root.style.setProperty("--highlighter-color", e.target.value);
}

// target the copy text icon
const clipboard = document.querySelector(".container__settings .copy-text");
// listen for a click on the svg asset, at which point copy the selected text to the clipboard
clipboard.addEventListener("click", extractSelectedText);

function extractSelectedText() {
    // select all the highlighted sections in the paragraph (returns a node list, even if no selection is present (empty node list))
    let ins = paragraph.querySelectorAll("ins");
    // create an empty string in which to store all selections
    let selection = "";

    if(ins.length != 0) {
        // loop through the node list 
        for(let i = 0; i < ins.length; i++) {
            // add each selection in the created variable, including a space between each finding
            selection += ins[i].textContent + " ";
        }
        // with substr, remove the final whitespace, obtaining the exact selection to be copied to the clipboard
        let returnSelection = selection.substr(0,selection.length-1);   
        // call a function to copy the selected text 
        copySelectedText(returnSelection);
    }

}

// JS allows to easily copy the text found in a text area, through the execCommand() method
// one rough way to therefore copy the text is to create a textarea, include the selected text in it and copy the selection
// immediately afterwards, it is possible to remove the textarea element without losin the copied value
function copySelectedText(text) {
    let textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    // select text
    textarea.select();
    // copy to clipboard
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
