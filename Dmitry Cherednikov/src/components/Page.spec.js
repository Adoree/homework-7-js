import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Page from './Page';

const setup = () => {
  const props = {
    name: 'pidgey',
    id: 16,
    date: null,
    onBack: jest.fn(),
  };

  const output = shallow((
    <Page { ...props } />
  ));

  return {
    output,
    props,
  }
};

describe('<Page />', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(toJson(output)).toMatchSnapshot();
  });

  it('renders message if its not catched', () => {
    const { output } = setup();
    const message = 'Not yet catched';

    expect(output.find('p')).toHaveLength(1);
    expect(output.find('p').text()).toEqual(message);
  });

  it('renders message with date if its catched', () => {
    const { output } = setup();
    const date = '08.06.2016, 17:46:24';

    output.setProps({ date });

    expect(output.find('p')).toHaveLength(1);
    expect(output.find('p').text()).toEqual(date);
  });

  it('successfully calls the onClick handler', () => {
    const { output, props } = setup();
    const preventDefault = () => {};

    output.find('a').simulate('click', { preventDefault });
    expect(props.onBack.mock.calls.length).toEqual(1);
  })
});