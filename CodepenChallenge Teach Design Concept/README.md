<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I set out to create an entry for the weekly #codepenchallenge. As luck would have it, the topic of the week is to teach a design concept, and it is the perfect pretext to finally struggle and create a long-awaited design pattern. A carousel. I never actually pondered how to create such a feat, and through CSS grid I think I might be able to create a neat solution.

## Grid

Through grid properties, I conjured up a single container which shows one slide at a time. This feat is achieved by:

- including a single column through `grid-template-columns`;

- adding implicit columns whenever additional items are added to the grid (instead of rows), through the `grid-auto-flow` property set to `column`;

- specify the size of the implicit columns to be the same of the single column. Both spanning the entirety of the container.

The idea is to thusly create an horizontal grid of however many items as there are slides. Items positioned side by side and cut out from view through the `overflow-x` property, set to `hidden` and for the wrapping container.

You can find the Grid based layout in the 'Carousel Grid Layout' folder. This already includes a silly animation to serve as a proof for the underlying logic, as well as click event listeners to toggle the animation, were this to become excessively annoying.

## React

Based on the simple HTML+CSS+JS mockup, a React project is set up for the actual carousel. This ought to include content, added through the state. In the spirit of the challenge (and perhaps once I find a pleasing color palette and font), the content ought to explain the application itself, and should therefore and mainly regard the grid-based layout.

That being said, notes on the React components and logic can be added, if they enrich the experience.

As a matter of preference, I also plan to include SVG icons:

- for the controls allowing to move from one slide to the previous one/ next one;

- for the numbers baked in each slide and used jointly to explain the project at hand.

You can find the minified SVG assets in the 'Resource' folder.

**State**

The state holds a single array under the `content` label. This one nests one object for each slide. Each slide includes a brief description of how the app creates the carousel. Additionally, it nests an SVG icon, detailing the actual number of the slide.

Something along the lines of the following:

```JS
const content = [
    {
        slide: 0,
        icon: '',
        title: 'Grid Based Carousel',
        description: 'How to? Here\'s the gist',
        code: ''
    },
    {
        slide: 1,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.424242 26.458336"><path d="M6.692 10.047s12.537-1.6 12.537-6.711v19.862h-9.098" fill="none" stroke="#000" stroke-width="1.229"/></svg>',
        title: 'For starters',
        description: 'include grid on a wrapping container',
        code: 'display: grid;'
    },
    {
        slide: 2,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.424242 26.458336"><path d="M18.571 23.299H6.786S19.32 18.864 19.32 10.643c0-8.222-10.714-7.464-10.714-7.464" fill="none" stroke="#000" stroke-width="1.229"/></svg>',
        title: 'Moving on',
        description: 'detail a single column covering the entire container',
        code: 'grid-template-columns: 100%;'
    },
    {
        slide: 3,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.424242 26.458336"><path d="M6.682 23.019s12.552 1.396 12.552-3.518c0-4.915-6.418-4.702-6.418-4.702M6.682 3.256s12.552.265 12.552 5.18c0 4.914-6.418 6.363-6.418 6.363" fill="none" stroke="#000" stroke-width="1.22"/></svg>',
        title: 'Plot twist',
        description: 'specify how additional items in the grid should be added as column',
        code: 'grid-auto-flow: column;'
    },
    {
        slide: 4,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.424242 26.458336"><path d="M15.466 13.255v10.557M13.663 2.698s1.528 10.715-7.048 10.715h13.229" fill="none" stroke="#000" stroke-width="1.236"/></svg>',
        title: 'Catching up?',
        description: 'detail the width of the implicit columns to match the width of the single explicit column',
        code: 'grid-auto-columns: 100%;'
    },
    {
        slide: 5,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="99.871" height="100" viewBox="0 0 26.424242 26.458336"><path d="M19.813 3.277H7.833L18.19 17.408s-4.478 13.055-10.445 0" fill="none" stroke="#000" stroke-width="1.236"/></svg>',
        title: 'Finishing up',
        description: 'hide horizontal overflow',
        code: 'overflow-x: hidden;'
    },
    {
        slide: 6,
        icon: '',
        title: 'And that is all',
        description: 'Okay not all... This project is spiced up with React to include controls and efficiently render the slides. The basic idea is based on the explained grid properties though. Thanks for checking out this project'
    }
];
```

## Update

I decided to scrap the whole idea of SVG icons. Wasn't too proud of the result.

The end result is well documented and live [right here](https://codepen.io/borntofrappe/full/OoWGYe/). The components are live and well in the 'Carousel Grid React' folder.