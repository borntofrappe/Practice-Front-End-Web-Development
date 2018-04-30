Link to the working pen right [here](https://codepen.io/borntofrappe/full/VxPdXR/).

# Preface 

In order to practice with the SVG library Snap.SVG I plan to replicate a couple of neat animations as seen on [Pulse.red](https://pulse.red/?ref=producthunt). 

The site showcases a circle animated at the right top of the page, drawn out of the top left corner into view. Moreover, it presents a rectangle at the very bottom of the page; rectangle which is morphed into a circle as the user scrolls to the respective section.

I think the animations are simple enough to get me started with the library.

# Plan

- [x] create a simple landing page which is at least twice as tall as the available viewport, as to allow for scroll.
- [x] in the top section, include a simple navigation bar and giant bold header.
- [x] in the bottom section, include some additional filler information and a footer with departing details
- [x] include a mid-section with additional filler text as to separate the first two sections.
- [x] draw an SVG circle from the top left corner, as soon as the page loads (or with a small delay). As soon as a scroll event occurs, draw it out of sight with an easing function.
- [x] draw a rectangle on top of the final section; figure out how to morph it in a circle with a center in the very bottom of the page. Attach these occurrences to the scroll event reaching this section.

# Lessons Learned

## Snap.svg

The popular SVG library allows to include and animate scalable vector graphics directly through a JS script. Although this implies that JavaScript code is flanked by CSS stylesheet properties, mixing style with function, the library comes with new affordances which might make worth the extra script call.

**`<script src></script>`**

Exactly in reference to this last point, in order to use the library it is first necessary to reference the library itself, right before the JS script which makes use of its possibilities.

A call to snap.svg is accomplished either locally or through a CDN.

```HTML
<!-- <script src="../../../Assets/Libraries/Snap.svg-0.5.1/dist/snap.svg-min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
<script src="script.js"></script>
```

**`Snap()`**

Once the library is included, appropriate syntax is used to handle SVG assets.

An SVG canvas is created and stored in a reference-able variable through the `Snap()` function. This one accepts as parameter the dimension of the canvas, or, alternatively, an SVG element already created in the markup HTML document. Such is the case for the small scale project.

```JS
const svgIntro = Snap(".svg-intro");
```

**Simple Shapes**

Once a canvas is instantiated, SVG elements can be included in the canvas through appropriate functions. `circle()`, `rect()` functions allow for instance the inclusion of circle and rectangle elements respectively, accepting as arguments exactly the same attributes which define the element in the SVG syntax.

For circle for instance, this function accepts three values for the horizontal center of the circle, the vertical center and the radius of the same circle. For the rectangle, up to six values for the coordinates of the upper left corner, the width and height of the shape and the rounded corners of the same.

```JS
const giantSVGCircle = svgIntro.circle(0, 0, 0).addClass("circle");
```

With the library, it is also possible to add a class through the `addClass()` method, as seen in the small snippet.

**Animation**

SVG animation are easily applied through the library thanks to the `animate()` method. This accepts, among many, arguments for the SVG attributes to be affected in the animation, the duration of the animation and an easing function for the same.

The first one is included with an object detailing the attribute and the respective values adopted during the animation. The last one is included through the `mina` object, which allows to benefit from predisposed timing functions.

```JS
giantSVGCircle.animate(
    {
        cx: 350, 
        cy: 300, 
        r: 550
    }, 500, mina.backout);   
```

In this example, the SVG circle element is animated in half a second to the defined coordinates and with the defined radius, from the starting point (0, 0, 0).

All in all, the animation is easily implemented with the library, and allows for further specifications as specified in the sometimes not-really-user-friendly [documentation](http://snapsvg.io/docs/).
