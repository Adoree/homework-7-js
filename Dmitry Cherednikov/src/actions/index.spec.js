import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './index';
import * as actionTypes from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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

describe('actions', () => {
  describe('pokemons actions', () => {
    describe('simple action creators', () => {
      it('requestPokemons should create REQUEST_POKEMONS action', () => {
        const output = {
          type: actionTypes.REQUEST_POKEMONS,
        };

        expect(actions.requestPokemons()).toEqual(output);
      });

      it('fetchPokemonsSuccess should create FETCH_POKEMONS_SUCCESS action', () => {
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

        const output = {
          type: actionTypes.FETCH_POKEMONS_SUCCESS,
          payload: {
            data,
          }
        };

        expect(actions.fetchPokemonsSuccess(data)).toEqual(output);
      });

      it('fetchPokemonsFailure should create FETCH_POKEMONS_FAILURE', () => {
        const error = 'Something went wrong';

        const output = {
          type: actionTypes.FETCH_POKEMONS_FAILURE,
          payload: {
            error,
          }
        };

        expect(actions.fetchPokemonsFailure(error)).toEqual(output);
      });
    });

    describe('async action creators', () => {
      afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
      });

      it('expected actions should be dispatched on the successful request', () => {
        const store = mockStore(initialState);
        const expectedActions = [
          actionTypes.REQUEST_POKEMONS,
          actionTypes.FETCHED_ALL_POKEMONS,
          actionTypes.FETCH_POKEMONS_SUCCESS,
        ];

        fetchMock.getOnce(
          `*`, {
            body: [{ name: 'bulba', id: 1, catched: [] }],
            headers: { 'content-type': 'application/json' }
          });

        return store.dispatch(actions.fetchPokemons())
          .then(() => {
            const actualActions = store.getActions().map(action => action.type);
            expect(actualActions).toEqual(expectedActions);
          })
      })
    })
  })
});