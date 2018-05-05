Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/pVWWBm/).

# Preface 

The purpose of this project is to partake with a belated entry to the CodePenChallenge of the last week of April. The theme: the retro video-game Pong. The un-original idea: create a simple page in which visitors can play pong with their respective mice.

The screen is split in twine, the mouse controls the left and right rectangle depending on its horizontal position. Moreover, the mouse controls the vertical dimension of each rectangle depending on the Y-coordinate of the mouse itself.

It has been done before, yes. But not by me. And it's a good excuse to practice with these designs and some JavaScript code.

# Plan

- [x] create a simple page layout with two rectangles positioned at either end of the page, a dotted line separating the screen in the very middle and two giant, bold numbers in the top section of the page, in the center of each section of the same
- [x] study the mouse move event on the window
- [x] engage with left and right rectangles when the mouse is on their respective area
- [x] link the Y coordinate of the mouse to the Y coordinate of the rectangles

# Plan V.2

- [x] create a disk which is to be animated as the puck for the game
- [x] when the game is being played, move the disk left and right, top and bottom, continuously
- [x] when hitting a border of the window, change the direction of the movement (maybe in an interval, changing the direction by 35-45°)
- [x] specify the previous behavior solely for the top and bottom borders of the window, as well as the paddles on the left and right 
- [x] when hitting the left or right borders, without hitting the paddles, increase the point of the opposite side by 1, restart the game

## Notes
