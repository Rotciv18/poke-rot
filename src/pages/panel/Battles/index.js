import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BattlesActions } from '../../../store/ducks/battles';

import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';

import BattleInvitations from './components/BattleInvitations';

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

    const { invitations, schedules, allSchedules, isLoading, user, scheduleBattleRequest } = this.props;

    return (

      isLoading ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <Container className="d-flex align-items-center flex-column">
          <span>Desafios em Espera</span>
          <BattleContainer>
            {invitations.map(invitation => (
              <BattleInvitations key={invitation.id} className="mb-8" 
              invitation={invitation} 
              scheduleBattleRequest={scheduleBattleRequest} 
              user={user}/>
            ))}
          </BattleContainer>
        </Container>
      )

    );
  }

}

const mapStateToProps = (state) => ({
  schedules: state.battles.battleSchedules,
  invitations: state.battles.battleInvitations,
  allSchedules: state.battles.allSchedules,
  isLoading: state.battles.isLoading,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(BattlesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
