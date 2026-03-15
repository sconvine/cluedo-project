import { v4 as uuidv4 } from 'uuid';

export interface Player {
    id: string;
    name: string;
    characterId?: string;
    cards?: Array<string>;
}

export interface Character {
    id: string;
    name: string;
    color: string;
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
    boardCards: Array<String>
}

export class CluedoService {
    game: Game;
    characters: Array<Character>;
    weapons: Array<Object>;
    locations: Array<string>

    constructor() {
        this.game = {
            players: [],
            boardCards: []
        }

        this.characters = [
            { id: 'scarlet', name: 'Miss Scarlett', color: '#860000' },
            { id: 'mustard', name: 'Colonel Mustard', color: '#8c8f00' },
            { id: 'white', name: 'Mrs. White', color: '#ffffff' },
            { id: 'green', name: 'Mr. Green', color: '#3cff00' },
            { id: 'blue', name: 'Mrs. Peacock', color: '#6769ff' },
            { id: 'plum', name: 'Professor Plum', color: '#ad05e0' },
        ]
        this.weapons = [
            'Candlestick',
            'Knife',
            'Lead Pipe',
            'Pistol',
            'Rope',
            'Wrench',
        ]
        this.locations = [
            'Ballroom',
            'Billiard Room',
            'Conservatory',
            'Dining Room',
            'Hall',
            'Kitchen',
            'Lounge',
            'Library',
            'Study'
        ]
    }

    initPlayers(numberOfPlayers: number) {
        for (let i = 0; i < numberOfPlayers; i++) {
            const playerId: string = uuidv4();
            this.createPlayer({ id: playerId, name: `Player ${i + 1}` } as Player)
        }
    }

    createPlayer(player: Player): void {
        // check if the player id or characterId already exists
        if (this.game.players.find(p => p.id === player.id)) return;
        this.game.players.push(player)
    }

    updatePlayer(player: Player): void {
        console.log(player)
        const editPlayers = this.game.players.map((p) => {
            if (p.id === player.id) {
                return player
            }
            return p
        })
        this.game.players = editPlayers;

    }

    getPlayers() {
        return this.game.players
    }

    addAccusation(playerId: string, location: string, weapon: string, characterId: string): void {
        // add accustion for tracking
        console.log(playerId, location, weapon, characterId)
    }
    trackTurn(playerId: string, location: string, weapon: string, characterId: string, revealedCard: boolean): void {
        // track turn 
        console.log(playerId, location, weapon, characterId, revealedCard)
    }
}