# D3 Sunburst Diagram

<!-- Link to the working pen right [here]() -->

## Preface

The purpose of this project is the practice of yet another D3 layout to display _hierarchical_ data. The date itself is retrieved from one of the projects required for the @freecodecamp curriculum, and analyses the highest grossing video-games across platform. The data is available [right here](https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json).

## Data

In the referenced URL the data is structured with the following logic:

- the main object nests all video games, with a `children` property detailing an array of platforms;

- each platform is summed up in an object, which itself has a `children` property detailing an array of titles;

- each title is once again summed up in an object, with the following, pertinent properties: `name`, `category` and most importantly `value`.

Briefly, the data's structure can be detailed as follows:

```code
vide games
  platform
    title
      sales
    title
      sales
    title
      sales

  platform
    title
      sales
    title
      sales
```

## Sunburst

The specific solution represents hierarchical data in a _radial_ layout. As there is, seemingly, no custom layout function in the library, the `d3.pie()` function is used instead.

The idea is simple: for each level of depth, create a pie chart. This pie chart should take up a fraction of the available space, instead of considering the entirety of the screen. For each pie chart, add slices through path elements, on the basis of the `value` property.

This property is retrieved through the `hierarchy` function, included as expected for hierarchical data as to compute the relative importance of each node.

The final solution is a bit contrived, but does solve its purpose. There are however a few modifications which will be gladly received in any future project. Among these suggestions, easily the following are at the top of the list:

- have the fill color of the nested elements somehow connected to the color of the parent element;

- in the tooltip display the name of the specific node as well as the name of all the nodes which nest the particular one, its parent elements.