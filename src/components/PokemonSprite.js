import React from 'react';
import PropTypes from 'prop-types';
import PokeSprite from 'react-poke-sprites';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

const containerStyle = {
  textAlign: 'left',
  width: 300,
};

const colStyle = {
  float: 'left',
  width: '33%',
};

const rowStyle = {
  overflow: 'auto',
  height: '100%',
};

const Stats = ({ baseStats }) => (
  <React.Fragment>
    <div> Stats: </div>
    <div style={rowStyle}>
      <div style={colStyle}>Hp: {baseStats.hp} </div>
      <div style={colStyle}>Atk: {baseStats.atk} </div>
      <div style={colStyle}>Def: {baseStats.def} </div>
    </div>
    <div style={rowStyle}>
      <div style={colStyle}> Sp.Atk: {baseStats.spa} </div>
      <div style={colStyle}> Sp.Def: {baseStats.def} </div>
      <div style={colStyle}> Sp: {baseStats.spe} </div>
    </div>
  </React.Fragment>
);

const Info = ({ info }) => (
  <div style={containerStyle}>
    <div>
      [{info.num}] {info.species} ({info.types.join(', ')})
    </div>
    <div>
      Weight: {info.weightkg} kg, Height: {info.heightm} m
    </div>
    <div> Abilities: {Object.values(info.abilities).join(', ')} </div>
    <Stats baseStats={info.baseStats} />
  </div>
);

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

Stats.propTypes = {
  baseStats: PropTypes.object,
};

Info.propTypes = {
  info: PropTypes.object,
};

PokemonSprite.propTypes = {
  pokemon: PropTypes.string,
  info: PropTypes.object,
};

export default PokemonSprite;
