import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useCluedo } from "./CluedoContext";

export const CluedoPlayingCard = ({ card, disabled, handleClick, selected }: { card: any; disabled?: boolean; handleClick: (id: string) => void; selected: boolean }) => {
    const { service } = useCluedo();
    return (
        <Button disabled={disabled} onClick={() => handleClick(card.id)} sx={{ p: 0 }} className={`card-wrapper ${selected ? 'selected' : ''}`}>
            <Card key={card.id} className={`card ${card.type} ${selected ? 'selected' : ''}`}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ bgcolor: card.color, borderBottom: '1px solid black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" color={card.color === '#ffffff' ? 'black' : 'white'}>{card.name}</Typography>
                    </Box>
                </CardContent>
                <CardActions >
                    <Typography variant="caption">{service.getPlayer(card.ownerId)?.name ?? '?'}</Typography>
                </CardActions>
            </Card>
        </Button>
    )
}