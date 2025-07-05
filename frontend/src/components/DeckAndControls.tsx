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
    <div className="h-full bg-white/10 backdrop-blur-sm rounded-lg p-2 flex flex-col justify-between border border-white/20 min-h-0">
      {/* Deck and Discard */}
      <div className="space-y-2 flex-shrink-0">
        <div className="text-center">
          <div className={`w-8 h-12 sm:w-10 sm:h-14 border-2 rounded-lg flex items-center justify-center mb-1 ${
            deckSize > 0 
              ? 'bg-blue-800 border-blue-600' 
              : 'bg-gray-600 border-gray-500'
          }`}>
            <span className="text-white text-sm sm:text-base">🂠</span>
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

      {/* Game Controls - Small Square Buttons in Row */}
      <div className="space-y-2 flex-shrink-0">
        {/* Main Action Buttons Row */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {/* Play Word Button */}
        <button
          onClick={onPlayWord}
          disabled={selectedCardsCount === 0 || !isCurrentTurn || gamePhase !== 'playing'}
            className="aspect-square bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
            title="Play Word"
        >
            <span className="text-sm sm:text-base mb-0.5">📝</span>
            <span className="text-xs font-semibold">Play</span>
        </button>

          {/* Extend Word / Cancel Extend Button */}
        {isExtendMode ? (
          <button
            onClick={onCancelExtend}
              className="aspect-square bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center justify-center p-1"
              title="Cancel Extend"
          >
              <span className="text-sm sm:text-base mb-0.5">❌</span>
              <span className="text-xs font-semibold">Cancel</span>
          </button>
        ) : (
          <button
            onClick={onExtendWord}
            disabled={!isCurrentTurn || gamePhase !== 'playing' || !hasPlayedWords}
              className="aspect-square bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
              title="Extend Word"
          >
              <span className="text-sm sm:text-base mb-0.5">🔗</span>
              <span className="text-xs font-semibold">Extend</span>
          </button>
        )}

          {/* Discard Button */}
        <button
          onClick={onDiscard}
          disabled={selectedCardsCount !== 1 || !isCurrentTurn || gamePhase !== 'playing'}
            className="aspect-square bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
            title="Discard Card"
          >
            <span className="text-sm sm:text-base mb-0.5">🗑️</span>
            <span className="text-xs font-semibold">Discard</span>
          </button>

          {/* Draw Button */}
          <button
            onClick={onDraw}
            disabled={deckSize === 0 || !isCurrentTurn || gamePhase !== 'playing' || !hasDiscardedThisTurn}
            className="aspect-square bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
            title="Draw Card"
          >
            <span className="text-sm sm:text-base mb-0.5">🂠</span>
            <span className="text-xs font-semibold">Draw</span>
        </button>
        </div>

        {/* Draw Options Row (shown after discarding) */}
        {hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' && (
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            <button
              onClick={onDraw}
              disabled={deckSize === 0}
              className="aspect-square bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
              title="Draw from Deck"
            >
              <span className="text-sm sm:text-base mb-0.5">🂠</span>
              <span className="text-xs font-semibold">Deck</span>
            </button>
            <button
              onClick={onDrawFromDiscard}
              disabled={discardPile.length < 1}
              className="aspect-square bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex flex-col items-center justify-center p-1"
              title="Draw from Discard"
            >
              <span className="text-sm sm:text-base mb-0.5">🂡</span>
              <span className="text-xs font-semibold">Discard</span>
            </button>
          </div>
        )}

        {/* Hint for draw requirement */}
            {!hasDiscardedThisTurn && isCurrentTurn && gamePhase === 'playing' && deckSize > 0 && (
          <div className="text-center">
            <span className="text-xs text-white/60">(Discard first to draw)</span>
          </div>
        )}
      </div>
    </div>
  );
} 