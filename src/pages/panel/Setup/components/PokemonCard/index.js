import React, { Component } from 'react';
import capitalize from '../../../../../helpers/capitalize';

import { XSquare } from 'react-bootstrap-icons';

import { Card } from 'react-bootstrap';

export default class PokemonCard extends Component {
  render() {
    const { pokemon, handleRemovePokemonClick } = this.props;
    return (
      <Card className="d-flex align-items-center"
        style={{ width: '75px', marginBottom: '12px' }}>
        <img style={{ width: '60px' }} src={pokemon.pokemon_data.sprite}></img>
        <span>{capitalize(pokemon.name)}</span>
        <span>Lv. {pokemon.level}</span>
        <XSquare onClick={() => handleRemovePokemonClick(pokemon.id)} style={{ cursor: 'pointer' }} className="mt-2 hover" />

      </Card>
    );
  }
}
