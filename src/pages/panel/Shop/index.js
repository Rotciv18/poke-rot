import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { CaretDownFill } from 'react-bootstrap-icons';
import StyledMenu from './components/StyledMenu';
import StyledMenuItem from './components/StyledMenuItem';
import IconItem from './components/IconItem';
import PokeballsList from './components/PokeballsList';
import TmList from './components/TmList';
import StonesList from './components/StonesList';

import { Container } from './style';

import Pokeball from '../../../images/pokeball.png';
import Tm from '../../../images/tm.png';
import Stone from '../../../images/stone.png';

class Shop extends Component {
  state = {
    anchorEl: null,
    selectedMenu: 'Pokeballs',
  };

  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleCloseMenu() {
    this.setState({
      anchorEl: null,
    });
  }

  handleSelectMenu(label) {
    this.setState({
      selectedMenu: label,
      anchorEl: null,
    });
  }

  render() {
    const { anchorEl, selectedMenu } = this.state;
    const { history } = this.props;
    return (
      <Container>
        <Button
          className='mt-2'
          aria-controls='customized-menu'
          aria-haspopup='true'
          onClick={(event) => this.handleMenuClick(event)}
        >
          <CaretDownFill className='mr-2' />
          {selectedMenu}
        </Button>
        <StyledMenu
          id='customized-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => this.handleCloseMenu()}
        >
          <StyledMenuItem onClick={() => this.handleSelectMenu('Pokeballs')}>
            <ListItemIcon>
              <IconItem src={Pokeball} />
            </ListItemIcon>
            <ListItemText primary='Pokeballs' />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => this.handleSelectMenu('TMs e HMs')}>
            <ListItemIcon>
              <IconItem src={Tm} />
            </ListItemIcon>
            <ListItemText primary='TMs e HMs' />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => this.handleSelectMenu('Stones')}>
            <ListItemIcon>
              <IconItem src={Stone} />
            </ListItemIcon>
            <ListItemText primary='Stones' />
          </StyledMenuItem>
        </StyledMenu>

        {selectedMenu === 'Pokeballs' ? <PokeballsList /> : null}
        {selectedMenu === 'TMs e HMs' ? <TmList history={history} /> : null}
        {selectedMenu === 'Stones' ? <StonesList history={history} /> : null}
      </Container>
    );
  }
}

export default Shop;
