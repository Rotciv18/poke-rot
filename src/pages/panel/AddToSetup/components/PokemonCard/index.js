import React, { Component } from 'react';
import capitalize from '../../../../../helpers/capitalize';

import { Card } from 'react-bootstrap';

export default class PokemonCard extends Component {
  render() {
    const { pokemon, handleAddToSetupClick } = this.props;
    return (<Card style={{ width: '90px', marginBottom: '12px', cursor: 'pointer' }}
      onClick={() => handleAddToSetupClick(pokemon.id)}>
      <img src={pokemon.pokemon_data.sprite}></img>
      <span className="text-center">{capitalize(pokemon.name)}</span>
      <span className="text-center">Lv. {pokemon.level}</span>
    </Card>);
  }
}
