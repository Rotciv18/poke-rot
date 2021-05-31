import React from 'react';
import capitalize from '../../../../../helpers/capitalize';

import { Card, Button } from 'react-bootstrap';

// import { Container } from './styles';

function PokemonCard({ pokemon }) {
  return (<Card style={{ width: '90px', marginBottom: '12px', cursor: 'pointer' }}
    onClick={() => this.props.history.push(`/pokemon/${pokemon.id}`)}>
    <img src={pokemon.pokemon_data.sprite}></img>
    <span className="text-center">{capitalize(pokemon.name)}</span>
    <span className="text-center">Lv. {pokemon.level}</span>
  </Card>);
}

export default PokemonCard;