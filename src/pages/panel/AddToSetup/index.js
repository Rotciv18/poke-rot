import React, { Component } from 'react';

import { LoadingContainer } from '../Main/style';
import PokemonCard from './components/PokemonCard';

import { Row, Spinner } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonsActions } from '../../../store/ducks/pokemons';
import { Creators as SetupActions } from '../../../store/ducks/setup';

import { Container } from './style';

class AddToSetup extends Component {

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons() {
    const { auth, getPokemonsRequest } = this.props;

    if (auth) {
      getPokemonsRequest('?setup=false');
    } else {
      setTimeout(() => this.getPokemons(), 200);
    }
  }

  handleAddToSetupClick = (pokemonId) => {
    const { addToSetupRequest, history } = this.props;

    addToSetupRequest(pokemonId, history);
  }

  render() {

    const { isLoading, pokemons } = this.props;

    return (
      isLoading ? <LoadingContainer className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
      </LoadingContainer> : (
        <Container>
          <h5>Escolha um pokemon para adicionar ao Setup</h5>
          <Row className="p-4 d-flex justify-content-between" >
            {pokemons.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} handleAddToSetupClick={this.handleAddToSetupClick} />
            ))}
          </Row>
        </Container>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
  isLoading: state.pokemons.isLoading,
  auth: state.twitchAuth.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...PokemonsActions, ...SetupActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddToSetup);