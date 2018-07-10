import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokeList from '../containers/PokeList';
import PokePage from '../containers/PokePage';

const Content = () => (
  <Switch>
    <Route exact path='/pokemons' component={PokeList}/>
    <Route path='/pokemons/:id' component={PokePage}/>
  </Switch>
);

export default Content;