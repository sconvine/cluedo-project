import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useCluedo } from '../components/CluedoContext';


export default function PlayerHorizontalScrollWindow({ showPlayer }: { showPlayer?: string }) {
  const { game, service } = useCluedo();

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showPlayer])

  return <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        height: '100%',
        gap: 2,
        maxHeight: 400,
        whiteSpace: 'nowrap',
        '& > *': {
          flexShrink: 0,
        },
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
        },
      }}
    >

      {game.players.map((player) => {
        const bgColor = player.character ? service.getCard(player.character)?.color : '#f1f1f1'
        const textColor = bgColor && bgColor !== '#f1f1f1' ? '#ffffff' : '#363636'
        return (
          <Box key={player.id} id={player.id} ref={player.id == showPlayer ? scrollRef : null} sx={{
            width: '100vw',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            px: 3,
            py: 2,
            display: 'flex'
          }}>
            <Paper
              elevation={6}
              sx={{
                width: '100vw',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'start',
                minHeight: '135px',
                borderRadius: 4,
                border: `1px solid ${bgColor + 'b0'}`,
                background: `linear-gradient(to right bottom, ${bgColor + 'b0'},${bgColor})`
              }}>
              <Typography textAlign={'left'} variant='h3' color={textColor}>{player.name}</Typography>
              <Typography textAlign={'left'} variant='body2' color={textColor}>{player.character ? service.getCard(player.character)?.name : undefined}</Typography>
            </Paper>
          </Box>)
      }
      )}
    </Box>

  </>;
}
