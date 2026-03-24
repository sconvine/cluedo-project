import { Box, Button, Paper, Typography } from "@mui/material";
import { useCluedo } from "./CluedoContext";
// import { useState } from "react";

export const CluedoPlayingCard = ({
    card,
    disabled,
    handleClick,
    selected,
    hidden
}: {
    card: any;
    disabled?: boolean;
    handleClick: (id: string, type: string) => void;
    selected: boolean;
    hidden: boolean
}) => {
    const { game, service } = useCluedo();

    // const [ownerSelected, setOwnerSelected] = useState(null)

    const owner = game.mode === 'normal' ? null : service.getPlayer(card.ownerId)
    const ownerColor = owner?.character ? service.getCard(owner.character)?.color : '#efefef'

    return (
        <Button disabled={disabled} onClick={() => handleClick(card.id, card.type)} sx={{ p: 0 }} className={`card-wrapper ${selected ? 'selected' : ''} ${hidden ? 'hidden' : 'show'}`}>
            <Paper elevation={selected ? 8 : 3} sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1
            }}>
                <Box sx={{
                    bgcolor: card.color,
                    width: '100%',
                    height: '100%',
                }}>
                    <Typography variant="caption" color={card.color === '#ffffff' ? 'black' : 'white'}>{card.name}</Typography>
                </Box>
                {owner &&
                    <Box sx={{
                        bgcolor: ownerColor,
                        width: '100%',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Typography variant="caption" color={ownerColor && ownerColor !== '#ffffff' && ownerColor !== '#efefef' ? '#ffffff' : '#000000'}>{service.getPlayer(card.ownerId)?.name}</Typography>
                    </Box>
                }
            </Paper>
        </Button>
    )
}