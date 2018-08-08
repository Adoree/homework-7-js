import reducer from './index';
import * as actionTypes from '../constants';

const initialState = {
  isFetching: false,
  isCatching: false,
  error: null,
  pokemons: {},
  page: 1,
  catched: {},
  catchedPage: 1,
  fetchedAllPokemons: false,
  fetchedAllCatched: false,
};

describe('pokedex reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_POKEMONS action', () => {
    expect(reducer(initialState, {
      type: actionTypes.REQUEST_POKEMONS,
    })).toEqual({
      ...initialState,
      isFetching: true,
    })
  });

  it('should handle FETCH_POKEMONS_SUCCESS action', () => {
    const data = {
      '1': {
        name: 'bulbasaur',
        id: '1',
        date: null,
      },
      '2': {
        name: 'ivysaur',
        id: '2',
        date: '15.07.2018, 15:46:37',
      }
    };

    expect(reducer(initialState, {
      type: actionTypes.FETCH_POKEMONS_SUCCESS,
      payload: {
        data
      }
    })).toEqual({
      ...initialState,
      pokemons: {
        ...data
      },
      page: initialState.page + 1,
      isFetching: false,
    })
  });

  it('should handle FETCH_POKEMONS_FAILURE action', () => {

  })
});