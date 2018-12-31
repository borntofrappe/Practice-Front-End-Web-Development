# React Timer

Proud project [right here](https://codepen.io/borntofrappe/full/dwVZRQ), live on Codepen. Styled and animated!

## Preface

Looking once more at a mobile experience, and specifically a native application on a family member's mobile, I decide to practice once more with react by building a timer application.

A good opportunity to practice with the framework and particularly building an interface with multiple screens.
Here's the gist of the application. Once again, sketching it on paper proved to be rather useful to clear my mind on the project's development.

- the visitor is immediately greeted by an interface allowing to describe the number of seconds, minutes, hours for the timer.

  The digits are included through a simple dial, right beneath a display. In this dial, the numbers from 0 to 9 are detailed in a grid. As the visitor types on the buttons, the respective number is added above. Above, the display describes the time in the hh:mm:ss format, and the numbers are progressively added from right to left.

  In addition to these elements, the display shows a button right next to the hh:mm:ss format, to 'clear' so to speak, to remove the latest number included in the application.

  As a digit (at first different from 0) is typed, a button is displayed below the dial, to start the timer. This button completes the starting UI, and when pressed triggers the following visual starting the timer.

- when a timer begins, the first interface is substited by the visual describing the actual countdown.

  The countdown is shown with the hh:mm:ss format, as one would normally expect from a timer application. This string is centered in a circle, which visually accompanies the passing time. Simply put, as time passes by, a small circle positioned at the very top of the larger circle moves around the perimeter, coloring the section on which it traverses.

  Beside the timer, there should also be a way to pause and stop it, in this last instance as to start a new one. A button matching the design of the play button should be positioned below the large circle to pause the countdown, and to let it play once more. Right next to this button, there should be also a button to go back to the original interface. As of now this string generates quite the bit of asymmetry, but once the application is developed a bit further, it will make more sense.

There are other elements to be added in the application:

- the possibility to label the timer, with a string specified atop the countdown;

- the possibility to add a minute to the timer current in place, with a button right below the countdown;

- the possibility to reset the timer, by leveraging yet another button. This button should perhaps be positioned exactly where the previous one sits, and the two might 'swap' places according to whether the timer is or is not ongoing;

- the possibility to add another timer. This is the trickiest feature, and surely not something I plan to tackle in v1. This possibility should sit to the opposite side of the pause/play button, finally completing the project with a bit of symmetry.

## Update - Input Data

After a bit of tinkering, the UI for the input interface is basically done. What is left is a convenient way to input the digits, from the buttons to the the display above them. Initially, I decided to include the values for the hours, minutes and seconds in a multi-dimensional array.

```js
this.state = {
  time: [["h", 0], ["m", 0], ["s", 0]]
};
```

This array is then used in a child component adding the actual digits. The pending issue is to add the digits, to the specific arrays. This is perhaps where the 2d array is rather unfit for the job. I could actually track the input and display it selectively, to the seconds, minutes and finally hours array. Something akin to:

- add the digits to a string value;

- fragment the string into an array;

- add the digits from the first to last, to the seconds array to the minutes and hours.

Honestly, I like the convenience of a 2d array, to map through the items and create the necessary elements. I do not like the data structure as it currently sits in the state, however. A solution is to include an object, as follows:

```js
this.state = {
  time: {
    h: 0,
    m: 0,
    s: 0
  }
};
```

Pass the object to the components and only then create the multi-dimensional array. This using `Object.entries()` and passing as arguments the object itself.

Once this data structure is established, it is a matter of adding the digits to the rightful place. As it stands, the application needs to collect one integer at a time, with the integers progressively describing higher and higher order time frames. (simply put, as you enter 1, this 1 represents the seconds; as you type 4, this 4 not represents the seconds, with the 1 representing the tens of seconds).

I found a perhaps silly solution leveraging an input string, in which to collect the digits, and the `string.padStart()` method.

Simply put:

- as the buttons are pressed, the respective value is appended to the input;

- a separate string is built on the basis of this input, padding `0` to make a six-letters long string;

- this six-letters long string is divided in hours, minutes and seconds value, on the basis of the index of each letter;

- the then string value is included in the data structure, parsing the string into an integer.

Cute approach, I'd say.

## Update - Structure

Before diving into the style of the application, to enance the working prototype, I decided to sit down and document the project so far. Most importantly describing the structure of the project:

- `Timer`, class component managing the state and rendering the components making up the application;

- `TimerInput`, component showing the display and the dial to set out the number of hours, minutes and seconds the timer should last;

- `TimerOutput`, component showing the countdown timer.

I decided to create one component for each interface to easily display either one on the basis of a boolean.

```jsx
return(

  {
    isTimer ?
    <TimerOutput />
    :
    <TimerInput />
  }
);

```

Diving into each component, `TimerInput` shows the following elements:

- `InputDisplay`, showing the number of hours, minutes and seconds, next to a button erasing the last digit included in the application;

- `InputDial`, describing the grid of buttons allowing to add the numbers to the display;

- `TimerButton`, allowing to start the timer. Not labeled `InputButton` as it is included in both the input and output, just with a different method attached to it.

`TimerOutput` shows instead the following elements:

- `OutputDisplay`, in which to show the countdown for the selected stretch of time. This should detail the time discarding `0` values, and showing only one digit when the greatest unit of measures goes below ten (showing for instance `1:23` for 0 hours, 1 minute and 23 seconds);

- `OutputControls`, nesting button elements depicting the several functionalities accessible in the output screen. Among which:

  - the possibility to add a minute;

  - the possibility to toggle the timer, pause and resume it (using the same button found in the input component);

  - the possibility to go back to the input component, de facto removing the current ongoing (or paused) timer.

  - the possibility to reset the timer. This possibility actually 'hidden' by defaultought to be displayed when the timer is pause, and in place of the possibility to add a minute.

Once this structure is taken care of, and well documented, it is possible to move onward with the most intriguing aspects of the project, animating the transition between views and showcasing the countdown timer a little better.

## Update - Roadmap

In the end I decided to jump on the SVG wagon and display the countdown timer through `text` elements as well as `path` and `circle` elements. It was much in the spur of the moment, so I need a moment to go through the new code and document the effort, but it makes for quite the nice result.

What is left:

- document the Output.js file, mostly regarding the newly coded SVG elements;

- add transition between views, through `react-transition-group`.

## Final Update

The project was finished as the 30th of December 2018. While the code is rather well documented, the same cannot be argued for the README. I will undoubtedly re-manufacture the markdown document as I plan to port this project to my 'React Practice series', but for the time being, I am satisfied appening a final update to the effort.

I added a few comments to explain the output, which checks the first priority on the roadmap list. For the second priority, I had some issues with `react-transition-group`, and I decided to spring, pun intended for a different library.

Using `react-spring`, it is possible to animate between views rather easily, with the following structure:

- wrap the component in a `Spring` component:

  ```jsx
  <Spring>{/* my component */}</Spring>
  ```

- define th properties to-be-animated in an object, with property value pairs benefiting from the wording of CSS

  ```jsx
  <Spring
    from={{ opacity: 0, transform: "translateY(-2.5rem)" }}
    to={{ opacity: 1, transform: "translateY(0)" }}
  >
    {/* my component */}
  </Spring>
  ```

- add the transition to the component by way of including the properties in a `style` prop. Similarly through a render prop component, passing as argument exactly those properties which are affected.

  ```jsx
  <Spring
    from={{ opacity: 0, transform: "translateY(-2.5rem)" }}
    to={{ opacity: 1, transform: "translateY(0)" }}
  >
    {({ opacity, transform }) => (
      <InputContainer style={{ opacity, transform }} />
    )}
    {/* my component */}
  </Spring>
  ```

It might sound convoluted, and the markdown formatting doesn't do justice to the snippet, but removing the additional destructuring step, it is as simple as follows.

```jsx
<Spring
  from={{ opacity: 0, transform: "translateY(-2.5rem)" }}
  to={{ opacity: 1, transform: "translateY(0)" }}
>
  {style => <InputContainer style={style} />}
  {/* my component */}
</Spring>
```

This ought to work. Check out the code in `TimerInput` and `TimerOutput` for a real-living-breathing application.

One last note. Beside adding the two items on the roadmap, I also added another small, but rather neat feature, which allowed me to practice with a controlled input once more. I indeed added a label, in the output display, for the name of the timer. This label can be altered simply by clicking on it, and having a makeshift popup allow you to define a different string. An entertaining use of time.

<!-- TODO: take the project into the Reactice series -->
