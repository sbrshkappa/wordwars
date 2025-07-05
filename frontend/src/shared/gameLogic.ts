import { Card, GameState, Player, PlayedWord, CARD_VALUES, CARD_DISTRIBUTION } from './types/game';

// Create a new deck based on the card distribution rules
export function createDeck(): Card[] {
  const deck: Card[] = [];
  let cardId = 0;

  Object.entries(CARD_DISTRIBUTION).forEach(([letter, count]) => {
    for (let i = 0; i < count; i++) {
      deck.push({
        id: `card_${cardId++}`,
        letter,
        points: CARD_VALUES[letter],
        isMaster: letter === 'MASTER'
      });
    }
  });

  // Verify total deck size
  const expectedTotal = Object.values(CARD_DISTRIBUTION).reduce((sum, count) => sum + count, 0);
  if (deck.length !== expectedTotal) {
    throw new Error(`Deck creation error: Expected ${expectedTotal} cards, got ${deck.length}`);
  }

  console.log(`Deck created with ${deck.length} cards`);
  return deck;
}

// Shuffle the deck using Fisher-Yates algorithm
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Deal cards to players
export function dealCards(players: Player[], deck: Card[], cardsPerPlayer: number = 10): {
  updatedPlayers: Player[];
  remainingDeck: Card[];
  discardPile: Card[];
} {
  const updatedPlayers: Player[] = players.map(player => ({ ...player, hand: [] }));
  const remainingDeck = [...deck];

  console.log(`Dealing ${cardsPerPlayer} cards to ${players.length} players from deck of ${deck.length} cards`);

  // Deal cards to each player
  for (let round = 0; round < cardsPerPlayer; round++) {
    for (let playerIndex = 0; playerIndex < updatedPlayers.length; playerIndex++) {
      if (remainingDeck.length > 0) {
        const card = remainingDeck.pop()!;
        updatedPlayers[playerIndex].hand = [...updatedPlayers[playerIndex].hand, card];
      } else {
        console.warn(`Deck ran out during dealing! Round ${round}, Player ${playerIndex}`);
        break;
      }
    }
  }

  // STRICT validation that each player has exactly the correct number of cards
  let hasError = false;
  updatedPlayers.forEach((player, index) => {
    if (player.hand.length !== cardsPerPlayer) {
      console.error(`ERROR: Player ${index} (${player.name}) has ${player.hand.length} cards instead of ${cardsPerPlayer}!`);
      console.error('Player hand:', player.hand.map(c => c.letter));
      hasError = true;
    }
  });

  // If there's an error, throw an exception to prevent the game from continuing
  if (hasError) {
    throw new Error(`Card dealing error: Players have wrong number of cards. Expected ${cardsPerPlayer} each.`);
  }

  // Start with empty discard pile
  const discardPile: Card[] = [];

  console.log(`Dealing complete. Remaining deck: ${remainingDeck.length} cards, Discard pile: ${discardPile.length} cards`);

  return {
    updatedPlayers,
    remainingDeck,
    discardPile
  };
}

// Check if a word is valid (basic implementation - can be enhanced with dictionary)
export function isValidWord(word: string): boolean {
  // Basic validation: word must be at least 2 letters and contain only letters
  return word.length >= 2 && /^[A-Z]+$/.test(word);
}

// Check if a word is valid using dictionary (async)
export async function isValidDictionaryWord(word: string): Promise<boolean> {
  // Import here to avoid circular dependencies
  const { isValidDictionaryWordCached } = await import('./dictionaryService');
  return isValidDictionaryWordCached(word);
}

// Calculate score for remaining cards in hand
export function calculateHandScore(cards: Card[]): number {
  return cards.reduce((total, card) => total + card.points, 0);
}

// Check if a player can play a word with their cards
export function canFormWord(cards: Card[], word: string): boolean {
  // Get effective letters (use assigned letters for master cards)
  const cardLetters = cards.map(card => 
    card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  );
  const wordLetters = word.split('');
  
  // Count letter frequencies
  const cardCounts: Record<string, number> = {};
  const wordCounts: Record<string, number> = {};
  
  cardLetters.forEach(letter => {
    cardCounts[letter] = (cardCounts[letter] || 0) + 1;
  });
  
  wordLetters.forEach(letter => {
    wordCounts[letter] = (wordCounts[letter] || 0) + 1;
  });
  
  // Check if we have enough cards for each letter
  for (const [letter, count] of Object.entries(wordCounts)) {
    const availableCards = cardCounts[letter] || 0;
    
    if (availableCards < count) {
      return false;
    }
  }
  
  return true;
}

// Check if a new word can be formed by inserting selected letters into an original word
export function canFormExtendedWord(originalWord: string, selectedLetters: string[], newWord: string): boolean {
  // Check if the new word length equals original word length plus selected letters length
  if (newWord.length !== originalWord.length + selectedLetters.length) {
    return false;
  }
  
  // Create frequency maps
  const originalLetterCounts = new Map<string, number>();
  const selectedLetterCounts = new Map<string, number>();
  const newWordLetterCounts = new Map<string, number>();
  
  // Count letters in original word
  for (const letter of originalWord) {
    originalLetterCounts.set(letter, (originalLetterCounts.get(letter) || 0) + 1);
  }
  
  // Count letters in selected cards
  for (const letter of selectedLetters) {
    selectedLetterCounts.set(letter, (selectedLetterCounts.get(letter) || 0) + 1);
  }
  
  // Count letters in new word
  for (const letter of newWord) {
    newWordLetterCounts.set(letter, (newWordLetterCounts.get(letter) || 0) + 1);
  }
  
  // Check if the new word contains exactly the letters from original + selected
  for (const [letter, count] of newWordLetterCounts) {
    const originalCount = originalLetterCounts.get(letter) || 0;
    const selectedCount = selectedLetterCounts.get(letter) || 0;
    const expectedCount = originalCount + selectedCount;
    
    if (count !== expectedCount) {
      return false;
    }
  }
  
  // Check if all original and selected letters are used
  for (const [letter, count] of originalLetterCounts) {
    const newCount = newWordLetterCounts.get(letter) || 0;
    if (newCount < count) {
      return false;
    }
  }
  
  for (const [letter, count] of selectedLetterCounts) {
    const newCount = newWordLetterCounts.get(letter) || 0;
    if (newCount < count) {
      return false;
    }
  }
  
  return true;
}

// Reconstruct the cards array to match the new word after extension
export function reconstructCardsForWord(originalCards: Card[], newCards: Card[], newWord: string): Card[] {
  const originalLetters = originalCards.map(card => 
    card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  );
  const newLetters = newCards.map(card => 
    card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  );
  
  const result: Card[] = [];
  let originalIndex = 0;
  let newIndex = 0;
  
  for (let i = 0; i < newWord.length; i++) {
    const currentLetter = newWord[i];
    
    // Check if this letter comes from the original word
    if (originalIndex < originalLetters.length && currentLetter === originalLetters[originalIndex]) {
      result.push(originalCards[originalIndex]);
      originalIndex++;
    } else {
      // This letter comes from the new cards
      if (newIndex < newLetters.length && currentLetter === newLetters[newIndex]) {
        result.push(newCards[newIndex]);
        newIndex++;
      } else {
        // Find the matching new card (for duplicate letters)
        const matchingNewCardIndex = newLetters.findIndex((letter, idx) => 
          idx >= newIndex && letter === currentLetter
        );
        if (matchingNewCardIndex !== -1) {
          result.push(newCards[matchingNewCardIndex]);
          newIndex = matchingNewCardIndex + 1;
        }
      }
    }
  }
  
  return result;
}

// Initialize a new game
export function initializeGame(playerNames: string[]): GameState {
  const deck = shuffleDeck(createDeck());
  
  const players: Player[] = playerNames.map((name, index) => ({
    id: `player_${index}`,
    name,
    hand: [],
    score: 0,
    isCurrentTurn: index === 0,
    hasDiscardedThisTurn: false
  }));

  const { updatedPlayers, remainingDeck, discardPile } = dealCards(players, deck);

  const gameState: GameState = {
    players: updatedPlayers,
    currentPlayerIndex: 0,
    deck: remainingDeck,
    discardPile,
    tempDiscardedCard: null,
    playedWords: [],
    gamePhase: 'lobby',
    roundNumber: 1,
    winner: null
  };

  // Validate the game state after initialization
  const validation = validateGameState(gameState);
  if (!validation.isValid) {
    console.error('Game state validation failed after initialization:', validation.errors);
  }

  return gameState;
}

// Get current player
export function getCurrentPlayer(gameState: GameState): Player {
  return gameState.players[gameState.currentPlayerIndex];
}

// Switch to next player's turn
export function nextTurn(gameState: GameState): GameState {
  const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  
  return {
    ...gameState,
    currentPlayerIndex: nextPlayerIndex,
    players: gameState.players.map((player, index) => ({
      ...player,
      isCurrentTurn: index === nextPlayerIndex,
      hasDiscardedThisTurn: false
    }))
  };
}

// Play a word with selected cards (async version with dictionary validation)
export async function playWordWithValidation(
  gameState: GameState,
  playerId: string,
  selectedCards: Card[],
  word: string
): Promise<{ success: boolean; gameState: GameState; error?: string }> {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) {
    return { success: false, gameState, error: 'Player not found' };
  }

  // Check if word is valid in dictionary
  const isValid = await isValidDictionaryWord(word);
  if (!isValid) {
    return { 
      success: false, 
      gameState, 
      error: `"${word}" is not a valid word. Please try a different word.` 
    };
  }

  // Remove cards from player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  // Remove selected cards from hand
  const selectedCardIds = new Set(selectedCards.map(card => card.id));
  player.hand = player.hand.filter(card => !selectedCardIds.has(card.id));
  
  // Calculate word score and add to player's score
  const wordScore = selectedCards.reduce((total, card) => total + card.points, 0);
  player.score += wordScore;
  
  updatedPlayers[playerIndex] = player;

  // Create new played word with effective letters
  const effectiveCards = selectedCards.map(card => ({
    ...card,
    letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  }));

  const newPlayedWord: PlayedWord = {
    id: `word_${Date.now()}`,
    word,
    cards: effectiveCards,
    playerId,
    playerName: player.name,
    score: wordScore,
    timestamp: Date.now(),
    position: { x: 0, y: 0 } // We'll implement positioning later
  };

  const gameStateWithWord = {
    ...gameState,
    players: updatedPlayers,
    playedWords: [...gameState.playedWords, newPlayedWord]
  };

  // End turn after playing a word
  return { success: true, gameState: endTurn(gameStateWithWord) };
}

// Play a word with selected cards (sync version for backward compatibility)
export function playWord(
  gameState: GameState,
  playerId: string,
  selectedCards: Card[],
  word: string
): GameState {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return gameState;

  // Remove cards from player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  // Remove selected cards from hand
  const selectedCardIds = new Set(selectedCards.map(card => card.id));
  player.hand = player.hand.filter(card => !selectedCardIds.has(card.id));
  
  // Calculate word score and add to player's score
  const wordScore = selectedCards.reduce((total, card) => total + card.points, 0);
  player.score += wordScore;
  
  updatedPlayers[playerIndex] = player;

  // Create new played word with effective letters
  const effectiveCards = selectedCards.map(card => ({
    ...card,
    letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  }));

  const newPlayedWord: PlayedWord = {
    id: `word_${Date.now()}`,
    word,
    cards: effectiveCards,
    playerId,
    playerName: player.name,
    score: wordScore,
    timestamp: Date.now(),
    position: { x: 0, y: 0 } // We'll implement positioning later
  };

  const gameStateWithWord = {
    ...gameState,
    players: updatedPlayers,
    playedWords: [...gameState.playedWords, newPlayedWord]
  };

  // End turn after playing a word
  return endTurn(gameStateWithWord);
}

// Check if a player has won (empty hand)
export function checkForWinner(gameState: GameState): string | null {
  const playerWithEmptyHand = gameState.players.find(player => player.hand.length === 0);
  return playerWithEmptyHand ? playerWithEmptyHand.id : null;
}

// Discard a card from player's hand
export function discardCard(
  gameState: GameState,
  playerId: string,
  cardToDiscard: Card
): GameState {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return gameState;

  // Remove card from player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  player.hand = player.hand.filter(card => card.id !== cardToDiscard.id);
  player.hasDiscardedThisTurn = true; // Mark that player has discarded this turn
  updatedPlayers[playerIndex] = player;

  // Temporarily store the discarded card (not yet added to discard pile)
  return {
    ...gameState,
    players: updatedPlayers,
    tempDiscardedCard: cardToDiscard
  };
}

// Draw a card from the deck
export function drawCard(
  gameState: GameState,
  playerId: string
): GameState {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return gameState;

  const currentPlayer = gameState.players[playerIndex];

  // Check if player has discarded this turn
  if (!currentPlayer.hasDiscardedThisTurn) {
    console.log('Cannot draw: must discard a card first');
    return gameState;
  }

  // Check if deck is empty
  if (gameState.deck.length === 0) {
    console.log('Cannot draw: deck is empty');
    return gameState;
  }

  // Check if player already has 10 cards (shouldn't happen after discard, but safety check)
  if (currentPlayer.hand.length >= 10) {
    console.error(`Player ${currentPlayer.name} already has ${currentPlayer.hand.length} cards, cannot draw more`);
    return gameState;
  }

  // Draw card from deck
  const updatedDeck = [...gameState.deck];
  const drawnCard = updatedDeck.pop()!;

  // Add card to player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  player.hand = [...player.hand, drawnCard];
  updatedPlayers[playerIndex] = player;

  // Move the temporarily discarded card to the discard pile
  const updatedDiscardPile = [...gameState.discardPile];
  if (gameState.tempDiscardedCard) {
    updatedDiscardPile.push(gameState.tempDiscardedCard);
  }

  const gameStateWithDraw = {
    ...gameState,
    players: updatedPlayers,
    deck: updatedDeck,
    discardPile: updatedDiscardPile,
    tempDiscardedCard: null
  };

  // Validate the game state after drawing
  const validation = validateGameState(gameStateWithDraw);
  if (!validation.isValid) {
    console.error('Game state validation failed after drawing card:', validation.errors);
  }

  // End turn after drawing a card
  return endTurn(gameStateWithDraw);
}

// Draw the previous top card from discard pile (not the card just discarded)
export function drawFromDiscard(
  gameState: GameState,
  playerId: string
): GameState {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return gameState;

  const currentPlayer = gameState.players[playerIndex];

  // Check if player has discarded this turn
  if (!currentPlayer.hasDiscardedThisTurn) {
    console.log('Cannot draw from discard: must discard a card first');
    return gameState;
  }

  // Check if discard pile has at least 1 card (the card that was previously discarded)
  if (gameState.discardPile.length < 1) {
    console.log('Cannot draw from discard: discard pile is empty');
    return gameState;
  }

  // Check if player already has 10 cards (shouldn't happen after discard, but safety check)
  if (currentPlayer.hand.length >= 10) {
    console.error(`Player ${currentPlayer.name} already has ${currentPlayer.hand.length} cards, cannot draw more`);
    return gameState;
  }

  // Get the top card from discard pile (the card that was previously discarded)
  const updatedDiscardPile = [...gameState.discardPile];
  const drawnCard = updatedDiscardPile.pop()!; // Get the top card

  // Add card to player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  player.hand = [...player.hand, drawnCard];
  updatedPlayers[playerIndex] = player;

  // Move the temporarily discarded card to the discard pile
  const finalDiscardPile = [...updatedDiscardPile];
  if (gameState.tempDiscardedCard) {
    finalDiscardPile.push(gameState.tempDiscardedCard);
  }

  const gameStateWithDraw = {
    ...gameState,
    players: updatedPlayers,
    discardPile: finalDiscardPile,
    tempDiscardedCard: null
  };

  // Validate the game state after drawing
  const validation = validateGameState(gameStateWithDraw);
  if (!validation.isValid) {
    console.error('Game state validation failed after drawing from discard:', validation.errors);
  }

  // End turn after drawing from discard
  return endTurn(gameStateWithDraw);
}

// End current player's turn
export function endTurn(gameState: GameState): GameState {
  // Check for win condition first
  const winner = checkForWinner(gameState);
  if (winner) {
    return {
      ...gameState,
      gamePhase: 'gameOver',
      winner
    };
  }

  // Switch to next player
  return nextTurn(gameState);
}

// Start a new game
export function startGame(playerNames: string[]): GameState {
  const gameState = initializeGame(playerNames);
  return {
    ...gameState,
    gamePhase: 'playing'
  };
}

// Validate game state for consistency
export function validateGameState(gameState: GameState): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check that no player has more than 10 cards
  gameState.players.forEach((player, index) => {
    if (player.hand.length > 10) {
      errors.push(`Player ${index} (${player.name}) has ${player.hand.length} cards (should be ≤10)`);
    }
  });
  
  // Check that total cards in game equals expected total
  const totalCardsInHands = gameState.players.reduce((sum, player) => sum + player.hand.length, 0);
  const totalCardsInPlayedWords = gameState.playedWords.reduce((sum, word) => sum + word.cards.length, 0);
  const totalCardsInDiscard = gameState.discardPile.length;
  const totalCardsInDeck = gameState.deck.length;
  const totalCardsInTempDiscard = gameState.tempDiscardedCard ? 1 : 0;
  
  const totalCardsInGame = totalCardsInHands + totalCardsInPlayedWords + totalCardsInDiscard + totalCardsInDeck + totalCardsInTempDiscard;
  const expectedTotalCards = Object.values(CARD_DISTRIBUTION).reduce((sum, count) => sum + count, 0);
  
  if (totalCardsInGame !== expectedTotalCards) {
    errors.push(`Total cards in game (${totalCardsInGame}) doesn't match expected total (${expectedTotalCards})`);
    errors.push(`Breakdown: Hands=${totalCardsInHands}, Played=${totalCardsInPlayedWords}, Discard=${totalCardsInDiscard}, Deck=${totalCardsInDeck}, Temp=${totalCardsInTempDiscard}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Check if game should end (deck empty and no more plays possible)
export function checkGameEnd(gameState: GameState): boolean {
  // Game ends if deck is empty and all players have no valid plays
  if (gameState.deck.length > 0) return false;
  
  // Check if any player can make a valid play
  for (const player of gameState.players) {
    if (player.hand.length > 0) {
      // For now, assume any cards can form some word
      // In a real implementation, you'd check if they can actually form valid words
      return false;
    }
  }
  
  return true;
}

// Calculate final scores and determine winner
export function calculateFinalScores(gameState: GameState): GameState {
  const updatedPlayers = gameState.players.map(player => {
    // Calculate penalty for remaining cards
    const handPenalty = calculateHandScore(player.hand);
    const finalScore = Math.max(0, player.score - handPenalty);
    
    return {
      ...player,
      score: finalScore
    };
  });

  // Find winner (player with highest score)
  const winner = updatedPlayers.reduce((highest, current) => 
    current.score > highest.score ? current : highest
  );

  return {
    ...gameState,
    players: updatedPlayers,
    gamePhase: 'gameOver',
    winner: winner.id
  };
}

// End the game and calculate final scores
export function endGame(gameState: GameState): GameState {
  return calculateFinalScores(gameState);
}

// Extend an existing word by inserting cards (async version with dictionary validation)
export async function extendWordWithValidation(
  gameState: GameState,
  playerId: string,
  wordId: string,
  selectedCards: Card[],
  newWord: string
): Promise<{ success: boolean; gameState: GameState; error?: string }> {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) {
    return { success: false, gameState, error: 'Player not found' };
  }

  // Find the word to extend
  const wordToExtend = gameState.playedWords.find(word => word.id === wordId);
  if (!wordToExtend) {
    return { success: false, gameState, error: 'Word not found for extension' };
  }

  // Validate that the new word can be formed by inserting selected cards into the original word
  const selectedLetters = selectedCards.map(card => 
    card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  );
  
  if (!canFormExtendedWord(wordToExtend.word, selectedLetters, newWord)) {
    return { 
      success: false, 
      gameState, 
      error: 'New word cannot be formed by inserting the selected cards into the original word' 
    };
  }

  // Check if word is valid in dictionary
  const isValid = await isValidDictionaryWord(newWord);
  if (!isValid) {
    return { 
      success: false, 
      gameState, 
      error: `"${newWord}" is not a valid word. Please try a different word.` 
    };
  }

  // Remove selected cards from player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  const selectedCardIds = new Set(selectedCards.map(card => card.id));
  player.hand = player.hand.filter(card => !selectedCardIds.has(card.id));
  
  // Calculate word score and add to player's score
  const wordScore = selectedCards.reduce((total, card) => total + card.points, 0);
  player.score += wordScore;
  
  updatedPlayers[playerIndex] = player;

  // Create new extended word with proper card ordering
  const effectiveCards = selectedCards.map(card => ({
    ...card,
    letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  }));

  // Reconstruct the cards array to match the new word
  const allCards = reconstructCardsForWord(wordToExtend.cards, effectiveCards, newWord);

  const extendedWord: PlayedWord = {
    id: `word_${Date.now()}`,
    word: newWord,
    cards: allCards,
    playerId,
    playerName: player.name,
    score: wordScore,
    timestamp: Date.now(),
    position: wordToExtend.position
  };

  // Remove the original word and add the extended word
  const updatedPlayedWords = gameState.playedWords.filter(word => word.id !== wordId);
  updatedPlayedWords.push(extendedWord);

  const gameStateWithExtension = {
    ...gameState,
    players: updatedPlayers,
    playedWords: updatedPlayedWords
  };

  // End turn after extending a word
  return { success: true, gameState: endTurn(gameStateWithExtension) };
}

// Extend an existing word by inserting cards (sync version for backward compatibility)
export function extendWord(
  gameState: GameState,
  playerId: string,
  wordId: string,
  selectedCards: Card[],
  newWord: string
): GameState {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return gameState;

  // Find the word to extend
  const wordToExtend = gameState.playedWords.find(word => word.id === wordId);
  if (!wordToExtend) {
    console.error('Word not found for extension');
    return gameState;
  }

  // Validate that the new word can be formed by inserting selected cards into the original word
  const selectedLetters = selectedCards.map(card => 
    card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  );
  
  if (!canFormExtendedWord(wordToExtend.word, selectedLetters, newWord)) {
    console.error('New word cannot be formed by inserting the selected cards into the original word');
    return gameState;
  }

  // Validate that the new word is valid
  if (!isValidWord(newWord)) {
    console.error('New word is not valid');
    return gameState;
  }

  // Remove selected cards from player's hand
  const updatedPlayers = [...gameState.players];
  const player = { ...updatedPlayers[playerIndex] };
  
  const selectedCardIds = new Set(selectedCards.map(card => card.id));
  player.hand = player.hand.filter(card => !selectedCardIds.has(card.id));
  
  // Calculate word score and add to player's score
  const wordScore = selectedCards.reduce((total, card) => total + card.points, 0);
  player.score += wordScore;
  
  updatedPlayers[playerIndex] = player;

  // Create new extended word with proper card ordering
  const effectiveCards = selectedCards.map(card => ({
    ...card,
    letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
  }));

  // Reconstruct the cards array to match the new word
  const allCards = reconstructCardsForWord(wordToExtend.cards, effectiveCards, newWord);

  const extendedWord: PlayedWord = {
    id: `word_${Date.now()}`,
    word: newWord,
    cards: allCards,
    playerId,
    playerName: player.name,
    score: wordScore,
    timestamp: Date.now(),
    position: wordToExtend.position
  };

  // Remove the original word and add the extended word
  const updatedPlayedWords = gameState.playedWords.filter(word => word.id !== wordId);
  updatedPlayedWords.push(extendedWord);

  const gameStateWithExtension = {
    ...gameState,
    players: updatedPlayers,
    playedWords: updatedPlayedWords
  };

  // End turn after extending a word
  return endTurn(gameStateWithExtension);
}

 