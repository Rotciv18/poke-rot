import React, { Component } from 'react';

import Pokeball from '../../images/pokeball.png';
import Greatball from '../../images/greatball.png';
import Ultraball from '../../images/ultraball.png';
import PokePoints from '../../images/pokepoints.png';
import { Nav } from 'react-bootstrap';
import { Container, PokeRotContainer } from './styles';

import capitalize from '../../helpers/capitalize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthActions } from '../../store/ducks/twitchAuth';

const duelTicketImg =
  'https://www.clipartmax.com/png/full/91-918286_rectangle-clipart.png';
const badgeImg = 'https://www.pikpng.com/pngl/b/31-313648_boulder-png.png';

class Header extends Component {
  state = {
    ref: '#/',
  };

  componentDidMount() {
    this.getAuth();
  }

  changeRef(ref) {
    this.setState({
      ref,
    });
  }

  getAuth() {
    const { auth, getAuthRequest } = this.props;

    if (!auth && window.Twitch.ext) {
      const authorized = window.Twitch.ext.onAuthorized((onAuth) => {
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
    const { user, error } = this.props;
    const { ref } = this.state;
    if (!error) {
      return (
        <>
          <PokeRotContainer>
            <div>
              <a onClick={() => this.changeRef('#/')} href='#/'>
                Poke-Rot
              </a>
              {user ? <span>{capitalize(user.username)}</span> : ''}
            </div>

            {user ? (
              <div>
                <div className='d-flex flex-row align-items-center'>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img title='PokePoints' src={PokePoints}></img>
                    <span className='ml-1'>{user.points}</span>
                  </div>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img
                      title='Duel Tickets'
                      className='ml-4'
                      src={duelTicketImg}
                    ></img>
                    <span className='ml-1'>{user.duel_tickets}</span>
                  </div>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img title='Badges' className='ml-4' src={badgeImg}></img>
                    <span className='ml-1'>{user.badges}</span>
                  </div>
                </div>
                <div className='d-flex flex-row align-items-center'>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img title='Pokeballs' src={Pokeball}></img>
                    <span className='ml-1'>{user.pokeballs}</span>
                  </div>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img
                      title='Great Balls'
                      className='ml-4'
                      src={Greatball}
                    ></img>
                    <span className='ml-1'>{user.great_balls}</span>
                  </div>
                  <div className='d-flex flex-row align-items-center header-item-container'>
                    <img
                      title='Ultra Balls'
                      className='ml-4'
                      src={Ultraball}
                    ></img>
                    <span className='ml-1'>{user.ultra_balls}</span>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </PokeRotContainer>

          <Container>
            <Nav fill variant='tabs' defaultActiveKey='#/' justify>
              <Nav.Item>
                <Nav.Link
                  active={ref === '#/'}
                  onClick={() => this.changeRef('#/')}
                  className='navLink'
                  href='#/'
                >
                  Pokémons
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  active={ref === '#/battles'}
                  onClick={() => this.changeRef('#/battles')}
                  className='navLink'
                  href='#/battles'
                >
                  Batalhas
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  active={ref === '#/test'}
                  onClick={() => this.changeRef('#/test')}
                  className='navLink'
                  href='#/gyms'
                >
                  Ginásios
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  active={ref === '#/setup'}
                  onClick={() => this.changeRef('#/setup')}
                  className='navLink'
                  href='#/setup'
                >
                  Setup
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  active={ref === '#/casual'}
                  onClick={() => this.changeRef('#/casual')}
                  className='navLink'
                  href='#/casual'
                >
                  Casual
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  active={ref === '#/shop'}
                  onClick={() => this.changeRef('#/shop')}
                  className='navLink'
                  href='#/shop'
                >
                  Shop
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </>
      );
    } else {
      return <button onClick={() => console.log(error)}></button>;
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.twitchAuth.auth,
  error: state.twitchAuth.error,
  user: state.user.user,
  isUserLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
