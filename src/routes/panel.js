import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/panel/Main';
import PokemonDetails from '../pages/panel/PokemonDetails';
import Setup from '../pages/panel/Setup';
import AddToSetup from '../pages/panel/AddToSetup';
import Battles from '../pages/panel/Battles';
import Casual from '../pages/panel/Casual';
import CasualDetails from '../pages/panel/CasualDetails';
import Gyms from '../pages/panel/Gyms';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/pokemon/:pokemonId" component={PokemonDetails} />
      {/* <Route path="/another_test" render={(props) => (<AnotherTest {...props} Twitch={window.Twitch ? window.Twitch.ext : null} />)} /> */}
      <Route path="/setup" exact component={Setup} />
      <Route path="/setup/new" component={AddToSetup} />
      <Route path="/battles" exact component={Battles} />
      <Route path="/casual" exact component={Casual} />
      <Route path="/casual/details" exact component={CasualDetails} />
      <Route path="/gyms" exact component={Gyms} />
    </Switch>
  )
}