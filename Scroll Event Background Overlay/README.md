Link to the working pen right [*here*](https://codepen.io/borntofrappe/full/gvydqN/)

## Preface

The scope of the project is to replicate an effect found on the desktop version of [Snipcart.com](https://snipcart.com/). 
The hero section of the web page presents here plenty of information with headers, buttons and an image. 
As the visitor scrolls down, away from this section, the section itself is gradually darkened, to become almost completely black as the area goes out of sight.

It is a neat effect to give closure on a portion of the page, and a good excuse to practice one more time the scroll event in JavaScript.

## How to

Instead of actually darkening the hero section of the page, the effect relies on a separate `div` that is overlayed on top of the portion to be darkened.

In the developer console, by inspecting the structure of the HTML, it is indeed possible to find an empty `div`, located at the end of the hero section with a class `.page-top__overlay` and a `background-color` of a really dark hue. 

As the page scrolls down, the same `div` is seen modified in its styling, most notably changing the property of `opacity`, from 0 up to 1.

The effect can be therefore achieved by including a block element on top of the section to be "transitioned" and to alter its opacity in JS, as the scroll event occurs.

# HTML and CSS

In a `div` of class `.hero`, another `div` of class `.dark-overlay` is introduced. This is the empty block element used for the effect.

```HTML
<div class="dark-overlay"></div>
```

The `div` is actually nested *inside* the `.hero` container. This to benefit from absolute positioning and stretch the `div` to cover the complete `height` and `width` of the parent element.

```CSS
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

As this element is set to create a dark overlay, the `div` is given a properly dark `background-color`. Opacity is also initialized to 0, as to hide the element by default. By altering this value it is possible to assess how the `div` creates the dark overlay intended for the effect.

```CSS
.dark-overlay {
  background-color: #2c2e31;
  opacity: 0;
}
```

In the CSS, a property of `pointer-events` is finally specified to `none`. This property is actually vital for the effect to occur with less friction (but I cannot get props for including this property, as I found it on the referenced web page itself, always in the developer console, in the styles tab). 

As the `div` is laid **over** the `.hero` container, the element prevents interactions with the structure of the parent container. This property allows to overlay the `div`, while at the same time allowing visitors to click and interact on the underlying structure.

```CSS
.dark-overlay {
  pointer-events: none;
}
```

What is required is then to change the property of `opacity` through JS, in response to the scroll event.

# JS

In JS, the script is set to listen and react to the `scroll` event on the entire window.

```JS
window.addEventListener("scroll", debounce(checkForScroll));
```

As mentioned in the previous two projects on the scroll event, the script responds to the scroll event with a debounce function. This intermediary step is used to run the nested function every so often, and not every time the scroll event prompts a reaction.

The `checkForScroll` function is actually where the effect is implemented.

```JS
function checkForScroll() {
}
```

The behavior that the function is trying to implement can be described as follows:

- begin the transition when the distance from the top of the page reaches half of the height of the `.hero` section;
- end the transition when the `.hero` section is completely out of sight.
- in between the two extremes, alter the property of opacity for the `.dark-overlay` `div`. From 0 in the beginning of the transition to 1 at the very end.

A couple of values are therefore required to understand when the page reaches the specified breakpoints.

1. the distance from the top of the page, obtained through the `scrollY` method applied on the `window` element.

  ```JS
  var distanceFromTheTop = window.scrollY;
  ```

2. the height of the `.hero` section, as found through the offsetHeight method implemented on the div itself.

  ```JS
  const heroSection = document.querySelector(".hero");
  var heightOfHero = heroSection.offsetHeight;
  ```
  

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
  
  Additional grid properties are specified to also align items in their respective containers. This is another helpful possibility allowed by grid. Justify-items is used to align items along the row side. Align-items along the column.
   

- *pseudo-elements*

- *absolute-positioning*

- *scss*



