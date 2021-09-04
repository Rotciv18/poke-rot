import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BattlesActions } from '../../../store/ducks/battles';

import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';

// import { Container } from './style';

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

    const { invitations, schedules, isLoading } = this.props;

    return (

      isLoading ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <button type="button" onClick={() => console.log(invitations, schedules)}>oieee</button>
      )

    );
  }

}

const mapStateToProps = (state) => ({
  schedules: state.battles.battleSchedules,
  invitations: state.battles.battleInvitations,
  isLoading: state.battles.isLoading,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(BattlesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
