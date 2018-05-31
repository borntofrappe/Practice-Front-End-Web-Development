// target all div containing the options
const cardOptions = document.querySelectorAll(".container .card .card__option");
// target all dd elements
const cardOptionsDescriptions = document.querySelectorAll(".container .card .card__option dl dd");
// target all span elements
const cardOptionsSpans = document.querySelectorAll(".container .card .card__option span");

// listen for a click event on each div containing each option, at which point call a function which displays the description of the clicked option 
cardOptions.forEach(cardOption => {
    cardOption.addEventListener("click", handleClick);
});

// create a function which takes as argument the (click) event and calls a function to display the correct option
function handleClick(e) {
    // pass as argument the HTML node actually clicked (this may be the div.card__option, but also one of its nested items, such as the dt, or span elements nested within)
    displayOption(e.target);
}

function displayOption(targetClick) {
    // store in a variable the clicked element, and update it in a loop in order to find the parent div.card__option
    let target = targetClick;

    // until the target is not the parent div.card__option (technically until the element contains a class of .card__option)
    while(!target.classList.contains("card__option")) {
        // update the element to go up a node
        target = target.parentNode;
    }

    // target the description element of the clicked div.card__option
    let descriptionTarget = target.querySelector("dd");

    // target the span element of the clicked div.card__option
    let spanTarget = target.querySelector("span");

    // if the dd element already has a class of active, remove it 
    // additionally reset the background of the parent container and add the plus sign + back
    if(descriptionTarget.classList.contains("active")) {
        target.style.background = "none";
        descriptionTarget.classList.remove("active");
        spanTarget.textContent = "+";
        
    }
    // otherwise call a function to remove the class of active from all options and add it exclusively to the only div.card__option 
    // additionally, style the parent container by changing its background and remove the plus sign from the nested span
    else {
        removeOptions();
        target.style.background = "rgba(0,200,0,0.2)";
        descriptionTarget.classList.add("active");
        spanTarget.textContent = " ";
    }
}

// create a function which removes the class of active from all dd elements 
// additionally reset the background of the parent container and restore the plus sign + on all span elements
function removeOptions() {
    cardOptions.forEach(cardOption => cardOption.style.background = "none");
    cardOptionsSpans.forEach(cardOptionsSpan => cardOptionsSpan.textContent = "+");
    cardOptionsDescriptions.forEach(cardOptionsDescription => cardOptionsDescription.classList.remove("active"));
}