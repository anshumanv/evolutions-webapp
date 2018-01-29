import React, { Component } from 'react';
import logo from '../logo.svg';
import UserInput from './UserInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.run = this.run.bind(this);
  }

  run(interval, frames) {
    let int = 1;

    function func() {
      document.body.id = `b${int}`;
      int++;
      if (int === frames) {
        int = 1;
      }
    }
    const swap = window.setInterval(func, interval);
  }
  render() {
    return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <UserInput backgnd={this.run(1000, 10)} />
        </div>
      </div>
    );
  }
}

export default App;
