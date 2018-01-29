import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import AnswerOption from './components/AnswerOption';
import update from 'react-addons-update';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answeCount: {
        nintendo: 0,
        microsoft: 0,
        sony: 0
      },
      result: '',
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  //It will randomize the process
  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    //While there are elements to shuffle...
    while (0 !== currentIndex) {
      //Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      //And swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  setUserAnswer(answer) {
   const updatedAnswersCount = update(this.state.answersCount, {
     [answer]: {$apply: (currentValue) => currentValue + 1}
   });
   this.setState({
     answersCount: updatedAnswersCount,
     answer: answer
   });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        // do nothing for now
      }
  }
  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Spanish Practice</h2>
        </div>
      <Question content="Choose the right answer" />

     <Quiz
      answer={this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId={this.state.questionId}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
     />
    </div>
    );
  }
}

export default App;
