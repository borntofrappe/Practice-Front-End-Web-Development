Link to the working pen right [here](https://codepen.io/borntofrappe/full/oyeQYr/).

# Inspiration 

For the weekly [#codepenchallenge](https://codepen.io/challenges/2018/june/) I took inspiration from several sources:

- [this dribble](https://dribbble.com/shots/2973869-Stories) inspired me to position the image right at the top of the page, with a gradient transitioning the reader's eye from the image to the actual text of the page. As I am not particularly fond of big, hero images, the flower's image is set to occupy less than 100% of the viewport height;

- [this article](https://24ways.org/2016/css-writing-modes/) inspired me to toy around with vertical writing modes. For particularly large screen devices, I thought it'd be a neat addition to have some additional text right next to the main content;

- [this insightful article](https://css-tricks.com/your-brain-on-front-end-development/) was an inspiration in general.

# Update

As the challenge was mostly CSS related, any additional content has been included through pseudo-elements. 

For the font themselves, I went with _Muli_ for paragraphs and _Montserrat Alternate_ for the headers. 

The project turned out to be a great way to refresh CSS selectors. Here's a brief note on the subject.

- `>` can be used to target the elements directly nested in another element
- `~` can be used to target _all_ the elements nested in another element
- `+` can be used to target the element following another element

Finally, as the project relied on having the image plastered atop the page and I did not want to sacrifice the aspect ratio of the same asset, I included media queries for large and small screens alike. In large devices, the image would be indeed stretched to maintain its 100% width.
