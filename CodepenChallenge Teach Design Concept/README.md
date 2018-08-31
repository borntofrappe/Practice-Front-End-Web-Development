<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I set out to create an entry for the weekly #codepenchallenge. As luck would have it, the topic of the week is to teach a design concept, and it is the perfect pretext to finally struggle and create a long-awaited design pattern. A carousel. I never actually pondered how to create such a feat, and through CSS grid I think I might be able to create a neat solution.

## Grid && Update

Through grid properties, I conjured up a single container which shows one slide at a time. This feat is achieved by:

- including a single column through `grid-template-columns`;
- adding implicit columns whenever additional items are added to the grid (instead of rows), through the `grid-auto-flow` property set to `column`;
- specify the size of the implicit columns to be the same of the single column. Both spanning the entirety of the container.

The idea is to thusly create an horizontal grid of however many items as there are slides. Items positioned side by side and cut out from view through the `overflow-x` property, set to `hidden` and for the wrapping container.

You can find the Grid based layout in the 'Carousel Grid Layout' folder. This already includes a silly animation to serve as a proof for the underlying logic, as well as click event listeners to toggle the animation, were this to become excessively annoying.