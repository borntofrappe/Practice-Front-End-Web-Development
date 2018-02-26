**Gradient border**

What follows is a small explanation for the implemented solution. For reference, here's a live example on *[codepen](https://codepen.io/borntofrappe/full/aqNJdx/)*.

---

To implement a gradient border, it is possible to leverage `border-image` properties. These are a tad confusing, so the following semi-explanation might help.

**Intro to border-image**

Border image properties allow to alter the border of an HTML element, as to include an image or, as in the example hereby presented, a gradient.

There exist several properties which individually determine how the border will ultimately appear on the page. There exist also a shorthand version which collects all separate properties in a single statement.

Much alike there are several animation properties, like `animation-name`, `animation-duration`, and a shorthand statement in `animation`.

**Border first**

Before analyzing the individual properties and how they merge in a collective statement, it is important to preface that `border-image` depends on the presence of a `border`.

The property of `border-style` is of particular importance. Beside this one, `border-width` can be furthermore included, in which case the border-image is influenced by this size, but the additional property is not required.

```CSS
/* introduce a border on the element; otherwise the border is not visible */
border-style: solid;
```

**Border image properties**

As anticipated, there exist multiple border-image properties, to manufacture different borders at will. Some of them are more important than others; some of them are also less self-explanatory than one could hope.

- *border-image-source*:

  this property is essential for the image/gradient to occur on the border.

  Accepted values are the URL of an image or a gradient for exactly a gradient. Gradient can be linear, radial or even repeated.

  In the example hereby provided a linear gradient will suffice:

  ```CSS
  /* define a linear gradient to be used as the border of the element in which the property is included */
  border-image-source:
    linear-gradient(
      45deg,
      red,blue
    );
  ```

- *border-image-slice*:

  This not-always-clear property determines where to slice the element area as to introduce the border-image.

  It accepts up to 4 values, in which case the property specifies where to slice in relation to the top, right, bottom, and left sides.

  It accepts

  - unitless numbers, which refers to pixels for raster images and gradients, or refers to coordinates for svg files;

  - percentages, measuring the slice region relative to the size of the image;

  - fill, in which case the border-image is used as background for the element as well.

  The quickest way to understand the accepted values is to simply experiment with them. For a not-so-complicated example such as this one, untiless numbers are more than enough.

  It is important to note that, even if these are without unit, they do refer to pixels when applied to a raster image, or a gradient, such in our example.

  ```CSS
  /* slice 10 px from each side to introduce the border-image */
  border-image-slice: 10;
  ```

- *border-image-width*:

  Representing the width of the border-image, this property also accepts up to 4 values, specifying the border-width for the top, right, bottom, left side respectively.

  Accepted values are:

  - unitless numbers, in which case the width is determined by the multiplication between said number and the `border-width`;

  - percentage values, describing the width as relative to the border-image area;

  - auto, causing the size to be set by `border-image-slice`, or `border-width` if the first one was to be unavailable.

  In the simple instance of the gradient border, `auto` replicates the measure found in `border-image-slice`.

  ```CSS
  /* 10px, replicating the value found in border-image-slice */
  border-image-width: auto;
  ```

- *border-image-outset*

  How far to extend the border-image, past the border of the element.

  The property again accepts up to 4 values, which can be:

  - length values, describing the outset in absolute measure;

  - unitless values, computing the outset as the multiplication between the number and the `border-image-slice`, or `border-width` if the first one was to be unavailable.  

  ```CSS
  /* outset of 20px; 20px being the result of 2 times border-image-slice */
  border-image-outset: 2;
  ```

**Border-image shorthand**

All previous properties can be collected in one single statement.

Under the property of `border-image` it is possible to subsequently declare the source, slice, width and outset properties.

For gradients though, the shorthand property seems to work only when specifying the first two properties of source and slice.

```CSS
/* specify source of linear gradient and slice area of 10px */
border-image:
linear-gradient(
    45deg,
    red,blue
  ) 10;
```

For gradients it is therefore advisable to specify the properties of source, slice and width separately, to better understand the solution being implemented.

The `border-image` property often behaves less predictably than one could hope and the single properties allow understand the entire system slightly better.
