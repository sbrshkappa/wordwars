'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initializeGame, getCurrentPlayer } from '@/shared/gameLogic';
import { GameState } from '@/shared/types/game';
import CardTest from '@/components/CardTest';
import GameBoardTest from '@/components/GameBoardTest';

export default function TestPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerNames, setPlayerNames] = useState(['', '']);

  const startNewGame = () => {
    const newGame = initializeGame(playerNames);
    setGameState(newGame);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            🧪 WordWars Test Interface
          </h1>
          <Link 
            href="/" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
          >
            🃏 Play Real Game
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Step 1: Game Structure Test</h2>
          
          {!gameState ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                This tests our game initialization, deck creation, and card dealing logic.
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
                onClick={startNewGame}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Start Test Game
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Game Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Game Info</h3>
                  <p><strong>Phase:</strong> {gameState.gamePhase}</p>
                  <p><strong>Round:</strong> {gameState.roundNumber}</p>
                  <p><strong>Deck Size:</strong> {gameState.deck.length}</p>
                  <p><strong>Discard Pile:</strong> {gameState.discardPile.length}</p>
                  <p><strong>Current Player:</strong> {getCurrentPlayer(gameState).name}</p>
                </div>
                
                {/* Players */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Players</h3>
                  {gameState.players.map((player) => (
                    <div key={player.id} className="mb-2">
                      <p className={`font-medium ${player.isCurrentTurn ? 'text-green-600' : ''}`}>
                        {player.name} {player.isCurrentTurn ? '(Current Turn)' : ''}
                      </p>
                      <p className="text-sm text-gray-600">
                        Hand: {player.hand.length} cards | Score: {player.score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sample Cards */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Sample Cards from Player 1&apos;s Hand</h3>
                <div className="flex flex-wrap gap-2">
                  {gameState.players[0].hand.slice(0, 5).map((card) => (
                    <div
                      key={card.id}
                      className={`w-12 h-16 border-2 rounded-lg flex flex-col items-center justify-center text-sm font-bold ${
                        card.isMaster 
                          ? 'bg-purple-100 border-purple-300 text-purple-800' 
                          : 'bg-blue-100 border-blue-300 text-blue-800'
                      }`}
                    >
                      <div>{card.letter}</div>
                      <div className="text-xs">{card.points}</div>
                    </div>
                  ))}
                  {gameState.players[0].hand.length > 5 && (
                    <div className="w-12 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                      +{gameState.players[0].hand.length - 5}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setGameState(null)}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Reset Test
              </button>
            </div>
          )}
        </div>
        
        {/* Step 2: Card Component Test */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <CardTest />
        </div>
        
        {/* Step 3: Game Board Layout Test */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <GameBoardTest />
        </div>
      </div>
    </div>
  );
} 