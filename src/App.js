import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spanish Practice</h2>
        </div>
      <Question content="Choose the right answer" />
     </div>
    );
  }
}

export default App;
