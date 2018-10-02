import React from 'react';
import PropTypes from 'prop-types';

import { BattlePokedex } from '../pokedex';

class FeelingHype extends React.Component {
  state = {
    searchInput: undefined,
  };

  randomProperty = obj => {
    const keys = Object.keys(obj);
    return keys[(keys.length * Math.random()) << 0];
  };

  handleHypeClick = event => {
    const searchInput = this.randomProperty(BattlePokedex);
    this.setState({ searchInput });
    this.props.onHypeClick(searchInput);
  };

  render() {
    return (
      <div>
        <button
          type="submit"
          className="App-button"
          name="randomActionButton"
          onClick={this.handleHypeClick}
        >
          <div>I&lsquo;m Feeling Hype</div>
        </button>
      </div>
    );
  }
}

FeelingHype.propTypes = {
  onHypeClick: PropTypes.func,
};

export default FeelingHype;
