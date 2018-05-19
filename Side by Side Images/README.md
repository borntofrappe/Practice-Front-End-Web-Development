Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/wjRbgz).

# Preface 

The purpose of this project is to replicate a neat feature I found on the [Stuttgarter Zeitung](https://www.stuttgarter-zeitung.de/), while browsing for German articles. I am sure the feature is present elsewhere, but this is where it happens to be the latest place in which I find it.

Specifically in this [article](https://www.stuttgarter-zeitung.de/inhalt.esslingen-von-oben-mit-schiffshebewerken-ueber-die-alb.ff64cb4a-0c75-4d5d-9026-3db01b47d530.html), two images are shown side by side. Moreover, through a controller smacked in the middle of the image, it is possible to toggle the visibility of either image.

Drag the controller to the left and the image "positioned" on the right is made visible on the opposing side as well.

I say "positioned" because I presume that the images are actually laid in the same exact place, and the effect is achieved with an overarching, animated element.

The project sets out to replicate this mechanism on a single image, shown on one side in grayscale and on the other in full colol.

The image chosen from [Pexels](https://www.pexels.com/) is this particular one of the [Neuschwanstein Castle](https://images.pexels.com/photos/187854/pexels-photo-187854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940).

# Plan

- [x] include an image covering the entirety of the viewport
- [x] try and apply the css property of _filter_ to the image
- [x] include a controller on top of the image 
- [x] listen for mouse events on the controller
- [x] study how to retrieve the correct [0-100%] interval from the horizontal coordinate of the element
- [x] attach the [0-100%] interval to the left property of the controller and the image to be shown/hidden
