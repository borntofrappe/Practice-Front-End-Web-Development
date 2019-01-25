# Follow Along Dropdown

Proud result live [right here on codepen](https://codepen.io/borntofrappe/full/gqaeKK).

## Preface

Continuing the #javascript30 course, and particularly continuing from the project titled 'follow along links' which you can find [right here](https://codepen.io/borntofrappe/pen/qLwMrX), I set out to replicate the intriguing navigation provided on the Stripe website.

## Update 1am 24/01

I really wasn't planning on continuing with the first rough version, but live on codepen, and after publicly stating my daily efforts, I got caught up in the heat of the moment. The end result: barring a few missing steps, the project is basically done. As you hover on anchor link elements, there the dropdown background appears, resizes and repositions itself.

Still need to figure out how to remove the background as the cursor hovers away from the anchor link. It all boils down to the events being fired on the list items / anchor link elements.

## Update 25/01

Finally I was able to conclude this project. Removing the dropdown only as the cursor leaves the list item as a whole is a simple matter of using the `mouseleave` event instead of `mouseout`. Unlike this last one, `mouseleave` does not bubble and it doesn't fire as the cursor hovers on other elements nested in the element on which the event is registered.

To avoid a small but rather annoying gap between the list item and the dropdown right below it, I also decided to steer clear of `margin` and instead use a sizeable measure for the `padding` property. Especially to give space between the main options of the navigation bar, this allows to maintain the dropdown while horizontally moving toward the different options.
