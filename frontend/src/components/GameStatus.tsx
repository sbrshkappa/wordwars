'use client';

import { GameStatusProps } from '@/shared/types/components';

export default function GameStatus({ gameStatus }: GameStatusProps) {
  if (!gameStatus) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded px-2 py-1">
      <div className="text-white text-xs">
        <span className="font-semibold">Round {gameStatus.roundNumber}</span>
      </div>
      <div className="text-white/80 text-xs">
        Deck: {gameStatus.deckSize} | Discard: {gameStatus.discardSize}
      </div>
    </div>
  );
} 