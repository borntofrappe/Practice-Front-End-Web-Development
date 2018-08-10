Link to the working pen right [here](https://codepen.io/borntofrappe/full/YjdVLM).

## Preface

With this project I plan to practice with D3.js, specifically covering the following topics:

- SVG syntax, used to create a column chart;

- linear and ordinal scales, to display the data inside of the SVG element

- transition methods, used to animate the height of the different columns;

- fetch API, to access population data for a specific country, at a speci
fied year.

The endpoint used with the **fetch** API, to generate a column chart using actual data, is found at the following [URL](http://api.population.io/):

```JS
http://api.population.io:80/1.0/population/2000/France/
```

Such an URL will return a response, structured an array of objects, each nesting the following structure:

```JS
{
  "females": 370973,
  "country": "France",
  "age": 0,
  "males": 390520,
  "year": 2000,
  "total": 761493
}
```

Given this structure, it'd be neat to include column chart as tall as the `total` value and with one rectangle element for each array ite,.

## Design

Beside the three variables used to create a french flag in the backgrond of the body, a few more picks concern the color and font used throughout the project:

- #192B37 for the text color;

- #F4F4F4 for the background;

- 'Ubuntu' for the font.

The colors are also used for the rectangle elements, with a `fill` property using the text color, and for the tooltip, which actually flips the colors for its text and background.

## D3.js

Beside including an `<svg>` element and a nested `<g>` element, using the `margin` in a convention which has almost become second nature, the following lines of codes warrant a separate mention, as they are addition to my D3 knowledge stack.

- text can be freely included in the SVG with the `text` element. 

  The attributes of `width` and `height` are here **not** required for such element, meaning the only cropping which needs to be considered is that provided by the parent SVG element.

  The attribute of `text-anchor` is extremely handy to position the text exactly in specific areas of the SVG. In the center, aligned perfecly with the specified coordinates. In the end, ending at a precise coordinate. Quite a handy attribute.

- for ordinal scales including different sections for several categories, `scaleBand` allows to allocate `bands`, each taking up a portion of the area specified by the range interval.

- the fetch API can be included instead of an XMLHTTP request, to include one function after the other. Each command specified in the `.then()` function will wait for the preceding method to return a value.

- with ordinal scales, and this warrants further research, the `.ticks()` function does not work properly. 

  To show less ticks than all of them, the `.tickValues()` function can include as many ticks as specified by a `.filter()` function. This function is called on the domain of the scale, which is responsible for the ticks themselves.

- the `.tickFormat()` function allows to easily format the ticks, specifying a particular rule. 

  The project for instance makes use of scientific notation, to include a `k` for each value exceeding a thousand:

  ```JS
  .tickFormat(d3.format("~s"))
  ```