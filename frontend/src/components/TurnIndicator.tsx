'use client';

import { GameState } from '@/shared/types/game';
import { getCurrentPlayer } from '@/shared/gameLogic';

interface TurnIndicatorProps {
  gameState: GameState;
  onEndTurn?: () => void;
  onStartGame?: () => void;
  onNewGame?: () => void;
}

export default function TurnIndicator({
  gameState,
  onEndTurn,
  onStartGame,
  onNewGame
}: TurnIndicatorProps) {
  const currentPlayer = getCurrentPlayer(gameState);

  const getPhaseDisplay = () => {
    switch (gameState.gamePhase) {
      case 'lobby':
        return { text: 'Game Lobby', color: 'bg-blue-600', action: 'Start Game' };
      case 'playing':
        return { text: 'Game in Progress', color: 'bg-green-600', action: 'End Turn' };
      case 'roundEnd':
        return { text: 'Round Ended', color: 'bg-yellow-600', action: 'Next Round' };
      case 'gameOver':
        return { text: 'Game Over', color: 'bg-red-600', action: 'New Game' };
      default:
        return { text: 'Unknown', color: 'bg-gray-600', action: '' };
    }
  };

  const phaseInfo = getPhaseDisplay();

  const handleAction = () => {
    switch (gameState.gamePhase) {
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
    const winner = gameState.players.find(p => p.id === gameState.winner);
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-center">
          <h3 className="text-white font-bold text-lg mb-2">Game Over!</h3>
          {winner && (
            <p className="text-white/80 mb-3">
              Winner: <span className="font-semibold text-yellow-400">{winner.name}</span>
            </p>
          )}
          <div className="space-y-2">
            {gameState.players.map(player => (
              <div key={player.id} className="flex justify-between text-white/70 text-sm">
                <span>{player.name}</span>
                <span className="font-semibold">{player.score} points</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleAction}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${phaseInfo.color}`}></div>
          <span className="text-white/80 text-sm font-medium">{phaseInfo.text}</span>
        </div>
        <span className="text-white/60 text-xs">Round {gameState.roundNumber}</span>
      </div>
      
      {gameState.gamePhase === 'playing' && (
        <div className="space-y-2">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
              <span className="text-white font-semibold text-sm">
                {currentPlayer.name}'s Turn
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Cards in Hand:</span>
            <span className="text-white font-semibold">{currentPlayer.hand.length}</span>
          </div>
          

          
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Discard Status:</span>
            <span className={`font-semibold ${currentPlayer.hasDiscardedThisTurn ? 'text-green-400' : 'text-red-400'}`}>
              {currentPlayer.hasDiscardedThisTurn ? '✓ Discarded' : '✗ Not Discarded'}
            </span>
          </div>
          
          <button
            onClick={handleAction}
            className="w-full mt-2 px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium"
          >
            End Turn
          </button>
        </div>
      )}
      
      {gameState.gamePhase === 'lobby' && (
        <button
          onClick={handleAction}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Start Game
        </button>
      )}
    </div>
  );
} 