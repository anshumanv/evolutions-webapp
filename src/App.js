import React, { Component } from 'react';
import evolutions from 'evolutions';

import logo from './logo.svg';
import './App.css';
import pokedex from './pokedex';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      result: ''
    };
    this.handleEvolve = this.handleEvolve.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleEvolve(event) {
    event.preventDefault();

    let result = '';  // String that contains the final chain.
    let pokemon, temp;
    
    // Setting variables to the searchInput from app state.
    pokemon = temp = this.state.searchInput.toLowerCase();
    
    // Iterate and pick evolutions/pre-evolutions.
    try {
      // Pick evolutions
      if (evolutions.exists(pokemon)) {
        result = pokemon;
        if (pokedex.BattlePokedex[pokemon].hasOwnProperty('evos')) {
          while (pokedex.BattlePokedex[pokemon].hasOwnProperty('evos')) {
            console.log(pokedex.BattlePokedex[pokemon].evos);
            pokemon = pokedex.BattlePokedex[pokemon].evos[0];
            result += ` - ${pokemon}`;  // Appending to the result
          }
        }

        // Set it to the initially entered pokemon
        pokemon = temp;

        // Pick pre-evolutions
        if (pokedex.BattlePokedex[pokemon].hasOwnProperty('prevo')) {
          while (pokedex.BattlePokedex[pokemon].hasOwnProperty('prevo')) {
            pokemon = pokedex.BattlePokedex[pokemon].prevo;
            if(pokemon)console.log(pokedex.BattlePokedex[pokemon].prevo);
            result = `${pokemon} - ` + result;
          }
        }
        this.setState({ result });  // Store the result in app's state
      } else {  // Case when no pokemon matches the string in the searchInput
        result = "Pokemon doesn't exist";
        this.setState({ result });
      }

    } catch (error) {
      console.trace('The error sent back: ', error);
      // Will setup a redirect here when the error is caught.
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    // console.log('trying exsist on moltres',evolutions.exists('moltres'))
    return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <form onSubmit={this.handleEvolve}>
            <div className="App-search_bar_container">
              <div className="App-search_bar">
                <input
                  type="search"
                  name="searchInput"
                  placeholder="Pokemon's name or ID"
                  onChange={this.handleChange}
                />
              </div>
              <div className="App-search_bar_icon">
                <svg style={{ width: `${24}px`, height: `${24}px` }} viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </div>
              <br />
            </div>
            <button type="submit" className="App-button" name="evolveActionButton">
              Evolve
            </button>
          </form>
          <button type="submit" className="App-button" name="randomActionButton">
            I'm Feeling Hype
          </button>
          <div className="result">
            Result: {this.state.result}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
