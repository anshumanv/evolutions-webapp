import React, {Component} from 'react';
import logo from '../logo.svg';
import UserInput from './UserInput';

class App extends Component {
	
	componentDidMount(){
		let interval = 1000;
		let frames = 10;
		let frameId = 1;

    		function refreshingBackground() {
    		  document.body.id = `b${frameId}`;
     			 frameId++;
     		 if (frameId === frames) {
        			frameId = 1;
      			}
    		}
    		const swap = window.setInterval(refreshingBackground, interval);
	}
	
	render() {
		return (
      <div className="App">
        <div className="App-main">
          <h1 className="App-title">
            Ev<img src={logo} className="App-logo" alt="logo" />lutions
          </h1>
          <UserInput />
        </div>
      </div>
		);
	}
}

export default App;
