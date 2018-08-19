<!-- Link to the work-in-progress pen right [here](). -->

## Preface

The purpose of this project is to put into practice a few D3.js related concept, mainly related to the _update-enter-exit_ pattern. This while building a simple bar chart with a random set of points, and a button which allows to either add or remove a bar. Possibly at random.

**Update Enter Exit**

D3.js leverages the `.data()` and `.enter()` function to visualize some data in an arbitrary format. That being said, the simple constructor allowed by these functions is primed for static, one-off visualization. When it comes to update the dataset, perhaps adding or including data points, it is helpful (and really impressive) to transition existing/new/old elements in an efficient way.

