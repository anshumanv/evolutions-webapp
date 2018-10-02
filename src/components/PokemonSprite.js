import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokeSprite from 'react-poke-sprites';
import { BattlePokedex } from '../pokedex';

export default class PokemonSprite extends Component {
  static propTypes = {
    pokemon: PropTypes.string,
  };

  state = {
    hover: false,
  };

  onMouseEnter = event => {
    this.setState({ hover: true });
  };

  onMouseLeave = event => {
    this.setState({ hover: false });
  };

  render() {
    const { pokemon } = this.props;
    const { hover } = this.state;
    return (
      <span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <PokeSprite pokemon={pokemon} className="pokemons" alt={pokemon} />
        {hover && <div>{`${BattlePokedex[pokemon]}`}</div>}
      </span>
    );
  }
}
