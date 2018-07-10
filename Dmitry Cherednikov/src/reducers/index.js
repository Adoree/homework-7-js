import * as actionTypes from '../constants';

const initialState = {
  fetchedAllPokemons: false,
  fetchedAllCatched: false,
  isFetchingPokemons: false,
  isFetchingCatched: false,
  isFetchingPoke: false,
  error: null,
  pokemons: {},
  counter: 1,
  catched: {},
  catchedCounter: 1,
};

const pokeApp = (state = initialState, action) => {
  let copy = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case actionTypes.FETCH_BEGIN:
      copy.isFetchingPokemons = true;
      copy.error = null;
      return copy;
    case actionTypes.FETCH_SUCCESS:
      copy.isFetchingPokemons = false;
      copy.pokemons = {
        ...copy.pokemons,
        ...action.payload.data
      };
      copy.counter = copy.counter + 1;
      return copy;
    case actionTypes.FETCH_CATCHED_BEGIN:
      copy.isFetchingCatched = true;
      copy.error = null;
      return copy;
    case actionTypes.FETCH_CATCHED_SUCCESS:
      copy.isFetchingCatched = false;
      copy.catched = {
        ...copy.catched,
        ...action.payload.data,
      };
      copy.catchedCounter = copy.catchedCounter + 1;
      return copy;
    case actionTypes.FETCH_POKE:
      copy.isFetching = true;
      return copy;
    case actionTypes.FETCH_POKE_SUCCESS:
      copy.pokemons[action.payload.data.id] = {
        ...action.payload.data,
      };
      return copy;
    case actionTypes.ADD_CATCHED:
      copy.catched[action.payload.data.id] = {
        name: action.payload.data.name,
        id: action.payload.data.id,
        catched: action.payload.data.catched.date,
      };
      return copy;
    case actionTypes.CATCH_SUCCESS:
      copy.catched[action.payload.pokemon.id] = action.payload.pokemon;
      copy.pokemons[action.payload.pokemon.id] = {
        ...copy.pokemons[action.payload.pokemon.id],
        catched: {
          date: action.payload.pokemon.date,
        },
      };
      return copy;
    case actionTypes.FETCH_FAILURE:
      copy.isFetchingPokemons = false;
      return copy;
    case actionTypes.FETCH_CATCHED_FAILURE:
      copy.isFetchingCatched = false;
      return copy;
    case actionTypes.CATCH_FAILURE:
      copy.error = action.payload.error;
      return copy;
    case actionTypes.FETCH_POKE_FAILURE:
      copy.isFetching = false;
      copy.error = action.payload.error;
      return copy;
    case actionTypes.FETCHED_ALL_POKEMONS:
      copy.fetchedAllPokemons = true;
      return copy;
    case actionTypes.FETCHED_ALL_CATCHED:
      copy.fetchedAllCatched = true;
      return copy;
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

export const getIsFetchingPokemons = (state) => state.isFetchingPokemons;
export const getIsFetchingCatched = (state) => state.isFetchingCatched;
export const getIsFetchingPoke = (state) => state.isFetchingPoke;
export const getError = (state) => state.error;

export const getPokemon = (state, id) => {
  return state.pokemons[id];
};

export const getFetchedAllPokemons = (state) => state.fetchedAllPokemons;
export const getFetchedAllCatched = (state) => state.fetchedAllCatched;

export default pokeApp;

