// target the button#toggle and on click toggle the class of .active on the div#panel
const buttonToggle = document.querySelector('button#toggle');
const divPanel = document.querySelector('div#panel');

buttonToggle.addEventListener('click', () => divPanel.classList.toggle('active'));


// target all input[type="color"] and using their name change the matching custom property
const inputColors = document.querySelectorAll('input[type="color"]');

inputColors.forEach((inputColor) => {
  inputColor.addEventListener('change', () => {
    const name = inputColor.getAttribute('name');
    const { value } = inputColor;
    document.documentElement.style.setProperty(`--${name}`, value);
  });
});

// target all button.size and using their data-size and data-change attributes change the size of the connected property
const buttonSizes = document.querySelectorAll('button.size');

buttonSizes.forEach((buttonSize) => {
  buttonSize.addEventListener('click', () => {
    const dataSize = buttonSize.getAttribute('data-size');
    const dataChange = buttonSize.getAttribute('data-change');

    // retrieve the custom property's existing value
    const value = getComputedStyle(document.documentElement).getPropertyValue(`--${dataSize}`);

    // consider the change as an number
    const modifier = parseFloat(dataChange);
    // consider the value without unit of measure
    const measure = parseFloat(value.match(/[0-9.]+/gi)[0]);
    // consider the unit of measure without the value
    const unit = value.match(/[a-z]+/gi)[0];

    // update the property according to the existing measure and the modifier
    document.documentElement.style.setProperty(`--${dataSize}`, `${modifier * measure}${unit}`);
  });
});
