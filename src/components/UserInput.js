import React from 'react';
import { lower, isNum } from  '../helpers';
import pokedex from '../pokedex';
import SkyLight from 'react-skylight';
import pokemonGif from 'pokemon-gif';
import '../css/App.css';
import FeelingHype from './FeelingHype';

class UserInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchInput: 'Pichu',
            result: '',
            pokemons: [],
            outputVisible: false
        };

        this.handleEvolve = this.handleEvolve.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.computeResult = this.computeResult.bind(this);
        this.handlingHypeClick = this.handlingHypeClick.bind(this);
    }

    storePokemons(pokemons) {
        this.setState({pokemons});
    }

    handlingHypeClick(searchInputValue) {
        this.setState({searchInput : searchInputValue});
        this.setState({result : this.computeResult(this.state.searchInput)});
    }

    computeResult() {
        let result = '';  // String that contains the final chain.
        let pokemon, temp;
        let pokemons = [];

        // Setting variables to the searchInput from app state.
        pokemon = temp = lower(this.state.searchInput);
        if(isNum(pokemon)) {
            let pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon-1];

            while( (pokedex.BattlePokedex[pokemon_it]) && (pokedex.BattlePokedex[pokemon_it].num !== parseInt(temp, 10))) {
                pokemon_it = Object.keys(pokedex.BattlePokedex)[pokemon++];
            }
            pokemon = temp = pokemon_it;
        }

        // Iterate and pick evolutions/pre-evolutions.
        try {
            if (pokedex.BattlePokedex.hasOwnProperty(pokemon)) {
                // Pick pre-evolutions
                while (pokedex.BattlePokedex[pokemon].hasOwnProperty('prevo')) {
                    pokemon = pokedex.BattlePokedex[pokemon].prevo;
                    pokemons.push(pokemon);
                    result = `${pokemon} - ` + result;//  '$' ??
                }
                console.log(pokemons);
                pokemons.reverse();

                // Set it to the initially entered pokemon
                pokemon = temp;

                // Appending originally entered pokemon
                result += pokemon;
                pokemons.push(pokemon);
                console.log(pokemons);
                // Pick evolutions
                while (pokedex.BattlePokedex[pokemon].hasOwnProperty('evos')) {
                    pokemon = pokedex.BattlePokedex[pokemon].evos[0];
                    pokemons.push(pokemon);
                    result += ` - ${pokemon}`;  // Appending to the result
                }
            } else {  // Case when no pokemon matches the string in the searchInput
                result = "No results obtained!";
            }
            this.storePokemons(pokemons);
            this.simpleDialog.show();
            return result;
        } catch (error) {
            console.log('The error sent back: ', error);
        }
    }

        handleEvolve(event) {
            event.preventDefault();
            this.setState({ result: this.computeResult(this.state.searchInput), pokemon: this.state.searchInput, searchInput: ''});
        }

        handleChange(event) {
            this.setState({ [event.target.name]: event.target.value });
        }

        render () {
        return(
            <div className="App">
                <div className="App-main">
                    <form onSubmit={this.handleEvolve}>
                        <div className="App-search_bar_container">
                            <div className="App-search_bar">
                                <input
                                    type="search"
                                    name="searchInput"
                                    ref={(input)=>{this.nameInput=input;}}
                                    placeholder="Pokemon's name or ID"
                                    onChange={this.handleChange}
                                    value={this.state.searchInput}
                                />
                            </div>
                            <div className="App-search_bar_icon" onClick={this.handleEvolve}>
                                <svg style={{ width: `${24}px`, height: `${24}px` }} viewBox="0 0 24 24">
                                    <path
                                        fill="#000000"
                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                    />
                                </svg>
                            </div>
                            <br />
                        </div>
                        <button type="submit" className="App-button" name="evolveActionButton">
                            Evolve
                        </button>
                    </form>
                    <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Result">
                        <div>{this.state.result}</div>
                        {this.state.pokemons.map( pokemon => {
                            return <img src={pokemonGif(pokemon)} className="pokemons" alt="" key={pokedex.BattlePokedex[pokemon].num} />
                        })}
                    </SkyLight>
                    <FeelingHype onHypeClick={this.handlingHypeClick}/>
                </div>
            </div>
        )
    }
}

export default UserInput;
