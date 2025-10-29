
import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface KeywordPillProps {
  term: string;
  explanation?: string;
  isLoading: boolean;
  onHover: (term: string) => void;
  isMobile: boolean;
  onPillClick: () => void;
}

const KeywordPill: React.FC<KeywordPillProps> = ({ term, explanation, isLoading, onHover, isMobile, onPillClick }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleMouseEnter = () => {
    if (!explanation && !isLoading) {
      onHover(term);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(term).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Gagal menyalin teks: ', err);
    });
  };

  const handleClick = isMobile ? onPillClick : handleCopy;

  const tooltipContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-neutral-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memuat...</span>
        </div>
      );
    }
    return explanation || 'Arahkan kursor untuk melihat penjelasan.';
  };
  
  const button = (
    <button
      onClick={handleClick}
      className="inline-block bg-neutral-700 hover:bg-green-500 text-neutral-200 hover:text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      {isCopied && !isMobile ? 'Disalin!' : term}
    </button>
  );

  if (isMobile) {
    return button;
  }

  return (
    <div onMouseEnter={handleMouseEnter}>
      <Tooltip content={tooltipContent()}>
        {button}
      </Tooltip>
    </div>
  );
};

export default KeywordPill;