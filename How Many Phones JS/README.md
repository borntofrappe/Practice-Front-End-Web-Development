Link to the working pen right [here](https://codepen.io/borntofrappe/full/oErzOE/).

### Preface

The purpose of the project is to merge recent advances in JS, made while reading [You don't Know JS](https://github.com/getify/You-Dont-Know-JS), with other front-end development concepts. 
This intent is manifested in a pen in which to implement the simple algorithm manufactured out of Chapter 1 of the first book [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going).

What follows is a description of some of the page characteristics, in the [HTML and SCSS files](#html-and-scss), and the logic behind the script, in the [JS](#js) file.

# HTML and SCSS

The HTML structure is built as follows:
- a `div` container wrapping the entire content
- three `div`s dividing the content in 
  1. `.header`, introductory information, 
  2. `.display`, with main input and result of the script and 
  3. `.setup`, with other inputs changing the result of the script

**SVG**

One notable inclusion in the document is the svg image included inline. Built with [Inkscape](https://inkscape.org/en/), the image ought to resemble a phone and accessories.

The `svg` tags do increase the number of lines, almost outrageously, but they allow to direct style the svg and its components through CSS, which is a neat possibility.

One issue for the particular project is that the svg file, included in a flex container, needs specific width and height dimensions to be included in the page. In the stylesheet, pixels measures are included for the max width and height.

```SCSS
svg {
      max-width: 250px;
      height: 290px;
}
```

The proportion of the svg, in terms of width to height ratio is included from the dimensions the svg has in Inkscape.


**Font awesome icons**

Another note can be made on the multiple `<i>` tags included in the page. These are used to include icons through the Font Awesome Icons integration. All that is required is the inclusion of the external CSS file.

The call is made through [CDN](https://www.bootstrapcdn.com/fontawesome/) and uses Font Awesome Icons 4.

```HTML
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

The `<i>` tags are injected with the classes predefined for each icon and also include the classes of:

- `fa-2x`, which increases the size of the icons

- `fa-fw` or fixed width, which allows the icons to occupy the same width, especially when layered vertically one after the other

In the CSS the icons are also given the property of `vertical-align` set to `middle`, which allows the icons to be centered vertically next to the input elements.

**Flex**

Flex is used to lay the different containers horizontally or vertically, mostly depending on the width of the screen. Through a media query the structure is indeed shifter from row to column on smaller screen sizes.

```SCSS
@media only screen and (max-width : 800px) {
  .setup, .result {
    flex-direction: column;
  }
}
```

Alignment properties are also specified to center the flex items horizontally and vertically, but most notably the property of `flex-wrap` is set to `wrap` for the container of the multiple input elements. This to allow for the flex items to "spill over" into a new line when reaching the end of the available horizontal space.

```SCSS
.setup {
  flex-wrap: wrap;
}
```

By default a flex container will stretch items on a single row, even to the point of moving items outside of the horizontal scope. This property alters this unwanted behavior.

**SCSS**

The pre-processor is used once more to centralize values, such as those for the colors and font used in the page. 

```SCSS
$font-family-main: 'Lato', sans-serif;
$darker-color: #333;
$lighter-color: #e3dedb;
```

Moreover extend statements are included to reset some styling options and also share some property-value pairs on multiple selectors (notably, the input elements present in the different containers).

```SCSS
%button-input-reset {
  background: none;
  border: none;
  outline: none;
}
```

Color functions are also used in combination with the two chosen colors as to create a sort-of monochromatic palette, with darker or lighter hues depending on the relevance of the affected elements.

```SCSS
button {
  color: darken($darker-color, 40%);
}
```

And notably, selectors are nested all throughout the stylesheet. The challenge is to avoid extremely nested items, which is sort-of solved by styling elements inside of the most pertinent and direct container.


# JS




