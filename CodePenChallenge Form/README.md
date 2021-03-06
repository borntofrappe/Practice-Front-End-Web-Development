Link to the working [here](https://codepen.io/borntofrappe/full/xJwJNP/).

# Preface 

The weekly codepen challenge is all about forms. The challenge itself does provide a starting pen, with straightforward markup making up the structure of a simple form. That being said, I decided to avoid forking said pen in favor of a form of my own.

The idea behind the project is a little unorthodox, but far from particularly original. 

Instead of designing the form as a wholesome element, consider the different parts making up the larger composition. 

Include first name. Include last name. Include a valid email. All these sub-elements can be considered components of the larger form. 

As you consider this structure, separate the sub-elements from one another. Separate them visually. 
Instead of having them all in one screen, let them appear one after the other. Similarly to an hypothetical checkout process.

This may seem contrived, and rightly so. The idea is to build a form, specifically a sign up form, that is designed to take a few steps. To take time. To create friction. This while presenting a beautiful, sleek interface. 

I want to create contrast, almost opposition between form and function. 

I want a form which, in terms of usability, is primed for frustration. And also a form which, in terms of design, is primed for attractiveness.

The usability dive can be furthered by including error messages and have the visitor go through the different components of the form more than a single time. Always accompanied by the sleek, attractive, almost difficult to get mad at interface.

I almost have a name for the pen already: _Awfully Nice Form_. 

## Design

A few design considerations are included before the project is technically developed.

For colors, I wanted to have a soft palette, so I decided to pick a few hues resembling pastel-colors. For the font, I found Montserrat to be particularly soothing, especially with the thin font-weight of 300.

**Colors**

- background white: #FDFDFD
- success green: #7AC779
- warning red: #EE5267
- accent blue: #265174

**Font**

Montserrat: thin for the headers, semi-bold for the buttons.

_Update_

As I started developing the project, I decided to alter the color palette for the form. A nice blue gradient in the background is included, together with an accent pink/purple for the submit button. For the text, #252525 proved to be rather harsh, so I included some transparency through rgba hsla would have also worked).

- background white: hsl(195, 50%, 98%)
- blue gradient: hsl(198, 76%, 50%) to hsl(228, 62%, 36%)
- pink: hsl(348, 98%, 66%)
- black text: hsla(0, 0%, 15%, 0.7) with varying opacity

## Form

Since a `<form>` is less frequent than other HTML elements, I decided to take some time and analyze the different and correct markup making up a solid form.

The [pen](https://codepen.io/team/codepen/pen/QxXejz) created by @codepen for the challenge already provides a simple starting point:

```HTML
<form class="form" action="post" method="post">

  <h1>Sign Up</h1>

  <div class="signup__field">
    <label for="first_name" class="label">First name</label>
    <input type="text" name="first_name" id="first_name" class="input-field">
  </div>

  <div class="signup__field">
    <label for="last_name" class="label">Last name</label>
    <input type="text" name="last_name" id="last_name" class="input-field">
  </div>

  <div class="signup__field">
    <label for="email" class="label">Email address</label>
    <input type="email" name="email" id="email" class="input-field" required>
  </div>

  <div class="signup__field">
    <label for="password" class="label">Password</label>
    <input type="password" name="password" id="password" class="input-field" required>
  </div>

  <fieldset>
    <legend>Favorites</legend>

    <div class="signup__field">
      <label class="label" for="fav_color">What's your favorite color?</label>
      <div class="select-field">
        <select name="fav_color" id="fav_color" class="select-field__menu">
          <option>Please select an option</option>
          <option value="Red">Red</option>
          <option value="Orange">Orange</option>
          <option value="Yellow">Yellow</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
        </select>
      </div>
    </div>

    <div class="signup__field">
      <div class="label">What's your favorite Ninja Turtle?</div>

      <input type="radio" value="leo" id="nt_leo" name="ninja_turtle">
      <label for="nt_leo">Leo</label>

      <input type="radio" value="leo" id="nt_mikey" name="ninja_turtle">
      <label for="nt_mikey">Mikey</label>

      <input type="radio" value="donnie" id="nt_donnie" name="ninja_turtle">
      <label for="nt_donnie">Donnie</label>

      <input type="radio" value="raph" id="nt_raph" name="ninja_turtle">
      <label for="nt_raph">Raph</label>
    </div>

  </fieldset>

  <div class="signup__field">
    <input type="checkbox" id="amazing" name="amazing">
    <label for="amazing">I'm amazing</label>
  </div>

  <div class="signup__button">
    <button class="button" type="submit">Signup</button>
  </div>

</form>
```

[My own project](https://codepen.io/borntofrappe/pen/qoWvxQ) for the @freecodecamp curriculum also has plenty of teach-able insights.

```HTML
<div class="container-form">
  <h1 id="title">Survey Form</h1>
  <p id="description">If you have the time, we would really appreciate your feedback.</p>

  <form id="survey-form">
    <div class="survey-item">
      <label for="name" id="name-label"><span class="required">*</span>Name</label>
      <input type="text" id="name" placeholder="Johnny B." required>
    </div>

    <div class="survey-item">
      <label for="email" id="email-label"><span class="required">*</span>Email Address</label>
      <input type="email" id="email" placeholder="johnny@gmail.com" required>
    </div>

    <div class="survey-item">
      <label for="number" id="number-label">Age</label>
      <input type="number" id="number" min="1" max="135" placeholder="25">
    </div>

    <div class="survey-item">
      <label for="dropdown">Gender</label>
      <select name="genders" id="dropdown">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="undeclared" selected>Undeclared</option>
      </select>
    </div>


    <fieldset>
      <legend>Which operating system do you primarily use?</legend>
      <input id="radio-windows" type="radio" name="operating-system" value="windows">
      <label for="radio-windows">Windows</label><br>
      <input id="radio-mac" type="radio" name="operating-system" value="mac">
      <label for="radio-mac">Mac</label><br>
      <input id="radio-linux" type="radio" name="operating-system" value="linux">
      <label for="radio-linux">Linux</label>
    </fieldset>

    <fieldset>
      <legend>Which devices do you use daily?</legend>
      <input id="device-mobile" type="checkbox" name="device" value="mobile phone">
      <label for="device-mobile">Mobile phone</label><br>
      <input id="device-tablet" type="checkbox" name="device" value="tablet">
      <label for="device-tablet">Tablet</label><br>
      <input id="device-laptop" type="checkbox" name="device" value="laptop">
      <label for="device-laptop">Laptop</label><br>
      <input id="device-pc" type="checkbox" name="device" value="personal computer">
      <label for="device-pc">Personal computer</label>
    </fieldset>

    <div class="survey-item">
      <label for="comments" id="number-label">Want to add something?</label>
      <textarea id="comments"placeholder="Feel free to include any additional comment"></textarea>
    </div>

    <button id="submit">
      Submit
    </button>
  </form>

</div>
```

**Practical Insights**

- The elements making up the form are wrapped in between a `<form>` element. Beside class or id identifiers, this element has also `action` and `method` attributes specifying the functionality of the form as it is filled and submitted. These attributes are beyond the scope of the project at hand, but warrant a bit of research for the usability of the `<form>` element.

- it is advisable to group different parts of the form in separate `<div>` elements. This allows to group clearly connected elements, like `<label>` and `<input>` elements, together.

```HTML
<form>
<div>
  <!-- form element -->
</div>
</form>
```

- `<label>` elements have a `for` attribute which allows to connect the element to the `<input>` bearing the same name. For the `<input>` element, the attributes of `name` and `id` are usually set to match.

```HTML
<form>
  <div>
    <label for="input_name">Label</label>
    <input type="text" name="input_name" id="input_name">
  </div>
</form>
```

- `<input>` elements, considering HTML5, can specify different values or the `type` attribute. This allows the different browser to render input elements according to the value they expect, be it `email`, `password`, plain `text` or other [available options](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

- it is possible to group `<option>` and `<input>` elements of `type="radio"` and `type="checkbox"` in between `<fieldset>` tags. This is an element which allows to include a `<legend>` for the grouping and visually frame the nested elements as a separate, independent section of the form.

- the form generally ends with a `<button>` element of `type="submit`.

### Placeholder

The `<input>` elements are allowed to have a `placeholder` attribute. This specifies the value displayed by default in the input field. For `<input>` elements of `type="radio"` and `type="checkbox"` the flag of `checked` can be included to also specify a default option.

**Style Confusion**

It is possible to [style the placeholder](https://css-tricks.com/almanac/selectors/p/placeholder/) through the pseudo-element `::placeholder`. There also exist the pseudo-class of `:placeholder-shown`. The two differ in the following manner:

- `::placeholder` styles the actual placeholder text;
- `:placeholder-shown` styles the input element _when_ a placeholder text is visible. 

Practically, and due to the cascading nature of CSS, using the pseudo-class may affect the placholder text itself, but the two differ from each other, as explained.

To add complexity to this mild confusion, browsers interpret the `placeholder` selector in different fashions.

There's also [plenty of discussion](https://css-tricks.com/alternatives-placeholder-text/) regarding the actual value of placeholders, so I might end up scrapping the attribute altogether. So much for usable research.


## React

Given the component-based structure of the project, the React library is a perfect choice to render the different form elements. The project is structured with the following components:

- `index.js` renders the main component to the single `<div>` element present in the HTML
- `app.js` renders a single stateful component in `SignUpForm`. 
- `SignUpForm` displays the different HTML structures depending on the flow of the application. The flow is emulated by altering a key in the state and use it to display different JSX elements. A button triggers the change in state, through the `setState()` function and triggers a re-rendering of the page.

### React Animation

While the initial project is able to include the different sub-elements one after the other, it does so without allowing for any kind of transition. The JSX elements are rendered immediately, with no sense of pause nor action on the serer side. 

It'd be neat to transition each sub-element in and out of view, altering properties of opacity and maybe horizontal coordinates as well.

As I revised the project, I started tinkering with straightforward CSS animation. While learning about the subtle differences which can be introduced applying multiple transition properties on different selectors, I came up with a pretty simple, yet pleasing animation.

This does not imply that _React Animation_ is a closed topic. By far, I need to research the subject, alongside many other React libraries. For the project at hand though, this means that CSS animation does the trick.

Now it's just a matter of streamlining the project structure, trying to remove reduncancies while adding more input fields, such as those detailed by the [example pen](https://codepen.io/team/codepen/pen/QxXejz).

There should exist an input field for:

- password
- favorite color
- favorite ninja turtle

To maintain the spirit of the project, and the impractical nature of the form, the final "awkward" form should only contain a few of the input fields found on the way. This to also give the clear feedback that everything you included before did not really count. Nor matter. A better copy might be included for the error message to support this statement.



