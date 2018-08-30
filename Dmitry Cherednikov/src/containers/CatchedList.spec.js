import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CatchedList } from './CatchedList';

const data = [
  {name: "bulbasaur", id: 1, date: "15.07.2018, 16:28:48"},
  {name: "ivysaur", id: 2, date: "15.07.2018, 15:46:37"},
  {name: "venusaur", id: 3, date: "15.07.2018, 16:28:48"},
  {name: "charmander", id: 4, date: "15.07.2018, 16:28:49"},
  {name: "charmeleon", id: 5, date: "15.07.2018, 16:28:50"},
  {name: "charizard", id: 6, date: "15.07.2018, 16:28:49"},
  {name: "squirtle", id: 7, date: "15.07.2018, 17:56:21"},
  {name: "wartortle", id: 8, date: "15.07.2018, 17:56:20"},
  {name: "blastoise", id: 9, date: "15.07.2018, 17:56:23"},
  {name: "butterfree", id: 12, date: "15.07.2018, 17:57:45"},
];

const setup = () => {
  const props = {
    list: data,
    error: null,
    fetchedAllCatched: false,
    isFetching: false,
    catchedPage: 1,
    fetchCatchedPokemons: jest.fn(),
  };

  const output = shallow((
    <CatchedList { ...props } />
  ));

  return {
    output,
    props,
  }
};

describe('<CatchedList />', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(toJson(output)).toMatchSnapshot();
  });

  it('should render FetchError if there is an error and we have no pokemons', () => {
    const { output } = setup();
    const errorMessage = 'Something went wrong';

    expect(output.find('FetchError')).toHaveLength(0);
    output.setProps({ list: [], errorMessage });
    expect(output.find('FetchError')).toHaveLength(1);
  });

  it('should render special message if list is empty', () => {
    const { output } = setup();
    const message = 'There are no catched pokemons';

    expect(output.find('p')).toHaveLength(0);

    output.setProps({ list: [] });

    expect(output.find('p')).toHaveLength(1);
    expect(output.find('p').text()).toEqual(message);
  });
});