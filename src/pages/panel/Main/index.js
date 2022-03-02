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
    this.getUser();
  }

  getPokemons() {
    const { getPokemonsRequest } = this.props;
    getPokemonsRequest();
  }

  getUser() {
    const { getUserRequest } = this.props;

    getUserRequest();
  }

  render() {
    const { isLoading, pokemons } = this.props;
    return isLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        {pokemons.length > 0 ? (
          <Row className='p-4 d-flex justify-content-between'>
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                history={this.props.history}
              />
            ))}
          </Row>
        ) : (
          <div className='no-pokemons'>
            <h5 className='text-center text-muted '>
              Você ainda não tem nenhum pokémon. Adquira algum comprando na
              Stream Avatars, ou capturando durante a stream
            </h5>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
  isLoading: state.pokemons.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({...PokemonsActions, ...UserActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
