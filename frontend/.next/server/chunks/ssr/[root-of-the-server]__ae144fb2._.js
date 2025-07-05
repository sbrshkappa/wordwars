module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/shared/types/game.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Card types and values
__turbopack_context__.s({
    "CARD_DISTRIBUTION": (()=>CARD_DISTRIBUTION),
    "CARD_VALUES": (()=>CARD_VALUES)
});
const CARD_VALUES = {
    'A': 10,
    'E': 10,
    'I': 10,
    'O': 8,
    'U': 8,
    'H': 8,
    'L': 8,
    'R': 8,
    'S': 8,
    'T': 8,
    'W': 8,
    'C': 8,
    'K': 8,
    'M': 8,
    'N': 8,
    'P': 8,
    'D': 6,
    'J': 6,
    'V': 6,
    'G': 4,
    'Q': 4,
    'Y': 4,
    'B': 2,
    'F': 2,
    'X': 2,
    'Z': 2,
    'MASTER': 15
};
const CARD_DISTRIBUTION = {
    'A': 4,
    'E': 4,
    'I': 4,
    'O': 3,
    'U': 3,
    'H': 3,
    'L': 3,
    'R': 3,
    'S': 3,
    'T': 3,
    'W': 3,
    'C': 1,
    'K': 1,
    'M': 1,
    'N': 1,
    'P': 1,
    'D': 1,
    'J': 1,
    'V': 1,
    'G': 1,
    'Q': 1,
    'Y': 1,
    'B': 1,
    'F': 1,
    'X': 1,
    'Z': 1,
    'MASTER': 1
};
}}),
"[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "calculateFinalScores": (()=>calculateFinalScores),
    "calculateHandScore": (()=>calculateHandScore),
    "canFormExtendedWord": (()=>canFormExtendedWord),
    "canFormWord": (()=>canFormWord),
    "checkForWinner": (()=>checkForWinner),
    "checkGameEnd": (()=>checkGameEnd),
    "createDeck": (()=>createDeck),
    "dealCards": (()=>dealCards),
    "discardCard": (()=>discardCard),
    "drawCard": (()=>drawCard),
    "drawFromDiscard": (()=>drawFromDiscard),
    "endGame": (()=>endGame),
    "endTurn": (()=>endTurn),
    "extendWord": (()=>extendWord),
    "extendWordWithValidation": (()=>extendWordWithValidation),
    "getCurrentPlayer": (()=>getCurrentPlayer),
    "initializeGame": (()=>initializeGame),
    "isValidDictionaryWord": (()=>isValidDictionaryWord),
    "isValidWord": (()=>isValidWord),
    "nextTurn": (()=>nextTurn),
    "playWord": (()=>playWord),
    "playWordWithValidation": (()=>playWordWithValidation),
    "reconstructCardsForWord": (()=>reconstructCardsForWord),
    "shuffleDeck": (()=>shuffleDeck),
    "startGame": (()=>startGame),
    "validateGameState": (()=>validateGameState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/types/game.ts [app-ssr] (ecmascript)");
;
function createDeck() {
    const deck = [];
    let cardId = 0;
    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_DISTRIBUTION"]).forEach(([letter, count])=>{
        for(let i = 0; i < count; i++){
            deck.push({
                id: `card_${cardId++}`,
                letter,
                points: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_VALUES"][letter],
                isMaster: letter === 'MASTER'
            });
        }
    });
    // Verify total deck size
    const expectedTotal = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_DISTRIBUTION"]).reduce((sum, count)=>sum + count, 0);
    if (deck.length !== expectedTotal) {
        throw new Error(`Deck creation error: Expected ${expectedTotal} cards, got ${deck.length}`);
    }
    console.log(`Deck created with ${deck.length} cards`);
    return deck;
}
function shuffleDeck(deck) {
    const shuffled = [
        ...deck
    ];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }
    return shuffled;
}
function dealCards(players, deck, cardsPerPlayer = 10) {
    const updatedPlayers = players.map((player)=>({
            ...player,
            hand: []
        }));
    const remainingDeck = [
        ...deck
    ];
    console.log(`Dealing ${cardsPerPlayer} cards to ${players.length} players from deck of ${deck.length} cards`);
    // Deal cards to each player
    for(let round = 0; round < cardsPerPlayer; round++){
        for(let playerIndex = 0; playerIndex < updatedPlayers.length; playerIndex++){
            if (remainingDeck.length > 0) {
                const card = remainingDeck.pop();
                updatedPlayers[playerIndex].hand = [
                    ...updatedPlayers[playerIndex].hand,
                    card
                ];
            } else {
                console.warn(`Deck ran out during dealing! Round ${round}, Player ${playerIndex}`);
                break;
            }
        }
    }
    // STRICT validation that each player has exactly the correct number of cards
    let hasError = false;
    updatedPlayers.forEach((player, index)=>{
        if (player.hand.length !== cardsPerPlayer) {
            console.error(`ERROR: Player ${index} (${player.name}) has ${player.hand.length} cards instead of ${cardsPerPlayer}!`);
            console.error('Player hand:', player.hand.map((c)=>c.letter));
            hasError = true;
        }
    });
    // If there's an error, throw an exception to prevent the game from continuing
    if (hasError) {
        throw new Error(`Card dealing error: Players have wrong number of cards. Expected ${cardsPerPlayer} each.`);
    }
    // Start with empty discard pile
    const discardPile = [];
    console.log(`Dealing complete. Remaining deck: ${remainingDeck.length} cards, Discard pile: ${discardPile.length} cards`);
    return {
        updatedPlayers,
        remainingDeck,
        discardPile
    };
}
function isValidWord(word) {
    // Basic validation: word must be at least 2 letters and contain only letters
    return word.length >= 2 && /^[A-Z]+$/.test(word);
}
async function isValidDictionaryWord(word) {
    // Import here to avoid circular dependencies
    const { isValidDictionaryWordCached } = await __turbopack_context__.r("[project]/src/shared/dictionaryService.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
    return isValidDictionaryWordCached(word);
}
function calculateHandScore(cards) {
    return cards.reduce((total, card)=>total + card.points, 0);
}
function canFormWord(cards, word) {
    // Get effective letters (use assigned letters for master cards)
    const cardLetters = cards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
    const wordLetters = word.split('');
    // Count letter frequencies
    const cardCounts = {};
    const wordCounts = {};
    cardLetters.forEach((letter)=>{
        cardCounts[letter] = (cardCounts[letter] || 0) + 1;
    });
    wordLetters.forEach((letter)=>{
        wordCounts[letter] = (wordCounts[letter] || 0) + 1;
    });
    // Check if we have enough cards for each letter
    for (const [letter, count] of Object.entries(wordCounts)){
        const availableCards = cardCounts[letter] || 0;
        if (availableCards < count) {
            return false;
        }
    }
    return true;
}
function canFormExtendedWord(originalWord, selectedLetters, newWord) {
    // Check if the new word length equals original word length plus selected letters length
    if (newWord.length !== originalWord.length + selectedLetters.length) {
        return false;
    }
    // Create frequency maps
    const originalLetterCounts = new Map();
    const selectedLetterCounts = new Map();
    const newWordLetterCounts = new Map();
    // Count letters in original word
    for (const letter of originalWord){
        originalLetterCounts.set(letter, (originalLetterCounts.get(letter) || 0) + 1);
    }
    // Count letters in selected cards
    for (const letter of selectedLetters){
        selectedLetterCounts.set(letter, (selectedLetterCounts.get(letter) || 0) + 1);
    }
    // Count letters in new word
    for (const letter of newWord){
        newWordLetterCounts.set(letter, (newWordLetterCounts.get(letter) || 0) + 1);
    }
    // Check if the new word contains exactly the letters from original + selected
    for (const [letter, count] of newWordLetterCounts){
        const originalCount = originalLetterCounts.get(letter) || 0;
        const selectedCount = selectedLetterCounts.get(letter) || 0;
        const expectedCount = originalCount + selectedCount;
        if (count !== expectedCount) {
            return false;
        }
    }
    // Check if all original and selected letters are used
    for (const [letter, count] of originalLetterCounts){
        const newCount = newWordLetterCounts.get(letter) || 0;
        if (newCount < count) {
            return false;
        }
    }
    for (const [letter, count] of selectedLetterCounts){
        const newCount = newWordLetterCounts.get(letter) || 0;
        if (newCount < count) {
            return false;
        }
    }
    return true;
}
function reconstructCardsForWord(originalCards, newCards, newWord) {
    const originalLetters = originalCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
    const newLetters = newCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
    const result = [];
    let originalIndex = 0;
    let newIndex = 0;
    for(let i = 0; i < newWord.length; i++){
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
                const matchingNewCardIndex = newLetters.findIndex((letter, idx)=>idx >= newIndex && letter === currentLetter);
                if (matchingNewCardIndex !== -1) {
                    result.push(newCards[matchingNewCardIndex]);
                    newIndex = matchingNewCardIndex + 1;
                }
            }
        }
    }
    return result;
}
function initializeGame(playerNames) {
    const deck = shuffleDeck(createDeck());
    const players = playerNames.map((name, index)=>({
            id: `player_${index}`,
            name,
            hand: [],
            score: 0,
            isCurrentTurn: index === 0,
            hasDiscardedThisTurn: false
        }));
    const { updatedPlayers, remainingDeck, discardPile } = dealCards(players, deck);
    const gameState = {
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
function getCurrentPlayer(gameState) {
    return gameState.players[gameState.currentPlayerIndex];
}
function nextTurn(gameState) {
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    return {
        ...gameState,
        currentPlayerIndex: nextPlayerIndex,
        players: gameState.players.map((player, index)=>({
                ...player,
                isCurrentTurn: index === nextPlayerIndex,
                hasDiscardedThisTurn: false
            }))
    };
}
async function playWordWithValidation(gameState, playerId, selectedCards, word) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
    if (playerIndex === -1) {
        return {
            success: false,
            gameState,
            error: 'Player not found'
        };
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
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    // Remove selected cards from hand
    const selectedCardIds = new Set(selectedCards.map((card)=>card.id));
    player.hand = player.hand.filter((card)=>!selectedCardIds.has(card.id));
    // Calculate word score and add to player's score
    const wordScore = selectedCards.reduce((total, card)=>total + card.points, 0);
    player.score += wordScore;
    updatedPlayers[playerIndex] = player;
    // Create new played word with effective letters
    const effectiveCards = selectedCards.map((card)=>({
            ...card,
            letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
        }));
    const newPlayedWord = {
        id: `word_${Date.now()}`,
        word,
        cards: effectiveCards,
        playerId,
        playerName: player.name,
        score: wordScore,
        timestamp: Date.now(),
        position: {
            x: 0,
            y: 0
        } // We'll implement positioning later
    };
    const gameStateWithWord = {
        ...gameState,
        players: updatedPlayers,
        playedWords: [
            ...gameState.playedWords,
            newPlayedWord
        ]
    };
    // End turn after playing a word
    return {
        success: true,
        gameState: endTurn(gameStateWithWord)
    };
}
function playWord(gameState, playerId, selectedCards, word) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
    if (playerIndex === -1) return gameState;
    // Remove cards from player's hand
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    // Remove selected cards from hand
    const selectedCardIds = new Set(selectedCards.map((card)=>card.id));
    player.hand = player.hand.filter((card)=>!selectedCardIds.has(card.id));
    // Calculate word score and add to player's score
    const wordScore = selectedCards.reduce((total, card)=>total + card.points, 0);
    player.score += wordScore;
    updatedPlayers[playerIndex] = player;
    // Create new played word with effective letters
    const effectiveCards = selectedCards.map((card)=>({
            ...card,
            letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
        }));
    const newPlayedWord = {
        id: `word_${Date.now()}`,
        word,
        cards: effectiveCards,
        playerId,
        playerName: player.name,
        score: wordScore,
        timestamp: Date.now(),
        position: {
            x: 0,
            y: 0
        } // We'll implement positioning later
    };
    const gameStateWithWord = {
        ...gameState,
        players: updatedPlayers,
        playedWords: [
            ...gameState.playedWords,
            newPlayedWord
        ]
    };
    // End turn after playing a word
    return endTurn(gameStateWithWord);
}
function checkForWinner(gameState) {
    const playerWithEmptyHand = gameState.players.find((player)=>player.hand.length === 0);
    return playerWithEmptyHand ? playerWithEmptyHand.id : null;
}
function discardCard(gameState, playerId, cardToDiscard) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
    if (playerIndex === -1) return gameState;
    // Remove card from player's hand
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    player.hand = player.hand.filter((card)=>card.id !== cardToDiscard.id);
    player.hasDiscardedThisTurn = true; // Mark that player has discarded this turn
    updatedPlayers[playerIndex] = player;
    // Temporarily store the discarded card (not yet added to discard pile)
    return {
        ...gameState,
        players: updatedPlayers,
        tempDiscardedCard: cardToDiscard
    };
}
function drawCard(gameState, playerId) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
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
    const updatedDeck = [
        ...gameState.deck
    ];
    const drawnCard = updatedDeck.pop();
    // Add card to player's hand
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    player.hand = [
        ...player.hand,
        drawnCard
    ];
    updatedPlayers[playerIndex] = player;
    // Move the temporarily discarded card to the discard pile
    const updatedDiscardPile = [
        ...gameState.discardPile
    ];
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
function drawFromDiscard(gameState, playerId) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
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
    const updatedDiscardPile = [
        ...gameState.discardPile
    ];
    const drawnCard = updatedDiscardPile.pop(); // Get the top card
    // Add card to player's hand
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    player.hand = [
        ...player.hand,
        drawnCard
    ];
    updatedPlayers[playerIndex] = player;
    // Move the temporarily discarded card to the discard pile
    const finalDiscardPile = [
        ...updatedDiscardPile
    ];
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
function endTurn(gameState) {
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
function startGame(playerNames) {
    const gameState = initializeGame(playerNames);
    return {
        ...gameState,
        gamePhase: 'playing'
    };
}
function validateGameState(gameState) {
    const errors = [];
    // Check that no player has more than 10 cards
    gameState.players.forEach((player, index)=>{
        if (player.hand.length > 10) {
            errors.push(`Player ${index} (${player.name}) has ${player.hand.length} cards (should be ≤10)`);
        }
    });
    // Check that total cards in game equals expected total
    const totalCardsInHands = gameState.players.reduce((sum, player)=>sum + player.hand.length, 0);
    const totalCardsInPlayedWords = gameState.playedWords.reduce((sum, word)=>sum + word.cards.length, 0);
    const totalCardsInDiscard = gameState.discardPile.length;
    const totalCardsInDeck = gameState.deck.length;
    const totalCardsInTempDiscard = gameState.tempDiscardedCard ? 1 : 0;
    const totalCardsInGame = totalCardsInHands + totalCardsInPlayedWords + totalCardsInDiscard + totalCardsInDeck + totalCardsInTempDiscard;
    const expectedTotalCards = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_DISTRIBUTION"]).reduce((sum, count)=>sum + count, 0);
    if (totalCardsInGame !== expectedTotalCards) {
        errors.push(`Total cards in game (${totalCardsInGame}) doesn't match expected total (${expectedTotalCards})`);
        errors.push(`Breakdown: Hands=${totalCardsInHands}, Played=${totalCardsInPlayedWords}, Discard=${totalCardsInDiscard}, Deck=${totalCardsInDeck}, Temp=${totalCardsInTempDiscard}`);
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function checkGameEnd(gameState) {
    // Game ends if deck is empty and all players have no valid plays
    if (gameState.deck.length > 0) return false;
    // Check if any player can make a valid play
    for (const player of gameState.players){
        if (player.hand.length > 0) {
            // For now, assume any cards can form some word
            // In a real implementation, you'd check if they can actually form valid words
            return false;
        }
    }
    return true;
}
function calculateFinalScores(gameState) {
    const updatedPlayers = gameState.players.map((player)=>{
        // Calculate penalty for remaining cards
        const handPenalty = calculateHandScore(player.hand);
        const finalScore = Math.max(0, player.score - handPenalty);
        return {
            ...player,
            score: finalScore
        };
    });
    // Find winner (player with highest score)
    const winner = updatedPlayers.reduce((highest, current)=>current.score > highest.score ? current : highest);
    return {
        ...gameState,
        players: updatedPlayers,
        gamePhase: 'gameOver',
        winner: winner.id
    };
}
function endGame(gameState) {
    return calculateFinalScores(gameState);
}
async function extendWordWithValidation(gameState, playerId, wordId, selectedCards, newWord) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
    if (playerIndex === -1) {
        return {
            success: false,
            gameState,
            error: 'Player not found'
        };
    }
    // Find the word to extend
    const wordToExtend = gameState.playedWords.find((word)=>word.id === wordId);
    if (!wordToExtend) {
        return {
            success: false,
            gameState,
            error: 'Word not found for extension'
        };
    }
    // Validate that the new word can be formed by inserting selected cards into the original word
    const selectedLetters = selectedCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
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
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    const selectedCardIds = new Set(selectedCards.map((card)=>card.id));
    player.hand = player.hand.filter((card)=>!selectedCardIds.has(card.id));
    // Calculate word score and add to player's score
    const wordScore = selectedCards.reduce((total, card)=>total + card.points, 0);
    player.score += wordScore;
    updatedPlayers[playerIndex] = player;
    // Create new extended word with proper card ordering
    const effectiveCards = selectedCards.map((card)=>({
            ...card,
            letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
        }));
    // Reconstruct the cards array to match the new word
    const allCards = reconstructCardsForWord(wordToExtend.cards, effectiveCards, newWord);
    const extendedWord = {
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
    const updatedPlayedWords = gameState.playedWords.filter((word)=>word.id !== wordId);
    updatedPlayedWords.push(extendedWord);
    const gameStateWithExtension = {
        ...gameState,
        players: updatedPlayers,
        playedWords: updatedPlayedWords
    };
    // End turn after extending a word
    return {
        success: true,
        gameState: endTurn(gameStateWithExtension)
    };
}
function extendWord(gameState, playerId, wordId, selectedCards, newWord) {
    const playerIndex = gameState.players.findIndex((p)=>p.id === playerId);
    if (playerIndex === -1) return gameState;
    // Find the word to extend
    const wordToExtend = gameState.playedWords.find((word)=>word.id === wordId);
    if (!wordToExtend) {
        console.error('Word not found for extension');
        return gameState;
    }
    // Validate that the new word can be formed by inserting selected cards into the original word
    const selectedLetters = selectedCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
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
    const updatedPlayers = [
        ...gameState.players
    ];
    const player = {
        ...updatedPlayers[playerIndex]
    };
    const selectedCardIds = new Set(selectedCards.map((card)=>card.id));
    player.hand = player.hand.filter((card)=>!selectedCardIds.has(card.id));
    // Calculate word score and add to player's score
    const wordScore = selectedCards.reduce((total, card)=>total + card.points, 0);
    player.score += wordScore;
    updatedPlayers[playerIndex] = player;
    // Create new extended word with proper card ordering
    const effectiveCards = selectedCards.map((card)=>({
            ...card,
            letter: card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
        }));
    // Reconstruct the cards array to match the new word
    const allCards = reconstructCardsForWord(wordToExtend.cards, effectiveCards, newWord);
    const extendedWord = {
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
    const updatedPlayedWords = gameState.playedWords.filter((word)=>word.id !== wordId);
    updatedPlayedWords.push(extendedWord);
    const gameStateWithExtension = {
        ...gameState,
        players: updatedPlayers,
        playedWords: updatedPlayedWords
    };
    // End turn after extending a word
    return endTurn(gameStateWithExtension);
}
}}),
"[project]/src/utils/keyboardHandlers.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "handleCardSelectionKeyPress": (()=>handleCardSelectionKeyPress)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)");
;
function handleCardSelectionKeyPress(event, selectedCards, gameState) {
    const currentPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentPlayer"])(gameState);
    // Only handle key presses when it's the current player's turn and game is playing
    if (!currentPlayer.isCurrentTurn || gameState.gamePhase !== 'playing') {
        return {
            newSelectedCards: selectedCards,
            shakeHand: false
        };
    }
    const key = event.key.toUpperCase();
    // Handle backspace to deselect last card
    if (event.key === 'Backspace') {
        if (selectedCards.size > 0) {
            const selectedCardsArray = Array.from(selectedCards).map((cardId)=>currentPlayer.hand.find((card)=>card.id === cardId));
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
        return {
            newSelectedCards: selectedCards,
            shakeHand: false
        };
    }
    // Check if the key matches any card in the current player's hand
    const matchingCard = currentPlayer.hand.find((card)=>card.letter === key || card.isMaster && card.assignedLetter === key);
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
}}),
"[project]/src/components/Card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Card)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function Card({ card, isSelected = false, isPlayable = true, isFaceDown = false, onClick, className = '', size = 'md' }) {
    const sizeClasses = {
        sm: 'w-10 h-14 text-xs',
        md: 'w-12 h-16 text-sm',
        lg: 'w-16 h-20 text-base'
    };
    const baseClasses = `
    ${sizeClasses[size]}
    border-2 rounded-lg flex flex-col items-center justify-center font-bold cursor-pointer
    transition-all duration-200 select-none
    ${isFaceDown ? 'bg-gray-800 border-gray-600' : ''}
    ${!isFaceDown && !isPlayable ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;
    const cardColors = isFaceDown ? 'bg-gray-800 border-gray-600 text-gray-300' : card.isMaster ? 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-500 text-white shadow-lg' : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-500 text-white shadow-md';
    const selectedClasses = isSelected ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-110 shadow-xl' : 'hover:scale-105 hover:shadow-lg';
    const handleClick = ()=>{
        if (onClick && isPlayable && !isFaceDown) {
            onClick();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: `${baseClasses} ${cardColors} ${selectedClasses}`,
        onClick: handleClick,
        whileHover: isPlayable && !isFaceDown ? {
            scale: 1.05
        } : {},
        whileTap: isPlayable && !isFaceDown ? {
            scale: 0.95
        } : {},
        animate: {
            scale: isSelected ? 1.1 : 1,
            rotateY: isFaceDown ? 180 : 0
        },
        transition: {
            duration: 0.2
        },
        children: isFaceDown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center w-full h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-400 text-xs",
                children: "🂠"
            }, void 0, false, {
                fileName: "[project]/src/components/Card.tsx",
                lineNumber: 60,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Card.tsx",
            lineNumber: 59,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center leading-none",
                    children: card.isMaster ? card.assignedLetter ? card.assignedLetter : '★' : card.letter
                }, void 0, false, {
                    fileName: "[project]/src/components/Card.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs opacity-80 mt-1",
                    children: card.points
                }, void 0, false, {
                    fileName: "[project]/src/components/Card.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this),
                card.isMaster && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] opacity-60 mt-1 leading-none",
                    children: card.assignedLetter ? 'MASTER' : 'ASSIGN'
                }, void 0, false, {
                    fileName: "[project]/src/components/Card.tsx",
                    lineNumber: 74,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/Card.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/PlayerArea.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PlayerArea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function PlayerArea({ player, isCurrentPlayer, isOpponent = false, selectedCards = new Set(), onCardClick, shakeHand = false }) {
    // Get selected cards array for word preview
    const selectedCardsArray = Array.from(selectedCards).map((cardId)=>player.hand.find((card)=>card.id === cardId)).filter((card)=>card !== undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-full flex flex-col overflow-hidden relative ${player.isCurrentTurn ? 'ring-2 ring-yellow-400 ring-opacity-75' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-2 mb-1 overflow-hidden ${shakeHand ? 'animate-shake' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-white/80 text-xs",
                                        children: isOpponent ? 'Opponent\'s Hand' : 'Your Hand'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlayerArea.tsx",
                                        lineNumber: 27,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/60 text-xs",
                                        children: [
                                            "(",
                                            player.hand.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlayerArea.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlayerArea.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-xs",
                                        children: [
                                            "Score: ",
                                            player.score
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlayerArea.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    player.isCurrentTurn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold",
                                        children: "TURN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlayerArea.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlayerArea.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PlayerArea.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap overflow-hidden p-4",
                        children: player.hand.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                card: card,
                                isSelected: selectedCards.has(card.id),
                                isFaceDown: isOpponent,
                                onClick: ()=>onCardClick?.(card, player.id),
                                size: isOpponent ? "sm" : "md"
                            }, card.id, false, {
                                fileName: "[project]/src/components/PlayerArea.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlayerArea.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlayerArea.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            isCurrentPlayer && selectedCardsArray.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-1 right-1 bg-white/10 backdrop-blur-sm rounded px-1 py-0.5 border border-white/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-0.5 justify-center",
                        children: selectedCardsArray.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                card: card,
                                size: "sm"
                            }, card.id, false, {
                                fileName: "[project]/src/components/PlayerArea.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlayerArea.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white font-semibold text-center text-xs",
                        children: selectedCardsArray.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter).join('')
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlayerArea.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlayerArea.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlayerArea.tsx",
        lineNumber: 20,
        columnNumber: 7
    }, this);
}
}}),
"[project]/src/components/GameStatus.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GameStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function GameStatus({ gameStatus }) {
    if (!gameStatus) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-sm rounded px-2 py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold",
                    children: [
                        "Round ",
                        gameStatus.roundNumber
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameStatus.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameStatus.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/80 text-xs",
                children: [
                    "Deck: ",
                    gameStatus.deckSize,
                    " | Discard: ",
                    gameStatus.discardSize
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameStatus.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameStatus.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/PlayedWord.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PlayedWord)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function PlayedWord({ playedWord, playerName, isSelected = false, isExtendMode = false, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        bg-white/20 backdrop-blur-sm rounded-lg p-2 cursor-pointer transition-all duration-200
        ${isExtendMode ? 'animate-waddle hover:bg-white/30' : ''}
        ${isSelected ? 'ring-2 ring-indigo-400 bg-indigo-500/30 shadow-lg' : ''}
        ${onClick ? 'hover:scale-105' : ''}
      `,
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mb-1",
                children: playedWord.cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        card: card,
                        size: "sm"
                    }, card.id, false, {
                        fileName: "[project]/src/components/PlayedWord.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/PlayedWord.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white font-semibold text-center text-sm",
                children: playedWord.word
            }, void 0, false, {
                fileName: "[project]/src/components/PlayedWord.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 text-xs text-center",
                children: [
                    "by ",
                    playerName
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlayedWord.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlayedWord.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/PlayingField.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PlayingField)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameStatus.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayedWord$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlayedWord.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function PlayingField({ playedWords, players, gameStatus, isExtendMode = false, selectedWordId = null, onWordSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4 min-h-0 overflow-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-white/80 text-xs",
                        children: "Playing Field"
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlayingField.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        gameStatus: gameStatus
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlayingField.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlayingField.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            playedWords.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/60 text-center text-sm",
                    children: [
                        "No words played yet.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/PlayingField.tsx",
                            lineNumber: 24,
                            columnNumber: 33
                        }, this),
                        "Start by playing a word from your hand!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PlayingField.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PlayingField.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3",
                children: playedWords.map((playedWord)=>{
                    const playerName = players.find((p)=>p.id === playedWord.playerId)?.name || 'Unknown Player';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayedWord$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        playedWord: playedWord,
                        playerName: playerName,
                        isSelected: selectedWordId === playedWord.id,
                        isExtendMode: isExtendMode,
                        onClick: isExtendMode ? ()=>onWordSelect?.(playedWord.id) : undefined
                    }, playedWord.id, false, {
                        fileName: "[project]/src/components/PlayingField.tsx",
                        lineNumber: 33,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/PlayingField.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlayingField.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/DeckAndControls.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DeckAndControls)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeckAndControls({ deckSize, discardPile, tempDiscardedCard, selectedCardsCount, onPlayWord, onExtendWord, onCancelExtend, onDiscard, onDraw, onDrawFromDiscard, isCurrentTurn = true, gamePhase = 'playing', hasDiscardedThisTurn = false, hasPlayedWords = false, isExtendMode = false }) {
    console.log('DeckAndControls - selectedCardsCount:', selectedCardsCount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full bg-white/10 backdrop-blur-sm rounded-lg p-2 flex flex-col justify-between border border-white/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-8 h-12 border-2 rounded-lg flex items-center justify-center mb-1 ${deckSize > 0 ? 'bg-blue-800 border-blue-600' : 'bg-gray-600 border-gray-500'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-xs",
                                    children: "🂠"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DeckAndControls.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/80 text-xs",
                                children: [
                                    "Deck (",
                                    deckSize,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            discardPile.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                card: discardPile[discardPile.length - 1],
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/80 text-xs mt-1",
                                children: "Discard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    tempDiscardedCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                card: tempDiscardedCard,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/80 text-xs mt-1",
                                children: "Just Discarded"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DeckAndControls.tsx",
                lineNumber: 27,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPlayWord,
                        disabled: selectedCardsCount === 0 || !isCurrentTurn || gamePhase !== 'playing',
                        className: "w-full px-2 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold",
                        children: "Play Word"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    isExtendMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCancelExtend,
                        className: "w-full px-2 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm",
                        children: "Cancel Extend"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onExtendWord,
                        disabled: !isCurrentTurn || gamePhase !== 'playing' || !hasPlayedWords,
                        className: "w-full px-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",
                        children: "Extend Word"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onDiscard,
                        disabled: selectedCardsCount !== 1 || !isCurrentTurn || gamePhase !== 'playing',
                        className: "w-full px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",
                        children: "Discard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' ? // Show both draw options after discarding
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onDraw,
                                disabled: deckSize === 0,
                                className: "w-full px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",
                                children: [
                                    "Draw from Deck ",
                                    deckSize > 0 ? `(${deckSize})` : '(Empty)'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onDrawFromDiscard,
                                disabled: discardPile.length < 1,
                                className: "w-full px-2 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",
                                children: [
                                    "Draw from Discard ",
                                    discardPile.length >= 1 ? '(Top Card)' : '(Empty)'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this) : // Show single draw button when not discarded yet
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onDraw,
                        disabled: deckSize === 0 || !isCurrentTurn || gamePhase !== 'playing' || !hasDiscardedThisTurn,
                        className: "w-full px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",
                        children: [
                            "Draw ",
                            deckSize > 0 ? `(${deckSize})` : '(Empty)',
                            !hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' && deckSize > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs opacity-75",
                                children: "(Discard first)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DeckAndControls.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DeckAndControls.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DeckAndControls.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DeckAndControls.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/MasterCardModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MasterCardModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const LETTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];
function MasterCardModal({ isOpen, masterCard, onClose, onAssignLetter }) {
    const [selectedLetter, setSelectedLetter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            setSelectedLetter('');
        }
    }, [
        isOpen
    ]);
    const handleLetterSelect = (letter)=>{
        setSelectedLetter(letter);
    };
    const handleConfirm = ()=>{
        if (selectedLetter && masterCard) {
            onAssignLetter(masterCard.id, selectedLetter);
            onClose();
        }
    };
    const handleKeyPress = (e)=>{
        const key = e.key.toUpperCase();
        if (LETTERS.includes(key)) {
            setSelectedLetter(key);
        } else if (e.key === 'Enter' && selectedLetter) {
            handleConfirm();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };
    if (!isOpen || !masterCard) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 w-96 max-w-[90vw]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold mb-4",
                    children: "Assign Letter to Master Card"
                }, void 0, false, {
                    fileName: "[project]/src/components/MasterCardModal.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-20 bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center leading-none",
                                children: "★"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MasterCardModal.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-80 mt-1",
                                children: masterCard.points
                            }, void 0, false, {
                                fileName: "[project]/src/components/MasterCardModal.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] opacity-60 mt-1 leading-none",
                                children: "MASTER"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MasterCardModal.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MasterCardModal.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MasterCardModal.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm font-medium text-gray-700 mb-3",
                            children: "Choose a letter to assign:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MasterCardModal.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-9 gap-2 max-h-48 overflow-y-auto",
                            children: LETTERS.map((letter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleLetterSelect(letter),
                                    onKeyDown: handleKeyPress,
                                    className: `w-8 h-8 border-2 rounded-md font-bold text-sm transition-colors ${selectedLetter === letter ? 'bg-purple-600 border-purple-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'}`,
                                    children: letter
                                }, letter, false, {
                                    fileName: "[project]/src/components/MasterCardModal.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/MasterCardModal.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MasterCardModal.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-700 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Note:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MasterCardModal.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            ' Once assigned, this master card will always represent the letter "',
                            selectedLetter || '?',
                            '" for the rest of the game.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MasterCardModal.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MasterCardModal.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MasterCardModal.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleConfirm,
                            disabled: !selectedLetter,
                            className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: "Assign Letter"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MasterCardModal.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MasterCardModal.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MasterCardModal.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MasterCardModal.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/TurnIndicator.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TurnIndicator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)");
'use client';
;
;
function TurnIndicator({ gameState, onEndTurn, onStartGame, onNewGame }) {
    const currentPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentPlayer"])(gameState);
    const getPhaseDisplay = ()=>{
        switch(gameState.gamePhase){
            case 'lobby':
                return {
                    text: 'Game Lobby',
                    color: 'bg-blue-600',
                    action: 'Start Game'
                };
            case 'playing':
                return {
                    text: 'Game in Progress',
                    color: 'bg-green-600',
                    action: 'End Turn'
                };
            case 'roundEnd':
                return {
                    text: 'Round Ended',
                    color: 'bg-yellow-600',
                    action: 'Next Round'
                };
            case 'gameOver':
                return {
                    text: 'Game Over',
                    color: 'bg-red-600',
                    action: 'New Game'
                };
            default:
                return {
                    text: 'Unknown',
                    color: 'bg-gray-600',
                    action: ''
                };
        }
    };
    const phaseInfo = getPhaseDisplay();
    const handleAction = ()=>{
        switch(gameState.gamePhase){
            case 'lobby':
                onStartGame?.();
                break;
            case 'playing':
                onEndTurn?.();
                break;
            case 'gameOver':
                onNewGame?.();
                break;
        }
    };
    if (gameState.gamePhase === 'gameOver') {
        const winner = gameState.players.find((p)=>p.id === gameState.winner);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-white font-bold text-lg mb-2",
                        children: "Game Over!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    winner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/80 mb-3",
                        children: [
                            "Winner: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-yellow-400",
                                children: winner.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 60,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: gameState.players.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-white/70 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: player.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TurnIndicator.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            player.score,
                                            " points"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TurnIndicator.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, player.id, true, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAction,
                        className: "mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors",
                        children: "New Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TurnIndicator.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/TurnIndicator.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-3 h-3 rounded-full ${phaseInfo.color}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: phaseInfo.text
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/60 text-xs",
                        children: [
                            "Round ",
                            gameState.roundNumber
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TurnIndicator.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            gameState.gamePhase === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm",
                                children: "Current Turn:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold",
                                children: currentPlayer.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm",
                                children: "Cards in Hand:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold",
                                children: currentPlayer.hand.length
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm",
                                children: "Score:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold",
                                children: currentPlayer.score
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm",
                                children: "Discard Status:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-semibold ${currentPlayer.hasDiscardedThisTurn ? 'text-green-400' : 'text-red-400'}`,
                                children: currentPlayer.hasDiscardedThisTurn ? '✓ Discarded' : '✗ Not Discarded'
                            }, void 0, false, {
                                fileName: "[project]/src/components/TurnIndicator.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAction,
                        className: "w-full mt-2 px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium",
                        children: "End Turn"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TurnIndicator.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TurnIndicator.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this),
            gameState.gamePhase === 'lobby' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAction,
                className: "w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium",
                children: "Start Game"
            }, void 0, false, {
                fileName: "[project]/src/components/TurnIndicator.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TurnIndicator.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ExtendWordModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ExtendWordModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ExtendWordModal({ isOpen, selectedCards, wordToExtend, onClose, onConfirm }) {
    const [newWord, setNewWord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && wordToExtend) {
            // Pre-populate with the original word
            setNewWord(wordToExtend.word);
            setError('');
        }
    }, [
        isOpen,
        wordToExtend
    ]);
    const handleWordChange = (value)=>{
        const upperWord = value.toUpperCase();
        setNewWord(upperWord);
        setError('');
    };
    const handleConfirm = ()=>{
        if (!wordToExtend) return;
        // Validate word
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidWord"])(newWord)) {
            setError('Word must be at least 2 letters long and contain only letters.');
            return;
        }
        // Get the letters from selected cards
        const selectedLetters = selectedCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter);
        // Check if the new word can be formed by inserting selected letters into the original word
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canFormExtendedWord"])(wordToExtend.word, selectedLetters, newWord)) {
            setError(`New word cannot be formed by inserting the selected letters into "${wordToExtend.word}".`);
            return;
        }
        // Check if the new word is different from the original
        if (newWord === wordToExtend.word) {
            setError('New word must be different from the original word.');
            return;
        }
        onConfirm(newWord);
    };
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter') {
            handleConfirm();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };
    if (!isOpen || !wordToExtend) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 w-96 max-w-[90vw]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold mb-4",
                    children: "Extend Word"
                }, void 0, false, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-2",
                            children: "Original Word:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 mb-2",
                            children: wordToExtend.cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    card: card,
                                    size: "sm"
                                }, card.id, false, {
                                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-semibold text-gray-800",
                            children: wordToExtend.word
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-2",
                            children: "Cards to Add:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 mb-2",
                            children: selectedCards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    card: card,
                                    size: "sm"
                                }, card.id, false, {
                                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: [
                                "Letters: ",
                                selectedCards.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter).join('')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "New Extended Word:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-600 mb-2",
                            children: [
                                "💡 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Tip:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                                    lineNumber: 124,
                                    columnNumber: 16
                                }, this),
                                " The original word is pre-filled. Click anywhere in the word to position your cursor, then type your new letters."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: newWord,
                            onChange: (e)=>handleWordChange(e.target.value),
                            onKeyDown: handleKeyPress,
                            placeholder: "Click to position cursor and type your new letters",
                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/ExtendWordModal.tsx",
                        lineNumber: 140,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this),
                newWord && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-green-50 border border-green-200 rounded-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-700 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Preview:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                " ",
                                newWord
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-600 text-xs",
                            children: [
                                "Length: ",
                                newWord.length,
                                " letters"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleConfirm,
                            disabled: !newWord.trim(),
                            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: "Extend Word"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ExtendWordModal.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ExtendWordModal.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ExtendWordModal.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ExtendWordModal.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/GameBoard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GameBoard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$keyboardHandlers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/keyboardHandlers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerArea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlayerArea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayingField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlayingField.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DeckAndControls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DeckAndControls.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MasterCardModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MasterCardModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TurnIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TurnIndicator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ExtendWordModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ExtendWordModal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function GameBoard({ gameState, onCardSelect, onPlayWord, onDiscard, onDraw, onGameStateUpdate }) {
    const [selectedCards, setSelectedCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [shakeHand, setShakeHand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [masterCardModal, setMasterCardModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        card: null
    });
    const [extendWordModal, setExtendWordModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        wordToExtend: null
    });
    const [extendMode, setExtendMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedWordId, setSelectedWordId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const currentPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentPlayer"])(gameState);
    const handleCardClick = (card, playerId)=>{
        // Only allow actions during current player's turn and when game is playing
        if (playerId === currentPlayer.id && gameState.gamePhase === 'playing') {
            // Check if this is an unassigned master card
            if (card.isMaster && !card.assignedLetter) {
                setMasterCardModal({
                    isOpen: true,
                    card
                });
                return;
            }
            const newSelected = new Set(selectedCards);
            if (newSelected.has(card.id)) {
                newSelected.delete(card.id);
            } else {
                newSelected.add(card.id);
            }
            setSelectedCards(newSelected);
            console.log('Card clicked:', card.letter, 'Selected cards:', Array.from(newSelected));
            onCardSelect?.(card, playerId);
        }
    };
    const handleKeyPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$keyboardHandlers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleCardSelectionKeyPress"])(event, selectedCards, gameState);
        setSelectedCards(result.newSelectedCards);
        if (result.shakeHand) {
            setShakeHand(true);
            setTimeout(()=>setShakeHand(false), 500); // Stop shaking after 500ms
        }
        // Call onCardSelect callback if a card was selected or deselected
        if (result.selectedCard) {
            onCardSelect?.(result.selectedCard, currentPlayer.id);
        } else if (result.deselectedCard) {
            onCardSelect?.(result.deselectedCard, currentPlayer.id);
        }
    }, [
        selectedCards,
        gameState,
        onCardSelect,
        currentPlayer.id
    ]);
    // Add keyboard event listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.addEventListener('keydown', handleKeyPress);
        return ()=>{
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [
        selectedCards,
        currentPlayer,
        handleKeyPress
    ]);
    const gameStatus = {
        roundNumber: gameState.roundNumber,
        currentPlayerName: currentPlayer.name,
        deckSize: gameState.deck.length,
        discardSize: gameState.discardPile.length
    };
    const handleAssignLetter = (cardId, letter)=>{
        // Update the card in the game state
        const updatedGameState = {
            ...gameState,
            players: gameState.players.map((player)=>({
                    ...player,
                    hand: player.hand.map((card)=>card.id === cardId ? {
                            ...card,
                            assignedLetter: letter
                        } : card)
                }))
        };
        // Update the game state
        onGameStateUpdate?.(updatedGameState);
        // Close the modal
        setMasterCardModal({
            isOpen: false,
            card: null
        });
        console.log(`Master card ${cardId} assigned letter: ${letter}`);
    };
    const handlePlayWordClick = async ()=>{
        // Only allow during current player's turn and when game is playing
        if (gameState.gamePhase !== 'playing' || !currentPlayer.isCurrentTurn) return;
        if (selectedCards.size === 0) return;
        const selectedCardsArray = Array.from(selectedCards).map((cardId)=>currentPlayer.hand.find((card)=>card.id === cardId));
        // Generate the word from selected cards (use assigned letter for master cards)
        const word = selectedCardsArray.map((card)=>card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter).join('');
        // Basic validation first
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidWord"])(word)) {
            setNotification({
                message: 'Word must be at least 2 letters long',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            return;
        }
        // Show loading notification
        setNotification({
            message: 'Checking word validity...',
            type: 'success'
        });
        // Play the word with dictionary validation
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["playWordWithValidation"])(gameState, currentPlayer.id, selectedCardsArray, word);
        if (result.success) {
            // Update the game state
            onGameStateUpdate?.(result.gameState);
            // Call the parent's onPlayWord callback
            onPlayWord?.();
            // Clear selection after playing
            setSelectedCards(new Set());
            // Show success notification
            setNotification({
                message: `Word "${word}" played successfully!`,
                type: 'success'
            });
            setTimeout(()=>setNotification(null), 3000);
        } else {
            // Show error notification
            setNotification({
                message: result.error || 'Failed to play word',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 4000);
        }
    };
    const handleExtendWordClick = ()=>{
        // Only allow during current player's turn and when game is playing
        if (gameState.gamePhase !== 'playing' || !currentPlayer.isCurrentTurn) return;
        // Check if there are any played words to extend
        if (gameState.playedWords.length === 0) {
            setNotification({
                message: 'No words on the board to extend',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            return;
        }
        // Enter extend mode - words will start waddling
        setExtendMode(true);
        setSelectedWordId(null);
        // Show notification
        setNotification({
            message: 'Click on a word to extend it',
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 3000);
    };
    const handleExtendWordConfirm = async (newWord)=>{
        if (!extendWordModal.wordToExtend) return;
        const selectedCardsArray = Array.from(selectedCards).map((cardId)=>currentPlayer.hand.find((card)=>card.id === cardId));
        // Show loading notification
        setNotification({
            message: 'Checking word validity...',
            type: 'success'
        });
        // Extend the word with dictionary validation
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extendWordWithValidation"])(gameState, currentPlayer.id, extendWordModal.wordToExtend.id, selectedCardsArray, newWord);
        if (result.success) {
            // Update the game state
            onGameStateUpdate?.(result.gameState);
            // Close the modal
            setExtendWordModal({
                isOpen: false,
                wordToExtend: null
            });
            // Clear selection after extending
            setSelectedCards(new Set());
            // Show success notification
            setNotification({
                message: `Extended word to: "${newWord}"!`,
                type: 'success'
            });
            setTimeout(()=>setNotification(null), 3000);
        } else {
            // Show error notification
            setNotification({
                message: result.error || 'Failed to extend word',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 4000);
        }
    };
    const handleWordSelect = (wordId)=>{
        if (!extendMode) return;
        // Find the word to extend
        const wordToExtend = gameState.playedWords.find((word)=>word.id === wordId);
        if (!wordToExtend) return;
        // Set the selected word
        setSelectedWordId(wordId);
        // Open the extend word modal
        setExtendWordModal({
            isOpen: true,
            wordToExtend
        });
        // Exit extend mode
        setExtendMode(false);
    };
    const handleExtendWordCancel = ()=>{
        // Exit extend mode
        setExtendMode(false);
        setSelectedWordId(null);
    };
    const handleDiscardClick = ()=>{
        // Only allow during current player's turn and when game is playing
        if (gameState.gamePhase !== 'playing' || !currentPlayer.isCurrentTurn) return;
        if (selectedCards.size !== 1) return;
        const selectedCardId = Array.from(selectedCards)[0];
        const cardToDiscard = currentPlayer.hand.find((card)=>card.id === selectedCardId);
        if (!cardToDiscard) return;
        // Discard the card and update game state
        const newGameState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["discardCard"])(gameState, currentPlayer.id, cardToDiscard);
        // Update the game state
        onGameStateUpdate?.(newGameState);
        // Call the parent's onDiscard callback
        onDiscard?.();
        // Clear selection after discarding
        setSelectedCards(new Set());
        // Show notification
        setNotification({
            message: `Discarded: ${cardToDiscard.letter}. You can now draw a card.`,
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 3000);
        console.log(`Card discarded: ${cardToDiscard.letter}`);
    };
    const handleDrawClick = ()=>{
        // Only allow during current player's turn and when game is playing
        if (gameState.gamePhase !== 'playing' || !currentPlayer.isCurrentTurn) return;
        // Check if player has discarded this turn
        if (!currentPlayer.hasDiscardedThisTurn) {
            setNotification({
                message: 'Must discard a card before drawing',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            console.log('Cannot draw: must discard first');
            return;
        }
        // Check if deck is empty
        if (gameState.deck.length === 0) {
            setNotification({
                message: 'Cannot draw: deck is empty',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            console.log('Cannot draw: deck is empty');
            return;
        }
        // Draw a card and update game state
        const newGameState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawCard"])(gameState, currentPlayer.id);
        // Update the game state
        onGameStateUpdate?.(newGameState);
        // Call the parent's onDraw callback
        onDraw?.();
        // Show notification
        setNotification({
            message: 'Card drawn from deck',
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 2000);
        console.log('Card drawn from deck');
    };
    const handleDrawFromDiscardClick = ()=>{
        // Only allow during current player's turn and when game is playing
        if (gameState.gamePhase !== 'playing' || !currentPlayer.isCurrentTurn) return;
        // Check if player has discarded this turn
        if (!currentPlayer.hasDiscardedThisTurn) {
            setNotification({
                message: 'Must discard a card before drawing',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            console.log('Cannot draw from discard: must discard first');
            return;
        }
        // Check if discard pile has at least 1 card
        if (gameState.discardPile.length < 1) {
            setNotification({
                message: 'Cannot draw from discard: discard pile is empty',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 2000);
            console.log('Cannot draw from discard: discard pile is empty');
            return;
        }
        // Draw from discard and update game state
        const newGameState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawFromDiscard"])(gameState, currentPlayer.id);
        // Update the game state
        onGameStateUpdate?.(newGameState);
        // Call the parent's onDraw callback
        onDraw?.();
        // Show notification
        setNotification({
            message: 'Card drawn from discard pile',
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 2000);
        console.log('Card drawn from discard pile');
    };
    const handleEndTurn = ()=>{
        const newGameState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["endTurn"])(gameState);
        onGameStateUpdate?.(newGameState);
        // Clear selection when turn ends
        setSelectedCards(new Set());
        // Show notification
        const nextPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentPlayer"])(newGameState);
        setNotification({
            message: `Turn ended. ${nextPlayer.name}'s turn now.`,
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 2000);
        console.log('Turn ended');
    };
    const handleStartGame = ()=>{
        const newGameState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startGame"])([
            gameState.players[0].name,
            gameState.players[1].name
        ]);
        onGameStateUpdate?.(newGameState);
        setNotification({
            message: 'Game started!',
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 2000);
        console.log('Game started');
    };
    const handleNewGame = ()=>{
        // Reset to lobby state
        const resetGameState = {
            ...gameState,
            gamePhase: 'lobby',
            winner: null,
            playedWords: [],
            roundNumber: 1
        };
        onGameStateUpdate?.(resetGameState);
        setNotification({
            message: 'New game ready!',
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 2000);
        console.log('New game prepared');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full bg-gradient-to-br from-green-800 to-green-600 p-2 min-h-0 overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-28 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerArea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    player: gameState.players[1],
                    isCurrentPlayer: false,
                    isOpponent: true
                }, void 0, false, {
                    fileName: "[project]/src/components/GameBoard.tsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex min-h-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-h-0 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayingField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            playedWords: gameState.playedWords,
                            players: gameState.players,
                            gameStatus: gameStatus,
                            isExtendMode: extendMode,
                            selectedWordId: selectedWordId,
                            onWordSelect: handleWordSelect
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 405,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-64 ml-2 flex-shrink-0 flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TurnIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                gameState: gameState,
                                onEndTurn: handleEndTurn,
                                onStartGame: handleStartGame,
                                onNewGame: handleNewGame
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DeckAndControls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                deckSize: gameState.deck.length,
                                discardPile: gameState.discardPile,
                                tempDiscardedCard: gameState.tempDiscardedCard,
                                selectedCardsCount: selectedCards.size,
                                onPlayWord: handlePlayWordClick,
                                onExtendWord: handleExtendWordClick,
                                onCancelExtend: handleExtendWordCancel,
                                onDiscard: handleDiscardClick,
                                onDraw: handleDrawClick,
                                onDrawFromDiscard: handleDrawFromDiscardClick,
                                isCurrentTurn: currentPlayer.isCurrentTurn,
                                gamePhase: gameState.gamePhase,
                                hasDiscardedThisTurn: currentPlayer.hasDiscardedThisTurn,
                                hasPlayedWords: gameState.playedWords.length > 0,
                                isExtendMode: extendMode
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-br from-green-800 to-green-600",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerArea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        player: gameState.players[0],
                        isCurrentPlayer: true,
                        selectedCards: selectedCards,
                        onCardClick: handleCardClick,
                        shakeHand: shakeHand
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 449,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/GameBoard.tsx",
                    lineNumber: 448,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 447,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MasterCardModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: masterCardModal.isOpen,
                masterCard: masterCardModal.card,
                onClose: ()=>setMasterCardModal({
                        isOpen: false,
                        card: null
                    }),
                onAssignLetter: handleAssignLetter
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ExtendWordModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: extendWordModal.isOpen,
                selectedCards: Array.from(selectedCards).map((cardId)=>currentPlayer.hand.find((card)=>card.id === cardId)),
                wordToExtend: extendWordModal.wordToExtend,
                onClose: ()=>{
                    setExtendWordModal({
                        isOpen: false,
                        wordToExtend: null
                    });
                    handleExtendWordCancel();
                },
                onConfirm: handleExtendWordConfirm
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this),
            notification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed top-4 right-4 px-4 py-2 rounded-md text-white text-sm font-medium z-50 transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`,
                children: notification.message
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 483,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameBoard.tsx",
        lineNumber: 390,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/gameLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameBoard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Home() {
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playerNames, setPlayerNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        'Alice',
        'Bob'
    ]);
    const startNewGame = ()=>{
        const newGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$gameLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startGame"])(playerNames);
        setGameState(newGame);
    };
    const handleCardSelect = (card, playerId)=>{
        console.log('Card selected:', card.letter, 'by player:', playerId);
    };
    const handlePlayWord = ()=>{
        console.log('Word played successfully!');
    };
    const handleDiscard = ()=>{
        console.log('Card discarded');
    };
    const handleDraw = ()=>{
        console.log('Card drawn');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-800 to-green-600",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/10 backdrop-blur-sm p-4 border-b border-white/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white",
                                        children: "🃏 WordWars"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/test",
                                        className: "px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm",
                                        children: "🧪 Test Interface"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            !gameState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: playerNames[0],
                                                onChange: (e)=>setPlayerNames([
                                                        e.target.value,
                                                        playerNames[1]
                                                    ]),
                                                placeholder: "Player 1",
                                                className: "px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: playerNames[1],
                                                onChange: (e)=>setPlayerNames([
                                                        playerNames[0],
                                                        e.target.value
                                                    ]),
                                                placeholder: "Player 2",
                                                className: "px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startNewGame,
                                        className: "px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold",
                                        children: "Start Game"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: [
                                                    "Round ",
                                                    gameState.roundNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mx-2",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Deck: ",
                                                    gameState.deck.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mx-2",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Discard: ",
                                                    gameState.discardPile.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setGameState(null),
                                        className: "px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors",
                                        children: "New Game"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-h-0",
                    children: !gameState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-4",
                                    children: "Welcome to WordWars!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg mb-6",
                                    children: "A digital version of the classic Lexicon card game"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold mb-3",
                                            children: "How to Play:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-left space-y-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Deal 10 cards to each player"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Form words with your cards to score points"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Discard and draw to get better cards"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• First to empty their hand wins the round"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• First to 100 points wins the game"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        gameState: gameState,
                        onCardSelect: handleCardSelect,
                        onPlayWord: handlePlayWord,
                        onDiscard: handleDiscard,
                        onDraw: handleDraw,
                        onGameStateUpdate: setGameState
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ae144fb2._.js.map