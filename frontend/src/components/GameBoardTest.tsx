'use client';

import { useState } from 'react';
import { GameState, PlayedWord, Card } from '@/shared/types/game';
import { initializeGame } from '@/shared/gameLogic';
import GameBoard from './GameBoard';

export default function GameBoardTest() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerNames, setPlayerNames] = useState(['Alice', 'Bob']);

  const startTestGame = () => {
    const newGame = initializeGame(playerNames);
    
    // Add a master card to player 1's hand for testing
    const masterCard: Card = {
      id: 'master_1',
      letter: 'MASTER',
      points: 15,
      isMaster: true
    };
    
    newGame.players[0].hand = [
      ...newGame.players[0].hand.slice(0, 5), // Keep first 5 cards
      masterCard,
      ...newGame.players[0].hand.slice(5) // Add remaining cards
    ];
    
    // Add some sample played words to demonstrate the layout
    const samplePlayedWords: PlayedWord[] = [
      {
        id: 'word1',
        word: 'HELLO',
        cards: [
          { id: 'h1', letter: 'H', points: 8, isMaster: false },
          { id: 'e1', letter: 'E', points: 10, isMaster: false },
          { id: 'l1', letter: 'L', points: 8, isMaster: false },
          { id: 'l2', letter: 'L', points: 8, isMaster: false },
          { id: 'o1', letter: 'O', points: 8, isMaster: false },
        ],
        playerId: 'player_0',
        playerName: 'Alice',
        score: 42,
        timestamp: Date.now(),
        position: { x: 100, y: 100 }
      },
      {
        id: 'word2',
        word: 'WORLD',
        cards: [
          { id: 'w1', letter: 'W', points: 8, isMaster: false },
          { id: 'o2', letter: 'O', points: 8, isMaster: false },
          { id: 'r1', letter: 'R', points: 8, isMaster: false },
          { id: 'l3', letter: 'L', points: 8, isMaster: false },
          { id: 'd1', letter: 'D', points: 6, isMaster: false },
        ],
        playerId: 'player_1',
        playerName: 'Bob',
        score: 38,
        timestamp: Date.now(),
        position: { x: 200, y: 150 }
      }
    ];

    newGame.playedWords = samplePlayedWords;
    newGame.gamePhase = 'playing';
    
    setGameState(newGame);
  };

  const handleCardSelect = (card: { letter: string }, playerId: string) => {
    console.log('Card selected:', card.letter, 'by player:', playerId);
  };

  const handlePlayWord = () => {
    console.log('Play Word clicked - Word played successfully!');
    // The actual word playing is handled by the modal
    // This function is called after the word is confirmed
  };

  const handleDiscard = () => {
    console.log('Discard action completed');
  };

  const handleDraw = () => {
    console.log('Draw action completed');
  };

  if (!gameState) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Game Board Test</h3>
        <p className="text-gray-600">
          This demonstrates the complete game board layout with player areas, playing field, and controls.
        </p>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Player Names:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={playerNames[0]}
              onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
              placeholder="Player 1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={playerNames[1]}
              onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
              placeholder="Player 2"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        <button
          onClick={startTestGame}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Start Game Board Test
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Game Board Test</h3>
        <button
          onClick={() => setGameState(null)}
          className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
        >
          Reset Test
        </button>
      </div>
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: '70vh' }}>
        <GameBoard
          gameState={gameState}
          onCardSelect={handleCardSelect}
          onPlayWord={handlePlayWord}
          onDiscard={handleDiscard}
          onDraw={handleDraw}
          onGameStateUpdate={setGameState}
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Test Instructions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click cards in your hand to select/deselect them</li>
          <li>• Try the Play Word, Discard, and Draw buttons</li>
          <li>• Notice the opponent&apos;s cards are face-down</li>
          <li>• See the sample words &quot;HELLO&quot; and &quot;WORLD&quot; in the playing field</li>
          <li>• Check the console for interaction logs</li>
        </ul>
      </div>
    </div>
  );
} 