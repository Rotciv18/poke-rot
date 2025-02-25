import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/panel/Main';
import PokemonDetails from '../pages/panel/PokemonDetails';
import Setup from '../pages/panel/Setup';
import AddToSetup from '../pages/panel/AddToSetup';
import Battles from '../pages/panel/Battles';
import Casual from '../pages/panel/Casual';
import CasualDetails from '../pages/panel/CasualDetails';
import Gyms from '../pages/panel/Gyms';
import Shop from '../pages/panel/Shop';
import EvolvePokemon from '../pages/panel/EvolvePokemon';
import LearnMove from '../pages/panel/LearnMove';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/pokemon/:pokemonId' component={PokemonDetails} />
        {/* <Route path="/another_test" render={(props) => (<AnotherTest {...props} Twitch={window.Twitch ? window.Twitch.ext : null} />)} /> */}
        <Route path='/setup' exact component={Setup} />
        <Route path='/setup/new' component={AddToSetup} />
        <Route path='/battles' exact component={Battles} />
        <Route path='/casual' exact component={Casual} />
        <Route path='/casual/details' exact component={CasualDetails} />
        <Route path='/gyms' exact component={Gyms} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/pokemons/evolve' exact component={EvolvePokemon} />
        <Route path='/pokemons/learn' exact component={LearnMove} />
      </Switch>
    );
  }
}

export default Routes;
