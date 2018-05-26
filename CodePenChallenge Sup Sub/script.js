// target all sup and sub elements
const sup = document.querySelectorAll("sup");
const sub = document.querySelectorAll("sub");

// add an event listener on all sup and sub elements, at which point call a function which removes the choice not made and displays the correct text in a span
sup.forEach(sup => sup.addEventListener("click", displayChoice));
sub.forEach(sub => sub.addEventListener("click", displayChoice));

function displayChoice(e) {
    // target the parent element of the clicked sup/sub element
    let parentSpan = e.target.parentNode;
    
    // include in the HTML of the span element only the text of the clicked sup/sub element, effectively removing the sup/sub elements themselves
    parentSpan.innerHTML = `${e.target.textContent}`;
    // reset the margin altered in the script
    parentSpan.style.marginLeft = `0px`;
    parentSpan.style.marginRight = `0px`;  
}

// loop through all sup elements (which are horizontally pushed to the right of sub elements)
sub.forEach(sub => {
    // consider the width of the sub elements
    let subWidth = sub.offsetWidth;

    // push the sub elements to the left, by a measure equal to their width
    sub.parentNode.style.marginLeft = `-${subWidth}px`;
    // move the connected sup element to the right by an equal amount, making the sup and sub elements coincide to the right edge of the sub elements
    sub.parentNode.querySelector("sup").style.left = `${subWidth}px`;
});

