Link to the working pen right [here](https://codepen.io/borntofrappe/full/gKWqgb/).

# Preface 

With this project I plan to practice with a particular type of animation: sprite animation. 

With this technique, an visual is animated by displaying a portion of a larger graphic, and by changing said portion to display different sections at different times. It is something which can be achieved with vector or raster graphics alike, but for the sake of being consistent (with my SVG studies), I chose the vector graphic.

To put it simply, sprite animation works like this:

- create the scene you want to display;
- duplicate the the scene and position the new framgment right next to (or positioned vertically to) the first section. Effectively duplicating the size of the asset.
- alter the second scene as wanted; 
- replicate step two and three to create the animation one frame at a time.

Once the graphic is completed, you can then include it on the page, with the CSS property of `background` and change what is shown on screen with the property of `background-position`, to selectively display a single scene.

If it sounds convoluted, it is my mistake. 

Think of a series of photographs. With this approach it's like you'd stack said assets on top of one another and rapidly move from the former to the next. Thusly creating the illusion of animation in otherwise still pictures. 

For the project in particular, and to dip my feet into this new type of animation, I actually wanted to avoid the illusion of smooth animation and instead chose to maintain a blocky, frame by frame type of animation. Think discrete, from scene to scene, pixellated animation. If you're comfortable with the `animation-timing-function` property, think of `step-end`.

I created (spending an inane amount of time) an SVG asset for the main character in the pokemon game series, with one copy for each different type of movement.

The goal is to have the character "move" in the page by changing its position and change the visual by changing its background position. 

_Crazy thought_: it'd be neat to turn this into a chrome extension. Click on the extension in the top right bar, display the graphic on the page, allow for it to move around the page itself. A silly way to explore any page.
