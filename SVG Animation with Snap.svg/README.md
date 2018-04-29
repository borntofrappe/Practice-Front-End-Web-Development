Link to the working pen right [here](https://codepen.io/borntofrappe/full/VxPdXR/).

# Preface 

In order to practice with the SVG library Snap.SVG I plan to replicate a couple of neat animations as seen on [Pulse.red](https://pulse.red/?ref=producthunt). 

The site showcases a circle animated at the right top of the page, drawn out of the top left corner into view. Moreover, it presents a rectangle at the very bottom of the page; rectangle which is morphed into a circle as the user scrolls to the respective section.

I think the animations are simple enough to get me started with the library.

# Plan

- [x] create a simple landing page which is at least twice as tall as the available viewport, as to allow for scroll.
- [x] in the top section, include a simple navigation bar and giant bold header.
- [x] in the bottom section, include some additional filler information and a footer with departing details
- [x] include a mid-section with additional filler text as to separate the first two sections.
- [x] draw an SVG circle from the top left corner, as soon as the page loads (or with a small delay). As soon as a scroll event occurs, draw it out of sight with an easing function.
- [x] draw a rectangle on top of the final section; figure out how to morph it in a circle with a center in the very bottom of the page. Attach these occurrences to the scroll event reaching this section.

# Lessons Learned

// TODO: add notes regarding snap svg, how to include SVG elements and animate them through the library
