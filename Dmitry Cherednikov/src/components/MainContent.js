import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CatchedList from '../containers/CatchedList';
import PokemonsList from "../containers/PokemonsList";
import PokePage from "../containers/PokePage";

const MainContent = () => (
  <main>
    <Switch>
      <Route exact path='/pokemons' component={PokemonsList}/>
      <Route exact path='/pokemons/:id' component={PokePage}/>
      <Route exact path='/catched' component={CatchedList}/>
    </Switch>
  </main>
);

export default MainContent;