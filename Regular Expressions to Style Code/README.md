<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this small effort, I'd like to practice with regular expressions in order to style the following block of code:

```JS
// array of random integers
let myArr = [];
for(let i = 0; i < 10; i++) {
  // range [-50, 49]
  myArr.push(Math.floor((Math.random() - 0.5) * 100));
}
// array of positive integers only
let positiveArr = myArr.filter((item) => item > 0);
```

Indeed, while it may take a while to actually style the snippet as markdown syntax would effectively style it, I'd like to at least provide an alternative design for comments, and maybe a few keywords.