import React from 'react';
import { shallow } from 'enzyme';
import UserInput from '../../components/UserInput';

describe('UserInput component', () => {
  it('Updates state when something is searched', () => {
    const component = shallow(<UserInput />);
    const event = { target: { value: 'Pikachu' } };

    component.find('.App-search_bar > input').simulate('change', event);

    expect(component.state().searchInput).toEqual('Pikachu');
  });

  it('Updates state with the correct evolutions for a pokemon', () => {
    const component = shallow(<UserInput />);

    component.setState({ searchInput: 'Pikachu' });
    const event = { preventDefault: jest.fn() };
    component.instance().simpleDialog = { show: jest.fn() };
    component.update();

    component.find('form').simulate('submit', event);

    expect(component.state()).toEqual({
      hasError: false,
      outputVisible: false,
      pokemon: 'Pikachu',
      pokemons: ['pichu', 'pikachu', 'raichu'],
      result: 'pichu, pikachu, raichu',
      searchInput: '',
    });
  });

  it('Handles pokemon ids', () => {
    const component = shallow(<UserInput />);

    component.setState({ searchInput: 1 });
    component.instance().simpleDialog = { show: jest.fn() };

    const result = component.instance().computeResult();

    expect(result).toEqual('bulbasaur, ivysaur, venusaur');
  });

  it('Can store pokemon', () => {
    const component = shallow(<UserInput />);

    component.instance().storePokemons(['pinsir']);

    expect(component.state().pokemons).toEqual(['pinsir']);
  });
});
