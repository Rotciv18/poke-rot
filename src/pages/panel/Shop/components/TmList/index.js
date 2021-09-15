import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as MovesActions } from '../../../../../store/ducks/moves';

import TmCard from './TmCard';
import { Spinner, Row, FormControl } from 'react-bootstrap';
import { LoadingContainer } from '../../../Main/style';
import { Container } from './style';

class TmList extends Component {
  state = {
    search: null,
  };

  componentDidMount() {
    this.getMovesList();
  }

  getMovesList() {
    const { getMovesListRequest } = this.props;

    getMovesListRequest();
  }

  handleOnSearchChange(event) {
    const value = event.currentTarget.value.toLowerCase();

    this.setState({
      search: value,
    });
  }

  handleTmClick = (move) => {
    this.props.history.push(
      `/pokemons/learn?moveName=${move.move_name}&moveId=${move.id}`
    );
  };

  render() {
    let { movesList, isLoading } = this.props;
    const { search } = this.state;

    if (search) {
      movesList = movesList.filter((move) => move.move_name.includes(search));
    }

    return isLoading ? (
      <LoadingContainer className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' role='status' />
      </LoadingContainer>
    ) : (
      <Container>
        <div className='mt-2 d-flex justify-content-center'>
          <FormControl
            onChange={(event) => this.handleOnSearchChange(event)}
            className='w-75'
            placeholder='Buscar...'
          />
        </div>
        <Row className='p-4 d-flex justify-content-between'>
          {movesList.map((move) => (
            <TmCard
              handleTmClick={this.handleTmClick}
              move={move}
              key={move.id}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  movesList: state.moves.movesList,
  isLoading: state.moves.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MovesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TmList);
