# React Watch

Semi-proud work-in-progress pen [right here](https://codepen.io/borntofrappe/full/ebRVJd).

## Preface

I found myself staring at the clock application on my mobile, mesmerized by the design na dits simple animation. After thinking a while on how to re-create the application on the web, I decided to try out my luck with React and styled-components.

**Update notice**

While developing the application, trying things out with little luck, I stumbled upon a good idea: developing the entire watch in an SVG element. I therefore decided to drop `styled-components`, use `index.css` to center the SVG and then complete the watch specifying the SVG attribute-value pairs, for each of the nested element.

Taking inspiration from `D3.js`, I also decided to implement a _margin convention_, as to frame every element well inside the SVG, and avoid cropping, by nesting a first `<g>` element and have it move within the boundaries of the outermost SVG.

I also decided to change the name of the project, to React SVG Watch, or React SVGatch, and to sketch down a piece of paper the way I plan to implement the project.
