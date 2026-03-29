import { Box, Button, Dialog, FormControl, InputLabel, MenuItem, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { useState, type ChangeEvent } from 'react';
import { useCluedo } from '../components/CluedoContext';
import type { Player } from '../scripts/cluedo';

export const PlayerSettings = () => {
  const { game, service } = useCluedo();

  const [open, setOpen] = useState(true);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handlePlayerNameChange = (name: string, player: Player) => {
    service.updatePlayer({ ...player, name })
  }
  const handlePlayerCharacterChanges = (character: string, player: Player) => {
    service.updatePlayer({ ...player, character })
  }

  return <>
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
    >
      <Box sx={{ padding: 4 }}>
        <Typography sx={{ mb: 4 }} variant="h6" component="div">
          Player Settings
        </Typography>
        <TextField
          label="Number of Players"
          type="number"
          defaultValue={game.players.length}
          onChange={(e) => service.initGame({ numberOfPlayers: parseInt(e.target.value) })}
        />

        {game.players.map((player) =>
          <div key={player.id} className='player-box'>
            <TextField
              id={`${player.id}-player-name`}
              label="Player Name"
              sx={{ width: '50%' }}
              defaultValue={player.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePlayerNameChange(e.target.value, player)}
            />
            <FormControl>
              <InputLabel id="character-select-label">Character</InputLabel>
              <Select
                labelId="character-select-label"
                id={`${player.id}-character`}
                onChange={(e: SelectChangeEvent) => handlePlayerCharacterChanges(e.target.value, player)}
                label="Character"
                defaultValue={player.character || ''}
                sx={{ minWidth: 150 }}
              >
                {service.game.cards.filter((c) => c.type === 'character').map((character) => <MenuItem key={character.id} value={character.id} disabled={!!game.players.find(player => player.character === character.id)}>{character.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        )}

        {game.players.length > 0 && <Button variant='contained' onClick={handleCloseDialog}>Let's play!</Button>}
      </Box>
    </Dialog>
  </>;
}
