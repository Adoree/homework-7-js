import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchPokemons } from '../actions/index';
import { getPokemonsPage, getFetchedAllPokemons } from '../reducers/index';
import PokemonsList from './PokemonsList';
import PokePage from './PokePage';

class PokemonsPage extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    fetchedAllPokemons: PropTypes.bool.isRequired,
    fetchPokemons: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetchPokemons: () => {},
  };

  componentDidMount() {
    const { page, fetchedAllPokemons, fetchPokemons } = this.props;
    if (page === 1 && !fetchedAllPokemons) {
      fetchPokemons();
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/pokemons' component={PokemonsList}/>
        <Route path='/pokemons/:id' component={PokePage}/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  page: getPokemonsPage(state),
  fetchedAllPokemons: getFetchedAllPokemons(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemons: bindActionCreators(fetchPokemons, dispatch)
});

PokemonsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonsPage);

export default PokemonsPage;