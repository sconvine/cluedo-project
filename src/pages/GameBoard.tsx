import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardPicker } from '../components/CardPicker';
import { useCluedo } from '../components/CluedoContext';
import PlayerHorizontalScrollWindow from '../components/PlayerHorizontalScrollWindow';
import { PlayerSettings } from '../components/PlayerSettings';

export default function GameBoard() {
  const { game, service } = useCluedo();

  // set this manually at first
  useEffect(() => {
    service.initGame({ numberOfPlayers: 4 })
  }, [])

  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return <div className='gameboard'>
    {/* App bar */}
    {/* <AppBar position="static" elevation={0} sx={{background: '#ffffff', color: '#363636', borderBottom: '1px solid #fff'}}>
      <Toolbar>
        <Typography fontWeight="medium" variant="h5" sx={{ flexGrow: 1, textAlign: 'start'}}>
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
            <MenuItem onClick={handleClose} disabled>Undo Last Action</MenuItem>
            <MenuItem onClick={handleClose} disabled>Reset Game</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar> */}

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


    {game.players.length === 0 && <Typography variant="h4" sx={{ mt: 5 }}>Loading...</Typography>}

    {game.players.length > 0 &&
      <>
        <div className='player-window'>
          <PlayerHorizontalScrollWindow showPlayer={service.getAccusationPlayerId()} />
        </div>

        <div>
          <Typography>{'Accuser '+(game.accusationTurn+1)}</Typography>
          <Typography>{'Revealer '+(game.revealTurn+1)}</Typography>
        </div>

        <div className='card-window'>
          <CardPicker />
        </div>

        <div className={`player-window ${game.mode === 'reveal' ? 'show' : 'hidden'}`}>
          <PlayerHorizontalScrollWindow showPlayer={service.getRevealPlayerId()} />
        </div>
      </>
    }
  </div>


}
