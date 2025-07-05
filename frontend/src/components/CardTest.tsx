'use client';

import { useState } from 'react';
import Card from './Card';
import { Card as CardType } from '@/shared/types/game';

export default function CardTest() {
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  // Sample cards for testing
  const sampleCards: CardType[] = [
    { id: '1', letter: 'A', points: 10, isMaster: false },
    { id: '2', letter: 'E', points: 10, isMaster: false },
    { id: '3', letter: 'MASTER', points: 15, isMaster: true },
    { id: '4', letter: 'Z', points: 2, isMaster: false },
    { id: '5', letter: 'Q', points: 4, isMaster: false },
  ];

  const handleCardClick = (cardId: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Card Component Test</h3>
      
      {/* Different sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Different Sizes:</h4>
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Small</p>
            <Card card={sampleCards[0]} size="sm" />
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Medium</p>
            <Card card={sampleCards[0]} size="md" />
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Large</p>
            <Card card={sampleCards[0]} size="lg" />
          </div>
        </div>
      </div>

      {/* Different card types */}
      <div className="space-y-4">
        <h4 className="font-medium">Card Types:</h4>
        <div className="flex gap-4">
          {sampleCards.map((card) => (
            <div key={card.id} className="text-center">
              <Card 
                card={card} 
                isSelected={selectedCards.has(card.id)}
                onClick={() => handleCardClick(card.id)}
              />
              <p className="text-xs text-gray-600 mt-2">
                {card.letter} ({card.points}pts)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Face down cards */}
      <div className="space-y-4">
        <h4 className="font-medium">Face Down Cards:</h4>
        <div className="flex gap-4">
          <Card card={sampleCards[0]} isFaceDown={true} />
          <Card card={sampleCards[2]} isFaceDown={true} />
        </div>
      </div>

      {/* Non-playable cards */}
      <div className="space-y-4">
        <h4 className="font-medium">Non-Playable Cards:</h4>
        <div className="flex gap-4">
          <Card card={sampleCards[0]} isPlayable={false} />
          <Card card={sampleCards[1]} isPlayable={false} />
        </div>
      </div>

      {/* Selection info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Selection Status:</h4>
        <p className="text-sm text-gray-600">
          Selected cards: {Array.from(selectedCards).join(', ') || 'None'}
        </p>
        <p className="text-sm text-gray-600">
          Total selected: {selectedCards.size}
        </p>
      </div>
    </div>
  );
} 