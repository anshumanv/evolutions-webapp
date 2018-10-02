import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../../components/App';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders the title', () => {
    const component = shallow(<App />);
    expect(component.find('.App-title').length).toEqual(1);
  });
});
