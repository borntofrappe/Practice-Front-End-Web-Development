# CPC Splitting Mercury

For the third #codepenchallenge of February, themed after **blobs**, I decided to tinker with the gooey effect to achieve a neat animation. Inspired mostly by [this great article](https://css-tricks.com/gooey-effect/).

Here's the idea:

1. have a blob centered on the screen;

1. as a click event is registered on the blob:

   - reduce the size of the blob ever so slightly;

   - create a copy of the blob;

   - have the two move in opposite, or close to opposite, directions.

1. as a click event is registered on another blob, including the first one, repeat point 2.
