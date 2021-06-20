import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/panel/Main';
import PokemonDetails from '../pages/panel/PokemonDetails';
import TestPage from '../pages/panel/TestPage';
import AnotherTest from '../pages/panel/AnotherTest';
import Setup from '../pages/panel/Setup';
import AddToSetup from '../pages/panel/AddToSetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/pokemon/:pokemonId" component={PokemonDetails} />
      <Route path="/test" component={TestPage} />
      <Route path="/another_test" render={(props) => (<AnotherTest {...props} Twitch={window.Twitch ? window.Twitch.ext : null} />)} />
      <Route path="/setup" exact component={Setup} />
      <Route path="/setup/new" component={AddToSetup} />
    </Switch>
  )
}