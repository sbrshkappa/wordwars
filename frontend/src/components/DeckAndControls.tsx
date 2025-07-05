'use client';

import Card from './Card';
import { DeckAndControlsProps } from '@/shared/types/components';

export default function DeckAndControls({
  deckSize,
  discardPile,
  tempDiscardedCard,
  selectedCardsCount,
  onPlayWord,
  onExtendWord,
  onCancelExtend,
  onDiscard,
  onDraw,
  onDrawFromDiscard,
  isCurrentTurn = true,
  gamePhase = 'playing',
  hasDiscardedThisTurn = false,
  hasPlayedWords = false,
  isExtendMode = false
}: DeckAndControlsProps) {

  return (
    <div className="h-full bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-2 flex flex-col justify-between border border-white/20">
      {/* Deck and Discard */}
              <div className="space-y-1">
        <div className="text-center">
          <div className={`w-6 h-9 sm:w-8 sm:h-12 border-2 rounded-lg flex items-center justify-center mb-1 ${
            deckSize > 0 
              ? 'bg-blue-800 border-blue-600' 
              : 'bg-gray-600 border-gray-500'
          }`}>
            <span className="text-white text-xs">🂠</span>
          </div>
          <p className="text-white/80 text-xs">Deck ({deckSize})</p>
        </div>
        
        <div className="text-center">
          {discardPile.length > 0 && (
            <Card
              card={discardPile[discardPile.length - 1]}
              size="sm"
            />
          )}
          <p className="text-white/80 text-xs mt-1">Discard</p>
        </div>
        
        {/* Show temporarily discarded card */}
        {tempDiscardedCard && (
          <div className="text-center">
            <Card
              card={tempDiscardedCard}
              size="sm"
            />
            <p className="text-white/80 text-xs mt-1">Just Discarded</p>
          </div>
        )}
      </div>

      {/* Game Controls */}
      <div className="space-y-1 sm:space-y-2">
        <button
          onClick={onPlayWord}
          disabled={selectedCardsCount === 0 || !isCurrentTurn || gamePhase !== 'playing'}
          className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-semibold"
        >
          Play Word
        </button>
        {isExtendMode ? (
          <button
            onClick={onCancelExtend}
            className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
          >
            Cancel Extend
          </button>
        ) : (
          <button
            onClick={onExtendWord}
            disabled={!isCurrentTurn || gamePhase !== 'playing' || !hasPlayedWords}
            className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            Extend Word
          </button>
        )}
        <button
          onClick={onDiscard}
          disabled={selectedCardsCount !== 1 || !isCurrentTurn || gamePhase !== 'playing'}
          className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
        >
          Discard
        </button>
        {hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' ? (
          // Show both draw options after discarding
          <div className="space-y-1">
            <button
              onClick={onDraw}
              disabled={deckSize === 0}
              className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              Draw from Deck {deckSize > 0 ? `(${deckSize})` : '(Empty)'}
            </button>
            <button
              onClick={onDrawFromDiscard}
              disabled={discardPile.length < 1}
              className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              Draw from Discard {discardPile.length >= 1 ? '(Top Card)' : '(Empty)'}
            </button>
          </div>
        ) : (
          // Show single draw button when not discarded yet
          <button
            onClick={onDraw}
            disabled={deckSize === 0 || !isCurrentTurn || gamePhase !== 'playing' || !hasDiscardedThisTurn}
            className="w-full px-1 sm:px-2 py-1 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            Draw {deckSize > 0 ? `(${deckSize})` : '(Empty)'}
            {!hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' && deckSize > 0 && (
              <span className="block text-xs opacity-75">(Discard first)</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
} 