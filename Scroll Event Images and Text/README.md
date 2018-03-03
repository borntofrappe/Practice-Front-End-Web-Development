Link to the working pen right [here](https://codepen.io/borntofrappe/full/wyZGaG/). 

## Preface

The purpose of the project is straightforward: 
have a page in which images and text move up into sight as the visitor scrolls through the page and reaches their respective position.

This effect is inspired by several sites appling the described transition. 
The most notable example I can recall is on the web site for the [Tesla Roadster](https://www.tesla.com/roadster); 
as the visitor scrolls down, images of the fascinating car, alongside pertinent text are moved up into view.

The transition seems to involve a vertical translation and also change in opacity. By inspecting one of the appearing elements it is indeed possible to assess how the image is nested in a *reveal* div, with CSS properties of opacity and a transition involving a bezier curve timing funciton. 

## How to

The effect can be replicated by transitioning the desired elements from hidden and below to visible and atop.

The transition needs to occur when the visitor scrolls down the page, therefore it needs the contribution of the *scroll* event. 
What is required is to listen to said event on the window and showing the useful pieces of web page when the visitor reaches their height.

The focus on the project in on the JavaScript code, but the following [structure](https://codepen.io/borntofrappe/full/wyZGaG/) is concocted through the HTML and CSS components.

Admittedly too much thought went into the creation of the page, which prompts a separation of the thought process behind the project

- [HTML and CSS](#html-and-css), describing main aspects behind the development of the page's exterior
- [JS](#js), describing the scroll functionality describing the effect

# HTML and CSS

In the structure of the page the following list presents the main 

**Navigation-bar**

*Flex* is used for the navigation bar, with the inclusion of an empty list items used to push surrounding elements at the respective ends of the navigation bar.

```HTML
<ul class="navigation-bar">
  <li><a href="#">navigation bar</a></li>
  <li></li>
  <li><a href="#first-section">one</a></li>
  <li><a href="#second-section">two</a></li>
  <li><a href="https://www.pexels.com/search/space/">more pictures</a></li>
</ul>
```

The navigation bar is set to stretch over the entire width.

```CSS
.navigation-bar {
  display: flex;
  width: 100%;
}
.navigation-bar li:nth-child(2) {
  flex-grow: 1;
}
```

In order not to squash the elements to the left and right border, horizontal margin is also introduced for the list items.

```CSS
.navigation-bar li {
  margin: 0 2rem;
}
```

On smaller screen sizes, the structure is altered with a media query. 
Media query set to hide all list items except the last one. Media query also used to center this remaining element in the row.

```CSS
@media only screen and (max-width : 800px) {
  .navigation-bar {
    justify-content: center;
  }
  .navigation-bar li {
    display: none;
  }
  .navigation-bar li:last-child {
    display: inline-block;
  }
}
```

**Sections**

In the sections of the page *grid* is used for the layout of the elements. 

- In the hero section grid is used to easily align the header `div` vertically.

  ```CSS
  .hero {
    display: grid;
    align-items: center;
  }
  ```

  This section is purely to create space for the following divs, allowing for the scroll event to occur.

- In the first section following the introductory one, grid is used to center the image and text horizontally.

  ```CSS
  .one {
    display: grid;
    justify-items: center;
  }
  ```

- In the second second, grid is intensely used to lay four images in the available viewport. 

  The images are set to be displayed in two rows on large screens, and each in a single row otherwise. The structure itself is achieved through the property of `grid-template-areas` and `grid-area`. 

  `grid-template-areas` is applied on the grid container, describing a two columns and two rows layout.

  ```CSS
  .wherefore .images {
    display: grid;
    grid-template-areas: "one two" "three four";
    justify-items: center;
  }
  ```

  `grid-area`(s) are applied on the grid items, labeling the items which are referenced through the previous property.

  ```CSS
  .image-one {
    grid-area: one;
  }
  .image-two {
    grid-area: two;
  }
  .image-three {
    grid-area: three;
  }
  .image-four {
    grid-area: four;
  }
  ```

This structure is then altered, as mentioned, for smaller screens. In this occurrence, the media query prompts a layout of four rows, each dedicated to a single image.

```
@media only screen and (max-width : 800px) {
  .wherefore .images {
    display: grid;
    grid-template-areas: "one" "two" "three" "four";
  }
}
```

**Images**

While the structure built through the grid property does create an effective grid, the sizes of the rerefenced images overflow the prescribed measures. This could be solved with locally sourced and properly sized images, but as we reference images from [pexels](https://www.pexels.com), we don't have a direct handle on the specific width and height. 

In order to solve this issue, what is possible is to set a max-width for the parent container.

```CSS
.image {
  max-width: 400px;
}
```

And set the width of the images to be 100% of their parent element. This has the added benefit of resizing images as the screen width is reduced.

```CSS
img {
  width: 100%;
}
```

The same solution is applied for the image in the first section. This also explains the lack of specificity in the `img` selector. That being said, and for larger-scale projects, the vague CSS declaration may cause issues.

```CSS
.one .image {
  max-width: 700px;
}
```

**What else**

Beside the mentioned specifics, which explain the layout and structure of the page, a couple of additions are included, purely to style the page a bit. But also to practice a little with the underlying concepts.

- a pseudo selector is included for the list items in the navigation bar, in order to create a nice transition on hover.

  ```CSS
  .navigation-bar li:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #f0c915;
    transition: all 0.3s ease-out;
  }
  .navigation-bar li:hover:before {
    width: 100%;
  }
  ```

- a keyframe structure is included to animate the anchor link in the first section, in order to once again style the element on hover. 
As the visitor hovers the prescribed text, the same flashes to the accent color before returning to its original hue.

  ```CSS
  .headers a:hover {
    animation: hover-change-color 0.8s ease-out;
  }

  @keyframes hover-change-color {
    0% {
      color: #fff;
    }
    50% {
      color: #f0c915;
    }
    100% {
      color: #fff;
    }
  }
  ```


# JS

In order to transition the prescribed elements into view, as the visitor scrolls to their vertical position, it is first necessary to listen for the scroll event on the entire window.

```JS
window.addEventListener("scroll", debounce(checkForScroll));
```

The addition of the debounce function was motivated in the previous project, but simply put it works as follows: instead of running the block of code every time the scroll event occurs, run it every so often. It is used to avoid performance issues. You can read about it [online](https://davidwalsh.name/javascript-debounce-function) or in the [previous project](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/Scroll%20Event%20Navigation%20Bar), where it is aptly commented.

For the function called in response to the scroll event, the following structure is implemented.

1. store in constant placeholders the images and container of headers to be transitioned on scroll

  ```JS
  const images = document.querySelectorAll(".image-default");
  const text = document.querySelector(".text-default");
  ```

2. In the function itself, start by computing the distance from the top of the page to the bottom of the visible area. This value changes as the visitor scrolls through the page itself.

  ```JS
  function checkForScroll(event) {
    var distanceFromBottomToTop = window.scrollY + window.innerHeight;
  }
```

3. For the images, use the `.forEach` method to target each image.

  ```JS
  images.forEach(function(image) {

  });
  ```

  In this block of code compute the distance of each image from their position to the top of the page. If the distance obtained in point 2 (which changes) surpasses the computed value, add the class of `.image-scroll`, which allows for the transition to occur.

  ```JS
  images.forEach(function(image) {
      var distanceFromImageToTop = image.offsetTop;
      if(distanceFromBottomToTop > distanceFromImageToTop) {
        image.classList.add("image-scroll");
      }
  });
  ```

4. For the container of text, the logic is the same, but applied to the single target, not on multiple selectors.

  ```JS
  var distanceFromTextToTop = text.offsetTop;
  if(distanceFromBottomToTop > distanceFromTextToTop) {
    text.classList.add("text-scroll");
  }
  ```

  In this instance, the class of text-scroll is applied, transitioning the text.
  
The entire function looks as follows: 

```
function checkForScroll(event) {
  var distanceFromBottomToTop = window.scrollY + window.innerHeight;
  
  // for each image
  images.forEach(function(image) {
    var distanceFromImageToTop = image.offsetTop;
    if(distanceFromBottomToTop > distanceFromImageToTop) {
      image.classList.add("image-scroll");
    }
  });
  
  var distanceFromTextToTop = text.offsetTop;
  if(distanceFromBottomToTop > distanceFromTextToTop) {
    text.classList.add("text-scroll");
  }
  
}
```

As mentioned, this relies on the classes of `.image-scroll` and `.text-scroll` for the transition. These specify a change in opacity and vertical positioning. As specified in the following CSS statements.

For the images the following properties are stated.

```CSS
.image-default {
  opacity: 0;
  transform: translateY(200px);
  transition: all 1.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.image-scroll {
  opacity: 1;
  transform: translateY(0);
}
```

While for the text, a similar structure is created.

```CSS
.text-default {
  opacity: 0;
  transform: translateY(150px);
  transition: all 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.text-scroll {
  opacity: 1;
  transform: translateY(0);
}
```

Producing the desired effect of hiding the elements by default and showing them in an upward motion on scroll.

