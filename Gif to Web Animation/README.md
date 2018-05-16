Link to the working pen right [here](https://codepen.io/borntofrappe/full/erPyYE/).

# Preface 

The purpose of this project is to replicate the neat animation found in the introduction to the latest google product, [Google One](https://www.blog.google/products/google-one/one-simple-way-get-more-out-google/).

The website in question has a rather pleasing animation in its header. Animation which upon closer look is actually included as a [gif](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/G1_blog_phase1_1.gif). I wanted to achieve the same effect in browser, with HTML, CSS and possibly JS.


# Plan

- [x] create SVG files for the icons shown at either side of the number 1
- [x] include the four icons and a div in the middle of them, in a single row layout
- [x] animate the four icons with a line animation, shown on top of the light gray outline and shown with a line of different colors
- [x] for the central div, make use of pseudo selectors to create a 1 of four different colors.

For reference, the hex codes for the colors used in the project are as follows:

- yellow: #F7B904
- red: #E74234
- blue: #2A79EE
- green: #33A652

# Notes

**SVG**

By defining the SVG in the top of the `<body>` of the page, it is later possible to easily include multiple copies of a same graphic through `<use>` tags.

In the project at hand, since the goal is to animate the stroke property of an SVG in different colors, it is possible to benefit from this approach to stack multiple versions of the same graphics on top of one another. All without cluttering too much the markup.

**linear-gradient**

Multiple linear-gradient properties are used to create rectangles with different colors. By using the same color at exactly the same portion of the gradient, multiple solid colors are included instead of actual gradients.
