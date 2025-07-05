'use client';

import { useState, useEffect } from 'react';
import { isValidWord, canFormWord } from '@/shared/gameLogic';
import { PlayWordModalProps } from '@/shared/types/components';

export default function PlayWordModal({
  isOpen,
  selectedCards,
  onClose,
  onConfirm
}: PlayWordModalProps) {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setWord('');
      setError('');
    }
  }, [isOpen]);

  const handleWordChange = (value: string) => {
    const upperWord = value.toUpperCase();
    setWord(upperWord);
    setError('');
  };

  const handleConfirm = () => {
    // Validate word
    if (!isValidWord(word)) {
      setError('Word must be at least 2 letters long and contain only letters.');
      return;
    }

    // Check if cards can form the word
    if (!canFormWord(selectedCards, word)) {
      setError('Selected cards cannot form this word.');
      return;
    }

    onConfirm(word);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h2 className="text-xl font-semibold mb-4">Play Word</h2>
        
        {/* Selected Cards */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selected Cards:</p>
          <div className="flex gap-2 flex-wrap">
            {selectedCards.map((card) => (
              <div
                key={card.id}
                className={`w-8 h-11 border-2 rounded flex flex-col items-center justify-center text-xs font-bold ${
                  card.isMaster 
                    ? 'bg-purple-100 border-purple-300 text-purple-800' 
                    : 'bg-blue-100 border-blue-300 text-blue-800'
                }`}
              >
                <div>{card.isMaster ? '★' : card.letter}</div>
                <div className="text-[8px]">{card.points}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Word Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Word:
          </label>
          <input
            type="text"
            value={word}
            onChange={(e) => handleWordChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your word here..."
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
        {word && !error && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">
              <strong>Preview:</strong> {word}
            </p>
            <p className="text-green-600 text-xs">
              Length: {word.length} letters
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
            disabled={!word.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Play Word
          </button>
        </div>
      </div>
    </div>
  );
} 