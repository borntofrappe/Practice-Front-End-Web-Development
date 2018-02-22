# Slider Text

**Preface**: you can check the final result in this [pen](https://codepen.io/borntofrappe/full/Nyzzqq/).

I saw the effect on several sites, but most recently I was reminded of the neat implementation on [picksaas](https://picksaas.com/), as posted on [Product Hunt](https://www.producthunt.com/) over the weekend.

The effect sees a portion of a header scrolling vertically, replacing what is shown originally with alternative text.

It is particularly effective to finish a sentence with more than one possibility, as shrewdly used by the cited web page as well.

> You can use this product to [insert one of many use cases]

## How To

Looking at the developer console and the *elements* tab is personally vital in understanding how the effect is pulled off.

In here it is possible to analyze the HTML structure and the CSS styling applied to the page.

**The HTML**

The portion of interest is found in the content section of the page. Particularly, the text which is shown and animated vertically is nested in a `div` of class `text-slider`. The div itself is nested in between `h1` tags, used for the overall header.

![HTML Structure Div](Resources/Slider Div.png)

In here it is possible to find an unordered list of class `slider-words` with the many pieces of text shown at the end of the sentence.

It is already possible to start and understand how the effect is implemented. The unordered list is animated vertically and only the text that appears in the parent division is made visible.

This is made clear especially selecting the unordered list, which spans vertical space outside of the div itself. Moreover, while keeping focus on the `ul` element, it is possible to see the structure move vertically, from top to bottom and reiterating the pattern upon reaching a particular word.

![HTML Structure Div Ul](Resources/Slider Div Ul.png)

**The CSS**

Beneath the analyzed structure it is possible to consider the CSS applied to the selected HTML elements.

When selecting the parent `div` it is possible to assess, among many properties, the property of overflow.

![CSS Structure Div](Resources/Slider Div CSS.png)

As this is set to hidden, for both the x and y axis, it forces the web page to display its contents only when found in the container itself.

As a nested child overcomes the boundaries given by the `div` element, it becomes no longer visible.

When selecting the unordered list inside of the `div` parent, it is possible to then study the properties of `animation`, among which the developers specified the animation name, timing function, iteration count and duration.

![CSS Structure Div Ul](Resources/Slider Div CSS.png)

These properties are the topic of a separate project, but for the project at hand a small description is warranted.

Animation is a CSS property which allows to specify the behavior of a transition. With it, it is possible to describe the transition between CSS properties from value to value.

To create an animation, you need to specify the change in CSS properties with the keyword `keyframes`.

```CSS
@keyframes animationName {
  0% {
    width: 100px;
  }
  100% {
    width: 200px;
  }
}
```

Later, you reference the animation on the element needing it. You need to reference its name and you can then specify properties regarding, among many, how long the animation should last, how many times it should run, what easing function it should use.

```
.element-animation {
  animation-name: animationName;
}
```

Using specific properties or the shorthand `animation`, which collects all individual properties.

The animation, coupled with the property of `overflow` of the parent container, suggests that the unordered list is animated to move vertically. As the list items are shown one after the other, they are moved into the focus of the `div` container  

And that is, seemingly, how the effect is achieved.

## Possible Implementation

**The HTML**

In trying to replicate the mechanism found on the web the HTML structure eerily resembles the one found online.

Have a wrapping `div` in which an `h1` elements collects the visible text. In between the `h1` tags themselves divide the text always shown in a `span` and the text to be animated vertically in a parent `div`, in which the unordered list provides one element after the other.

As to try and replicate the infinite scroll of text, the last list item is set to coincide with the first, giving the impression of an endless loop.

It is important to note the number of words to ultimately display as to provide an animation that is not too slow nor too fast. Each word should be legible and the transition should avoid being noxious.

```HTML
<div class="container">
  <h1 class="header">
    <span class="header-visible-text">This is a simple</span>

    <div class="header-text-slider">
      <ul class="header-text-slider--slider--words">
        <li>header</li>
        <li>example</li>
        <li>effect</li>
        <li>trick</li>
        <li>header</li>
      </ul>
    </div>
  </h1>

</div>
```

**The CSS**

Focusing on the parent `h1`, the element is immediately set to `display: inline-flex;`. This allows to position the `span` and following `div` side by side, while leaving the list items vertically positioned.

Overflow is set to hidden, to show the elements only contained in the `h1` element.

Moreover, a specific height is set. The measure is specified in pairs with the property of `overflow` to show only one line of text and exclude the list items after the first.

```CSS
.container .header {
  display: inline-flex;
  overflow: hidden;
  height: 1.2em;
}
```

For the `div` collecting all list items, an animation is concocted to change the value of `bottom`. This, paired with a property of `position:relative`, allows to move the item from where it normally should be, in an upward fashion.

A specific `line-height` is set as to distance the list items from each other. Moreover, this is set to be of the same value of the parent `h1`, as to center the element itself.

```CSS
.header-text-slider {
  line-height: 1.2em;
  position: relative;
  bottom: 0;
  animation: slide-vertically infinite 8s 2s ease-in-out;
}
```

As far as the animation is concerned, the `keyframes` function is divided into five steps to go through all the list items. At each step, the bottom property is incremented by a value of 1.2em in order to show one list item at a time.

```CSS
@keyframes slide-vertically {
  0% {
    bottom: 0;
  }
  25% {
    bottom: 1.2em;
  }
  50% {
    bottom: 2.4em;
  }
  75% {
    bottom: 3.6em;
  }
  100% {
    bottom: 4.8em;
  }
}
```
