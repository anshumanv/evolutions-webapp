import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <form>
            <div className="App-search_bar_container">
              <div className="App-search_bar">
                <input type="search" placeholder="Pokemon's name or ID" />
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
            <input
              type="submit"
              value="I'm Feeling Hype"
              name="randomActionButton"
              className="App-button"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
