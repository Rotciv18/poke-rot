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
    lowDatesError: false
  }

  onCalendarChange(value) {
    this.setState({
      dates: value
    });
  }

  handleInviteBattleClick() {
    const params = new URLSearchParams(this.props.location.search);
    const { history } = this.props;
    const { dates } = this.state;
    if (dates.length < 3) {
      this.setState({
        lowDatesError: true
      });
      return;
    }

    const toDate = dates.map(dt => new Date(`${dt.year}-${dt.month}-${dt.day}`));

    const { sendBattleInvitationRequest } = this.props;
    sendBattleInvitationRequest(
      history,
      params.get('id'),
      'casual',
      toDate
    );
  }

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const { lowDatesError } = this.state;

    return (
      <Container>
        <span>Marcar uma batalha contra {capitalize(params.get('username'))}</span>
        <span>Você irá gastar 1 <span className="text-warning">Duel Ticket</span></span>
        <hr className="w-100"></hr>
        {lowDatesError
          ? <p className="text-center text-danger">Você deve escolher pelo menos 3 dias!</p>
          : <p className="text-center">Escolha pelo menos 3 dias para disponibilizar a escolha à seu adversário</p>}
        <Calendar locale={calendarPtLocale} multiple onChange={(value) => this.onCalendarChange(value)} minDate={minDate} maxDate={maxDate} />

        <Button onClick={() => this.handleInviteBattleClick()} variant="outline-primary"><CheckSquare size="28px" /></Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.battles.isLoading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(BattlesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CasualDetails);