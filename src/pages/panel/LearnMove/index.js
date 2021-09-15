import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonsActions } from '../../../store/ducks/pokemons';
import { Creators as PokemonActions } from '../../../store/ducks/pokemon';
import capitalize from '../../../helpers/capitalize';

import PokemonCard from './components/PokemonCard';
import { Row, Spinner, Button } from 'react-bootstrap';
import WarningMessage from '../PokemonDetails/components/WarningMessage';
import { Container, LoadingContainer } from './style';

class LearnMove extends Component {
  state = {
    selectedPokemon: null,
    selectedPokemonName: null,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    const { getPokemonsRequest } = this.props;
    getPokemonsRequest('?canLearn=' + params.get('moveName'));
  }

  componentWillUnmount() {
    const { cleanLearnMoveError } = this.props;

    cleanLearnMoveError();
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

  handleSelectPokemon = (pokemonId, pokemonName) => {
    this.setState({
      selectedPokemon: pokemonId,
      selectedPokemonName: pokemonName,
    });
  };

  handleLearnMove(params) {
    const urlParams = new URLSearchParams(this.props.location.search);
    const { selectedPokemon } = this.state;
    const { learnMoveRequest, history } = this.props;

    learnMoveRequest(urlParams.get('moveId'), selectedPokemon, params, history);
  }

  render() {
    const { pokemonList, isPokemonsLoading, isPokemonLoading, learnMoveError } =
      this.props;
    const { selectedPokemon, selectedPokemonName } = this.state;
    const params = new URLSearchParams(this.props.location.search);

    return isPokemonsLoading || isPokemonLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        <Row className='p-4 d-flex justify-content-between'>
          {pokemonList.map((pokemon) => (
            <PokemonCard
              className='card'
              key={pokemon.id}
              pokemon={pokemon}
              selected={pokemon.id === selectedPokemon}
              handleSelectPokemon={this.handleSelectPokemon}
            />
          ))}
          {pokemonList.length < 1 ? (
            <span className='text-center'>
              Você não tem pokemons que possam aprender{' '}
              {capitalize(params.get('moveName'))}
            </span>
          ) : null}
        </Row>
        <div className='d-flex justify-content-center'>
          <Button
            onClick={() => this.handleLearnMove()}
            disabled={!selectedPokemon}
          >
            Aprender {capitalize(params.get('moveName'))}
          </Button>
        </div>

        <div className='d-flex justify-content-center'>
          {learnMoveError.noPoints ? (
            <WarningMessage
              color='red'
              bold={true}
              message={`Você não tem pontos o suficiente para um level up.`}
            ></WarningMessage>
          ) : null}

          {learnMoveError.hasOne ? (
            <WarningMessage
              color='red'
              bold={true}
              className='font-bold'
              message={this.hasOneString(learnMoveError.hasOne)}
            ></WarningMessage>
          ) : null}

          {learnMoveError.alreadyLearned ? (
            <WarningMessage
              color='red'
              bold={true}
              className='font-bold'
              message={`${capitalize(
                selectedPokemonName
              )} já aprendeu ${capitalize(params.get('moveName'))}!`}
            />
          ) : null}

          {learnMoveError.cantLearn ? (
            <WarningMessage
              color='red'
              bold={true}
              className='font-bold'
              message={`${capitalize(
                selectedPokemonName
              )} não pode aprender esta habilidade!`}
            />
          ) : null}

          {learnMoveError.forgetToLearn ? (
            <div className='d-flex flex-column align-items-center'>
              <WarningMessage
                color='orange'
                bold={true}
                message={`${capitalize(
                  selectedPokemonName
                )} está tentando aprender ${capitalize(
                  learnMoveError.forgetToLearn
                )},
            mas não pode aprender mais de 4 habilidades. Escolha uma habilidade para esquecer:`}
              ></WarningMessage>

              <div className='d-flex justify-content-between mt-1 moves-container'>
                {pokemonList
                  .find((pkmn) => pkmn.id === selectedPokemon)
                  .moves.map((move) => (
                    <Button
                      key={move.name}
                      style={{ fontSize: '12px' }}
                      size='sm'
                      onClick={() =>
                        this.handleLearnMove(`&deleteMove=${move.name}`)
                      }
                    >
                      {capitalize(move.name)}
                    </Button>
                  ))}
              </div>
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
  pokemonList: state.pokemons.pokemonList,
  learnMoveError: state.pokemon.learnMoveError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...PokemonsActions, ...PokemonActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearnMove);
