import React from 'react';
import { Table, Button } from 'react-bootstrap';

import capitalize from '../../../../../helpers/capitalize';

// import { Container } from './styles';

function MoveTable({ moves, mustForget, handleForgetMove }) {
  return <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Habilidades</th>
        {mustForget ? <th></th>
          : null}
      </tr>
    </thead>
    <tbody>
      {moves.map((move, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{capitalize(move.name)}</td>
          {mustForget ?
            <td>
              <Button onClick={() => handleForgetMove(move.name)} size="sm">Esquecer</Button>
            </td>
            : null}
        </tr>
      ))}
    </tbody>
  </Table>;
}

export default MoveTable;