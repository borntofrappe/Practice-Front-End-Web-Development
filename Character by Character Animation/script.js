// consider the header of the page
const header = document.querySelector(".container h1");

// store in a variable the text of the header
let headerText = header.textContent;
// store in an array each separate character (spaces included)
let headerTextArray = headerText.split("");

// loop through how many items are in the array
for(character in headerTextArray) {
    // modify the array to include each character in between span tags
    // with a class of animation
    headerTextArray[character] = `<span class="animation">${headerTextArray[character]}</span>`;
}

// include in the header the characters, nested in between span elements
// .innerHTML considers HTML markup (unlike .textContent)
header.innerHTML = headerTextArray.join("");

// target all span elements
const spans = document.querySelectorAll("span");

// initialize a delay variable for the first animation
let delay = 1.4;
spans.forEach(span => {
    // for each subsequent span include a larger delay, creating a sort of "waving" animation
    delay += 0.1;
    span.style.animationDelay = `${delay}s`;
});