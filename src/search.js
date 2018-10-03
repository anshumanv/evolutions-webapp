import { isNum, lower } from './helpers';

export default class Search {
  constructor(pokedex) {
    this.pokedex = pokedex;
    this.lookup = this.createLookup();
  }

  createLookup() {
    return Object.keys(this.pokedex).reduce(
      (accumulator, current) => ({
        ...accumulator,
        [this.pokedex[current].num]: this.pokedex[current],
      }),
      {},
    );
  }

  findById(id = -1) {
    return this.lookup[id];
  }

  getBasePokemon(input) {
    if (isNum(input)) {
      return this.findById(input);
    }

    return input in this.pokedex ? this.pokedex[input] : null;
  }

  findEvo(pokemonBase) {
    let pokemon = pokemonBase,
      pokemons = [];
    while (this.pokedex[pokemon] && 'evos' in this.pokedex[pokemon]) {
      pokemon = this.pokedex[pokemon].evos[0];
      pokemons.push(pokemon);
    }
    return pokemons;
  }

  findPrevo(pokemonBase) {
    let pokemon = pokemonBase,
      pokemons = [];
    while (this.pokedex[pokemon] && 'prevo' in this.pokedex[pokemon]) {
      pokemon = this.pokedex[pokemon].prevo;
      pokemons.push(pokemon);
    }
    return pokemons.reverse();
  }

  getInheritance(input = '') {
    if (!input) {
      throw new Error('Please type a pokemon name or ID');
    }

    const basePokemon = this.getBasePokemon(lower(input));
    const basePokemonKey = lower(basePokemon.species);

    if (!basePokemon) {
      throw new Error('No results obtained!');
    }

    return [
      ...this.findPrevo(basePokemonKey),
      basePokemonKey,
      ...this.findEvo(basePokemonKey),
    ];
  }
}
