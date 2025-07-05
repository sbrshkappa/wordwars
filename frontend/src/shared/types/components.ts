// Card Component Types
export interface CardProps {
  card: Card;
  isSelected?: boolean;
  isPlayable?: boolean;
  isFaceDown?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// PlayerArea Component Types
export interface PlayerAreaProps {
  player: Player;
  isCurrentPlayer: boolean;
  isOpponent?: boolean;
  selectedCards?: Set<string>;
  onCardClick?: (card: Card, playerId: string) => void;
  showGameStatus?: boolean;
  gameStatus?: GameStatus;
  shakeHand?: boolean;
}

// PlayingField Component Types
export interface PlayingFieldProps {
  playedWords: PlayedWord[];
  players: Player[];
  gameStatus?: GameStatus;
  isExtendMode?: boolean;
  selectedWordId?: string | null;
  onWordSelect?: (wordId: string) => void;
  turnStatus?: string;
}

// DeckAndControls Component Types
export interface DeckAndControlsProps {
  deckSize: number;
  discardPile: Card[];
  tempDiscardedCard: Card | null;
  selectedCardsCount: number;
  onPlayWord?: () => void;
  onExtendWord?: () => void;
  onCancelExtend?: () => void;
  onDiscard?: () => void;
  onDraw?: () => void;
  onDrawFromDiscard?: () => void;
  isCurrentTurn?: boolean;
  gamePhase?: 'lobby' | 'playing' | 'roundEnd' | 'gameOver';
  hasDiscardedThisTurn?: boolean;
  hasPlayedWords?: boolean;
  isExtendMode?: boolean;
}

// GameBoard Component Types
export interface GameBoardProps {
  gameState: GameState;
  myPlayerId?: string;
  onCardSelect?: (card: Card, playerId: string) => void;
  onPlayWord?: () => void;
  onDiscard?: () => void;
  onDraw?: () => void;
  onGameStateUpdate?: (newGameState: GameState) => void;
}

// PlayWordModal Component Types
export interface PlayWordModalProps {
  isOpen: boolean;
  selectedCards: Card[];
  onClose: () => void;
  onConfirm: (word: string) => void;
}

// Shared Types
export interface GameStatus {
  roundNumber: number;
  currentPlayerName: string;
  deckSize: number;
  discardSize: number;
}

// GameStatus Component Types
export interface GameStatusProps {
  gameStatus?: GameStatus;
}

// PlayedWord Component Types
export interface PlayedWordProps {
  playedWord: PlayedWord;
  playerName: string;
  isSelected?: boolean;
  isExtendMode?: boolean;
  onClick?: () => void;
}

// WordPreview Component Types
export interface WordPreviewProps {
  selectedCards: Card[];
}

// Import the base types from game.ts
import { Card, Player, PlayedWord, GameState } from './game'; 