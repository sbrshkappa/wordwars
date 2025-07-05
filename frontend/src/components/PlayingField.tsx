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
  onWordSelect,
  turnStatus
}: PlayingFieldProps) {
  return (
    <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 min-h-0 flex flex-col overflow-hidden">
      <div className="flex justify-between items-start mb-3 flex-shrink-0">
        <h4 className="text-white/80 text-sm sm:text-base font-semibold">Playing Field</h4>
        <GameStatus gameStatus={gameStatus} />
      </div>
      
      <div className="flex-1 min-h-0 overflow-auto">
      {playedWords.length === 0 ? (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-white/60 text-sm sm:text-base mb-2">
                No words played yet.
              </p>
              <p className="text-white/40 text-xs sm:text-sm">
            Start by playing a word from your hand!
          </p>
            </div>
        </div>
      ) : (
          <div className="flex flex-wrap gap-2 sm:gap-3 pb-2">
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
      
      {/* Turn Status Banner at Bottom */}
      {turnStatus && (
        <div className="flex justify-center mt-3 flex-shrink-0">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <span className="text-white font-semibold text-sm">
              {turnStatus}
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 