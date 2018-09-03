import React, { Component } from 'react';
import './css/CourtMatches.css';
import styled from 'styled-components';

// style the elements used in the stateful component

// style the heading describing the court and time with a darker background and uppercase text
const MatchesHead = styled.dt`
    text-transform: uppercase;
    font-weight: 300;
    background: var(--color-lines-d);
    padding: 0.5rem 1rem;
`;

// style the heading describing the match type to be centered and lighter in tone
const MatchHead = styled.h2`
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.1rem;
`;

// style the paragraph elements describing the players to have a border
const MatchDetail = styled.p`
    border: 1px solid rgba(0,0,0,0.2);
    padding: 0.2rem 1.25rem;

    // remove the border-bottom for the first paragraph (removing double borders)
    // include through a pseudo element a letter to describe the nature of the match (player v player)
    &:nth-of-type(1) {
        border-bottom: none;
        position: relative;
    }
    &:nth-of-type(1):before {
        content: 'V';
        position: absolute;
        top: calc(100% - 20px/2);
        left: calc(50% - 20px/2);
        width: 20px;
        height: 20px;
        // center the letter
        line-height: 20px;
        text-align: center;
        color: var(--color-lines-d);
        font-weight: bold;
        background: var(--color-text);

        // move the pseudo element toward the right end on smaller viewports
        @media (max-width: 700px) {
            left: calc(75% - 20px/2);
        }
    }
`;

// style the span for the name to be boldly displayed in the page
const DetailName = styled.span`
    text-transform: uppercase;
    font-weight: 700;
    padding: 0 0.25rem;
`;

class CourtMatches extends Component {
    constructor(props) {
        super(props);
        // bind the method to toggle the details of the matches in a court
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // toggle the class of .hidden on the dd element connected to the dt element
        e.target.parentNode.querySelector("dd").classList.toggle("hidden");
    }


    render() {
        // retrieve the fields of the object describing the tennis court
        const { field, time, matches } = this.props.matches;

        // loop through the array of matches (there exist more match for each court)
        // render an article for each
        const MatchesDetails = matches.map((match, index) => {
            return(
                <article key={index}>
                    {/* in the article render a heading describing the nature of the match */}
                    <MatchHead>{match.type} {match.round}</MatchHead>
                    {/* continue with a div describing the details of the match */}
                    <div className="ArticleBody">
                        {
                            // include through styled components a paragraph for each tennis player
                            // include also a seed, but separate from the span emphasising the name

                            // ! if there are two players
                            (match.players.length === 2) &&

                            match.players.map((player, index) => {
                                let name = player.name;
                                let seed = (player.seed) ? `(${player.seed})` : '';
                                return(
                                    <MatchDetail key={index}>
                                        <DetailName>
                                            {name}
                                        </DetailName>
                                        {seed}
                                    </MatchDetail>
                                );
                            })
                        }
                        {
                            // ! if there are four players (for doubles)
                            // ! for now, the fix is pretty repetitive and prime for improvement
                            (match.players.length === 4) &&

                            // wrap two paragraphs detailing each two players in a fragment
                            <React.Fragment>
                                <MatchDetail>
                                    <DetailName>
                                        {match.players[0].name}
                                    </DetailName>
                                    {match.players[0].seed}
                                    <br/>
                                    <DetailName>
                                        {match.players[1].name}
                                    </DetailName>
                                    {match.players[1].seed}
                                </MatchDetail>

                                <MatchDetail>
                                    <DetailName>
                                        {match.players[2].name}
                                    </DetailName>
                                    {match.players[2].seed}
                                    <br/>
                                    <DetailName>
                                        {match.players[3].name}
                                    </DetailName>
                                    {match.players[3].seed}
                                </MatchDetail>
                            </React.Fragment>
                        }
                    </div>
                </article>
            );
        });

        return(
            /*
            render in a wrapping dl include in a dt element the court and time
            follow up these introductory elements with a dd element wrapping one article per tennis match
            */
            <dl className="CourtMatches">
                    <MatchesHead onClick={this.handleClick}>{field} - {time}</MatchesHead>
                    <dd>
                        {
                            MatchesDetails
                        }
                    </dd>
            </dl>
        );
    }
};


export default CourtMatches;