Link to the working pen right [here](https://codepen.io/borntofrappe/full/ZxovaR/).


# Preface

The purpose of this project is to experiment with SVG as included in the HTML document through code only, without further assistance from editing software like [Inkscape](https://inkscape.org/en/).

Why? To better understand SVG syntax, why.

Tinkering around with SVG syntax I am able to learn:

- how SVG shapes and connected attributes work;
- how the viewbox and the viewport of the SVG actually impact the graphic being included.

With reference to this last particular point, I recommend a few readings. It is a concept which is quite important as it regards ultimately how the SVG will be displayed on page, but a tricky concept which requires a bit of attention and experimentation.


# Lessons learned

## Viewport and viewbox

For any SVG element there exist a viewport and the viewbox.

The *viewport* describes the canvas of the SVG being incorporated on the page. Detailed by the property of **width** and **height**, it regards the space which is allocated to the SVG asset.

The *viewbox* is the actual area displaying the SVG. This can match the viewport, but also be greater or smaller than the same reference.

It is detailed by four values: **x coordinate**, **y coordinate**, **width** and **height**. The first two describe the upper left corner of the area. The latter pair describes how large and tall the area should be.

In code they are included in the SVG tags, like this:

```HTML
<svg width="200" height="100" viewbox="0 0 200 100">
</svg>
```

In this example, page allocates an area of 200 by 100 pixels in which to display the SVG. As the viewbox matches the viewport, the SVG will be visible in the viewport area.

Things start to get a little complex when the viewbox doesn't match the viewport. Things get even more complex when the width to height ratios of viewport and viewbox differ.

I'd recommend few reads on the subject, but for the project at hand, here a few pointers based on this simple SVG, which creates a colored rectangle inside of an SVG element with a background-color, as to highlight changes:

```HTML
<svg width="200" height="100" viewbox="0 0 200 100" style="background-color: #cornsilk;">
    <rect x="0" y="0" width="100" height="100" fill="crimson"/>        
</svg>
```

- x and y coordinates are used to specify the beginning of the visible area. By setting these values different from 0, the viewbox will be translated as to create a visible area which begins earlier (<0) or later (>0).

- if the viewbox is smaller than the viewport, but always keeping the same width to height ratio, the graphic will be scaled up. The SVG is sort-of zoomed in.

```HTML
<svg width="200" height="100" viewbox="0 0 150 75" style="background-color: cornsilk;">
    <rect x="0" y="0" width="100" height="100" fill="crimson"/>        
</svg>
```

- if the viewbox is greater than the viewport, but always keeping the same width to height ratio, the graphic will be scaled down. The SVG is sort-of zoomed out.

```HTML
<svg width="200" height="100" viewbox="0 0 400 200" style="background-color: cornsilk;">
  <rect x="0" y="0" width="100" height="100" fill="crimson"/>        
</svg>
```

Why? Good question. It has to do with [coordinate systems](https://www.sarasoueidan.com/blog/svg-coordinate-systems/).

By how much? The scaling effect is influenced by the ratio between viewport and viewbox. Double the viewbox, the SVG will occupy half the width and half the height. Reduce the viewbox by 25%, an equal increase will be applied on the length measures.

Always? Not really. Here's a small caveat. SVG shapes accept percentage values. If you use such measure of length, the size of the SVG won't be affected coming changes in the viewbox attribute.

As the project makes use of viewport and viewbox values which are always proportional (they actually match), I won't go into what happens with different ratios. That is a topic for another day.

For now relish in the relation between viewport and viewbox. All the time realizing that the viewport width and height properties don't have to be set in the HTML tags. You can just as well specify them in the stylesheet.

```CSS
.container__svg svg {
  width: 300px;
  height: 225px;
}
```

## SVG shapes

SVG comes with multiple tags tailored for specific shapes. These share some attributes, but also present unique and separate values.

Common attributes used in the document are:
- `id`, to reference the SVG, either later in the HTML or in the CSS;
- `fill`, color of the shape;
- `stroke` and `stroke-width`, color and dimension of the stroke.

In the document, it is then possible to analyze the following tags and values.

- `<rect>`

To draw a rectangle, you specify first the coordinates of the upper left corner, through the attributes of `x` and `y`.

Following those, values can be set for the `width` of the element, its `height`, as well as for rounded corners, through `rx` and `ry`.

*Small note*: if left unspecified, `ry` will be set equal to `rx`.

*Example*: a rectangle beginning at 10% the container, stretching for 80% of the same, in height and width (covering therefore 100% of the viewbox), with rounded corners and designated color/stroke.

```HTML
<svg id="rectangle">
  <rect x="10%" y="10%" width="80%" height="80%" rx="4" fill="tomato" stroke="#eee" stroke-width="12%"/>
</svg>
```

- `<circle>`

For circles, you specify the coordinates of the center, through the `cx` and `cy` attributes for the horizontal and vertical coordinate respectively.

The size of the circle is determined by the radius, through the `r` attribute.

*Example*: a circle positioned in the center of the viewbox and spanning 40% of its width.

```HTML
<svg id="circle">
  <circle cx="50%" cy="50%" r="40%" fill="#fff" stroke="blue" stroke-width="4"/>
</svg>
```

- `<ellipse>`

Ellipses work in a similar fashion to circles, with the only inclusion of two values for the radius attribute, one for the x-axis, the other for the y-axis.

*Example*: an ellipse positioned in the center of the viewbox and spanning 28% and 20% of its width for the x-axis and y-axis respectively.

```HTML
<svg id="ellipse">
  <ellipse cx="50%" cy="50%" rx="28%" ry="20%" fill="transparent" stroke="#61dafb" stroke-width="4"/>
</svg>
```

- `<line>`

To draw a line, all that is required is the definition of the coordinates of said line. Starting from a point dependant by `x1` and `y1` attributes and arriving at a point of `x2` and `x2` coordinates. 


*Small note*: the line element has no fill, just stroke.

*Example*: a simple line going from the top left corner of the viewbox to the bottom right one.

```HTML
<svg id="line"  style="background-color: blue;">
  <line x1="0" y1="0" x2="100%" y2="100%" stroke="cornsilk" stroke-width="32"/>
</svg>
```

- `<polyline>`

While you can create multiple lines in the same SGV element, you can also create a sequence of straight lines already through a polyline. This element accepts a `points` attribute detailing the coordinates of the different points.

*Not so small note*: The points must be even in number.

*Example*: a series of line making up a crown motif.

```HTML
<svg id="polyline">
  <polyline points="30 30 50 80 120 80 140 30 110 50 85 25 60 50 30 30" stroke="#eee" stroke-width="4" fill="none"/>
</svg>
```

- `<polygon>`

While you can create polygon-like structures with the previous element, the polygon element is tailored for the occasion. It accepts the same attribute of `points`, but ultimately connects the last point with the first (if they don't match already).

*Example*: a polygon with a crown motif, with the same points of the polyline, except the last two, which are added by the element itself to close the polygon.

```HTML
<svg id="polygon">
  <polygon points="30 30 50 80 120 80 140 30 110 50 85 25 60 50" stroke="#eee" stroke-width="4" fill="#bbb"/>
</svg>
```

## Additional Notes

- when specifying the unit of measure, pixels are the default unit. But you can also use others, such as `em` or even percentages.

- in an SVG it is possible to specify multiple shapes. With the awareness that the later the declaration, the higher the shape/element will be in the viewbox.

- it is possible to style and thusly transform SVG elements, but also individual shapes. Either inline with the `style` attribute or through the stylesheet with CSS syntax.

- for accessibility, and this ought to be a major note on the topic, elements of `title` and `desc` for a description can be included. Aria attributes can be declared in the SVG to bind these elements for screen-readers. Just remember to include an identifier unique for each field.

```HTML
<svg id="rectangle" aria-labelledby="titleRec" aria-describedby="descriptionRec">
  <title id="titleRec">Rectangle element</title>
  <desc id="descriptionRec">Simple rectangle with rounded corners</desc>
  <rect x="10%" y="10%" width="80%" height="80%" rx="4" fill="#777" stroke="#eee" stroke-width="12"/>
</svg>
```
