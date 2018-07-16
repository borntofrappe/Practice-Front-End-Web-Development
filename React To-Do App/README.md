This app is currently being built through the `create-react-app` utiltiy. Link to a live pen will soon follow.

<!-- Link to the work-in-progress pen right [here](). -->

# Preface

As I went through the process of learning Redux, in the freecodecamp curriculum, I honestly struggled with the new syntax. Between actions, action creators, middleware I understood the underlying concepts, but I feared without additional practice, the knowledge would be anything if fruitful. 

So I decided to go through the documentation of the library itself. Starting from the [README](https://redux.js.org/) page, the library teaches how to get started while creating a to-do app, which gave me an excuse to further my efforts with React. 

I do plan to go through the tutorial. That I do. I just want to go there with something in advance. That being the skeleton of a working to-do app. This is a perfect short journey to 1) practice with react and 1) include redux in a working application. This should allow me to understand the advantages the library brings, in comparison when state management is left to the application's components. All this while creating something that, even if admittedly repeated and slightly boring, I might end up using. Sort of like the tomato clock I built not so long ago.

# Design

For the design of the page, I took inspiration from several sources:

- [this design concept](https://dribbble.com/shots/4821351-Calendar-Project-management-App) for the initial color palette (mostly for the background gradients)

- [google tasks](https://play.google.com/store/apps/details?id=com.google.android.apps.tasks&hl=en) for a few elements. The input field with rounded corners, the list with round checkboxes, the structure in which the input field is below the to-do list. It would be neat to replicate more features from the app, like the possibility to include details or sub-tasks, or even an image shown when to items are present on the to-do list, but that is beyond the scope of the project.

- For the background, a `linear-gradient` is included from the bottom left to the top right. A gradient which is divided as follows:

  - #EDE4E6, #CCBDD4 for the first half of the display
  - #645EAE, #6B64B6 for the second half, beginning exactly where the previous half gradient ends (hard stop)

  On top of the `linear-gradient`, a semi-transparent circle is included in the bottom right corner of the page, with a `radial-gradient` and the solid color #AB7CBA.

- For the input field, as well as the to-do list (which are visually connected), the text will have a color of #4F556A, while the background of the container boxes will have a color of #FFFFFF.

- For the single `font-family` used on the page, [PT Sans](https://fonts.google.com/specimen/PT+Sans) is a good starter font. Additional thought might be included afterwards, once the application is up and running.

<!-- 
@import url('https://fonts.googleapis.com/css?family=PT+Sans');
font-family: 'PT Sans', sans-serif;
-->



# React 

As the development environment was in the process of being set up, through the `create-react-app` terminal command, I decided the project would be also a good excuse to practice with a prominent styling library, namely [**Styled Components**](https://www.styled-components.com/).

One thing at a time though.

## React App

The application is structured with very few components. The state, without including **Redux** at this stage, is managed by the parent component, in **App.js**. This stateful component renders two stateless functional components: 

- an input area, in which text can be included by means of an `<input>` element of `type="text"`;

- an output area, in which the text included the input area is pushed, in a `<ul>` element, with as many `<li>` elements as there are to-do items.

<!-- ## [Styled Components](https://www.styled-components.com/)

First off, and as explained in the library's home page, to use styled components it is necessary to include the dependency in the `package.json` file. 

In the root folder of the newly created `react-app`, the library is included by running the following command:

```code
npm install --save styled-components
```

From there, it is a simple matter of specifying the components' styles through backticks. Like in the following snippet. -->

<!-- # Redux -->