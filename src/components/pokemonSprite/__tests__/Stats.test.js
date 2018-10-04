import React from 'react';
import { shallow } from 'enzyme';
import Stats from '../Stats';

describe('Stats component', () => {
  it('renders', () => {
    const sampleData = {
      baseStats: {
        hp: 35,
        atk: 55,
        def: 40,
        spa: 50,
        spd: 40,
        sp: 90,
      },
    };
    const component = shallow(<Stats baseStats={sampleData} />);
    expect(component).toMatchSnapshot();
  });
});
