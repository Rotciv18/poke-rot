import React, { Component } from 'react';

import { Container, SetupContainer } from './style';
import { Button, Row, Col } from 'react-bootstrap';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../Main/style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PositionsActions } from '../../../store/ducks/positions';

import capitalize from '../../../helpers/capitalize';
import positionNameString from '../../../helpers/positionNameString';

const noImgUrl = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/215b7342-def9-11e9-9a66-784f43822e80-profile_image-300x300.png';

class Gym extends Component {

  componentDidMount() {
    this.getPositions();
  }

  getPositions() {
    const { getPositionsRequest } = this.props;

    getPositionsRequest();
  }

  render() {

    const { positions, isLoading, user } = this.props;
    return (
      isLoading || !user ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <Container>
          <List dense={true}>
            {positions.map((position) => (
              <ListItem className="listItem" key={position.id}>
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
                    href={`#/casual/details?id=${user.id}&username=${user.username}&position_id=${position.id}`}
                    size="sm">Desafiar</Button>
                  : null}
                {!position.user ? <Button onClick={() => console.log(positions)} size="sm">Tomar</Button> : null}
              </ListItem>
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
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PositionsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Gym);