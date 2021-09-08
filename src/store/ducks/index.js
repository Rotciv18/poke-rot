import { combineReducers } from 'redux';

import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';
import user from './user';
import setup from './setup';
import battles from './battles';
import availableBattles from './availableBattles';

export default combineReducers({
  pokemons,
  pokemon,
  twitchAuth,
  user,
  setup,
  battles,
  availableBattles,
});
