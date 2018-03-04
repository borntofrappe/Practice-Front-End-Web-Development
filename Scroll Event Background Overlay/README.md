Link to the working pen right [*here*](https://codepen.io/borntofrappe/full/gvydqN/)

## Preface

The goal of this project is to replicate an effect found on the desktop version of [Snipcart.com](https://snipcart.com/). 
The *hero* section of the web page presents here plenty of information with headers, buttons and an image. 
As the visitor scrolls down, away from this introductory area, the section itself is gradually darkened, to become almost completely black as the area goes out of sight.

It is a neat effect to give closure on a portion of the page, and a good excuse to practice one more time the scroll event in JavaScript.

## How to

Instead of actually darkening the hero section of the page, the effect relies on a separate `div` that is overlayed on top of the portion to be darkened.

In the developer console, by inspecting the structure of the HTML document, it is indeed possible to find an empty `div`, located at the end of the hero section with a class `.page-top__overlay` and a `background-color` of a really dark hue. 

As the page scrolls down, the same `div` changes CSS properties, most notably altering the `opacity`, from 0 up to 1.

The effect can be therefore achieved by including a block element on top of the section to be "transitioned" and to alter its opacity in JS, as the scroll event occurs.

# HTML and CSS

In a `div` of class `.hero`, another `div` of class `.dark-overlay` is introduced. This is the empty block element used for the effect.

```HTML
<div class="dark-overlay"></div>
```

The `div` is actually nested *inside* the `.hero` container. This to benefit from absolute positioning and stretch the `div` to cover the complete `height` and `width` of the parent element. It is important to note that for the section to be positioned freely in the parent container, the container itself needs to have position set to relative.

```CSS
.hero {
  position: relative;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

As this element is set to create a dark overlay, the `div` is given a properly dark `background-color`. Opacity is also initialized to 0, as to hide the element by default. By manually altering this value it is already possible to assess how the `div` creates the dark overlay intended for the effect.

```CSS
.dark-overlay {
  background-color: #2c2e31;
  opacity: 0;
}
```

In the CSS, the property of `pointer-events` is finally specified to `none`. This property is actually vital for the effect to occur with less friction (but I cannot get props for including this it, as I found the property in the developer console of the referenced web page, in the styles tab). 

As the `div` is laid **over** the `.hero` container, the element prevents interactions with the structure of the parent container. This property allows to overlay the `div` while avoiding this issue. Visitors can click and interact on the underlying structure regardless of the overlaying `div`.

```CSS
.dark-overlay {
  pointer-events: none;
}
```

And that is all that is required for the HTML and CSS behind the overlay structure. In order to transition the structure itselft, JS needs to react to the scroll event and change its opacity accordingly.

# JS

In JS, the script is set to listen and react to the `scroll` event on the entire window.

```JS
window.addEventListener("scroll", debounce(checkForScroll));
```

As mentioned in the previous two projects on the scroll event, the script responds to the scroll event with a debounce function. Shortly, this intermediary step is used to run the nested function every so often, and not every time the scroll event prompts a reaction.

The `checkForScroll` function is actually where the effect is implemented.

```JS
function checkForScroll() {
}
```

The behavior that the function is trying to implement can be described as follows:

- begin the transition when the distance from the top of the page reaches half of the height of the `.hero` section;
- end the transition when the `.hero` section is completely out of sight.
- in between the two extremes, alter the property of opacity for the `.dark-overlay` `div`. From 0 at the beginning of the transition to 1 at the very end.

A couple of values are therefore required to understand when the page reaches the specified breakpoints.

1. the distance from the top of the page, obtained through the `scrollY` method applied on the `window` element.

  ```JS
  var distanceFromTheTop = window.scrollY;
  ```

2. the height of the `.hero` section, as found through the offsetHeight method implemented on the `div` itself.

  ```JS
  const heroSection = document.querySelector(".hero");
  var heightOfHero = heroSection.offsetHeight;
  ```
  
With the retrieved values, the transition occurs between the specified breakpoints:
- distanceFromTheTop = heightOfHero/2; begin transition, opacity = 0
- distanceFromTheTop = heightOfHero; end transition, opacity = 1

```JS
if(distanceFromTheTop > heightOfHero / 2 && distanceFromTheTop < heightOfHero) {
  // transition opacity .dark-overlay
}
```

In this range we can use the actual difference between distanceFromTheTop (which changes) and heightOfHero / 2 (which does not change) for the change in opacity.
This value increases as the page scrolls down and decreases in the other direction, as the `opacity` of the overlay should.
Unfortunately, this value does not grow from 0 to 1, which are the values accepted by the property of `opacity`.

```JS
if(distanceFromTheTop > heightOfHero / 2 && distanceFromTheTop < heightOfHero) {
  var range = distanceFromTheTop - heightOfHero / 2;
}
```

In order to fix this minor issue, all that is required is to normalize the range. By dividing the difference for the heightOfHero/2, the range changes to the desired 0-1 interval. (distanceFromTheTop - heightOfHero /2) goes in fact from 0 up to heightOfHero/2. Divided by heightOfHero/2 gives the correct range.

```JS
if(distanceFromTheTop > heightOfHero / 2 && distanceFromTheTop < heightOfHero) {
  var range = distanceFromTheTop - heightOfHero / 2;
  var rangeNormalized = range/(heightOfHero/2)
}
```

And it is possible to finally plug this value in the property of opacity for the overlay div.

```JS
const darkOverlay = document.querySelector(".dark-overlay");

if(distanceFromTheTop > heightOfHero / 2 && distanceFromTheTop < heightOfHero) {
  var range = distanceFromTheTop - heightOfHero / 2;
  var rangeNormalized = range/(heightOfHero/2)
  darkOverlay.style.opacity = rangeNormalized;
}
```

Which finally delivers the desired effect. As the screen scrolls in the range, the `opacity` is updated and the overlay is shown on the hero section.


## More on the Page

While the effect is achieved with the described structure, the page does a little more than the bare requirements. I took it as a chance to practice with multiple aspects of front-end development.

- *flex*

  Flex properties are used for the `navigation-bar` and the unecessary sections used to create space for the scroll event to occur. 
  They are especially useful to 
  
  1. stretch items in the parent element; 
  2. easily align elements in their container.
  
  With regards to this last point, it is important to specify the implications of the `justify-content` property. 
  This property is used both in the navigation-bar and the following sections, but with different results. It is in fact used to align items in the *main-axis*, as specified by the *flex-direction* property.
  
  In the case of the `navigation-bar`, `flex-direction` is `row`, by default, and items are thusly aligned in the row. Horizontally.
  
  For the subsequent sections, `flex-direction` is specified to `column`, and items are positioned in the column. Vertically.

- *grid*

  Grid properties are used in the hero section to create a two columns layout. They are also altered in a media query for smaller screen sizes, in which case they manufacture a one column, two rows layout. 
  
  One way to achieve the desired grid structure is through the grid-template-areas and grid-area properties, as specified in a previous project. In this instance, it is possible to create the desired layout simply by specifying how many columns and rows the grid container should have.
  
  For the first structure divide the container into two columns of equal width:
  
  ```CSS
  .hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  }
  ```
  
  For the second divide the container into two rows of equal height:
  
  ```CSS
  .hero {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  }
  ```
  
  Fr, or fractionary unit, is used to create portion of the entire container. In the simple instance, each column/row is set to spread over a fraction of the larger parent element.
  
  Additional grid properties are specified to also align items in their respective containers. This is another helpful possibility allowed by grid. `justify-items` is used to align items along the row. `align-items` along the column.
   
- *scss*

  With the last two projects, the pre-processor SCSS has taken place of the standard CSS syntax. While requiring an additional step in converting the final fine back to a read-able CSS file, the preprocessor does come with advantages which are considerably helpful.

  Among the first characteristics from which the project benefits the following are worth mentioning:

  *variables*

  It is possible to centralize CSS values which can be then used (and re-used) through the styling sheet.

  All that is required is:

  1. declare a variable and store in it the value you wish to use;

  ```SCSS
  $lighter-hue : rgb(246, 247, 248);
  $text-family: 'Lato', sans-serif;
  ```

  2. use the variable by calling it by name and by calling it for a CSS property.

  ```SCSS
  body {
    width: 100%;
    color: $lighter-hue;
    font-family: $text-family;
  }
  ```

  This is especially helpful as modifications are introduced in the style of the page. It is in fact possible to change one value, the centralized value found in the declared variable, to affect every instance in which the variable is used.


  *nested selectors*

  SCSS allows to replicate the parent-to-children logic found in HTML, right in the stylesheet. With this, it is possible to nest CSS selectors to target specific elements nested in the page.

  ```SCSS
  .navigation-bar {
    display: flex;
    li {
      flex-grow: 1;
    }
  }
  ```
  Which is equivalent to

  ```CSS
  .navigation-bar {
    display: flex;
  }
  .navigation-bar li {
      flex-grow: 1;
    }
  ```

  With the nested structure, it is easier to comprehend which properties are applied to which element. It is possible to also create a more efficient structure.

  *extend statements*

  Sometimes CSS property-value pairs come together in their declarations. For instance, to remove the default style of anchor link, the properties of `color` and `text-decoration` are modified in pairs. To lessen the burden on single selectors, what is possible is to store in a block property-value pairs and extend, apply their effect on subsequent elements.

  All that is required is:

  1. declare the statement(s) to be extended

  ```SCSS
  %anchor-link-reset {
    color: inherit;
    text-decoration: none;
  }
  ```

  2. extend the styling to the prescribed elements

  ```SCSS
  a {
    @extend %anchor-link-reset;
  }
  ```

  Which is equivalent to: 

  ```CSS
  a {
    color: inherit;
    text-decoration: none;
  }
  ```

  *color functions*

  Instead of specifying multiple colors, often changing in one particular dimension, such as the color's own opacity, it is possible to use *functions* to modify a standard hue.

  In the project the following functions are used:

    - `rgba(color, amount);` which helps modifying the alpha value, by setting the opacity of the color to the specified amount (in the 0-1 range)
    - `darken(color, amount);` which lowers the lightness of the hue by the prescribed amount (0-100%), moving the color toward black shades.

    There are plenty of functions which help in developing a color palette and with ease, simply by modifying a few color picks.

