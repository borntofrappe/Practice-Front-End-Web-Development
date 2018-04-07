Link to the working pen right [here](https://codepen.io/borntofrappe/full/YaRVoK/).

# Preface

The purpose of this project is to put it simply, to create a small pen for the codepen challenge of the first week of April 2018. 

The theme: pac-man.

The idea: create a simple page in which only two things are shown: a ghost and a light switch.

The ghost in question is one of four possible ghosts: clyde, blinky, inky, pinky. The only noticeable difference between them is the color of their "blanket-body".

Moreover, the ghost is to be positioned in the viewport at random coordinates, within a set of possible values (set of coordinates to emulate padding from the edges of the viewport; it is indeed best if the ghost does not stick to the borders of the window, as this may be visually cumbersome and may indeed overlap the ghost on the light switch unwantingly).

As the light switch is toggled, as the page is first loaded, the ghost is shown with a different hue and at different coordinates. At random between the multitude of x and y coordinates and between the four color values respectively.

# Lessons learned

## Support structure

I first made the newbie mistake of jumping in a code editor and start coding with reckless abandon. After a first moment of excitement, this approached proved rather poor and I found myself stucked in perfecting triangles and rounded rectangles. 

As I previously mentioned on a past project, but poorly implemented afterwards, a bit of planning goes a long way. Which is why for this pilot project I want to experiment with a new schedule.

Set the tasks of the project ahead, visualizing what the project itself entails, then go through each small, bite-size list item one at a time.

I'll spell it out here and for once to test out this new organizational approach.

- [x] setup: background color #000, a rectangle centered on page, with a background color of one of the ghost, and a light switch in the top left corner, made out of the stroke of a circle;
- [x] random color: create a JS script which applies a different background color to the rectangle, as the page loads and as the light switch is clicked. This value might be suited for a CSS variable.
- [x] random coordinates: beyond the color, modify the position of the rectangle within the viewport
- [x] ghost silhouette: create the simple "blanket-body" figure, with a rounded top and pointy edges at the bottom. Include circles/ellipses for the eyes and irises within them.
- [x] bonus points: create a function which tracks the position of the mouse pointer and moves the irises of the eyes toward the pointer itself.

One step at a time.

**Update**

The simple, 5 minutes prep session seems to help and to reduce the number of wasted time noticeably. I'll keep perfecting the structure with the confirmation that yes, a plan does help, even if not implemented perfectly. As planned.


// TODO: include lessons learned on absolute positioning when width and height property are "unusual" (meaning, both set to 0); lessons learned on the mouse move event and the used javascript in general. JavaScript in combination with the helpful CSS variables


