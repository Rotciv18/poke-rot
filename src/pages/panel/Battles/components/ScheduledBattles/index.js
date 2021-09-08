import React from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import capitalize from '../../../../../helpers/capitalize';
import positionNameString from '../../../../../helpers/positionNameString';

import { Table } from 'react-bootstrap';
import { Container } from './style';

function ScheduledBattles( {schedules} ) {
  return (
    <Container>
      <Table striped bordered hover size="sm" variant="dark">
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
              <td>{capitalize(schedule.challenger.username)}</td>
              <td>{capitalize(schedule.challenged.username)}</td>
              {schedule.challenge_type === 'casual'
                ? <td>Casual</td>
                : <td>{positionNameString(schedule.position)}</td>
              }
              <td>{format(parseISO(schedule.battle_date), 'dd/MM')} {capitalize(format(parseISO(schedule.battle_date), 'iii', { locale: ptBR }))}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}

export default ScheduledBattles;