import React, {Component} from 'react';
import logo from '../logo.svg';
import UserInput from './UserInput';
import '../css/index.css';

class App extends Component {
	
	componentDidMount(){
		var imageArray = [
            'http://hdfreewallpaper.net/wp-content/uploads/2016/08/Pokemon-hd-Wallpaper-sumsung-download.jpg',
            'https://wallpapercave.com/wp/Qf9SNmS.png',
            'https://images3.alphacoders.com/273/273289.jpg',
            'https://images4.alphacoders.com/574/thumb-1920-574726.jpg'
		],
			currentIndex = 0,
			Duration = 2000;

			function refreshingBackground()
			{
				document.body.style.backgroundImage = `url(${imageArray[currentIndex]})`
				currentIndex++;
				if(currentIndex===imageArray.length){currentIndex=0;}
				setTimeout(refreshingBackground,Duration);
			}

			refreshingBackground();

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
