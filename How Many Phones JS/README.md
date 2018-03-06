Link to the working pen right [here](https://codepen.io/borntofrappe/full/oErzOE/).

### Preface

The purpose of the project is to merge recent advances in JS, made while reading [You don't Know JS](https://github.com/getify/You-Dont-Know-JS), with other front-end development concepts. 

This intent is manifested in a pen in which to implement the simple algorithm manufactured out of Chapter 1 of the first book titled [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going).

### First thoughts

The script running on the page is set to compute how many phones and accessories can be purchased, considering financial values such as the price of phone and accessories, the tax rate and money available in the account balance, as well as a predefined spending threshold.

As long as the combination of phone and accessory is less than this threshold, the intent of the algorithm is to keep buying phones and ultimately return the number allowed for purchase.

This programming logic is included in a simple page structure in which it is possible to specify the money left in the account and immediately assess the number of devices which can be bought. It is also possible to here tweak the conditions of the algorithm, by changing the initial values for prices, tax rates and all values used as input.

What follows is a description of some of the page characteristics, in the [HTML and SCSS](#html-and-scss) of the project, and the logic behind the script, in the [JS](#js) file.

# JS

The script is set to fulfill two purposes:

1. compute the number of phones and accessories which can be purchased, as previously mentioned;

2. toggle the visibility of the assumptions behind the computation, which can be specified if needed.

### Number of phones 

The script for the computations of products to be purchased considers the values retrieved from `input` elements. If this were to be unavailable, or outside of a predefined range, the values are going to be initialized to a default measure.

This conditional logic is applied directly in the assignment operation, with the use of a *ternary* operator.

For instance, for the price of the phone, this is set to be equal to the value found in the input *if* the input has a value ranging from 0 to 10.000. It is set to 250 otherwise.

```JS
phonePrice = (phonePriceInput.value > 0 && phonePriceInput.value < 10000) ? Number(phonePriceInput.value) : 250
```

In this example, the ternary operator works by setting a condition and assigning the first value following a *?* question mark if this condition is evaluated to be true. Alternatively it assigns the second value following a *:* colon.

Once all input values are obtained, the computation is scheduled as follows:

1. store in a variable the total price of a product, consisting of phone, accessory and taxes;
2. create a counter variable to enumerate the number of products purchas-able at the defined price:
3. create a for loop which which increments the counter variable as long as the price of the product(s) is less than the limit defined by the spending threshold;
4. return the counter variable.

It is important to note that the values retrieved from the `input` elements are often retrieved as *string*, not numbers. Mathematical operations act differently on the basis of the value type and to avoid confusion, the values are *explicitly coerced* to numbers, by wrapping the returning value in a `Number()` object.

The following solution is implemented.

```JS
// target input elements 
const accountBalanceInput = document.querySelector(".account-balance");
const phonePriceInput = document.querySelector(".phone-price");
const accessoryPriceInput = document.querySelector(".accessory-price");
const taxRateInput = document.querySelector(".tax-rate");
const spendingThresholdInput = document.querySelector(".spending-threshold");

// target header element to be modified according to the function 
const headerNumberOfProducts = document.querySelector(".result h1");

// respond to the key up event in the main input
accountBalanceInput.addEventListener("keyup", computeNumberOfProducts);


function computeNumberOfProducts() {
  // create variables in which store the values of the input elements OR default values if the input values are not in the accepted range 
  let accountBalance = Number(accountBalanceInput.value),
      phonePrice = (phonePriceInput.value > 0 && phonePriceInput.value < 10000) ? Number(phonePriceInput.value) : 250 ,
      accessoryPrice = (accessoryPriceInput.value > 0 && accessoryPriceInput.value < 1000) ? Number(accessoryPriceInput.value) : 50,
      taxRate = (taxRateInput.value > 0 && taxRateInput.value < 100) ? Number(taxRateInput.value) : 10,
      spendingThreshold = (spendingThresholdInput.value > 0 && spendingThresholdInput.value < 100) ? Number(spendingThresholdInput.value) : 10;  
  
  // if the account balance is less than a billion (safeguard against infinite for loop) procede with the computation
  if(accountBalance < 1000000000) {
    // compute price of products
    let priceOfProducts = phonePrice + accessoryPrice;
    // compute price of products including taxes
    let taxes = Number((priceOfProducts * taxRate/100).toFixed(2));
    let priceOfProductsTaxed = priceOfProducts + taxes;

    // calculate the upper limit of money which can be used according to the spending threshold
    let upperLimit = Number(((spendingThreshold/100) * accountBalance).toFixed(2));

    // create a counter variable to track the number of products to be purchased
    let numberOfProducts = 0;

    // while the total price of products is less than or equal to the upper limit increment counter variable and increment the number of products to be purchased
    for(var i = priceOfProductsTaxed; i <= upperLimit; i+= priceOfProductsTaxed) {
      numberOfProducts++;
    }

    // change the text of the header to correspond to the number of products to be purchased
    headerNumberOfProducts.innerHTML = numberOfProducts + "x";
  }
  // if account balance is more than a billion change the text of the header accordingly
  else {
    headerNumberOfProducts.innerHTML = "Too much money!";
  }
}
```

### Toggle visibility

One way to effectively hide content in CSS is to set the property of `display` to `none`, and change it as neeeded to `inline-block`. Unfortunately this approach is not transition-able. 

An easier and transition-able alternative is to toggle the `opacity` of the elements, while at the same time modifying the property of `visibility`. This last addition is included to effectively remove the elements out of the visitor reach. Without it, the elements would just be transparent, but still interact-able in the page.

In JS all that is required is to switch between the mentioned properties, on the basis of the values of the properties themselves.

```JS
// target element which toggles the visibility of the additional elements
const toggleSetup = document.querySelector(".toggle-setup");
// target all additional elements which need to be modified
const setupItems = document.querySelectorAll(".setup-item");

// listen to click event on the predefined element, at which point run the declared function
toggleSetup.addEventListener("click", toggleSetupItems);


function toggleSetupItems() {

  // loop through all div elements and for each change the CSS value of opacity and visibility
  // according to the original opacity value 
  setupItems.forEach(function(setupItem) {
    if(setupItem.style.opacity == 0) {
      setupItem.style.opacity = 1;
      setupItem.style.visibility = "visible";
    }
    else {
      setupItem.style.opacity = 0;
      setupItem.style.visibility = "hidden";
    }
  });
}
```

# HTML and SCSS

The HTML structure is built as follows:
- a `div` container wrapping the entire content
- three `div`s dividing the content in 
  1. `.header`, introductory information, 
  2. `.display`, with main input and result of the script and 
  3. `.setup`, with other inputs changing the result of the script

**SVG**

One notable inclusion in the document is the svg image included inline. Built with [Inkscape](https://inkscape.org/en/), the image ought to resemble a phone and accessories.

The `svg` tags do increase the number of lines, almost outrageously, but they allow to direct style the svg and its components through CSS, which is a neat possibility.

One issue for the particular project is that the svg file, included in a flex container, needs specific width and height dimensions to be included in the page. In the stylesheet, pixels measures are included for the max width and height.

```SCSS
svg {
      max-width: 250px;
      height: 290px;
}
```

The proportion of the svg, in terms of width to height ratio is included from the dimensions the svg has in Inkscape.


**Font awesome icons**

Another note can be made on the multiple `<i>` tags included in the page. These are used to include icons through the Font Awesome Icons integration. All that is required is the inclusion of the external CSS file.

The call is made through [CDN](https://www.bootstrapcdn.com/fontawesome/) and uses Font Awesome Icons 4.

```HTML
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

The `<i>` tags are injected with the classes predefined for each icon and also include the classes of:

- `fa-2x`, which increases the size of the icons

- `fa-fw` or fixed width, which allows the icons to occupy the same width, especially when layered vertically one after the other

In the CSS the icons are also given the property of `vertical-align` set to `middle`, which allows the icons to be centered vertically next to the input elements.

**Flex**

Flex is used to lay the different containers horizontally or vertically, mostly depending on the width of the screen. Through a media query the structure is indeed shifter from row to column on smaller screen sizes.

```SCSS
@media only screen and (max-width : 800px) {
  .setup, .result {
    flex-direction: column;
  }
}
```

Alignment properties are also specified to center the flex items horizontally and vertically, but most notably the property of `flex-wrap` is set to `wrap` for the container of the multiple input elements. This to allow for the flex items to "spill over" into a new line when reaching the end of the available horizontal space.

```SCSS
.setup {
  flex-wrap: wrap;
}
```

By default a flex container will stretch items on a single row, even to the point of moving items outside of the horizontal scope. This property alters this unwanted behavior.

**SCSS**

The pre-processor is used once more to centralize values, such as those for the colors and font used in the page. 

```SCSS
$font-family-main: 'Lato', sans-serif;
$darker-color: #333;
$lighter-color: #e3dedb;
```

Moreover extend statements are included to reset some styling options and also share some property-value pairs on multiple selectors (notably, the input elements present in the different containers).

```SCSS
%button-input-reset {
  background: none;
  border: none;
  outline: none;
}
```

Color functions are also used in combination with the two chosen colors as to create a sort-of monochromatic palette, with darker or lighter hues depending on the relevance of the affected elements.

```SCSS
button {
  color: darken($darker-color, 40%);
}
```

And notably, selectors are nested all throughout the stylesheet. The challenge is to avoid extremely nested items, which is sort-of solved by styling elements inside of the most pertinent container.

