import { AppBar, Box, Button, Dialog, IconButton, Menu, MenuItem, Slide, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CardPicker } from '../components/CardPicker';
import { useCluedo } from '../components/CluedoContext';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayerHorizontalScrollWindow from '../components/PlayerHorizontalScrollWindow';
import { PlayerSettings } from '../components/PlayerSettings';

export default function GameBoard() {
  const { game, service } = useCluedo();

  // set this manually at first
  useEffect(() => {
    service.initGame({ numberOfPlayers: 4 })
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return <div className='wrapper'>
    {/* App bar */}
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'start' }}>
          Cluedo Tracker
        </Typography>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClickOpenDialog}>Player Settings</MenuItem>
            <MenuItem onClick={handleClose}>Undo Last Action</MenuItem>
            <MenuItem onClick={handleClose}>Reset Game</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>

    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
    >
       <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Player Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              save
            </Button>
          </Toolbar>
      <PlayerSettings />
    </Dialog>



    <div className='player-window'>
      <PlayerHorizontalScrollWindow showPlayer={game.players[2]?.id} />
    </div>


    <div className='card-window'>
      <CardPicker disabledIds={[]} selectedIds={[]} onChange={console.log} />
    </div>


    <div className='player-window'>
      <PlayerHorizontalScrollWindow showPlayer={game.players[3]?.id} />
    </div>
  </div>


}
