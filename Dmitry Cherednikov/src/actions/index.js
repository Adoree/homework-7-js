import * as actionTypes from '../constants';

const fetchedAllPokemons = () => ({
  type: actionTypes.FETCHED_ALL_POKEMONS,
});

const fetchedAllCatched = () => ({
  type: actionTypes.FETCHED_ALL_CATCHED,
});


// fetch

const beginFetch = () => ({
  type: actionTypes.FETCH_BEGIN,
});

const fetchSuccess = (data) => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: {
      data,
    }
});

const fetchError = (error) => ({
  type: actionTypes.FETCH_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const fetchPokemons = () => (dispatch, getState) => {
  dispatch(beginFetch());

  const page = getState().counter;

  return fetch(`http://localhost:3001/pokemons?_page=${page}&_limit=10&_embed=catched`)
    .then(res => res.json())
    .then(data => {
      if (data.length < 10) dispatch(fetchedAllPokemons());
      let pokemons = {};
      data.forEach(poke => {
        pokemons[poke.id] = { ...poke, catched: poke.catched[0]}
      });
      dispatch(fetchSuccess(pokemons));
      return pokemons;
    })
    .catch(err => dispatch(fetchError(err)));
};

// fetch catched

const fetchCatchedBegin = () => ({
  type: actionTypes.FETCH_CATCHED_BEGIN,
});

const fetchCatchedSuccess = (data) => ({
  type: actionTypes.FETCH_CATCHED_SUCCESS,
  payload: {
    data,
  }
});

const fetchCatchedFailure = (error) => ({
  type: actionTypes.FETCH_CATCHED_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const fetchCatchedPokemons = () => (dispatch, getState) => {
  dispatch(fetchCatchedBegin());

  const page = getState().catchedCounter;

  return fetch(`http://localhost:3001/catched?_page=${page}&_limit=10&_expand=pokemon`)
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
    .catch(err => dispatch(fetchCatchedFailure(err)))
};

// catch

const catchPokemonSuccess = (pokemon) => ({
  type: actionTypes.CATCH_SUCCESS,
  payload: {
    pokemon
  },
});

const catchPokemonFailure = (error) => ({
  type: actionTypes.CATCH_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const catchPokemon = (id, name) => (dispatch) => {
  fetch(`http://localhost:3001/catched`, {
    method: 'POST',
    body: JSON.stringify({
      date: new Date().toLocaleString(),
      pokemonId: id,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
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

const fetchPoke = () => ({
  type: actionTypes.FETCH_POKE,
});

const fetchPokeSuccess = (data) => ({
  type: actionTypes.FETCH_POKE_SUCCESS,
  payload: {
    data
  }
});

const fetchPokeFailure = (error) => ({
  type: actionTypes.FETCH_POKE_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

const addToCatched = (data) => ({
  type: actionTypes.ADD_CATCHED,
  payload: {
    data,
  }
});

export const fetchPokemon = (id) => (dispatch) => {
  dispatch(fetchPoke());
  return fetch(`http://localhost:3001/pokemons/${id}?_embed=catched`)
    .then(res => res.json())
    .then(data => {
      const pokemon = {...data, catched: data.catched[0]};
      dispatch(fetchPokeSuccess(pokemon));
      if (pokemon.catched) dispatch(addToCatched(pokemon));
      return pokemon
    })
    .catch(err => dispatch(fetchPokeFailure(err)))
};