# D3 Hierarchy Practice

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I plan to pick up D3.js once more. This to practice with _hierarchical layouts_.

This to visualize the data on **Kickstarter projects**, as available [right here](https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json).

## Data

The data is structured in a JSON format as follows:

- the outermost level contains two properties: _name_ and _children_;

- the _children_ property contains an array of objects, replicating the same structure. This one too has a _name_ and _children_ property;

- the nested _children_ properties is once more an array, but this time nesting an object with the following values: _name_, _category_, _value_. The _category_ contains the same value of the _name_ property of the parent node, while the value relates the information with which to compare each nested data point.

For the first data point, the route can be considered as follows:

```code
kickstarter -> product design -> pebble time
```
