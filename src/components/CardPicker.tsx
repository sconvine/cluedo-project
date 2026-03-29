import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import type { Cards } from "../scripts/cluedo";
import { useCluedo } from "./CluedoContext";
import { CluedoPlayingCard } from "./CluedoPlayingCard";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';

export const CardPicker = () => {
    const { game, service } = useCluedo();

    const [cardSelected, setCardSelected] = useState<Cards | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
        console.log('closing menu', event)
        setAnchorEl(null);
    };

    useEffect(() => {
        if (game.mode === 'normal') {
            setCardSelected((prev) => {
                if (prev) {
                    return service.getCard(prev.id) ?? null
                }
                return null
            })
        }
    }, [game.cards])


    const [selected, setSelected] = useState({ character: undefined, weapon: undefined, location: undefined });

    useEffect(() => {
        if (game.mode !== 'reveal') {
            setSelected({ character: undefined, weapon: undefined, location: undefined })
        }
    }, [game.mode])

    const cardClick = (event: React.MouseEvent<HTMLButtonElement>, cardId: string, cardType: string) => {
        if (game.mode === 'accusation') {
            setSelected((prevSelected) => {
                if (prevSelected[cardType as keyof typeof prevSelected] === cardId) {
                    return { ...prevSelected, [cardType]: undefined };
                }
                return { ...prevSelected, [cardType as keyof typeof prevSelected]: cardId };
            });
        }
        if (game.mode === 'reveal') {
            service.addCardOwnerId(cardId, service.getRevealPlayerId()!)
        }
        if (game.mode === 'normal') {
            setCardSelected(service.getCard(cardId) ?? null);
            setAnchorEl(event.currentTarget as HTMLButtonElement);
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

    const onAddOwner = (selectedId: string, ownerId: string) => {
        service.addCardOwnerId(selectedId, ownerId)
        setAnchorEl(null);
    }

    return (
        <>
            <div className='card-container'>
                {game.cards?.map((card) => <CluedoPlayingCard selected={isCardSelected(card.id, card.type)} hidden={isCardHidden(card.id, card.type)} key={card.id} card={card} handleClick={cardClick} />)}
            </div>
            {game.mode === 'accusation' &&
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <Button variant="contained" onClick={applyAccustation} disabled={isAccustionButtonDisabled()}>Submit Accusation</Button>
                </Box>
            }
            {game.mode === 'reveal' &&
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
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
            {cardSelected &&
                <Popper
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    transition
                    role="undefined"
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList
                                        autoFocusItem={!!anchorEl}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                    >
                                        {game.players.map((player) => <MenuItem key={player.id} onClick={() => onAddOwner(cardSelected.id, player.id)}>{player.name}</MenuItem>)}
                                        {game.players.length < 6 &&
                                            <MenuItem onClick={() => onAddOwner(cardSelected.id, 'gameboard')}>Game Board</MenuItem>
                                        }
                                        {cardSelected?.ownerId &&
                                            <MenuItem onClick={() => service.removeCardOwnerId(cardSelected.id)}>Remove Owner</MenuItem>
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            }

        </>
    )
}