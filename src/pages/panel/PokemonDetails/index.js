import React, { Component } from "react";
import { Container, LoadingContainer } from './style';
import { Spinner, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import MoveTable from './components/MoveTable';
import WarningMessage from "./components/WarningMessage";

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
            ? <WarningMessage message={`Seu ${capitalize(pokemon.name)} avançou para o level ${levelUpData.newLevel}!`}></WarningMessage>
            : null}

          {levelUpData.evolvedTo
            ? <WarningMessage message={`Seu ${capitalize(levelUpData.previousPokemon)} evoluiu para um ${capitalize(levelUpData.evolvedTo)}!`}></WarningMessage>
            : null}

          {levelUpData.learnedMove
            ? <WarningMessage message={`${capitalize(pokemon.name)} aprendeu ${levelUpData.learnedMove}!`}></WarningMessage>
            : null}

          {levelUpError.noPoints
            ? <WarningMessage message={`Você não tem pontos o suficiente para um level up.`}></WarningMessage>
            : null}

          {levelUpError.forgetToLearn ?
            <>
              <WarningMessage color='red' message={`${capitalize(pokemon.name)} está tentando aprender ${capitalize(levelUpError.forgetToLearn)},
            mas não pode aprender mais de 4 habilidades. Deseja esquecer alguma para aprender?`}></WarningMessage>

            <Button onClick={() => this.handleForgetMove('none')} size="sm">Não aprender {levelUpError.forgetToLearn}</Button>

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