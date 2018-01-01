import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import logo from '../logo.svg';
import '../css/App.css';
import pokedex from '../pokedex';
import { lower, isNum } from  '../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      result: '',
      outputVisible: false
    };
    this.handleEvolve = this.handleEvolve.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.randomProperty = this.randomProperty.bind(this);
    this.handleHypeClick = this.handleHypeClick.bind(this);
    this.computeResult = this.computeResult.bind(this);
  }

  // A function to return random key
  randomProperty(obj) {
    let keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
  };

  handleHypeClick(event) {
    let searchInput = this.randomProperty(pokedex.BattlePokedex);
    this.setState({ searchInput });
    this.setState({ result: this.computeResult(this.state.searchInput)});
  }

  computeResult() {
    let result = '';  // String that contains the final chain.
    let pokemon, temp;
    
    // Setting variables to the searchInput from app state.
    pokemon = temp = lower(this.state.searchInput);
    if(isNum(pokemon)) {
      let pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon];

      while(pokedex.BattlePokedex[pokemon_it] && pokedex.BattlePokedex[pokemon_it].num !== parseInt(temp)) {
        pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon++];
      }
      pokemon = temp = pokemon_it;
    }
    // Iterate and pick evolutions/pre-evolutions.
    try {
      // Pick evolutions
      if (pokedex.BattlePokedex.hasOwnProperty(pokemon)) {
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
      } else {  // Case when no pokemon matches the string in the searchInput
        result = "No results obtained!";
      }
      this.simpleDialog.show();
      return result;
    } catch (error) {
      console.trace('The error sent back: ', error);
      // Will setup a redirect here when the error is caught.
    }

  }

  handleEvolve(event) {
    event.preventDefault();
    this.setState({ result: this.computeResult(this.state.searchInput)});
    this.setState({ searchInput: ''});
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
                  value={this.state.searchInput}
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
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Result">
            {this.state.result}
          </SkyLight>
          <button type="submit" className="App-button" name="randomActionButton" onClick={this.handleHypeClick}>
            I'm Feeling Hype
          </button>
          {//<div className="result">
            //Result: {this.state.result}
          //</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
