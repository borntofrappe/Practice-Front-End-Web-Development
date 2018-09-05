Link to the working pen right [here](https://codepen.io/borntofrappe/full/EemEor).

## Topics

react, component, styled components, structured data

## Preface

Inspired by the way the British Broadcasting Corporation keeps track of [tennis live scores](https://www.bbc.com/sport/tennis/live-scores), this project sets out to practice with React while building a re-usable component to exactly keep track of live future matches.

Each subsection detailing the matches to be played in a particular court seem to be perfectly suited to be a React component. The goal would be to have a React component which receives relevant data (type of match, players, seed number) and renders different sections with the matches.

At a high level, the information which would differentiate the component relates to the following values:

- court name and time of the match
- match category (womens/mens singles/doubles) and match round (round 4, semi-final, final)
- player name, player seed (if existing, not required)
- player name, player seed for the second player as well.

Already these simple fields allow for quite the reusable component, describing tennis matches in any court and for any round of the tournament.

## Data

Starting from the data the component will eventually use, it is possible to structure pertinent information as follows.

```JS
const data = {
    field: 'arthur ashe stadium',
    time: '17:00',
    matches: [
        {
            type: 'womens singles',
            round: 'round 4',
            players: [
                {
                    name: 'keys',
                    seed: 14
                },
                {
                    name: 'cibulkova',
                    seed: 29
                }
            ]
        },
        {
            type: 'mens singles',
            round: 'round 4',
            players: [
                {
                    name: 'djokovic',
                    seed: 6
                },
                {
                    name: 'sousa'
                }
            ]
        },
        {
            type: 'womens singles',
            round: 'round 4',
            players: [
                {
                    name: 'suarez navarro',
                    seed: 30
                },
                {
                    name: 'sharapova',
                    seed: 22
                }
            ]
        },
        {
            type: 'mens singles',
            round: 'round 4',
            players: [
                {
                    name: 'millman'
                },
                {
                    name: 'federer',
                    seed: 2
                }
            ]
        }
    ]
};
```

_Please note_:

- this object relates to one court. `data` would eventually store an array of instances each detailing field, name and matches.

- the object analyses singles matches only. It'd be neat to expand the concept and contemplate doubles matches as well. That being said, and to get started, I'd like to consider the simplest use-case.

## Update

Starting from a working sample, I decided to expand the component to accept multiple tennis courts, each with their own sets of matches.

With a few tweaks, it is possible to display the multiple sets one after the other.

I also added a way to collapse the tennis matches per court, on a simple click.

## Design

- #F07B69 and #fff are two colors perfectly suited to describe tennis matches on sand surfaces. Even though the particular event held on a different surface, I'd still like to use the two hues. For a more intruiguing design, it'd be neat to have an additional field in the data describing the surface, and a different background depending on its value;

- #3F3E46 seems to complement the white and reddish hues and to be a solid choice for the text color.

- #E1E9D2 can be used as a slight variation on the white pick.

It'd be neat to have a background replicating the outline of a net, with a solid line above a grid of rotated ergular shapes.