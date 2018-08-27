Link to the working pen right [here](https://codepen.io/borntofrappe/full/bxebgv/).

## Preface

With this project I plan to replicate the SignUp Form set up by [mLab](https://mlab.com/signup/), a data-as-a-service solution I recently discovered while learning about back-end and databases @freecodecamp.

I found the form to be quite entertaining, and a good excuse to practice with the following:

- responsive design: the layout changes depending on the availability of the viewport. Flexbox seems to be the most efficient way to guarantee the columns' design, but I may be swayed to use grid;

- SVG icons, for the different fields;

- labels for the input element, showing up where the placeholder would lie and gravitating upward as the user actually focuses in and starts filling the form;

- regular expressions, used for all fields and used to also provide visual feedback (grenn, red text marking the correctness of the input string);

- input of type checkbox. Now, this was actually what I noticed the most out of the first visit, and it'd be grand to replicate. As the user checks the mandatory field, the square collapses, a circle pops rapidly before a check sign is drawn into view. With a few sparks to boost. I honestly do not know how to or even if I'll be able to replicate such a solution, but I'll try my best.

One thing at a time though.

## Design Choices

**Color Palette**

[mLab](https://mlab.com/signup/) makes use of the following colors:

- #1D2733 for the background of the page;

- #384B5C for the background of the card's section introducing the form;

- #304150 for the background of the card's section detailing the input elements;

- #8996A4 for the text of the labels (and the color of the connected icons);

- #F5F6F7 for the text of the larger form;

- #32A3DF for accent color, used for important text, and the final 'Create account' button.

That being said, I might decide to include only one of the hue for the background and include the others as simple variation around said pick. Through a pre-processor, this is easily dealt with through a function like `darken()`, `lighten()`, hue-`rotate()`. For the text as well, the labels could simply be a darker, slightly more transparent version of the surrounding text. So I could boil down the selection to:

- background: #1D2733;

- text: #F5F6F7;

- accent: #32A3DF.

Dividing the colors according to their purpose.

**Font**

- Roboto, with light and regular variations.

