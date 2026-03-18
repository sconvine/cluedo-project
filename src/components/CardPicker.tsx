import { useCluedo } from "./CluedoContext";
import { CluedoPlayingCard } from "./CluedoPlayingCard";
import { useState } from "react";

/*
Features to add
- states 
    - standard > cards are clickable with options like, card revealed, card stats
    - accuse > select cards for accusation, allow one of each to be selected (allow toggle select)
    - reveal > only the 3 cards remain with text that allows the user to say whether the reveal has revealed or not and whether you know which card that has been revealed
*/

export const CardPicker = ({ disabled, selectedIds, disabledIds, onChange }: { disabled?: boolean; selectedIds: string[]; disabledIds: string[]; onChange: (ids: string[]) => void }) => {
    const { game } = useCluedo();

    const [selected, setSelected] = useState<string[]>(selectedIds ?? []);

    const toggleSelection = (cardId: string) => {
        setSelected((prevSelected) => {
            if(prevSelected.includes(cardId)){
                const newSelected = prevSelected.filter((id) => id !== cardId);
                onChange(newSelected);
                return newSelected;
            }
            const newSelected = [...prevSelected, cardId];
            onChange(newSelected); 
            return newSelected;
        });
    }
    
    const isCardSelected = (cardId: string) => {
        return selected.includes(cardId);
    };
    
    const isCardDisabled = (cardId: string) => {
        return disabled || disabledIds.includes(cardId);
    };

    return (
        <div className='card-container'>
            {game.cards?.map((card) => <CluedoPlayingCard selected={isCardSelected(card.id)} key={card.id} card={card} handleClick={toggleSelection} disabled={isCardDisabled(card.id)}/>)}
        </div>
    )
}