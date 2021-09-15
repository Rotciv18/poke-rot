import { combineReducers } from 'redux';

import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';
import user from './user';
import setup from './setup';
import battles from './battles';
import availableBattles from './availableBattles';
import positions from './positions';
import pokeballs from './pokeballs';
import stones from './stones';
import moves from './moves';

export default combineReducers({
  pokemons,
  pokemon,
  twitchAuth,
  user,
  setup,
  battles,
  availableBattles,
  positions,
  pokeballs,
  stones,
  moves,
});
