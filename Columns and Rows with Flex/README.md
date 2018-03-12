Link to the working pen right [here](https://codepen.io/borntofrappe/full/EEjOgy/).

### Preface

The purpose of this project is to replicate a nice layout first seen in the web page for [Station](https://getstation.com/).

The page is here structured in two columns, one scrollable, one not.
Moreover, the latter section changes its appearance when the scrollable portion reaches certain breakpoints.

All this niceties are however just for the desktop version of the page.

Building on top of this already neat design, the layout is in fact altered for smaller screen sizes. In this instance, the content present in the left and right columns is displayed in a single vertical container.

I previously thought this effect was achieved with **CSS grid**, but by looking at the developer console, the layout is created with **flex** properties. It might be beneficial to try and  achieve the effect with both layout techniques, for practice.

# Flex

The property of `width` is used in pairs with `flex` properties to section the page into two columns. Here it is used on each *flex item* to set the initial width, creating a 30-70 split.

```HTML
<div class="container">
  <div class="left-column"></div>
  <div class="right-column"></div>
</div>
```

```CSS
.container {
  height: 100vh;
  display: flex;
}
.left-column {
  background-color: hsl(100, 60%, 60%);
  width: 30%;
}
.right-column {
  background-color: hsl(200, 60%, 60%);
  width: 70%;
}
```

*Minor warning*: `background-color` properties are specified just to visually test the layout. It's an alternative to populate each container with actual content.

For the mobile version, all that is required is to flip the `flex-direction` of the container. In addition to this change, the property of `flex-basis` is specified for both items, as to specify the amount of space to occupy by default.

```CSS
@media only screen and (max-width: 800px) {
  .container {
    flex-direction: column;
  }
  .left-column {
    flex-basis: 70%;
  }
  .right-column {
    flex-basis: 30%;
  }
}
```

In this instance, the left column container is set to occupy 70% of the parent container (70vh). While the right column occupies the remaining space.

When moving across screen sizes on [Station](https://getstation.com/) it is also possible to asses how the contents of the right column, in the desktop version, are actually shown before the content of the left column in the single-column layout. This does not occur by default, as the items are laid according to the HTML structure. That being said, the default behavior can be modified with the `order` property, which moves the flex items despite their semantic HTML declaration. The higher the order value, the later the flex item is displayed on screen.

```CSS
.left-column {
  order: 1;
}
```

In this instance, the left column is displayed *after* the right column, having a higher specified order value.

# Scroll

The vertical scroll visible in the left column is actually allowed by multiple containers stacked on top of each other, instead of a single, really tall `div`. This also helps in the small screen's layout, as each section is easily and intermittently placed in the page.

The riddle of the page is actually how to implement this vertical scroll while maintaining the right column seemingly immovable.

This effect appears to be achieved by modifying the property of `position` for the right column, setting a value of `fixed`. As the right column is stuck on the window, the scroll occurs seemingly on the left column only, while it is in fact the entire page which moves vertically.

What is then required is to alter the appearance, content of the right column as the scroll event occurs, which is something achievable in JavaScript.

For the fixed container, the following CSS properties allow for the right column container to be fixed in its original position.

```CSS
.container .right-column {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}
```

As the `div` element is "fixed" to the top right, it occupies no vertical space. This is because of the lack of content in the container. To spread the right column and cover the prescribed height, both the properties of top and bottom are set to 0. This allows the `div` to stretch from the top to bottom of visible area.

## Actual Scroll

To allow visitors to actually scroll through the page, additional elements are to be included in the page.

A choice is made to replicate the structure just documented, including additional `.container` elements with the same divide in two columns.

```HTML
<div class="container container-one">
  <div class="left-column"></div>
  <div class="right-column"></div>
</div>

<div class="container container-two">
  <div class="left-column"></div>
  <div class="right-column"></div>
</div>

<!-- additional containers  -->
```

What this structure achieves, by applying the same layout properties in the CSS, is a first approximation of the final result. 
As content is included in each container, and the `background-color` altered for testing is changed accordingly, the page now provides a structure in which one scroll-able section contains the relevant information and the other section displays connected visuals.

```CSS
.container {
  height: 100vh;
  display: flex;
}
.container .left-column {
  width: 30%;
}
.container .right-column {
  width: 70%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}
```

All `.container` elements occupy 100vh of vertical space. Each `div` is split into two sections, one of which is fixed to the right side of the page.

By setting different `background-color` values for each column of the different container it is also possible to analyze how the right column actually displays the content found in the *last* declared container. Evidently, `div` elements sharing the `position` of `fixed` are stacked on top of each other depending on the order in which they are declared.

This behavior can be altered through the property of `z-index`. A higher value of this property can be in fact used to overlay a specific element on top of another. The effects of the value itself can be manually tested in CSS, but the property can also be modified in JS, exactly to realize the purpose of the project dynamically.

The logic is simple:

- set breakpoints corresponding to HTML elements in the left column. In the simple example breakpoints are set to be each of the container fouund in the left column;

- listen for the scroll event on the window;

- as the scroll event reaches a defined breakpoint, change the `z-index` property for the container in the right section you wish to display.

## Actual JS

In the script for the page, JS is set to listen for the scroll event.

```JS
window.addEventListener("scroll", debounce(checkForScroll));
```

In response to this event, JS fires off a debounce function which executes a prescribed block of code every so often.

As mentioned on previous projects, this additional step of including the debounce function is to improve the performance of the page. Without its inclusion, the scroll event would prompt the execution of the function too frequently. You can read more on it right [here](https://davidwalsh.name/javascript-debounce-function).
The `checkForScroll` function is actually where the logic behind the project is implemented. 

The functionality of the script, in a first rough version, is implemented as follows:

1. target all the elements required for the effect. These include the `div`s for the right columns, as JS needs to alter their property of `z-index`, but also the `div`s for the left-columns, as JS needs to asses when the page scrolls past their introduction. All the left columns except the first one, as this is immediately present on the page and isn't set to prompt any effect. 

    ```JS
    // target the left-columns for all containers following the first one
    const leftColumnContainerTwo = document.querySelector(".container-two .left-column");
    const leftColumnContainerThree = document.querySelector(".container-three .left-column");
    const leftColumnContainerFour = document.querySelector(".container-four .left-column");

    // target all the right-columns
    const rightColumnContainerOne = document.querySelector(".container .right-column");
    const rightColumnContainerTwo = document.querySelector(".container-two .right-column");
    const rightColumnContainerThree = document.querySelector(".container-three .right-column");
    const rightColumnContainerFour = document.querySelector(".container-four .right-column");
    ```

1. in response to the scroll event, compute the distance from the top of the page to the center of the visible area. This value changes as the visitor scrolls through the page. The choice to consider the center of the visible area is made as to allow for the transition to occur for the last container as well. In practice, the value is tailored to the page's needs.

    ```JS
    function checkForScroll(event) {
      var distanceFromBottomToTop = window.scrollY + (window.innerHeight / 2);
    }
    ```

1. compute the breakpoints. These are values which are compared to the distance from the top of the page, in order to trigger an appropriate response.

    ```JS
    function checkForScroll(event) {
      var distanceFromBottomToTop = window.scrollY + (window.innerHeight / 2);
      var distanceFromLeftColumnContainerTwo = leftColumnContainerTwo.offsetTop,
          distanceFromLeftColumnContainerThree = leftColumnContainerThree.offsetTop,
          distanceFromLeftColumnContainerFour = leftColumnContainerFour.offsetTop;
    }
    ```
  
1. as the distance from the top of the page surpasses each breakpoint, alter the property of z-index to show one of the targeted div on top.

    For instance:

    ```JS
    function checkForScroll(event) {
      var distanceFromBottomToTop = window.scrollY + (window.innerHeight / 2);
      var distanceFromLeftColumnContainerTwo = leftColumnContainerTwo.offsetTop,
          distanceFromLeftColumnContainerThree = leftColumnContainerThree.offsetTop,
          distanceFromLeftColumnContainerFour = leftColumnContainerFour.offsetTop;

      if(distanceFromBottomToTop > distanceFromLeftColumnContainerTwo) {
        rightColumnContainerOne.style.zIndex = "0";
        rightColumnContainerTwo.style.zIndex = "1";
        rightColumnContainerThree.style.zIndex = "0";
        rightColumnContainerFour.style.zIndex = "0";
      }
    }
    ```

With this example, the page is set to display the second column as the scroll event surpasses the respective container, realizing the desired effect.

--- 

**Be warned**

As multiple `if` statements are included for the following containers, it is important to stress the actual order with which each expression is tested.
An erroneous structure may in fact prevent the appropriate code of block to be executed.

For instance, with this structure the second branch is never actually executed:

```
if(distanceFromBottomToTop > distanceFromLeftColumnContainerTwo) {
  rightColumnContainerOne.style.zIndex = "0";
  rightColumnContainerTwo.style.zIndex = "1";
  rightColumnContainerThree.style.zIndex = "0";
  rightColumnContainerFour.style.zIndex = "0";
}
else if(distanceFromBottomToTop > distanceFromLeftColumnContainerThree) {
  rightColumnContainerOne.style.zIndex = "0";
  rightColumnContainerTwo.style.zIndex = "0";
  rightColumnContainerThree.style.zIndex = "1";
  rightColumnContainerFour.style.zIndex = "0";
}
```

As any value which fulfills the second condition actually fulfills the first comparison as well, the script never reaches the desired branch. 
Therefore, It is paramount to be careful with the order of this type of conditionals, and reason on the flow of the script from top to bottom, mentally execuing the logic behind the branches. 
 
---

Placing all conditionals together, the function roughly looks as follows:

```JS
function checkForScroll(event) {
  // get distance from the top of the page to the center of the visible area
  var distanceFromBottomToTop = window.scrollY + (window.innerHeight / 2);

  // get breakpoints consisting of the vertical distance from the top to the containers height
  var distanceFromLeftColumnContainerTwo = leftColumnContainerTwo.offsetTop,
      distanceFromLeftColumnContainerThree = leftColumnContainerThree.offsetTop,
      distanceFromLeftColumnContainerFour = leftColumnContainerFour.offsetTop;

  // alter the property of z-index when the ditance from the top surpasses the defined breakpoints
  if(distanceFromBottomToTop > distanceFromLeftColumnContainerFour) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "1";
  }
  else if(distanceFromBottomToTop > distanceFromLeftColumnContainerThree) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "1";
    rightColumnContainerFour.style.zIndex = "0";
  }
  else if(distanceFromBottomToTop > distanceFromLeftColumnContainerTwo) {
    rightColumnContainerOne.style.zIndex = "0";
    rightColumnContainerTwo.style.zIndex = "1";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "0";
  }
  else {
    rightColumnContainerOne.style.zIndex = "1";
    rightColumnContainerTwo.style.zIndex = "0";
    rightColumnContainerThree.style.zIndex = "0";
    rightColumnContainerFour.style.zIndex = "0";
  }
}
```

The function itself has room for improvements, as immediately visible from the repetition in the blocks of code. But without further confidence in my JS skills, it will suffice for the moment.

It does [accomplish](https://codepen.io/borntofrappe/full/EEjOgy/) the [purpose](getstation.com) it is set to fulfill, however rough the implementation may appear.
