import React from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import capitalize from '../../../../../helpers/capitalize';
import positionNameString from '../../../../../helpers/positionNameString';

import { Table } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';
import { Container } from './style';

function ScheduledBattles({ schedules }) {
  return (
    <Container>
      <Table striped bordered hover size="sm" variant="dark" style={{ backgroundColor: '#3c3f43' }}>
        <thead>
          <tr>
            <th>Desafiante</th>
            <th>Desafiado</th>
            <th>Tipo de Batalha</th>
            <th>Data Marcada</th>
          </tr>
        </thead>
        {schedules.map(schedule => (
          <tbody key={schedule.id}>
            <tr>
              <td align="center">
                <Avatar title={schedule.challenger.display_name} src={schedule.challenger.img_url} />
              </td>
              <td align="center">
                <Avatar title={schedule.challenged.display_name} src={schedule.challenged.img_url} />
              </td>
              {schedule.challenge_type === 'casual'
                ? <td align="center">Casual</td>
                : <td align="center">{positionNameString(schedule.position)}</td>
              }
              <td align="center">{format(parseISO(schedule.battle_date), 'dd/MM')} {capitalize(format(parseISO(schedule.battle_date), 'iii', { locale: ptBR }))}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}

export default ScheduledBattles;