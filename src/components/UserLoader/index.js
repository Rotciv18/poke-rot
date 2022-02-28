import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as UserActions } from '../../store/ducks/user';
import { Creators as AuthActions } from '../../store/ducks/twitchAuth';

import Header from "../Header";
import PanelRoutes from '../../routes/panel';
import DefaultErrorMessage from './components/DefaultErrorMessage';
import { LoadingContainer } from '../../pages/panel/Main/style';

import { Spinner, Button } from 'react-bootstrap';

class UserLoader extends Component {

  state = {
    isLinked: window.Twitch.ext.viewer.isLinked
  }

  componentDidMount() {
    this.getAuth();
    this.checkIsLinked();
  }

  checkIsLinked() {
    if (!window.Twitch.ext.viewer.isLinked) {
      setTimeout(() => this.checkIsLinked(), 200);
    } else {
      this.setState({
        isLinked: true
      });
    }
  }

  requestIdShare() {
    window.Twitch.ext.actions.requestIdShare();
  }

  getAuth() {
    const { auth, getAuthRequest } = this.props;

    if (!auth && window.Twitch.ext) {
      const authorized = window.Twitch.ext.onAuthorized((onAuth) => {
        getAuthRequest(onAuth.token, onAuth.userId);
      });

      if (!authorized) {
        setTimeout(() => this.getAuth(), 200);
      } else {
        getUserRequest();
      }
    } else if (!auth) {
      setTimeout(() => this.getAuth(), 200);
    }
  }

  render() {
    const { user, error, userError } = this.props;
    const { isLinked } = this.state;

    if (error) {
      return (
        <DefaultErrorMessage />
      );
    } else if (!isLinked) {
      return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <h1 className='text-center'>
            A extensão precisa acessar seu ID da twitch
          </h1>
          <Button onClick={() => this.requestIdShare()}>
            Clica aqui para conceder permissões
          </Button>
          <Button onClick={() => console.log(isLinked)}>oie</Button>
        </div>
      );
    } else if (!user) {
      return (
        <LoadingContainer className='d-flex justify-content-center align-items-center flex-column'>
          <h1>Carregando dados...</h1>
          <Spinner animation='border' role='status' />
        </LoadingContainer>
      );
    } else if (!userError) {
      return (
        <>
          <Header />
          <PanelRoutes />
        </>
      );
    } else {
      return (
        <DefaultErrorMessage />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.twitchAuth.auth,
  error: state.twitchAuth.error,
  userError: state.user.error,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AuthActions, ...UserActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserLoader);