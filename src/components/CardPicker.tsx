import { useEffect, useState } from "react";
import { useCluedo } from "./CluedoContext";
import { CluedoPlayingCard } from "./CluedoPlayingCard";
import { Box, Button, Stack, Typography } from "@mui/material";

export const CardPicker = () => {
    const { game, service } = useCluedo();

    const [selected, setSelected] = useState({ character: undefined, weapon: undefined, location: undefined });

    useEffect(() => {
        if (game.mode === 'accusation') {
            setSelected({ character: undefined, weapon: undefined, location: undefined })
        }
    }, [game.mode])

    const toggleSelection = (cardId: string, cardType: string) => {
        if(game.mode === 'accusation'){
            setSelected((prevSelected) => {
                if (prevSelected[cardType as keyof typeof prevSelected] === cardId) {
                    return { ...prevSelected, [cardType]: undefined };
                }
                return { ...prevSelected, [cardType as keyof typeof prevSelected]: cardId };
            });
        } else {
            service.addCardOwnerId(cardId, service.getRevealPlayerId()!)
        }
    }

    const applyAccustation = () => {
        service.addAccusation(selected.character, selected.weapon, selected.location);
    }

    const revealedCard = (revealed: boolean) => {
        service.addReveal(selected.character, selected.weapon, selected.location, revealed);
    }

    const isCardSelected = (cardId: string, cardType: string) => {
        return selected[cardType as keyof typeof selected] === cardId
    };

    const isCardHidden = (cardId: string, cardType: string) => {
        if (selected[cardType as keyof typeof selected] && selected[cardType as keyof typeof selected] !== cardId) {
            return true;
        }
        return false;
    }

    const isAccustionButtonDisabled = () => {
        if (selected.weapon && selected.character && selected.location) {
            return false;
        }
        return true;
    }

    return (
        <>
            <div className='card-container'>
                {game.cards?.map((card) => <CluedoPlayingCard selected={isCardSelected(card.id, card.type)} hidden={isCardHidden(card.id, card.type)} key={card.id} card={card} handleClick={toggleSelection} />)}
            </div>
            {game.mode === 'accusation'
                ? <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <Button variant="contained" onClick={applyAccustation} disabled={isAccustionButtonDisabled()}>Submit Accusation</Button>
                </Box>
                : <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <Typography variant="h6">Click the revealed card if you know which one it was or select from below</Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="contained" onClick={() => revealedCard(true)}>Revealed a card</Button>
                        <Button variant="contained" onClick={() => revealedCard(false)}>Didn't reveal a card</Button>
                    </Stack>
                </Box>
            }
        </>
    )
}