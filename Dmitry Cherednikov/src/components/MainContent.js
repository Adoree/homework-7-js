import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CatchedList from '../containers/CatchedList';
import PokemonsPage from '../containers/PokemonsPage';

const MainContent = () => (
  <main>
    <Switch>
      <Route path='/pokemons' component={PokemonsPage}/>
      <Route path='/catched' component={CatchedList}/>
    </Switch>
  </main>
);

export default MainContent;