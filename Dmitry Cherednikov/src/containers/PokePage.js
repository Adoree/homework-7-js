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
    if (!this.props.poke) {
      this.props.fetchPokemon(this.props.match.params.id);
    }
  };

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    const { poke, isFetching, error } = this.props;

    if (!poke && error) {
      return (
        <FetchError
          message={error}
          onRetry={this.getPokemon}
        />
      )
    }

    if (!poke || isFetching) {
      return (
        <p>
          Fetching...
        </p>
      )
    }

    return (
      <Page {...this.props.poke }/>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  return {
    poke: getPokemon(state, id),
    isFetching: getIsFetching(state),
    error: getError(state),
}};

const mapDispatchToProps = (dispatch) => ({
  fetchPokemon: bindActionCreators(fetchPokemon, dispatch)
});

PokePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokePage);

export default PokePage;