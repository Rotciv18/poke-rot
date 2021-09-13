import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokeballsActions } from '../../../../../store/ducks/pokeballs';

import Pokeball from '../../../../../images/pokeball.png';
import Greatball from '../../../../../images/greatball.png';
import Ultraball from '../../../../../images/ultraball.png';
import PokePoints from '../../../../../images/pokepoints.png';

import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../../../Main/style';
import { Row, Card, Button } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import { Container } from './style';

class PokeballsList extends Component {
  state = {
    pokeballs: 0,
    greatballs: 0,
    ultraballs: 0,
    cost: 0,
    noPointsError: false,
  };

  componentDidMount() {
    this.getPokeballsList();
  }

  getPokeballsList = async () => {
    const { getPokeballsListRequest } = this.props;

    getPokeballsListRequest();
  };

  handleAddClick(value) {
    this.setState(
      {
        [value]: this.state[value] + 1,
      },
      () => this.updateCost()
    );
  }

  handleRemoveClick(value) {
    this.setState(
      {
        [value]: Math.max(this.state[value] - 1, 0),
      },
      () => this.updateCost()
    );
  }

  updateCost() {
    const { pokeballsList } = this.props;
    const cost = pokeballsList.reduce((previous, current) => {
      return previous.price
        ? previous.price * this.state[previous.name] +
        current.price * this.state[current.name]
        : current.price * this.state[current.name] + previous;
    });

    this.setState({
      cost,
      noPointsError: false,
    });
  }

  pokeballImage(pokeball) {
    switch (pokeball) {
      case 'pokeballs':
        return Pokeball;

      case 'greatballs':
        return Greatball;

      case 'ultraballs':
        return Ultraball;
    }
  }

  handleBuyButton() {
    const { user, buyPokeballsRequest } = this.props;
    const { pokeballs, greatballs, ultraballs, cost } = this.state;

    if (user.points < cost) {
      this.setState({
        noPointsError: true,
      });
      return;
    }

    buyPokeballsRequest(pokeballs, greatballs, ultraballs);
    this.setState({
      pokeballs: 0,
      greatballs: 0,
      ultraballs: 0
    });
  }

  render() {
    const { cost, noPointsError } = this.state;
    const { isPokeballsLoading, pokeballsList } = this.props;
    return isPokeballsLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        <Row className='p-4 d-flex justify-content-between'>
          {pokeballsList.map((pokeball) => (
            <div
              key={pokeball.id}
              style={{
                width: '90px',
                marginBottom: '12px',
                padding: '0px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '6px',
              }}
            >
              <Card
                className='card'
                style={{
                  width: '90px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  padding: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '6px',
                }}
              >
                <img
                  className='itemImg'
                  src={this.pokeballImage(pokeball.name)}
                ></img>
                <span className='text-center'>{pokeball.name}</span>
                <div className='d-flex align-items-center'>
                  <img
                    className='pokePoints'
                    title='PokePoints'
                    src={PokePoints}
                  ></img>
                  <span className='ml-1'>{pokeball.price}</span>
                </div>
              </Card>
              <div className='d-flex align-items-center'>
                <IconButton
                  onClick={() => this.handleRemoveClick(pokeball.name)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '45px',
                  }}
                >
                  <Remove fontSize='small' />
                </IconButton>
                <span className='ml-1 mr-1'>{this.state[pokeball.name]}</span>
                <IconButton
                  onClick={() => this.handleAddClick(pokeball.name)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '45px',
                  }}
                >
                  <Add fontSize='small' />
                </IconButton>
              </div>
            </div>
          ))}
        </Row>
        <div className='buyButtonContainer'>
          <Button
            disabled={!cost}
            onClick={() => this.handleBuyButton()}
            className='mt-1 w-50'
          >
            Comprar
          </Button>
          {noPointsError ? (
            <span className='mt-1 text-danger'>
              Você não tem PokePoints suficiente!
            </span>
          ) : (
            <div className='mt-1 d-flex align-items-center'>
              <img className='pokePoints mr-1' src={PokePoints} />
              <span>Total: {cost}</span>
            </div>
          )}
        </div>
      </Container >
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PokeballsActions, dispatch);

const mapStateToProps = (state) => ({
  user: state.user.user,
  pokeballsList: state.pokeballs.pokeballsList,
  isPokeballsLoading: state.pokeballs.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeballsList);
