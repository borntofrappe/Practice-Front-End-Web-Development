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

