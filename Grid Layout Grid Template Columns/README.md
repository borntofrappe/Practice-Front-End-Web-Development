Link to the working pen righ [here](https://codepen.io/borntofrappe/full/vRLZmm/).

Images courtesy of [Pexels.com](https://www.pexels.com/search/tools/).

## Preface

The purpose of this project is to flex some muscles exercising with CSS grid properties. It is also an excuse to group together several useful resources to truly understand CSS grid.

These are the properties through which I personally went and I am currently going. They are, in absolutely not random order:

- A course broadcasted by Wes Bos on [CSS Grid](https://cssgrid.io/);
- A section of the beta curriculum for [freeCodeCamp](https://beta.freecodecamp.org/en/challenges/css-grid/introduction-to-the-css-grid-challenges);
- A comprehensive list of grid properties and their effect on the page, by [CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/);
- MDN developer's docs, providing plenty of [helpful documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

A last section is also added to promote a simple message: no matter how much material can be read and studied, there's no substitute for actually experimenting with the logic behind the layout scheme.

Trying things out, perhaps directly on CodePen, is the best tool to get acquainted with the subject and even understand the logic and minutia behind it.

## Lessons learned 

### It is remarkably easy to create a nice layout with a couple of grid properties. 

Following an appropriate value for the property of display,

```CSS
.grid-container {
  display: grid;
}
```

the property of `grid-template-columns` is enough to lay items in a responsive and clear fashion. This thanks to the application of dedicated values, which will be here briefly explained.

!! The explanation will rotate around the width covered by the grid container and its items. The same logic, but applied on the height of the container, is applied for the property of `grid-template-rows`.
  
 - **repeat**

  The `grid-template-columns` property works by specifying the space that is to be occupied by the elements populating the grid. Instead of often repeating a certain value, or a certain structure of values, what `repeat` allows is to namely replicate a defined structure for a specified number of occurrences

  ```CSS
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 100px 200px;
  }
  ```

  In this example, a structure of 100px and 200px columns is created four times.

- **fr**

  Alongside established units of measure, like `px` or `em` or even `rem`, grid provides another possibility through the keyword of `fr`. With this property the respective grid item is set to populate the *available space* in the width of the container.

  The fraction of the page is particularly computed as the space available *after* all explicit declarations are carried out. With an item of 200 pixels, the fraction unit would, for instance, occupy the entire width of the screen except for the assigned measures.

  ```CSS
  grid-container {
    display: grid;
    grid-template-column: 1fr repeat(4, 100px 200px);
  }
  ```

  In this example, the first column would occupy the available space *after* the structure defined through the repeat value is laid on the page.
  
- **auto-fill**

  Auto-fill and auto-fit are properties which influence the number of items set to be displayed in a column.

  Instead of specifying the exact number of times to repeat a certain layout structure, these properties allow to populate a grid with however many items fill in the width of the screen. 

  ```CSS
  grid-container {
    display: grid;
    grid-template-column: repeat(auto-fit, 100px 200px);
  }
  ```

  With this example, the structure of 100px and 200px columns is repeated for how much space is made available by the grid container.

  The only discernable difference between the two is that, as the grid becomes larger than the sum of all grid items, `auto-fill` will proceed to populate the empty columns with empty cells.
  With `auto-fit` instead, the page will stretch the grid items as to collectively consider the entire available space.

- **minmax**

  Beyond the keywords of `repeat` and `auto-fit` or `auto-fill`, `minmax` can be included in the same value declaration as to establish how much space a certain grid items should at least and at most occupy. In between parentheses, it is indeed possible to specify the minimum and maximum space attributable to the individual element.

  ```CSS
  grid-container {
    display: grid;
    grid-template-column: repeat(auto-fit, minmax(200px, 1fr));
  }
  ```

  WIth this example, grid is set to Create how many columns fit in the width of the container. Moreover, according to the specifications of `minmax`, the columns are set to span from at least 200px to at most fraction of the available space.  

All together, the single properties may seem a tad overly complicated for the sheer number of values they accept. At the end of the day it comes back to experiment with the presented concepts as to module the desired layout.
  
In a simple declaration, it is then possible to already obtain a rough version of the desired layout.
 
### Grid containers can nest other grid containers.

There is no need for particular property value pairs when declaring a nested grid. It is just a matter of replicating the same property of display to benefit from grid properties on the nested element as well.

```CSS
.grid-item {
  display: grid;
}
```

### It is possible to align all grid items, or individually some of them.

`justify-items` and `align-items` are properties applicable to *grid containers* in order to align **all** nested items in the row and in the column axes respectively. 

`justify-self` and `align-self` are properties applicable to *grid items* in order to align **specific** nested elements, in the row and in the column axes respectively.

### It is possible to specify different animations for different screen sizes.

All that is required is to specify which animation ought to occur in which screen size, through the application of *media queries*.

```
@media only screen and (min-width: 700px) {
  .header-text:hover svg {
    animation: arrow-point 1.2s infinite ease-in-out;
  }
}

@media only screen and (max-width: 700px) {
  .header-text svg {
    transform: rotate(90deg);
  }
  .header-text:hover svg {
    animation: arrow-point-smaller-screen-sizes 1.2s infinite ease-in-out alternate;
  }
}
```

In this example the animation of *arrow-point* is applied when the screen is at least 700px wide and the animation of *arrow-point-smaller-screen* is applied exactly on screens which are less wide than 700px.

! the value of 700px is not chosen arbitrarily, as the value is set to be the breakpoint at which CSS grid implements columns which are at least 350px wide.
