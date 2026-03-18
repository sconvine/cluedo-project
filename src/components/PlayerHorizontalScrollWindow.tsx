import { Avatar, Box, Typography } from '@mui/material';
import { useCluedo } from '../components/CluedoContext';
import { useEffect, useRef } from 'react';


export default function PlayerHorizontalScrollWindow({showPlayer}: {showPlayer?: string}) {
  const { game, service } = useCluedo();

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(scrollRef.current){
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showPlayer])

  return <>

    {/* Accuser Window */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto', // Enables horizontal scroll
        gap: 2, // Spacing between items
        maxHeight: 400,
        whiteSpace: 'nowrap', // Prevents wrapping
        '& > *': {
          flexShrink: 0, // Prevents items from shrinking
        },
      }}
    >
      
      {game.players.map((player) =>
      <Box key={player.id} id={player.id} ref={player.id == showPlayer ? scrollRef : null} sx={{ width: '100vw', height: 200, bgcolor: 'primary.light' }}>
        <Avatar alt={player.name} sx={{ bgcolor: player.characterId ? service.getCard(player.characterId)?.color : undefined }} />
        <Typography textAlign={'left'}>{player.name}</Typography>
        <Typography textAlign={'left'}>{player.characterId ? service.getCard(player.characterId)?.name : undefined}</Typography>
        <Typography textAlign={'left'}>Button Players Cards</Typography>
        <Typography textAlign={'left'}>Button Players Accusations Log</Typography>
        <Typography textAlign={'left'}>Button Players Reveal Log</Typography>
      </Box>
    )}
    </Box>

  </>;
}
