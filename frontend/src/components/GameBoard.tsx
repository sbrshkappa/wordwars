'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Card as CardType, PlayedWord } from '@/shared/types/game';
import { getCurrentPlayer, playWordWithValidation, extendWordWithValidation, isValidWord, discardCard, drawCard, drawFromDiscard, endTurn, startGame } from '@/shared/gameLogic';
import { handleCardSelectionKeyPress } from '@/utils/keyboardHandlers';
import PlayerArea from './PlayerArea';
import PlayingField from './PlayingField';
import DeckAndControls from './DeckAndControls';
import MasterCardModal from './MasterCardModal';
import TurnIndicator from './TurnIndicator';
import ExtendWordModal from './ExtendWordModal';
import { GameBoardProps } from '@/shared/types/components';

export default function GameBoard({ 
  gameState, 
  myPlayerId,
  onCardSelect, 
  onPlayWord, 
  onDiscard, 
  onDraw,
  onGameStateUpdate
}: GameBoardProps) {

  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [shakeHand, setShakeHand] = useState(false);
  const [masterCardModal, setMasterCardModal] = useState<{ isOpen: boolean; card: CardType | null }>({
    isOpen: false,
    card: null
  });
  const [extendWordModal, setExtendWordModal] = useState<{ isOpen: boolean; wordToExtend: PlayedWord | null }>({
    isOpen: false,
    wordToExtend: null
  });
  const [extendMode, setExtendMode] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  // Find which player this device represents
  const myPlayer = gameState.players.find(p => p.id === myPlayerId);
  const currentPlayer = getCurrentPlayer(gameState);
  const isMyTurn = myPlayer?.id === currentPlayer.id;
  

  
  // Show turn status in UI
  const turnStatus = isMyTurn ? "🎯 YOUR TURN" : `⏳ ${currentPlayer?.name}'s turn`;

  const handleCardClick = (card: CardType, playerId: string) => {
    // Only allow actions during this device's turn and when game is playing
    if (playerId === myPlayerId && isMyTurn && gameState.gamePhase === 'playing') {
      // Check if this is an unassigned master card
      if (card.isMaster && !card.assignedLetter) {
        setMasterCardModal({ isOpen: true, card });
        return;
      }

      const newSelected = new Set(selectedCards);
      if (newSelected.has(card.id)) {
        newSelected.delete(card.id);
      } else {
        newSelected.add(card.id);
      }
      setSelectedCards(newSelected);

      onCardSelect?.(card, playerId);
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const result = handleCardSelectionKeyPress(event, selectedCards, gameState);
    
    setSelectedCards(result.newSelectedCards);
    
    if (result.shakeHand) {
      setShakeHand(true);
      setTimeout(() => setShakeHand(false), 500); // Stop shaking after 500ms
    }
    
    // Call onCardSelect callback if a card was selected or deselected
    if (result.selectedCard) {
      onCardSelect?.(result.selectedCard, currentPlayer.id);
    } else if (result.deselectedCard) {
      onCardSelect?.(result.deselectedCard, currentPlayer.id);
    }
  }, [selectedCards, gameState, onCardSelect, currentPlayer.id]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedCards, currentPlayer, handleKeyPress]);

  const gameStatus = {
    roundNumber: gameState.roundNumber,
    currentPlayerName: currentPlayer.name,
    deckSize: gameState.deck.length,
    discardSize: gameState.discardPile.length
  };

  const handleAssignLetter = (cardId: string, letter: string) => {
    // Update the card in the game state
    const updatedGameState = {
      ...gameState,
      players: gameState.players.map(player => ({
        ...player,
        hand: player.hand.map(card => 
          card.id === cardId 
            ? { ...card, assignedLetter: letter }
            : card
        )
      }))
    };
    
    // Update the game state
    onGameStateUpdate?.(updatedGameState);
    
    // Close the modal
    setMasterCardModal({ isOpen: false, card: null });
    

  };

  const handlePlayWordClick = async () => {
    // Only allow during this device's turn and when game is playing
    if (gameState.gamePhase !== 'playing' || !isMyTurn) return;
    
    if (selectedCards.size === 0) return;
    
    const selectedCardsArray = Array.from(selectedCards).map(cardId => 
      currentPlayer.hand.find(card => card.id === cardId)!
    );
    
    // Generate the word from selected cards (use assigned letter for master cards)
    const word = selectedCardsArray.map(card => 
      card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
    ).join('');
    
    // Basic validation first
    if (!isValidWord(word)) {
      setNotification({ message: 'Word must be at least 2 letters long', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return;
    }
    
    // Show loading notification
    setNotification({ message: 'Checking word validity...', type: 'success' });
    
    // Play the word with dictionary validation
    const result = await playWordWithValidation(gameState, currentPlayer.id, selectedCardsArray, word);
    
    if (result.success) {
      // Update the game state
      onGameStateUpdate?.(result.gameState);
      
      // Call the parent's onPlayWord callback
      onPlayWord?.();
      
      // Clear selection after playing
      setSelectedCards(new Set());
      
      // Show success notification
      setNotification({ message: `Word "${word}" played successfully!`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      // Show error notification
      setNotification({ message: result.error || 'Failed to play word', type: 'error' });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleExtendWordClick = () => {
    // Only allow during this device's turn and when game is playing
    if (gameState.gamePhase !== 'playing' || !isMyTurn) return;
    
    // Check if there are any played words to extend
    if (gameState.playedWords.length === 0) {
      setNotification({ message: 'No words on the board to extend', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return;
    }
    
    // Enter extend mode - words will start waddling
    setExtendMode(true);
    setSelectedWordId(null);
    
    // Show notification
    setNotification({ message: 'Click on a word to extend it', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExtendWordConfirm = async (newWord: string) => {
    if (!extendWordModal.wordToExtend) return;
    
    const selectedCardsArray = Array.from(selectedCards).map(cardId => 
      currentPlayer.hand.find(card => card.id === cardId)!
    );
    
    // Show loading notification
    setNotification({ message: 'Checking word validity...', type: 'success' });
    
    // Extend the word with dictionary validation
    const result = await extendWordWithValidation(
      gameState, 
      currentPlayer.id, 
      extendWordModal.wordToExtend.id, 
      selectedCardsArray, 
      newWord
    );
    
    if (result.success) {
      // Update the game state
      onGameStateUpdate?.(result.gameState);
      
      // Close the modal
      setExtendWordModal({ isOpen: false, wordToExtend: null });
      
      // Clear selection after extending
      setSelectedCards(new Set());
      
      // Show success notification
      setNotification({ message: `Extended word to: "${newWord}"!`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      // Show error notification
      setNotification({ message: result.error || 'Failed to extend word', type: 'error' });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleWordSelect = (wordId: string) => {
    if (!extendMode) return;
    
    // Find the word to extend
    const wordToExtend = gameState.playedWords.find(word => word.id === wordId);
    if (!wordToExtend) return;
    
    // Set the selected word
    setSelectedWordId(wordId);
    
    // Open the extend word modal
    setExtendWordModal({ isOpen: true, wordToExtend });
    
    // Exit extend mode
    setExtendMode(false);
  };

  const handleExtendWordCancel = () => {
    // Exit extend mode
    setExtendMode(false);
    setSelectedWordId(null);
  };

  const handleDiscardClick = () => {
    // Only allow during this device's turn and when game is playing
    if (gameState.gamePhase !== 'playing' || !isMyTurn) return;
    
    if (selectedCards.size !== 1) return;
    
    const selectedCardId = Array.from(selectedCards)[0];
    const cardToDiscard = currentPlayer.hand.find(card => card.id === selectedCardId);
    
    if (!cardToDiscard) return;
    
    // Discard the card and update game state
    const newGameState = discardCard(gameState, currentPlayer.id, cardToDiscard);
    
    // Update the game state
    onGameStateUpdate?.(newGameState);
    
    // Call the parent's onDiscard callback
    onDiscard?.();
    
    // Clear selection after discarding
    setSelectedCards(new Set());
    
    // Show notification
    setNotification({ message: `Discarded: ${cardToDiscard.letter}. You can now draw a card.`, type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    
    console.log(`Card discarded: ${cardToDiscard.letter}`);
  };

  const handleDrawClick = () => {
    // Only allow during this device's turn and when game is playing
    if (gameState.gamePhase !== 'playing' || !isMyTurn) return;
    
    // Check if player has discarded this turn
    if (!currentPlayer.hasDiscardedThisTurn) {
      setNotification({ message: 'Must discard a card before drawing', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      console.log('Cannot draw: must discard first');
      return;
    }
    
    // Check if deck is empty
    if (gameState.deck.length === 0) {
      setNotification({ message: 'Cannot draw: deck is empty', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      console.log('Cannot draw: deck is empty');
      return;
    }
    
    // Draw a card and update game state
    const newGameState = drawCard(gameState, currentPlayer.id);
    
    // Update the game state
    onGameStateUpdate?.(newGameState);
    
    // Call the parent's onDraw callback
    onDraw?.();
    
    // Show notification
    setNotification({ message: 'Card drawn from deck', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
    

  };

  const handleDrawFromDiscardClick = () => {
    // Only allow during this device's turn and when game is playing
    if (gameState.gamePhase !== 'playing' || !isMyTurn) return;
    
    // Check if player has discarded this turn
    if (!currentPlayer.hasDiscardedThisTurn) {
      setNotification({ message: 'Must discard a card before drawing', type: 'error' });
      setTimeout(() => setNotification(null), 2000);

      return;
    }
    
    // Check if discard pile has at least 1 card
    if (gameState.discardPile.length < 1) {
      setNotification({ message: 'Cannot draw from discard: discard pile is empty', type: 'error' });
      setTimeout(() => setNotification(null), 2000);

      return;
    }
    
    // Draw from discard and update game state
    const newGameState = drawFromDiscard(gameState, currentPlayer.id);
    
    // Update the game state
    onGameStateUpdate?.(newGameState);
    
    // Call the parent's onDraw callback
    onDraw?.();
    
    // Show notification
    setNotification({ message: 'Card drawn from discard pile', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
    

  };

  const handleEndTurn = () => {
    const newGameState = endTurn(gameState);
    onGameStateUpdate?.(newGameState);
    
    // Clear selection when turn ends
    setSelectedCards(new Set());
    
    // Show notification
    const nextPlayer = getCurrentPlayer(newGameState);
    setNotification({ message: `Turn ended. ${nextPlayer.name}'s turn now.`, type: 'success' });
    setTimeout(() => setNotification(null), 2000);
    

  };

  const handleStartGame = () => {
    const newGameState = startGame([gameState.players[0].name, gameState.players[1].name]);
    onGameStateUpdate?.(newGameState);
    
    setNotification({ message: 'Game started!', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
    

  };

  const handleNewGame = () => {
    // Reset to lobby state
    const resetGameState: GameState = {
      ...gameState,
      gamePhase: 'lobby',
      winner: null,
      playedWords: [],
      roundNumber: 1
    };
    onGameStateUpdate?.(resetGameState);
    
    setNotification({ message: 'New game ready!', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
    

  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600 p-1 sm:p-2 min-h-0 overflow-hidden relative">
      {/* Turn Status */}
      <div className="absolute top-2 left-2 right-2 z-50 bg-black/70 text-white text-center py-1 px-2 rounded text-sm font-bold">
        {turnStatus}
      </div>
      {/* Top Player Area (Opponent) - Fixed Height */}
      <div className="h-20 sm:h-28 flex-shrink-0">
        <PlayerArea
          player={myPlayer?.id === gameState.players[0].id ? gameState.players[1] : gameState.players[0]}
          isCurrentPlayer={false}
          isOpponent={true}
        />
      </div>

      {/* Central Game Area - Flexible, takes remaining space */}
      <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden gap-1 sm:gap-2">
        
        {/* Playing Field - Takes most space */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <PlayingField
            playedWords={gameState.playedWords}
            players={gameState.players}
            gameStatus={gameStatus}
            isExtendMode={extendMode}
            selectedWordId={selectedWordId}
            onWordSelect={handleWordSelect}
          />
        </div>

        {/* Right Sidebar - Turn Indicator and Controls */}
        <div className="w-full sm:w-64 sm:ml-2 flex-shrink-0 flex flex-col gap-1 sm:gap-2">
          {/* Turn Indicator */}
          <TurnIndicator
            gameState={gameState}
            onEndTurn={handleEndTurn}
            onStartGame={handleStartGame}
            onNewGame={handleNewGame}
          />
          
          {/* Deck and Controls */}
          <DeckAndControls
            deckSize={gameState.deck.length}
            discardPile={gameState.discardPile}
            tempDiscardedCard={gameState.tempDiscardedCard}
            selectedCardsCount={selectedCards.size}
            onPlayWord={handlePlayWordClick}
            onExtendWord={handleExtendWordClick}
            onCancelExtend={handleExtendWordCancel}
            onDiscard={handleDiscardClick}
            onDraw={handleDrawClick}
            onDrawFromDiscard={handleDrawFromDiscardClick}
            isCurrentTurn={isMyTurn}
            gamePhase={gameState.gamePhase}
            hasDiscardedThisTurn={myPlayer?.hasDiscardedThisTurn || false}
            hasPlayedWords={gameState.playedWords.length > 0}
            isExtendMode={extendMode}
          />
        </div>
      </div>

              {/* Bottom Player Area (Current Player) - Fixed to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-br from-green-800 to-green-600">
        <div className="p-1 sm:p-2">
            <PlayerArea
            player={myPlayer || gameState.players[0]}
              isCurrentPlayer={true}
              selectedCards={selectedCards}
              onCardClick={handleCardClick}
              shakeHand={shakeHand}
            />
          </div>
        </div>

      {/* Master Card Modal */}
      <MasterCardModal
        isOpen={masterCardModal.isOpen}
        masterCard={masterCardModal.card}
        onClose={() => setMasterCardModal({ isOpen: false, card: null })}
        onAssignLetter={handleAssignLetter}
      />

      {/* Extend Word Modal */}
      <ExtendWordModal
        isOpen={extendWordModal.isOpen}
        selectedCards={Array.from(selectedCards).map(cardId => 
          currentPlayer.hand.find(card => card.id === cardId)!
        )}
        wordToExtend={extendWordModal.wordToExtend}
        onClose={() => {
          setExtendWordModal({ isOpen: false, wordToExtend: null });
          handleExtendWordCancel();
        }}
        onConfirm={handleExtendWordConfirm}
      />

      {/* Notification */}
      {notification && (
        <div className={`fixed top-2 sm:top-4 right-2 sm:right-4 left-2 sm:left-auto px-3 sm:px-4 py-2 rounded-md text-white text-xs sm:text-sm font-medium z-50 transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}

    </div>
  );
} 