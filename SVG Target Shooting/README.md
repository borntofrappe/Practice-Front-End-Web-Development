Link to the working pen right [here](https://codepen.io/borntofrappe/full/ZRwRqz).

# Preface 

While tinkering with a side project and SVG related concepts, I started creating the outline of a simple chrome extension. Chrome extension which allows to target a page and its elements in order to set the property of _display_ to the value of _none_. Nothing more challenging than that. I thought it would be a nice way to implement chrome-related know-how in a silly, but perhaps often usable extension.

For now, the outline stays just that. This project is not about a chrome extension, but I thought mentioning it to describe from where the particular project was born. Indeed the simple idea, which I started to implement by drawing an SVG element to be included in place of the mouse cursor, spawned the simple game you can find at the referenced link.

AS you load the page, you can play a game of _clay target shooting_. While nobody actually yells 'pull', clay targets are pulled from the bottom left and bottom right section of the page. They move randomly up and to the right, up and to the left respectively. 

The trajectory is linear at first, to simplify the project. Itself, it should include randomness in the animation, with different degrees taken by the object. 

In addition, the targets should shrink in size as they approach the end of their trajectory, to roughly emulate a sense of distance.

It doesn't have to be too complicated, but the project should also have a way to keep score, for each successful "kill". The game itself should continue endlessly, with no way of saving the highest record, nor a way to stop it, other than close the page. It is just a simple proof-of-concept to practice with several front-end concepts:

- SVG syntax
- CSS variables
- JS animation and events