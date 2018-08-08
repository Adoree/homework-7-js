import * as actionTypes from '../constants';

const fetchedAllPokemons = () => ({
  type: actionTypes.FETCHED_ALL_POKEMONS,
});

const fetchedAllCatched = () => ({
  type: actionTypes.FETCHED_ALL_CATCHED,
});


// fetch

const requestPokemons = () => ({
  type: actionTypes.REQUEST_POKEMONS,
});

const fetchPokemonsSuccess = (data) => ({
    type: actionTypes.FETCH_POKEMONS_SUCCESS,
    payload: {
      data,
    }
});

const fetchPokemonsError = (error) => ({
  type: actionTypes.FETCH_POKEMONS_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

export const fetchPokemons = () => (dispatch, getState) => {
  dispatch(requestPokemons());

  const page = getState().page;

  return fetch(`http://localhost:3001/pokemons?_page=${page}&_limit=10&_embed=catched`)
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
    .catch(err => dispatch(fetchPokemonsError(err)));
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

  const page = getState().catchedPage;

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

const catchPokemonSuccess = (data) => ({
  type: actionTypes.CATCH_SUCCESS,
  payload: {
    data
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
      id: id,
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
    data,
  }
});

const fetchPokeFailure = (error) => ({
  type: actionTypes.FETCH_POKE_FAILURE,
  payload: {
    error: error.message || 'Something went wrong',
  }
});

const addToCatched = (data) => ({
  type: actionTypes.ADD_TO_CATCHED,
  payload: {
    data,
  }
});

export const fetchPokemon = (id) => (dispatch) => {
  dispatch(fetchPoke());
  return fetch(`http://localhost:3001/pokemons/${id}?_embed=catched`)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const placeholder = data.catched[0] ? data.catched[0].date : null;
      console.log(1);
      const pokemon = {
        name: data.name,
        id: data.id,
        date: placeholder,
      };
      delay(10000).then(() => {
        dispatch(fetchPokeSuccess(pokemon));
        if (pokemon.date) dispatch(addToCatched(pokemon));
        return pokemon;
      })
    })
    .catch(err => dispatch(fetchPokeFailure(err)))
};