import React, { Component } from 'react';
import './css/App.css';
// import components
import AppQuestion from './AppQuestion';
import AppAnswer from './AppAnswer';
import AppResult from './AppResult';
// import connect from react-redux (used at the bottom of the file)
import { connect } from 'react-redux';

// import styled components
import styled from 'styled-components'

const Counter = styled.h3`
  text-align: center;
  display: inline-block;
  font-family: "Lato", sans-serif;
  padding: 0.5rem 0;
  border-top: 0.2rem solid #252a37;
  border-bottom: 0.2rem solid #252a37;
  background: #fff;
`;


// manage the state of the application and render the components making up the same 
class App extends Component {
  constructor(props) {
    super(props);
    /*
    starting from the data and the values required in each component detail in the state:
      - counter, to keep track of the number of questions
      - correct, to keep track of the correct answers
      - isHidde, to alternatively show/hide the answer component
      - isCorrect, to detail an appropriate message
      - isFinished, to visualize the result when the last question is given
    */
    this.state = {
      counter: 0,
      correct: 0,
      isHidden: true,
      isCorrect: false,
      isFinished: false
    }
    // bind the functions to show the answer (as one is given) and move on to the next question
    this.showAnswer = this.showAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  showAnswer(e) {
    // from the selected element retrieve the answer as described in the choice attribute
    const {target} = e;
    const answer = parseInt(target.getAttribute('choice'));
    // retrieve the correct answer
    const correctanswer = this.props.data[this.state.counter].correctAnswer;
    // detail a boolean based on these last two 
    const isCorrect = (answer === correctanswer);
    // increment the correct variable in case the given answer was indeed correct
    const correct = (isCorrect) ? this.state.correct + 1 : this.state.correct;

    // set the boolean isHidden to false as to show the asnwer
    this.setState({
      correct,
      isCorrect,
      isHidden: false
    });
  }

  nextQuestion() {
    // retrieve the number of the current question and the total number of queries
    const counter = this.state.counter;
    const length = this.props.data.length;
    // depending on whether the application has reached the last question or not
    // set the boolean isFinished to true, to render the result component
    if(counter === length - 1) {
      this.setState({
        isFinished: true
      })
    }
    // increment the counter and hide the answer component
    else {
      this.setState({
        counter: this.state.counter + 1,
        isHidden: true
      })
    }
  }
  /*
  in the render function, display
  - a header with the current question being answered
  - a component for the question
  - a component for the answer (when one is given)

  - a component for the result (when all questions are answered)
  */
  render() {
    return (
      <div className="App">
        {
          !this.state.isFinished 
          ?
          <>
            <Counter>{this.state.counter + 1 }/{this.props.data.length}</Counter>
            <AppQuestion showAnswer={this.showAnswer} data={this.props.data[this.state.counter]}/>
            <AppAnswer isHidden={this.state.isHidden} isLast={this.state.counter !== this.props.data.length - 1} isCorrect={this.state.isCorrect} nextQuestion={this.nextQuestion} data={this.props.data[this.state.counter]}/>
          </>
          :
          <AppResult correct={this.state.correct} total={this.props.data.length}/>
        }
      </div>
    );
  }
}

// map the daa in the store to props
const mapStateToProps = state => ({
  // this means data is accessible under props.data
  data: state.data
});
// connect the application to the data in the store
export default connect(mapStateToProps)(App);
