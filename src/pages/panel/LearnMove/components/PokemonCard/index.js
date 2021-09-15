import React, { Component } from 'react';
import capitalize from '../../../../../helpers/capitalize';

import { Card } from 'react-bootstrap';

export default class PokemonCard extends Component {

  render() {
    const { pokemon, handleSelectPokemon, selected } = this.props;
    return (
      <Card
        style={{
          width: '90px',
          marginBottom: '12px',
          cursor: 'pointer',
          padding: '0px',
          backgroundColor: selected ? '#0088ff' : '',
          color: selected ? 'white' : 'black'
        }}
        onClick={() => handleSelectPokemon(pokemon.id, pokemon.name)}
      >
        <img src={pokemon.pokemon_data.sprite}></img>
        <span className='text-center'>{capitalize(pokemon.name)}</span>
        <span className='text-center'>Lv. {pokemon.level}</span>
      </Card>
    );
  }
}
