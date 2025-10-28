import React from 'react';
import type { Category } from '../types';
import KeywordEntry from './KeywordEntry';

interface CategorySectionProps {
  category: Category;
  isOpen: boolean;
  onToggle: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, isOpen, onToggle }) => {
  return (
    <div className="bg-neutral-800 rounded-xl shadow-sm mb-8 transition-all duration-300 border border-neutral-700 overflow-hidden">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <h3 className="text-lg sm:text-xl font-bold text-green-400">{category.title}</h3>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-neutral-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
            <div className="border-t border-neutral-700 -mx-6"></div>
            <div className="pt-2">
                {category.keywords.map((keyword) => (
                    <KeywordEntry
                        key={keyword.term}
                        keyword={keyword}
                    />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;