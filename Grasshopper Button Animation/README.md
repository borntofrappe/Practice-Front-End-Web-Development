Link to the work-in-progress pen right [here]().

## Preface 

Inspired by the android application bearing the same name, I wanted to include a button with a simple animation for a click event.

As a form of confirmation, as a form of validation, whenever the button is pressed, the simple SVG asset of a grasshopper, laid on top of it, is animated to emulate the jump of the small, noisy critter.

Bonus points: confetti should also be thrown off from the bottom to the top and trusting the grasshopper upwards.

A good excuse to practice with the animation of SVG assets, whether through SVG syntax or CSS properties.

## The Animation 

The animation makes use of multiple keyframes to accommodate for the following behavior:

- the grasshopper leans slightly toward the ground (perhaps with a slight skew)
- the grasshopper jumps upward, with a slight rotation backwards
- as it reaches the peak of the jump, the rotation increases and rapidly allows for the cirtter to completely rotate one turn (almost one turn)
- coming down to earth, the grasshopper concludes its 360 jump and slightly nears the ground before coming "back up". This to consider timing and follow-through.

## Animation with SVG Syntax

The SVG asset can be animated directly with inline, in between <svg> tags. This allows to include the SVG element in any document and have the animation baked in with it. 

To animate an SVG element, there exist the <animate> tags, as well as <animateTransform>. These come with a series of attributes specified which property of the asset is altered, when, how much and for how long.

For a first animation of the grasshopper, the animation is tied to a click on the SVG asset itself. Moreover, the animation affects the selected properties in multiple phases. What is achieved in CSS with the animation property and different keyframes is achieved here with the attributes of values and keytimes.

Once the animation is built, any document can benefit from it, simply including the SVG syntax. No extra lines of code necessary.

```HTML
<animateTransform attributeName="transform" attributeType="XML" type="rotate" begin="click" values="0; -20; -300; -360" keyTimes="0; 0.5; 0.8; 1" dur="1s"/>
```

Unfortunately, there doesn't seem to be a solid way to include animation on multiple properties. At least multiple properties affecting the SVG together. It is possible to allow for multiple, different animations, but at different instances, which is not exactly what this small project is all about.

```HTML
<animateTransform attributeName="transform" attributeType="XML" type="rotate" begin="click" values="0; -20; -300; -360" keyTimes="0; 0.5; 0.8; 1" dur="1s"/>
<animateTransform attributeName="transform" attributeType="XML" type="translate" begin="click+1s" values="0 0; 0 -50; 0 0" keyTimes="0; 0.5; 1" dur="1s"/>
```

With this snippet, the SVG is animated first pertaining its rotation, then its vertical position. But the lack of concurrent animation does reduce the applicability of SVG inline animation. Something that is instead allowed by the CSS solution.

Minor nuisace notwithstanding, the practicality of this approach is self-evident in the following snippet.

```HTML
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 79.375 52.917">
    <g transform="matrix(.951 0 0 .97316 -26.711 -95.451)">
        <path d="M38.743 98.256s3.463 42.679 58.17 41.563c-9.19-46.77-58.17-41.563-58.17-41.563z"/>
        <path d="M28.087 120.474s17.747 38.967 68.827 19.345c-24.523-40.872-68.827-19.345-68.827-19.345z"/>
        <rect transform="rotate(36.468)" ry="2.5" rx="1.25" y="73.794" x="131.178" height="16.036" width="4.811"/>
            <rect width="4.811" height="16.036" x="63.884" y="140.649" rx="1.25" ry="2.5" transform="rotate(-3.87)"/>
            <rect transform="rotate(-3.87)" ry="2.5" rx="1.25" y="140.3" x="71.371" height="16.036" width="4.811"/>
            <path d="M96.655 115.443s-9.672-3.37 3.096 23.906c28.25-30.683-3.096-23.906-3.096-23.906z"/>
            <path d="M99.596 104.7c1.914.196 2.721 1.617 1.258 4.098-1.951 3.31-4.115 7.155-2.588 11.005 1.062 2.678.008 3.83-1.907 3.636-1.915-.196-2.525-.773-3.127-3.59-.834-3.902.007-7.884 1.143-11.216.93-2.727 3.306-4.128 5.22-3.932z"/>
    </g>
    <animateTransform attributeName="transform" attributeType="XML" type="rotate" begin="click" values="0; -20; -300; -360" keyTimes="0; 0.5; 0.8; 1" dur="1s"/>
</svg>
```

Copy paste this SVG element in any document and the critter will be animated on click, without further need for specifications.

## Animation with CSS Keyframes

In CSS the same animation built inline with SVG can be achieved with the animation property and the keyframes keyword. Through this last keyword it is possible to specify the desired behavior in different steps. Unlike the SVG approach, multiple properties can be animated one alonside the other, with just few minor precautions.

This approach has the benefit of separating the asset from its animation and also present the change in properties in a cleaner, easy to grasp fashion. The `<animate>` tags can indeed be lost in the wilderness of SVG elements, groups and paths.

```CSS
svg {
    animation: grasshopp 1s ease-in-out infinite;
}
@keyframes grasshopp {
    0% {
        transform: translateY(0) rotate(0) skewY(0);
    }
    5% {
        transform: skewY(2deg);
    }
}
```

_Small caveat_: in the excerpt of this keyframe animation, only the property which is altered is change in value. In this instance, CSS is smart enough to affect only the value of `skewY`. That being said, if future keyframes do affect the other properties, their change will be diluted from the first declaration to the next.

In this instance:

```CSS
@keyframes grasshopp {
    0% {
        transform: translateY(0) rotate(0) skewY(0);
    }
    5% {
        transform: skewY(2deg);
    }
    10% {
        transform: translateY(-10px) rotate(20deg) skewY(0);
    }
}
```

`skew` is altered from 0 at the beginning to 2deg at the 5% keyframe, back to 0 at the 10% mark. `translateY` and `rotate`, on the other hand, are animated from 0% to 10%, all throughout. At 5%, these properties have already undergone a small change to reach the desired conclusion. 

Something to think about if you need only to alter some properties, but not all at the same time. It is often best to always specify all the affected properties.

```CSS
@keyframes grasshopp {
    0% {
        transform: translateY(0) rotate(0) skewY(0);
    }
    5% {
        transform: translateY(0) rotate(0) skewY(2deg);
    }
    10% {
        transform: translateY(-10px) rotate(20deg) skewY(0);
    }
}
```

In this again simple instance, the change in the other two properties doesn't start until the 5% keyframe.

## Button 

Be it through SVG syntax or CSS instructions, it is possible to animate the asset with JS script.

In the first case, all that is required is the inclusion of the appropriate value for the attribute of `begin`. Set to `indefinite`, this will pause the animation until a script informs the asset otherwise.

In the second instance, there are several routes available. With JS it is indeed possible to directly include the animation property, or add a class which bears witness to the animation.

The key is to include an approach which allows for repeated use. Whenever the button is clicked, and the animation is over, trigger the animation.

One way to achieve this repeated animation is through a timeout. Basically put, animate the asset, set a timeout of the length of the exact animation, at the end of which remove the animation.

```JS
function grasshopp() {
    svg.classList.add("animated");
    setTimeout(function() {
        svg.classList.remove("animated");
    }, 1500);
};
```

This does achieve the purpose of repeating the animation with new clicks, but with multiple click events, it does also mess up pretty fast.

As a precaution, it is possible to enact the adding/removal of the class only if that class is not already present on the element.

```JS
function grasshopp() {
    // if the element doesn't already have the animated class
    if(!svg.classList.contains("animated")) {
        // add the animated class and remove it when the animation is complete
        svg.classList.add("animated");
        setTimeout(function() {
            svg.classList.remove("animated");
        }, 1500);
    } 
};
```

# The plan

- [x] include the SVG asset in the DOM, within a container centering all its content in the page
- [x] animate the SVG directly with SVG syntax and within the `<animate>` tags; tie the animation to a click on the assset
- [x] animate another copy of the SVG with CSS syntax.
- [x] wrap everything up and create a button with the SVG on top of it. Animate the button alongside the SVG, whenever clicked.
