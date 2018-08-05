Link to the working pen right [here](https://codepen.io/borntofrappe/full/wxxrRX/).

# Preface

The purpose of this project is the creation of the UI for a "Drum Machine" application. Certainly, the application is one of the projects for the @freeCodeCamp curriculum. Specifically, it is the last required project to earn the 'Front End Library' certification. 

## Design

The drum machine has a few required elements:

- 9 clickable elements, used to play a different audio;

- a display, in which to show which clickable element was pressed.

Beside these components, a toggle may included to have the machine turned on and off respectively. There could also be a input of type range, to alter the volume, but I'd like to keep the UI as simple as possible for the time being.

**Color Choices**

As I wanted to create a drum machine with Japanese-inspired sounds, I decided to include two colors often associated with the country: red and blue. White couples well with both, and it is therefore used for the text, with a soft gray included for text which is less important and therefore visually down-played.

- blue = #0a1e50

- red = #dd1f19

- white = #f0f0f0

- light blue = #8295c2

**Font Choices**

Temporarily, but possibly for good, I picked `Lato` as the default font. This because I consider text not to be a crucial portion of the application. It is indeed used for very few elements, mainly the display, and `Lato` borrows itself perfectly to display plain and readable strings.

**Layout**

The layout of the application makes heavy use of `grid` properties. This choice is perfectly suited for the 9 clickable elements, which can be easily displayed in a 3 by 3 grid, but it is also a good option for the overall layout. Grid is indeed a powerful layout which allows to include a robust design with very few lines of code. It is also quite good in defining structures respectful of the viewport's size.

The application itself is divided in two areas: main and support. In main, the 9 clickable elements are included. In support, the display and possibly-in-the-future input elements are included.

These areas are included on top of a simple blue background, with a red circle in the middle of the screen. This is included always in the `background` property, through a `radial-gradient` which occupies a portion of the viewport.

```STYL
body
  background radial-gradient(circle at 50% 50%, red 30%, transparent 30.1%), blue
  background-repeat no-repeat
```

`background-repeat` is included for safety, to have the background display one single circle.

Beside this simple, yet I must say elegant choice, the application shows the different elements through a couple of grid containers.

The main container divides the screen in two columns, which collapse into one when the viewport is smaller than 800px.

```STYL
.app
    display grid
    grid-template-columns repeat(auto-fit, minmax(400px, 1fr))
```

For the nine clickable elements, the nested container divides the area in three columns, with cells 120px wide and tall. 

```STYL
.app__main
    display grid 
    grid-template-columns repeat(3, 120px)
    grid-auto-rows 120px
```