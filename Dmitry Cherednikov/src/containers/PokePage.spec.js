import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PokePage } from './PokePage.js';

const setup = () => {
  const props = {
    poke: {
      name: 'pidgey',
      id: 16,
      date: '18.07.2018, 17:46:24',
    },
    isFetching: false,
    fetchPokemon: jest.fn(),
  };

  const output = shallow((
    <PokePage { ...props } />
  ));

  return {
    output,
    props,
  }
};

describe('<PokePage />', () => {
  it('renders correctly', () => {
    const { output } = setup();

    expect(toJson(output)).toMatchSnapshot();
  });

  it('renders FetchError component when error occurs if we have no pokemon in props', () => {
    const { output } = setup();
    const errorMessage = 'Something went wrong';

    expect(output.find('FetchError')).toHaveLength(0);

    output.setProps({ poke: null, errorMessage });

    expect(output.find('FetchError')).toHaveLength(1);
  });

  it('renders special message if there is no pokemon found', () => {
    const { output } = setup();
    const message = 'No pokemon found :(';

    expect(output.find('p')).toHaveLength(0);

    output.setProps({ poke: null });

    expect(output.find('p')).toHaveLength(1);
    expect(output.find('p').text()).toEqual(message);
  });

  it('renders special message if we are fetching data', () => {
    const { output } = setup();
    const message = 'Fetching...';

    expect(output.find('p')).toHaveLength(0);

    output.setProps({ poke: null, isFetching: true });

    expect(output.find('p')).toHaveLength(1);
    expect(output.find('p').text()).toEqual(message);
  })
});