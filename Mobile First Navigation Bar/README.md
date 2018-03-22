Link to the working pen right [here](https://codepen.io/borntofrappe/full/zWwwdg/).

# Preface

The purpose of this project is to create a navigation bar primed for mobile experience. Which means, the navigation bar ought to display only the items strictly necessary and a toggle option to display additional results.

The design behind the navigation bar in question takes inspiration, sometimes a tad too much, from [Nugget.one](https://nugget.one/). 

That being said, the SVG are manufactured, optimized and included-in house. The effect is also achieved in a different fashion, with a perhaps less-than-optimal implementation. The goal is, as usual, to draw inspiration from something neat-looking and trying to implement the found construct.

# Lessons learned 

It is possible to create a neat navigation bar just with HTML, CSS and a touch of JavaScript. That is the main lesson learned in this latest project. It also doesn't take as much code as previously anticipated.

In the HTML document there are tags which serve no purpose other than being the visual equivalent of sugar, but those represent semantics which can be omitted. Their relevance in the DOM can even be removed for the purpose of accessibility through the implementation of aria attributes. Which should be in and on itself a topic of learning.

## classList

Javascript comes with an handy read-only property of [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList). Applied to an HTML element, this property opens the door for several methods which are used in the project in question, and enable useful actions around HTML and classes.

Through `classList` it is indeed possible to 

- add a class, through the `classList.add("")` method;
- remove a class, through the `classList.remove("")` method;
- check if an element has a class, through the `classList.contains("")` method.

Each code hereby presented needs to simply be applied on an HTML element and include in parentheses the classes to be added, removed, or checked.

For instance, directly from the project in question:

```JS
// check if the HTML element has a class of .rotation.first-span
// the statement itself returns a boolean depending on whether the element has the class (true) or not (false)
menuToggleFirstSpan.classList.contains("rotation-first-span");

// add a class of .rotation.first-span
menuToggleFirstSpan.classList.add("rotation-first-span");

// remove a class of .rotation.first-span
menuToggleFirstSpan.classList.remove("rotation-first-span");
```

There are other methods allowed by this property, such as `classList.replace("")`, used to replace a class with an other, or even `classList.toggle("")`.

**Update** 

`classList.toggle("")` actually seems to provide an advantage over the structure of the JS script used for the project. Allowing to toggle a class (adding a class if not present, removing it otherwise), the method indeed promises to improve the code's read-ability and shorten the number of lines required for the effect to be enabled.

It is no longer necessary to go through the `classList.contains("")` method and add/remove the class depending on the return value, as seen in the following script:

```JS
if(menuToggleFirstSpan.classList.contains("rotation-first-span")) {
      menuToggleFirstSpan.classList.remove("rotation-first-span");
  }
  else {
      menuToggleFirstSpan.classList.add("rotation-first-span");
  }
```

A single line of code solves the same purpose, through the newly discovered method.

```JS
menuToggleFirstSpan.classList.toggle("rotation-first-span");
```

## Absolute positioning

Moving toward the lessons learned with regards to CSS, the project makes use of flex properties, but those have been thoroughly discussed in previous exercises. In this particular task, *absolute positioning* plays an equally important role, and hasn't been discussed as much.

Through absolute positioning it is possible to alter the position of an HTML element. This is allowed by modifying the value of the `position` property, and setting its value to `absolute`. 

With this value, the affected HTML element is positioned in relation to the nearest, upstream HTML element with a property of `position:relative`. This element is used as an "anchor" with which the absolute-positioned element is connected. 

If no parent element has such a property, the absolute-poisitioned element is positioned relatively to the root of the page, to the `<html>` tags.

Once this concept is understood, it is easy to include values of `relative` and `absolute` in order to freely position a child element in relation to its wrapping tags. Through properties of `top`, `right`, `bottom`, `left`, as through many other properties which modify the original position of an HTML element, it is virtually possible to locate an element anywhere on a page.

For the project in question for instance, the navigation bar `<nav>` element has a property of `position` set to `relative`. Nested items like the panel of additional information, or even the spaceship icon, are positioned in relation to this wrapping element through the property of `position` set to `absolute`.

```CSS
nav.navigation-bar {
  position: relative;
}

nav.navigation-bar div.menu-items {
  /* 
  position to the top left of the navigation bar 
  */
  position: absolute;
  left: 0;
  top: 0;
}
.spaceship-streak {
  /* 
  position to the bottom right of the navigation bar 
  */
  position: absolute;
  bottom: -2px;
  right: 0;
  width: 30%;
}
.spaceship-icon {
  /*
  position to the bottom right of the navigation bar, just next to the .spaceship-streak element
  */
  position: absolute;
  bottom: -15px;
  right: 30%;
}
```

## !important 

Adding and removing classes to HTML elements allow for CSS properties to be modified through JavaScript. For the project in question, this allows to transition elements from one set of properties to another.

That being said, it is important to consider how the properties are included through the class declaration. It is indeed possible to add a class with a different color property and have the element retain the previous, original value.

In the following example, adding the class of of `.rotation-first-span` will **not** alter the property of `background-color`:

```CSS
.first-span {
  background-color: #ee4a23;
}
.rotation-first-span{
  background-color: #fff;
}
```

This is because properties are set by classes in order. 

In the example, adding a class of `.rotation-first-span` prompts in the HTML element to have an additional class, without removing the previous one. The property will therefore not be altered.

A fix for this inconvenience is provided by the keyword `!important`. Added following a property-value pair, before the semi-colon, this statement tells the browser that the value should take precedence over other declarations.

Updating the example, including the `!important` concoction after the property is enough to alter the property of `background-color`:

```CSS
.first-span {
  background-color: #ee4a23;
}
.rotation-first-span{
  background-color: #fff !important;
}
```

## cubic-bezier

A timing function of `cubic-bezier` is included for the animation inevitably enabled on the spaceship icon. Unlike keywords such as `ease`, `ease-in`, `ease-out`, `linear`, this function allows to specify the way an animation occurs by including four values, as here briefly explained.

The timing function makes use of the concept of a bezier curve. This is a curve in a two dimensional panel which goes from an origin coordinate of (0,0) to a final coordinate of (1,1). 

The curve itself is defined by these two "bordering" coordinates as well as two additional points: (x1,y1) and (x2,y2).

These are intermediary points which describe the actual pattern of the curve and these are, in order, the values accepted in parentheses by the `cubic-bezier` function. 

```
cubic-bezier(x1, y1, x2, y2)
```

For the purposes of an animation, the x-axis represents the timing of the animation, going from 0 at the beginning of the animation to 1 at its completion. Accepted values therefore are in the [0,1] range. 

The y-axis represents instead the change enacted by animation, going from 0 for the properties the element has at the beginning of the animation to 1 for the properties the element assumes at the end of the animation. It is therefore possible to include values outside of the [0,1] range, being aware that the animation will inevitably start with the properties described in [0] and end with the properties described in [1].

In the example provided by the project, the property of `right` is altered from `30%` to `36%`, pushing the affected elements to the left. The following cubic-bezier function is then defined:

```
cubic-bezier(0.49,-0.2, 0.46, 1.07)
```

Specifying for the y-coordinates the values of `-0.2` and `1.07`. These values, stretching past the [0,1] range, force the animation to alter the `right` property behind the defined values. Firstly, the animation will move in the opposite direction, reducing the `right` value. Afterwords, the animation will "shoot" past the final value, before eventually setting to it.






