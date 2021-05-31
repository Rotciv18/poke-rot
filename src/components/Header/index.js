import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Container } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthActions } from '../../store/ducks/twitchAuth';

class Header extends Component {

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    const { auth, getAuthRequest } = this.props;

    if (!auth && window.Twitch.ext) {
      const authorized = window.Twitch.ext.onAuthorized(onAuth => {
        getAuthRequest(onAuth.token, onAuth.userId);
      });

      if (!authorized) {
        setTimeout(() => this.getAuth(), 200);
      }
    } else if (!auth) {
      setTimeout(() => this.getAuth(), 200);
    }
  }

  render() {
    return (
      <Container>
        <Nav variant="tabs" defaultActiveKey="#/" justify>

          <Nav.Item>
            <Nav.Link href="#/">Pokémons</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="#/battles">Batalhas</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="#/test">Ginásios</Nav.Link>
          </Nav.Item>

        </Nav>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.twitchAuth.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);