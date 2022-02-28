import React, { Component } from 'React';

import { Spinner, Row, Card, Button, Col } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import PokemonCard from './components/PokemonCard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as SetupActions } from '../../../store/ducks/setup';
import generatePokemonShowdownCode from '../../../helpers/generatePokemonShowdownCode';

import { Container } from './style';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Setup extends Component {
  state = {
    generateCode: null,
  };

  componentDidMount() {
    this.getSetup();
  }

  componentWillUnmount() {
    const { cleanSetupError } = this.props;

    cleanSetupError();
  }

  hasOneString(hasOne) {
    switch (hasOne) {
      case 'battle_schedule':
        return 'Você não pode editar setup tendo batalhas marcadas em menos de 5 dias!';

      case 'battle_invitation':
        return 'Você não pode editar setup tendo desafios pendentes!';

      case 'position':
        return 'Você não pode editar setup estando em um ginásio!';
    }
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
  };

  handleGenerateCode() {
    this.setState({
      generateCode: !this.state.generateCode,
    });
  }

  mizera = (pokemons) => {};

  render() {
    const { isLoading, pokemons, setupError } = this.props;
    const { generateCode } = this.state;
    const indexes = [0, 1, 2, 3, 4, 5];

    return isLoading || !pokemons ? (
      <Spinner
        as='span'
        animation='grow'
        size='sm'
        role='status'
        aria-hidden='true'
      />
    ) : (
      <Container>
        {setupError.hasOne ? (
          <h5 className='text-danger text-center'>
            {this.hasOneString(setupError.hasOne)}
          </h5>
        ) : null}
        <Row className='p-2 d-flex justify-content-between'>
          {indexes.map((i) =>
            pokemons[i] ? (
              <PokemonCard
                handleRemovePokemonClick={this.handleRemovePokemonClick}
                key={pokemons[i].id}
                pokemon={pokemons[i]}
              />
            ) : (
              <Card
                onClick={() => this.handleEmptySetupClick()}
                key={i}
                className='d-flex align-items-center justify-content-center hover'
                style={{
                  width: '90px',
                  height: '140px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                }}
              >
                <PlusSquare
                  className='icon-hover'
                  style={{ fontSize: '24px' }}
                />
              </Card>
            )
          )}
        </Row>
        <CopyToClipboard
          text={generatePokemonShowdownCode(pokemons).replace(',', '')}
        >
          <Button size='sm' className='w-75'>
            Copiar Código de Pokemon Showdown
          </Button>
        </CopyToClipboard>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.setup.pokemonList,
  isLoading: state.setup.isLoading,
  setupError: state.setup.setupError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
