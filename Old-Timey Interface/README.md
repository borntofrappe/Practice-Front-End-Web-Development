Link to the working pen right [here](https://codepen.io/borntofrappe/full/LQwvEE/).

# Preface

The purpose of this project is to replicate a terminal interface in which green text is being typed on a dark background. I found this "throwback" animation in several web pages, but most recently I have seen it beautifully implemented in [Coda.io](https://coda.io/welcome).

The web page in question has also a nice transition to the terminal interface, with the dark background introduced and removed gradually on scroll, as the page reaches and leaves the section.

# First thoughts

Before jumping in the development of the project, I find it useful to inspect the page's elements through the developer console.

This step allows to draw insights from how the effect seems to be implemented. It also allows to include appropriate stylistic choices, such as background-color and font-family properties matching the analyzed project.

For instance, and for the example project, it's possible to here find:

- font-family of `VT323`, giving a retro feel to the text. The font itself is freely available on [Google Fonts](https://fonts.google.com/specimen/VT323);

- text color of `#32ff32`, leading to a strong green;

- `img` element for a blinking cursor. Personally I'd rather use a span element, but the blinking effect is applicable on any HTML construct.

### How to

Since the purpose of this repo is to solely replicate the terminal interface, I'll skip the additional step of including a `div`, to animate the transition to and from the interface itself. This can be achieved with the scroll event, a topic already covered on a [previous project]. I might add it for practice at a later stage.

The [HTML](#html) structure is rather straightforward. Building on that, [SCSS](#css) relies on `flex` properties to center the content in the middle of the screen. Moreover, CSS  specifies the property of `animation` for the blinking cursor.

# HTML

Since I started learning Emmet abbreviations, the HTML structure is easily achieved through the following construct.

`.terminal-interface>p.terminal-text+span.terminal-cursor`

Which easily prompts the structure:

```HTML
<div class="terminal-interface">
  <p class="terminal-text"></p>
  <span class="terminal-cursor"></span>
</div>
```

For the text in the paragraph, filler text is added through the `lorem20` abbreviation, to include 20 filler words. For the cursor text, a | straight line will momentarily suffice.

The simple end result is as follows.

```HTML
<div class="terminal-interface">
  <p class="terminal-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae dolor tempora fugit aliquid mollitia qui excepturi fugiat ducimus nemo dicta.</p>
  <span class="terminal-cursor">|</span>
</div>
```

<!-- technically the lorem text ends with an overly-excited exclamation mark, which is substituted with a full period -->

# SCSS

**Flex**

The HTML structure is laid, as mentioned, with flex properties.

The `div` can be centered vertically either with the property of `justify-content` or `align-items`, depending on the direction of the flex container.

In both cases, the property of `height` must be specified with a value greater than the height of the content. Otherwise the content has no space in which to move.

With `flex-direction` set to `row` (which is the default value) the `align-items` property centers in the cross axis (which is the column):

```SCSS
.terminal-interface {
  height: 100vh;
  display: flex;
  align-items: center;
}
```

Alternatively with `flex-direction` set to `column` the `justify-content` property centers in the main axis (which is, again, the column):

```SCSS
.terminal-interface {  
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

For the horizontal alignment, a different construct is used. Since the paragraph is set to occupy a max-width, the alignment properties available with flex to not work and it is possible to leverage the property of `margin` to align horizontally.

This because the paragraph element is, by default, a block element. By setting `margin` to `auto`, for both the left and right sides, the element is also aligned in the row.

```SCSS
.terminal-interface {
  max-width: 1000px;
  margin: 0 auto;
}
```

It would be possible to align with flex properties, but the paragraph would stretch over the entire width with too many words populating one single line.

**Animation**

CSS allows to build animations with the `@keyframe` keyword, and later reference the manufactured animations on any selector, through the aptly named property of `animation`.

To build the animation for the project, all that is required is to alter the property of `opacity`, from 1 to 0 and back to 1.

```SCSS
@keyframes blinking-cursor {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

Through the property of `animation`, it is then possible to specify on which element the animation should occur and the behavior of the transition itself.

For the project, the animation is made to last one second and be repeated indefinitely.

```SCSS
.terminal-cursor {
  animation: blinking-cursor 1s infinite;
}
```

Which, by itself, achieves the behavior of a blinking element.

That being said, the element transitions between states with a smooth effect not really resembling a computer cursor. This can be achieved with the additional value of `step-end`.

This value, explicitly referring to the `animation-timing-function`, allows the animation to move between states in hard stops, from 1 directly to 0, directly back to 1. Without moving through the intermediary values.

The only difference between `step-start` and `step-end` is in the initial value of the animation. With step-start the blinking cursor is immediately set to opacity 0, while with step-end, it retains the value of opacity 1.

Either could be used, but the initial property of `opacity` set for the relevant element (`.terminal-cursor` in this instance) ought to match with the value adopted immediately by the animation. It's a minor difference.
