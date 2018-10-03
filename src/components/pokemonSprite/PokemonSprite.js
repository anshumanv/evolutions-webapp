import React from 'react';
import PropTypes from 'prop-types';
import PokeSprite from 'react-poke-sprites';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Info from './Info';

const PokemonSprite = ({ pokemon, info }) => (
  <Tooltip
    arrow
    interactive
    position="bottom"
    arrowSize="big"
    html={<Info info={info} />}
  >
    <PokeSprite pokemon={pokemon} className="pokemons" alt={pokemon} />
  </Tooltip>
);

PokemonSprite.propTypes = {
  pokemon: PropTypes.string,
  info: PropTypes.object,
};

export default PokemonSprite;
