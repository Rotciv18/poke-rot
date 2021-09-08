import React from 'react';

import { Table } from 'react-bootstrap';

import capitalize from '../../../../../helpers/capitalize';
import positionNameString from '../../../../../helpers/positionNameString';

import { Container } from './style';

function SentInvitations({ invitations }) {
  return (
    <Container>
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Desafiante</th>
            <th>Desafiado</th>
            <th>Tipo de Batalha</th>
          </tr>
        </thead>
        {invitations.map(invitation => (
          <tbody key={invitation.id}>
            <tr>
              <td>{capitalize(invitation.challenger.username)}</td>
              <td>{capitalize(invitation.challenged.username)}</td>
              {invitation.challenge_type === 'casual'
                ? <td>Casual</td>
                : <td>{positionNameString(invitation.position)}</td>
              }
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}

export default SentInvitations;