import React, { Component } from 'react';

import { Table, Collapse, Row, Col, Button } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

import { Container } from './style';

import capitalize from '../../../../../helpers/capitalize';
import positionNameString from '../../../../../helpers/positionNameString';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class BattleInvitation extends Component {

  state = {
    open: false,
    selectedDate: null,
    selectedInvitation: null
  }

  setOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  selectDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  scheduleBattle() {
    const { selectedDate } = this.state;
    const { scheduleBattleRequest, invitation } = this.props;

    if (!selectedDate) {
      return;
    }

    scheduleBattleRequest(selectedDate, invitation.id);
  }

  render() {
    const { open, selectedDate } = this.state;
    const { invitation, user } = this.props;
    return (<Container>
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Desafiante</th>
            <th>Desafiado</th>
            <th>Tipo de Batalha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{capitalize(invitation.challenger.username)}</td>
            <td>{capitalize(invitation.challenged.username)}</td>
            {invitation.challenge_type === 'casual'
              ? <td>Casual</td>
              : <td>{positionNameString(invitation.position)}</td>
            }
          </tr>
        </tbody>
      </Table>
      {user.id === invitation.challenged.id ? (<>
        <Collapse in={open} className="pl-2 pr-2">
          <div>
            <span className="smallMessage ml-3">Selecione um horário para aceitar a batalha!</span>
            <Row xs={3} md={3} lg={3}>
              {invitation.challenger_available_dates.map((date, index) => (
                <Col key={index} className="mt-2">
                  <Button onClick={() => this.selectDate(date)} variant={selectedDate === date ? "secondary" : "outline-secondary"} size="sm" >
                    {format(parseISO(date), 'dd/MM')} {capitalize(format(parseISO(date), 'iii', { locale: ptBR }))}
                  </Button>
                </Col>
              ))}
            </Row>
            <Row xs={1} md={1} lg={1} className="mt-4 mb-2">
              <Col className="scheduleButton">
                <Button onClick={() => this.scheduleBattle()} disabled={!selectedDate ? true : false}>Marcar Batalha!</Button>
              </Col>
            </Row>
          </div>
        </Collapse>
        <a onClick={() => this.setOpen()} className="collapseButton">
          {open ? <CaretUpFill /> : <CaretDownFill />}
        </a>
      </>) : ''}
    </Container>);
  }
}

export default BattleInvitation;