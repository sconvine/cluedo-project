import { Button, Snackbar, Stack, Typography, type SnackbarCloseReason } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardPicker } from '../components/CardPicker';
import { useCluedo } from '../components/CluedoContext';
import { PlayerSettings } from '../components/PlayerSettings';

export default function GameBoard() {
  const { game, service } = useCluedo();

  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    console.log('game updated', game)
    setOpenSnackbar(true);
  }, [game.notification]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event, reason)

    setOpenSnackbar(false);
  };

  return <div className='gameboard'>

    <PlayerSettings />

    {game.players.length === 0 && <Typography variant="h4" sx={{ mt: 5 }}>Loading...</Typography>}

    {game.players.length > 0 &&
      <>

        <div className={`game-window`}>
          <Typography variant="h5">It is {game.players[game.accusationTurn].name}'s turn</Typography>
        </div>

        <div className={`game-buttons ${game.mode === 'normal' ? 'show' : 'hidden'}`}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => service.setGameMode('accusation')}>Accusation</Button>
            <Button variant="contained" onClick={() => service.accusationNextTurn()}>Skip Accusation</Button>
          </Stack>
        </div>

        <div className={`player-window ${game.mode === 'reveal' ? 'show' : 'hidden'}`}>
          <Typography variant="h5">{game.players[game.revealTurn].name} is revealing their hand</Typography>
        </div>

        <div className='card-window'>
          <CardPicker />
        </div>

      </>
    }
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={handleClose}
      message={game.notification?.[game.notification.length - 1] || ''}
    />
  </div>


}
