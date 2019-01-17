# CodepenChallenge Primary Colors

Proud result live [right here on codepen](https://codepen.io/borntofrappe/full/zyQXQZ);

## Preface

For the second week of the #codepenchallenge, the task is to create a pen with the three primary colors:

- red: #F44336;

- blue: #1E88E5;

- yellow: #FDD835.

My personal take is a simple 'canvas', made up of an SVG container and `circle` elements. These elements are used as droplets of paint, of the three specified hex values. The interaction with the canvas is rather straightforward: tap on a drop of paint, drag the newly created droplet anywhere within the boundaries of the SVG elements.

## Notes

This was a simple project, yet one that allowed me to practice with a few lines of JavaScript in conjunction with the SVG coordinate system. Of most importance is the way we convert pixel values from mouse events to the exact coordinates in an SVG element.

This feat is achieved through the `createSVGPoint()` method, which allows to exactly locate a point in an SVG element, and the `matrixTransform` and `getScreenCTM` methods.

They are all rather new methods, here detailed with the project in mind:

### createSVGPoint

Applied on an SVG element, this method allows to create a reference for exactly a point. Originally, this returns an _SVGPoint_ with the following structure:

```js
x: 0;
y: 0;
```

It is later possible to alter its property as to exactly pinpoint the script toward a particular coordinate. For instance, to precisely spot the point in the SVG at the coordinates (20,20), it is possible to modify the point as follows

```js
point.x = "20";
point.y = "20";
```

This method is ultimately used to position the circle elements whenever the cursor moves.

### matrixTransform()

This function is applied on an SVGPoint and accepts as argument a coordinate system, which is then mapped onto coordinates valid in the context of the SVG and its width and height.

It allows to create an SVG point with the required x and y coordiantes

```js
const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
```

As per the documentation, `getScreenCTM()` _returns a DOMMatrix representing the matrix that transforms the current element's coordinate system to the coordinate system of the SVG viewport for the SVG document fragment_. It is applied on the SVG element and allows to obtain the SVG coordinates by simply inverting its process.
