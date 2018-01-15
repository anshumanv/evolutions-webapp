import React from 'react';

import pokedex from '../pokedex';

class FeelingHype extends React.Component{

    constructor(props){
        super(props);
        //this.state = {searchInput:'Pichu'};
        this.handleHypeClick = this.handleHypeClick.bind(this);
        this.randomProperty = this.randomProperty.bind(this);
    }

    randomProperty(obj) {
        let keys = Object.keys(obj)
        return keys[ keys.length * Math.random() << 0];
    };

    handleHypeClick(event) {
        let searchInput = this.randomProperty(pokedex.BattlePokedex);
        this.setState({ searchInput });
        //this.setState({ result: this.computeResult(this.state.searchInput)});
        this.props.onHypeClick(searchInput);
    }

    render () {
        return(
            <div>
                <button type="submit" className="App-button" name="randomActionButton" onClick={this.handleHypeClick}>
                    <div>I'm Feeling Hype</div>
                </button>
            </div>
        )
    }
}

export default FeelingHype;