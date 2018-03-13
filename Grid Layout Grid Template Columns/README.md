Link to the working pen righ [here](https://codepen.io/borntofrappe/full/vRLZmm/).

Images courtesy of [Pexels.com](https://www.pexels.com/search/tools/).

## Preface

The purpose of this project is to flex some muscles exercising with CSS grid properties. It is also an excuse to group together several useful resources to truly understand CSS grid.

These are the properties through which I personally went and I am currently going. They are, in absolutely not random order:

- A course broadcasted by Wes Bos on CSS Grid;
- A section of the beta curriculum for freeCodeCamp;
- A comprehensive list of grid properties and their effect on the page, by CSS Tricks;
- MDN developer's docs, providing plenty of helpful documentation.

A last section is also added to promote a simple message: no matter how much material can be read and studied, there's no substitute for actually experimenting with the logic behind the layout scheme. 
Trying things out, perhaps directly on CodePen, is the best tool to get acquainted with the subject and even understand the logic and minutia behind it.

## Lessons learned 

1. It is remarkably easy to create a nice layout with a couple of grid properties. 

  Following an appropriate value for the property of display,
  
  ```
  .grid-container {
    display: grid;
  }
  ```
  
  the property of grid-template-columns is enough to lay items in a responsive and clear fashion. This thanks to the application of dedicated values, which will be here briefly explained.
  
  - *repeat*
  
  The grid-template-columns property works by specifying the space that is to be occupied by the elements populating the grid. Instead of often repeating a certain value, or a certain structure of values, what repeat allows is to namely replicate a defined structure for a specified number of occurrences
  
  ```
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 100px 200px;
  }
  ```
  
  - **fr**
  
  Alongside established units of measure, like px or em or even rem, CSS grid provides another possibilities through the keyword of fr. With this property the respective grid item is set to populate the available space.
  
  The fraction of the page is particularly computed as the space available after all explicit declarations are carried out. With an item of 200 pixels, the fraction unit would, for instance, occupy the entire width of the screen except for the assigned measures.
  
  ```
  grid-container {
    display: grid;
    grid-template-column: 1fr repeat(4, 100px 200px;
  }
  ```
  
  - **auto-fill**
  
  Auto-fill and auto-fit are properties which influence the number set to be displayed in a column (or row, if the reasoning is applied to grid-template-rows).
  
  Instead of specifying the exact number of times to repeat a certain layout structure, these properties allow to populate a grid with however many items fill in the width of the screen. 
  
  ```
  grid-container {
    display: grid;
    grid-template-column: 1fr repeat(auto-fit, 100px 200px);
  }
  ```

  The only discernable difference between the two is that, as the grid becomes larger than the sum of all grid items, auto-fill wil proceed to populate the empty columns with empty cells.
  With auto-fit, the page will stretch the grid items as to collectively consider the entire available "space".
 
 - *minmax*
 
 Beyond the keywords of repeat and auto-fit or auto-fill, minmax can be included in the same value declaration as to establish the extremes of the space which a certain grid items should occupy. In between parentheses, it is possible to specify the minimum and maximum space attributable to the individual element.
 
  ```
  grid-container {
    display: grid;
    grid-template-column: repeat(auto-fit, minmax(200px, 1fr));
  }
  ```
  
  Create how many columns fit in the width of the container. In the example, the columns span from 200px to a fraction of the available space.  
  
 All together, the single properties may seem a tad overly complicated for the sheer number of values they accept. At the end of the day it comes back to experiment with the presented concepts as to module the desired layout.
 
1. Grid containers can nest other grid containers.

  There is no need for particular property value pairs when declaring a nested grid. It is just a matter of replicating the same property of display to benefit from grid properties on the nested element as well.
