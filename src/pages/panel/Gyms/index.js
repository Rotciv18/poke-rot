import React, { Component } from 'react';

import { Container, SetupContainer } from './style';
import { Button, Row, Col, Collapse } from 'react-bootstrap';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PositionsActions } from '../../../store/ducks/positions';
import { Creators as SetupActions } from '../../../store/ducks/setup';

import capitalize from '../../../helpers/capitalize';
import positionNameString from '../../../helpers/positionNameString';

const noImgUrl = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/215b7342-def9-11e9-9a66-784f43822e80-profile_image-300x300.png';

class Gym extends Component {

  state = {
    openConfirmGetPosition: null
  }

  componentDidMount() {
    this.getSetup();
    this.getPositions();
  }

  getPositions() {
    const { getPositionsRequest } = this.props;

    getPositionsRequest();
  }

  getSetup() {
    const { getSetupRequest, user } = this.props;

    if (user) {
      getSetupRequest();
    } else {
      setTimeout(() => this.getSetup(), 200);
    }
  }

  handleGetPositionClick(id) {
    this.setState({
      openConfirmGetPosition: id
    });
  }

  handleConfirmGetPositionClick(position_id) {
    const { takePositionRequest } = this.props;

    takePositionRequest(position_id);
    this.setState({
      openConfirmGetPosition: null
    });
  }

  render() {

    const { positions, isLoading, user, setupPokemonList } = this.props;
    const { openConfirmGetPosition } = this.state;
    let takeGymError;
    if (setupPokemonList && setupPokemonList.length < 1) {
      takeGymError = 'Você não tem pokemons em seu Setup';
    }
    if (user && user.badges < 1) {
      takeGymError = 'Você não tem Badges suficiente';
    }

    return (
      isLoading || !user ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <Container>
          <List dense={true}>
            {positions.map((position) => (
              <div key={position.id}>
                <ListItem className="listItem">
                  <ListItemAvatar>
                    <Avatar src={position.user ? position.user.img_url : noImgUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    className="listItemText"
                    primary={positionNameString(position)}
                    secondary={position.user ? capitalize(position.user.username) : 'Sem Líder'}
                  />
                  <SetupContainer>
                    <Row xs={2} md={2} lg={2} className={position.user ? "border" : null}>
                      {position.user ? (
                        position.user.setup.pokemons.map(pokemon => (
                          <Col key={pokemon.id} className="pokemonImg">
                            <img title={capitalize(pokemon.name)} src={pokemon.pokemon_data.sprite}></img>
                          </Col>
                        ))
                      ) : null}
                    </Row>
                  </SetupContainer>
                  {position.user && position.user.id !== user.id
                    ? <Button
                      href={`#/casual/details?id=${position.user.id}&username=${position.user.username}&challenge_type=position&position_id=${position.id}`}
                      size="sm">Desafiar</Button>
                    : null}
                  {!position.user ? <Button onClick={() => this.handleGetPositionClick(position.id)} size="sm">Tomar</Button> : null}
                </ListItem>
                <Collapse in={openConfirmGetPosition === position.id}>
                  <div>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span>Gastar 1 <span className="font-weight-bold text-warning">Badge</span> para tomar este ginásio?</span>
                      {user.position
                        ? <span>Você perderá posse de outro ginásio.</span>
                        : null}
                      <div
                        title={takeGymError}
                        className="mt-2 mb-2 w-50"
                      >
                        <Button
                          className="button-tooltip"
                          disabled={takeGymError}
                          onClick={() => this.handleConfirmGetPositionClick(position.id)}>
                          Confirmar!
                        </Button>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </List>
        </Container>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  positions: state.positions.positionsList,
  isLoading: state.positions.isLoading,
  user: state.user.user,
  setupPokemonList: state.setup.pokemonList
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...PositionsActions, ...SetupActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Gym);