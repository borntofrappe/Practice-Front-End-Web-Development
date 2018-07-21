// include variables for the cards: the suit, value and color 
const cardSuit = ["♦","♥","♣","♠"];
const cardValue = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cardColor = ["#DD5964", "#483F50"];

// include an object for the hypothetical blog posts, with keys for the title, subtitle and short description
const blogPosts = {
    title: [
        "Markdown",
        "Pseudo CSS",
        "CSS Animation",
        "CSS Variables",
        "CSS Gradients",
        "CSS Flex",
        "CSS Grid",
        "Gulp",
        "Stylus"
    ],
    subtitle: [
        "Write readable docs with markdown syntax",
        "Access another dimension of HTML elements",
        "Animate HTML elements in your stylesheet",
        "Custom properties to the resque",
        "More choices than a single solid color",
        "Easily position elements in rows and columns.",
        "Display HTML elements with the help of a grid",
        "Automate tedious and time-consuming tasks",
        "Empower CSS syntax with a preprocessor"
    ],
    description: [
        "By saving a file with a markdown extension, or md, it is possible to access very useful features. With the inclusion of few commands, these features allow to write text which is equally read-able and easy to write and edit.",
        "With every HTML element comes a pair of pseudo-element, namely :after and :before. These allow to include content directly with CSS, be it text or a CSS-crafted visual. A few examples may clear the advantage of this feature.",
        "CSS allows to animate HTML elements through the animation property and the keyword @keyframes. The former describes the pace of the animation while the latter describes the behavior taken by the animated element.",
        "If you have ever used CSS preprocessors, such as stylus or SASS, you might have enjoyed the inclusion of variables. In its latest version, CSS include the same construct, with the addition of markedly useful features.",
        "The properties of background and background-image allow to include gradients. Be it linear, radial, of different colors, of the same hue, these provide plenty of opportunities when it comes to style",
        "Flex properties allow to easily place HTML elements in the viewport of a webpage. By including the property of display set to flex, it is already possible to obtain a flex container, which itself nests flex items.",
        "CSS grid provides the latest and most comprehensive set of properties to place HTML elements around the page. Simply adding the property of display and changing its value to grid allows to include grid containers and grid items.",
        "Gulp is an extremely helpful task runner, which allows to automatically run tasks. Think of preprocessors like stylus or sass: Gulp can help to directly compile their syntax to CSS. Think of images: Gulp can optimize their size.",
        "Preprocessors allow to take what good is achieved by CSS syntax and include mightily useful features, such as variables, mixins, functions and extra operators. This article tries to summarise some of these features, regarding the preprocessors Stylus."
    ]
};

// target the button which allows to refresh the contents of the card
const button = document.querySelector(".container button");
// listen for a click event on the button, at which point refresh the contents of the card
button.addEventListener("click", showNewBlogPost);

// target the HTML elements affected when the card is refreshed
// card, to be animated with the addition/removal of a class
const cardElement = document.querySelector(".container .card");
// title, subtitle, description, to be changed in text
const titleElement = document.querySelector(".container .card .card__content h1");
const subtitleElement = document.querySelector(".container .card .card__content h3");
const descriptionElement = document.querySelector(".container .card .card__content p");

// describe a function which refreshes the contents of the card
function showNewBlogPost() {
    // create random numbers to access a random item in the arrays for the card suit, value and color
    let randomSuit = Math.floor(Math.random()*cardSuit.length);
    let randomNumber = Math.floor(Math.random()*cardValue.length);
    let randomSuitColor = Math.floor(Math.random()*cardColor.length);

    // change the custom properties to describe the item selected with the random number
    // --card needs to nest values in between quotes, as to include the value for the content property
    cardElement.style.setProperty("--card", `\"${cardSuit[randomSuit]} ${cardValue[randomNumber]}\"`);
    cardElement.style.setProperty("--suit", cardColor[randomSuitColor]);

    // create a random number to access a random (hypothetical) article
    let randomBlogPost = Math.floor(Math.random()*blogPosts.title.length);

    // create variables which store the title, subtitle, description of the randomly selected article
    let title = blogPosts.title[randomBlogPost];
    let subtitle = blogPosts.subtitle[randomBlogPost];
    // include a subset of the description
    let description = blogPosts.description[randomBlogPost].substr(0, 147) + "...";

    // include in the selected HTML elements the values stored in the variables
    titleElement.textContent = title;
    subtitleElement.textContent = subtitle;
    descriptionElement.textContent = description;

    // add a class to the card element which animates the card as it is refreshed
    // after 0.2s remove it
    cardElement.classList.add("card--refresh");
    let timeoutID = setTimeout(function() {
        cardElement.classList.remove("card--refresh");
        clearTimeout(timeoutID);
    }, 200);
}