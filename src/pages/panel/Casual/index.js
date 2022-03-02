import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AvailableBattleActions } from '../../../store/ducks/availableBattles';
import { Creators as SetupActions } from '../../../store/ducks/setup';

import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';
import { Button } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

const styles = (theme) => {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  };
};

class Casual extends Component {
  componentDidMount() {
    this.getAvailableBattleUsers();
    this.getSetup();
  }

  getSetup() {
    const { getSetupRequest } = this.props;

    getSetupRequest();
  }

  getAvailableBattleUsers() {
    const { user, getAvailableBattleUsersRequest } = this.props;

    if (user) {
      getAvailableBattleUsersRequest(20);
    } else {
      setTimeout(() => this.getAvailableBattleUsers(), 200);
    }
  }

  render() {
    const { classes, availableBattleUsers, isAvailableBattlesLoading, isSetupLoading, pokemonSetupList, user } = this.props;
    let casualBattleError;

    if (pokemonSetupList && pokemonSetupList.length < 1) {
      casualBattleError = 'Você não tem pokemons em seu Setup para batalhar';
    } else if (user.level < 5) {
      casualBattleError = 'Você está muito fraco ainda para batalhar alguém...';
    }

    const isLoading = isAvailableBattlesLoading || isSetupLoading;

    if (isLoading) {
      return (
        <LoadingContainer className='d-flex justify-content-center align-items-center'>
          <Spinner animation='border' role='status' />
        </LoadingContainer>
      );
    } else if (availableBattleUsers.length < 1) {
      return (
        <div style={{ height: '300px' }} className="d-flex align-items-center flex-column justify-content-center">
          <h5 className="text-muted text-center">Não encontramos ninguém para você batalhar</h5>
          <h5 className="text-muted text-center">Talvez você esteja muito mais forte ou muito mais fraco que os outros...</h5>
          <h5 className="text-muted text-center">Certifique-se de que você está com pelo menos 1 pokémon em seu setup e ele seja lvl 5 ou maior</h5>
        </div>
      );
    } else {
      return (
        <List dense className={classes.root}>
          {availableBattleUsers.map((user) => {
            const labelId = `checkbox-list-secondary-label-${user.id}`;
            return (
              <ListItem key={labelId} button>
                <ListItemAvatar>
                  <Avatar src={user.img_url} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.display_name} />
                <ListItemSecondaryAction>
                  <div
                    title={casualBattleError}
                    className=""
                  >
                    <Button
                      href={`#/casual/details?id=${user.id}&display_name=${user.display_name}&challenge_type=casual`}
                      className="button-tooltip"
                      disabled={casualBattleError}
                    >
                      Batalhar!
                    </Button>
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  availableBattleUsers: state.availableBattles.availableBattleUsers,
  user: state.user.user,
  isAvailableBattlesLoading: state.availableBattles.isLoading,
  pokemonSetupList: state.setup.pokemonList,
  isSetupLoading: state.setup.isLoading
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AvailableBattleActions, ...SetupActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Casual));
