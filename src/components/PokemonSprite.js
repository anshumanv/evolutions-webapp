import React from 'react';
import PropTypes from 'prop-types';
import PokeSprite from 'react-poke-sprites';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

const Info = ({ info }) => {
  return (
    <React.Fragment>
      <div>name: {info.species} </div>
      <div>color: {info.color} </div>
      <div>weight: {info.weightkg} </div>
      <div>baseStats: {JSON.stringify(info.baseStats)} </div>
    </React.Fragment>
  );
};

const PokemonSprite = ({ pokemon, info }) => (
  <Tooltip html={<Info info={info} />} position="bottom">
    <PokeSprite pokemon={pokemon} className="pokemons" alt={pokemon} />
  </Tooltip>
);

Info.propTypes = {
  info: PropTypes.object,
};

PokemonSprite.propTypes = {
  pokemon: PropTypes.string,
  info: PropTypes.object,
};

export default PokemonSprite;
