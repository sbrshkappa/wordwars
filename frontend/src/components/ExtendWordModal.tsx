'use client';

import { useState, useEffect } from 'react';
import { Card as CardType, PlayedWord } from '@/shared/types/game';
import { isValidWord, canFormExtendedWord } from '@/shared/gameLogic';
import Card from './Card';

interface ExtendWordModalProps {
  isOpen: boolean;
  selectedCards: CardType[];
  wordToExtend: PlayedWord | null;
  onClose: () => void;
  onConfirm: (newWord: string) => void;
}

export default function ExtendWordModal({
  isOpen,
  selectedCards,
  wordToExtend,
  onClose,
  onConfirm
}: ExtendWordModalProps) {
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && wordToExtend) {
      // Pre-populate with the original word
      setNewWord(wordToExtend.word);
      setError('');
    }
  }, [isOpen, wordToExtend]);

  const handleWordChange = (value: string) => {
    const upperWord = value.toUpperCase();
    setNewWord(upperWord);
    setError('');
  };

  const handleConfirm = () => {
    if (!wordToExtend) return;

    // Validate word
    if (!isValidWord(newWord)) {
      setError('Word must be at least 2 letters long and contain only letters.');
      return;
    }

    // Get the letters from selected cards
    const selectedLetters = selectedCards.map(card => 
      card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
    );

    // Check if the new word can be formed by inserting selected letters into the original word
    if (!canFormExtendedWord(wordToExtend.word, selectedLetters, newWord)) {
      setError(`New word cannot be formed by inserting the selected letters into "${wordToExtend.word}".`);
      return;
    }

    // Check if the new word is different from the original
    if (newWord === wordToExtend.word) {
      setError('New word must be different from the original word.');
      return;
    }

    onConfirm(newWord);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !wordToExtend) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h2 className="text-xl font-semibold mb-4">Extend Word</h2>
        
        {/* Original Word */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Original Word:</p>
          <div className="flex gap-1 mb-2">
            {wordToExtend.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                size="sm"
              />
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-800">{wordToExtend.word}</p>
        </div>

        {/* Selected Cards */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Cards to Add:</p>
          <div className="flex gap-1 mb-2">
            {selectedCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                size="sm"
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Letters: {selectedCards.map((card: CardType) => 
              card.isMaster && card.assignedLetter ? card.assignedLetter : card.letter
            ).join('')}
          </p>
        </div>

        {/* New Word Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Extended Word:
          </label>
          <div className="text-xs text-gray-600 mb-2">
            💡 <strong>Tip:</strong> The original word is pre-filled. Click anywhere in the word to position your cursor, then type your new letters.
          </div>
          <input
            type="text"
            value={newWord}
            onChange={(e) => handleWordChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Click to position cursor and type your new letters"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Word Preview */}
        {newWord && !error && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">
              <strong>Preview:</strong> {newWord}
            </p>
            <p className="text-green-600 text-xs">
              Length: {newWord.length} letters
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!newWord.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Extend Word
          </button>
        </div>
      </div>
    </div>
  );
} 