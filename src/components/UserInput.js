import React from 'react';
import { getPokemonInheritance } from '../helpers';
import { BattlePokedex } from '../pokedex';
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
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState(
      {
        hasError: true,
        pokemons: [],
        searchInput: '',
        outputVisible: false,
      },
      () => {
        this.simpleDialog.show();
      },
    );
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
    try {
      const pokemons = getPokemonInheritance(this.state.searchInput);
      this.storePokemons(pokemons);
      this.simpleDialog.show();
      return pokemons.join(', ');
    } catch (error) {
      console.log('The error sent back: ', error);
      return error.message;
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
              <img
                src={searchLogo}
                style={{ margin: '10px', maxHeight: '24px' }}
                alt="Search!"
              />
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
          title="Evolutions"
        >
          <div>{this.state.result}</div>
          {this.state.pokemons.map((pokemon, index) => {
            return (
              <PokeSprite
                pokemon={pokemon}
                className="pokemons"
                alt={pokemon}
                key={BattlePokedex[pokemon].num + index}
              />
            );
          })}
        </SkyLight>
      </div>
    );
  }
}

export default UserInput;
