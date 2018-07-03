Link to the work-in-progress pen right [here]().

# Preface 

While studying and using D3.js, I realized how the past efforts with SVG syntax have helped me with the data visualization library.

To further my endeavors in this direction, and celebrate a little with a small silly project, I decided to try and replicate the design of a checkers board, of course using SVG syntax. SVG elements like `path` and `rect`, but also supporting elements like `linearGradients` and `pattern`.

# Notes

SVG tags such as `linearGradients` and `pattern` are ideally declared in one place and later referred in the elements which require them, however many time somebody may want to re-use the underlying syntax.

**defs**

Right at the top of the `svg` element, it is possible to catalog the supporting tags in between `defs` tags. These allow to separate the definition from the use of the elements here defined. Moreover, the elements nested in between such tags are not immediately rendered as the browser loads the asset.

```HTML
<svg>
    <defs>
        <!-- define supporting elements, like gradients, patterns, filters -->
    </defs>

    <!-- include SVG elements, such as rect, circle, path -->
</svg>
```

**url(#)**

Following the declaration, the elements defined in between `degs` tags can be used by reference. Once an `id` attribute is specified on the gradient/patter, all that is reuired is the inclusion of this name in between parens, as in

```HTML
<svg>
    <defs>
        <pattern id="pattern"/>
        <!-- define supporting elements, like gradients, patterns, filters -->
    </defs>

    <rect fill="url(#pattern)"/>
</svg>
```