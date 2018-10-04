import React from 'react';
import Autocomplete from 'react-autocomplete';
import SkyLight from 'react-skylight';
import PokeSprite from 'react-poke-sprites';
import { BattlePokedex, BattlePokedexKeys } from '../pokedex';
import Search from '../search';
import FeelingHype from './FeelingHype';
import searchLogo from '../search-logo.svg';

import '../css/App.css';

class UserInput extends React.Component {
  state = {
    searchInput: 'Pichu',
    result: '',
    pokemons: [],
    outputVisible: false,
    hasError: false,
  };

  constructor(props) {
    super(props);
    this.search = new Search(BattlePokedex);
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
      const pokemons = this.search.getInheritance(
        this.state.searchInput,
        this.lookup,
      );
      this.storePokemons(pokemons);
      this.simpleDialog.show();
      return pokemons.join(', ');
    } catch (error) {
      console.log('The error sent back: ', error);
      return error.message;
    }
  };

  handleEvolve = e => {
    e.preventDefault();
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
              <Autocomplete
                getItemValue={p => p}
                items={BattlePokedexKeys}
                ref={input => {
                  this.input = input;
                }}
                shouldItemRender={(item, value) =>
                  item.includes(value.toLowerCase())
                }
                renderItem={(pokemon, isHighlighted) => (
                  <div
                    key={pokemon}
                    style={{
                      background: isHighlighted ? 'lightgray' : 'white',
                      fontSize: '0.9rem',
                      padding: '.5rem',
                      borderBottom: '1px solid #ddd',
                      boxSizing: 'border-box',
                      textAlign: 'left',
                    }}
                  >
                    {pokemon}
                  </div>
                )}
                menuStyle={{
                  borderRadius: '0',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '2px 0',
                  fontSize: '90%',
                  position: 'fixed',
                  overflow: 'auto',
                  maxHeight: '50%',
                }}
                value={this.state.searchInput}
                onChange={this.handleChange}
                onSelect={value => this.setState({ searchInput: value })}
                name="searchInput"
                wrapperProps={{
                  style: {
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                  },
                }}
                inputProps={{
                  placeholder: "Pokemon's name or ID",
                  style: {
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    fontSize: '1rem',
                    border: 'none',
                    borderRight: '1px solid #ccc',
                    paddingLeft: '1rem',
                  },
                }}
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
          {this.state.pokemons.map((pokemon, index) => (
            <PokemonSprite
              pokemon={pokemon}
              info={BattlePokedex[pokemon]}
              key={BattlePokedex[pokemon].num + index}
            />
          ))}
        </SkyLight>
      </div>
    );
  }
}

export default UserInput;
