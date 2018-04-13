Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/BreORo/).

# Preface 

The purpose of this small-scale effort is to replicate an hover animation on a button as seen on [bottts.com](https://bottts.com/).

The button (which is actually an anchor link upon closer inspection) indeed has a fancy transition in which it rotates like a 3D object to display the desired call-to-action.

A good excuse to review transform, perspective and 3D properties in CSS.

# Plan

- [x] create a simple markup structure with a button in the middle of the page
- [x] style the button with slightly rounded corners, bold text, no outline
- [x] include an emoji in the text of the button
- [x] figure out how to include the 3D transition to another side of the box, with new information (perhaps pseudo elements?)
- [x] apply a transition on hover to achieve the analyzed effect

# Lessons learned

## Perspective

You can include perspective in CSS through the `perspective` property or the `perspective()` value within the `transform` property.

The former is a property which is included on a parent element to affect the depth of its transformed children

```CSS
.parent-element {
    perspective: 100px; /* this value will affect any and all nested items, anchoring them to the same vanishing point */
}
.child-element {
    transform: rotateZ(20deg);
}
```

The latter is a value altering how the element is rendered.


```CSS
.child-element {
    transform: rotateZ(20deg) perspective(100px)
}
```

Regardless of whichever approach is chosen, the higher the value passed for perspective, the more subtle the 3D effect will be.


## Transform

**`transform`**

Several values of the `transform` property are specified in the project. These allow to modify several aspects of HTML elements, such as rotation (`rotate`) and overall position (`translate`).

With particular regards to [3D transformations](https://css-tricks.com/almanac/properties/t/transform/#article-header-id-6), there exist multiple values allowing to tweak the different dimensions in which the elements can span.

Values such as `rotateX`, `rotateY`, `rotateZ`, which allow to modify the rotation of the element in relation to the respective axis. `translateX`, `translateY`, `translateZ`, moving the element again in connection to the X,Y,Z axes.

**`transform-`**

In addition to these values, two properties are also used in connection to the analyzed property of `transform`. These are `transform.origin` and `transform-style`.

`transform.origin` is extremely valuable in describing the "flexing point" in which the transformation takes place. By default it is set to `center center`, centering the transform property horizontally and vertically with respect to the affected element. By altering this value with keywords (`top`, `left`, `bottom`, `right`) or specifying absolute measures, it is possible to change exactly the origin (where the transformation would begin) as wanted/needed.

`transform-style` is instead essential when building 3D transformations. With the value of `preserve-3d` it indeed allows to position nested items in a 3D space, instead of flattening all items in a 2D panel.

## Theme-ing

With CSS variables, it is rather easy to alter the look of an HTML document simply by updating the values used throughout the stylesheet.

In the stylesheet, define the variables in the root element:

```CSS
:root {
    --variable-name: variableValue;
}
```

In JavaScript, you can then access properties and modify them at will, with appropriate methods.

The following methods are used in the project.

- `getComputedStyle()`: method which accepts as an argument an HTML element and which returns the CSS properties applied to it;

```JS
// get style properties for the :root element
const rootStyles = getComputedStyle(root);
```

- `getPropertyValue()`: a method which accepts a string value,argumentfor the property which value is to be retrieved;

```JS
// store the value for the property of --button-color 
const buttonColor = rootStyles.getPropertyValue("--button-color");
```

- `setProperty()`: a method which accepts two string values, for the properties to be modified and for the value to be implemented by the property.

```JS
// set the value for the property of --button-color
root.style.setProperty("--button-color", "#7548d6");
```


