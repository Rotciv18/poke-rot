import React, { Component } from 'react';

import capitalize from '../../../../../helpers/capitalize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as StonesActions } from '../../../../../store/ducks/stones';

import PokePoints from '../../../../../images/pokepoints.png';
import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from '../../../Main/style';
import { Row, Card } from 'react-bootstrap';
import { Container } from './style';

import WaterStone from '../../../../../images/water_stone.png';
import ThunderStone from '../../../../../images/thunder_stone.png';
import FireStone from '../../../../../images/fire_stone.png';

class StonesList extends Component {
  componentDidMount() {
    this.getStones();
  }

  getStones() {
    const { getStonesListRequest } = this.props;

    getStonesListRequest();
  }

  goToEvolvePokemonPage(stone, stoneId) {
    const { history } = this.props;

    history.push(`/pokemons/evolve?stone=${stone}&stoneId=${stoneId}`);
  }

  getStoneImage(stoneName) {
    switch (stoneName) {
      case 'water-stone':
        return WaterStone;
    
      case 'fire-stone':
        return FireStone;

      case 'thunder-stone':
        return ThunderStone;

      default:
        return null;
    }
  }
  render() {
    const { isLoading, stonesList } = this.props;

    return isLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        <Row className='p-4 d-flex justify-content-between'>
          {stonesList.map((stone) => (
            <div
              key={stone.id}
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
                onClick={() => this.goToEvolvePokemonPage(stone.name, stone.id)}
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
                  src={this.getStoneImage(stone.name)}
                ></img>
                <span className='text-center'>{capitalize(stone.name.replace('-stone', ''))}</span>
                <div className='d-flex align-items-center'>
                  <img
                    className='pokePoints'
                    title='PokePoints'
                    src={PokePoints}
                  ></img>
                  <span className='ml-1'>{stone.price}</span>
                </div>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  stonesList: state.stones.stonesList,
  isLoading: state.stones.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(StonesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StonesList);
