import React from 'react';
import { shallow } from 'enzyme';
import FeelingHype from '../../components/FeelingHype';

describe('FeelingHype component', () => {
  it('Triggers a function when the button is clicked', () => {
    const callback = jest.fn();
    const component = shallow(<FeelingHype onHypeClick={callback} />);

    component.find('.App-button').simulate('click');

    expect(callback).toHaveBeenCalled();
  });
});
