import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({ baseStats }) => (
  <React.Fragment>
    <div> Stats: </div>
    <div className="PokemonSprite-row">
      <div className="PokemonSprite-col">Hp: {baseStats.hp} </div>
      <div className="PokemonSprite-col">Atk: {baseStats.atk} </div>
      <div className="PokemonSprite-col">Def: {baseStats.def} </div>
    </div>
    <div className="PokemonSprite-row">
      <div className="PokemonSprite-col"> Sp.Atk: {baseStats.spa} </div>
      <div className="PokemonSprite-col"> Sp.Def: {baseStats.def} </div>
      <div className="PokemonSprite-col"> Sp: {baseStats.spe} </div>
    </div>
  </React.Fragment>
);

Stats.propTypes = {
  baseStats: PropTypes.object,
};

export default Stats;
