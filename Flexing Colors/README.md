<!-- Link to the work-in-progress pen right [here](). -->

## Preface

I was checking out [Colorleap](https://colorleap.app/time/1960), a neat web application showcasing different color across the ages, spanning from 2000bc close to modern time.

One of the neat choices found on this website relates to the different colors. They are sorted either vertically, in a card, or horizontally, on their own, but still in rounded boxes. As you hover on a particular color, this one expands to cover twice, perhaps 1.5 its original size.

I through it was rather neat, and chose to see how hard it would be to replicate such a design with a few CSS properties.

## Update

Turns out, expanding the colors on hover proved to be less challenging then anticipated. Flex properties make it as easy as simply changing the flex-grow property. As it is transition-able, it's as easy as the following:


```SCSS
button {
    flex-grow: 1;
    transition: flex-grow 0.3s ease-out;
    &:hover {
        flex-grow: 2;
    }
}
```

I therefore decided to tinker a bit more with JavaScript code to display the color value on hover elsewhere in the page.
