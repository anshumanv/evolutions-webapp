import React, { Component } from 'react';
import logo from '../logo.svg';
import UserInput from './UserInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <UserInput />
        </div>
      </div>
    );
  }
}

export default App;
