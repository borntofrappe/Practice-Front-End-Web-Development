<!-- Link to the working pen right [here](). -->

## Topics

react, component, proptypes, styled components, structured data

## Preface

Inspired by the way the British Broadcasting Corporation keeps track of [tennis live scores](https://www.bbc.com/sport/tennis/live-scores), this project sets out to practice with React while building a re-usable component to exactly keep track of live future matches.

Each subsection detailing the matches to be played in a particular court seem to be perfectly suited to be a React component. The goal would be to have a React component which receives relevant data (type of match, players, seed number) and renders different sections with the matches.

At a high level, the information which would differentiate the component relates to the following values:

- court name and time of the match
- match category (womens/mens singles/doubles) and match round (round 4, semi-final, final)
- player name, player seed (if existing, not required)
- player name, player seed for the second player as well.

Already these simple fields allow for quite the reusable component, describing tennis matches in any court and for any round of the tournament.

