'use client';

import { motion } from 'framer-motion';
import { CardProps } from '@/shared/types/components';

export default function Card({ 
  card, 
  isSelected = false, 
  isPlayable = true, 
  isFaceDown = false,
  onClick,
  className = '',
  size = 'md'
}: CardProps) {
  const sizeClasses = {
    sm: 'w-10 h-14 text-xs',
    md: 'w-12 h-16 text-sm',
    lg: 'w-16 h-20 text-base'
  };

  const baseClasses = `
    ${sizeClasses[size]}
    border-2 rounded-lg flex flex-col items-center justify-center font-bold cursor-pointer
    transition-all duration-200 select-none
    ${isFaceDown ? 'bg-gray-800 border-gray-600' : ''}
    ${!isFaceDown && !isPlayable ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const cardColors = isFaceDown 
    ? 'bg-gray-800 border-gray-600 text-gray-300'
    : card.isMaster
    ? 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-500 text-white shadow-lg'
    : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-500 text-white shadow-md';

  const selectedClasses = isSelected 
    ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-110 shadow-xl' 
    : 'hover:scale-105 hover:shadow-lg';

  const handleClick = () => {
    if (onClick && isPlayable && !isFaceDown) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`${baseClasses} ${cardColors} ${selectedClasses}`}
      onClick={handleClick}
      whileHover={isPlayable && !isFaceDown ? { scale: 1.05 } : {}}
      whileTap={isPlayable && !isFaceDown ? { scale: 0.95 } : {}}
      animate={{
        scale: isSelected ? 1.1 : 1,
        rotateY: isFaceDown ? 180 : 0
      }}
      transition={{ duration: 0.2 }}
    >
      {isFaceDown ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-gray-400 text-xs">🂠</div>
        </div>
      ) : (
        <>
          <div className="text-center leading-none">
            {card.isMaster 
              ? (card.assignedLetter ? card.assignedLetter : '★')
              : card.letter
            }
          </div>
          <div className="text-xs opacity-80 mt-1">
            {card.points}
          </div>
          {card.isMaster && (
            <div className="text-[10px] opacity-60 mt-1 leading-none">
              {card.assignedLetter ? 'MASTER' : 'ASSIGN'}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
} 