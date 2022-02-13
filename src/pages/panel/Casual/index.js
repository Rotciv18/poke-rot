import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AvailableBattleActions } from '../../../store/ducks/availableBattles';

import capitalize from '../../../helpers/capitalize';

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
    const { classes, availableBattleUsers, isLoading } = this.props;
    return isLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : availableBattleUsers.length > 0 ? (
      <List dense className={classes.root}>
        {availableBattleUsers.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user.id}`;
          return (
            <ListItem key={labelId} button>
              <ListItemAvatar>
                <Avatar src={user.img_url} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={capitalize(user.username)} />
              <ListItemSecondaryAction>
                <Button
                  href={`#/casual/details?id=${user.id}&username=${user.username}&challenge_type=casual`}
                >
                  Batalhar
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    ) : (
      <div style={{height: '300px'}} className="d-flex align-items-center flex-column justify-content-center">
        <h5 className="text-muted text-center">Não encontramos ninguém para você batalhar</h5>
        <h5 className="text-muted text-center">Certifique-se de que você está com pelo menos 1 pokémon em seu setup e ele seja lvl 5 ou maior</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availableBattleUsers: state.availableBattles.availableBattleUsers,
  user: state.user.user,
  isLoading: state.availableBattles.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AvailableBattleActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Casual));
