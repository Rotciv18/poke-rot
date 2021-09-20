import React, { Component } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { Container, LoadingContainer } from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonsActions } from '../../../store/ducks/pokemons';
import { Creators as UserActions } from '../../../store/ducks/user';
import PokemonCard from './components/PokemonCard';

class Main extends Component {

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons() {
    const { auth, getPokemonsRequest, getUserRequest } = this.props;

    if (auth) {
      getPokemonsRequest();
      getUserRequest();
    } else {
      setTimeout(() => this.getPokemons(), 200);
    }
  }

  render() {
    const { isLoading, pokemons, error } = this.props;
    if (!error) {
      return (
        isLoading ? <LoadingContainer className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
        </LoadingContainer> : (
          <Container>
            <Row className="p-4 d-flex justify-content-between" >
              {pokemons.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} history={this.props.history} />
              ))}
            </Row>
          </Container>
        )
      );
    } else {
      return (
        <>
          <h1 className="text-center">Não conseguimos carregar seus dados</h1>
          <h6 className="text-center">É novo por aqui? Aguarde pelo menos 5 minutos e tente recarregar a página para que seu cadastro seja feito</h6>
          <h6 className="text-center mt-4">Procure desativar quaisquer bloqueadores de anúncio no seu navegador, por favor</h6>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
  isLoading: state.pokemons.isLoading,
  error: state.pokemons.error,
  auth: state.twitchAuth.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...PokemonsActions, ...UserActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
