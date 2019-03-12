# JS30 Event Listener

Working pen live, [right here](https://codepen.io/borntofrappe/full/oVovEj).

## Preface

This project is prompted by the last video in the #javacript30 coursr I have left. The video in question is available [right here](https://youtu.be/F1anRyL37lE). It is ripe with information, and to both prove and cement the knowledge I gained by watching it, I decided to explain the underlying concepts in my own words. In my own words and through a series of examples which show:

- an event listener on a single _div_.

- an event listener attached to multiple, nested _div_ elements.

Especially with this last example, the idea is to spell out how the browser captures the events, top to bottom, how it fires them, bottom to top, and how the default behavior can be modified.

Modified to:

- have the logic stopped with the first element, through the _stopPropagation()_ method.

- have the logic fired on the way down, from the outermost container to the innermost child element and through the _capture_ flag.

- have only the logic of the outermost element run, by combining the previous possibilities.

- have the logic run only one time, through the _once_ flag..

## Presentation

I have already described a couple of concepts through a carousel-layout, so I wanted to explore other options. Here's the idea behind the UI of the project:

- have a _div_ make up the shape and appearance of a simplified planet. Initially, this is shown on its own, but to highlight the parent-to-child relationship between _div_ elements, the element is then nested in another container, making up for the appearance of the galaxy in which the planet resides, and going further the universe as a whole.

- highlight the click events by having the planet/galaxy/universe display a short message. Something akin to 'I hear you', or 'message received'. Be sure to incorporate here a counter variable to stress the order with which the events are fired.

