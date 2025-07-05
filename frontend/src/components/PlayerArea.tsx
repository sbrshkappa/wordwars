'use client';

import Card from './Card';
import { PlayerAreaProps } from '@/shared/types/components';


export default function PlayerArea({
  player,
  isCurrentPlayer,
  isOpponent = false,
  selectedCards = new Set(),
  onCardClick,
  shakeHand = false
}: PlayerAreaProps) {
  // Get selected cards array for word preview
  const selectedCardsArray = Array.from(selectedCards)
    .map(cardId => player.hand.find(card => card.id === cardId))
    .filter((card): card is NonNullable<typeof card> => card !== undefined);
      return (
      <div className={`h-full flex flex-col overflow-hidden relative ${player.isCurrentTurn ? 'ring-2 ring-yellow-400 ring-opacity-75' : ''}`}>
      {/* Player's Hand with integrated info */}
      <div className={`flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 sm:p-2 mb-1 overflow-hidden ${
        shakeHand ? 'animate-shake' : ''
      }`}>
        <div className="flex justify-between items-start mb-1 sm:mb-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <h4 className="text-white/80 text-xs">
              {isOpponent ? 'Opponent\'s Hand' : 'Your Hand'}
            </h4>
            <span className="text-white/60 text-xs">({player.hand.length})</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-white/80 text-xs">
              Score: {player.score}
            </span>
            {player.isCurrentTurn && (
              <span className="bg-yellow-500 text-black text-xs px-1 sm:px-2 py-0.5 rounded-full font-semibold">
                TURN
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-wrap overflow-hidden p-2 sm:p-4">
          {player.hand.map((card) => (
            <Card
              key={card.id}
              card={card}
              isSelected={selectedCards.has(card.id)}
              isFaceDown={isOpponent}
              onClick={() => onCardClick?.(card, player.id)}
              size={isOpponent ? "sm" : "md"}
            />
          ))}
        </div>
      </div>
      
      {/* Word Preview - Floating at bottom of player area */}
      {isCurrentPlayer && selectedCardsArray.length > 0 && (
        <div className="absolute bottom-1 right-1 bg-white/10 backdrop-blur-sm rounded px-1 py-0.5 border border-white/20">
          <div className="flex gap-0.5 justify-center">
            {selectedCardsArray.map((card) => (
              <Card
                key={card.id}
                card={card}
                size="sm"
              />
            ))}
          </div>
          <p className="text-white font-semibold text-center text-xs">
            {selectedCardsArray.map(card => 
              card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
            ).join('')}
          </p>
        </div>
      )}
    </div>
  );
} 