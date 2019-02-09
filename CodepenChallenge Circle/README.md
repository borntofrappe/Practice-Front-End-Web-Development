# CPC Perfect Circle

Proud result live [right here on codepen](https://codepen.io/borntofrappe/full/yZKyyv).

## Preface

For the first installment in the February Challenges @codepen, and inspired by the #javascript30 course, I decided to once more to have fun with a technology with which I am not acquainted, trying to mix fun with learning.

The weekly topic is around the shape of a circle, pun intended, and my personal take on the subject sets out to achieve the following:

- present a canvas in which a circle is drawn in the right center of the frame;

- ask the visitor to draw a circle matching the perfect one as clearly as possible;

- once an attempt has been registered, evaluate the effort by considering the overlap between the two shapes.

Solid practice with the canvas element.

## Update

The project turned out to be quite the effort. Luckily, the docs [@mdn](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) provide plety of information on how to draw shapes.

Here's the highlights of the project (which is well commented, so you can get a grasp of the script rather rapidly):

- it's possible to draw shapes through an instance of the `Path2D` object. Creating a reference to such an object and later apply the necessary paths and stucture allows to use the variable anywhere on the screen.

- it is possible to check if a coordinate is on top of a shape through the `isPointInPath` and `isPointInStroke` function. This opens quite a few opportunities. <!-- operation game? -->

- to chain animations effectively, you need to be aware of their order and how the animation-based events react to said order. In the instance of the project, the `animationend` event gets fired off immediately, and does not wait for the animation set right before it. This has likely something to do with the fact that there is already an animation which was terminated earlier. More research on the topic is needed.
