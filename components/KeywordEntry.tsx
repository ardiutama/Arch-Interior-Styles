import React, { useState } from 'react';
import type { Keyword } from '../types';

interface KeywordEntryProps {
  keyword: Keyword;
}

const KeywordEntry: React.FC<KeywordEntryProps> = ({ keyword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(keyword.term).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Gagal menyalin teks: ', err);
    });
  };

  return (
    <div className="border-b border-neutral-700 last:border-b-0 -mx-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-6 text-neutral-200 hover:bg-neutral-700/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{keyword.term}</span>
        <div className="flex items-center gap-4">
            <div className="relative">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-full hover:bg-neutral-600 transition-colors duration-200 text-neutral-400 hover:text-green-400"
                    aria-label="Salin kata kunci"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                {isCopied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-600 text-neutral-100 text-xs px-2 py-1 rounded">Disalin!</span>}
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-neutral-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-neutral-300">
          <p>{keyword.explanation || 'Penjelasan tidak tersedia.'}</p>
        </div>
      )}
    </div>
  );
};

export default KeywordEntry;