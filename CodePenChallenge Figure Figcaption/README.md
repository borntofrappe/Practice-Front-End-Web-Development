Link to the working pen right [here](https://codepen.io/borntofrappe/full/VdxjyM/).

# Preface 

This project is tasked with the creation of an entry for the weekly #codepenchallenge. The topic: the `<figure>` and `<figcaption>` elements, in their ability to showcase and describe a visual.
The topic of the month is blogging after all, and the two elements are primed to introduce images on a page. 

My personal entry for the challenge could be labeled _comics with css_, in that it tries to replicate the design of a comic book with simple HTML markup and a few CSS properties. In this regard, the `<figcaption>` element is well suited to the idea, as it allows to include some text on the edges of a frame, either introducing or describing what happens in the comic.

The focus is more on the design of the comic book strip, more than the actual content of the vignette. That being said, I figured a bit of humour couldn't hurt the project.

Update: in the end, the project proved to be more time-comsuming than anticipated, but it was an excellent project in which to practice CSS layouts, with grid and flex properties alike. Moreover, it was teach-able in terms of selectors and their specificity, and (almost as always), a neat excuse to tinker with pseudo-elements.


## Refactor

It came to me only at a later stage how the project is actually perfectly suited to be created with React. In hindsight, it is an obvious solution.

Here a few notes for how to create the project with React. I stride to learn the tool, and it helps to repeat the process.

## React Notes

### Setup

A few command-line instructions are needed to set up a React project.

1. install create-react-app

    ```code
    npm install -g create-react-app
    ```

1. instantiate a new project

    ```
    create-react-app css-comic
    ```

1. start working on the app

    ```
    cd css-comics
    npm start
    ```

    Or, alternatively

    ```
    yarn start
    ```

1. build the application

    ```
    npm run build
    ```

    Or, alternatively

    ```
    yarn run build
    ```

1. run a static server in which to display the app

    ```
    yarn global add serve
    serve -s build
    ```

After the application is built, it is possible to run the application on a static server.

```
npm install -g serve
serve -s build
```

Then, you'll have the page available on a local host. `serve -s build` ought to be run in the parent folder nesting the react files, among which the build folder.

### Structure

Once instantiated, the project folder, in this instance labeled _css-comics_, holds the files behind the application.

- in the **public** folder you find the manifest, HTML file and the icon used for the project
- in the **src** folder you find the JS and CSS files making up the application. Here's where most of the work will be carried out.