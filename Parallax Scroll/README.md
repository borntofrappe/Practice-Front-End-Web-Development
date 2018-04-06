Link to the working pen right [here](https://codepen.io/borntofrappe/full/RMepEE/).

# Preface

The purpose of this project is to implement a design choice as last seen on [PictureThisAI.com](https://www.picturethisai.com/). As the visitor scrolls through the page, he/she is faced with an array of information and graphics. Graphics which are made to scroll with a "parallax" effect. Instead of letting the image scroll as it normally would, the page indeed scrolls past the images, which are seemingly fixed on the page.

It is a neat effect, especially if implemented with measure. By placing too many images and fixed element, the design can get noxious quite fast. By I presume that is a trait of most design choices.

# Lessons Learned

## Parallax Effect

To achieve the effect described in the preface, in which images are "fixed" on the background as the page scrolls past them, it is possible to leverage the property of `background-attachment` set to `fixed`. 

This will allow to achieve exactly the desired positioning effect. By setting a background to a png image or otherwise graphical asset, like an SVG, this will be glued on the page. Surrounding elements will seemingly create a sort-of window in which the asset is shown scroll by.

## Background Properties 

In order to completely encompass the background with the provided asset, there are multiple background properties available. In the project in question, a choice is made not to scale the SVG asset with the screen width. 

Based on this preamble, the background is not altered in size and it is solely centered in the nesting `<div>` container.

```CSS
.container .graphic {
  height: 100vh;
  background-attachment: fixed;
  background-position-x: center;
}
```

Regardless of the width of the screen, the purely aesthetical containers will show each SVG asset in the background, centered horizontally and not repeated. This last feat is achieved by limiting the actual width of the parent container. By setting this value through the `max-width` property and exactly to the width of the created SVG assets (800px), the SVG will be indeed presented once.

```CSS
.container {
  max-width: 800px;
}
```

## Coloring Book

This lesson has more to do with design than its implementation. The `<div>` containers for the alternating content are indeed given a background of a solid hue first and a linear gradient afterwards. This choice is made to emulate the colors used in the SVG themselves, and to ease the transition from one asset to another.

```CSS
.content--one {
  background-color: #217867;
}
.content--two {
  background: linear-gradient(to bottom, #aaffaa, #5599ff);
}
.content--three {
  background: linear-gradient(to bottom, #0055d4, #11002b);
}
.content--four {
  background-color: #ff9955;
}
```

An additional `<div>` is included past the three alternating containers, as to allow for the parallax scroll to occur on the third, purely aesthetical `<div>` as well.



