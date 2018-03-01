*Final result in this [pen](https://codepen.io/borntofrappe/full/yvwVxR/).*

*Bonus: same result, but using the preprocessor SCSS, in this [pen](https://codepen.io/borntofrappe/full/vdPgGJ/)*

### Preface

The goal of this project is to display a responsive navigation bar. Navigation bar which is animated following a scroll event.

The simple behavior can be described as follows:

- as the visitor scrolls down in the page, the navigation bar is translated vertically, out of sight;
- as the visitor climbs back up to the top of the page, the navigation bar recovers its initial position as it is translated vertically and in the opposite direction.

For the responsive portion of the navigation bar, flex and media queries are used. This to display an unordered list horizontally and stretching the entire width of the screen. Unordered list with nested list items clearly spaced from each other. List items which are shown in smaller numbers, and in smaller sizes, on smaller screens.

### How to

**Responsive navigation bar**

As mentioned the project uses flex and media queries.

- **flex**

In the HTML structure the navigation bar is simply made out of an unordered list of link-able list items

```HTML
<ul class="navigation-bar">
  <li><a href="#">Welcome</a></li>
  <li><a href="#">Features</a></li>
  <li><a href="#">Download</a></li>
  <li><a href="#">About</a></li>
</ul>
```

To reset the styling on the displayed text, a few CSS properties are warranted. These to remove the bullet points of the unordered list and the color and text decoration of the links themselves.

```CSS
ul {
  list-style: none;
}
ul li a {
  color: inherit;
  text-decoration: none;
}
```

For the flex itself, all that is required is to set the container as `flex`.

```CSS
.navigation-bar {
  display: flex;
}
```

The property of `justify-content` is then specified to clearly space the list items in the container.

```CSS
.navigation-bar {
  display: flex;
  justify-content: space-around;
}
```

It is essential to note that the unordered list takes as much space as only required by its content. To stretch the navigation bar across the entire viewport the property of width must be specified accordingly.

```CSS
.navigation-bar {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
```

For the purposes of the project, position is set to fix as to attach the navigation bar to the top. This choice is made in order to show the bar itself as the user scrolls, until the animation kicks in.

The property of transition is also specified to smoothen the vertical transition of the element.

```CSS
.navigation-bar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  transition: transform 0.5s ease-in;
}
```

Beside these property value pairs, other statements are specified, purely for aesthetics.

- **media queries**

As on smaller screens the list items may crowd the space at the top of the page, a media query is specified to hide some of the items themselves and reduce the font-size of the remaining ones.

```CSS
@media only screen and (max-width : 800px) {
  ul li {
    font-size: 1.1rem;
     }
  .disappear-on-small-screens {
      display: none;
     }
}
```

**Disappearing navigation bar**

Foreword: The functionality here described was drawn from an episode of the [JavaScript 30 course](https://javascript30.com/) by [Wes Bos](http://wesbos.com/). Kudos where kudos are due.

For the animation bar to disappear as the visitor scrolls past a defined threshold, JavaScript is used in order to listen for the scroll event on the entire window.

```JS
window.addEventListener("scroll", checkForScroll);
```

The function called in response to this event specifies the behavior described in the preface.

- if the distance from the top of the page surpasses a certain threshold, hide the navigation bar;
- if the same distance comes back to be less than the same threshold, show the bar once again.

To hide and show the navigation bar, a CSS class is declared and later added/ removed as the scroll event occurs.

The CSS class defines a vertical translation to the top.

```CSS
.navigation-bar-toggle {
  transform: translateY(-200px);
}
```

Through JS, this class is either added or removed based on the detailed behavior.

In the function itself, in order to understand if the scroll event occurs past the mentioned threshold, it is possible to leverage the `window.scrollY` method, which gives the distance from the top of the page.

As this value crosses the threshold, the defined CSS class is added and the statement moves the navigation bar vertically. It does so under the specification of the transition property, which guarantees the smooth change in value.

```JS
function checkForScroll(event) {
  // store in a variable the distance from the top of the page
  var distanceFromTheTop = window.scrollY;
  // if this value is more than 200px
  if(distanceFromTheTop > 200) {
    // add class, moving the navigation-bar upwards
    navigationBar.classList.add("navigation-bar-toggle");
  }
  //else
  else {
    // remove class, bringing the navigation-bar back down
    navigationBar.classList.remove("navigation-bar-toggle");
  }
}
```

*Update: Be warned*

As noted by [Wes Bos](http://wesbos.com/) in his insightful course, and remarked online [repeatedly](https://davidwalsh.name/javascript-debounce-function), the function as-is is prone to stress the performance of the page.

```JS
window.addEventListener("scroll", checkForScroll);
```

The scroll event occurs *every time* the visitor scrolls. The function which runs following this occurrence is made to run *every single time*. To improve the performance, as suggested, a *debounce* function is specified.

The code here used is basically pasted from the mentioned online sources. The intention behind it is simple: do not fire the function every time the event occurs. Give pause to the function, letting the code run only every so often.

```JS
/*
the debounce function accepts up to three arguments
two of them have default values, used in the invoking function doesn't specify otherwise
  - func, the function to run ever so often
  - wait, how long the debounce function should wait before running the inner function again
  - immediate, to alter if the function needs to skip the wait time and run immediately
*/
function debounce(func, wait = 15, immediate = true) {
  // define a timeout variable
  var timeout;

  // return a function
  return function() {
    // function which stores in a variable the context of the function itself and the arguments it passes
    var context = this, args = arguments;
    // create a variable which stores a function
    var later = function() {
      // function which runs the function passed as parameter
      // if the argument immediate is passed as false
      timeout = null;
      if(!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    // or if the callNow variable is true (meaning: immediate is true and timeout is null (in other words, the time-out is not ongoing))
    if(callNow) {
      func.apply(context, args);
    }
  };
};
```

When the scroll event occurs, the debounce function is run with the pre-manufactured code as argument.  

```JS
window.addEventListener("scroll", debounce(checkForScroll));
```

And, as specified by the argument wait, the function will wait for the prescribed time to be called again.

This may not change much in the small-case perspective of the project, but included in a larger application, the function will improve the web page performance.
