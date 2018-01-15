import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import pokemonGif from 'pokemon-gif';
import logo from '../logo.svg';
import UserInput from './UserInput';
import FeelingHype from './FeelingHype';

class App extends Component {

  constructor(props){
    super(props);
  }
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
