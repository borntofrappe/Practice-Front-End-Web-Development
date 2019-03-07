# JS30 Reduce Practice

Proud result live, [right here on codepen](https://codepen.io/borntofrappe/full/ZPLPOo)

## Preface

The purpose of this practice session is the computation of the toal number of hours, minutes and seconds which can be attributed to a series of video elements. Said video elements are provided thruogh an unordered list, at the following [url](https://github.com/wesbos/JavaScript30/blob/master/18%20-%20Adding%20Up%20Times%20with%20Reduce/index-START.html). The precise information is found in the `data-time` attribute of each element, and the computation is achieved by looping through said elements while leveraging the `reduce` function.

## UI Update

While I was originally planning to finish the project in one day, I decided to split the effort in two updates. With the first one, I create the UI of the project, focusing mainly on the CSS stylesheet.

## JS Update

Eventually I came up with a solution making use of the `reduce` function. By no means this implies the solution is ideal, and much can be learnt from the [video inspiring the project](https://youtu.be/SadWPo2KZWg). That being said, I am confident the approach I took works.

## Animation Update

After showing the correct number of hours, minutes and seconds I wanted to introduce animation as the digits are included. The solution I chose is once more less than ideal, but works as follows:

- for every digit include a `div` container;

- in this container include one `span` element for every number leading up to the digit (from 0 and in increments of 1);

- animate each successive span element to overlap on top of the previous one.

The end result doesn't even require the property of `overflow` set to `hidden`. There is quite a bit more markup than one would hope, but the visual is rather pleasing.
