import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { CluedoService } from '../scripts/cluedo';
import type { Game } from '../scripts/cluedo';

type CluedoContextType = {
  game: Game;
  service: CluedoService;
};

export const CluedoContext = createContext<CluedoContextType | null>(null);

export const CluedoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>({
    players: [],
    boardCards: [],
    cards: [],
    accusations: [],
    reveals: [],
    mode: 'accusation',
    accusationTurn: 0,
    revealTurn: 1,
  });

  const service = new CluedoService((updatedGame) => setGame(updatedGame));

  const value: CluedoContextType = {
    game,
    service,
  };

  return (
    <CluedoContext.Provider value={value}>
      {children}
    </CluedoContext.Provider>
  );
};

export const useCluedo = () => {
  const context = useContext(CluedoContext);
  if (!context) {
    throw new Error('useCluedo must be used within a CluedoProvider');
  }
  return context;
};