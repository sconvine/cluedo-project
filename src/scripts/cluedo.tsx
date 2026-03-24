import { v4 as uuidv4 } from 'uuid';

export interface Player {
    id: string;
    name: string;
    character?: string;
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
    character: string;
    weapon: string;
    location: string;
}

export interface MurderCards {
    character: string;
    weapon: string;
    location: string;
}

export interface Reveals {
    playerId: string;
    character: string;
    weapon: string;
    location: string;
    revealedCard: Boolean;
}

export interface Turn {
    playerId: string;
    character: string;
    weapon: string;
    location: string;
    revealedCard: Boolean;
}

export interface Game {
    players: Array<Player>;
    boardCards: Array<String>;
    cards: Array<Cards>;
    accusations: Array<Accusation>;
    reveals: Array<Reveals>;
    mode: 'accusation' | 'reveal' | 'normal';
    accusationTurn: number;
    revealTurn: number;
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
            reveals: [],
            mode: 'normal',
            accusationTurn: 0,
            revealTurn: 1,
        };

        const weaponColor = '#433a66'
        const locationColor = '#3b3030'

        this.game.cards = [
            { id: 'scarlet', name: 'Miss Scarlett', color: '#740000', type: 'character' },
            { id: 'mustard', name: 'Colonel Mustard', color: '#707200', type: 'character' },
            { id: 'white', name: 'Mrs. White', color: '#ffffff', type: 'character' },
            { id: 'green', name: 'Mr. Green', color: '#114900', type: 'character' },
            { id: 'blue', name: 'Mrs. Peacock', color: '#1833cf', type: 'character' },
            { id: 'plum', name: 'Professor Plum', color: '#70004b', type: 'character' },
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
        // check if the player id or character already exists
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
            if (id === card.id) {
                if (card.ownerId !== ownerId) {
                    return ({ ...card, ownerId: ownerId })
                } else {
                    return ({ ...card, ownerId: null })
                }
            }
            return card
        })
        this.onGameUpdate({ ...this.game });
    }

    addAccusation(character?: string, weapon?: string, location?: string): void {
        if (character && weapon && location) {
            this.game.accusations.push({
                playerId: this.getAccusationPlayerId(),
                character,
                weapon,
                location
            });
            this.game.mode = 'reveal';
            this.onGameUpdate({ ...this.game });
        }
    }

    addReveal(character?: string, weapon?: string, location?: string, revealedCard?: boolean): void {
        if (character && weapon && location && revealedCard !== undefined && revealedCard !== null) {
            this.game.reveals.push({
                playerId: this.getRevealPlayerId(),
                character,
                weapon,
                location,
                revealedCard
            });

            if (revealedCard) {
                this.game.mode = 'accusation';
                this.accusationNextTurn()
            } else {
                this.revealNextTurn()
            }
        }
    }

    getAccusationPlayerId() {
        const player = this.game.players[this.game.accusationTurn];
        return player?.id || '';
    }

    accusationNextTurn() {
        this.game.accusationTurn = this.game.accusationTurn < this.game.players.length - 1 ? this.game.accusationTurn + 1 : 0;
        // set reveal starting player too
        this.game.revealTurn = this.game.accusationTurn < this.game.players.length - 1 ? this.game.accusationTurn + 1 : 0;
        this.onGameUpdate({ ...this.game });
    }

    getRevealPlayerId() {
        const player = this.game.players[this.game.revealTurn];
        return player?.id || '';
    }

    revealNextTurn() {
        this.game.revealTurn = this.game.revealTurn < this.game.players.length - 1 ? this.game.revealTurn + 1 : 0;

        if (this.getRevealPlayerId() === this.getAccusationPlayerId()) {
            this.game.mode = 'accusation';
            this.accusationNextTurn();
        } else {
            this.onGameUpdate({ ...this.game });
        }
        this.calculateCards()
    }

    calculateCards() {
        // calculate cards for each player based on accusations and reveals
        const whoDoneIt: MurderCards = { character: '', weapon: '', location: '' }



        this.game.players.forEach((player) => {
            // Establish what player doesn't have
            let cardsRevealedFalse = [] as Array<string>
            this.game.reveals.filter((reveal) => player.id === reveal.playerId && !reveal.revealedCard)
                .forEach((reveal) => {
                    cardsRevealedFalse = [...cardsRevealedFalse, reveal.character, reveal.weapon, reveal.location]
                })
            // Check if there's been reveals that included any known false reveal cards
            this.game.reveals.filter((reveal) => player.id === reveal.playerId && reveal.revealedCard)
                .forEach((reveal) => {
                    const cardsRevealArray = [reveal.character, reveal.weapon, reveal.location]
                    const revealFilterOutKnowNegatives = cardsRevealArray.filter(card => !cardsRevealedFalse.includes(card))
                    if (revealFilterOutKnowNegatives.length === 1) {
                        // restart the function now that we know another cards owner
                        this.addCardOwnerId(revealFilterOutKnowNegatives[0], player.id);
                        this.calculateCards()
                        return;
                    }
                })
            // Check if there's been reveals that included any known cards with owners
            this.game.reveals.filter((reveal) => player.id === reveal.playerId && reveal.revealedCard)
                .forEach((reveal) => {
                    const cardsRevealArray = [reveal.character, reveal.weapon, reveal.location]
                    const ownedCards = this.game.cards.filter((card) => !card.ownerId).map(card => card.id)
                    const revealFilterOutKnowOwned = cardsRevealArray.filter(card => !ownedCards.includes(card))
                    if (revealFilterOutKnowOwned.length === 1) {
                        // restart the function now that we know another cards owner
                        this.addCardOwnerId(revealFilterOutKnowOwned[0], player.id);
                        this.calculateCards()
                        return;
                    }
                })

        })

        // if all but one card of each type are known them we know who done it
        const remainingCharacters = this.game.cards.filter((card) => card.type === 'character').filter((card) => !card.ownerId)
        const remainingWeapons = this.game.cards.filter((card) => card.type === 'character').filter((card) => !card.ownerId)
        const remainingLocation = this.game.cards.filter((card) => card.type === 'character').filter((card) => !card.ownerId)

        if (remainingCharacters.length === 1) {
            whoDoneIt.character = remainingCharacters[0].id
        }
        if (remainingWeapons.length === 1) {
            whoDoneIt.weapon = remainingWeapons[0].id
        }
        if (remainingLocation.length === 1) {
            whoDoneIt.location = remainingLocation[0].id
        }
        this.onGameUpdate({ ...this.game });
    }
}