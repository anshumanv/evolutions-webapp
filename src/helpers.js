import { BattlePokedex, BattlePokedexList } from './pokedex';

// A helper function that converts to lowercase and trims whitespaces.
export function lower(str) {
  if (str !== '') {
    return str
      .toString()
      .toLowerCase()
      .match(/[^_\s\W]+/g)
      .join('');
  }
}

export function isNum(val) {
  return /^\d+$/.test(val);
}

export function findPokemonById(id = -1) {
  return BattlePokedexList.find(pokemon => pokemon.num === Number(id));
}

function getBasePokemon(input) {
  if (isNum(input)) {
    return findPokemonById(input);
  }

  return BattlePokedex.hasOwnProperty(input) ? BattlePokedex[input] : null;
}

function findPrevo(pokemonBase) {
  let pokemon = pokemonBase,
    pokemons = [];
  while (
    BattlePokedex[pokemon] &&
    BattlePokedex[pokemon].hasOwnProperty('prevo')
  ) {
    pokemon = BattlePokedex[pokemon].prevo;
    pokemons.push(pokemon);
  }
  return pokemons.reverse();
}

function findEvo(pokemonBase) {
  let pokemon = pokemonBase,
    pokemons = [];
  while (
    BattlePokedex[pokemon] &&
    BattlePokedex[pokemon].hasOwnProperty('evos')
  ) {
    pokemon = BattlePokedex[pokemon].evos[0];
    pokemons.push(pokemon);
  }
  return pokemons;
}
/*
function findOtherFormes(pokemonMaxEvo) {
  const pokemon = BattlePokedex[pokemonMaxEvo];
  if (!pokemon) {
    return [];
  }

  if (pokemon.hasOwnProperty('otherFormes')) {
    return pokemon.otherFormes;
  }

  return [];
}*/

export function getPokemonInheritance(input = '') {
  if (!input) {
    throw new Error('Please type a pokemon name or ID');
  }

  const basePokemon = getBasePokemon(lower(input));
  const basePokemonKey = lower(basePokemon.species);

  if (!basePokemon) {
    throw new Error('No results obtained!');
  }

  return [
    ...findPrevo(basePokemonKey),
    basePokemonKey,
    ...findEvo(basePokemonKey),
  ];

  // Other formes like mega evolutions are not available in pokemon gif
  // send pr to pokemon gif adding another url
  // const otherFormes = findOtherFormes(inheritance[inheritance.length - 1]);

  // return [...inheritance, ...otherFormes];
}
