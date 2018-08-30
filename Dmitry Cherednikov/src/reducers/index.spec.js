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
  describe('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('should handle actions for all pokemons', () => {
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
          ...initialState.pokemons,
          ...data,
        },
        page: initialState.page + 1,
      })
    });

    it('should handle FETCH_POKEMONS_FAILURE action', () => {
      const error = 'Something went wrong';

      expect(reducer(initialState, {
        type: actionTypes.FETCH_POKEMONS_FAILURE,
        payload: {
          error,
        }
      })).toEqual({
        ...initialState,
        error,
      });
    });
  });

  describe('should handle actions for catched pokemons', () => {
    it('should handle REQUEST_CATCHED_POKEMONS action', () => {
      expect(reducer(initialState, {
        type: actionTypes.REQUEST_CATCHED_POKEMONS,
      })).toEqual({
        ...initialState,
        isFetching: true,
      })
    });

    it('should handle FETCH_CATCHED_SUCCESS action', () => {
      const data = {
        '1': {
          name: 'bulbasaur',
          id: '1',
          date: '16.07.2018, 15:39:37',
        },
        '2': {
          name: 'ivysaur',
          id: '2',
          date: '18.07.2018, 17:46:24',
        }
      };

      expect(reducer(initialState, {
        type: actionTypes.FETCH_CATCHED_SUCCESS,
        payload: {
          data,
        }
      })).toEqual({
        ...initialState,
        catched: {
          ...initialState.catched,
          ...data,
        },
        catchedPage: initialState.catchedPage + 1,
      })
    });

    it('should handle FETCH_CATCHED_FAILURE action', () => {
      const error = 'Something went wrong';

      expect(reducer(initialState, {
        type: actionTypes.FETCH_CATCHED_FAILURE,
        payload: {
          error,
        }
      })).toEqual({
        ...initialState,
        error,
      })
    });
  });

  describe('should handle actions for a single poke', () => {
    it('should handle REQUEST_POKE action', () => {
      expect(reducer(initialState, {
        type: actionTypes.REQUEST_POKE
      })).toEqual({
        ...initialState,
        isFetching: true,
      })
    });

    it('should handle FETCH_POKE_SUCCESS action', () => {
      const data = {
        name: 'pidgey',
        id: '16',
        date: '18.07.2018, 17:46:24',
      };

      expect(reducer(initialState, {
        type: actionTypes.FETCH_POKE_SUCCESS,
        payload: {
          data,
        }
      })).toEqual({
        ...initialState,
        pokemons: {
          ...initialState.pokemons,
          [data.id]: {
            ...initialState.pokemons[data.id],
            ...data,
          }
        },
      })
    });

    it('should handle FETCH_POKE_FAILURE action', () => {
      const error = 'Something went wrong';

      expect(reducer(initialState, {
        type: actionTypes.FETCH_POKE_FAILURE,
        payload: {
          error,
        }
      })).toEqual({
        ...initialState,
        error,
      })
    });

    it('should handle ADD_TO_CATCHED action', () => {
      const data = {
        name: 'pidgey',
        id: '16',
        date: '18.07.2018, 17:46:24',
      };

      expect(reducer(initialState, {
        type: actionTypes.ADD_TO_CATCHED,
        payload: {
          data,
        }
      })).toEqual({
        ...initialState,
        catched: {
          ...initialState.catched,
          [data.id]: {
            ...initialState.catched[data.id],
            ...data,
          }
        }
      })
    });
  });

  describe('should handle actions for catching pokemon', () => {
    it('should handle START_CATCHING action', () => {
      expect(reducer(initialState, {
        type: actionTypes.START_CATCHING,
      })).toEqual({
        ...initialState,
        isCatching: true,
      })
    });

    it('should handle CATCH_SUCCESS action', () => {
      const state = {
        ...initialState,
        pokemons: {
          '16': {
            name: 'pidgey',
            id: '16',
            date: '18.07.2018, 17:46:24',
          },
        },
      };

      const data = {
        name: 'pidgey',
        id: '16',
        date: '18.07.2018, 17:46:24',
      };

      expect(reducer(initialState, {
        type: actionTypes.CATCH_SUCCESS,
        payload: {
          data,
        }
      })).toEqual({
        ...state,
        pokemons: {
          ...state.pokemons,
          [data.id]: {
            ...state.pokemons[data.id],
            date: '18.07.2018, 17:46:24',
          }
        },
        catched: {
          [data.id]: {
            ...data,
          }
        }
      })
    });

    it('should handle CATCH_FAILURE action', () => {
      const error = 'Something went wrong';

      expect(reducer(initialState, {
        type: actionTypes.CATCH_FAILURE,
        payload: {
          error,
        }
      })).toEqual({
        ...initialState,
        error,
      })
    });
  });

  describe('should handle FETCHED_ALL_POKEMONS action', () => {
    it('should handle FETCHED_ALL_POKEMONS action', () => {
      expect(reducer(initialState, {
        type: actionTypes.FETCHED_ALL_POKEMONS,
      })).toEqual({
        ...initialState,
        fetchedAllPokemons: true,
      })
    });

    it('should handle FETCHED_ALL_CATCHED action', () => {
      expect(reducer(initialState, {
        type: actionTypes.FETCHED_ALL_CATCHED,
      })).toEqual({
        ...initialState,
        fetchedAllCatched: true,
      })
    });
  });
});