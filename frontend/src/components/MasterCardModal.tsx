'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/shared/types/game';

interface MasterCardModalProps {
  isOpen: boolean;
  masterCard: Card | null;
  onClose: () => void;
  onAssignLetter: (cardId: string, letter: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function MasterCardModal({
  isOpen,
  masterCard,
  onClose,
  onAssignLetter
}: MasterCardModalProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSelectedLetter('');
    }
  }, [isOpen]);

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleConfirm = () => {
    if (selectedLetter && masterCard) {
      onAssignLetter(masterCard.id, selectedLetter);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (LETTERS.includes(key)) {
      setSelectedLetter(key);
    } else if (e.key === 'Enter' && selectedLetter) {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !masterCard) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h2 className="text-xl font-semibold mb-4">Assign Letter to Master Card</h2>
        
        {/* Master Card Display */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-20 bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg">
            <div className="text-center leading-none">
              ★
            </div>
            <div className="text-xs opacity-80 mt-1">
              {masterCard.points}
            </div>
            <div className="text-[10px] opacity-60 mt-1 leading-none">
              MASTER
            </div>
          </div>
        </div>

        {/* Letter Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose a letter to assign:
          </label>
          <div className="grid grid-cols-9 gap-2 max-h-48 overflow-y-auto">
            {LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterSelect(letter)}
                onKeyDown={handleKeyPress}
                className={`w-8 h-8 border-2 rounded-md font-bold text-sm transition-colors ${
                  selectedLetter === letter
                    ? 'bg-purple-600 border-purple-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">
            <strong>Note:</strong> Once assigned, this master card will always represent the letter &quot;{selectedLetter || '?'}&quot; for the rest of the game.
          </p>
        </div>

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
            disabled={!selectedLetter}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Assign Letter
          </button>
        </div>
      </div>
    </div>
  );
} 