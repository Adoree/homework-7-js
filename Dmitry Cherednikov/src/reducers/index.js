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

const pokeApp = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          ...action.payload.data,
        },
        isFetching: false,
        page: state.page + 1,
      };
    case actionTypes.FETCH_CATCHED_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actionTypes.FETCH_CATCHED_SUCCESS:
      return {
        ...state,
        catched: {
          ...state.catched,
          ...action.payload.data,
        },
        isFetching: false,
        catchedPage: state.catchedPage + 1,
      };
    case actionTypes.FETCH_POKE:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_POKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pokemons: {
          ...state.pokemons,
          [action.payload.data.id]: {
            ...action.payload.data,
          }
        }
      };
    case actionTypes.ADD_TO_CATCHED:
      return {
        ...state,
        catched: {
          ...state.catched,
          [action.payload.data.id]: {
            ...action.payload.data,
          }
        }
      };
    case actionTypes.CATCH_SUCCESS:
      return {
        ...state,
        catched: {
          ...state.catched,
          [action.payload.data.id]: action.payload.data,
        },
        pokemons: {
          ...state.pokemons,
          [action.payload.data.id]: {
            ...action.payload.data,
          }
        },
        isCatching: false,
      };
    case actionTypes.FETCH_FAILURE:
    case actionTypes.FETCH_CATCHED_FAILURE:
    case actionTypes.FETCH_POKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case actionTypes.CATCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCatching: false,
      };
    case actionTypes.FETCHED_ALL_POKEMONS:
      return {
        ...state,
        fetchedAllPokemons: true,
      };
    case actionTypes.FETCHED_ALL_CATCHED:
      return {
        ...state,
        fetchedAllCatched: true,
      };
    default:
      return state;
  }
};

export const getPokemons = (state) => {
  const ids = Object.keys(state.pokemons);
  return ids.map(id => state.pokemons[id])
};

export const getCatchedPokemons = (state) => {
  const ids = Object.keys(state.catched);
  return ids.map(id => state.catched[id]);
};

export const getIsFetching = (state) => state.isFetching;

export const getError = (state) => state.error;

export const getPokemon = (state, id) => {
  return state.pokemons[id];
};

export const getPokemonsPage = (state) => state.page;
export const getCatchedPage = (state) => state.catchedPage;

export const getFetchedAllPokemons = (state) => state.fetchedAllPokemons;
export const getFetchedAllCatched = (state) => state.fetchedAllCatched;

export default pokeApp;

