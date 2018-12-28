# React Timer

Proud project [right here](https://codepen.io/borntofrappe/full/dwVZRQ), live on Codepen. It's a work-in-progress though.

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