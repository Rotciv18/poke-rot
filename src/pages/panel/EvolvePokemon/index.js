import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonsActions } from '../../../store/ducks/pokemons';
import { Creators as PokemonActions } from '../../../store/ducks/pokemon';

import capitalize from '../../../helpers/capitalize';

import { Row, Spinner } from 'react-bootstrap';
import { Container, LoadingContainer } from './style';
import PokemonCard from './PokemonCard';
import { Button } from 'react-bootstrap';
import WarningMessage from '../PokemonDetails/components/WarningMessage';

class EvolvePokemon extends Component {
  state = {
    selectedPokemon: null,
  };

  componentDidMount() {
    this.getPokemons();
  }

  componentWillUnmount() {
    const { cleanEvolveError } = this.props;

    cleanEvolveError();
  }

  hasOneString(hasOne) {
    switch (hasOne) {
      case 'battle_schedule':
        return 'Você tem batalhas marcadas com este pokemon no setup!';

      case 'battle_invitation':
        return 'Você tem um desafio pendente com este pokemon no setup!';

      case 'position':
        return 'Você está em um ginásio com este pokemon no setup!';
    }
  }

  getPokemons() {
    const params = new URLSearchParams(this.props.location.search);
    const { getPokemonsRequest } = this.props;

    getPokemonsRequest(`?evolvesWithStone=${params.get('stone')}`);
  }

  handleSelectPokemon = (pokemonId) => {
    this.setState({
      selectedPokemon: pokemonId,
    });
  };

  handleEvolvePokemon = (params) => {
    const { evolvePokemonRequest, history } = this.props;
    const { selectedPokemon } = this.state;
    const urlParams = new URLSearchParams(this.props.location.search);

    evolvePokemonRequest(
      selectedPokemon,
      urlParams.get('stoneId'),
      params,
      history
    );
  };

  render() {
    const { isPokemonsLoading, isPokemonLoading, pokemonsList, evolveError } =
      this.props;
    const { selectedPokemon } = this.state;

    return isPokemonsLoading || isPokemonLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        <Row className='p-4 d-flex justify-content-between'>
          {pokemonsList.map((pokemon) => (
            <PokemonCard
              className='card'
              key={pokemon.id}
              pokemon={pokemon}
              selected={pokemon.id === selectedPokemon}
              handleSelectPokemon={this.handleSelectPokemon}
            />
          ))}
        </Row>
        <div className='d-flex justify-content-center'>
          <Button
            onClick={() => this.handleEvolvePokemon()}
            disabled={!selectedPokemon}
          >
            Evoluir
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          {evolveError.noPoints ? (
            <WarningMessage
              color='red'
              bold={true}
              message={`Você não tem pontos o suficiente para um level up.`}
            ></WarningMessage>
          ) : null}

          {evolveError.hasOne ? (
            <WarningMessage
              color='red'
              bold={true}
              className='font-bold'
              message={this.hasOneString(evolveError.hasOne)}
            ></WarningMessage>
          ) : null}

          {evolveError.forgetToLearn ? (
            <div className='d-flex flex-column align-items-center'>
              <WarningMessage
                color='orange'
                bold={true}
                message={`${capitalize(
                  pokemonsList.find((pkmn) => pkmn.id === selectedPokemon).name
                )} está tentando aprender ${capitalize(
                  evolveError.forgetToLearn
                )},
            mas não pode aprender mais de 4 habilidades. Deseja esquecer alguma para aprender?`}
              ></WarningMessage>

              <div className='d-flex justify-content-between'>
                {pokemonsList
                  .find((pkmn) => pkmn.id === selectedPokemon)
                  .moves.map((move) => (
                    <Button
                      key={move.name}
                      style={{ fontSize: '12px' }}
                      className='mr-2'
                      size='sm'
                      onClick={() =>
                        this.handleEvolvePokemon(`?deleteMove=${move.name}`)
                      }
                    >
                      {capitalize(move.name)}
                    </Button>
                  ))}
              </div>

              <Button
                style={{ fontSize: '14px', marginTop: '6px' }}
                onClick={() => this.handleEvolvePokemon(`?deleteMove=none`)}
                size='sm'
              >
                Não aprender {capitalize(evolveError.forgetToLearn)}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isPokemonsLoading: state.pokemons.isLoading,
  isPokemonLoading: state.pokemon.isLoading,
  pokemonsList: state.pokemons.pokemonList,
  evolveError: state.pokemon.evolveError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...PokemonsActions, ...PokemonActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EvolvePokemon);
