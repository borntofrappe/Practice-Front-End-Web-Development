For a live example, you may check this [pen](https://codepen.io/borntofrappe/full/GQZrGg/).

### Preface 

Background-image is a property that cannot be transitioned in CSS. 
Unfortunately, gradients do rely on this property and it is therefore not immediatly possible to transition from gradient to gradient. 
Which is a pity honestly, as the subtlety of gradients make them a rather more pleasing choice than solid colors. 

To achieve the effect, it is possible to leverage pseudo-elements and absolute positioning.

### How to

Pseudo-elements come in pairs and come attached to any HTML element. These are `:before` and `:after`. 

They can be used to include content directly in CSS, without any additional markup in HTML. This content can be a string of text, but also a 
background-image, which is exactly the property on which gradient rely.

Through absolute positioning, it is possible to place a pseudo-element exactly on the attached element, spanning its entire width and height. 
What is then requied is to alter the opacity of said gradient in relation to the element itself, from 0 to 1, to show the new gradient.

Opacity, unlike background-image, is a property which can be transitioned and the overall effect is to seemingly move from gradient to gradient.

### Show me the code already

In details the effect works as follows:

1. With regards to the element with the gradient to-be-transitioned, set the property of `position` to `relative`. This allows to anchor the
pseudo-element which will follow.

  ```CSS
  .transition-background {
    background-image: 
      linear-gradient(
        to right, 
        #e0529c, #f05b45
      );
    position: relative;
  }
  ```
  
2. With regards to the pseudo-element, it is first necessary to position it as covering the entire width and height of the connecting element.

  Position the pesudo-element to the top-left corner and spanning 100% of the element width and height. 

  Bear in mind, the property of `content` is required, even if set to an empty string. (which is the value used to include a `background-image`)

  ```CSS
  .transition-background:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  ```
  
3. With the pseudo-element now positioned, the gradient to which the element will transition is included much alike any gradient.

  ```CSS
  .transition-background:before {
    background-image: 
      linear-gradient(
        to right, 
        #3ec6e0, #536df4
      );
  }
  ```

4. A special consideration is warranted for the property of `z-index`.

  ![Pseudo Elements Layers](https://cdn.css-tricks.com/wp-content/uploads/2011/06/multiplecanvases.jpg)

  As eloquently displayed on CSS Tricks, both `after` and `before` are placed on top of the elements to which they connect. 
  If the `background-image` were to be set as-is, it would cover the element itself. What is needed is to then position the 
  pseudo-element *beneath* the element.

  ```CSS
   .transition-background {
     z-index: 1;
   }
   .transition-background:before {
     z-index: -1;
   }
   ```

5. Understanding the implications of the `z-index` property, the gradient is transitioned through the `opacity` property.
This is set to 0 and set to change according to the `transition` property.

  ```CSS
  .transition-background:before {
    opacity: 0;
    transition: opacity 0.4s ease-out;
  }
  ```

6. When hovering on the element, it is then finally to alter the opacity value. Keeping in mind that the opacity value to be updated is the 
one referring to the pseudo-element.

  ```CSS
  .transition-background:hover:before {
    opacity: 1;
  }
  ```
  
And that is all. All together the effect is implemented, through the class of `.transition-background`, with the following CSS 
property-value pairs.
  
```CSS
.transition-background {
  background-image: 
    linear-gradient(
      to right, 
      #e0529c, #f05b45
    );
  position: relative;
  z-index: 1;
}
.transition-background:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(
      to right, 
      #3ec6e0, #536df4
    );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}
.transition-background:hover:before {
  opacity: 1;
}
```
