Link to the working pen right [here](https://codepen.io/borntofrappe/full/PRKNrj/).

# Preface 

The purpose of this simple project is to animate SVG assets through CSS. This is allowed by CSS properties of `animation` and the keyword of `keyframes`.


# Lessons Learned: CSS animation

CSS animations are built in two steps:

1. **declare the animation**. Specify the name of the animation, along with the properties that should be affected and the pace at which these should be affected.

1. **call the animation on the desired element**. Specify the behavior of the animation itself, affecting for instance the speed or duration of the animation itself.

## Declaring animations

In its simplest form a CSS animation looks something like this

```CSS
@keyframes name-of-the-animation {
    pace-of-the-animation {
        properties-to-change: value-of-properties-to-change;
    }
}
```

Breaking down each component:

1. Each animation is introduced by the **@keyframes** keyword and declared with a **name**. This name will be essential to later reference the animation on a CSS selector.

  It is advisable to pick a name roughly depicting the animation in a concise fashion, something like `move-image-to-the-right`, `make-header-disappear`, but beside this suggestion, you are free to call it whatchamacallit.

  ```CSS
  @keyframes name-of-the-animation {

  }
  ```

2. In between parenthesis is where the structure of the animation is explained. In here you are able to specify the *pace* of the animation and which *properties* to change. The syntax eerily replicates normal CSS styling, and it will therefore feel rather familiar.

  - define the **pace** of the animation, through *keywords* or *percentages*.

      Keywords such as `to` and `from`.

      ```css
      @keyframes name-of-the-animation {
        from
        to
      }
      ```
      Percentages representing the entire spectrum between `0%` and `100%`, for more granular control on the animation.

      ```css
      @keyframes name-of-the-animation {
        0%
        20%
        50%
        100%
      }
      ```

    - define which **properties** to change at each point. In between parenthesis, declaring property-value pairs like any respectful CSS statement would.

      ```css
      @keyframes name-of-the-animation {
        0% {
          color: blue;
          background-color: azure;
          }
        20% {
          color: yellow;
          background-color: purple;
          }       
        50% {
          color: orange;
          background-color: pink;
        }
        100% {
          color: red;
          background-color: gold;
        }
      }
      ```

#### Additional Considerations on pace and properties

- percentages are implemented regardless of the order with which they are presented. A 30% point might be declared following a 50% and still be precede its execution.

- duplicate percentage points will be resolved by considering the one declared as last.

- properties which are declared in some, but not all percentage points will be either *dropped* or *implicitly* linked. Be careful with what you really want. If it is a measure such as `width` or `percentage`, the browser might be able to fill the blanks, but it is advisable to repeat property-value pairs in every stepping point.

- CSS animation ignores statements labeled as `!important`.

**Summing up**:

> Declare CSS animations specifying 1) name, 2) pace and 3) affected properties


## Calling animations

Once an animation is declared it is possible to call it on any CSS selector.

There exist several specific properties used to call an animation and specify its behavior as well as a shorthand version declaring multiple values together. 

Some of them are particularly straightforward, while others have subtle, not-so-obvious considerations attached to them. One thing in common they have is the ability to give plenty of options to customize your animation.

### Specific Properties

- **animation-name**

  This property refers to the name of the declared animation.

  *Accepted values*: `<name-of-the-animation>`

- **animation-duration**

  How long should the animation last.

  *Accepted values*: `<any-amount-of-time>`

  *Examples*: 2s, 1000ms

- **animation-timing-function**

  How the animation should progress from end to beginning, modifying the default value of `ease`.

  *Accepted values*: `keywords` or `time functions`

    Keywords such as:

    - `ease-in`; slow beginning

    - `ease-out`; slow ending

    - `ease-in-out`; slow beginning and slow ending

    - `ease`; slightly faster beginning and slow ending

    - `linear`; keeping the same speed all throughout the animation

    [Time functions](https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function) such as:

    - `cubic-bezier()`;

    Function with values describing the start of the curve, two intermediate points and end of the same curve. I discussed this point in the [previous project](), but for a neat visual representation visit [this link](http://cubic-bezier.com/#.47,-0.27,.69,1.32). 

    - `steps()`;

    Function with values describing how many discrete steps the animation should take.

- **animation-direction**

  Describing the path taken by the animation.

  *Accepted values*: `keywords`

    - `normal`

    - `reverse`; from end to beginning

    - `alternate`; reversing the direction at every iteration. Going from beginning to end at the first iteration and from end to beginning at the second. And keeping up this trend.

    - `alternate-reverse`; End to beginning, beginning to end. And so on and so forth.

- **animation-delay**

  How long the animation shall wait for the change in properties to begin. In the shorthand `animation` property, if there are two time values, the first is the time duration, the second its delay.

  *Accepted values*: `<any-amount-of-time>`

- **animation-iteration-count**

  How many times the animation should be repeated.

  *Accepted values*: `<finite-number>`, `infinite`

- **animation-fill-mode**

  Describing the properties, if any, the element should retain once the animation is completed.

  *Accepted values*: `keywords`

  - `none`; default option. Completing the animation, the properties of the elements are decided by CSS declarations.

  - `forwards`; the element retains the properties specified by the animation in the last keyframe (this depends on the basis of direction and iteration-count. For a normal animation going to 100%, the values adopted will reside in this last 100% keyframe).

  - `backwards`; the element retains the properties specified by the animation in the first keyframe. Moreover, if a delay is set up for the animation, 

  - `both`; at the end of the animation the element retains the properties as specified by `forwards`, by the last keyframe. At the beginning of the animation the element assumes the properties as specified by `backwards` (if there is a delay). 

- **animation-play-state**

  Describing whether the animation is paused or running. Useful to pair with JS statements in order to play and pause the animation at will.

  *Accepted values*: `running`, `paused`

### Shorthand Declaration

Instead of detailing each separate property one at a time, it is possible to specify each value in one conjoint statement.

The **animation** property accepts all the previous properties in one line.

```
animation:
      animation-name
      animation-duration
      animation-timing-function
      animation-direction
      animation-delay
      animation-iteration-count
      animation-fill-mode
      animation-play-state;
```

It is possible to include whichever properties are only needed for the desired effect.

>**Summing Up**:
>
>  Call a declared animation and specify its behavior with the appropriate properties
