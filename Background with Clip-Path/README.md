Link to the working pen right [here](https://codepen.io/borntofrappe/full/vjZYME/).

# Preface 

The purpose of this project is to learn about and put into practice the CSS property of `clip-path`. I have last seen this property as applied on [Unique.prototype.io](https://unique.prototypo.io/) to create a nice looking background, but elsewhere I have seen it applied to create good-looking borders for images and otherwise HTML element.

Specifically, this project is tasked to create the nice-looking background just referenced. 

# Plan

- [x] create a simple layout which stretches beyond the entire available viewport height; this as to create enough space to allocate the desired background;
- [x] apply a background of a solid color or slightly changing gradient and have it span the different HTML element (with a box-y, rectangle structure);
- [x] study how the clip-path property can be included to cut portions of the background out of view.

# Lessons Learned

## Clip

**Clip v Mask**

CSS allows for two techniques which could be confused for one another, but are fundamentally different: masking and clipping.

Luckily [CSS Tricks](https://css-tricks.com/clipping-masking-css/#article-header-id-0) has a helpful section on their difference:
- a mask is a visual which hides the black sections of the underlying element (making them transparent), shows the white sections as opaque and the sections in between with varying degree of transparency;
- a clip is a vector path, outside of which the elements are transparent/ visually cut out.

The confusion regarding stems from the fact that, applied of a black and white element, the techniques are indentical, showing only the white portions.

**Clip**

Clipping is achieved through the `clip-path` property. This accepts as value a shape or a reference to a defined SVG, via URL.

_Keywords_

A first value is `inset`, which accepts 4 length values for the position of the clip on the element (top, right, bottom, left values, like for padding/margin).

```CSS
div {
    clip-path: inset(20px 20px 20px 20px);
}
```

With this snippet, the div would cut 20px out of the element in each direction.

Beside this value, `circle` and `ellipse` are two other keywords, accepting values for the radius(es) and position of the shape.

```CSS
div {
    /* create a cricle clip with center at the point (20,20)*/
    clip-path: circle(20px at 20px 20px);
}
```

```CSS
div {
    /* create an ellipse clip with center at the point (20,20)*/
    clip-path: circle(20px 10px at 20px 20px);
}
```

_Small note_: length values included in the properties are here absolute measures, but can also be percentages. Such is the case in the project at hand.

```CSS
.container main {
  clip-path: circle(25% at 50% 50%);
}
```

In addition to `inset`, `circle` and `ellipse`, `polygon` is another value which helps with further curtomization of the clip, allowing to create clips out of an area defined by multiple points.

```CSS
div {
    clip-path: polygon(0% 35%, 100% 0%, 100% 65%, 0% 100%);
}
```

The values are comma separated in pairs specifying the points of the polygon which ultimately makes up the clip.

_URL_

Finally, through a URL reference, it is possible to specify a clip out of a defined SVG element. 

SVG syntax indeed has an element right for the occasion, in `<clipPath>`. All that is required is the inclusion of the clip in this element, nested itself in a `<defs>` and `<svg>` block.

```HTML
<svg width="0" height="0">
    <defs>
        <clipPath id="clip">
            <circle cx="20" cy="20" r="20"/>
        </clipPath>
    </defs>
</svg>
```

Values of 0 for the `width` and `height` attributes are included as to avoid the browser from pre-emptively occupying space width the defined SVG.

In the stylesheet, the `clip-path` property needs to simply reference said `<clipPath>` element via id.

```CSS
div {
    clip-path: url(#clip);
}
```

## Stylus

While previously used only with SASS/SCSS, partials can be included in Stylus as well.

All that is required is to first define a class in which to declare the CSS properties that are to be repeated in the stylesheet:

```
.flex-center 
    display flex 
    flex-direction column
    justify-content center 
    align-items center 
    text-align center
```

And then _extend_ said class to the desired elements

```
main
    @extend .flex-center
section
    @extend .flex-center 
```
