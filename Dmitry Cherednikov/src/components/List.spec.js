import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import List from './List';

const setup = () => {
  const props = {
    onClick: jest.fn(),
    list: [{
      name: 'bulbasaur',
      id: 1,
      date: '16.07.2018, 15:39:37',
    }, {
      name: 'ivysaur',
      id: 2,
      date: '18.07.2018, 17:46:24',
  }],
    isFetching: false,
    isFetchedAll: false,
  };

  const output = shallow((
    <List { ...props } />
  ));

  return {
    output,
    props,
  }
};

describe('<List />', () => {
  it('renders component', () => {
    const { output } = setup();

    expect(toJson(output)).toMatchSnapshot();
  });

  it('renders button with proper text if all data is not fetched', () => {
    const { output } = setup();

    expect(output.find('button')).toHaveLength(1);
    expect(output.find('button').text()).toBe('load');
  });

  it('button has different text if data is getting fetched', () => {
    const { output } = setup();
    output.setProps({ isFetching: true });

    expect(output.find('button').text()).toBe('loading...');
  });

  it('doesnt render button if all data is fetched', () => {
    const { output } = setup();
    output.setProps({ isFetchedAll: true });

    expect(output.find('button')).toHaveLength(0);
  });

  it('successfully calls the onClick handler', () => {
    const { output, props } = setup();

    output.find('button').simulate('click');
    expect(props.onClick.mock.calls.length).toBe(1);
  })
});