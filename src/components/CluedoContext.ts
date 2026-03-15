import { createContext, useContext } from 'react';
import { CluedoService } from '../scripts/cluedo';

type CluedoServiceContextType = CluedoService | null;

export const CluedoContext = createContext<CluedoServiceContextType>(null);

// is this where i need to manage game in state?

export const useCluedoService = () => {
  const context = useContext(CluedoContext);
  if (!context) {
    throw new Error('You are doing it wrong');
  }
  return context;
};