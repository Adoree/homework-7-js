import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import FetchError from '../components/FetchError';
import Page from '../components/Page';
import { getPokemon, getIsFetching, getError } from '../reducers';
import { fetchPokemon } from '../actions';

class PokePage extends Component {
  static propTypes = {
    poke: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string,
    }),
    isFetching: PropTypes.bool.isRequired,
    fetchPokemon: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetchPokemon: () => {},
  };

  getPokemon = () => {
    const { poke, fetchPokemon, match } = this.props;
    if (!poke) {
      fetchPokemon(match.params.id);
    }
  };

  handleClick = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const { poke, errorMessage } = this.props;
    if (!poke && !errorMessage) {
      this.getPokemon();
    }
  }

  render() {
    const { poke, isFetching, errorMessage } = this.props;

    if (!poke && errorMessage) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.getPokemon}
        />
      )
    }

    if (!poke && isFetching) {
      return (
        <p>
          Fetching...
        </p>
      )
    }

    if (!poke) {
      return ((
        <p>No pokemon found :(</p>
      ))
    }

    return (
      <Page
        { ...poke }
        onClick={this.handleClick}
      />
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  return {
    poke: getPokemon(state, id),
    isFetching: getIsFetching(state),
    errorMessage: getError(state),
}};

const mapDispatchToProps = (dispatch) => ({
  fetchPokemon: bindActionCreators(fetchPokemon, dispatch)
});

PokePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokePage);

export default PokePage;