import { FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material';
import { useCluedoService } from '../components/CluedoContext';
import type { ChangeEvent } from 'react';
import type { Player } from '../scripts/cluedo';

export default function GameBoard() {
  const cluedoService = useCluedoService();
  // set this manually at first
  cluedoService.initPlayers(4)

  const handlePlayerNameChange = (name: string, player: Player) => {
    cluedoService.updatePlayer({ ...player, name })
  }
  const handlePlayerCharacterChanges = (characterId: string, player: Player) => {
    cluedoService.updatePlayer({ ...player, characterId })
  }


  return <>
    <h1>GameBoard</h1>

    {
      // Configure Players
      cluedoService.game.players.map((player) =>
        <div key={player.id} className='player-box'>
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
              value={player.characterId}
              onChange={(e: SelectChangeEvent) => handlePlayerCharacterChanges(e.target.value, player)}
              label="Character"
            >
              {cluedoService.characters.map((character) => <MenuItem value={character.id}>{character.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

      )
    }
    {cluedoService.game.players.map((player) => <p>{player.name}</p>)}
  </>;
}
