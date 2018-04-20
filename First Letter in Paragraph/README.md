Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/deoWYV/).

# Preface 

This project is tasked to replicate a neat design solution often found in newspaper-like websites. Presented with a story, the first letter of the first paragraph is indeed boldened and enlarged as to ease the view of the rest of the text.

It seems to be a simple implementation of a couple of CSS properties: `float` and sizing properties.

# Plan

- [x] introduce filler text in a paragraph tag
- [x] remove the first letter, present a div before the p element (placeholder for a possible image/SVG, otherwise HTML element)
- [x] float the container left 
- [x] wrap the surrounding text around the header


# Lessons Learned

Understanding the basic concepts of a subject allows to replicate knowledge in multiple particular instances. 
Working with placeholders instead of custom solutions (a `div` instead of an `h1` element, for example), allows to apply multiple solutions changing only the details as needed.

In the project at hand for instance, the `div` is able to nest text and images alike, such as an artsy visual for the first letter of the paragraph.

UPDATE: as I recently saw the effect on the [Smashing Magazine](https://www.smashingmagazine.com/2018/04/best-practices-grid-layout/), the solution is implemented **while** maintaining the first letter in the paragraph. I actually find this implementation more enjoyable, while obviously it is already a better fit for purpose of accessibility.

The placeholder `div` can also be rendered as a circle and benefit from the `shape-outside` property for a nice stylistic addition. It is not supported in Firefox, unless a particular setting is modified, but still. It provides a nice layout for those who support it.

```CSS
.container .first-letter {
  /* with a float property the placeholder div is moved on the same level of the following paragraph, to cover its rightful space at its left */
  float: left;
  /* with the property of shape outside it is moreover possible to wrap the following text around the div, following the path of a shape */
  shape-outside: circle();
}
```
