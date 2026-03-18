import { v4 as uuidv4 } from 'uuid';

export interface Player {
    id: string;
    name: string;
    characterId?: string;
    cards?: Array<string>;
}

export interface Cards {
    id: string;
    name: string;
    color?: string;
    type: string;
    ownerId?: string | null;
}

export interface Accusation {
    playerId: string;
    characterId: string;
    weapon: string;
    location: string;
}

export interface Turn {
    playerId: string;
    characterId: string;
    weapon: string;
    location: string;
    revealedCard: Boolean;
}

export interface Game {
    players: Array<Player>;
    boardCards: Array<String>;
    cards: Array<Cards>;
    accusations: Array<String>;
    reveals: Array<String>;
}

export class CluedoService {
    game: Game;
    private onGameUpdate: (game: Game) => void;

    constructor(onGameUpdate: (game: Game) => void) {
        this.onGameUpdate = onGameUpdate;
        this.game = {
            players: [],
            boardCards: [],
            cards: [],
            accusations: [],
            reveals: []
        };

        const weaponColor = '#720000'
        const locationColor = '#092c00'

        this.game.cards = [
            { id: 'scarlet', name: 'Miss Scarlett', color: '#860000', type: 'character' },
            { id: 'mustard', name: 'Colonel Mustard', color: '#8c8f00', type: 'character' },
            { id: 'white', name: 'Mrs. White', color: '#ffffff', type: 'character' },
            { id: 'green', name: 'Mr. Green', color: '#3cff00', type: 'character' },
            { id: 'blue', name: 'Mrs. Peacock', color: '#6769ff', type: 'character' },
            { id: 'plum', name: 'Professor Plum', color: '#ad05e0', type: 'character' },
            { id: 'candle', name: 'Candlestick', type: 'weapon', color: weaponColor },
            { id: 'knife', name: 'Knife', type: 'weapon', color: weaponColor },
            { id: 'pipe', name: 'Lead Pipe', type: 'weapon', color: weaponColor },
            { id: 'pistol', name: 'Pistol', type: 'weapon', color: weaponColor },
            { id: 'rope', name: 'Rope', type: 'weapon', color: weaponColor },
            { id: 'wrench', name: 'Wrench', type: 'weapon', color: weaponColor },
            { id: 'bathroom', name: 'Bathroom', type: 'location', color: locationColor },
            { id: 'dinningroom', name: 'Dining Room', type: 'location', color: locationColor },
            { id: 'gameroom', name: 'Game Room', type: 'location', color: locationColor },
            { id: 'garage', name: 'Garage', type: 'location', color: locationColor },
            { id: 'bedroom', name: 'Bedroom', type: 'location', color: locationColor },
            { id: 'kitchen', name: 'Kitchen', type: 'location', color: locationColor },
            { id: 'livingroom', name: 'Living Room', type: 'location', color: locationColor },
            { id: 'courtyard', name: 'Courtyard', type: 'location', color: locationColor },
            { id: 'study', name: 'Study', type: 'location', color: locationColor },
        ];
    }

    initGame({ numberOfPlayers }: any) {
        if (this.game.players.length < numberOfPlayers) {
            for (let i = 0; i < numberOfPlayers; i++) {
                const playerId: string = uuidv4();
                this.createPlayer({ id: playerId, name: `Player ${i + 1}` } as Player)
            }
            this.onGameUpdate({ ...this.game });
        }
    }

    createPlayer(player: Player): void {
        // check if the player id or characterId already exists
        if (this.game.players.find(p => p.id === player.id)) return;
        this.game.players.push(player);
        this.onGameUpdate({ ...this.game });
    }

    updatePlayer(player: Player): void {
        const editPlayers = this.game.players.map((p) => {
            if (p.id === player.id) {
                return player
            }
            return p
        })
        this.game.players = editPlayers;
        this.onGameUpdate({ ...this.game });
    }

    getCard(cardId: string) {
        return this.game.cards.find((card) => card.id === cardId);
    }

    getPlayer(playerId: string) {
        return this.game.players.find((player) => player.id === playerId);
    }

    addCardOwnerId(id: string, ownerId: string) {
        this.game.cards = this.game.cards.map((card) => {
            if(id === card.id){
                return ({ ...card, ownerId: ownerId })
            }
            return card
        })
        this.onGameUpdate({ ...this.game });
    }

    addAccusation(playerId: string, location: string, weapon: string, characterId: string): void {
        // add accustion for tracking
        console.log(playerId, location, weapon, characterId)
    }

    addReveal(playerId: string, location: string, weapon: string, characterId: string, revealedCard: boolean): void {
        // track turn 
        console.log(playerId, location, weapon, characterId, revealedCard)
    }
}