import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import evolutions from "evolutions";
import pokedex from "./pokedex";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }
  handleEvolve = e => {
    e.preventDefault();
    console.log("evolve button clicked");
    let evo = this.state.searchInput;
    try {
      if (evolutions.exists(evo)) {
        if (pokedex.BattlePokedex[evo].hasOwnProperty("evos")) {
          while (pokedex.BattlePokedex[evo].hasOwnProperty("evos")) {
            evo = Object.values(pokedex.BattlePokedex[evo]["evos"]);
            console.log(evo);
          }
        } else {
          console.log(Object.entries(pokedex.BattlePokedex[evo]));
        }
      }
    } catch (e) {
      console.log("The error sent back: ", e);
      //Will setup a redirect here when the error is caught.
    }
  };
  render() {
    // console.log('trying exsist on moltres',evolutions.exists('moltres'))
    return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <form onSubmit={this.handleEvolve}>
            <div className="App-search_bar_container">
              <div className="App-search_bar">
                <input
                  type="search"
                  placeholder="Pokemon's name or ID"
                  onChange={e => this.setState({ searchInput: e.target.value })}
                  value={this.state.searchInput}
                />
              </div>
              <div className="App-search_bar_icon">
                <svg
                  style={{ width: 24 + "px", height: 24 + "px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000000"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </div>
              <br />
            </div>
            <input
              type="submit"
              value="Evolve!"
              name="evolveActionButton"
              className="App-button"
            />
          </form>
          <input
            type="submit"
            value="I'm Feeling Hype"
            name="randomActionButton"
            className="App-button"
          />
        </div>
      </div>
    );
  }
}

export default App;
