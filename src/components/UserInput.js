import React from 'react';
import { lower, isNum } from '../helpers';
import pokedex from '../pokedex';
import SkyLight from 'react-skylight';
import FeelingHype from './FeelingHype';
import PokeSprite from 'react-poke-sprites';

import '../css/App.css';
import searchLogo from '../search-logo.svg';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'Pichu',
      result: '',
      pokemons: [],
      outputVisible: false,
    };
  }

  storePokemons = pokemons => {
    this.setState({ pokemons });
  };

  handlingHypeClick = searchInputValue => {
    this.setState({ searchInput: searchInputValue }, () => {
      this.setState({ result: this.computeResult(this.state.searchInput) });
    });
  };

  computeResult = () => {
    let result = ''; // String that contains the final chain.
    let pokemon, temp;
    const pokemons = [];

    // Setting variables to the searchInput from app state.
    pokemon = temp = lower(this.state.searchInput);
    if (isNum(pokemon)) {
      let pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon - 1];
      while (
        pokedex.BattlePokedex[pokemon_it] &&
        pokedex.BattlePokedex[pokemon_it].num !== parseInt(temp, 10)
      ) {
        pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon++];
      }
      pokemon = temp = pokemon_it;
    }

    // Iterate and pick evolutions/pre-evolutions.
    try {
      if (pokedex.BattlePokedex.hasOwnProperty(pokemon)) {
        // Pick pre-evolutions
        while (pokedex.BattlePokedex[pokemon].hasOwnProperty('prevo')) {
          pokemon = pokedex.BattlePokedex[pokemon].prevo;
          pokemons.push(pokemon);
          result = `${pokemon} - ` + result; //  '$' ??
        }
        pokemons.reverse();

        // Set it to the initially entered pokemon
        pokemon = temp;

        // Appending originally entered pokemon
        result += pokemon;
        pokemons.push(pokemon);
        // Pick evolutions
        while (pokedex.BattlePokedex[pokemon].hasOwnProperty('evos')) {
          pokemon = pokedex.BattlePokedex[pokemon].evos[0];
          pokemons.push(pokemon);
          result += ` - ${pokemon}`; // Appending to the result
        }
      } else {
        // Case when no pokemon matches the string in the searchInput
        result = 'No results obtained!';
      }
      this.storePokemons(pokemons);
      this.simpleDialog.show();
      return result;
    } catch (error) {
      console.log('The error sent back: ', error);
    }
  };

  handleEvolve = event => {
    event.preventDefault();
    this.setState({
      result: this.computeResult(this.state.searchInput),
      pokemon: this.state.searchInput,
      searchInput: '',
    });
  };

  handleChange = e => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleEvolve}>
          <div className="App-search_bar_container">
            <div className="App-search_bar">
              <input
                type="search"
                name="searchInput"
                ref={input => (this.nameInput = input)}
                placeholder="Pokemon's name or ID"
                onChange={this.handleChange}
                value={this.state.searchInput}
              />
            </div>
            <div className="App-search_bar_icon" onClick={this.handleEvolve}>
              <img src={searchLogo} style={{ margin: '10px' }} alt="Search!" />
            </div>
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="App-button"
              name="evolveActionButton"
            >
              Evolve
            </button>
            <FeelingHype onHypeClick={this.handlingHypeClick} />
          </div>
        </form>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Result"
        >
          <div>{this.state.result}</div>
          {this.state.pokemons.map(pokemon => {
            return (
              <PokeSprite
                pokemon={pokemon}
                className="pokemons"
                alt={pokemon}
                key={pokedex.BattlePokedex[pokemon].num}
              />
            );
          })}
        </SkyLight>
      </div>
    );
  }
}

export default UserInput;
