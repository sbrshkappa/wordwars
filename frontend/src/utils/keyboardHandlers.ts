import { Card, GameState } from '@/shared/types/game';
import { getCurrentPlayer } from '@/shared/gameLogic';

export interface KeyboardHandlerResult {
  newSelectedCards: Set<string>;
  shakeHand: boolean;
  selectedCard?: Card;
  deselectedCard?: Card;
}

export function handleCardSelectionKeyPress(
  event: KeyboardEvent,
  selectedCards: Set<string>,
  gameState: GameState
): KeyboardHandlerResult {
  const currentPlayer = getCurrentPlayer(gameState);
  
  // Only handle key presses when it's the current player's turn and game is playing
  if (!currentPlayer.isCurrentTurn || gameState.gamePhase !== 'playing') {
    return { newSelectedCards: selectedCards, shakeHand: false };
  }
  
  const key = event.key.toUpperCase();
  
  // Handle backspace to deselect last card
  if (event.key === 'Backspace') {
    if (selectedCards.size > 0) {
      const selectedCardsArray = Array.from(selectedCards).map(cardId => 
        currentPlayer.hand.find(card => card.id === cardId)!
      );
      const lastSelectedCard = selectedCardsArray[selectedCardsArray.length - 1];
      
      const newSelected = new Set(selectedCards);
      newSelected.delete(lastSelectedCard.id);
      
      console.log('Last card deselected via backspace:', lastSelectedCard.letter, 'Selected cards:', Array.from(newSelected));
      
      return {
        newSelectedCards: newSelected,
        shakeHand: false,
        deselectedCard: lastSelectedCard
      };
    }
    return { newSelectedCards: selectedCards, shakeHand: false };
  }
  
  // Check if the key matches any card in the current player's hand
  const matchingCard = currentPlayer.hand.find(card => 
    card.letter === key || 
    (card.isMaster && card.assignedLetter === key)
  );
  
  if (matchingCard) {
    // Toggle selection of the matching card
    const newSelected = new Set(selectedCards);
    if (newSelected.has(matchingCard.id)) {
      newSelected.delete(matchingCard.id);
      console.log('Card deselected via keyboard:', matchingCard.letter, 'Selected cards:', Array.from(newSelected));
      return {
        newSelectedCards: newSelected,
        shakeHand: false,
        deselectedCard: matchingCard
      };
    } else {
      newSelected.add(matchingCard.id);
      console.log('Card selected via keyboard:', matchingCard.letter, 'Selected cards:', Array.from(newSelected));
      return {
        newSelectedCards: newSelected,
        shakeHand: false,
        selectedCard: matchingCard
      };
    }
  } else {
    // Visual feedback for invalid key
    console.log('Invalid key pressed:', key, 'No matching card found');
    return {
      newSelectedCards: selectedCards,
      shakeHand: true
    };
  }
} 