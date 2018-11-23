# Front End Imperial to Metric Converter

Link to the working pen right [here](https://codepen.io/borntofrappe/full/zMWpEx/).

## Preface

With this project I set out to create a simple HTML, CSS, JavaScript based solution for the first project of five required for the **Information Security and Quality Assurance** certification @freeCodeCamp.

The project requires me to actually work with back-end technologies, such as **Express**, but out of pure curiosity and to design also the UI ultimately used for the project, I wanted to sample a possible converter with plain ol' JavaScript.

## Conversion Table

I'd like for the project to convert between the following unit of measures.

### Length:

| Imperial | Metric      | 1 Imperial Is X Metric |
| -------- | ----------- | ---------------------- |
| inch     | millimeters | 25.4                   |
| foot     | meter       | 0.3048                 |
| yard     | meter       | 0.9144                 |

### Capacity:

| Imperial    | Metric      | 1 Imperial Is X Metric |
| ----------- | ----------- | ---------------------- |
| (US) oz     | milliliters | 29.57                  |
| (US) gill   | milliliters | 118.29                 |
| (US) pint   | milliliters | 473.18                 |
| (US) gallon | liters      | 3.785                  |
| (US) peck   | liters      | 8.810                  |
| (US) bushel | liters      | 35.239                 |

An object can be created to mmove between the respective values.

```js
const units = [
  {
    inch: 1,
    millimiter: 25.4
  },
  {
    foot: 1,
    meter: 0.3048
  }
];
```

JavaScript can be then used to find in the array the specific units and return the matching value.
