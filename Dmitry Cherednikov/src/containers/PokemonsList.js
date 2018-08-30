import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import List from '../components/List';
import FetchError from '../components/FetchError';
import { fetchPokemons } from '../actions';
import {
  getPokemons,
  getError,
  getFetchedAllPokemons,
  getIsFetching,
  getPokemonsPage
} from '../reducers'

export class PokemonsList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fetchPokemons: PropTypes.func.isRequired,
    fetchedAllPokemons: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    fetchPokemons: () => {},
  };

  componentDidMount() {
    if (this.props.page === 1 && !this.props.fetchedAllPokemons) {
      this.fetchPokemons();
    }
  }

  fetchPokemons = () => {
    this.props.fetchPokemons();
  };

  render() {
    const { list, errorMessage, isFetching, fetchedAllPokemons } = this.props;

    if (!list.length && errorMessage) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.fetchPokemons}
        />
      )
    }

    if (!list.length && !isFetching) {
      return (
        <p>
          There are no pokemons.
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
  errorMessage: getError(state),
  fetchedAllPokemons: getFetchedAllPokemons(state),
  isFetching: getIsFetching(state),
  page: getPokemonsPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemons: bindActionCreators(fetchPokemons, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonsList);