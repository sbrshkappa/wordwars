// Card types and values
export interface Card {
  id: string;
  letter: string;
  points: number;
  isMaster: boolean;
  assignedLetter?: string; // For master cards that have been assigned a letter
}

// Player structure
export interface Player {
  id: string;
  name: string;
  hand: Card[];
  score: number;
  isCurrentTurn: boolean;
  hasDiscardedThisTurn: boolean;
}

// Word played on the board
export interface PlayedWord {
  id: string;
  word: string;
  cards: Card[];
  playerId: string;
  playerName: string;
  score: number;
  timestamp: number;
  position?: { x: number; y: number }; // Optional for backward compatibility
}



// Game state
export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  discardPile: Card[];
  tempDiscardedCard: Card | null; // Card temporarily discarded, not yet added to discard pile
  playedWords: PlayedWord[];
  gamePhase: 'lobby' | 'playing' | 'roundEnd' | 'gameOver';
  roundNumber: number;
  winner: string | null;
}

// Game actions
export type GameAction = 
  | { type: 'START_GAME'; playerNames: string[] }
  | { type: 'DEAL_CARDS' }
  | { type: 'PLAY_WORD'; playerId: string; cards: Card[]; word: string; position: { x: number; y: number } }
  | { type: 'EXTEND_WORD'; playerId: string; wordId: string; cards: Card[]; newWord: string }
  | { type: 'DISCARD_CARD'; playerId: string; card: Card }
  | { type: 'DRAW_CARD'; playerId: string }
  | { type: 'EXCHANGE_CARDS'; playerId: string; handCards: Card[]; boardCards: Card[] }
  | { type: 'CHALLENGE_WORD'; challengerId: string; wordId: string; isValid: boolean }
  | { type: 'END_ROUND' }
  | { type: 'END_GAME' };



// Card values based on game rules
export const CARD_VALUES: Record<string, number> = {
  'A': 10, 'E': 10, 'I': 10,
  'O': 8, 'U': 8, 'H': 8, 'L': 8, 'R': 8, 'S': 8, 'T': 8, 'W': 8,
  'C': 8, 'K': 8, 'M': 8, 'N': 8, 'P': 8,
  'D': 6, 'J': 6, 'V': 6,
  'G': 4, 'Q': 4, 'Y': 4,
  'B': 2, 'F': 2, 'X': 2, 'Z': 2,
  'MASTER': 15
};

// Card distribution for deck creation
export const CARD_DISTRIBUTION: Record<string, number> = {
  'A': 4, 'E': 4, 'I': 4,
  'O': 3, 'U': 3, 'H': 3, 'L': 3, 'R': 3, 'S': 3, 'T': 3, 'W': 3,
  'C': 1, 'K': 1, 'M': 1, 'N': 1, 'P': 1,
  'D': 1, 'J': 1, 'V': 1,
  'G': 1, 'Q': 1, 'Y': 1,
  'B': 1, 'F': 1, 'X': 1, 'Z': 1,
  'MASTER': 1
}; 