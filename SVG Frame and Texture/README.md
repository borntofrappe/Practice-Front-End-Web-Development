Link to the working pen right [here](https://codepen.io/borntofrappe/full/ejvdpj/).

# Preface

This project was inspired by the following [design concept](https://dribbble.com/shots/3705845-Yala-Quote-Contest-Win-all-kinds-of-rad-stuffs). 

In earnest, the project is also scheduled to be a part of a larger endeavor, for the @freeCodeCamp curriculum and specifically the "Front End Libraries" certification. It should come to no surprise, if you managed to see the working pen, that the actual project is the **Random quote machine**. I have previously and successfully built such an application [before](https://codepen.io/borntofrappe/pen/VQYmpJ), but managed the effort without any front-end library. To earn the certification with flying colors, I therefore decided to re-tool my efforts with [React.js](https://reactjs.org/). In trying to include novelty on the design aspect as well, I looked for inspiration and found it, among many other sources, in the referenced link.

The cited design is also a reminder of a [CSS Tricks article](https://css-tricks.com/scooped-corners-in-2018/). While I managed to read the article the time it came out, I wanted to design my own solution, so I did not take this source as a tutorial. It was definitely a push thought, which is why I decided to reference it.

I thought at first on how to achieve the nice corners with HTML and CSS only, but in the end I figured SVG would be the most resilient and practical tool for the job. This allows me to not only practice once more with SVG and its syntax, but also tweak the appearance of the frame to perhaps include a texture, to promote even more the old-timey retro look of the frame. SVG filters, or SVG patterns, seem to be two candidate for this job. I might have some research to do on both to pick the right tool.

## Design

**Color Palette**

- subdued text and frame color: #b6b5b8
- bold color: #fff
- darkest gradient: #191919
- lightest gradient: #7b7b7b

Any additional color is included as a variation through [stylus](http://stylus-lang.com/) and the [color functions](http://stylus-lang.com/docs/bifs.html) it provides.

**Font Choices**

- font quote: Montserrat, sans-serif
- font author: Merienda, cursive

## SVG

**The frame**

SVG is perfectly suited to replicate the rounded, inset corners of the frame. It also allows to include the nice circles at either edge of the rectangle with ease.

```HTML
<!--
in the wrapping SVG, include a viewbox equal to 1000+20 and 720+20
this to later move the contents of the SVG in the frame and avoid cropping, while having nice round coordinates for the circle and path elements (1000*700)
inspired by the way D3.js works with axes 
-->
<svg viewbox="0 0 1020 720">
  <!-- with a group element
    - move the contents 10 to the right and 10 to the bottom, allowing the contents to work on a 1000*700 frame, while at the same time avoiding cropping at the edges
    - set stroke and fill properties shared by all SVG elements (stroke width is different for the circle elements and the frame)
  -->
  <g transform="translate(10,10)" stroke="#b6b5b8" fill="none">
    <!-- draw one circle for each corner -->
    <g stroke-width="6">
      <circle cx="10" cy="10" r="10"/>
      <circle cx="990" cy="10" r="10"/>
      <circle cx="10" cy="690" r="10"/>
      <circle cx="990" cy="690" r="10"/>
    </g>
    
    <!-- include the bottom decoration with simple path elements 
    stroke-linecap to avoid square linecaps, which might be too much
    -->
    <path stroke-linecap="round" stroke-width="10" d="M 200 580 H 800"/>
    <path stroke-linecap="round" stroke-width="8" d="M 280 610 H 450 A 50 50 0 0 0 550 610 H 720"/>
    <circle stroke-width="8" cx="500" cy="620" r="10"/>

    <!-- 
      draw the frame with a path element, alternating straight lines and arcs for the inset corners 
      position the path after the other SVG elements to have the fill overlayed on said elements
    -->     
    <path stroke-width="8" d="M 50 0 H 950 A 50 50 0 0 0 1000 50 V 650 A 50 50 0 0 0 950 700 H 50 A 50 50 0 0 0 0 650 V 50 A 50 50 0 0 0 50 0 Z"/>
  </g>
</svg>
```

This was rather good practice with the `path` element, and at the same time a nice way to implement SVG logic found elsewhere, in the D3.JS library.

**The text**

As I recently learned with a bit of SVG research, text comes with the `text-anchor` attribute, which can be handily included to have a text stick to a definite coordinate. In this project, when set to `middle`, it allows to easily center the text in the SVG frame.

One big issue I have with text is the following: how big the text should be? If the text exceeds the bounds of the canvas, indeed the text gets cropped and this has always made me a little scared of the `<text>` element.

As I figured for the project, with a bit of experimentation, once a `font-size` is picked it is possible to find the length of the text which fits in the SVG. May not be the best tactic, but it works.

```HTML
<!-- include a text element for the quote 
stroke to give weight to the characters

for the chosen frame and font-size (4.5rem), approximately 25 characters can stay on a single line
in JS, when including a real quote dynamically, include tspan elements when this length is exceeded 
tspan with a dy element pushing each successive tspan by 100, to avoid overlaps and distance the lines (4 lines seems to be an upper threshold, something which can be tested in JS)

with text anchor set to middle, even if the text varies in length it gets still displayed centered in the frame
-->
<g stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="#fff">
  <text x="500" y="150" text-anchor="middle" class="text text__quote">
    <tspan x="500" dy="0">
      Life is really simple,
    </tspan>
    <tspan x="500" dy="100">
      but we insist of making 
    </tspan>
    <tspan x="500" dy="100">
      it complicated
    </tspan>
  </text>
  
  <!-- include a text element for the author
  same text anchor chosen for the quote, to center the author right below it
  position it in the bottom section of the screen, but high enough to include the bottom decoration
  -->
  <text text-anchor="middle" x="500" y="560" class="text text__author">Confucius</text>
</g>
```

**The texture**

Using SVG patterns, in conjunction with very small SVG elements and some degree of transparency, it is possible to include a texture on the entire frame.

```HTML
<!-- 
  include a pattern which gives the impression of a texture, by including small circles side by side 
  reduce the opacity to avoid an excessive overlay
-->
<defs>
  <pattern id="texture" x="0" y="0" width="5" height="3.5" patternUnits="userSpaceOnUse">
    <circle cx="2.8" cy="1.75" r="1.75" fill="#191919"stroke="none" opacity="0.3"/>
  </pattern>
</defs>
```

Applied to the `<path>` element responsible for the frame, in the `fill` attribute, the pattern allows to include a rather neat visual effect.

```HTML
<path fill="url(#texture)" stroke-width="8" d="M 50 0 H 950 A 50 50 0 0 0 1000 50 V 650 A 50 50 0 0 0 950 700 H 50 A 50 50 0 0 0 0 650 V 50 A 50 50 0 0 0 50 0 Z"/>
```

Additionally, by including the `<path>` element _after_ the other SVG elements, it is possibly to have the texture be _on top_ of all content. This has the small caveat of removing the possibility to easily reach the text with a cursor, but the quote and author are not meant to be clicked. Still something deserving of a note.

At the end of the day, I reckon the frame does provide a good starting point for the @freeCodeCamp project.

Coupled with textured-icon used as buttons, to get a new quote and share the existing one, the project might provide a nice visual.