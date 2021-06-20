import React, { Component } from 'React';

import { Spinner, Row, Card } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import PokemonCard from './components/PokemonCard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as SetupActions } from '../../../store/ducks/setup';

import { Container } from './style';

class Setup extends Component {

  componentDidMount() {
    this.getSetup();
  }

  getSetup() {
    const { getSetupRequest } = this.props;

    getSetupRequest();
  }

  handleEmptySetupClick() {
    this.props.history.push(`/setup/new`);
  }

  handleRemovePokemonClick = (pokemonId) => {
    const { removeFromSetupRequest } = this.props;

    removeFromSetupRequest(pokemonId);
  }

  render() {
    const { isLoading, pokemons } = this.props;
    const indexes = [0, 1, 2, 3, 4, 5];

    return isLoading ? <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    /> :
      <Container>
        <Row className="p-4 d-flex justify-content-between">
          {indexes.map(i => (
            pokemons[i] ? <PokemonCard handleRemovePokemonClick={this.handleRemovePokemonClick} key={pokemons[i].id} pokemon={pokemons[i]} />
              : <Card onClick={() => this.handleEmptySetupClick()}
                key={i}
                className="d-flex align-items-center justify-content-center hover" 
                style={{ width: '75px', height: '140px', marginBottom: '12px', cursor: 'pointer' }}>
                <PlusSquare className="icon-hover" style={{ fontSize: '24px' }} />
              </Card>
          ))}
        </Row>
      </Container>
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.setup.pokemonList,
  isLoading: state.setup.isLoading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(SetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Setup);