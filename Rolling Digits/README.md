Link to the working pen right [here](https://codepen.io/borntofrappe/full/eMbjEK/).

# Preface 

The purpose of this project is to create a simple animation for numbers, as the title would likely suggest.

Inspired by the same reference of yesterday's project, I wanted to replicate the approach chosen on the page of [Stripe Billing](stripe.com/billing) to show the total amount of the invoice #0008.

As numbers increase/ decrease the total value, indeed it is possible to see a neat animation in which numbers of higher/lower order roll in and out of view. It is a neat animation making use of a particular timing function and hiding/ showing elements depending on their position.

# Plan

- [x] include a container in which to showcase all digits.
- [x] figure out how to show/ hide numbers in the unit/tens/hundreds/thousands column.
- [x] animate the numbers to go from 0 to an arbitrary value.

# Lessons Learned

To show characters in a `div`, a simple solution is to leverage the property of `overflow` set to `hidden` on the container and properties of `position` and `top`/`right`/`bottom`/`left` on the nested items. The idea is to push items outside of their parent container and allow them to be visible only inside of said container.

```CSS
.container__text {
  overflow: hidden;
}
.container__text span.digit {
  position: relative;
  top: -4rem;
}
```

From this starting point, the simple reasoning concludes itself by moving the items back into view, back into the container.

```CSS
.container__text span.digit {
  position: relative;
  top: -4rem;

  animation: move-items-into-view 0.5s cubic-bezier(0.2, 0.82, 0.25, 1.5) forwards;
}

@keyframes move-items-into-view {
  to {
    top: 0;
  }
}
```

Easy implementation with CSS animation positioning properties.

The simple solution is however distant from the desired output. Indeed the goal is to show *different* digits. Not just digits out of thin hair.

One approach is to include additional elements and position them relative to the already styled `span` items. By offsetting their coordinates exactly by the animated amount, it is theoretically possible to show one number and then another. 

```HTML
<div class="container__text">
    <span>$</span>
    <span class="digit">1</span>
    <span class="digit">2<span>1</span></span>
    <span class="digit">3<span>2</span></span>
    <span class="digit">4<span>3</span></span>
    <span class="digit">5<span>4</span></span>
</div>
```

```CSS
.container__text span.digit span {
  position: absolute;
  top: 4rem;
  left: 0;
}
```

