/* compute number of products which can be purchased as the main input is typed */
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



/* toggle visibility of additional elements*/

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
