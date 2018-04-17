Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/LdwbRv/).

# Preface 

The purpose of this project is simply to implement in a real project, first hand, knowledge accrued with regards to regular expressions.

# Plan

- [x] create a signup form, with label and input elements for username, email and password
- [x] with stylus have fun specifying variables for custom colors, even overriding default values
- [x] in a JS script, use regular expression and the .test() function to attach a class of valid when the input for the username meets a certain condition
- [x] implement the same logic on all input elements
- [x] figure out how to apply the regex logic to all input elements without repeating too much code.

# Lessons learned

## Regex

Regular expressions allow to look for certain string patterns by defining a set of characters which are to be matched.

To create a regex you simply include in between /forward slashes/ the string, or special characters, which define the pattern. It is as easy as the following example, which defines a regular expression for the word hello.

```JS
const pattern = /hello/
```

Of course by itself the example is ludicrous. Beside the fact that you need to actually search for the expression somewhere (I'll get to that later), the regex can include special characters and meta characters, which define more complex constructs than string literals.

In the project at hand, the following special characters are included. For a comprehensive list, this website has a complete [documentation](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).

- square brackets `[]`, which define a *character set*. By wrapping string literals and other characters in square brackets, it is possible to look for more than a single character. For instance, with the character set `[abc]` it is possible to look for a matching letter in `a`, `b` and `c`. Either will be a correct match.

- hyphen `-`, which allow to define a *range*. Separating characters with a hyphen will result in the regex looking for the characters and anything in between. For instance, with the character set `[a-c]`, a match will result once again for `a`, `b` and `c`.

- curly braces `{}`, which allow for the regex to look for multiple instances of a character. In curly braces it is possible to define a prescribed number of repetition or even a range, simply by comma separating two values. For instance, with the character set `[a-c]{2,5}`, a match will result in any string containing `a`, `b` and `c`, between two and five times.

- word character `\w`. Backward slashes can be included to build a character with a special meaning. In the instance of the character `w`, the inclusion of a slash right before it allows for the regex to look for a letter, number or underscore character. It is a handy substitute to the character set `[a-Z0-9_]`.

- caret sign `^`. By default, the regex will look for a match in any part of a string. Including the caret sign allows for the expression to look for matches which only begin with the prescribed pattern. `^[a-Z0-9_]{5}` will look for any word character repeated five times, at the beginning of a string.

- dollar sign `$`. Again by default, the regex will look for a match in a string, even if that string continues with additional characters. The inclusion of the dollar sign assures that the expression needs to end with the prescribed pattern. `[a-Z0-9_]{5}$` will look for any word character repeated five times, with no additional characters afterwards.

These constructs already allow to look for decent patterns in an input element. To test whether a match is present, the function `.test()` can be included in the JS script. This one is applied on the regular expression and accepts as argument the string(s) in which to look for a match.

```JS
const pattern = /hello/;
const missingPattern = /hallo/;
const fillerText = 'Sometimes I just feel like saying hello is already too much for you. I mean, how much does it cost. Five \w`;

pattern.test(fillerText); // returns true
missingPattern.test(fillerText); // returns false
```

Of course the example is for its own sake. The returning Boolean can be used alongside with a conditional statement to achieve something depending on whether or not a match is found.


## Event information

The functionality built with the regular expression requires 1) the pattern to look for and 2) the string(s) in which to look for a match. This second element is retrieved from an input element following a `keyup` event.

Information is retrieved from the event itself, which warrants a simple thought on the subject. With `console.log()` it is indeed possible to display the plethora of information which is returned when an event is triggered.

In the developer console, it is then possible to look for the particular event-related fields and values which are needed for a particular project. 

For the simple signup form, two of many values are used: `event.target.value`, `event.target.id`. The former described the actual text typed in the input element. The latter, returns the identifier of the element itself. These allow to retrieve the text on which the element is applied and retrieve the input element to be modified when a match is found, but they are predicated on the event itself. 

When in doubt, include the event as the parameter of the function and display the information connected to it.

```JS
function checkForRegex(event) {
  console.log(event);
}
```

You may end up with the exact information you need.
