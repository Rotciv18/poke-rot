import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BattlesActions } from '../../../store/ducks/battles';

import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';

import BattleInvitation from './components/BattleInvitation';
import SentInvitations from './components/SentInvitations';
import ScheduledBattles from './components/ScheduledBattles';

import { BattleContainer, Container } from './style';

class Battles extends Component {

  componentDidMount() {
    this.getBattles();
  }

  getBattles() {
    const { user, getUserBattlesRequest } = this.props;

    if (user) {
      getUserBattlesRequest();
    } else {
      setTimeout(() => this.getBattles(), 200);
    }
  }

  render() {

    const { invitations, sentInvitations, schedules, allSchedules, isLoading, user, scheduleBattleRequest } = this.props;

    return (

      isLoading ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <Container className="d-flex align-items-center flex-column">

        
          {invitations.length > 0 ?
            <>
              <span>Desafios em Espera</span>
              <BattleContainer>
                {invitations.map(invitation => (
                  <BattleInvitation key={invitation.id} className="mb-8"
                    invitation={invitation}
                    scheduleBattleRequest={scheduleBattleRequest}
                    user={user} />
                ))}
              </BattleContainer>
            </> : null}

          {sentInvitations.length > 0 ?
            <>
              <span className="mt-2">Desafios Enviados</span>
              <BattleContainer>
                <SentInvitations invitations={sentInvitations} />
              </BattleContainer>
            </> : null}

          { schedules.length > 0 ?
            <>
              <span className="mt-2">Minhas Batalhas Marcadas</span>
              <BattleContainer>
                <ScheduledBattles schedules={schedules} />
              </BattleContainer>
            </> : null }
            { allSchedules.length > 0 ?
            <>
              <span className="mt-2">Outras Batalhas Marcadas</span>
              <BattleContainer>
                <ScheduledBattles schedules={allSchedules} />
              </BattleContainer>
            </> : null }
        </Container>
      )
    );
  }

}

const mapStateToProps = (state) => ({
  schedules: state.battles.battleSchedules,
  invitations: state.battles.battleInvitations,
  sentInvitations: state.battles.sentInvitations,
  allSchedules: state.battles.allSchedules,
  isLoading: state.battles.isLoading,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(BattlesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
