import React from 'react';
import PropTypes from 'prop-types';
import Stats from './Stats';
import '../../css/PokemonSprite.css';

const Info = ({ info }) => (
  <div className="PokemonSprite-container">
    <div> {`[#${info.num}] ${info.species} (${info.types.join(', ')})`} </div>
    <div>
      Weight: {info.weightkg} kg, Height: {info.heightm} m
    </div>
    <div> Abilities: {Object.values(info.abilities).join(', ')} </div>
    <Stats baseStats={info.baseStats} />
  </div>
);

Info.propTypes = {
  info: PropTypes.object,
};

export default Info;
