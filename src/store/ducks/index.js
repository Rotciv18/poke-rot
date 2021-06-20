import { combineReducers } from 'redux';

import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';
import user from './user';
import setup from './setup';

export default combineReducers({
  pokemons,
  pokemon,
  twitchAuth,
  user,
  setup,
});
