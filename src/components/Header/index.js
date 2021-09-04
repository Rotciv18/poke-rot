import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Container, PokeRotContainer } from './styles';

import capitalize from '../../helpers/capitalize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthActions } from '../../store/ducks/twitchAuth';

const pokePointsImg = "https://www.pngfind.com/pngs/b/102-1028650_pokemon-logo-png.png";
const pokeballImg = "https://www.clipartmax.com/png/full/129-1298222_%C2%A0-pokeball-png.png";
const greatballImg = "https://i.pinimg.com/originals/0f/ec/7a/0fec7a6bec3984714aa33478b5d2f6ec.png";
const ultraballImg = "https://www.pinclipart.com/picdir/big/84-843046_pokeball-clip-art.png";
const duelTicketImg = "https://www.clipartmax.com/png/full/91-918286_rectangle-clipart.png";
const badgeImg = "https://www.pikpng.com/pngl/b/31-313648_boulder-png.png";

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
    const { user } = this.props;
    return (
      <>
        <PokeRotContainer>
          <div>
            <a href="#/">Poke-Rot</a>
            {user ? <span>{capitalize(user.username)}</span> : ''}
          </div>


          {user ?
            <div>
              <div className="d-flex flex-row align-items-center text-right">
                <img title="PokePoints" src={pokePointsImg}></img>
                <span className="ml-1">{user.points}</span>
                <img title="Duel Tickets" className="ml-4" src={duelTicketImg}></img>
                <span className="ml-1">{user.duel_tickets}</span>
                <img title="Badges" className="ml-4" src={badgeImg}></img>
                <span className="ml-1">{user.badges}</span>
              </div>
              <div className="d-flex flex-row align-items-center">
                <img title="Pokeballs" src={pokeballImg}></img>
                <span className="ml-1">{user.pokeballs}</span>
                <img title="Great Balls" className="ml-4" src={greatballImg}></img>
                <span className="ml-1">{user.great_balls}</span>
                <img title="Ultra Balls" className="ml-4" src={ultraballImg}></img>
                <span className="ml-1">{user.ultra_balls}</span>
              </div>
            </div>
            : ''}


        </PokeRotContainer>

        <Container>
          <Nav fill variant="tabs" defaultActiveKey="#/" justify>

            <Nav.Item>
              <Nav.Link href="#/">Pokémons</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="#/battles">Batalhas</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="#/test">Ginásios</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="#/setup">Setup</Nav.Link>
            </Nav.Item>

          </Nav>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.twitchAuth.auth,
  user: state.user.user,
  isUserLoading: state.user.isLoading
});

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);