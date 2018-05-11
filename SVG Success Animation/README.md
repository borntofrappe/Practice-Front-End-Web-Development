Link to the working pen right [here](https://codepen.io/borntofrappe/full/JvvvZb/).

# Preface 

The purpose of this project is to create a simple animation with SVG syntax, to give a the feedback of confirmation. Something that was supposed to happen happened smoothly.

I've seen the animation somewhere on CodePen before, but since I need to refine my web-dev skills, and I like to practice with SVG asset, I might as well figure out on my own how to achieve the following schema:

- [x] say you have a click-able circle
- [x] as you click on the circle, its border is highlighted with another color. A green hue, as to signify a passing test/ otherwise positive interaction.
- [x] as the new border envelops the entire circle, a line is drawn toward and then away from the center of the circle itself, resulting in a v, check mark
- [x] while the line goes from border to border, possibly even exiting the scope of the circle as it becomes transparent, a part of it remains visible for the v, check mark

Once you see it, you easily grasp what I effectively mean.

## Update

From the planned animation, the SVG is transitioned at the click of a button, through the instruction specified in the JS script with the `beginElement()` method. While this differs considerably from the plan, the schedule was nevertheless helpful to kick-start the progress made in the simple project.

# Lessons Learned

- Setting `fill` to `none` makes the circle hollow. Setting `fill` to `transparent` allows instead to also click on the center of the circle;

- to rotate an SVG element, an attribute of `transform` can be included, passing three values for the rotation and the coordinates of the center around which the rotation will occur;

- to transition the stroke of an SVG element, the default line animation reduces the attribute of `stroke-dashoffset` from the value of `stroke-dasharray` to zero, resulting in a clockwise animation. Setting a negative `stroke-dashoffset` allows for a counter-clockwise animation;

- transitions defined in the `<animate>` tags can in relation to other, previously defined animations. All that is required is a reference to their id. With that attribute, it is possible to begin the animation whenever the other animation begins, `id.begin` or even when it ends, `id.end`;

- multiple `<animate>` tags can be instantiated for a single SVG element. This way you can alter multiple attributes;

- the animation of an SVG element can be "paused", setting `begin` to `indefinite`. It can be then initiated in the JS script, calling `beginElement` on the desired `<animate>` element;

- [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) has a really helpful list of SVG attributes.
