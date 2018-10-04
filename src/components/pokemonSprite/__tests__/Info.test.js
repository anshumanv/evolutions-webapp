import React from 'react';
import { shallow } from 'enzyme';
import Info from '../Info';

describe('Info component', () => {
  it('renders', () => {
    const sampleData = {
      species: 'pikachu',
      num: 25,
      types: ['Electric'],
      weight: 6,
      heightm: 0.4,
      abilities: ['Static', 'Lightning Rod'],
    };
    const component = shallow(<Info info={sampleData} />);
    expect(component).toMatchSnapshot();
  });
});
