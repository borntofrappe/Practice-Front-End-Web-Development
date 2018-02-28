For the live project check this [pen](https://codepen.io/borntofrappe/full/OQrveJ/).

### Preface

The intent behind this project is to recreate a simplified interface of a text message application. 
This to provide a nice piece of UI, while at the same time practicing with layouts and positioning of elements.

The main container ought to be a rectangle with remarkedly rounded borders. Inside of this larger frame, messages are to be displayed 
alternatively on the left and right sides, just like any text message application would.

The rectangle shapes consisting of the messages ought to differ in order to visually connect each message to its rightful side. 
Meaning: if a rectangle is displayed on the left, it should visually point to the bottom-left of the screen, attaching itself to a side 
of the conversation.

Describing the concept seems to be more difficult and pointless than just showing the idea behind it, so enough said.

### How to

The structure replicating a phone perspective of a text message application can be manufactured with different layout techniques, 
which are soon described.

**HTML Structure**

The HTML structure for the phone UI is simply made up of a container div in which paragraphs contain the actual text behind each message.

Perhaps too much though went into the made-up conversation. A more efficient solution would have been to include placeholder text.

```HTML
<div class="phone-ui">
  <p>Hello there, mon ami</p>
  <p>Bonjour, friend, something new on the horizon?</p>
  <p>Sure, but I'm not writing about that xD</p>
  <p>Need something?</p>
  <p>Actually yes, I though you could help me solve a small problem...</p>
  <p>Fire away</p>
  <p>Okay, I'm struggling with exercise 3.2 page 74</p>
  <p>Quite a head scratcher, but maybe this will help. You just need to think of ...</p>
</div>
```


**CSS Aesthetics**

In order to style the larger container as resembling a simplified phone screen, properties of `border-radius` 
and `box-shadow` are used to separate the div from the page as a hovering screen. 

In order to visually separate messages from each other, paragraphs are then styled alternatively through the 
pseudo-selectors of nth-child(odd) and nth-child(even), with different backgrounds.

*box-shadow*

The property can take multiple input values to specify different aspects of the properties, as detailed in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow).

In the simple use case, four input values are expressed. Values roughly explained by the following table:

|Input number|Meaning|Values|
|---|---|---|
|1|horizontal offset| >0 shadow to the right, <0 to the left|
|2|vertical offset| >0 shadow to the bottom, <0 to the top|
|3|blur| the higher the value the higher the blur|
|4|color| color of the shadow|

It is important to note that box-shadow takes the rounded-corner nature of the container, as per border-radius. 
Thusly, the shadow will cast itself properly around the rounded rectangle.

Finally, multiple shadows can be set on the container. This is possible by simply separating shadows with a comma, and detailing 
subsequent shadows like the former.

.phone-ui {
	box-shadow: 
            0 16px  24px  rgba(0,0,0,0.12), 
            0 6px   8px   rgba(0,0,0,0.08);
}

**pseudo-selectors*

It is possible to easily target paragraphs alternatively through simple pseudo-selectors. These allows to specify attributes that the 
elements ought to have in order to be selected by CSS statements. In the example paragraphs which are odds (1st, 3rd and so forth),
and paragraphs which are event (2nd, 4th and so on) are targeted separately.

What differentiates the two is a different background-color and different values for the property of border-radius.

.phone-ui p:nth-child(odd) {
	background-color: rgba(255,193,7,1);
	border-radius: 1.4rem;
  border-bottom-right-radius: 0.3rem;

}
.phone-ui p:nth-child(even) {
	background-color: rgba(0,0,0,0.2);
	border-radius: 1.4rem;
  border-bottom-left-radius: 0.3rem;
}

As specified, the messages ought to "attach" themselves to either the left and right side. This is visually achieved by specifying a 
less-rounded corner for the respective side.


And this concludes the simple structure and styling of the phone interface. By itself the interface is already not too shabby, but 
a huge portion is left apart in the layout of the container and of the nested elements. 
Portion to which the next section is solely devoted.


**CSS Layout**

It is possible to position the container and its nested children through several approaches.





