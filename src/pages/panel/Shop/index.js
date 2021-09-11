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

const pokePointsImg =
  'https://www.pngfind.com/pngs/b/102-1028650_pokemon-logo-png.png';
const pokeballImg =
  'https://www.clipartmax.com/png/full/129-1298222_%C2%A0-pokeball-png.png';
const tmImg = 'https://pokemon3d.net/wiki/images/7/7a/TMbig.png';
const stoneImg = 'https://www.pngkey.com/png/full/30-302848_stone-png.png';

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
      anchorEl: null
    });
  }

  render() {
    const { anchorEl, selectedMenu } = this.state;
    return (
      <Container>
        <Button
          className="mb-4 mt-2"
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
              <IconItem src={pokeballImg} />
            </ListItemIcon>
            <ListItemText primary='Pokeballs' />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => this.handleSelectMenu('TMs e HMs')}>
            <ListItemIcon>
              <IconItem src={tmImg} />
            </ListItemIcon>
            <ListItemText primary='TMs e HMs' />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => this.handleSelectMenu('Stones')}>
            <ListItemIcon>
              <IconItem src={stoneImg} />
            </ListItemIcon>
            <ListItemText primary='Stones' />
          </StyledMenuItem>
        </StyledMenu>

        { selectedMenu === 'Pokeballs' ? <PokeballsList /> : null }
        { selectedMenu === 'TMs e HMs' ? <TmList /> : null }
        { selectedMenu === 'Stones' ? <StonesList /> : null }
      </Container>
    );
  }
}

export default Shop;
