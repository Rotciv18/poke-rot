import React from 'react';

import { Table } from 'react-bootstrap';

import positionNameString from '../../../../../helpers/positionNameString';

import { Avatar } from '@material-ui/core';
import { Container } from './style';

function SentInvitations({ invitations }) {
  return (
    <Container>
      <Table striped bordered hover size="sm" variant="dark" style={{ backgroundColor: '#3c3f43' }}>
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
              <td align="center">
                <Avatar title={invitation.challenger.display_name} src={invitation.challenger.img_url} />
              </td>
              <td align="center">
                <Avatar title={invitation.challenged.display_name} src={invitation.challenged.img_url} />
              </td>
              {invitation.challenge_type === 'casual'
                ? <td align="center">Casual</td>
                : <td align="center">{positionNameString(invitation.position)}</td>
              }
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}

export default SentInvitations;