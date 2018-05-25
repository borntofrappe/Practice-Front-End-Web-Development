Link to the work-in-progress pen right [here]().

# Preface
The purpose of this very small-scale project is the replication of a neat hover animation as witnessed on this inspiring blog post on [bezier curves in React]().

As the cursor hovers on the anchor link elements of the page, the usually immovable line drawn right beneath the HTML element is animated to move vertically, on top of the link-able text.

Moreover, as the line passes atop the text, the text itself is animated in color, changing from its default hue to the hue the line has in the first place.

I did find the effect rather neat, and a good excuse to practice with HTML and mostly CSS properties. 

# Plan

- [x] include an anchor link element
- [x] with a pseudo element, draw a line right beneath the text of the anchor link
- [x] on hover, animate the line to move over the text and then disappear at the top
- [x] on hover, animate the text to change in color

# Notes

The effect planned in the four steps is achieved with a simple pseudo-element and animation/transition properties. A first, rough implementation sees the change in color for the text occur slightly after the animation for the line, giving the impression of a correlation between the two.
