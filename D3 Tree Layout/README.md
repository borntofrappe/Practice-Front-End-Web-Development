<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I set out to create a **tree layout**, through the D3.js library. This to entertain the mind with the library, while conjuring up some ideas for the weekly #codepenchallenge.

In trying to find hierarchical data to display in such a layout, I was inspired by Codepen itself and the technology it offers in terms of HTML, CSS and JS.

## Development

The settings of each pen can be categorized in several tabs:

- HTML, with several preprocessors
  - HAML
  - Markdown
  - Slim
  - Pug

- CSS, with again preprocessors
  - LESS
  - SCSS
  - Sass
  - Stylus
  - Post CSS

- JavaScript, with again preprocessors
  - Babel
  - TypeScript
  - CoffeeScript
  - LiveScript

I plan to describe these sections and sub-sections in the aforementioned tree, with lines connecting the parent to child elements, It is also a good excuse to discover some preprocessor which might be entertaining to learn.

**Data**

The mentioned technologies and preprocessors are described in a JSON object thusly: 

```JSON
{
  "name": "Pen Settings",
  "children": [
    {
      "name": "HTML",
      "children": [
        {
          "name": "HAML"
        },
        {
          "name": "Markdown"
        },
        {
          "name": "Slim"
        },
        {
          "name": "Pug"
        }
      ]
    },
    {
      "name": "CSS",
      "children": [
        {
          "name": "LESS"
        },
        {
          "name": "SCSS"
        },
        {
          "name": "Sass"
        },
        {
          "name": "Stylus"
        },
        {
          "name": "Post CSS"
        }
      ]
    },
    {
      "name": "JavaScript",
      "children": [
        {
          "name": "Babel"
        },
        {
          "name": "TypeScript"
        },
        {
          "name": "CoffeeScript"
        },
        {
          "name": "LiveScript"
        }
      ]
    }
  ]
}
```

This simple object details the hierarchical structure, and it is at the basis of the layout itself.

**d3.tree**

Just like for the _treemap layout_, `d3.tree()` is specified on the basis of a root node.

// TODO add notes