Link to the work-in-progress pen right [here]().

# Preface 

Like many others, I was enjoying the products Nintendo decided to recently showcase. One of their titles, Smash Brosh Ultimate, had a rather lengthy video in which the lead responsible showed off what the team behind the game progress.

In said video, as to introduce game footage and especially new characters, a neat, brief animation of the smash brothers logo was repeated. This project is tasked to replicate said animation, as closely as possible, with plain HTML and CSS.

The stripes, horizontal and vertical, can be animated plainly through the use of the `:before` and `:after` pseudo elements, attached to a div which stretches across the visible viewport.

After this realization, it is a matter of tweaking the different properties and the pace of the animation, with appropriate keyframes. The approach with which I chose to go is as follows:

- consider the time the animation needs to take, from end to finish
- build up the animation one step at a time, assigning each different action a fraction of the total amount of time
- obtain the percentage of each fraction, dividing the cumulative amount of time by the total amount of time. Assign the CSS properties to the different keyframes.
