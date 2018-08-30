import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pokedex from './Pokedex';

describe('<Pokedex />', () => {
  it('should render correctly', () => {
    const output = shallow((
      <Pokedex />
    ));

    expect(toJson(output)).toMatchSnapshot();
  })
});