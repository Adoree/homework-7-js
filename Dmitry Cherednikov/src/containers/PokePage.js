import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import FetchError from '../components/FetchError';
import Page from '../components/Page';
import { getPokemon, getIsFetchingPoke, getError } from '../reducers';
import { fetchPokemon } from '../actions';

class PokePage extends Component {
  static propTypes = {
    poke: PropTypes.object,
    isFetchingPoke: PropTypes.bool.isRequired,
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
    const { poke, isFetchingPoke, error } = this.props;
    if (isFetchingPoke) {
      return (
        <p>
          Fetching...
        </p>
      )
    }

    if (!poke && error) {
      return (
        <FetchError message={error} onRetry={this.getPokemon}/>
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
    isFetchingPoke: getIsFetchingPoke(state),
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