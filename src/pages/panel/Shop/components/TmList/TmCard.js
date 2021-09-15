import React from 'react';

import PokePoints from '../../../../../images/pokepoints.png';
import capitalize from '../../../../../helpers/capitalize';
import { Card } from 'react-bootstrap';

const tmImg = 'https://pokemon3d.net/wiki/images/7/7a/TMbig.png';

function TmList({ move, handleTmClick }) {
  return (
    <Card
      onClick={() => handleTmClick(move)}
      className='card'
      style={{
        width: '90px',
        marginBottom: '12px',
        cursor: 'pointer',
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6px',
      }}
    >
      <img className='itemImg' src={tmImg}></img>
      <span className='text-center'>{capitalize(move.move_name)}</span>
      <div className='d-flex align-items-center'>
        <img className='pokePoints' title='PokePoints' src={PokePoints}></img>
        <span className='ml-1'>{move.price}</span>
      </div>
    </Card>
  );
}

export default TmList;
