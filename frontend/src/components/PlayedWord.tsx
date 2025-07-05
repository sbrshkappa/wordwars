'use client';

import Card from './Card';
import { PlayedWordProps } from '@/shared/types/components';

export default function PlayedWord({ 
  playedWord, 
  playerName, 
  isSelected = false, 
  isExtendMode = false, 
  onClick 
}: PlayedWordProps) {
  return (
    <div 
      className={`
        bg-white/20 backdrop-blur-sm rounded-lg p-2 cursor-pointer transition-all duration-200
        ${isExtendMode ? 'animate-waddle hover:bg-white/30' : ''}
        ${isSelected ? 'ring-2 ring-indigo-400 bg-indigo-500/30 shadow-lg' : ''}
        ${onClick ? 'hover:scale-105' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex gap-1 mb-1">
        {playedWord.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            size="sm"
          />
        ))}
      </div>
      <p className="text-white font-semibold text-center text-sm">
        {playedWord.word}
      </p>
      <p className="text-white/60 text-xs text-center">
        by {playerName}
      </p>
    </div>
  );
} 