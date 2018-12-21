# RSS Feed Fetching

Link to the proud (and live!) pen [right here](https://codepen.io/borntofrappe/full/vvxzyR)

## Preface

Following up with the UX slash UI created for the freeCodeCamp podcast application, I use the coding session to retrieving information from the RSS feed ultimately used in the larger project.

The feed in question:

```text
http://podcast.freecodecamp.org/rss
```

Good chance to flex with a couple of JavaScript methods and a new friend in `DOMParser`. I am still unsure as to target the `itunes` elements, outside of regular expressions, so while much is acquired, still much is left to discovery.

## Codepen Update

Codepen does not allow calls to unsecure sources, such as `http` URL. I tried out simply adding the secure `s` to the beginning of the URL and it just works.

Apparently, there exist a secure source for the RSS feed. In the page describing the [freeCodeCamp podcast](https://freecodecamp.libsyn.com/) however, the URL you find by inquiring about the RSS feed is the unsecure one. Something to perhaps correct on their end.

It just works:

```text
https://podcast.freecodecamp.org/rss
```
