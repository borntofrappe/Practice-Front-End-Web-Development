# F1 Lap by Lap Feed

<!-- Link to the work-in-progress pen right [here](). -->

## Preface

Perhaps better labeled as F1 Lap by Lap dashboard, this project sets out to practice with React while re-creating the feature showcased every race weekend on the official F1 website. Feature visible [right here](https://www.formula1.com/en/latest/article.live-coverage-formula-1-gran-premio-de-mexico-2018.RxEqYqq6seouW4sOSUuw0.html).

In this feature, text, pictures and even audio elements are pushed regularly at the top of the feed. I'd like to replicate this structure, but from the perspective of someone actually sending the updates. And currently considering only text-based updates.

## Feed UI

The UI behind the feed is detailed in the 'Feed UI' folder. It is a simple attempt at creating the feed and the feed only through HTML and CSS elements. The hope with the React project, and related to the text-based elements, is to dynamically create such a feed. The icons for the different teams are planned for a future update. I was considering detailing a select element for this, but I'd rather research a more appealing solution.

## React

The project requires a rather simple macro-structure:

- a component in which user input in the form of text is collected;

- a component in which to "push" the user input, highlighted in a clear, independent section.

Starting with this simple overview, it is a simple matter of creating a couple of functions around an `<input>` element and a `<button>` element. Perhaps a `<textarea>` element is to be preferred though.

### Update

In developing the application, I decided to include `<input>` element**s**, for the optional title, subtitle and mandatory text regarding the update message. I changed the `handleInput()` method as to handle different `input` elements according to their `id`. And benefiting from _dynamic property names_.

```JS
handleInput(e) {
    const input = e.target.value;
    const id = e.target.getAttribute('id');
    this.setState({
      [id]: input
    })
  }
```

This way the `input` element in which the user types, and only this `input` element, will be updated with the specified text.

Once the application is working, is a simple matter of modernizing the look with the desired property value pairs.
