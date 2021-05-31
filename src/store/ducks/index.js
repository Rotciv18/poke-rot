import { combineReducers } from 'redux';

import twitchAuth from './twitchAuth';
import pokemons from './pokemons';

export default combineReducers({
  pokemons,
  twitchAuth,
});
