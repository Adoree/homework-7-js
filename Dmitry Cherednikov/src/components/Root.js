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
  store: PropTypes.object.isRequired,
};

export default Root;