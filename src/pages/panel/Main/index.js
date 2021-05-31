import React, { Component } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { Container, LoadingContainer } from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonsActions } from '../../../store/ducks/pokemons';
import PokemonCard from './components/PokemonCard';

class Main extends Component {

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons() {
    const { auth, getPokemonsRequest } = this.props;

    if (auth) {
      getPokemonsRequest();
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
                <PokemonCard key={pokemon.id} pokemon={pokemon} history={this.props.history}/>
              ))}
            </Row>
          </Container>
        )
      );
    } else {
      return (
        <h1>Um erro ocorreu :(</h1>
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

const mapDispatchToProps = (dispatch) => bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
