import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MainContent from './MainContent';

describe('<MainContent />', () => {
  it('should render correctly', () => {
    const wrapper = shallow((
      <MainContent />
    ));

    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
