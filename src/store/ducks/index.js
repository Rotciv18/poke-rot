import { combineReducers } from 'redux';

import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';
import user from './user';

export default combineReducers({
  pokemons,
  pokemon,
  twitchAuth,
  user,
});
