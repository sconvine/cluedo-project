import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardPicker } from '../components/CardPicker';
import { useCluedo } from '../components/CluedoContext';

import SettingsIcon from '@mui/icons-material/Settings';
import PlayerHorizontalScrollWindow from '../components/PlayerHorizontalScrollWindow';

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
              <MenuItem onClick={handleClose}>Player Settings</MenuItem>
              <MenuItem onClick={handleClose}>Reset Game</MenuItem>
              <MenuItem onClick={handleClose}>Undo</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>




      <div className='player-window'>
        <PlayerHorizontalScrollWindow showPlayer={game.players[2].id} />
      </div>


      <div className='card-window'>
        <CardPicker disabledIds={[]} selectedIds={[]} onChange={console.log} />
      </div>


      <div className='player-window'>
        <PlayerHorizontalScrollWindow showPlayer={game.players[3].id} />
      </div>
    </div>

  
}
