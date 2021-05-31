import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/panel/Main';
import PokemonDetails from '../pages/panel/PokemonDetails';
import TestPage from '../pages/panel/TestPage';
import AnotherTest from '../pages/panel/AnotherTest';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/pokemon/:pokemonId" component={PokemonDetails} />
      <Route path="/test" component={TestPage} />
      <Route path="/another_test" render={(props) => (<AnotherTest {...props} Twitch={window.Twitch ? window.Twitch.ext : null} />)} />
    </Switch>
  )
}