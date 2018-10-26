import React from 'react';
// import styled components
import styled from 'styled-components'

const Question = styled.h2`
  text-align: center;
  margin: 1rem 0 1.5rem;
  font-weight: 300;
  font-size: 1.4rem;
`;

// when hovering on the list items change the color of the special indicator as well as the background of the list item
const Answers = styled.ol`
  font-size: 1.2rem;
  line-height: 4;
  list-style: none;
  counter-reset: special-counter;

  li {
    margin-left: 2rem;
    padding-left: 1.5rem;
    counter-increment: special-counter;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:before {
    content: counter(special-counter);
    position: absolute;
    right: 100%;
    top: 50%;
    background: #252a37;
    color: #fff;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    transform: translateY(-50%);
    transition: all 0.2s ease-out;
    }
    &:hover:before {
      background: #252a3799;
    }
    &:hover {
      background: #252a3722;
    }
  }
`;

const AppQuestion = (props) => {
  /** information needed
   * question
   * answers 
   * 
   * additionally
   *  the function to show the answer for the connected question
   */ 
  const { question, answers } = props.data;
  const { showAnswer } = props;

  // create a series of list items, one for each possible option
  const choices = answers.map(answer => 
    <li 
      key={ answer.answer } 
      choice={ answer.choice }
      onClick={ showAnswer }>
        { answer.value }
    </li>
    );

  // render the question and the answers in an ordered list
  return (
    <div className="AppQuestion">
      <Question>{ question }</Question>
      <Answers>
        { choices }
      </Answers>
    </div>
  );
}

export default AppQuestion;
