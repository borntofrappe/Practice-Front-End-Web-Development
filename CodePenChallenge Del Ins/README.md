Link to the work-in-progress pen right [here]().

# Preface 

The purpose of this project is to participate in the weekly codepen challenge, tasking designers and developers alike to tinker with a selected topic on a recurrent basis. 

For the first week of May, the topic regards the html elements of ins and del. The former is used to notify of an insertion, something added to the document, while the ladder achieves the exact opposite purpose, declaring a deletion. 

In my opinion, the topic lends itself perfectly to a much beloved academic practice, highlighting text. With this in mind, the project is tasked to have some text which can be either highlighted or removed by applying the different markup tags to the tidbits clicked or tapped. 

Select a highlighter, highlight whatever string you interact with. 
Select an eraser, visually annihilate the interacting element. 

V2

The project so far described is already a neat one. Some time and attention can be even devoted to the different styled prompted by the insertion/deletion. 

That being said, there are a couple more ideas to prop something more similar to a useful application. 

For starters, a setting panel can be included to pick and choose the color of the highlight / deletion. While this last one is the color of the background, by default, it ought to be changed as wanted. 

CSS variables seem to be the best fit in this instance, allowing to update the colors applied to the document in a single location and have it change everywhere on the page. 

V3

Once the input side of the application is taken care of, the output can also be improved. Output in terms of actual text, which can be copied from the app elsewhere. 

Text which can be copied in two variants:

- copy text (which copies all text except the deletions), 
- copy highlight (which copies only the highlighted text). 
