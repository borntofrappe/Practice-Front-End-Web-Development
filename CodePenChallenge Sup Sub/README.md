Link to the work-in-progress pen right [here]().

# Preface 

The purpose of this project is to participate in the weekly #codepenchallenge, regarding the HTML elements of `<sub>`script and `<sup>`erscript.

Technically these elements are meant to be used for anything but just for typographic needs (think ordinal numbers, think chemical formulas). For the sake of the project however, I plan to use them for a more exotic purpose, to create a simple game of mad libs in which you can choose between two choices how to complete the a script.

The pen ought to be rather simple: you have a semi-long script, with `<sup>` and `<sub>` elements used jointly throughout the script itself to present a "fork" in the text.

As you click either element, the text nestled inside of it will be highlighted or otherwise visually imposed on the other, to remark the choice made by the visitor.

# Plan

- [x] in a paragraph element, include sub and sup elements to test out their appearance.
- [x] increase the relative size of each element. Make them boldly appear on page
- [x] position the elements with the same horizontal coordinate, but with different vertical coordinates. 
- [x] as either sup or sub element is clicked, visually remark the choice made by the visitor. This by either highlighting the choice, removing the other element.

# Notes 

The effect is achieved, some-how haphazardly, by nesting a `<sup>` and `<sub>` element in a shared `<span>` element. This span element is then styled in the JS script, as to accommodate for the different width of the nested elements.

Indeed by default the `<sup>` and `<sub>` elements would be shown side by side, but with a bit of logic and math it is possible to make one stay exactly on top of the other.

Once this effect is achieved, the next piece of the puzzle is the removal of the element not chosen. To achieve this feat, always in the JS script, the `<span>` element of the clicked `<sup>`/`<sub>` element is targeted and its content altered. By including simply text with the `innerHTML` method it is possible to practically remove the nested elements, and display the text as it'd normally be displayed in a single `<span>`, as a part of the paragraph.
