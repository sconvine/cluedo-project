import { Avatar, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material';
import { type ChangeEvent } from 'react';
import { useCluedo } from '../components/CluedoContext';
import type { Player } from '../scripts/cluedo';

export const PlayerSettings = () => {
  const { game, service } = useCluedo();

  const handlePlayerNameChange = (name: string, player: Player) => {
    service.updatePlayer({ ...player, name })
  }
  const handlePlayerCharacterChanges = (characterId: string, player: Player) => {
    service.updatePlayer({ ...player, characterId })
  }

  return <>
    {game.players.map((player) =>
      <div key={player.id} className='player-box'>
        <Avatar alt={player.name} sx={{ bgcolor: player.characterId ? service.getCard(player.characterId)?.color : undefined }} />
        <TextField
          id={`${player.id}-player-name`}
          label="Player Name"
          defaultValue={player.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handlePlayerNameChange(e.target.value, player)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="character-select-label">Character</InputLabel>
          <Select
            labelId="character-select-label"
            id={`${player.id}-character`}
            onChange={(e: SelectChangeEvent) => handlePlayerCharacterChanges(e.target.value, player)}
            label="Character"
            defaultValue={player.characterId || ''}
            sx={{ minWidth: 180 }}
          >
            {service.game.cards.filter((c) => c.type === 'character').map((character) => <MenuItem key={character.id} value={character.id} disabled={!!game.players.find(player => player.characterId === character.id)}>{character.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )}    
  </>;
}
