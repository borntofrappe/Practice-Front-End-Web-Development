Link to the working pen right [here](https://codepen.io/borntofrappe/full/bvvxYr/).

# Preface

The purpose of this very simple project is to replicate a very minimalistic animation whenever visitors hover upon anchor link elements. 

The solution itself was inspired by [Ezequiel Bruni's Ultimate Guide to SVG](https://www.webdesignerdepot.com/2015/01/the-ultimate-guide-to-svg/) web page. In this page, the anchor links already possess a an underline, of a particular color. As the hover action occurs, the color is altered to another chosen hue, which expands its presence from the very left to occupy the entirety of the underline. 

[The effect](https://codepen.io/borntofrappe/full/bvvxYr/) speaks for itself.

# How to 

To implement of the solution, I am reminded of the pseudo-elements `:before` and `:after`. These are CSS "specifiers" which come for every selector and allow to include content directly from CSS.

Previously, I had used a pseudo-element to create a text-underline from the bottom center of the text. I realized only when I found the transition online that I could leverage both pseudo elements together, and animate one on top of the other.

This is exactly how I achieved a first version of the effect.

## Pseudo-Element*s*

Starting with a simple HTML structure, the only requirement is here to actually create anchor link elements. A class is used to better identify the items in CSS, but it is totally not required.

```HTML
<div class="container">
  <h2>Try and hover on the following links</h2>
  <div class="container__anchor-links">
    <a class="anchor-links--hover" href="#">Hover on Me</a>
    <a class="anchor-links--hover" href="#">Or me instead</a>
    <a class="anchor-links--hover" href="#">We actually share the effect</a>
    <a class="anchor-links--hover" href="#">And change only in color</a>
    <a class="anchor-links--hover" href="#">Or do we :)</a>    
  </div>
</div>
```

In CSS, access to the pseudo-elements is available with the following syntax, for any CSS selector:

```CSS
selector:before {

}
selector:after {

}
```

In between brackets it is possible to include content, which will be bound to the selector itself. This content can be text, but also a background, or border, which is included on top of the CSS properties available on the single selector. This approach allow to experiment with exciting effects by "compounding" CSS properties.

For the text-underline in particular, it is possible to create a line under each anchor link with the following syntax.

**Remember**: when you want to absolute position an element, and this includes pseudo-elements, you need to set `position:relative` on the parent element to which you want to connect.

```CSS
.anchor-links--hover {
    position: relative;
}
.anchor-links--hover:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: crimson;
}
```

**Small snippet review**

- the property of `content` is required, even if set to an empty string;
- `position` is used together with `bottom` and `left` to absolute position the element in relation to the relative positioned item;
- `width` set to `100%` covers the entirety of the width of the parent element;
- `height` is required as otherwise the pseudo-element won't be displayed
- `background-color` is likewise required to display actual content.

## Pseudo-element transition

For a simple transition, it is possible to modify the property of `width`, from `0` to `100%`, in order to visualize the underline from the bottom left and let it cover the entirety of the element's width.

```CSS
.anchor-links--hover {
    position: relative;
}
.anchor-links--hover:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: crimson;
    transition: width 0.5s ease-out;
}
.anchor-links--hover:hover:after {
    width: 100%;
}
```

Which achieves already a neat solution.

## Pseudo-element*s* transiton

To actually implement the desired effect, what can be done is leave a pseudo-element with `width` set to `100%` and transition another pseudo-element from `0` to `100%`, creating the simple, yet nice visual.

It is here *important* to remark how the pseudo-elements actually stack on top of one another: **after** indeed resides on top of **before**. This last one needs to therefore be the pseudo-element persistent on page, with a `width` of `100%`, while the former is animated on hover.

```CSS
.anchor-links--hover {
    position: relative;
}
.anchor-links--hover:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: violet;
    transition: width 0.5s ease-out;
}
.anchor-links--hover:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: crimson;
    transition: width 0.5s ease-out;
}
.anchor-links--hover:hover:after {
    width: 100%;
}
```

As the visitor hovers on top of each anchor link, the `:after` pseudo-element spreads of the `:before` pseudo-element, fulfilling the promise of the project.


## Update

While the project helped to better understand pseudo-elements and their order, the effect can actually be achieved with a single pseudo-element, leveraging the `border-bottom` property of the affected element itself.

```CSS
.anchor-links--hover {
    position: relative;
    border-bottom: 4px solid #28343e;
}
.anchor-links--hover:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: crimson;
    transition: width 0.5s ease-out;
}
.anchor-links--hover:hover:after {
    width: 100%;
}
```

The only precaution to be taken regards the vertical offset of the pseudo-element being used.

Indeed the bottom border of an HTML element does not match vertically with a pseudo-element being positioned at the very bottom of the parent element itself. 

The pseudo-element seems to position itself in relation to the parent HTML element *without* considering the border. Thusly, the border stretches beyond the grasp of the pseudo-element.

To fix this minor mishap, all that is required to offset the pseudo-element exactly by the size of the `border-bottom` property. In doing so, the pseudo-element is pushed downward and exactly on top of the defined border.

```CSS
.anchor-links--hover {
    position: relative;
    border-bottom: 4px solid #28343e;
}
.anchor-links--hover:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 4px;
    background-color: crimson;
    transition: width 0.5s ease-out;
}
.anchor-links--hover:hover:after {
    width: 100%;
}
```

Achieving once more the effect, but only with one pseudo-element.

In the project itself I had some fun with colors and timing functions, but the effect is basically described by the above code.
