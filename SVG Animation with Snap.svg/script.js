/*
manufacture a debounce function to limit how often the code reacts to the scroll event
*/
function debounce(func, wait = 20, immediate = true) {
    var timeout;
  
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if(callNow) {
        func.apply(context, args);
      }
    };
};


// create Snap elements for the SVG included in the markup
const svgIntro = Snap(".svg-intro");
// define a circle initially in the top right corner, with 0 radius [the three numbers stand for center-x, center-y, radius]
const giantSVGCircle = svgIntro.circle(0, 0, 0).addClass("circle");
// animate the circle into view 
giantSVGCircle.animate(
    {
        cx: 350, 
        cy: 300, 
        r: 550
    }, 500, mina.backout);   
// give a class of animation to the header and the paragraph elements which then overlap the giant circle
const header = document.querySelector("main h1");
header.classList.add("animation");

const paragraphs = document.querySelectorAll("nav p");
paragraphs.forEach(paragraph => paragraph.classList.add("animation"));

// replicate the construct for the bottom section of the page, and the SVG thereby laying 
const svgOutro = Snap(".svg-outro");
const giantSVGRec = svgOutro.rect(0, 0, 0, 5).addClass("rectangle");
// target the footer element as to animate the rectangle when the scroll event reaches this element
const footer = document.querySelector("footer");



// listen for a scroll event on the window, upon which trigger a function to handle the animation
window.addEventListener("scroll", debounce(checkForScroll));

// define what happens at the different pre-established breakpoints
function checkForScroll(event) {
    let distanceFromTop = window.scrollY;
    // a first breakpoint is given by 200px, from the top
    let svgIntroBreakpoint = 200;
    // a second breakpoint by the vertical coordinate of the footer, reduced by the height of the window (otherwise window.scrollY would reach the footer only when the top of the window passes by the footer, and not the bottom of the fold)
    let svgOutroBreakpoint = footer.offsetTop - window.innerHeight;

    // trigger the SVG animation of the circle element when the scroll even scrolls past the breakpoint; triggering a backwords animation when the scroll event comes back to the top
    if(distanceFromTop > svgIntroBreakpoint) {
        animateSVGIntro();
    } 
    else {
        animateSVGIntroBack();    
    }

    // trigger the animation for the rectangle element when the page reaches the pre-established breakpoint
    if(distanceFromTop > svgOutroBreakpoint) {
        animateSVGOutro();
    }
}

// animate the SVG element specifing with an object the affected properties, followed by the duration of the animation and an easing function
function animateSVGIntro() {
    giantSVGCircle.animate(
        {
            cx: 0, 
            cy: 0,
            r: 0
        }, 300, mina.backin);
    // add / remove the class of animation to the header / paragraph elements according to the underlying background
    // white background -> remove class, keep the color to black 
    // red background -> add class, change text color to white
    if(header.classList.contains("animation")) {
        header.classList.remove("animation");
        paragraphs.forEach(paragraph => paragraph.classList.remove("animation"));
    }
}
function animateSVGIntroBack() {
    giantSVGCircle.animate({
            cx: 350, 
            cy: 300,
            r: 550
        }, 300, mina.backout);
        header.classList.add("animation"); 
        paragraphs.forEach(paragraph => paragraph.classList.add("animation"));       
}

function animateSVGOutro() {
    // change the rectangle into a circle
    giantSVGRec.animate(
        {
            rx: "25%"
        }, 500, mina.backout);
}
