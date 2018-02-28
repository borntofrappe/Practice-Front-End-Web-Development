## Preface

The goal of this project is to recreate a simplified interface of a text message application.
This to provide a nice piece of UI, while at the same time practicing with layouts and positioning of elements.

For the final result, check out this [pen](https://codepen.io/borntofrappe/full/OQrveJ/). 

For the thought process behind it, keep on reading.

## How to

The structure can be manufactured with different layout techniques, which are soon described. 
Prior to this section though, attention is devoted to the HTML Structure and CSS Aesthetics making up the phone interface.

**HTML Structure**

The HTML structure for the phone UI is simply made up of a container `div` in which paragraphs elements are nested. Paragraphs with the actual text for each message.

Perhaps too much though went into the made-up conversation. A more efficient solution would have been to include placeholder text, but the HTML structure looks nothing more than the following:

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

Leveraging CSS properties it is possible to style the larger container and nested items in such a way to fabricate a makeshift phone screen.

**CSS Aesthetics**

In order to style the larger container as resembling a simplified phone screen, properties of `border-radius` and `box-shadow` are used to separate the `div` from the page.

In order to visually separate messages from each other, paragraphs are then styled alternatively through the pseudo-selectors of `:nth-child(odd)` and `:nth-child(even)`.

*box-shadow*

The property can take multiple input values, in order to detail multiple aspects of the property. This is explained rather clearly in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow).

In the simple use case, four input values are expressed. Values roughly explained by the following table:

|Input number|Meaning|Values|
|---|---|---|
|1|Horizontal offset| >0 shadow to the right, <0 to the left|
|2|Vertical offset| >0 shadow to the bottom, <0 to the top|
|3|Blur| The higher the value the higher the blur|
|4|Color| Color of the shadow|

It is important to note that `box-shadow` takes the rounded-corner nature of the container, as per `border-radius`. Thusly, the shadow will cast itself properly around the rounded rectangle.

Finally, multiple shadows can be set on the container. This is possible by simply separating shadows with a comma, and detailing subsequent shadows like the former, with offset, blur and color values.

```CSS
.phone-ui {
	box-shadow: 
            0 16px  24px  rgba(0,0,0,0.12), 
            0 6px   8px   rgba(0,0,0,0.08);
}
```

*pseudo-selectors*

It is possible to easily target paragraphs alternatively through simple pseudo-selectors. These allows to specify characteristics that the elements ought to have in order to be selected by CSS statements. 
In the example, paragraphs which are odds (1st, 3rd and so forth), and paragraphs which are even (2nd, 4th and so on) are targeted separately through the appropriate pseudo-selectors.

What differentiates the two is:
- a different `background-color`, to visually mark the sender's/ receiver's messages;
- different values for the property of `border-radius`, as to "attach" each message to the appropriate side;
- different alignment in text, as per `text-align`, remarking the intention of the `border-radius` property.

For the `border-radius` property itself, it is possible to specify with multiple input values where the rounded corners should occur and how rounded they should be. 

In a single statement it is possible to clarify a value for all, or multiple values for `top-left`, `top-right`, `bottom-right`, `bottom-left` corners. 
Alternatively it is possible to target a specify corner with a specific property, as in the following example.


```CSS
.phone-ui p:nth-child(odd) {
	background-color: rgba(255,193,7,1);
	border-radius: 1.4rem;
	border-bottom-right-radius: 0.3rem;
	text-align: right;
}
.phone-ui p:nth-child(even) {
	background-color: rgba(0,0,0,0.2);
	border-radius: 1.4rem;
	border-bottom-left-radius: 0.3rem;
	text-align: left;
```

And this concludes the simple structure and styling of the phone interface. 

By itself the interface is already not too shabby, as visible in the "Phone UI - No Layout" section of this [pen](https://codepen.io/borntofrappe/full/OQrveJ/).
That being said a huge portion is left undone in the layout of the container and of the nested elements. Paragraphs should be moved alternatively to the left and right side of the container to create the makeshift conversation.

The next section is exactly to accomplish this feat, through multiple means.


**CSS Layout**

As mentioned it is possible to position the container and its nested children through several approaches.

1. `float`

	By setting the float properties on odd and even paragraph it is possible to set the elements to either side of the container and clear the rest of the line from other elements.
	
	```CSS	
	.float p:nth-child(odd) {
	  float: right;
	}
	.float p:nth-child(even) {
	  float: left;
	}
	```
	
	While the mentioned properties do achieve the effect for the single messages, these are displayed away from the container, which finds itself empty. 
	To fix this issue, all that is required is to set the `display` property of the encompassing `div` to `inline-block`. The container is thusly made to occupy the space required by its content. 
	
	```CSS
	.float {
	  display: inline-block;
	}
	```

2. `flex`

	With `flex` properties, and with `grid` properties for that matter, the layout of the elements becomes more intuitive. 
	First of all, the property of `display` is set to `flex`, as to benefit from corollary properties. Moreover, `flex-direction` is changed to lay out items vertically instead of horizontally, which is the default option.
	
	```CSS
	.flex {
	  display: flex;
	  flex-direction: column;
	}
	```
	
	To display items in a flex container, multiple properties are are available. 
	
	**Justify v align**
	
	In the world of flex, *align* and *justify* properties allow to align flex items along the *main-axis* and the *cross-axis*. These axes pertain the *row* and *column* of a flex container, according to the property of `flex-direction`. If it sounds a tad complicated the following table might help.
	
	|Flex-direction|Main-axis|Cross-axis|Justify properties|Align properties|
	|---|---|---|---|---|
	|Row|Row|Column|Align in the row (left and right)|Align in the column (top and bottom)|
	|Column|Column|Row|Align in the column (top and bottom)|Align in the row (left and right)|
	
	If it sounds still confuding, CSS Tricks has a really helpful [documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) on the subject.
	
	> Simply put, justify properties relate to the main axis, while align properties are connected to the cross axis.
	
	In the example:
	- flex direction is set to column;
	- the main axis is the column;
	- the cross axis is the row;
	- align properties align in the cross axis, which is the row.
	
	**Items v self**
	
	Understanding the align v justify difference, two properties are available for the align properties: `align-items` and `align-self`. 
	
	The former is applied to the *flex-container* and describes the alignment of all its nested children.
	The latter is applied to *flex-items* and relates to the alignment of single, individual children.
	
	In the example it is possible to either set an alignment property on the larger container and one on odd/even items.
	
	```CSS
	.flex {
	  align-items: flex-start;
	}
	.flex p:nth-child(odd) {
	  align-self: flex-end;
	}
	```
	
	Or it's possible to differentiate alignment properties for odd and even elements without specifying a property for the parent element.
	
	```CSS
	.flex p:nth-child(even) {
		align-self: flex-start;
	}
	.flex p:nth-child(odd) {
	 	align-self: flex-end;
	}
	```
	
	Which is definetly shorter than the diluted explanation behind it.


3. `grid`

	First of all, the `display` property is set to `grid`, to inject grid logic in the container and items. 
	
	```CSS
	.flex {
	  display: grid;
	}
	```
	
	Following this statement, multiple alignment properties are available. Even more properties than flex allows.
	
	**Justify-items, justify-self**
	
	Align the content along the row axis (consider left and right). 
	
	Aligning all grid-items in the first case (justify-items), or individual elements in the second (justify-self).
	
	**Align-items, align-self**
	
	Align the content along the column axis (consider top and bottom), with the same split analyzed in the previous couple of properties.
	
	**Justify-content, align-content**
	
	Align the grid inside the grid container. Sometimes this occur when grid items are sized in such a way that they don't stretch to cover the encompassing container.
	
	Justify and align properties in this perspective align the grid along the row and the column axis respectively.
	
	In the example of the phone interface, the required properties are `justify-items` and `justify-self`. This because the content is to be laid either left or right in the grid container.
	
	Just like with flex, two possibilities arise. 
	Either we set one property of `justify-items` for the container and one of `justify-self` for a category of items.
	
	```CSS
	.grid {
	  justify-items: start;
	}
	.grid p:nth-child(odd) {
	  justify-self: end;
	}
	```
	
	Or we set two properties on the different elements, both through `justify-self` values. 
	
	```CSS
	.grid p:nth-child(even) {
	  justify-self: start;
	}
	.grid p:nth-child(odd) {
	  justify-self: end;
	}
	```

And that covers three different possibilities which allow to lay items in a container, as needed to manufacture a makeshift phone screen in a text message application.
