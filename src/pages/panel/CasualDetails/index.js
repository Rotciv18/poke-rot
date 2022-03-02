import React, { Component } from 'react';

import capitalize from '../../../helpers/capitalize';
import calendarPtLocale from '../../../helpers/calendarPtLocale';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BattlesActions } from '../../../store/ducks/battles';

import { Button } from 'react-bootstrap';
import { CheckSquare } from 'react-bootstrap-icons';
import { Calendar } from "react-multi-date-picker";
import { Container } from './style';

const today = new Date();
const minDate = new Date().setDate(today.getDate() + 2);
const maxDate = new Date().setDate(today.getDate() + 20);

class CasualDetails extends Component {

  state = {
    dates: [],
    lowDatesError: false,
    noTicketError: false
  }

  onCalendarChange(value) {
    this.setState({
      dates: value
    });
  }

  handleInviteBattleClick() {
    const params = new URLSearchParams(this.props.location.search);
    const { history, user } = this.props;
    const { dates } = this.state;
    if (dates.length < 3) {
      this.setState({
        noTicketError: false,
        lowDatesError: true
      });
      return;
    }

    const hasTickets = params.get('challenge_type') === 'casual' ? user.duel_tickets : user.badges;
    if (!hasTickets) {
      this.setState({
        noTicketError: true,
        lowDatesError: false
      });
      return;
    }

    const toDate = dates.map(dt => new Date(`${dt.year}-${dt.month}-${dt.day}`));

    const { sendBattleInvitationRequest } = this.props;
    const position_id = params.get('position_id') ? params.get('position_id') : undefined;

    sendBattleInvitationRequest(
      history,
      params.get('id'),
      params.get('challenge_type'),
      toDate,
      position_id
    );
  }

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const { lowDatesError, noTicketError } = this.state;

    return (
      <Container>
        <span>Marcar uma batalha contra {params.get('display_name')}</span>
        <span>Você irá gastar 1 <span className="text-warning">
          {params.get('challenge_type') === 'casual' ? 'Duel Ticket' : 'Badge'}</span></span>
        <hr className="w-100"></hr>

        {!lowDatesError && !noTicketError
          ? <p className="text-center">Escolha pelo menos 3 dias para disponibilizar a escolha à seu adversário</p>
          : null}

        {lowDatesError
          ? <p className="text-center text-danger">Você deve escolher pelo menos 3 dias!</p>
          : null}

        {noTicketError
          ? <p className="text-center text-danger">Você não tem {params.get('challenge_type') === 'casual' ? 'Duel Ticket' : 'Badge'}s suficiente!</p>
          : null}


        <Calendar locale={calendarPtLocale} multiple onChange={(value) => this.onCalendarChange(value)} minDate={minDate} maxDate={maxDate} />

        <Button onClick={() => this.handleInviteBattleClick()} variant="outline-primary"><CheckSquare size="28px" /></Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.battles.isLoading,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(BattlesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CasualDetails);