import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import List from '../components/List';
import FetchError from '../components/FetchError';
import { getPokemons, getError, getFetchedAllPokemons, getIsFetching } from '../reducers'
import { fetchPokemons } from '../actions';

class PokemonsList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fetchPokemons: PropTypes.func.isRequired,
    fetchedAllPokemons: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    fetchPokemons: () => {},
  };

  fetchPokemons = () => {
    this.props.fetchPokemons();
  };

  render() {
    const { list, error, isFetching, fetchedAllPokemons } = this.props;

    if (!list.length && error) {
      return (
        <FetchError
          message={error}
          onRetry={this.fetchPokemons}
        />
      )
    }

    if (!list.length && !isFetching) {
      return (
        <p>
          There are no pokemons
        </p>
      )
    }

    return (
      <List
        list={list}
        onClick={this.fetchPokemons}
        isFetching={isFetching}
        isFetchedAll={fetchedAllPokemons}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  list: getPokemons(state),
  error: getError(state),
  fetchedAllPokemons: getFetchedAllPokemons(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemons: bindActionCreators(fetchPokemons, dispatch)
});

PokemonsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonsList);

export default PokemonsList;