<!-- Link to the work-in-progress pen right [here](). -->

## Preface

For the weekly #codepenchallenge, I was inspired by a few sources, to create a React-powered, styled-components-flared straightforward application.

A simple application in which a button is used to send a request or otherwise try to connect to a server, before inevitably encountering a 500 error. An error chosen at random between the possible 500 error values, with a possible description of the mishap and a message of comfort.

Specifically, I was inspired by the following:

- a [LevelUpTuts video](https://www.youtube.com/watch?v=M24k18agaso), which was itself spurred by a tweet [@wesbos](https://twitter.com/wesbos/status/952935092774633472?lang=en), motivating me to create a button which changes in value/style as it is pressed;

- [good email copy](https://www.goodemailcopy.com/), motivating me to create a series of comforting, conversational messages supporting the user through the error message. A 500 error seems to be a mistake out of the users' reach, and it is a perfect situation in which a bit of empathy and sympathy do certainly some good;

- Server error responses as described on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Server_error_responses), specifically 500 status codes.