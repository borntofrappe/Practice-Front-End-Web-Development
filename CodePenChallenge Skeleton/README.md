# CodepenChallenge Skeleton

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

Unfortunately, I've missed the last two rounds of the #codepenchallenge. I'm thinking of creating a project for those topics as well, but for the current project, I plan to craft a pen for the week in question.

The theme of the week: _skeletons_.

My personal take: something which could be labeled _pick a bone with CSS selectors_.

Here's how the simple application is scheduled to function:

- as the visitor enters the screen he/she is welcomed by a makeshift skeleton. Something rather simple built out of `<div>` elements, perhaps with a class of `.bone`.

- a button atop this skeleton tries to instruct on the page: pick a bone;

- as the visitor then presses the button, a simple script instructs to literally remove the bones one at a time.

The feat is achieved by playing around with the `nth-child()` selector, and how the same behaves when additional elements are included atop the parent container.

Indeed, as new elements are _inserted_, _prepended_ before those `<div>` elements with a specific class, the pseudo selector is forced to target less and less HTML elements.
