Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/RMvJxB).

# Preface 

This project was inspired by the [Power Menu for Finder](https://fiplab.com/apps/power-menu-for-mac?) website.

ALthough it has very little to do with the product/service here promoted, it is inspired by the particular icon displayed boldly on the front page. Indeed this icon, showing a lightning bolt out of the bulging outline of a rounded square, inspired me to create a simple animation of a heartbeat.

While I immediately thought of SVG, I decided to actually leverage HTML markup and CSS pseudo-elements, to test the knowledge on the subject. 

# Plan

- [x] create the icon of a heart with HTML markup, through rounded `div` elements and pseudo-elements.
- [x] animate the heartbeat from the center center of the icon, with the intent of decreasing the intensity of the heartbeat at the edges of the icon and focus the change in the center of the same.

# Lessons Learned

Beside the recurrent theme exalting the possibilities already enabled by HTML and CSS syntax, very little can be added in this section.

The simple animation is a result of leveraging HTML markup and CSS pseudo elements. 

- A square is sided by two circles of equal size to give the impression of a stereotypical heart icon. 
- Transform properties are applied and updated on hover to simulate a heartbeat.
- The scale in the x and y axis is modified differently, as to slightly give the impression of a bulging container. This small nuanced effect is achieved by enlarging more the wider segment. Even if width and height are virtually the same, in the stereotypical heart icon the width is indeed the most prominent feature.
- CSS variables are used to centralize values for the size of the heart icon and its color. It is thereafter possible to alter the value once to have it modified everywhere.
- Pseudo elements have the ability to inherit the properties of the connected element. Indeed pseudo-element can include a `background-color` property of `inherit` and have it match the element's own color.

