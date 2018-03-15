Link to the working pen right [here]().

## Preface

The purpose of this project is to replicate one neat solution found on [CSS Puns](https://saijogeorge.com/css-puns/), in the left and right arrows placed at either end of the page.

As the visitor clicks on the two arrows, the circles in which the arrows are actually laid are animated to change their shape. It is a neat way to establish user interaction, which also allows to experiment with SVG and one type of SVG animation: SMIL.

**Be warned**: as I researched on the subject, I came to discover how support for SMIL is currently being dropped<!-- :( -->. The exercise is still good practice with SVG, but for SVG animation it is better to move toward CSS animation and JS libraries such as [Snap.svg](snapsvg.io).

SMIL animation is a particular approach to animate SVG through HTML tags already baked in the SVG syntax.

Through this approach, it is possible to alter attributes of the SVG such as `fill`, for color, or even `d`, for the path actually dictating the shape of the SVG asset.

It is based on the  `<animate>` tag, and it leverages different attributes to describe which aspects of the SVG to modify and in which measure to modify them.

Some aspects are similar to CSS animation and `keyframe`s logic, while other are particular of the SVG syntax.

## Code already

**Foreword**

For the SVG animation to take place it is first necessary to include the SVG file inline. To animate the color of SVG, all that is required is attention to the attribute of `fill`, but to animate a change in its shape as well, it is paramount to pay attention to the attribute of `viewbox`.

The animation in fact is built through different assets drawn on Inkscape/ Illustrator or any vector program.

You manufacture the beginning and end states of the SVG animation and use their different syntax in the HTML.

When changing the path values, you therefore need to have consistent `viewbox` values, as to avoid messy design. Just pay attention to the attribute while creating the SVG and make sure that the attributes match across state.

**SVG Inline**

When injecting the SVG in the HTML document, it is useful to apply a class or ID on the general container, as well as the SVG tags which will be affected for the animation to take place.

That being said, the animation takes place in between the tags of the SVG component to be affected, such as `<path>` or `<g>` tags.

These are self-closing tags by default, but by specifying opening and closing brackets it is possible to include the SMIL animation connected to the related element.

For instance, for an example path element:

```HTML
<path d="123" .../>
```

The animation is embedded with the `<animate>` tags as follows:

```HTML
<path d="123" ...>
  <animate .../>
</path>
```

Animate is itself a self-closing tag. It is here once more useful to apply a class or identifier on the element, as it will be targeted in JavaScript to enact the animation on cue.

**Animate**

In the `<animate />` tag several attributes are specified. There are lots of attributes which can be covered in this regard, but the attributes included in the simple project already plenty of opportunities.

**Animate color**

For the change in color, or fill, the animate tag is forged as follows:

```HTML
<animate class="left-arrow__circle--animate" attributeName="fill" begin="indefinite" dur="0.4s" values="hsl(316, 60%, 47%); hsl(316, 60%, 57%); hsl(316, 60%, 47%)" keyTimes="0; 0.6; 1"/>
```

Specifying:

- attributeName: the attribute to be affected in the animation, such as fill for color, d for shape;
- begin: when the animation should begin. This can be a time value, express-able in seconds, but also *click*, reacting to a click on the SVG in question, or *indefinite*, which allows to "pause" the animation while waiting for a trigger (which is included in JS);
- dur: the duration of the animation
- values and keyTimes

  One first approach to SMIL animation is to specify a beginning and end state. These can be declared with the attributes of *from* and *to*. Much alike with CSS keyframes. values and keyTimes allow to specify multiple stages and the timing of each occurrence.

  The logic is once again similar to CSS keyframes.

  You can think of:

  ```HTML
  values="hsl(316, 60%, 47%); hsl(316, 60%, 57%); hsl(316, 60%, 47%)" keyTimes="0; 0.6; 1"
  ```

  As to be equivalent to the following CSS keyframe animation:

  ```CSS
  0% {
    fill: hsl(316, 60%, 47%);
  }
  60% {
    fill: hsl(316, 60%, 57%);
  }
  100% {
    fill: hsl(316, 60%, 47%);
  }
  ```

**Animate shape**

The change in shape presents similar attributes to those specified with regards to the change in color. Notable considerations are:

- `attributeName` is set to `d`,  as the animation encompasses a change in shape.
- `values` specify the different values assumed by the SVGs under the `d` attribute.

These particular values are rather lengthy and heavily depend on the design provided through Inkscape/ Illustrator/ vector programs. Just be sure the different SVG files have the same number of paths/ points in their built.

**Trigger JS**

The animation manufactured through the appropriate `<animate>` tag can be immediately implemented, or triggered through a click or JS function.

In the former case the attribute of `begin` can be left unspecified.

In the second instance, the same attribute is set to `click`.

In the third, a JS function triggers the animation with a proper method.

It is first necessary to target the `<animate>` tag.

```JS
const leftArrowCircleAnimate = document.querySelector(".left-arrow__circle--animate");
```

After which the element can be triggered through the `beginElement()` function.

```JS
leftArrowCircleAnimate.beginElement();
```

The method can be implemented following whichever event satisfy your leisure, such a click or hover.
