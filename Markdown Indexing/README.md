Link to the working pen right [here](https://codepen.io/borntofrappe/full/jKNePz/).

# Preface 

This project is the result of a personal necessity, when I stared at 2000+ lines of notes written in markdown and I trembled at the prospect of writing an index for the large file.

The tediousness of the process is palpable:
- scroll through the text
- find a header
- write a reference to said header
    - include the text of the header in [square brackets]
    - include the same text, without spaces and in lower case, within (braces)
- repeat until the end of the file

I managed to go through the process for a couple of headers, but soon realized how the incredibly dull activity was primed for automation.

So I stopped, and I jumped into a new project to solve this nagging problem. The outcome: a page which takes markdown syntax as input and outputs an index, for all headers in the markup itself.

The project is built in versions, one step at a time.

# Versions

- [x] include a `<textarea>` element in which to include the markdown syntax (at a later stage, it'd be neat to import markdown files instead)
- [x] at the click of a button, consider the text present in the `<textarea>`
- [x] include the value of the textarea in an element below the button (this is where the index will be presented as output)
- [x] write a regex which looks for headers (in the form of '# text'). Start with one pound sign # followed by a single word.
- [x] write a function which converts each header to a reference-able header. In the form of a hyphen - followed by [square brackets] with the text of the header followed by (braces) with a reference to the header. This last one in the form of the pound sign # followed by the name of the header, in lower case.
- [x] issue #1: multiple headers. Consider the possibility (always with a single-word header) that there might be more than a consecutive pound sign #
- [x] issue #2: indentation of the index. Headers should be indented based on their importance. For instance, a header with two pound signs ## should be one indented one tab in respect to a header with one pound sign #. One additional tab \t should be applied to each consecutive sub-header.
- [x] issue #3: headers with multiple words. As much I'd like to believe, especially for the ease of the project, headers can have more than a word. It is therefore necessary to 1) change the regex to account for headers composed of more than a single word, 1) alter the reference to the headers by removing spaces and separating the words with hyphen signs -.
- [ ] emerging issue #1: the entire thing works, but if there is a pound sign # mid-sentence, that too will be considered the beginning of a header. Any word following that pound sign # will be considered the text of the header itself (until a carriage return or other special character is met). You need to consider a header when a pound sign is preceded by a new line \n, by not a word \w.
- [ ] emerging issue #2: spacial characters in the header. If there are characters other than \w word characters in the header, they are not picked up by the regex. Be it an apostrophe, a backtick, an asterisk. For a future version a discussion on the regex is warranted.

What is a header after all? Perhaps just two new line characters separated by a pound sign and whatever comes next.

```JS
let maybe = /\n #[^\n]*\n/g;
```

Maybe the simple project will be spun out into a full-fledged application. For the time being, it accomplishes the task it was set out to realize. 2000+ lines of notes conveniently indexed with a couple of clicks.
