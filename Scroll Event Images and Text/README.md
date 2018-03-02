Working on this [pen](https://codepen.io/borntofrappe/full/wyZGaG/). 

## Preface

The purpose of the project is straightforward: 
have a page in which text and images move up into sight as the visitor scrolls through the page.

This effect is inspired by several web sites appling the move-up transition. 
The most notable example I can recall is on the web site for the [Tesla Roadster](https://www.tesla.com/roadster); 
as the visitor scrolls down, images of the fascinating car, alongside pertinent text are propped up.

The transition seems to involve a vertical translation and also change in opacity. 

## How to

The effect can be replicated by transitioning the desired elements from hidden and below to visible and atop.

The transition needs to occur when the visitor scrolls down the page, therefore it needs the contribution of the *scroll* event. 
What is required is to listen to said event on the window and showing the useful pieces of web page when the visitor reaches their position.

### HTML and CSS

The focus on the project in on the JavaScript code, but the following [structure](https://codepen.io/borntofrappe/full/wyZGaG/) is concocted through the HTML and CSS components.
Admittedly too much thought went into the creation of the page. 

**Navigation-bar**

*Flex* is used for the navigation bar, with the inclusion of an empty list items used to push surrounding elements at the respective ends of the navigation bar.

```HTML
<ul class="navigation-bar">
  <li><a href="#">Space</a></li>
  <li></li>
  <li><a href="#">Introduction</a></li>
  <li><a href="#">Appetizer</a></li>
  <li><a href="#">Show more</a></li>
</ul>
```

In order not to squash the elements to the left and right border, horizontal margin is also introduced for the list items.

```CSS
.navigation-bar {
  display: flex;
  width: 100%;
}
.navigation-bar li {
  margin: 0 2rem;
}
.navigation-bar li:nth-child(2) {
  flex-grow: 1;
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
    font-size: 1.1rem;
    display: none;
  }
  .navigation-bar li:last-child {
    display: inline-block;
  }
}
```

**Sections**

For two of the sections of the page *grid* is used for the layout of the elements. 

In the first section grid is used to easily align the header `div` vertically.

```CSS
.hero {
  display: grid;
}
.hero .headers {
  align-self: center;
}
```

In the final section grid is used to lay four images in the available viewport. The images are set to be displayed in two columns on large screens, and in a single column otherwise.

The structure itself is achieved through the property of `grid-template-areas` and `grid-area`. 

The former for the grid container, describing a two columns and two rows layout.

```CSS
.wherefore .images {
  display: grid;
  grid-template-areas: "one two" "three four";
  justify-items: center;
}
```

The latter for the grid items, labeling the items referenced through the previous property.


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

This structure is then altered, as mentioned, for smaller sizes, in the already created media query.

```
@media only screen and (max-width : 800px) {
  .wherefore .images {
    display: grid;
    grid-template-areas: "one" "two" "three" "four";
  }
}
```

Hence, on smaller screens the grid shows each item on a separate row.

**Image sizes**

While the structure built through the grid property does create an effective grid, the sizes of the rerefenced images overflow the prescribed measures.

In order to solve this issue, what is possible is to set a max-width for the parent container.

```CSS
.images .image {
  max-width: 400px;
}
```

And set the width of the images to be 100% of their parent element. This has the added benefit of resizing images as the screen width is reduced.

```CSS
img {
  width: 100%;
}
```

The same solution is applied for the mid-section image. This also explains the lack of specificity in the `img` selector. That being said, and for larger-scale projects, the vague CSS declaration may cause issues.

```CSS
.welcome .image {
  max-width: 700px;
}
```

**What else**

Beside the mentioned specifics, which explain the layout and structure of the page, a couple of additions are included, purely to style the page a bit, and practice a little with the underlying concepts.

- a pseudo selector is included for the list items in the navigation bar, in order to create a nice transition on hover.
- a keyframe structure is included to animate a span, in order to once again style the element on hover.


### JS Already
