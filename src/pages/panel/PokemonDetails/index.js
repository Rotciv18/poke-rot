import React, { Component } from "react";
import { Container, LoadingContainer } from './style';
import { Spinner, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import MoveTable from './components/MoveTable';

import capitalize from '../../../helpers/capitalize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PokemonActions } from '../../../store/ducks/pokemon';

class PokemonDetails extends Component {

  componentDidMount() {
    const { getPokemonRequest, match } = this.props;

    getPokemonRequest(match.params.pokemonId);
  }

  handleLevelUp() {
    const { levelUpPokemonRequest, pokemon } = this.props;

    levelUpPokemonRequest(pokemon.id);
  }

  handleForgetMove = (move) => {
    console.log(move);
    const { levelUpPokemonRequest, pokemon } = this.props;

    levelUpPokemonRequest(pokemon.id, move);
  }

  render() {

    const { pokemon, isLoading, loaded, levelUpData, levelUpError } = this.props;

    return (
      loaded ?
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <div className="image-container d-flex justify-content-center align-items-center">
            <img src={pokemon.pokemon_data.sprite} />
          </div>
          <h3>{capitalize(pokemon.name)}, Lv {pokemon.level}</h3>

          <MoveTable handleForgetMove={this.handleForgetMove} moves={pokemon.moves} mustForget={levelUpError.forgetToLearn} />

          {levelUpError.forgetToLearn ? null
            :
            <Button size="sm" variant="primary" disabled={isLoading} onClick={() => this.handleLevelUp()}>
              <Spinner
                as="span"
                animation={isLoading ? "grow" : ""}
                size="sm"
                role="status"
                aria-hidden="true"
              />
            Level Up
          </Button>}

          {levelUpData.newLevel
            ? <h4>{`Seu ${capitalize(pokemon.name)} avançou para o level ${levelUpData.newLevel}!`}</h4>
            : null}

          {levelUpData.evolvedTo
            ? <h4>{`Seu ${capitalize(levelUpData.previousPokemon)} evoluiu para um ${capitalize(levelUpData.evolvedTo)}!`}</h4>
            : null}

          {levelUpData.learnedMove
            ? <h4>{`${capitalize(pokemon.name)} aprendeu ${levelUpData.learnedMove}!`}</h4>
            : null}

          {levelUpError.noPoints
            ? <h4>{`Você não tem pontos o suficiente para um level up.`}</h4>
            : null}

          {levelUpError.forgetToLearn ?
            <>
              <p className="font-weight-bold text-center mr-2 ml-2">{capitalize(pokemon.name)} está tentando aprender {capitalize(levelUpError.forgetToLearn)},
            mas não pode aprender mais de 4 habilidades. Deseja esquecer alguma para aprender?</p>

            <Button onClick={() => this.handleForgetMove('none')} size="sm">Não Esquecer</Button>

            </>
            : null}

        </Container>
        :
        <LoadingContainer className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
        </LoadingContainer>

    );
  }
}

const mapStateToProps = (state) => ({
  pokemon: state.pokemon.pokemonDetails,
  isLoading: state.pokemon.isLoading,
  error: state.pokemon.error,
  loaded: state.pokemon.loaded,
  levelUpData: state.pokemon.levelUpData,
  levelUpError: state.pokemon.levelUpError
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PokemonActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);