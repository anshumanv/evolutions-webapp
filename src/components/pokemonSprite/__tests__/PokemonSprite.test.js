import React from 'react';
import { shallow } from 'enzyme';
import PokemonSprite from '../PokemonSprite';

describe('PokemonSprite', () => {
  const getWrapper = () => shallow(<PokemonSprite />);
  it('renders', () => {
    expect(getWrapper()).toMatchSnapshot();
  });
});
