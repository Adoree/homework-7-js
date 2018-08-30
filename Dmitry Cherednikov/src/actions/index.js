import * as actionTypes from '../constants';
import { handleErrors } from '../utils';

export const fetchedAllPokemons = () => ({
  type: actionTypes.FETCHED_ALL_POKEMONS,
});

export const fetchedAllCatched = () => ({
  type: actionTypes.FETCHED_ALL_CATCHED,
});

// fetch pokemons

export const requestPokemons = () => ({
  type: actionTypes.REQUEST_POKEMONS,
});

export const fetchPokemonsSuccess = (data) => ({
  type: actionTypes.FETCH_POKEMONS_SUCCESS,
  payload: {
    data,
  }
});

export const fetchPokemonsFailure = (error) => ({
  type: actionTypes.FETCH_POKEMONS_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const fetchPokemons = () => (dispatch, getState) => {
  dispatch(requestPokemons());

  const page = getState().page;

  return fetch(`http://localhost:3001/pokemons?_page=${page}&_limit=10&_embed=catched`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      if (data.length < 10) dispatch(fetchedAllPokemons());
      const pokemons = {};
      data.forEach(poke => {
        const placeholder = poke.catched[0] ? poke.catched[0].date : null;
        pokemons[poke.id] = {
          name: poke.name,
          id: poke.id,
          date: placeholder,
        }
      });
      dispatch(fetchPokemonsSuccess(pokemons));
      return pokemons;
    })
    .catch(err => dispatch(fetchPokemonsFailure(err)));
};

// fetch catched

export const fetchCatchedBegin = () => ({
  type: actionTypes.REQUEST_CATCHED_POKEMONS,
});

export const fetchCatchedSuccess = (data) => ({
  type: actionTypes.FETCH_CATCHED_SUCCESS,
  payload: {
    data,
  }
});

export const fetchCatchedFailure = (error) => ({
  type: actionTypes.FETCH_CATCHED_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const fetchCatchedPokemons = () => (dispatch, getState) => {
  dispatch(fetchCatchedBegin());

  const page = getState().catchedPage;

  return fetch(`http://localhost:3001/catched?_page=${page}&_limit=10&_expand=pokemon`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      if (data.length < 10) dispatch(fetchedAllCatched());
      const pokemons = {};
      data.forEach(poke => {
        pokemons[poke.pokemonId] = {
          ...poke.pokemon, date: poke.date
        }
      });
      return pokemons;
    })
    .then(pokemons => {
      dispatch(fetchCatchedSuccess(pokemons));
      return pokemons;
    })
    .catch(err => dispatch(fetchCatchedFailure(err)));
};

// catch

export const startCatching = () => ({
  type: actionTypes.START_CATCHING,
});

export const catchPokemonSuccess = (data) => ({
  type: actionTypes.CATCH_SUCCESS,
  payload: {
    data
  },
});

export const catchPokemonFailure = (error) => ({
  type: actionTypes.CATCH_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const catchPokemon = (id, name) => (dispatch) => {
  dispatch(startCatching());

  return fetch(`http://localhost:3001/catched`, {
    method: 'POST',
    body: JSON.stringify({
      date: new Date().toLocaleString(),
      pokemonId: id,
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => ({
        name,
        id,
        date: data.date,
      }))
    .then(pokemon => {
      dispatch(catchPokemonSuccess(pokemon));
      return pokemon;
    })
    .catch(err => {
      dispatch(catchPokemonFailure(err));
      return err;
    })
};

export const fetchPoke = () => ({
  type: actionTypes.REQUEST_POKE,
});

export const fetchPokeSuccess = (data) => ({
  type: actionTypes.FETCH_POKE_SUCCESS,
  payload: {
    data,
  }
});

export const fetchPokeFailure = (error) => ({
  type: actionTypes.FETCH_POKE_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const addToCatched = (data) => ({
  type: actionTypes.ADD_TO_CATCHED,
  payload: {
    data,
  }
});

export const fetchPokemon = (id) => (dispatch) => {
  dispatch(fetchPoke());

  return fetch(`http://localhost:3001/pokemons/${id}?_embed=catched`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      const placeholder = data.catched[0] ? data.catched[0].date : null;
      const pokemon = {
        name: data.name,
        id: data.id,
        date: placeholder,
      };
      return pokemon;
    })
    .then(pokemon => {
      dispatch(fetchPokeSuccess(pokemon));
      if (pokemon.date) dispatch(addToCatched(pokemon));
      return pokemon;
    })
    .catch(err => dispatch(fetchPokeFailure(err)))
};