'use client';

import Card from './Card';
import { WordPreviewProps } from '@/shared/types/components';

export default function WordPreview({ selectedCards }: WordPreviewProps) {
  if (selectedCards.length === 0) return null;

  const word = selectedCards.map(card => card.letter).join('');

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 flex-shrink-0 border border-white/20">
      <div className="flex gap-1 justify-center">
        {selectedCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            size="sm"
          />
        ))}
      </div>
      <p className="text-white font-semibold text-center text-xs mt-1">
        {word}
      </p>
    </div>
  );
} 