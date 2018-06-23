Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/yEEjNL/).

# Preface 

As I went through the different links included in the latest newsletter from Val Head (you should subscribe to her animation newsletter), I stumbled upon the Nike React-Reactor page. I found the text animation to be rather neat, so I set out to achieve something similar.

To account for headers of an unknown quantity of characters, the approach is to animate each character through a few lines of code in a JS script.

Simply put: take the text of the header, consider each character and include each character in a span element. Apply the animation to the span elements, including a different delay for subsequemt element.

It may look and be a little silly, but it is helpful in learning a bit more about the `forEach` method, and about `transform` values.