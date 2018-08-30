import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import List from '../components/List';
import FetchError from '../components/FetchError';
import { getCatchedPokemons, getError, getIsFetching, getCatchedPage, getFetchedAllCatched } from '../reducers';
import { fetchCatchedPokemons } from '../actions';

export class CatchedList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    catchedPage: PropTypes.number.isRequired,
    fetchCatchedPokemons: PropTypes.func.isRequired,
    fetchedAllCatched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    fetchCatchedPokemons: () => {},
  };

  componentDidMount() {
    if (this.props.catchedPage === 1 && !this.props.fetchedAllCatched) {
      this.fetchPokemons();
    }
  }

  fetchPokemons = () => {
    this.props.fetchCatchedPokemons();
  };

  render() {
    const { list, errorMessage, isFetching, fetchedAllCatched } = this.props;

    if (errorMessage && !list.length) {
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
          There are no catched pokemons
        </p>
      )
    }

    return (
      <List
        catched
        list={list}
        onClick={this.fetchPokemons}
        isFetching={isFetching}
        isFetchedAll={fetchedAllCatched}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  list: getCatchedPokemons(state),
  errorMessage: getError(state),
  fetchedAllCatched: getFetchedAllCatched(state),
  isFetching: getIsFetching(state),
  catchedPage: getCatchedPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCatchedPokemons: bindActionCreators(fetchCatchedPokemons, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CatchedList);