import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pokedex from './Pokedex';

const Root = ({
  store,
}) => (
  <Provider store={store} >
    <BrowserRouter>
      <Pokedex />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    isFetching: PropTypes.bool,
    isCatching: PropTypes.bool,
    pokemons: PropTypes.object,
    counter: PropTypes.number,
    catched: PropTypes.object,
    catchedCounter: PropTypes.number,
    fetchedAllPokemons: PropTypes.bool,
    fetchedAllCatched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default Root;