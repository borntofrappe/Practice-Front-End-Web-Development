Link to the working pen right [here](https://codepen.io/borntofrappe/full/ZxRJea/).

# Preface

The purpose of this project is to 1) experiment with SVG tags, like path and polyline elements and 2) have fun with drawing-lines animation.

The first point is a natural following from the previous project, in which I tinkered with SVG shapes, while the second point is just a neat-looking, plenty-of-potential effect inspired by research on SVG and this particular article on [CSS Tricks](http://css-tricks.com/svg-line-animation-works/).

# Lessons Learned

## SVG Paths 

Beside rectangles, circles, ellipses, lines, polylines and polygons, SVG comes with the baked-in tags for the `<path>` element.

This is an extremely powerful element, which allows through various line commands to draw pretty much anything. Lines, curves summing up to whichever design you may fancy.

Complex SVG creation are more easily crafted through editing software, like [Inkscape](), but understanding the syntax is always helpful to comprehend the rationale behind SVG.

**The `<path>` element**

Path elements accept, among many other, the `d` attribute. This accepts a series of line commands and coordinates, to draw lines and circles from one point to another.

*Important to note*: for each command, there are two versions, expressed by the lowercase and uppercase version of each letter. 

Uppercase letters define a command which defines **absolute** coordinates: regardless of where the previous command finished, the command will direct the path in a point of the viewbox defined by the passed coordinates.

In this example the path finishes in the point of coordinates (200, 0). Regardless of the fact that the path was previously in the point of coordinates (100,100).

```HTML
<path d="M 0 0 l 100 100 L 200 0"/>
```

Lowercase letters define a command which defines **relative** coordinates: the command will pinpoint the path toward coordinates based on the previous command.

In this example the path finishes in the point of coordinates (300, 100), moving the path from the previous point of coordinates (100,100).

```HTML
<path d="M 0 0 l 100 100 l 200 0"/>
```

Now that the presence of two versions is explained, the line commands can be introduced.

**Line Commands** 

- move to: **M, m**

Go toward a new location. Every path begins with such a value. 

*Accepting*: two values for the coordinates of a point.

*Example*: go to the upper-left corner of the SVG viewbox and start your path there.

```HTML
<path d="M 0 0"/>
```

- line to: **L, l**

Draw a line from the current to the specified coordinates. 

*Accepting*: two values for the coordinates of where the line will end.

*Example*: from the upper-left corner, draw a line to the point of coordinates (100,100).

```HTML
<path d="M 0 0 l 100 100"/>
```

- horizontal line to: **H, h**

Draw an horizontal line.

*Accepting*: one value for the x-axis coordinate of where the line will end.

*Example*: draw an horizontal line 200 pixels to the right.

```HTML
<path d="M 0 0 l 100 100 h 200"/>
```

- vertical line to: **V, v**

Draw an vertical line.

*Accepting*: one value for the y-axis coordinate of where the line will end.

*Example*: draw an vertical line 100 pixels to the top.

```HTML
<path d="M 0 0 l 100 100 h 200 v -100"/>
```

- close path: **Z, z**

End the current path. If multiple paths were to be included in the same element, this value would precede a move to command.

*Example*: close path.

```HTML
<path d="M 0 0 l 100 100 h 200 v -100 Z"/>
```

- cubic bezier curve: **C, c, S, s**

Draw a curve, based on two control points.

*Accepting*: four values for coordinates of the control points and two values for where the curve should end.

*Example*: draw a curve from (20,70) to (100, 20) using as control points (100,100) and (20,20).

```HTML
<path d="M 20 70 c 100 100 20 20 100 -50"/>
```

*Important note*: S and s line commands are used always for bezier curves, but to create smoother lines when curves follow one another. With the C, c command, placing two curves in sequence could result in a break in the curve pattern.

- quadratic bezier curve: **Q, q, T, t**

Draw a quadratic bezier curve, based on a single control point.

*Accepting*: two values for coordinates of the control point and two values for where the curve should end.

*Example*: draw a curve from (0,0) to (100, 300) using as control point (250,100).

```HTML
<path d="M 0 0 Q 250 100 100 300"/>
```
*Important note*: T and t line commands fulfill the same purpose which S and s commands have, but for quadratic bezier curves.

- elliptical arc: **A, a**

Draw an arc.

*Accepting*: seven values for:

- the radiuses of the ellipse: rx and ry (if they match, the radiuses of the circle);
- the rotation of the x-axis;
- a flag (either 0 or 1) describing whether the arc should be drawn in reference to the smaller or longer arc connecting the starting point to the end point;
- a flag (either 0 or 1) describing whether the arc should be drawn as-is or using its reflection around the axis;
- the coordinates of the point where the arc should end.

Demonstrably, tinkering with the commands (especially the flags) is more useful than describing each point.

*Example*: draw an arc from (2,70) to (100, 100). An arc with an x-radius of 100px, a y-radius of 70px, without rotation, without a flag for a longer arc nor a flag for its reflection. 

```HTML
<path d="M 20 70 A 100 70 0 0 0 100 100"/>
```

## Line animation

As thoroughly explaine in the referenced [CSS tricks article](http://css-tricks.com/svg-line-animation-works/), the line-drawing animation is achieved with the CSS properties of `stroke-dasharray` and `stroke-dashoffset`.

The idea is as follows: `stroke-dasharray` allows to segment a stroke in multiple dashes. Creating a dash as long as the stroke will allow to cover the entirety of its length. `stroke-dashoffset` is then used to move, or offset if you will, the dash. Offsetting the dash by the same amount of its length will push it out of sight.

All that is then required is to animate this last property, from the length of the stroke to 0. This gives the impression of drawing a line, while in reality is a matter of offsetting the dash back into view.


```CSS
path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 1s ease-in forwards;
}
@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}
```

*Important note*: to allow for the drawn line to remain visible in the page, the value of `forwards` is specified in the animation. 

And that is basically the idea.

**For the project**

An updated version of the concept makes use of CSS variables in conjunction with a JS script.

As the length of the stroke for the different paths is unknown, the purpose of the script is to:

1. target the path elements;
2. retrieve their length;
3. plug the length value in the stylesheet through a CSS variable.

This last one is created in the root element:

```CSS
:root {
  --stroke-length: 3000;
}
```

And updated in JS, for each respective path:

```JS
// target all paths
const paths = document.querySelectorAll("path");

// loop through all path elements
paths.forEach(function(path) {
    // get the length of each individaul path
    const length = path.getTotalLength();

    // get the style properties of each individual path
    const pathStyle = getComputedStyle(path);

    // set the CSS variable of stroke length to the length of each path
    path.style.setProperty("--stroke-length", length);
});
```

Neat-o.

*Final note*: in the project, two additional variables are used for the duration and delay of the animation. These values are used to allow for the multiple paths to be drawn in sequence.
