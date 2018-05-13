Link to the working pen right [here](https://codepen.io/borntofrappe/full/vjrRvO/).

# Preface 

The purpose of this project is the creation of a simple animation for some text. The animation is actually and also included in the freeCodeCamp project where I need to create a Tic-Tac-Toe game.

I figured I could spend some time practicing with SVG concepts and at the same time create a handy component for the larger project.

# Notes

- [x] include some text in the center of the screen, in an svg element
- [x] try and animate the text with SVG inline animation

A first animation is created through the attribute of stroke, which is animated from a stroke-dashoffset equal to stroke-dasharray to 0. 

The following SVG syntax does achieve a simple animation in this regard.

```HTML
<svg width="150" height="140" viewbox="0 0 100 100">
    <text x="0" y="20" stroke-width="2" stroke="#f36653" fill="none" stroke-dasharray="100" stroke-dashoffset="100">
    tic
    <animate id="tic" attributeName="stroke-dashoffset" begin="0.5s" dur="1s" to="0" fill="freeze"/>
    </text>
    <text x="0" y="50" stroke-width="2" stroke="#f36653" fill="none" stroke-dasharray="100" stroke-dashoffset="100">
    tac
    <animate id="tac" attributeName="stroke-dashoffset" begin="tic.end" dur="0.75s" to="0" fill="freeze"/>
    </text>
    <text x="0" y="80" stroke-width="2" stroke="#f36653" fill="none" stroke-dasharray="100" stroke-dashoffset="100">
    toe
    <animate id="toe" attributeName="stroke-dashoffset" begin="tac.end" dur="0.5s" to="0" fill="freeze"/>        
    </text>
</svg>
```

That being said, the animation is elementary and the effect is not that pleasing. Instead of animating the property of stroke, I figure I could transition the text inside the page with a fade-in. Such fade-in allows to practice with SVG masks.

- [x] study the mask and linearGradient elements, starting with [this guide](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking). 
- [x] create different mask for each separate word, practicing with different animations.

# Lessons Learned

Masks allow to include nice stylistic effects by hiding certain sections of an SVG element. Together with linear gradient elements, they allow to hide sections with a #000 hue, show those with a #fff color and include with varying degrees of transparency any color in between.

// include notes on the elements `<linearGradient>` and `<mask>` 
