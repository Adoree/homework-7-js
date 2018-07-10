import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchPokemons, fetchCatchedPokemons } from '../actions/index';
import { getError, getIsFetchingPokemons, getIsFetchingCatched, getPokemons, getCatchedPokemons } from '../reducers/index';
import CatchedList from './CatchedList';
import Content from '../components/Content';
import FetchError from '../components/FetchError'

class MainContent extends Component {
  static propTypes = {
    isFetchingPokemons: PropTypes.bool.isRequired,
    isFetchingCatched: PropTypes.bool.isRequired,
    pokemonList: PropTypes.array.isRequired,
    catchedPokemons: PropTypes.array.isRequired,
  };

  static defaultProps = {
    fetchPokemons: () => {},
    fetchCatchedPokemons: () => {},
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const { fetchPokemons, fetchCatchedPokemons } = this.props;
    fetchPokemons();
    fetchCatchedPokemons();
  };

  render() {
    const { isFetchingPokemons, isFetchingCatched, pokemonList, catchedPokemons, errorMessage } = this.props;

    if (isFetchingPokemons && isFetchingCatched) {
      return (
        <p>Loading...</p>
      )
    }

    if (errorMessage && !pokemonList.length && !catchedPokemons) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.fetch}
        />
      )
    }

    return (
      <main>
        <Switch>
          <Route path='/pokemons' component={Content}/>
          <Route path='/catched' component={CatchedList}/>
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetchingPokemons: getIsFetchingPokemons(state),
  isFetchingCatched: getIsFetchingCatched(state),
  pokemonList: getPokemons(state),
  catchedPokemons: getCatchedPokemons(state),
  errorMessage: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemons: bindActionCreators(fetchPokemons, dispatch),
  fetchCatchedPokemons: bindActionCreators(fetchCatchedPokemons, dispatch),
});

MainContent = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));

export default MainContent;