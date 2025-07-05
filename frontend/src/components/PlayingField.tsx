'use client';

import GameStatus from './GameStatus';
import PlayedWord from './PlayedWord';
import { PlayingFieldProps } from '@/shared/types/components';

export default function PlayingField({ 
  playedWords, 
  players, 
  gameStatus, 
  isExtendMode = false, 
  selectedWordId = null, 
  onWordSelect 
}: PlayingFieldProps) {
  return (
    <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4 min-h-0 overflow-auto">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-white/80 text-xs">Playing Field</h4>
        <GameStatus gameStatus={gameStatus} />
      </div>
      {playedWords.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white/60 text-center text-sm">
            No words played yet.<br />
            Start by playing a word from your hand!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {playedWords.map((playedWord) => {
            const playerName = players.find(p => p.id === playedWord.playerId)?.name || 'Unknown Player';
            return (
              <PlayedWord
                key={playedWord.id}
                playedWord={playedWord}
                playerName={playerName}
                isSelected={selectedWordId === playedWord.id}
                isExtendMode={isExtendMode}
                onClick={isExtendMode ? () => onWordSelect?.(playedWord.id) : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
} 