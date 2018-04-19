Link to the work-in-progress pen right [here]().

# Preface 

The purpose of this project is to simply replicate a neat hover animation as seen on the articles on [Medium.com](https://medium.com/). Right next to the articles, perhaps with questionable layout choises, it is indeed possible to find a "clapping" icon with a pulsating animation as you hover on it with the mouse pointer.

A subtle, smooth, pleasing effect which makes me wonder how I could achieve the same solution.

# Plan

- [x] center an anchor link in the page 
- [x] give a border and a rounded-border to the anchor link 
- [x] include an SVG icon in the anchor link instead of plain text
- [x] figure out which properties to animate to give the impression of a pulsating button

# Lessons Learned

The neat effect can be easily achieved with a transition applied to the border color, from a solid hue to a transparent match. The only minor complication is that animating the border-color makes the same property disappear in between repeating animations.

To retain a border even as the pulsating border animation occurs it is possible to use a pseudo element, position it right where the border would sit and animate the psuedo element as the border sits still.

Once you implement that (and you complete the animation at 70% to give an impression of a break between repeating animations), the exercise comes down to selecting the right sizes and colors for the project. 
